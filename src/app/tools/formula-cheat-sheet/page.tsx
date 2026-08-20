import type { Metadata } from 'next'
import FormulaCheatSheet from '@/components/tools/FormulaCheatSheet'

export const metadata: Metadata = {
  title: 'Formula & Cheat Sheets — Real Estate Math, CNA Vital Signs & More',
  description:
    'Printable formula and quick-reference cards for licensing exams: real estate commission, LTV and area math, CNA vital signs and infection control, insurance, beauty and notary rules.',
  alternates: { canonical: '/tools/formula-cheat-sheet/' },
  openGraph: {
    title: 'Formula & Cheat Sheets for Licensing Exams',
    description: 'Printable formula cards: real estate math, CNA vital signs, infection control and more.',
    type: 'website',
    url: 'https://licensefig.com/tools/formula-cheat-sheet/',
  },
}

const faq = [
  {
    q: 'What real estate formulas are on the cheat sheet?',
    a: 'The real estate card covers commission (Commission = Sale Price × Rate), loan-to-value (LTV = Loan ÷ Appraised Value), annual and monthly interest, area conversions (1 acre = 43,560 sq ft), percentage math, proration (annual ÷ 365 × days) and cap rate / gross rent multiplier. These are the industry-standard formulas used on state exams.',
  },
  {
    q: 'What vital signs does the CNA card include?',
    a: 'The CNA card lists normal adult ranges taught in nurse aide training: oral temperature 97.8–99.1°F, pulse 60–100 bpm, respirations 12–20, blood pressure under 120/80, and SpO2 95–100% — plus the infection-control table (standard precautions, PPE donning order and 2-hour repositioning).',
  },
  {
    q: 'Are these formulas the same on every state exam?',
    a: 'Real estate math formulas are industry-standard and appear in similar form on state exams everywhere. Clinical reference ranges are standard adult values. Exam content still varies by state, so verify the current outline with your state board and vendor.',
  },
  {
    q: 'Can I print the cheat sheet?',
    a: 'Yes. Click “Print / Save as PDF” and the sheet prints without the site navigation, so you get a clean card to study from.',
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

export default function FormulaCheatSheetPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <nav className="text-xs text-slate-500 mb-6" aria-label="Breadcrumb">
        <a href="/" className="text-indigo-600 hover:underline">Home</a> {' / '}
        <a href="/tools/" className="text-indigo-600 hover:underline">Tools</a> {' / '}
        <span className="text-slate-800">Formula &amp; Cheat Sheets</span>
      </nav>

      <h1 className="text-3xl font-bold text-slate-900 mb-3">Formula &amp; Cheat Sheets</h1>
      <p className="text-slate-600 mb-6 leading-relaxed">
        Pick a career and print a one-page formula card for the math and rules you’ll actually use — real estate
        commission, LTV and area math, CNA vital signs and infection control, insurance concepts, and more.
      </p>

      <div className="mb-10">
        <FormulaCheatSheet />
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
        These cards are general educational content for practice and planning. Real estate math formulas are
        industry-standard; clinical values are standard reference ranges. Verify the current exam outline with your
        state board and vendor.
      </p>
    </main>
  )
}
