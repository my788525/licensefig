import type { Metadata } from 'next'
import PassRateIndex from '@/components/tools/PassRateIndex'

const SLUG = 'pass-rate-index'

export const metadata: Metadata = {
  title: 'Pass Rate Index — Compare States by Difficulty',
  description:
    'Rank states by first-attempt exam pass rate for each licensed career, with a Low / Med / High difficulty label. Only ~15–20 states publish official pass rates — missing ones are marked “not published”.',
  alternates: { canonical: `https://licensefig.com/tools/${SLUG}/` },
  openGraph: {
    title: 'Pass Rate Index — LicenseFig',
    description: 'Compare first-attempt pass rates across states for 15 licensed careers.',
    type: 'website',
  },
}

export default function PassRateIndexPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Which states are ranked in the pass rate index?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Only states that publish an official first-attempt pass rate are ranked, highest first. Most states never release these figures — only about 15–20 states publish official pass rates — so the rest are listed separately as “not published”.',
        },
      },
      {
        '@type': 'Question',
        name: 'What do Low, Med and High difficulty mean?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'They are rough labels derived from the published pass rate: 80% or higher = Low, 65–79% = Med, below 65% = High. A high pass rate reflects who shows up prepared, not that the exam is easy.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why does my state have no pass rate?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The state board simply may not publish first-attempt pass rates. Rates also change every testing cycle, so even published figures should be verified with the state board or exam vendor.',
        },
      },
    ],
  }

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <h1 className="text-3xl font-extrabold text-slate-900">Pass Rate Index</h1>
      <p className="mt-2 text-slate-600">
        Pick a career to rank states by published first-attempt pass rate, with a rough Low / Med / High difficulty
        label. Only about 15–20 states publish official pass rates — states without data are marked “not published”.
      </p>
      <div className="mt-6">
        <PassRateIndex />
      </div>
    </main>
  )
}
