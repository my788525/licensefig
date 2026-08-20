import Link from 'next/link'
import { OCCUPATIONS } from '@/data/types'

export default function HomePage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What does LicenseFig do?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'LicenseFig gives you the planning layer of the licensing road: state-by-state license requirements, exam structure, costs, pass rates, retake rules and reciprocity for 15 licensed careers — plus free tools to plan your study, budget and timeline.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is the data official?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Each state page cites its state board or exam vendor (PSI, Pearson VUE, Credentia, CMS) with a retrieval date. Requirements change — always verify with your state board before enrolling or paying.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you sell exam prep courses?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. We are not a course or question-bank platform. We keep planning tools free and, where useful, point you to reputable exam prep providers. Practice questions on this site are original sample questions, not actual exam questions.',
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
              The license road, <span className="text-amber-300">state by state</span>
            </h1>
            <p className="text-lg md:text-xl text-indigo-100 max-w-3xl mx-auto mb-8">
              Requirements, exam structure, costs, pass rates, retake rules and reciprocity for{' '}
              <strong>{OCCUPATIONS.length} licensed careers</strong> across all 50 states — plus free tools
              to plan every step from “thinking about it” to “first day on the job”.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/tools/" className="px-6 py-3 rounded-xl bg-white text-indigo-700 font-semibold hover:bg-indigo-50">
                Browse the tools
              </Link>
              <Link href="/occupations/" className="px-6 py-3 rounded-xl bg-indigo-500/40 border border-indigo-300/50 text-white font-semibold hover:bg-indigo-500/60">
                Pick a career
              </Link>
            </div>
          </div>
        </section>

        {/* Occupations grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold mb-2">15 licensed careers, 50 states</h2>
          <p className="text-slate-500 mb-6">
            Every career gets a state-by-state requirement matrix, exam structure, cost &amp; pass-rate data,
            retake rules and reciprocity notes — plus the shared planning tools below.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {OCCUPATIONS.map((o) => (
              <Link
                key={o.id}
                href={`/occupations/${o.slug}/`}
                className="rounded-xl border border-slate-200 p-4 hover:border-indigo-300 hover:shadow-sm transition"
              >
                <div className="text-2xl mb-1">{o.emoji}</div>
                <div className="font-semibold text-sm leading-snug">{o.shortName}</div>
                <div className="text-xs text-slate-500 mt-1">{o.category}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* Tools strip */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-6 md:p-8">
            <h2 className="text-xl font-bold mb-4">Planning tools (free, printable)</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              {[
                ['/tools/requirements-lookup/', 'State Requirements Lookup'],
                ['/tools/study-plan-generator/', 'Study Plan Generator'],
                ['/tools/prep-budget/', 'Prep Budget Calculator'],
                ['/tools/retake-interval/', 'Retake Interval Calculator'],
                ['/tools/pass-rate-index/', 'Pass Rate Difficulty Index'],
                ['/tools/reciprocity-checker/', 'Reciprocity Checker'],
                ['/tools/exam-cost-compare/', 'Exam Cost Compare'],
                ['/tools/test-center-finder/', 'Test Center Finder'],
              ].map(([href, label]) => (
                <Link key={href} href={href} className="rounded-lg bg-white border border-slate-200 px-3 py-2.5 hover:border-indigo-300 hover:text-indigo-700">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
