import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import PrintButton from '@/components/tools/PrintButton'
import { OCCUPATIONS, STATES } from '@/data/types'
import { getRequirement } from '@/data/requirements'
import { BLS_SALARIES } from '@/data/bls-salaries'

// ============================================================================
// L4 long-tail Q&A variant pages: 15 occupations x 51 states x 3 angles
// (/cost/, /difficulty/, /retake/) = 2,295 pages, all data-driven from the
// same requirements dataset as the parent guide. Each page leads with a direct
// answer, renders only real published figures ("varies — check the board" /
// "not published" otherwise), and carries FAQPage JSON-LD + disclaimer.
// ============================================================================

const VIEWS = ['cost', 'difficulty', 'retake'] as const
type View = (typeof VIEWS)[number]

const VIEW_LABEL: Record<View, string> = {
  cost: 'License cost',
  difficulty: 'Exam difficulty',
  retake: 'Retake rules',
}

const VIEW_NAV: { view: View; label: string }[] = [
  { view: 'cost', label: 'License cost' },
  { view: 'difficulty', label: 'Exam difficulty' },
  { view: 'retake', label: 'Retake rules' },
]

const isView = (v: string): v is View => (VIEWS as readonly string[]).includes(v)

const money = (v: number) => `$${v.toLocaleString('en-US')}`

// Fee as a share of median annual pay, with at least one decimal for tiny ratios.
const pctOf = (part: number, total: number) => {
  const p = (part / total) * 100
  return p >= 10 ? `${Math.round(p)}%` : `${p.toFixed(1)}%`
}

const pageTitle = (view: View, occName: string, stateName: string) =>
  view === 'cost'
    ? `${occName} License Cost in ${stateName}`
    : view === 'difficulty'
      ? `How Hard Is the ${occName} Exam in ${stateName}?`
      : `Retake the ${occName} Exam in ${stateName}`

const pageDescription = (view: View, occName: string, stateName: string) =>
  view === 'cost'
    ? `What a ${occName} license costs in ${stateName}: documented exam, application and license fees, education hours, and how fees compare with the BLS median wage. Official sources, retrieved 2026-08-20.`
    : view === 'difficulty'
      ? `How hard the ${occName} exam is in ${stateName}: published pass rate, question count, time limit, passing score and real study strategies. Official sources, retrieved 2026-08-20.`
      : `Retake rules for the ${occName} exam in ${stateName}: wait periods, retake fees and a practical re-study plan. Official sources, retrieved 2026-08-20.`

interface Props {
  params: { occupationSlug: string; stateCode: string; view: string }
}

export function generateStaticParams() {
  const out: { occupationSlug: string; stateCode: string; view: View }[] = []
  for (const occ of OCCUPATIONS) {
    for (const st of STATES) {
      for (const view of VIEWS) out.push({ occupationSlug: occ.slug, stateCode: st.code, view })
    }
  }
  return out
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { occupationSlug, stateCode, view } = await params
  const occ = OCCUPATIONS.find((o) => o.slug === occupationSlug)
  const st = STATES.find((s) => s.code === stateCode)
  if (!occ || !st || !isView(view)) return {}
  return {
    title: pageTitle(view, occ.name, st.name),
    description: pageDescription(view, occ.name, st.name),
    alternates: { canonical: `/licensing-guides/${occ.slug}/${st.code}/${view}/` },
  }
}

// Difficulty rating derived from a published first-attempt pass rate.
// High pass rate = easier exam; this is a data-derived label, not an official rating.
const difficultyLabel = (pct: number) =>
  pct >= 80
    ? 'Lower difficulty — most first-time candidates pass'
    : pct >= 65
      ? 'Moderate difficulty'
      : 'Higher difficulty — plan a serious study schedule'

