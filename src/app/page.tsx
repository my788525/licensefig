import Link from 'next/link'
import type { Metadata } from 'next'
import { OCCUPATIONS } from '@/data/types'
import { homeDescription } from '@/lib/serp_variants'

export const metadata: Metadata = {
  title: `How do I get licensed in my state? Requirements, exam & costs for 15 careers (2026)`,
  description: homeDescription(),
}

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
        {/* Hero — authoritative */}
        <section
          className="text-white relative"
          style={{
            backgroundImage: "url('/images/hero-capitol.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
          }}
        >
          <div className="absolute inset-0" style={{ background: 'linear-gradient(105deg, rgba(11,37,69,0.94) 0%, rgba(11,37,69,0.82) 45%, rgba(27,75,143,0.55) 100%)' }} />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-6" style={{ background: 'rgba(201,162,39,0.15)', border: '1px solid rgba(201,162,39,0.5)', color: '#e8d48a' }}>
                ⭐ Official state-board data · retrieved 2026-08-20
              </div>
              <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight mb-5">
                The license road, <span style={{ color: '#e8d48a' }}>state by state</span>
              </h1>
              <p className="text-lg md:text-xl text-blue-100 max-w-2xl mb-8 leading-relaxed">
                Requirements, exam structure, costs, pass rates, retake rules and reciprocity for{' '}
                <strong className="text-white">{OCCUPATIONS.length} licensed careers</strong> across all 50 states —
                plus 21 free planning tools for every step from first search to exam day.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="/tools/license-journey/" className="btn-cta">
                  🧭 Plan your license journey
                </a>
                <a href="/tools/requirements-lookup/" className="btn-ghost" style={{ borderColor: 'rgba(255,255,255,0.5)', color: '#fff', background: 'rgba(255,255,255,0.08)' }}>
                  Look up requirements
                </a>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-blue-200">
                <span>✓ 15 occupations</span>
                <span>✓ 51 jurisdictions</span>
                <span>✓ 21 planning tools</span>
                <span>✓ Open datasets (CC BY 4.0)</span>
              </div>
              <p className="mt-6 text-[11px] text-blue-300/70">
                Photo: U.S. Capitol Building — <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-200">Unsplash</a> (free license)
              </p>
            </div>
          </div>
        </section>

        {/* Occupations grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="section-title">15 licensed careers, 51 jurisdictions</h2>
              <p className="text-slate-500 mt-2 max-w-2xl">
                Every career gets a state-by-state requirement matrix, exam structure, cost &amp; pass-rate
                data, retake rules and reciprocity notes — plus the shared planning tools below.
              </p>
            </div>
            <Link href="/occupations/" className="hidden md:inline-block text-sm font-semibold text-[#1b4b8f] hover:underline">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {OCCUPATIONS.map((o) => (
              <Link
                key={o.id}
                href={`/occupations/${o.slug}/`}
                className="card-rule p-4 hover:border-[#1b4b8f] hover:shadow-md transition"
              >
                <div className="text-2xl mb-1">{o.emoji}</div>
                <div className="font-semibold text-sm leading-snug">{o.shortName}</div>
                <div className="text-xs text-slate-500 mt-1 uppercase tracking-wide">{o.category}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* Tools strip */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="rounded-2xl p-6 md:p-8" style={{ background: 'linear-gradient(135deg,#eef2f9,#f7f3e6)' }}>
            <h2 className="section-title mb-2">21 planning tools — free, printable</h2>
            <p className="text-slate-600 mb-5 text-sm">Every tool runs in your browser, prints cleanly on US Letter, and cites its data source.</p>
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
                <Link key={href} href={href} className="rounded-lg bg-white border border-slate-200 px-3 py-2.5 hover:border-[#1b4b8f] hover:text-[#1b4b8f] shadow-sm">
                  {label}
                </Link>
              ))}
            </div>
            <Link href="/tools/" className="inline-block mt-4 text-sm font-semibold text-[#1b4b8f] hover:underline">
              All 21 tools →
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
