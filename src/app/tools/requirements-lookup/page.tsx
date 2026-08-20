import type { Metadata } from 'next'
import RequirementsLookup from '@/components/tools/RequirementsLookup'

const SLUG = 'requirements-lookup'

export const metadata: Metadata = {
  title: 'License Requirements Lookup by State',
  description:
    'Pick an occupation and a state to see the license requirement summary: education hours, age, exam vendor, question counts, passing score, fees, retake rules and the official board link.',
  alternates: { canonical: `https://licensefig.com/tools/${SLUG}/` },
  openGraph: {
    title: 'License Requirements Lookup by State — LicenseFig',
    description:
      'State-by-state requirement summary for 15 licensed careers: hours, age, exam structure, fees, retake rules and official links.',
    type: 'website',
  },
}

export default function RequirementsLookupPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I look up a state’s license requirements?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Choose an occupation and a state (or enter a ZIP code to auto-detect the state). The tool shows the published requirement summary: education hours, age minimum, background check, exam vendor, question counts, passing score, fees, retake rules, renewal and reciprocity notes, plus the official board link.',
        },
      },
      {
        '@type': 'Question',
        name: 'What if a state’s data is missing?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Some occupation-state records are not published in our dataset yet. The tool shows a “Data pending” notice and directs you to the state board search so you can verify directly. Requirements change — always confirm with your state board.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does the ZIP code field require a full address?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. The ZIP field is optional — it only detects the state from the first three digits using USPS prefix ranges, then selects that state for you.',
        },
      },
    ],
  }

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <h1 className="text-3xl font-extrabold text-slate-900">License Requirements Lookup</h1>
      <p className="mt-2 text-slate-600">
        Select an occupation and a state to get the requirement summary — education hours, age, exam vendor and
        structure, fees, retake rules, renewal and the official board link. No data on file means “Data pending —
        verify with your state board.”
      </p>
      <div className="mt-6">
        <RequirementsLookup />
      </div>
    </main>
  )
}