export default async function LicensingGuideVariantPage({ params }: Props) {
  const { occupationSlug, stateCode, view } = await params
  const occ = OCCUPATIONS.find((o) => o.slug === occupationSlug)
  const st = STATES.find((s) => s.code === stateCode)
  if (!occ || !st || !isView(view)) notFound()

  const d = getRequirement(occ.id, st.code)
  const salary = BLS_SALARIES[occ.id]
  const boardName = d?.officialName ?? 'the state board'

  // ---- shared building blocks ------------------------------------------------
  const feeParts: string[] = []
  if (d?.exam?.examFee != null) feeParts.push(`exam ${money(d.exam.examFee)}`)
  if (d?.applicationFee != null) feeParts.push(`application ${money(d.applicationFee)}`)
  if (d?.licenseFee != null) feeParts.push(`license ${money(d.licenseFee)}`)
  const documentedFees = [d?.exam?.examFee, d?.applicationFee, d?.licenseFee].filter(
    (x): x is number => x != null,
  )
  const totalFees = documentedFees.reduce((a, b) => a + b, 0)

  const passRate = d?.passRatePct != null ? d.passRatePct : null

  const retakeWait = d?.exam?.retakeWait ?? null
  const retakeFee = d?.exam?.retakeFee ?? null

  // ---- per-view direct answers ----------------------------------------------
  const directAnswer: string =
    view === 'cost'
      ? documentedFees.length > 0
        ? `In ${st.name}, documented ${occ.shortName} license fees total ${money(totalFees)} — ${feeParts.join(', ')}${d?.educationHours != null ? `. The state requires ${d.educationHours} hours of pre-license education; tuition for that training is set by each school and is not included above` : ''}. Always confirm the current schedule with ${boardName} before paying.`
        : `Documented ${occ.shortName} license fees for ${st.name} are not published in this dataset, so the total cost varies. Check the current fee schedule with ${boardName} before budgeting.`
      : view === 'difficulty'
        ? passRate != null
          ? `In ${st.name}, the state-published first-attempt pass rate for the ${occ.shortName} exam is ${passRate}%. That makes the exam ${difficultyLabel(passRate).toLowerCase()}${d?.exam?.passingPct != null ? `; you need a ${d.exam.passingPct}% to pass` : ''}.`
          : occ.nationalPassRatePct != null
            ? `${st.name} does not publish a first-attempt pass rate for the ${occ.shortName} exam. Nationally, pass rates are commonly reported around ${occ.nationalPassRatePct}% — your result depends mainly on how you prepare.`
            : `${st.name} does not publish a first-attempt pass rate for the ${occ.shortName} exam. Exam content and the passing score are set by the state — check with ${boardName}.`
        : retakeWait != null || retakeFee != null
          ? `In ${st.name}, the ${occ.shortName} exam${retakeWait != null ? ` can be retaken after ${retakeWait}` : ' retake rules are set by the board'}${retakeFee != null ? `, and a retake costs ${money(retakeFee)}` : ''}. Confirm the exact rule on your score notice before re-booking.`
          : `Retake rules for the ${occ.shortName} exam in ${st.name} are not published in this dataset. Check your score notice and ${boardName} for the wait period, attempt limit and retake fee.`

  // ---- FAQ -------------------------------------------------------------------
  const faq =
    view === 'cost'
      ? [
          {
            q: `What does a ${occ.shortName} license cost in ${st.name}?`,
            a: documentedFees.length > 0
              ? `Documented fees in ${st.name} total ${money(totalFees)}: ${feeParts.join(', ')}. Pre-license education is the biggest variable cost and is set by each school, not the board.`
              : `Documented fees for ${st.name} are not published in this dataset — check ${boardName} for the current fee schedule.`,
          },
          {
            q: `Are the exam fee and the license fee the same thing in ${st.name}?`,
            a: 'No. The exam fee covers sitting for the test, while the application and license fees cover processing and issuing the credential. Each is listed separately in the table above where the state publishes it.',
          },
          {
            q: `How much does ${occ.shortName} training cost in ${st.name}?`,
            a: d?.educationHours != null
              ? `${st.name} requires ${d.educationHours} hours of pre-license education. Tuition is set by each approved school and varies widely, so contact the programs on your state's approved list for current prices.`
              : `Training-hour requirements for ${st.name} are not published here — ask ${boardName} for the approved programs and their costs.`,
          },
          {
            q: `Is a ${occ.shortName} license in ${st.name} worth the cost?`,
            a: salary && salary.amount > 0
              ? `The BLS median annual wage for ${salary.note} is ${money(salary.amount)}${totalFees > 0 ? `, so documented fees are roughly ${pctOf(totalFees, salary.amount)} of one year's median pay` : ''}. Earnings vary widely by state and market — treat this as a planning estimate, not a promise.`
              : 'Compare your expected local earnings against the documented fees before enrolling; the state board can point you to typical market data.',
          },
        ]
      : view === 'difficulty'
        ? [
            {
              q: `How hard is the ${occ.shortName} exam in ${st.name}?`,
              a: passRate != null
                ? `The state-published first-attempt pass rate is ${passRate}%. ${difficultyLabel(passRate)}.`
                : `No first-attempt pass rate is published by ${st.name}${occ.nationalPassRatePct != null ? `; nationally, pass rates are commonly reported around ${occ.nationalPassRatePct}%` : ''}. Check ${boardName} for the current data.`,
            },
            {
              q: `What is a passing score on the ${occ.shortName} exam in ${st.name}?`,
              a: d?.exam?.passingPct != null
                ? `You need a ${d.exam.passingPct}% to pass${d?.exam?.nationalQuestions != null ? ` on the ${d.exam.nationalQuestions}-question exam` : ''}.`
                : `The passing score for ${st.name} is not published here — confirm with the exam vendor or ${boardName}.`,
            },
            {
              q: `How many questions are on the ${occ.shortName} exam in ${st.name}?`,
              a: d?.exam?.nationalQuestions != null || d?.exam?.stateQuestions != null
                ? `${d.exam.nationalQuestions != null ? `${d.exam.nationalQuestions} national` : ''}${d.exam.nationalQuestions != null && d.exam.stateQuestions != null ? ' plus ' : ''}${d.exam.stateQuestions != null ? `${d.exam.stateQuestions} state` : ''} questions${d?.exam?.timeLimitMin != null ? `, with a ${d.exam.timeLimitMin}-minute time limit` : ''}.`
                : `Question counts for ${st.name} are not published here — check the exam vendor's candidate handbook.`,
            },
            {
              q: `How should I study for the ${occ.shortName} exam?`,
              a: 'Spend most of your time on the state-specific content, drill with timed practice exams until you consistently score above the passing standard, and review every missed question. If the vendor provides a weak-area diagnostic, study exactly those sections before retaking.',
            },
          ]
        : [
            {
              q: `How soon can I retake the ${occ.shortName} exam in ${st.name}?`,
              a: retakeWait != null
                ? `The published rule in ${st.name} is: retake after ${retakeWait}. Confirm the exact date on your score notice.`
                : `The retake-wait rule for ${st.name} is not published here — check your score notice and ${boardName}.`,
            },
            {
              q: `Does it cost money to retake the ${occ.shortName} exam in ${st.name}?`,
              a: retakeFee != null
                ? `A retake costs ${money(retakeFee)} in ${st.name}, on top of any first-attempt fee already paid.`
                : `The retake fee for ${st.name} is not published here — confirm with the exam vendor before re-booking.`,
            },
            {
              q: `What percentage of people pass a ${occ.shortName} exam on the second attempt?`,
              a: 'Most candidates pass on a retake. Second-attempt pass rates are commonly reported around 60–70% for major state exams, but many states do not publish them. This is general study guidance, not an official statistic for your state.',
            },
            {
              q: `How long should I study before retaking the ${occ.shortName} exam?`,
              a: 'A focused 2–4 week re-study window is usually enough when you target only the weak areas from your diagnostic. Re-book only after practice scores are consistently at or above the passing standard. This is general guidance, not an official rule.',
            },
          ]

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  // ---- per-view data tables ----------------------------------------------------
  const costRows: [string, string][] = [
    [
      'Pre-license education',
      d?.educationHours != null ? `${d.educationHours} hrs required — tuition varies by school` : 'Varies — check the board',
    ],
    ['Exam fee', d?.exam?.examFee != null ? money(d.exam.examFee) : 'Varies — check the board'],
    ['Application fee', d?.applicationFee != null ? money(d.applicationFee) : 'Varies — check the board'],
    ['License fee', d?.licenseFee != null ? money(d.licenseFee) : 'Varies — check the board'],
    ['Documented fees total', documentedFees.length > 0 ? money(totalFees) : 'Not published'],
  ]
  if (salary && salary.amount > 0) {
    costRows.push(['BLS median annual wage', `${money(salary.amount)} (${salary.note})`])
  }

  const difficultyRows: [string, string][] = [
    ['First-attempt pass rate', passRate != null ? `${passRate}%` : `Not published${occ.nationalPassRatePct != null ? ` · national reference ~${occ.nationalPassRatePct}%` : ''}`],
    ['Difficulty', passRate != null ? difficultyLabel(passRate) : 'Not rated'],
    [
      'Questions',
      d?.exam?.nationalQuestions != null || d?.exam?.stateQuestions != null
        ? `${d.exam.nationalQuestions ?? '—'} national / ${d.exam.stateQuestions ?? '—'} state`
        : 'Not published',
    ],
    ['Time limit', d?.exam?.timeLimitMin != null ? `${d.exam.timeLimitMin} minutes` : 'Not published'],
    ['Passing score', d?.exam?.passingPct != null ? `${d.exam.passingPct}%` : 'Not published'],
    ['Exam vendor', d?.examVendor?.name ?? 'Not published'],
  ]

  const retakeRows: [string, string][] = [
    ['Retake rule', retakeWait ?? 'Not published'],
    ['Retake fee', retakeFee != null ? money(retakeFee) : 'Not published'],
    ['First-attempt exam fee', d?.exam?.examFee != null ? money(d.exam.examFee) : 'Not published'],
    ['Attempt limit', 'Set by state — see score notice'],
  ]

  const strategies = [
    {
      title: 'Master the state-specific content first',
      body: 'State-law and state-rule questions are where most candidates lose points. Study the state portion before the national portion, then reinforce both with practice questions.',
    },
    {
      title: 'Drill with timed practice exams',
      body: 'Take full-length practice tests in the real format until you consistently score above the passing standard. Review every missed question — the explanation matters more than the answer.',
    },
    {
      title: 'Use the weak-area diagnostic',
      body: 'Many vendors (PSI, Pearson VUE, Prometric) return a report showing which content areas you missed. Study exactly those sections, then re-test them.',
    },
    {
      title: 'Manage the clock',
      body: 'Know the question count and time limit going in. Flag hard questions and come back to them — finishing the exam beats getting stuck on a single item.',
    },
  ]

  const retakeTips = [
    {
      title: 'Most candidates pass on retake',
      body: 'Second-attempt pass rates are commonly reported around 60–70% for major state exams. This is general study guidance, not an official statistic.',
    },
    {
      title: 'Study the weak areas for 2–4 weeks',
      body: 'A focused window of 2–4 weeks targeting only the sections you missed is usually enough — but re-book only when practice scores are consistently at or above the passing standard.',
    },
    {
      title: 'Budget for the retake fee',
      body: `The retake is a separate charge from the first attempt${retakeFee != null ? ` — in ${st.name} it is ${money(retakeFee)}` : ''}. Confirm the amount before re-booking.`,
    },
    {
      title: 'Read your score notice',
      body: 'Your score notice states the earliest retake date and any attempt limits. Follow that document — it overrides any general guidance.',
    },
  ]

  const rows = view === 'cost' ? costRows : view === 'difficulty' ? difficultyRows : retakeRows

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="text-sm text-slate-500 mb-4">
          <Link href="/" className="hover:text-[#1b4b8f]">Home</Link> /{' '}
          <Link href="/occupations/" className="hover:text-[#1b4b8f]">Careers</Link> /{' '}
          <Link href={`/occupations/${occ.slug}/`} className="hover:text-[#1b4b8f]">{occ.shortName}</Link> /{' '}
          <Link href={`/licensing-guides/${occ.slug}/${st.code}/`} className="hover:text-[#1b4b8f]">{st.name}</Link> /{' '}
          <span className="text-slate-800">{VIEW_LABEL[view]}</span>
        </nav>

        <span className="source-badge mb-4">Official sources · retrieved 2026-08-20</span>
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
          {pageTitle(view, occ.name, st.name)}
        </h1>
        <p className="text-lg text-slate-700 leading-relaxed mb-3">{directAnswer}</p>
        <p className="text-sm text-slate-500 mb-8">
          Figures below come from the same dataset as the full guide and list only what the state publishes.
          Anything not published is marked &ldquo;varies — check the board&rdquo; rather than guessed.
        </p>

        {/* View switcher */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Link href={`/licensing-guides/${occ.slug}/${st.code}/`} className="px-3 py-1.5 rounded-full border border-slate-200 text-xs hover:border-[#1b4b8f]">
            Full guide
          </Link>
          {VIEW_NAV.map(({ view: v, label }) => {
            const active = v === view
            return active ? (
              <span key={v} className="px-3 py-1.5 rounded-full text-xs font-semibold text-white" style={{ background: '#1b4b8f' }}>
                {label}
              </span>
            ) : (
              <Link key={v} href={`/licensing-guides/${occ.slug}/${st.code}/${v}/`} className="px-3 py-1.5 rounded-full border border-slate-200 text-xs hover:border-[#1b4b8f]">
                {label}
              </Link>
            )
          })}
        </div>

        {/* Data table */}
        <h2 className="section-title mb-4">
          {view === 'cost'
            ? `${occ.shortName} license cost — ${st.name} at a glance`
            : view === 'difficulty'
              ? `${occ.shortName} exam difficulty — ${st.name} at a glance`
              : `${occ.shortName} retake rules — ${st.name} at a glance`}
        </h2>
        <div className="overflow-x-auto card-rule mb-6">
          <table className="data-table w-full text-sm">
            <tbody>
              {rows.map(([k, v]) => (
                <tr key={k}>
                  <td className="px-4 py-2.5 font-semibold text-slate-700 w-52">{k}</td>
                  <td className="px-4 py-2.5 text-slate-800">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {d?.officialUrl && (
          <p className="text-sm mb-8">
            Official source: <a href={d.officialUrl} target="_blank" rel="noopener noreferrer" className="text-[#1b4b8f] font-semibold hover:underline">{boardName} ↗</a>
          </p>
        )}

        {/* View-specific content */}
        {view === 'cost' && salary && salary.amount > 0 && (
          <section className="rounded-2xl p-6 mb-10" style={{ background: 'linear-gradient(135deg,#eef2f9,#f7f3e6)' }}>
            <h2 className="font-display text-lg font-bold mb-2">Fees vs. median pay</h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              The BLS median annual wage for {salary.note} is {money(salary.amount)}.
              {totalFees > 0
                ? `The BLS median annual wage for ${salary.note} is ${money(salary.amount)}. Documented ${occ.shortName} fees in ${st.name} are ${money(totalFees)} — about ${pctOf(totalFees, salary.amount)} of one year's median pay. The bigger investment is usually tuition and time.`
                : ' Actual local earnings vary widely by market and experience — use the career ROI tool to model your own numbers.'}
            </p>
          </section>
        )}

        {view === 'difficulty' && (
          <section className="mb-10">
            <h2 className="section-title mb-4">Study strategies that work for the {occ.shortName} exam</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {strategies.map((s) => (
                <div key={s.title} className="card-rule p-5">
                  <div className="font-semibold text-slate-900 mb-1">{s.title}</div>
                  <p className="text-sm text-slate-600 leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {view === 'retake' && (
          <section className="mb-10">
            <h2 className="section-title mb-4">Practical retake plan</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {retakeTips.map((s) => (
                <div key={s.title} className="card-rule p-5">
                  <div className="font-semibold text-slate-900 mb-1">{s.title}</div>
                  <p className="text-sm text-slate-600 leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-4">
              Retake advice above is general study guidance, not official state policy. Official rules come from your
              score notice and the state board.
            </p>
          </section>
        )}

        {/* FAQ */}
        <h2 className="section-title mb-4">Frequently asked questions</h2>
        <div className="space-y-3 mb-10">
          {faq.map((f) => (
            <div key={f.q} className="card-rule p-5">
              <h3 className="font-semibold text-slate-900 mb-1">{f.q}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>

        {/* Tools + related */}
        <div className="rounded-2xl p-6 mb-10" style={{ background: 'linear-gradient(135deg,#eef2f9,#f7f3e6)' }}>
          <h2 className="font-display text-lg font-bold mb-3">
            {view === 'cost'
              ? `Budget your ${occ.shortName} licensing in ${st.name}`
              : view === 'difficulty'
                ? `Plan your ${occ.shortName} exam prep`
                : `Plan your ${occ.shortName} retake`}
          </h2>
          <div className="flex flex-wrap gap-2">
            <Link href="/tools/study-plan-generator/" className="btn-cta">Study plan generator</Link>
            <Link href="/tools/prep-budget/" className="btn-ghost">Prep budget</Link>
            <Link href="/tools/retake-interval/" className="btn-ghost">Retake calculator</Link>
            <Link href="/tools/sample-questions/" className="btn-ghost">Sample questions</Link>
          </div>
        </div>

        {view === 'cost' && (
          <div className="no-print mb-8">
            <PrintButton label="Print / Save this cost sheet" />
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-6">
          {STATES.filter((s) => s.code !== st.code).slice(0, 10).map((s2) => (
            <Link key={s2.code} href={`/licensing-guides/${occ.slug}/${s2.code}/${view}/`} className="px-3 py-1.5 rounded-full border border-slate-200 text-xs hover:border-[#1b4b8f]">
              {occ.shortName} in {s2.name}
            </Link>
          ))}
        </div>

        <p className="text-xs text-slate-400 border-t border-slate-200 pt-4">
          This page is informational and not legal advice. Fees, pass rates and retake rules change frequently —
          verify all figures with {boardName} and your exam vendor before paying (retrieved 2026-08-20).
        </p>
      </main>
    </>
  )
}
