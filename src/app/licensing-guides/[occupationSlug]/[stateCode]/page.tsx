import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { OCCUPATIONS, STATES, getOccupation } from '@/data/types'
import { getRequirement } from '@/data/requirements'

// Second content wave: 15 occupations x 20 high-demand states = 300 long-tail
// guide pages ("How to become a X in [State]"). Every page is data-driven:
// ≥8 real fields from the requirements dataset → pages differ by real numbers,
// not template swaps. Missing fields render "verify with your state board".
// All 50 states + DC: full long-tail coverage
const TOP_STATES = STATES.map((x) => x.code)

interface Props {
  params: { occupationSlug: string; stateCode: string }
}

export function generateStaticParams() {
  const out: { occupationSlug: string; stateCode: string }[] = []
  for (const occ of OCCUPATIONS) {
    for (const sc of TOP_STATES) out.push({ occupationSlug: occ.slug, stateCode: sc })
  }
  return out
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { occupationSlug, stateCode } = await params
  const occ = OCCUPATIONS.find((o) => o.slug === occupationSlug)
  const st = STATES.find((s) => s.code === stateCode)
  if (!occ || !st) return {}
  return {
    title: `${occ.name} in ${st.name}`,
    description: `Step-by-step ${occ.name} licensing guide for ${st.name}: education hours, exam structure, fees, pass rate, retake rules and reciprocity. Official sources, retrieved 2026-08-20.`,
    alternates: { canonical: `/licensing-guides/${occ.slug}/${st.code}/` },
  }
}

const fmt = (v: number | undefined, suffix = '') => (v != null ? `${v}${suffix}` : '—')

