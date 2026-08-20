import type { Metadata } from 'next'
import ReciprocityChecker from '@/components/tools/ReciprocityChecker'

const SLUG = 'reciprocity-checker'

export const metadata: Metadata = {
  title: 'Reciprocity Checker — License Transfer Between States',
  description:
    'Check whether your license transfers between two states: published reciprocity notes, state board links and the questions to ask before applying. Reciprocity rules change frequently.',
  alternates: { canonical: `https://licensefig.com/tools/${SLUG}/` },
  openGraph: {
    title: 'Reciprocity Checker — LicenseFig',
    description: 'See if your license transfers to a new state, with board links and what to verify.',
    type: 'website',
  },
}

export default function ReciprocityCheckerPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How does the reciprocity checker work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You pick an occupation, your current state and your target state. The tool looks up any published reciprocity note for that occupation in the state data and shows official board links for both states so you can confirm the endorsement path.',
        },
      },
      {
        '@type': 'Question',
        name: 'What if no reciprocity note is published?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The tool tells you to check both state boards directly. Endorsement terms vary by state, change often, and usually still require a clean record, fees and sometimes education-hour review — even when reciprocity exists.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does reciprocity mean I skip the exam?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Not necessarily. Some states waive the exam entirely for licensees from listed states, while others require the state portion or a full re-exam. Confirm the exact path with the target state board before paying application fees.',
        },
      },
    ],
  }

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <h1 className="text-3xl font-extrabold text-slate-900">Reciprocity Checker</h1>
      <p className="mt-2 text-slate-600">
        Choose your occupation, current state and target state to see published reciprocity notes plus official board
        links for both. Reciprocity rules change frequently — this tool is a starting point, not a ruling.
      </p>
      <div className="mt-6">
        <ReciprocityChecker />
      </div>
    </main>
  )
}
