import type { Metadata } from 'next'
import ExamCostCompare from '@/components/tools/ExamCostCompare'

const SLUG = 'exam-cost-compare'

export const metadata: Metadata = {
  title: 'Exam Cost Compare — Fees by State',
  description:
    'Compare exam and application fees across all 50 states for each licensed career, sorted lowest to highest, with the cheapest and most expensive states highlighted.',
  alternates: { canonical: `https://licensefig.com/tools/${SLUG}/` },
  openGraph: {
    title: 'Exam Cost Compare — LicenseFig',
    description: 'Compare licensing exam and application fees across all 50 states.',
    type: 'website',
  },
}

export default function ExamCostComparePage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What fees does the compare table include?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Each state row shows the published exam fee and application fee where available, plus their total. States with no published fees are listed separately with a note that official fees vary.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why are some states missing from the ranking?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The ranking only includes states with published fee data. Many boards do not publish application fees alongside exam fees, so those states are excluded from the lowest/highest highlights and marked as “no data”.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do these fees include everything?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No — the table covers exam and application fees only. Fingerprinting, education, license issuance and renewal fees are separate and vary by state. Confirm the full fee schedule with the state board before paying.',
        },
      },
    ],
  }

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <h1 className="text-3xl font-extrabold text-slate-900">Exam Cost Compare</h1>
      <p className="mt-2 text-slate-600">
        Pick a career to see exam and application fees across all 50 states, sorted from cheapest to most expensive,
        with the lowest and highest states highlighted. Fees not published are marked clearly — official fees vary.
      </p>
      <div className="mt-6">
        <ExamCostCompare />
      </div>
    </main>
  )
}
