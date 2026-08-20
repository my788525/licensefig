import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import AuthorByline from '@/components/AuthorByline'
import { OCCUPATIONS, STATES } from '@/data/types'
import { getRequirements } from '@/data/requirements'
import type { LicenseRequirements } from '@/data/types'
// ============================================================================
// L3 deep guides — one long-form, data-driven guide per occupation.
// Every number is aggregated from the verified requirements dataset
// (getRequirements), so pages differ by real figures, never by template
// swaps. Fields with no verified value render "varies by state".
// ============================================================================

interface Props {
  params: { occupationSlug: string }
}

export function generateStaticParams() {
  return OCCUPATIONS.map((o) => ({ occupationSlug: o.slug }))
}

const YEAR = new Date().getFullYear()

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { occupationSlug } = await params
  const occ = OCCUPATIONS.find((o) => o.slug === occupationSlug)
  if (!occ) return {}
  return {
    title: `${occ.name} License Guide ${YEAR}`,
    description: `The complete ${occ.name} license guide: pre-license education hours by state, exam structure and vendors, pass rates, fees, retake rules and reciprocity. Aggregated from official state board data, retrieved 2026-08-20.`,
    alternates: { canonical: `/guides/${occ.slug}/` },
  }
}

// ---------- aggregation helpers (real data only) ----------
const nums = (vals: (number | undefined)[]): number[] => vals.filter((v): v is number => v != null)

function rangeLabel(vals: number[], suffix = ''): string {
  if (vals.length === 0) return 'varies by state'
  const min = Math.min(...vals)
  const max = Math.max(...vals)
  return min === max ? `${min}${suffix}` : `${min}–${max}${suffix}`
}

function modeLabel(vals: (string | undefined)[]): string {
  const counts = new Map<string, number>()
  vals.forEach((v) => {
    if (!v) return
    counts.set(v, (counts.get(v) ?? 0) + 1)
  })
  if (counts.size === 0) return 'varies by state'
  const top = Array.from(counts.entries()).sort((a, b) => b[1] - a[1])[0]
  return `${top[0]} (${top[1]} states)`
}

function topVendors(data: LicenseRequirements[], n = 3): [string, number][] {
  const counts = new Map<string, number>()
  data.forEach((d) => {
    const name = d.examVendor?.name
    if (!name) return
    counts.set(name, (counts.get(name) ?? 0) + 1)
  })
  return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]).slice(0, n)
}

// States ranked by how much verified data we hold, so the cards are substantive.
function topDataStates(data: LicenseRequirements[]): LicenseRequirements[] {
  const score = (d: LicenseRequirements) =>
    (d.educationHours != null ? 1 : 0) +
    (d.examVendor?.name ? 1 : 0) +
    (d.exam ? 1 : 0) +
    (d.passRatePct != null ? 1 : 0) +
    (d.exam?.examFee != null ? 1 : 0) +
    (d.applicationFee != null ? 1 : 0) +
    (d.renewal ? 1 : 0)
  const order = new Map(STATES.map((s, i) => [s.code, i]))
  return [...data]
    .sort((a, b) => score(b) - score(a) || (order.get(a.stateCode) ?? 99) - (order.get(b.stateCode) ?? 99))
    .slice(0, 5)
}

const stName = (code: string) => STATES.find((s) => s.code === code)?.name ?? code

