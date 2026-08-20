import type { Metadata } from 'next'
import ExamStructureLookup from '@/components/tools/ExamStructureLookup'

export const metadata: Metadata = {
  title: 'Exam Structure Lookup — Questions, Time, Passing Score by State',
  description:
    'Look up exam vendor, question count, time limit, passing score and retake rules for 15 licensed careers by state, plus the 2026 exam changes (Arizona split, Texas new outline, NAR buyer agency).',
  alternates: { canonical: '/tools/exam-structure/' },
  openGraph: {
    title: 'Exam Structure Lookup — by Career & State',
    description: 'Vendor, question count, time limit, passing score and 2026 exam changes for 15 licensed careers.',
    type: 'website',
    url: 'https://licensefig.com/tools/exam-structure/',
  },
}

const faq = [
  {
    q: 'How many questions is the Arizona real estate exam in 2026?',
    a: 'Arizona split its real estate salesperson exam into a national portion of 80 questions and a state portion of 60 questions. Candidates must pass both portions within the same appointment. Verify the current split with the Arizona Department of Real Estate before you study.',
  },
  {
    q: 'What changed on the Texas real estate exam?',
    a: 'Texas updated its exam blueprint: the national portion is now 40 questions organized around 6 content domains. Study with the current outline rather than older materials, and confirm with the Texas Real Estate Commission and your vendor.',
  },
  {
    q: 'Did the NAR settlement change real estate exams?',
    a: 'Yes, indirectly. Following the 2024 NAR commission settlement and the move to written buyer representation agreements, buyer-agency topics — representation agreements, compensation disclosure and fiduciary duty — now appear on real estate licensing exams in all 50 states.',
  },
  {
    q: 'What is the passing score for a licensing exam?',
    a: 'Passing standards vary by state and are set by the state board or vendor — there is no single national score. Our lookup shows the published number when we have it, and otherwise tells you to check with your vendor, because scales change.',
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

export default function ExamStructureLookupPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <nav className="text-xs text-slate-500 mb-6" aria-label="Breadcrumb">
        <a href="/" className="text-indigo-600 hover:underline">Home</a> {' / '}
        <a href="/tools/" className="text-indigo-600 hover:underline">Tools</a> {' / '}
        <span className="text-slate-800">Exam Structure Lookup</span>
      </nav>

      <h1 className="text-3xl font-bold text-slate-900 mb-3">Exam Structure Lookup</h1>
      <p className="text-slate-600 mb-6 leading-relaxed">
        Pick a career and state to see the exam vendor, question count, time limit, passing score and retake rules —
        and review the real 2026 changes (Arizona&apos;s 80+60 split, Texas&apos;s new 40-question outline, and buyer-agency
        topics from the NAR settlement now tested everywhere).
      </p>

      <div className="mb-10">
        <ExamStructureLookup />
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
        Exam structure is set by each state and its vendor and changes frequently — including major blueprint updates
        in 2026. Always verify the current numbers with your state board or exam vendor before you register.
      </p>
    </main>
  )
}
