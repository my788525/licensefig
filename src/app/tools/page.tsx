import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Free Licensing Tools — Track, Plan, Practice & Print',
  description:
    'Free printable planning tools for every step of the licensing road: progress tracker, exam countdown, sample questions, flashcards, formula sheets, renewal calculators and more.',
  alternates: { canonical: '/tools/' },
}

const TOOLS = [
  {
    slug: '/tools/license-progress-tracker/',
    emoji: '🗺️',
    name: 'License Progress Tracker',
    desc: 'Check off the 6 steps to licensure and print a license road card.',
  },
  {
    slug: '/tools/free-training-finder/',
    emoji: '💸',
    name: 'Free CNA Training Finder',
    desc: 'Real paths to free CNA training by state — employer and workforce programs.',
  },
  {
    slug: '/tools/exam-structure/',
    emoji: '📋',
    name: 'Exam Structure Lookup',
    desc: 'Vendor, questions, time, passing score by career & state, plus 2026 changes.',
  },
  {
    slug: '/tools/sample-questions/',
    emoji: '✍️',
    name: 'Sample Questions',
    desc: 'Original practice questions with answers and explanations.',
  },
  {
    slug: '/tools/formula-cheat-sheet/',
    emoji: '🧮',
    name: 'Formula & Cheat Sheets',
    desc: 'Printable real estate math, CNA vital signs and quick-reference cards.',
  },
  {
    slug: '/tools/flashcards/',
    emoji: '🃏',
    name: 'Flashcards',
    desc: 'Flip-to-study vocabulary decks with real industry terms.',
  },
  {
    slug: '/tools/exam-countdown/',
    emoji: '⏳',
    name: 'Exam Countdown',
    desc: 'Days to your exam plus a weekly study task plan.',
  },
  {
    slug: '/tools/license-renewal/',
    emoji: '📅',
    name: 'License Renewal Calculator',
    desc: 'Renewal cycle, CE hours and your next renewal date.',
  },
  {
    slug: '/tools/ce-requirements/',
    emoji: '🎓',
    name: 'CE Requirements Lookup',
    desc: 'Continuing education hours by career and state.',
  },
  {
    slug: '/tools/career-roi/',
    emoji: '📈',
    name: 'Career ROI Calculator',
    desc: 'Payback period and 5-year net, sourced from BLS medians.',
  },
  {
    slug: '/tools/state-board-directory/',
    emoji: '🏛️',
    name: 'State Board Directory',
    desc: 'Official licensing authorities and exam vendor links.',
  },
  {
    slug: '/tools/exam-day-checklist/',
    emoji: '✅',
    name: 'Exam Day Checklist',
    desc: 'Printable checklist with career-specific exam-day tips.',
  },
]

export default function ToolsIndexPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <nav className="text-xs text-slate-500 mb-6" aria-label="Breadcrumb">
        <a href="/" className="text-indigo-600 hover:underline">Home</a> {' / '}
        <span className="text-slate-800">Tools</span>
      </nav>

      <h1 className="text-3xl font-bold text-slate-900 mb-3">Free licensing tools</h1>
      <p className="text-slate-600 mb-8 leading-relaxed">
        Twelve free, printable tools that cover every step of the licensing road — from “thinking about it” (career
        ROI), through studying (sample questions, flashcards, formula sheets), to exam day and renewal. Everything
        runs in your browser; nothing is stored on our server.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TOOLS.map((t) => (
          <Link
            key={t.slug}
            href={t.slug}
            className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-indigo-300 hover:shadow-sm transition"
          >
            <div className="text-2xl mb-2">{t.emoji}</div>
            <div className="font-semibold text-slate-900 text-sm">{t.name}</div>
            <div className="text-xs text-slate-500 mt-1 leading-relaxed">{t.desc}</div>
          </Link>
        ))}
      </div>
    </main>
  )
}