export default async function LicensingGuidePage({ params }: Props) {
  const { occupationSlug, stateCode } = await params
  const occ = OCCUPATIONS.find((o) => o.slug === occupationSlug)
  const st = STATES.find((s) => s.code === stateCode)
  if (!occ || !st) notFound()

  const d = getRequirement(occ.id, st.code)
  const year = new Date().getFullYear()

  // Data-driven direct answer (first 50 words = the answer, citation-friendly)
  const directAnswer = d
    ? `In ${st.name}, a ${occ.shortName} license typically requires ${
        d.educationHours != null ? `${d.educationHours} hours of pre-license education, ` : ''
      }a ${d.exam?.nationalQuestions != null ? `${d.exam.nationalQuestions}-question national plus ` : ''}${
        d.exam?.stateQuestions != null ? `${d.exam.stateQuestions} state questions` : 'state exam'
      }${d.exam?.passingPct != null ? `, a ${d.exam.passingPct}% passing score` : ''}${
        d.exam?.examFee != null ? `, and a $${d.exam.examFee} exam fee` : ''
      }.`
    : `In ${st.name}, ${occ.shortName} licensing requirements are set by the state ${occ.category === 'healthcare' ? 'health department' : 'licensing board'} and vary by year.`
    // (kept as a single expression for stable extraction)

  const steps = [
    { title: 'Meet the basic requirements', body: d?.ageMinimum != null ? `Minimum age ${d.ageMinimum}${d.backgroundCheck ? '; a criminal background check is required.' : '.'}` : 'Age and background check rules vary — confirm with the state board.' },
    { title: 'Complete pre-license education', body: d?.educationHours != null ? `${d.educationHours} hours of approved training is the documented requirement in ${st.name}.` : 'Required training hours are not published here — check with the state board for the current figure.' },
    { title: 'Register and pass the exam', body: d?.examVendor?.name ? `The exam is administered by ${d.examVendor.name}${d.exam?.timeLimitMin ? ` with a ${d.exam.timeLimitMin}-minute time limit` : ''}${d.exam?.passingPct ? `; you need ${d.exam.passingPct}% to pass` : ''}.` : 'The exam vendor varies — check the official board site.' },
    { title: 'Pay fees and get licensed', body: [d?.exam?.examFee != null ? `Exam fee $${d.exam.examFee}` : null, d?.applicationFee != null ? `application $${d.applicationFee}` : null, d?.licenseFee != null ? `license $${d.licenseFee}` : null].filter(Boolean).join(' · ') || 'Fee schedule not published here — verify with the board.' },
    { title: 'Stay current', body: d?.renewal ? `License renews every ${d.renewal.years} years${d.renewal.ceHours ? ` with ${d.renewal.ceHours} hours of continuing education` : ''}.` : 'Renewal cycle and CE requirements vary — check the board.' },
  ]

  const faq = [
    { q: `How long does it take to get a ${occ.shortName} license in ${st.name}?`, a: `After completing ${d?.educationHours != null ? `${d.educationHours} hours of education` : 'the required education'}, most candidates need 4-12 weeks of study before the exam. Total timeline depends on scheduling.` },
    { q: `How hard is the ${occ.shortName} exam in ${st.name}?`, a: d?.passRatePct != null ? `The state-published first-attempt pass rate is ${d.passRatePct}%.` : `Official first-attempt pass rates are not published by ${st.name}; check the state board.` },
    { q: `What does the ${occ.shortName} license cost in ${st.name}?`, a: [d?.exam?.examFee != null ? `The exam fee is $${d.exam.examFee}` : null, d?.applicationFee != null ? `the application fee is $${d.applicationFee}` : null, d?.licenseFee != null ? `and the license fee is $${d.licenseFee}` : null].filter(Boolean).join(', ') || 'Fees are not published here — check the official board site.' },
    { q: `Can I transfer my ${occ.shortName} license to ${st.name}?`, a: d?.reciprocity ? `Reciprocity: ${d.reciprocity}.` : `Reciprocity rules for ${st.name} are not published here — check both state boards.` },
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
          <span className="text-slate-800">{st.name}</span>
        </nav>

        <span className="source-badge mb-4">Official sources · retrieved 2026-08-20</span>
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
          How to Become a {occ.name} in {st.name}
        </h1>
        <p className="text-lg text-slate-700 leading-relaxed mb-3">{directAnswer}</p>
        <p className="text-sm text-slate-500 mb-8">
          {occ.description} Requirements change — always confirm with {d?.officialName ?? 'the state board'} before paying.
        </p>

        {/* L4 long-tail variants */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Link href={`/licensing-guides/${occ.slug}/${st.code}/cost/`} className="px-3 py-1.5 rounded-full border border-slate-200 text-xs hover:border-[#1b4b8f]">
            License cost
          </Link>
          <Link href={`/licensing-guides/${occ.slug}/${st.code}/difficulty/`} className="px-3 py-1.5 rounded-full border border-slate-200 text-xs hover:border-[#1b4b8f]">
            Exam difficulty
          </Link>
          <Link href={`/licensing-guides/${occ.slug}/${st.code}/retake/`} className="px-3 py-1.5 rounded-full border border-slate-200 text-xs hover:border-[#1b4b8f]">
            Retake rules
          </Link>
        </div>

        <h2 className="section-title mb-4">Licensing steps in {st.name}</h2>
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

        {/* Data table */}
        <h2 className="section-title mb-4">{occ.shortName} requirements — {st.name} at a glance</h2>
        <div className="overflow-x-auto card-rule mb-8">
          <table className="data-table w-full text-sm">
            <tbody>
              {[
                ['Education hours', fmt(d?.educationHours, ' hrs')],
                ['Exam vendor', d?.examVendor?.name ?? '—'],
                ['Questions (national/state)', d?.exam ? `${fmt(d.exam.nationalQuestions)} / ${fmt(d.exam.stateQuestions)}` : '—'],
                ['Passing score', fmt(d?.exam?.passingPct, '%')],
                ['Exam fee', d?.exam?.examFee != null ? `$${d.exam.examFee}` : '—'],
                ['Application fee', d?.applicationFee != null ? `$${d.applicationFee}` : '—'],
                ['License fee', d?.licenseFee != null ? `$${d.licenseFee}` : '—'],
                ['First-attempt pass rate', d?.passRatePct != null ? `${d.passRatePct}%` : 'not published'],
                ['Retake rule', d?.exam?.retakeWait ?? '—'],
                ['Renewal', d?.renewal ? `every ${d.renewal.years} years${d.renewal.ceHours ? ` · ${d.renewal.ceHours} CE` : ''}` : '—'],
                ['Reciprocity', d?.reciprocity ?? '—'],
              ].map(([k, v]) => (
                <tr key={k}>
                  <td className="px-4 py-2.5 font-semibold text-slate-700 w-48">{k}</td>
                  <td className="px-4 py-2.5 text-slate-800">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {d?.officialUrl && (
          <p className="text-sm mb-10">
            Official source: <a href={d.officialUrl} target="_blank" rel="noopener noreferrer" className="text-[#1b4b8f] font-semibold hover:underline">{d.officialName ?? 'State board'} ↗</a>
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

        {/* Tools + related */}
        <div className="rounded-2xl p-6 mb-10" style={{ background: 'linear-gradient(135deg,#eef2f9,#f7f3e6)' }}>
          <h2 className="font-display text-lg font-bold mb-3">Plan your {occ.shortName} licensing in {st.name}</h2>
          <div className="flex flex-wrap gap-2">
            <Link href="/tools/study-plan-generator/" className="btn-cta">Study plan generator</Link>
            <Link href="/tools/prep-budget/" className="btn-ghost">Prep budget</Link>
            <Link href="/tools/retake-interval/" className="btn-ghost">Retake calculator</Link>
            <Link href="/tools/sample-questions/" className="btn-ghost">Sample questions</Link>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {TOP_STATES.filter((s) => s !== st.code).slice(0, 10).map((sc) => {
            const s2 = STATES.find((x) => x.code === sc)
            return s2 ? (
              <Link key={sc} href={`/licensing-guides/${occ.slug}/${sc}/`} className="px-3 py-1.5 rounded-full border border-slate-200 text-xs hover:border-[#1b4b8f]">
                {occ.shortName} in {s2.name}
              </Link>
            ) : null
          })}
        </div>

        <p className="text-xs text-slate-400 border-t border-slate-200 pt-4">
          This guide is informational and not legal advice. Requirements change frequently — verify all
          figures with {d?.officialName ?? 'the state licensing board'} (retrieved 2026-08-20).
        </p>
      </main>
    </>
  )
}
