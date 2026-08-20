import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { OCCUPATIONS, STATES } from '@/data/types'
import { getRequirements } from '@/data/requirements'
import PrintButton from '@/components/PrintButton'

// ============================================================================
// L3 sub-dimension: exam + application fees by state for one occupation.
// States with published fee data are ranked by total cost; the lowest and
// highest totals are highlighted. States with no published fees are listed
// as "fee schedule not published" — never estimated.
// ============================================================================

interface Props {
  params: { occupationSlug: string }
}

export function generateStaticParams() {
  return OCCUPATIONS.map((o) => ({ occupationSlug: o.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { occupationSlug } = await params
  const occ = OCCUPATIONS.find((o) => o.slug === occupationSlug)
  if (!occ) return {}
  return {
    title: `${occ.name} Exam & Application Fees by State (2026)`,
    description: `Compare ${occ.name} exam fees and application fees across all 50 states. Cheapest and most expensive states highlighted. Data retrieved 2026-08-20.`,
    alternates: { canonical: `/exam-costs/${occ.slug}/` },
  }
}

const stName = (code: string) => STATES.find((s) => s.code === code)?.name ?? code

interface FeeRow {
  state: string
  examFee?: number
  appFee?: number
  total?: number
}

export default async function ExamCostsPage({ params }: Props) {
  const { occupationSlug } = await params
  const occ = OCCUPATIONS.find((o) => o.slug === occupationSlug)
  if (!occ) notFound()

  const data = getRequirements(occ.id)
  const byState = new Map(data.map((d) => [d.stateCode, d]))

  const rows: FeeRow[] = STATES.map((s) => {
    const d = byState.get(s.code)
    const examFee = d?.exam?.examFee
    const appFee = d?.applicationFee
    return {
      state: s.code,
      examFee: examFee ?? undefined,
      appFee: appFee ?? undefined,
      total: examFee != null || appFee != null ? (examFee ?? 0) + (appFee ?? 0) : undefined,
    }
  })

  const priced = rows.filter((r) => r.total != null).sort((a, b) => (a.total ?? 0) - (b.total ?? 0))
  const unpriced = rows.filter((r) => r.total == null)
  const cheapest = priced[0]
  const mostExpensive = priced[priced.length - 1]

  const faq = [
    {
      q: `What does a ${occ.shortName} license cost?`,
      a:
        priced.length > 0
          ? `Among the ${priced.length} states with published fee data, the lowest exam-and-application total is $${cheapest!.total} in ${stName(cheapest!.state)} and the highest is $${mostExpensive!.total} in ${stName(mostExpensive!.state)}. Education, fingerprinting and license fees add more.`
          : `No state fee schedules are published in the dataset we retrieved on 2026-08-20 — check each state board directly.`,
    },
    {
      q: 'Does the exam fee include the license fee?',
      a: 'No. The exam fee covers sitting for the exam; the application fee covers your license application; a separate license fee and background-check fee usually apply. Always total every line item from the state board before budgeting.',
    },
    {
      q: 'Why are some states missing fee data?',
      a: 'State fee schedules are not uniformly published in machine-readable form. When a state does not publish its fees in our verified sources, the row shows "fee schedule not published" — we do not estimate.',
    },
    {
      q: `Which state is cheapest for a ${occ.shortName} license?`,
      a:
        priced.length > 0
          ? `Based on published exam and application fees, ${stName(cheapest!.state)} has the lowest total at $${cheapest!.total}.`
          : 'No fee comparisons are possible until state schedules are published in our dataset.',
    },
  ]

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="text-sm text-slate-500 mb-4">
          <Link href="/" className="hover:text-[#1b4b8f]">Home</Link> /{' '}
          <Link href="/exam-costs/" className="hover:text-[#1b4b8f]">Exam Costs</Link> /{' '}
          <span className="text-slate-800">{occ.shortName}</span>
        </nav>

        <span className="source-badge mb-4">Official sources · retrieved 2026-08-20</span>
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
          {occ.name} Exam &amp; Application Fees by State ({new Date().getFullYear()})
        </h1>
        <p className="text-lg text-slate-700 leading-relaxed mb-2">
          {priced.length > 0
            ? `${priced.length} of ${STATES.length} states publish fee data. The cheapest exam-and-application total is $${cheapest!.total} (${stName(cheapest!.state)}); the most expensive is $${mostExpensive!.total} (${stName(mostExpensive!.state)}).`
            : `No states publish ${occ.shortName} fee schedules in the dataset we retrieved on 2026-08-20.`}
        </p>
        <p className="text-sm text-slate-500 mb-6">
          {occ.description} Totals combine the exam fee and application fee only — education, fingerprinting and license
          fees add more.
        </p>

        <div className="flex items-center gap-3 mb-6">
          <PrintButton />
          <Link href={`/occupations/${occ.slug}/`} className="text-sm text-[#1b4b8f] font-semibold hover:underline">
            Requirements by state →
          </Link>
        </div>

        <div className="overflow-x-auto card-rule mb-8">
          <table className="data-table w-full text-sm">
            <thead>
              <tr>
                <th className="px-4 py-2.5 text-left">State</th>
                <th className="px-4 py-2.5 text-right">Exam fee</th>
                <th className="px-4 py-2.5 text-right">Application fee</th>
                <th className="px-4 py-2.5 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {priced.map((r) => {
                const isMin = priced.length > 1 && cheapest != null && r.total === cheapest.total
                const isMax = priced.length > 1 && mostExpensive != null && r.total === mostExpensive.total
                return (
                  <tr key={r.state} className={isMin ? 'bg-green-50' : isMax ? 'bg-rose-50' : undefined}>
                    <td className="px-4 py-2.5 font-medium">
                      <Link href={`/licensing-guides/${occ.slug}/${r.state}/`} className="hover:text-[#1b4b8f]">
                        {stName(r.state)}
                      </Link>
                      {isMin && <span className="ml-2 inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">Lowest</span>}
                      {isMax && <span className="ml-2 inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800">Highest</span>}
                    </td>
                    <td className="px-4 py-2.5 text-right">{r.examFee != null ? `$${r.examFee}` : '—'}</td>
                    <td className="px-4 py-2.5 text-right">{r.appFee != null ? `$${r.appFee}` : '—'}</td>
                    <td className="px-4 py-2.5 text-right font-semibold">${r.total}</td>
                  </tr>
                )
              })}
              {unpriced.map((r) => (
                <tr key={r.state}>
                  <td className="px-4 py-2.5 font-medium text-slate-500">
                    <Link href={`/licensing-guides/${occ.slug}/${r.state}/`} className="hover:text-[#1b4b8f]">
                      {stName(r.state)}
                    </Link>
                  </td>
                  <td className="px-4 py-2.5 text-right italic text-slate-400" colSpan={3}>fee schedule not published</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-slate-400 mb-8">
          Note: totals do not include the license fee, fingerprinting or education costs — see each state's long-tail
          guide for full fee schedules where published.
        </p>

        {/* FAQ */}
        <h2 className="section-title mb-4">Frequently asked questions</h2>
        <div className="space-y-3 mb-10">
          {faq.map((f, i) => (
            <div key={i} className="card-rule p-5">
              <h3 className="font-semibold text-slate-900 mb-1">{f.q}</h3>
              <p className="text-sm text-slate-600">{f.a}</p>
            </div>
          ))}
        </div>

        {/* Related */}
        <div className="rounded-2xl p-6 mb-10" style={{ background: 'linear-gradient(135deg,#eef2f9,#f7f3e6)' }}>
          <h2 className="font-display text-lg font-bold mb-3">Plan your {occ.shortName} budget</h2>
          <div className="flex flex-wrap gap-2">
            <Link href={`/pass-rates/${occ.slug}/`} className="btn-ghost">Pass rates by state</Link>
            <Link href={`/reciprocity/${occ.slug}/`} className="btn-ghost">Reciprocity by state</Link>
            <Link href={`/guides/${occ.slug}/`} className="btn-ghost">Full license guide</Link>
            <Link href="/tools/exam-cost-compare/" className="btn-ghost">Exam cost compare tool</Link>
            <Link href="/tools/prep-budget/" className="btn-cta">Build a prep budget</Link>
          </div>
        </div>

        <p className="text-xs text-slate-400 border-t border-slate-200 pt-4">
          Fee figures are as published by state boards and exam vendors (retrieved 2026-08-20). &ldquo;Fee schedule not
          published&rdquo; means the state has not released an official figure in our verified sources. Fees change —
          confirm with the board before paying.
        </p>
      </main>
    </>
  )
}
