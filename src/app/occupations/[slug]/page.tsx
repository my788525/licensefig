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
    title: `How Do I Get a ${occ.name} License? Requirements by State (2026)`,
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

  const crumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://licensefig.com/' },
      { '@type': 'ListItem', position: 2, name: 'Careers', item: 'https://licensefig.com/occupations/' },
      { '@type': 'ListItem', position: 3, name: occ.name, item: `https://licensefig.com/occupations/${occ.slug}/` },
    ],
  }

  const datasetLd = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: `${occ.name} state license requirements dataset`,
    description: `State-by-state ${occ.name} license requirements: education hours, exam structure, fees, pass rates, retake rules and reciprocity across U.S. states.`,
    creator: { '@type': 'Organization', name: 'LicenseFig' },
    dateModified: '2026-08-20',
    spatialCoverage: 'United States',
  }

  const howtoLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to get your ${occ.name} license`,
    description: `The standard path to a ${occ.name} license in the U.S., using official state-board requirements.`,
    step: [
      { '@type': 'HowToStep', position: 1, name: 'Check your state requirements', text: `Open the requirements table for your state on this page — education hours, exam vendor, fees and retake rules.` },
      { '@type': 'HowToStep', position: 2, name: 'Complete pre-license education', text: 'Finish the required education hours (or approved equivalent) from an accepted provider.' },
      { '@type': 'HowToStep', position: 3, name: 'Pass the background check', text: 'Submit fingerprints and clear the required criminal background check where applicable.' },
      { '@type': 'HowToStep', position: 4, name: 'Register and pass the exam', text: 'Register with the exam vendor (PSI, Pearson VUE or Prometric), then pass the national and state portions.' },
      { '@type': 'HowToStep', position: 5, name: 'Pay the license fee', text: 'Submit the application and license fee to the state board to receive your license.' },
      { '@type': 'HowToStep', position: 6, name: 'Keep it active', text: 'Track renewal dates and continuing-education hours using the License Renewal Calculator.' },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howtoLd) }} />
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

        <section className="mt-8">
          <h2 className="text-xl font-bold mb-3">How to get your {occ.name} license</h2>
          <ol className="list-decimal list-inside space-y-2 text-slate-700">
            <li><strong>Check your state requirements.</strong> Open the requirements table for your state on this page — education hours, exam vendor, fees and retake rules.</li>
            <li><strong>Complete pre-license education.</strong> Finish the required education hours (or approved equivalent) from an accepted provider.</li>
            <li><strong>Pass the background check.</strong> Submit fingerprints and clear the required criminal background check where applicable.</li>
            <li><strong>Register and pass the exam.</strong> Register with the exam vendor (PSI, Pearson VUE or Prometric), then pass the national and state portions.</li>
            <li><strong>Pay the license fee.</strong> Submit the application and license fee to the state board to receive your license.</li>
            <li><strong>Keep it active.</strong> Track renewal dates and continuing-education hours using the License Renewal Calculator.</li>
          </ol>
        </section>

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
          <span className="inline-block rounded-full bg-green-50 border border-green-200 text-green-700 font-semibold px-2.5 py-0.5 mr-2">● Data updated 2026-08-20</span>
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
