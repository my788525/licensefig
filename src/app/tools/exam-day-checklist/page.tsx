import type { Metadata } from 'next'
import ExamDayChecklist from '@/components/tools/ExamDayChecklist'

export const metadata: Metadata = {
  title: 'Exam Day Checklist — Printable List for Your Licensing Exam',
  description:
    'A printable exam-day checklist for 15 licensed careers: ID, arrival time, test-center route, what to bring, exam rules and career-specific tips. Free.',
  alternates: { canonical: '/tools/exam-day-checklist/' },
  openGraph: {
    title: 'Exam Day Checklist — Free & Printable',
    description: 'The complete exam-day checklist: ID, route, items to bring, rules and career-specific tips.',
    type: 'website',
    url: 'https://licensefig.com/tools/exam-day-checklist/',
  },
}

const faq = [
  {
    q: 'What ID do I need for a licensing exam?',
    a: 'A current, government-issued photo ID that matches the name on your registration — typically a driver’s license or passport. Expired IDs and photocopies are usually rejected at every major vendor (PSI, Pearson VUE, Credentia).',
  },
  {
    q: 'What can I bring into the test room?',
    a: 'Very little: your ID, and an approved calculator if the vendor allows one. Phones, smartwatches, notes, bags and outerwear go in a locker. Read the vendor’s personal-item policy before exam day — a smartwatch on your wrist is grounds for dismissal at most centers.',
  },
  {
    q: 'What happens if I arrive late?',
    a: 'Most vendors turn away late arrivals and you forfeit the exam fee. Plan to arrive 30–45 minutes early, do a route dry-run if the center is unfamiliar, and confirm your appointment time in your confirmation email.',
  },
  {
    q: 'Are the career-specific tips the same for every state?',
    a: 'No — practical exams (CNA skills, beauty practicals) and exam formats vary by state and vendor. The tips are general guidance for the career; verify the specifics in your confirmation email and with your state board before the day.',
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

export default function ExamDayChecklistPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <nav className="text-xs text-slate-500 mb-6" aria-label="Breadcrumb">
        <a href="/" className="text-indigo-600 hover:underline">Home</a> {' / '}
        <a href="/tools/" className="text-indigo-600 hover:underline">Tools</a> {' / '}
        <span className="text-slate-800">Exam Day Checklist</span>
      </nav>

      <h1 className="text-3xl font-bold text-slate-900 mb-3">Exam Day Checklist</h1>
      <p className="text-slate-600 mb-6 leading-relaxed">
        A printable, career-specific checklist for the morning of your exam — ID and confirmation, arrival time,
        route, what to bring, the rules to follow, and tips that matter for your particular exam.
      </p>

      <div className="mb-10">
        <ExamDayChecklist />
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
        Rules, ID policies and practical-exam requirements vary by state and vendor — verify the details in your
        confirmation email and with your state board before exam day.
      </p>
    </main>
  )
}
