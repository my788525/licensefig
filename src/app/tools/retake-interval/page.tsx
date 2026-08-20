import type { Metadata } from 'next'
import RetakeIntervalCalculator from '@/components/tools/RetakeIntervalCalculator'

const SLUG = 'retake-interval'

export const metadata: Metadata = {
  title: 'Retake Interval Calculator — Earliest Retake Date',
  description:
    'Find the earliest date you can retake your licensing exam by state: retake wait rules, retake fees and a recommended re-study window. Real rules for CA, FL, NC, TX and more.',
  alternates: { canonical: `https://licensefig.com/tools/${SLUG}/` },
  openGraph: {
    title: 'Retake Interval Calculator — LicenseFig',
    description: 'Calculate your earliest exam retake date, fee and study window by state.',
    type: 'website',
  },
}

export default function RetakeIntervalCalculatorPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How is the earliest retake date calculated?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The tool reads the published retake-wait rule for the occupation and state (e.g. “10 days” or “24 hours”) and adds that interval to your last exam date. For rules like “3 attempts per year” it cannot compute a calendar date, so it explains the limit and tells you to confirm the exact date on your score notice.',
        },
      },
      {
        '@type': 'Question',
        name: 'What if no retake rule is published for my state?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The tool falls back to a small set of well-known general state rules (CA next day, FL 24 hours, NC 10 days, TX 3 attempts per year) and clearly labels them as unverified for your occupation. If no rule exists at all it shows “check with your state board”.',
        },
      },
      {
        '@type': 'Question',
        name: 'How soon should I retake the exam?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'As soon as the rule allows, but only after you have reviewed the failed sections and are consistently scoring at or above the passing standard on practice sets. The tool suggests retaking within 1–4 weeks of that point to keep momentum.',
        },
      },
    ],
  }

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <h1 className="text-3xl font-extrabold text-slate-900">Retake Interval Calculator</h1>
      <p className="mt-2 text-slate-600">
        Pick your occupation, state and last exam date to see the earliest date you can retake — based on the
        published retake-wait rule, the retake fee, and a recommended re-study window. Rules that can’t be mapped to a
        calendar date are explained instead.
      </p>
      <div className="mt-6">
        <RetakeIntervalCalculator />
      </div>
    </main>
  )
}
