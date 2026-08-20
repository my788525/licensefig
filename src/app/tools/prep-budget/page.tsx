import type { Metadata } from 'next'
import PrepBudgetCalculator from '@/components/tools/PrepBudgetCalculator'

const SLUG = 'prep-budget'

export const metadata: Metadata = {
  title: 'Prep Budget Calculator — Cost & ROI',
  description:
    'Estimate the full cost of getting licensed: training, exam fees with retakes, application and license fees, plus study time and a return-on-investment hint against median pay.',
  alternates: { canonical: `https://licensefig.com/tools/${SLUG}/` },
  openGraph: {
    title: 'Prep Budget Calculator — LicenseFig',
    description: 'Break down the total cost and time to get licensed, plus an ROI hint.',
    type: 'website',
  },
}

export default function PrepBudgetCalculatorPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What does the prep budget calculator include?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It totals your training/education cost, exam fee multiplied by the number of attempts you expect, application fee and license fee where published — then converts the required education hours into study weeks and compares the total against an approximate median salary for the occupation.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where do the default numbers come from?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Exam, application and license fees come from the state requirements data where published. When a state row is empty, the tool falls back to typical published ranges and labels them as estimates — official fees vary by state and vendor.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is the salary figure official?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It is an approximate U.S. median based on Bureau of Labor Statistics occupational data, rounded and clearly labeled. Actual pay varies widely by state, experience and market, so treat the ROI numbers as a rough planning hint.',
        },
      },
    ],
  }

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <h1 className="text-3xl font-extrabold text-slate-900">Prep Budget Calculator</h1>
      <p className="mt-2 text-slate-600">
        Estimate the real cost of getting licensed: training, exam fees across expected retakes, application and
        license fees, plus the study time required — and a rough ROI hint against median pay. Where official numbers
        are missing, the tool uses typical ranges and says so.
      </p>
      <div className="mt-6">
        <PrepBudgetCalculator />
      </div>
    </main>
  )
}
