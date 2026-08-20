'use client'

import { useEffect, useMemo, useState } from 'react'
import PrintButton from './PrintButton'

const SUBSCRIBE_EMAIL = 'hello@licensefig.com'

// Weekly task buckets based on how many weeks remain before the exam.
interface Bucket {
  when: string
  tasks: string[]
}

const BUCKETS: Bucket[] = [
  {
    when: '8+ weeks out',
    tasks: [
      'Confirm your exam date is reserved with the vendor.',
      'Verify current requirements and content outline with your state board.',
      'Enroll in your prep course and set a study schedule.',
      'Gather study materials for every content domain.',
    ],
  },
  {
    when: '6–8 weeks out',
    tasks: [
      'Work through the first content domains chapter by chapter.',
      'Take a diagnostic practice test to find weak areas.',
      'Review state-specific law or rules sections weekly.',
    ],
  },
  {
    when: '4–6 weeks out',
    tasks: [
      'Take a full practice exam each week under timed conditions.',
      'Turn every missed question into a flashcard.',
      'Start memorizing formulas and key definitions.',
    ],
  },
  {
    when: '2–4 weeks out',
    tasks: [
      'Take a timed practice exam twice a week.',
      'Drill your weakest domains daily.',
      'Confirm your test center address, hours and ID rules.',
    ],
  },
  {
    when: '1–2 weeks out',
    tasks: [
      'Review only your notes, flashcards and cheat sheet.',
      'Take one final timed practice exam 5–7 days out.',
      'Book your route to the test center — do a dry run if possible.',
    ],
  },
  {
    when: 'Final week',
    tasks: [
      'Prepare your ID, confirmation email and approved calculator.',
      'Plan to arrive 30–45 minutes early.',
      'Sleep well the night before — stop cramming the day before.',
    ],
  },
]

function weeksUntil(date: Date): number {
  const ms = date.getTime() - Date.now()
  return Math.max(0, Math.floor(ms / (7 * 24 * 60 * 60 * 1000)))
}

export default function ExamCountdown() {
  const [examDate, setExamDate] = useState('')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [subError, setSubError] = useState('')

  useEffect(() => {
    try {
      if (window.localStorage.getItem('licensefig_countdown_subscribed') === '1') setSubscribed(true)
    } catch {
      /* private mode — ignore */
    }
  }, [])

  const target = useMemo(() => {
    if (!examDate) return null
    const d = new Date(`${examDate}T00:00:00`)
    if (isNaN(d.getTime())) return null
    return d
  }, [examDate])

  const diff = useMemo(() => {
    if (!target) return null
    const ms = target.getTime() - Date.now()
    if (ms < 0) return { days: 0, hours: 0, past: true }
    const days = Math.floor(ms / (24 * 60 * 60 * 1000))
    const hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))
    return { days, hours, past: false }
  }, [target])

  const weeks = target ? weeksUntil(target) : 0
  const shownBuckets = BUCKETS.filter((_, i) => {
    if (weeks >= 8) return i === 0
    if (weeks >= 6) return i <= 1
    if (weeks >= 4) return i <= 2
    if (weeks >= 2) return i <= 3
    if (weeks >= 1) return i <= 4
    return true
  })

  const onSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    const value = email.trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setSubError('Please enter a valid email address.')
      return
    }
    setSubError('')
    const subject = encodeURIComponent('Exam countdown weekly reminders')
    const body = encodeURIComponent(`Please add this email to the weekly exam-reminder list:\n\n${value}\n\nExam date: ${examDate || 'not set'}`)
    window.location.href = `mailto:${SUBSCRIBE_EMAIL}?subject=${subject}&body=${body}`
    try {
      window.localStorage.setItem('licensefig_countdown_subscribed', '1')
    } catch {
      /* private mode — ignore */
    }
    setSubscribed(true)
  }

  const fmt = (d: Date) =>
    d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div>
      <div className="no-print space-y-4 mb-6">
        <label className="block text-sm font-medium text-slate-700">
          Exam date
          <input
            type="date"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
            className="mt-1 w-full sm:w-72 block rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none"
          />
        </label>
      </div>

      <div className="report-area rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <div className="border-b border-slate-200 pb-4 mb-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">LicenseFig · Exam Countdown</p>
          <h2 className="text-xl font-bold text-slate-900 mt-1">My exam countdown &amp; weekly plan</h2>
          <p className="text-sm text-slate-500 mt-1">{examDate ? `Exam date: ${fmt(target!)}` : 'Set your exam date above to start the countdown.'}</p>
        </div>

        {diff && (
          <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white p-6 mb-6 text-center">
            {diff.past ? (
              <p className="text-lg font-bold">The exam date has passed — great work if you sat it! 🎉</p>
            ) : (
              <>
                <p className="text-4xl font-extrabold tracking-tight">
                  {diff.days} <span className="text-xl font-semibold">days</span>{' '}
                  {diff.hours} <span className="text-xl font-semibold">hours</span>
                </p>
                <p className="text-sm text-indigo-100 mt-2">{weeks} full weeks to go</p>
              </>
            )}
          </div>
        )}

        {!diff && (
          <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800 mb-6">
            No date set yet — enter your exam date to see the countdown and your weekly task plan.
          </div>
        )}

        {diff && (
          <section className="mb-6">
            <h3 className="font-bold text-slate-900 text-sm mb-3">Weekly task plan</h3>
            <div className="space-y-3">
              {shownBuckets.map((b) => (
                <div key={b.when} className="rounded-xl border border-slate-200 p-4">
                  <p className="font-semibold text-indigo-700 text-sm">{b.when}</p>
                  <ul className="text-sm text-slate-600 mt-2 space-y-1.5">
                    {b.tasks.map((t) => (
                      <li key={t} className="flex gap-2">
                        <span className="text-indigo-400">•</span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        <p className="text-xs text-slate-500 border-t border-slate-100 pt-4">
          Countdown and plan are estimates to keep you on pace — exam dates and rules are set by your vendor and
          state board. Always verify the current schedule, ID requirements and test-center rules with your vendor.
        </p>
      </div>

      {/* Optional mailto reminder — adults only, no data stored */}
      <div className="no-print mt-6">
        {subscribed ? (
          <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-1">You&apos;re on the reminder list 🎉</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Thanks for signing up. We&apos;ll send a short weekly note to help you stay on pace. Your email lives
              only in your own mail client — LicenseFig stores no email addresses and no exam data.
            </p>
          </div>
        ) : (
          <section className="rounded-2xl bg-blue-50 border border-blue-100 p-6" aria-label="Weekly reminder signup">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Get a weekly study reminder (optional)</h3>
            <p className="text-sm text-slate-600 mb-3 leading-relaxed">
              Adults preparing for a licensing exam: leave your email and we&apos;ll open a ready-to-send weekly
              reminder in your mail app. No spam, no database — <strong>no data is stored on this site</strong>.
            </p>
            <form onSubmit={onSubscribe} className="flex flex-col sm:flex-row gap-2" noValidate>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                aria-label="Email address"
                className="flex-1 max-w-xs px-3 py-2 rounded-lg border border-slate-200 bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
            {subError && <p className="text-sm text-red-600 mt-2">{subError}</p>}
            <p className="text-xs text-slate-500 mt-3">
              Clicking Subscribe opens your mail app with a pre-filled note. Adults only — this is a study reminder,
              not a children&apos;s product.
            </p>
          </section>
        )}
      </div>

      <div className="no-print mt-4">
        <PrintButton label="Print / Save this countdown" />
      </div>
    </div>
  )
}
