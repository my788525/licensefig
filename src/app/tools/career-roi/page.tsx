import type { Metadata } from 'next'
import CareerRoiCalculator from '@/components/tools/CareerRoiCalculator'

export const metadata: Metadata = {
  title: 'Career ROI Calculator — License Payback Period & 5-Year Net',
  description:
    'Calculate how fast a license pays for itself: training cost vs. BLS median salary, payback period and 5-year net for 15 careers by state. Free and printable, with BLS sourcing.',
  alternates: { canonical: '/tools/career-roi/' },
  openGraph: {
    title: 'Career ROI Calculator — License Payback',
    description: 'Payback period and 5-year net for licensed careers, using BLS median salaries. Free and printable.',
    type: 'website',
    url: 'https://licensefig.com/tools/career-roi/',
  },
}

const faq = [
  {
    q: 'How is the payback period calculated?',
    a: 'Payback = training + exam cost ÷ monthly income (annual salary ÷ 12). For example, $2,000 of training against a $35,740 median CNA salary pays back in about 8 months. It ignores taxes, benefits and income growth — it’s an order-of-magnitude planning figure, not a promise.',
  },
  {
    q: 'Where do the salaries come from?',
    a: 'The U.S. Bureau of Labor Statistics, Occupational Employment and Wage Statistics (bls.gov/oes), median annual wages retrieved 2026-08-20 — for example CNA $35,740 and real estate sales agents $52,030. Notaries aren’t tracked separately, and home inspectors use the “construction and building inspectors” proxy. You can edit any salary.',
  },
  {
    q: 'What costs should I include in “training + exam”?',
    a: 'Include everything out-of-pocket: pre-license course, exam registration, fingerprinting/background check, application and license fees, study materials. Renewal and CE costs are excluded — that’s why the 5-year number is a pre-tax planning estimate.',
  },
  {
    q: 'Why does the 5-year net ignore taxes?',
    a: 'Keeping the model simple makes the result honest and reproducible. Real take-home pay depends on tax bracket, state, benefits and hours. Use the number as a comparison tool between careers, not as a salary promise.',
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

export default function CareerRoiCalculatorPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <nav className="text-xs text-slate-500 mb-6" aria-label="Breadcrumb">
        <a href="/" className="text-indigo-600 hover:underline">Home</a> {' / '}
        <a href="/tools/" className="text-indigo-600 hover:underline">Tools</a> {' / '}
        <span className="text-slate-800">Career ROI Calculator</span>
      </nav>

      <h1 className="text-3xl font-bold text-slate-900 mb-3">Career ROI Calculator</h1>
      <p className="text-slate-600 mb-6 leading-relaxed">
        Compare licensed careers by how fast the license pays for itself: enter your training and exam cost, get a
        BLS median salary pre-filled for your career, and see the payback period and 5-year net — sourced and
        printable.
      </p>

      <div className="mb-10">
        <CareerRoiCalculator />
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
        Salary data: U.S. Bureau of Labor Statistics, OES median annual wages, retrieved 2026-08-20. Actual income
        varies widely — treat the result as a planning estimate and verify your state’s costs with your state board.
      </p>
    </main>
  )
}
