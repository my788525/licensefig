import type { Metadata } from 'next'
import ExamCountdown from '@/components/tools/ExamCountdown'

export const metadata: Metadata = {
  title: 'Exam Countdown — Days Until Your Licensing Exam & Weekly Study Plan',
  description:
    'Count down the days and hours to your licensing exam, get a weekly study task plan for every stage, and sign up for optional weekly reminders. Free and printable.',
  alternates: { canonical: '/tools/exam-countdown/' },
  openGraph: {
    title: 'Exam Countdown & Weekly Study Plan',
    description: 'Days until your exam, a weekly task plan, and optional reminder signup. Free and printable.',
    type: 'website',
    url: 'https://licensefig.com/tools/exam-countdown/',
  },
}

const faq = [
  {
    q: 'What happens when I enter my exam date?',
    a: 'The tool shows a live countdown in days and hours, tells you how many full weeks remain, and surfaces the right weekly task plan for your stage — from “8+ weeks out” research and enrollment down to final-week logistics. The optional email field opens a pre-filled mailto reminder; nothing is stored on the site.',
  },
  {
    q: 'Does the countdown work offline or from saved data?',
    a: 'The countdown is calculated in your browser the moment you enter the date, and the optional subscription is saved only as a flag in your browser’s local storage. Clearing browser data removes it. We do not store your date or email anywhere.',
  },
  {
    q: 'Is the email signup a real subscription?',
    a: 'It’s a privacy-friendly mailto signup: clicking Subscribe opens your own mail app with a ready-to-send note to LicenseFig. Your email never touches our server, and we keep no subscription database. It’s adults-only, intended for people preparing for a licensing exam.',
  },
  {
    q: 'What weekly tasks does the plan give me?',
    a: 'The plan adapts to your weeks remaining: at 8+ weeks it covers requirements, enrollment and a study schedule; mid-course it adds timed practice exams and flashcards; the final weeks focus on weak domains, test-center logistics, ID prep and sleep.',
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

export default function ExamCountdownPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <nav className="text-xs text-slate-500 mb-6" aria-label="Breadcrumb">
        <a href="/" className="text-indigo-600 hover:underline">Home</a> {' / '}
        <a href="/tools/" className="text-indigo-600 hover:underline">Tools</a> {' / '}
        <span className="text-slate-800">Exam Countdown</span>
      </nav>

      <h1 className="text-3xl font-bold text-slate-900 mb-3">Exam Countdown</h1>
      <p className="text-slate-600 mb-6 leading-relaxed">
        Enter your exam date to see the days and hours until the big day, get the weekly task plan that matches your
        timeline, and optionally set up a mailto reminder — all free and printable.
      </p>

      <div className="mb-10">
        <ExamCountdown />
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
        The countdown and plan are study aids, not official schedules. Exam dates, ID rules and test-center policies
        are set by your vendor and state board — verify them directly.
      </p>
    </main>
  )
}
