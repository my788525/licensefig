import type { Metadata } from 'next'
import StudyPlanGenerator from '@/components/tools/StudyPlanGenerator'

const SLUG = 'study-plan-generator'

export const metadata: Metadata = {
  title: 'Study Plan Generator — Countdown by Week',
  description:
    'Turn an exam date into a week-by-week countdown plan: national content first, then state law, timed practice and mocks, and a final sprint. Includes math drills and spaced repetition.',
  alternates: { canonical: `https://licensefig.com/tools/${SLUG}/` },
  openGraph: {
    title: 'Study Plan Generator — LicenseFig',
    description: 'Build a week-by-week countdown study plan for your licensing exam.',
    type: 'website',
  },
}

export default function StudyPlanGeneratorPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How does the study plan generator work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Enter your exam date and daily study hours. The tool counts down the weeks and assigns each one a phase: national core content, state-specific content, integrated practice and mock exams, then a final sprint. It applies a general method — spaced repetition, retrieval practice and math drills — not a passing guarantee.',
        },
      },
      {
        '@type': 'Question',
        name: 'What if my exam is only 1–2 weeks away?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The plan compresses into the weeks you have: skip to practice questions and a full-length timed mock immediately, review every wrong answer, and confirm your test center and registration logistics in the final days.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does LicenseFig guarantee I will pass?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. The generator produces a study method based on common exam structure (national questions, state law, math and timed practice). Actual content and passing standards are set by your state and exam vendor — verify the current outline with them.',
        },
      },
    ],
  }

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <h1 className="text-3xl font-extrabold text-slate-900">Study Plan Generator</h1>
      <p className="mt-2 text-slate-600">
        Enter your exam date and available hours to get a week-by-week countdown plan: national content first, then
        state law, then timed practice and mocks, ending in a final sprint. The plan is a study method based on real
        exam structure — not a promise of passing.
      </p>
      <div className="mt-6">
        <StudyPlanGenerator />
      </div>
    </main>
  )
}
