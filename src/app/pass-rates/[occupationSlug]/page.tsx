import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { OCCUPATIONS, STATES } from '@/data/types'
import { getRequirements } from '@/data/requirements'
import PrintButton from '@/components/PrintButton'

// ============================================================================
// L3 sub-dimension: first-attempt pass rates by state for one occupation.
// States with a published passRatePct are ranked; the rest are marked
// "not published" rather than guessed. Difficulty labels derive from the
// published figure only.
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
    title: `${occ.name} Exam Pass Rates by State (2026)`,
    description: `First-attempt ${occ.name} exam pass rates by state, ranked. States that do not publish official figures are marked "not published". Data retrieved 2026-08-20.`,
    alternates: { canonical: `/pass-rates/${occ.slug}/` },
  }
}

function difficulty(rate: number): { label: string; cls: string } {
  if (rate >= 80) return { label: 'Easier', cls: 'bg-green-100 text-green-800' }
  if (rate >= 60) return { label: 'Moderate', cls: 'bg-amber-100 text-amber-800' }
  return { label: 'Harder', cls: 'bg-rose-100 text-rose-800' }
}

const stName = (code: string) => STATES.find((s) => s.code === code)?.name ?? code

export default async function PassRatesPage({ params }: Props) {
  const { occupationSlug } = await params
  const occ = OCCUPATIONS.find((o) => o.slug === occupationSlug)
  if (!occ) notFound()

  const data = getRequirements(occ.id)
  const byState = new Map(data.map((d) => [d.stateCode, d]))
  const published: { state: string; rate: number; source?: string }[] = []
  const unpublished: string[] = []

  for (const s of STATES) {
    const d = byState.get(s.code)
    if (d?.passRatePct != null) published.push({ state: s.code, rate: d.passRatePct, source: d.passRateSource })
    else unpublished.push(s.code)
  }
  published.sort((a, b) => b.rate - a.rate)

  const avg = published.length ? published.reduce((a, b) => a + b.rate, 0) / published.length : undefined
  const min = published.length ? Math.min(...published.map((p) => p.rate)) : undefined
  const max = published.length ? Math.max(...published.map((p) => p.rate)) : undefined

  const faq = [
    {
      q: `Which states have the highest ${occ.shortName} exam pass rate?`,
      a:
        published.length > 0
          ? `Based on the published first-attempt rates in our dataset, ${stName(published[0].state)} leads at ${published[0].rate}%, and the published range runs from ${min}% to ${max}%.`
          : `No states publish an official ${occ.shortName} first-attempt pass rate in the dataset we retrieved on 2026-08-20.`,
    },
    {
      q: `Why is the ${occ.shortName} pass rate "not published" for my state?`,
      a: 'Most states do not release first-attempt exam pass rates. When a state publishes the figure, we show it with the source; otherwise the row is marked "not published" and you should ask the state board directly.',
    },
    {
      q: `How hard is the ${occ.name} exam overall?`,
      a:
        occ.nationalPassRatePct != null
          ? `The national reference pass rate is roughly ${occ.nationalPassRatePct}%. In the ${published.length} states that publish figures, first-attempt rates average ${avg != null ? Math.round(avg) : 'n/a'}%.`
          : `Pass rates vary widely by state and are not consistently published. Focus on the highest-weighted content areas of your state's exam.`,
    },
    {
      q: 'Does a low pass rate mean I will fail?',
      a: 'No. Published pass rates are first-attempt averages across all candidates, including those who take the exam without structured prep. Candidates who complete a study plan and practice questions pass at far higher rates than the aggregate figure suggests.',
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
          <Link href="/pass-rates/" className="hover:text-[#1b4b8f]">Pass Rates</Link> /{' '}
          <span className="text-slate-800">{occ.shortName}</span>
        </nav>

        <span className="source-badge mb-4">Official sources · retrieved 2026-08-20</span>
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
          {occ.name} Exam Pass Rates by State ({new Date().getFullYear()})
        </h1>
        <p className="text-lg text-slate-700 leading-relaxed mb-2">
          {published.length > 0
            ? `${published.length} of ${STATES.length} states publish an official first-attempt pass rate. Published rates range from ${min}% (${stName(published[published.length - 1].state)}) to ${max}% (${stName(published[0].state)}), averaging ${Math.round(avg!)}%.`
            : `No states in our dataset publish an official ${occ.shortName} first-attempt pass rate — every state is marked "not published".`}
        </p>
        <p className="text-sm text-slate-500 mb-6">
          {occ.description} Rows without a figure are marked &ldquo;not published&rdquo; — we do not estimate rates that
          states have not released.
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
                <th className="px-4 py-2.5 text-left">Rank</th>
                <th className="px-4 py-2.5 text-left">State</th>
                <th className="px-4 py-2.5 text-right">First-attempt pass rate</th>
                <th className="px-4 py-2.5 text-left">Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {published.map((p, i) => {
                const tag = difficulty(p.rate)
                return (
                  <tr key={p.state}>
                    <td className="px-4 py-2.5 text-slate-500">{i + 1}</td>
                    <td className="px-4 py-2.5 font-medium">
                      <Link href={`/licensing-guides/${occ.slug}/${p.state}/`} className="hover:text-[#1b4b8f]">
                        {stName(p.state)}
                      </Link>
                    </td>
                    <td className="px-4 py-2.5 text-right font-semibold">{p.rate}%</td>
                    <td className="px-4 py-2.5">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${tag.cls}`}>{tag.label}</span>
                    </td>
                  </tr>
                )
              })}
              {unpublished.map((code) => (
                <tr key={code}>
                  <td className="px-4 py-2.5 text-slate-400">—</td>
                  <td className="px-4 py-2.5 font-medium text-slate-500">
                    <Link href={`/licensing-guides/${occ.slug}/${code}/`} className="hover:text-[#1b4b8f]">
                      {stName(code)}
                    </Link>
                  </td>
                  <td className="px-4 py-2.5 text-right italic text-slate-400">not published</td>
                  <td className="px-4 py-2.5 text-xs text-slate-400">—</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {published.filter((p) => p.source).length > 0 && (
          <p className="text-xs text-slate-400 mb-8">
            Sources: {published.filter((p) => p.source).map((p) => p.source).join(' · ')}
          </p>
        )}

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
          <h2 className="font-display text-lg font-bold mb-3">Compare {occ.shortName} data</h2>
          <div className="flex flex-wrap gap-2">
            <Link href={`/exam-costs/${occ.slug}/`} className="btn-ghost">Exam costs by state</Link>
            <Link href={`/reciprocity/${occ.slug}/`} className="btn-ghost">Reciprocity by state</Link>
            <Link href={`/guides/${occ.slug}/`} className="btn-ghost">Full license guide</Link>
            <Link href="/tools/pass-rate-index/" className="btn-ghost">Pass rate index tool</Link>
            <Link href="/tools/study-plan-generator/" className="btn-cta">Build a study plan</Link>
          </div>
        </div>

        <p className="text-xs text-slate-400 border-t border-slate-200 pt-4">
          Pass-rate figures are as published by state boards and commissions (retrieved 2026-08-20). &ldquo;Not
          published&rdquo; means the state has not released an official first-attempt figure — not that the rate is
          unknown to the board. Verify with your state board before making decisions.
        </p>
      </main>
    </>
  )
}
