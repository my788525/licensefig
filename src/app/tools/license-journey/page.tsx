import type { Metadata } from 'next'
import Link from 'next/link'
import LicenseJourneyWizard from '@/components/tools/LicenseJourneyWizard'

export const metadata: Metadata = {
  title: 'License Journey Planner — Full Lifecycle Roadmap',
  description:
    'Plan your entire license lifecycle in one printable roadmap: eligibility, education, background check, exam, issuance, renewal and advancement — with real state data and the right tool embedded at every stage.',
  alternates: { canonical: '/tools/license-journey/' },
}

export default function LicenseJourneyPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What does the license journey planner do?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Pick a career and a state (or enter your ZIP), and get a printable end-to-end roadmap of your license lifecycle: eligibility, pre-license education, background check, exam, issuance, renewal and advancement — each stage linking the tool that does the work.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are the timelines accurate?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Timelines are planning estimates based on documented education hours and typical study/processing times, not guarantees. Waiting periods and scheduling vary by state and testing vendor.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where does the requirement data come from?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'From state licensing boards, PSI, Pearson VUE, Credentia and CMS, retrieved 2026-08-20. Fields not officially published render as "verify with your state board" rather than invented values.',
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="text-sm text-slate-500 mb-4">
          <Link href="/" className="hover:text-[#1b4b8f]">Home</Link> /{' '}
          <Link href="/tools/" className="hover:text-[#1b4b8f]">Tools</Link> /{' '}
          <span className="text-slate-800">License Journey Planner</span>
        </nav>

        <span className="source-badge mb-4">Official state-board data · retrieved 2026-08-20</span>
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">
          License Journey Planner
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl mb-8">
          The full lifecycle of a license — from first search to renewal and advancement — on one
          printable roadmap, with the right tool at every stage.
        </p>

        <LicenseJourneyWizard />

        <div className="rounded-2xl p-6" style={{ background: 'linear-gradient(135deg,#eef2f9,#f7f3e6)' }}>
          <h2 className="font-display text-lg font-bold mb-3">Every step, tooled</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            {[
              ['/tools/requirements-lookup/', 'Requirements lookup'],
              ['/tools/study-plan-generator/', 'Study plan'],
              ['/tools/prep-budget/', 'Prep budget'],
              ['/tools/retake-interval/', 'Retake calculator'],
              ['/tools/exam-day-checklist/', 'Exam day checklist'],
              ['/tools/ce-requirements/', 'CE requirements'],
              ['/tools/license-renewal/', 'Renewal calculator'],
              ['/tools/license-progress-tracker/', 'Progress tracker'],
            ].map(([href, label]) => (
              <Link key={href} href={href} className="rounded-lg bg-white border border-slate-200 px-3 py-2.5 hover:border-[#1b4b8f] hover:text-[#1b4b8f]">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
