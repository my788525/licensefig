import type { Metadata } from 'next'
import LicenseProgressTracker from '@/components/tools/LicenseProgressTracker'

export const metadata: Metadata = {
  title: 'License Progress Tracker — Free Printable Licensing Road Card',
  description:
    'Track the 6 steps to any license — requirements, training, background check, exam registration, passing and getting licensed — with a printable license road card for 15 careers.',
  alternates: { canonical: '/tools/license-progress-tracker/' },
  openGraph: {
    title: 'License Progress Tracker — Free Printable Licensing Road Card',
    description: 'Check off the 6 steps to licensure and print a license road card. Works for real estate, CNA, insurance, beauty and trade licenses.',
    type: 'website',
    url: 'https://licensefig.com/tools/license-progress-tracker/',
  },
}

const faq = [
  {
    q: 'What are the 6 steps to get a license?',
    a: 'The generic licensing road has six steps: (1) check your state requirements, (2) complete the required training, (3) pass the background check, (4) register for the exam, (5) pass the exam, and (6) register your license with the state board. Every career on LicenseFig follows this same road — only the details of each step change.',
  },
  {
    q: 'Is the progress saved between visits?',
    a: 'Yes — checked steps are saved in your browser’s local storage on this device only. Nothing is sent to a server, and clearing your browser data removes it. You can also print the card at any point.',
  },
  {
    q: 'Which occupations does the tracker cover?',
    a: 'All 15 careers on LicenseFig: real estate salesperson and broker, CNA, notary, insurance agent (P&C and L&H), appraiser, cosmetologist, barber, nail technician, esthetician, massage therapist, home inspector, pest control applicator and security guard. Each has occupation-specific hints for every step.',
  },
  {
    q: 'Are the steps the same in every state?',
    a: 'The six steps are the same in structure, but the details — education hours, exam vendor, background check and fees — are set by each state board and change over time. Always verify the current requirements with your state board before paying for a course or exam.',
  },
]

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function LicenseProgressTrackerPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <nav className="text-xs text-slate-500 mb-6" aria-label="Breadcrumb">
        <a href="/" className="text-indigo-600 hover:underline">Home</a> {' / '}
        <a href="/tools/" className="text-indigo-600 hover:underline">Tools</a> {' / '}
        <span className="text-slate-800">License Progress Tracker</span>
      </nav>

      <h1 className="text-3xl font-bold text-slate-900 mb-3">License Progress Tracker</h1>
      <p className="text-slate-600 mb-6 leading-relaxed">
        Track the six universal steps to any professional license — check requirements, complete training, pass the
        background check, register for the exam, pass, and get licensed — and print a one-page “license road card”
        to keep on your fridge. Progress is saved in your browser.
      </p>

      <div className="mb-10">
        <LicenseProgressTracker />
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">FAQ</h2>
        <div className="space-y-3">
          {faq.map((f) => (
            <details key={f.q} className="bg-white border border-slate-200 rounded-lg p-4 text-sm">
              <summary className="font-semibold text-slate-900 cursor-pointer">{f.q}</summary>
              <p className="mt-2 text-slate-600 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <p className="text-xs text-slate-500 border-t border-slate-100 pt-4">
        This tracker is a planning tool, not a legal authority. Requirements vary by state and change often — always
        verify the current steps and deadlines with your state board.
      </p>
    </main>
  )
}