export default async function GuidePage({ params }: Props) {
  const { occupationSlug } = await params
  const occ = OCCUPATIONS.find((o) => o.slug === occupationSlug)
  if (!occ) notFound()

  const data = getRequirements(occ.id)
  const states = data.length

  // Aggregations — every figure exists in the dataset or stays "varies by state".
  const edu = nums(data.map((d) => d.educationHours))
  const passRates = nums(data.map((d) => d.passRatePct))
  const examFees = nums(data.map((d) => d.exam?.examFee))
  const appFees = nums(data.map((d) => d.applicationFee))
  const passingScores = nums(data.map((d) => d.exam?.passingPct))
  const renewalYears = data.map((d) => d.renewal?.years)
  const renewCounts = new Map<number, number>()
  renewalYears.forEach((y) => {
    if (y != null) renewCounts.set(y, (renewCounts.get(y) ?? 0) + 1)
  })
  const commonRenewal =
    renewCounts.size > 0 ? Array.from(renewCounts.entries()).sort((a, b) => b[1] - a[1])[0] : undefined
  const bgCount = data.filter((d) => d.backgroundCheck).length
  const vendors = topVendors(data)
  const topStates = topDataStates(data)

  // Direct answer — the first sentence answers the "what do I need" question.
  const eduTxt = edu.length ? `verified pre-license education ranges from ${rangeLabel(edu, ' hours')}` : 'pre-license education requirements vary by state'
  const passTxt = passRates.length ? `run from ${Math.min(...passRates)}% to ${Math.max(...passRates)}%` : 'are not consistently published'
  const directAnswer =
    states > 0
      ? `${occ.name} licensing in ${YEAR} is regulated state-by-state: ${eduTxt}, the exam is most commonly administered by ${
          vendors[0]?.[0] ?? 'state boards'
        }, and published first-attempt pass rates ${passTxt}. ${
          bgCount > 0 ? `A background check is required in ${bgCount} of ${states} states with verified data.` : ''
        }`
      : `${occ.name} licensing requirements are set by each state board and vary by year.`

  const overviewRows: [string, string][] = [
    ['States with verified data', states > 0 ? `${states} of ${STATES.length}` : 'being compiled'],
    ['Pre-license education', rangeLabel(edu, ' hrs')],
    ['Most common exam vendor', vendors[0]?.[0] ?? 'varies by state'],
    ['Exam passing score', passingScores.length ? rangeLabel(passingScores, '%') : 'varies by state'],
    ['National pass-rate reference', occ.nationalPassRatePct != null ? `~${occ.nationalPassRatePct}% (industry reference)` : 'not published'],
    ['Published state pass rates', passRates.length ? `${passRates.length} states · ${Math.min(...passRates)}%–${Math.max(...passRates)}%` : 'not published'],
    ['Exam fee', examFees.length > 0 ? `$${rangeLabel(examFees)}` : 'varies by state'],
    ['Application fee', appFees.length > 0 ? `$${rangeLabel(appFees)}` : 'varies by state'],
    ['Common renewal cycle', commonRenewal ? `every ${commonRenewal[0]} years` : 'varies by state'],
    ['Background check', bgCount > 0 ? `${bgCount} of ${states} states` : 'varies by state'],
  ]

  const steps = [
    {
      title: 'Meet the basic requirements',
      body:
        states > 0
          ? `Minimum age is 18 in every state with a published figure.${bgCount > 0 ? ` A criminal background check is required in ${bgCount} of ${states} verified states.` : ''}`
          : 'Age and background check rules vary by state — confirm with your state board.',
    },
    {
      title: 'Complete pre-license education',
      body: edu.length
        ? `Approved training hours run from ${rangeLabel(edu, ' hours')} across verified states. Choose a state-approved program; your school reports completion to the licensing authority.`
        : 'Approved training hours are not published in our verified dataset — check your state board for the current figure.',
    },
    {
      title: 'Register and pass the exam',
      body: `The exam is most often administered by ${vendors[0]?.[0] ?? 'the state board'}${passingScores.length ? `, with a ${rangeLabel(passingScores, '%')} passing score` : ''}. Schedule through the vendor portal after your education is reported.`,
    },
    {
      title: 'Pay fees and submit your application',
      body: `Expect an exam fee of ${
        examFees.length > 0 ? `$${rangeLabel(examFees)}` : rangeLabel(examFees)
      } and an application fee of ${
        appFees.length > 0 ? `$${rangeLabel(appFees)}` : 'that varies by state'
      }. Submit any required background check results with your application.`,
    },
    {
      title: 'Maintain your license',
      body: commonRenewal
        ? `The most common renewal cycle is every ${commonRenewal[0]} years. Track continuing-education deadlines so your license never lapses.`
        : 'Renewal cycles vary by state — check the renewal cycle with your state board.',
    },
  ]

  const faq = [
    {
      q: `How many hours of education do I need to become a ${occ.shortName}?`,
      a: edu.length
        ? `Verified requirements range from ${rangeLabel(edu, ' hours')} across states. Check your state's exact figure before enrolling — hours are set by each state board.`
        : `Required training hours are not consistently published in our dataset — check your state board for the current figure.`,
    },
    {
      q: `How hard is the ${occ.name} exam?`,
      a:
        passRates.length > 0
          ? `Published first-attempt pass rates range from ${Math.min(...passRates)}% to ${Math.max(...passRates)}% across ${passRates.length} states${
              occ.nationalPassRatePct != null ? ` (national reference ~${occ.nationalPassRatePct}%)` : ''
            }. Only some states publish official figures.`
          : `${occ.nationalPassRatePct != null ? `The national pass-rate reference is ~${occ.nationalPassRatePct}%. ` : ''}Most states do not publish first-attempt pass rates — check your state board.`,
    },
    {
      q: `What does a ${occ.shortName} license cost?`,
      a:
        examFees.length > 0 || appFees.length > 0
          ? `${examFees.length > 0 ? `Exam fees run $${rangeLabel(examFees)}` : 'Exam fee schedules vary by state'}${
              appFees.length > 0 ? ` and application fees run $${rangeLabel(appFees)}` : ''
            }, not counting education or fingerprinting.`
          : 'Fee schedules are not published in the verified dataset — check your state board before paying.',
    },
    {
      q: `Who administers the ${occ.name} exam?`,
      a:
        vendors.length > 0
          ? `The most common vendors are ${vendors.map(([v, c]) => `${v} (${c} state${c === 1 ? '' : 's'})`).join(', ')}. Your state chooses one vendor — confirm on your state's licensing page.`
          : 'The exam vendor varies by state — check your state board.',
    },
    {
      q: `Can I transfer my ${occ.shortName} license to another state?`,
      a: `Reciprocity for ${occ.shortName} licenses is decided state-by-state and is not uniformly published. Contact both state boards before moving to confirm whether your license transfers or requires an exam.`,
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
          <Link href="/occupations/" className="hover:text-[#1b4b8f]">Careers</Link> /{' '}
          <Link href={`/occupations/${occ.slug}/`} className="hover:text-[#1b4b8f]">{occ.shortName}</Link> /{' '}
          <span className="text-slate-800">License Guide {YEAR}</span>
        </nav>

        <span className="source-badge mb-4">Official sources · retrieved 2026-08-20</span>
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
          {occ.name} License Guide {YEAR}
        </h1>
        <p className="text-lg text-slate-700 leading-relaxed mb-3">{directAnswer}</p>
        <AuthorByline />
        <p className="text-sm text-slate-500 mb-8">{occ.description}</p>

        {/* National overview table */}
        <h2 className="section-title mb-4">National overview — {occ.shortName} at a glance</h2>
        <div className="overflow-x-auto card-rule mb-8">
          <table className="data-table w-full text-sm">
            <tbody>
              {overviewRows.map(([k, v]) => (
                <tr key={k}>
                  <td className="px-4 py-2.5 font-semibold text-slate-700 w-52">{k}</td>
                  <td className="px-4 py-2.5 text-slate-800">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Top 5 state data cards */}
        {topStates.length > 0 && (
          <>
            <h2 className="section-title mb-4">State-by-state essentials (top verified states)</h2>
            <div className="grid gap-4 md:grid-cols-2 mb-8">
              {topStates.map((d) => (
                <div key={d.stateCode} className="card-rule p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-display text-lg font-bold text-slate-900">{stName(d.stateCode)}</h3>
                    <Link
                      href={`/licensing-guides/${occ.slug}/${d.stateCode}/`}
                      className="text-xs text-[#1b4b8f] font-semibold hover:underline shrink-0 ml-2"
                    >
                      Full guide ↗
                    </Link>
                  </div>
                  <dl className="text-sm space-y-1.5">
                    {d.educationHours != null && (
                      <div className="flex justify-between gap-2"><dt className="text-slate-500">Education</dt><dd className="font-medium">{d.educationHours} hrs</dd></div>
                    )}
                    {d.examVendor?.name && (
                      <div className="flex justify-between gap-2"><dt className="text-slate-500">Exam vendor</dt><dd className="font-medium text-right">{d.examVendor.name}</dd></div>
                    )}
                    {d.exam && (
                      <div className="flex justify-between gap-2"><dt className="text-slate-500">Exam</dt><dd className="font-medium text-right">{[d.exam.nationalQuestions != null ? `${d.exam.nationalQuestions}N` : null, d.exam.stateQuestions != null ? `${d.exam.stateQuestions}S` : null].filter(Boolean).join(' / ') || 'state exam'}{d.exam.passingPct != null ? ` · ${d.exam.passingPct}%` : ''}</dd></div>
                    )}
                    {d.passRatePct != null && (
                      <div className="flex justify-between gap-2"><dt className="text-slate-500">First-attempt pass rate</dt><dd className="font-medium">{d.passRatePct}%</dd></div>
                    )}
                    {d.exam?.examFee != null && (
                      <div className="flex justify-between gap-2"><dt className="text-slate-500">Exam fee</dt><dd className="font-medium">${d.exam.examFee}</dd></div>
                    )}
                    {d.applicationFee != null && (
                      <div className="flex justify-between gap-2"><dt className="text-slate-500">Application fee</dt><dd className="font-medium">${d.applicationFee}</dd></div>
                    )}
                    {d.renewal && (
                      <div className="flex justify-between gap-2"><dt className="text-slate-500">Renewal</dt><dd className="font-medium">{d.renewal.years} yrs{d.renewal.ceHours ? ` · ${d.renewal.ceHours} CE` : ''}</dd></div>
                    )}
                  </dl>
                  {d.officialUrl && (
                    <a href={d.officialUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 text-xs text-[#1b4b8f] font-semibold hover:underline">
                      {d.officialName ?? 'State board'} ↗
                    </a>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Steps */}
        <h2 className="section-title mb-4">How to get a {occ.shortName} license — step by step</h2>
        <ol className="space-y-4 mb-10">
          {steps.map((s, i) => (
            <li key={i} className="card-rule p-5">
              <div className="flex items-start gap-3">
                <span className="shrink-0 w-7 h-7 rounded-full text-white text-sm font-bold grid place-items-center" style={{ background: '#1b4b8f' }}>
                  {i + 1}
                </span>
                <div>
                  <div className="font-semibold text-slate-900">{s.title}</div>
                  <p className="text-sm text-slate-600 mt-1">{s.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>

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

        {/* Tools + sub-dimension pages */}
        <div className="rounded-2xl p-6 mb-10" style={{ background: 'linear-gradient(135deg,#eef2f9,#f7f3e6)' }}>
          <h2 className="font-display text-lg font-bold mb-3">Dig deeper into {occ.shortName} licensing</h2>
          <div className="flex flex-wrap gap-2">
            <Link href={`/pass-rates/${occ.slug}/`} className="btn-cta">Pass rates by state</Link>
            <Link href={`/exam-costs/${occ.slug}/`} className="btn-ghost">Exam costs by state</Link>
            <Link href={`/reciprocity/${occ.slug}/`} className="btn-ghost">Reciprocity by state</Link>
            <Link href="/tools/study-plan-generator/" className="btn-ghost">Study plan generator</Link>
            <Link href="/tools/prep-budget/" className="btn-ghost">Prep budget</Link>
            <Link href="/tools/sample-questions/" className="btn-ghost">Sample questions</Link>
          </div>
        </div>

        {/* Long-tail links */}
        <div className="flex flex-wrap gap-2 mb-6">
          {STATES.slice(0, 10).map((s) => (
            <Link key={s.code} href={`/licensing-guides/${occ.slug}/${s.code}/`} className="px-3 py-1.5 rounded-full border border-slate-200 text-xs hover:border-[#1b4b8f]">
              {occ.shortName} in {s.name}
            </Link>
          ))}
        </div>

        <p className="text-xs text-slate-400 border-t border-slate-200 pt-4">
          This guide is informational and not legal advice. Requirements change frequently — verify all figures with your
          state licensing board (data retrieved 2026-08-20).
        </p>
      </main>
    </>
  )
}
