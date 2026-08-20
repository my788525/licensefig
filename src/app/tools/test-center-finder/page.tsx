import type { Metadata } from 'next'
import TestCenterFinder from '@/components/tools/TestCenterFinder'

const SLUG = 'test-center-finder'

export const metadata: Metadata = {
  title: 'Test Center Finder — Official Vendor Locators',
  description:
    'Find where to take your licensing exam: enter a ZIP to identify your state, then use the official Pearson VUE, PSI, Prometric or Credentia locators to search test centers near you.',
  alternates: { canonical: `https://licensefig.com/tools/${SLUG}/` },
  openGraph: {
    title: 'Test Center Finder — LicenseFig',
    description: 'Identify your state by ZIP and find official test-center locators for your exam.',
    type: 'website',
  },
}

export default function TestCenterFinderPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I find my exam test center?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Enter your ZIP (or pick a state) to see which state you test in, then use the official locator of the vendor named on your approval letter — Pearson VUE, PSI, Prometric or Credentia — to search centers and book an appointment. LicenseFig does not store live availability.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why don’t you show specific test center addresses?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Test center availability and locations change daily and are vendor-specific. The only reliable source is the vendor’s official locator, so this tool links you to those search pages instead of listing possibly-outdated addresses.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which vendor do I use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use the vendor printed on your exam approval letter. Real estate and insurance exams typically use Pearson VUE or PSI; CNA skills exams often use Credentia; some nursing and financial exams use Prometric.',
        },
      },
    ],
  }

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <h1 className="text-3xl font-extrabold text-slate-900">Test Center Finder</h1>
      <p className="mt-2 text-slate-600">
        Enter a ZIP code to identify your state, then use the official Pearson VUE, PSI, Prometric or Credentia
        locators to search test centers near you. Search test centers on the official site — availability changes
        daily.
      </p>
      <div className="mt-6">
        <TestCenterFinder />
      </div>
    </main>
  )
}
