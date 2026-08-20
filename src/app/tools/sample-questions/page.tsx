import type { Metadata } from 'next'
import SampleQuestionEngine from '@/components/tools/SampleQuestionEngine'

export const metadata: Metadata = {
  title: 'Free Sample Exam Questions — 15 Careers, with Answers & Explanations',
  description:
    'Try free original sample questions for real estate, CNA, insurance, beauty and trade licensing exams — written to mirror the official content outlines, with answers and explanations. Not actual exam questions.',
  alternates: { canonical: '/tools/sample-questions/' },
  openGraph: {
    title: 'Free Sample Exam Questions by Career',
    description: 'Original practice questions for licensing exams, with answers and explanations. Free and printable.',
    type: 'website',
    url: 'https://licensefig.com/tools/sample-questions/',
  },
}

const faq = [
  {
    q: 'Are these the actual exam questions?',
    a: 'No. Every question on this page is original and written in-house to mirror the official content outlines — agency, contracts and math for real estate; nursing fundamentals and infection control for CNA, and so on. They come from no vendor or question bank, and real exams differ.',
  },
  {
    q: 'What topics do the real estate sample questions cover?',
    a: 'The real estate set covers agency and fiduciary duty, contracts and contingencies, earnest money and escrow, commission and LTV math, proration, and disclosure — the same content domains you’ll see on a state real estate exam outline.',
  },
  {
    q: 'What topics do the CNA sample questions cover?',
    a: 'The CNA set covers standard precautions and infection control, vital signs, HIPAA, pressure injury prevention, PPE donning order, ADLs and fall prevention — the fundamentals tested on nurse aide knowledge exams.',
  },
  {
    q: 'How can I study with these?',
    a: 'Answer the random set on screen, reveal the explanations, and print a copy to review. Use them to find weak domains, then drill those domains with state-approved prep materials — and confirm the current outline with your vendor.',
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

export default function SampleQuestionEnginePage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <nav className="text-xs text-slate-500 mb-6" aria-label="Breadcrumb">
        <a href="/" className="text-indigo-600 hover:underline">Home</a> {' / '}
        <a href="/tools/" className="text-indigo-600 hover:underline">Tools</a> {' / '}
        <span className="text-slate-800">Sample Questions</span>
      </nav>

      <h1 className="text-3xl font-bold text-slate-900 mb-3">Sample Exam Questions</h1>
      <p className="text-slate-600 mb-6 leading-relaxed">
        Get a random set of original practice questions for the career you’re studying for — written to mirror the
        official content outlines, each with an answer and explanation. Sample questions, not actual exam questions.
      </p>

      <div className="mb-10">
        <SampleQuestionEngine />
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
        These questions are original and for practice only. Real exams come from your state vendor and change — verify
        the current content outline with your state board and vendor.
      </p>
    </main>
  )
}
