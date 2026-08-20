import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import AuthorByline from '@/components/AuthorByline'
import { OCCUPATIONS, STATES, getOccupation } from '@/data/types'
import { getRequirements } from '@/data/requirements'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return OCCUPATIONS.map((o) => ({ slug: o.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const occ = getOccupation(OCCUPATIONS.find((o) => o.slug === slug)?.id ?? '')
  if (!occ) return {}
  return {
    title: `${occ.name} License Requirements by State (2026)`,
    description: `${occ.name} license requirements in all 50 states: education hours, exam structure, fees, pass rates, retake rules and reciprocity. ${occ.description}`,
    alternates: { canonical: `/occupations/${occ.slug}/` },
  }
}

function fmt(v: number | undefined, suffix = ''): string {
  return v != null ? `${v}${suffix}` : '—'
}

export default async function OccupationPage({ params }: Props) {
  const { slug } = await params
  const occ = OCCUPATIONS.find((o) => o.slug === slug)
  if (!occ) notFound()

  const data = getRequirements(occ.id)
  const byState = new Map(data.map((d) => [d.stateCode, d]))
  const populated = data.length

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `How do I become a licensed ${occ.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Typically: complete the required pre-license education, pass a criminal background check, register with the exam vendor, pass the state exam, and pay the license fee. Exact requirements vary by state — see the table below for your state.`,
        },
      },
      {
        '@type': 'Question',
        name: `How hard is the ${occ.name} exam?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `First-attempt pass rates vary by state (where published). The exam usually has a national portion and a state-specific portion, both of which you must pass. Study time and practice volume are the strongest predictors of passing.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Can my license transfer to another state?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Reciprocity varies by occupation and state. Some states honor licenses from listed states; others require additional exams or education. Check the reciprocity note for your state or contact both state boards.',
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="text-sm text-slate-500 mb-4">
          <Link href="/" className="hover:text-indigo-600">Home</Link> /{' '}
          <Link href="/occupations/" className="hover:text-indigo-600">Careers</Link> /{' '}
          <span className="text-slate-800">{occ.name}</span>
        </nav>

        <div className="flex items-start gap-4 mb-6">
          <span className="text-5xl">{occ.emoji}</span>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{occ.name} — License Requirements by State</h1>
            <p className="text-slate-600 max-w-3xl">{occ.description}</p>
            <p className="text-sm text-slate-500 mt-2">
              {populated > 0
                ? `${populated} of ${STATES.length} states populated with official data (retrieved 2026-08-20).`
                : 'State-by-state data is being compiled from official state boards. Requirements shown only where officially verified.'}
            </p>
          </div>
        </div>

        <AuthorByline />

        {/* Quick tools */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Link href="/tools/requirements-lookup/" className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700">State requirements lookup</Link>
          <Link href="/tools/study-plan-generator/" className="px-4 py-2 rounded-lg border border-slate-300 text-sm hover:border-indigo-400">Study plan generator</Link>
          <Link href="/tools/pass-rate-index/" className="px-4 py-2 rounded-lg border border-slate-300 text-sm hover:border-indigo-400">Pass rate index</Link>
          <Link href="/tools/prep-budget/" className="px-4 py-2 rounded-lg border border-slate-300 text-sm hover:border-indigo-400">Prep budget</Link>
        </div>

        {/* State matrix */}
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left">
              <tr>
                <th className="px-3 py-2.5 font-semibold">State</th>
                <th className="px-3 py-2.5 font-semibold">Education</th>
                <th className="px-3 py-2.5 font-semibold">Exam</th>
                <th className="px-3 py-2.5 font-semibold">Pass %</th>
                <th className="px-3 py-2.5 font-semibold">Fees</th>
                <th className="px-3 py-2.5 font-semibold">Retake</th>
                <th className="px-3 py-2.5 font-semibold">Reciprocity</th>
                <th className="px-3 py-2.5 font-semibold">Official</th>
              </tr>
            </thead>
            <tbody>
              {STATES.map((s) => {
                const d = byState.get(s.code)
                return (
                  <tr key={s.code} className="border-t border-slate-100 hover:bg-slate-50">
                    <td className="px-3 py-2.5 font-medium whitespace-nowrap">{s.code}</td>
                    <td className="px-3 py-2.5">{d?.educationHours != null ? `${d.educationHours} hrs` : '—'}</td>
                    <td className="px-3 py-2.5">
                      {d?.exam ? (
                        <span className="text-xs">
                          {d.exam.nationalQuestions != null && `${d.exam.nationalQuestions}N`}
                          {d.exam.stateQuestions != null && `/${d.exam.stateQuestions}S`}
                          {d.exam.passingPct != null && ` · ${d.exam.passingPct}%`}
                          {d.exam.examFee != null && ` · $${d.exam.examFee}`}
                        </span>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="px-3 py-2.5">{d?.passRatePct != null ? `${d.passRatePct}%` : '—'}</td>
                    <td className="px-3 py-2.5">
                      {d?.applicationFee != null || d?.licenseFee != null
                        ? `${d.applicationFee != null ? `App $${d.applicationFee}` : ''}${d.licenseFee != null ? ` · Lic $${d.licenseFee}` : ''}`
                        : '—'}
                    </td>
                    <td className="px-3 py-2.5 text-xs">{d?.exam?.retakeWait ?? '—'}</td>
                    <td className="px-3 py-2.5 text-xs">{d?.reciprocity ?? '—'}</td>
                    <td className="px-3 py-2.5">
                      {d?.officialUrl ? (
                        <a href={d.officialUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline text-xs">
                          {d.officialName ?? 'Board'} ↗
                        </a>
                      ) : (
                        '—'
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-slate-500 mt-4">
          Data retrieved 2026-08-20 from state boards, PSI, Pearson VUE and CMS. Requirements change —
          verify with your state board before enrolling or paying. Dash (—) = not published / pending verification.
        </p>

        {/* Other careers */}
        <section className="mt-12">
          <h2 className="text-xl font-bold mb-3">Other licensed careers</h2>
          <div className="flex flex-wrap gap-2">
            {OCCUPATIONS.filter((o) => o.id !== occ.id).map((o) => (
              <Link key={o.id} href={`/occupations/${o.slug}/`} className="px-3 py-1.5 rounded-full border border-slate-200 text-sm hover:border-indigo-300">
                {o.emoji} {o.shortName}
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
