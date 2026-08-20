import type { Metadata } from 'next'
import LicenseRenewalCalculator from '@/components/tools/LicenseRenewalCalculator'

export const metadata: Metadata = {
  title: 'License Renewal Calculator — Cycle, CE Hours & Next Renewal Date',
  description:
    'Calculate your next license renewal date, renewal cycle and CE hour requirements for 15 licensed careers by state. Free, printable renewal planner.',
  alternates: { canonical: '/tools/license-renewal/' },
  openGraph: {
    title: 'License Renewal Calculator by Career & State',
    description: 'Renewal cycle, CE hours and next renewal date for 15 licensed careers. Free and printable.',
    type: 'website',
    url: 'https://licensefig.com/tools/license-renewal/',
  },
}

const faq = [
  {
    q: 'How do I find my next license renewal date?',
    a: 'Pick your career and state, enter the date your license was issued, and the calculator applies the renewal cycle (from our data, or a manual entry where data is pending) to show your next renewal date and how many days away it is. Mark it early — most boards allow renewal 60–90 days ahead.',
  },
  {
    q: 'What does “data pending” mean on this tool?',
    a: 'It means we have not yet loaded the official renewal cycle and CE hours for that career and state combination. Until we do, you can enter a manual renewal period for planning, and you should verify the real cycle with your state board before planning around it.',
  },
  {
    q: 'What happens if I let my license lapse?',
    a: 'A lapsed license usually requires a late fee and possibly reinstatement steps — in some occupations you may need to retake education or even the exam. The best move is renewing early within the allowed window and keeping your CE certificates.',
  },
  {
    q: 'Do renewal cycles include the continuing education hours?',
    a: 'Yes — the same data row shows the renewal period (e.g., every 2 years) and the CE hours required per cycle. Where we don’t have the numbers yet, the tool says to check with your state board rather than guessing.',
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

export default function LicenseRenewalCalculatorPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <nav className="text-xs text-slate-500 mb-6" aria-label="Breadcrumb">
        <a href="/" className="text-indigo-600 hover:underline">Home</a> {' / '}
        <a href="/tools/" className="text-indigo-600 hover:underline">Tools</a> {' / '}
        <span className="text-slate-800">License Renewal Calculator</span>
      </nav>

      <h1 className="text-3xl font-bold text-slate-900 mb-3">License Renewal Calculator</h1>
      <p className="text-slate-600 mb-6 leading-relaxed">
        Find out how often your license renews and how many continuing education hours you need — then calculate your
        next renewal date from your license issue date and print the plan so you never let it lapse.
      </p>

      <div className="mb-10">
        <LicenseRenewalCalculator />
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
        Renewal cycles and CE requirements are set by each state board and change — always verify with your state
        board before planning around this date.
      </p>
    </main>
  )
}
