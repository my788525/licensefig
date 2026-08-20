'use client'

import { useEffect, useState } from 'react'
import { OCCUPATIONS } from '@/data/types'
import PrintButton from './PrintButton'

// Generic six-step licensing road that applies to every occupation on the
// site. Step hints are occupation-specific but the steps themselves are
// universal: requirements → training → background check → exam registration
// → pass the exam → register the license.
interface Step {
  id: string
  title: string
  detail: string
}

const BASE_STEPS = ['Check requirements', 'Complete training', 'Background check', 'Register for the exam', 'Pass the exam', 'Get licensed']

const OCCUPATION_HINTS: Record<string, string[]> = {
  'real-estate-salesperson': [
    'Confirm state education hours, age and the background-check application for your state.',
    'Finish your state pre-license course (hours vary by state).',
    'Fingerprints and criminal-history review with your state real estate commission.',
    'Book the national + state exam through PSI or Pearson VUE.',
    'Pass the written exam — most states require both portions.',
    'File with your state commission and pay the license fee.',
  ],
  'real-estate-broker': [
    'Meet the experience requirement (typically 2+ years as an active salesperson).',
    'Complete broker pre-license education (hours vary by state).',
    'Criminal-history and credit review with your state commission.',
    'Register for the broker exam through PSI or Pearson VUE.',
    'Pass the broker exam — it is harder and covers management and finance.',
    'Register with the commission and name your broker or brokerage.',
  ],
  'notary-public': [
    'Check age, residency and criminal-history rules for your state.',
    'Most states require no formal course; some require a short class.',
    'Disclosure and background screening, then a bond/errors & omissions insurance.',
    'Submit the application and pay the state fee; some states require an exam.',
    'Receive your commission and take your oath.',
    'File your official signature and seal impression with the county clerk.',
  ],
  cna: [
    'Confirm your state\u2019s approved training program and registry rules.',
    'Complete a state-approved nurse aide training course (typically 75+ hours).',
    'Criminal background check — every state runs one for nurse aides.',
    'Register for the written + clinical skills exam (Credentia, Pearson VUE, Prometric).',
    'Pass both the knowledge test and the skills demonstration.',
    'Get listed on your state nurse aide registry and renew as required.',
  ],
  'insurance-agent-pc': [
    'Confirm prelicensing education hours for your state.',
    'Complete the state-approved P&C prelicensing course.',
    'Background check and fingerprints where your state requires them.',
    'Register for the PSI or Pearson VUE exam.',
    'Pass the state P&C licensing exam.',
    'Submit your license application to the state insurance department.',
  ],
  'insurance-agent-lh': [
    'Confirm prelicensing education hours for your state.',
    'Complete the state-approved Life & Health prelicensing course.',
    'Background check and fingerprints where required.',
    'Register for the PSI or Pearson VUE exam.',
    'Pass the state Life & Health exam.',
    'Submit your license application to the state insurance department.',
  ],
  'real-estate-appraiser': [
    'Choose your level (trainee → licensed → certified) and state rules.',
    'Complete the required AQB-approved education hours.',
    'Criminal background check and experience credit review.',
    'Register with Pearson VUE or PSI for your state\u2019s exam.',
    'Pass the national + state exam for your level.',
    'Register with your state appraisal board and start logging experience.',
  ],
  cosmetologist: [
    'Confirm your state\u2019s training hours (typically 1,000–1,600).',
    'Graduate from a state-approved cosmetology school.',
    'Background check where your state requires one.',
    'Register for the state board written + practical exam.',
    'Pass both parts of the exam.',
    'Submit your license application and pay the state fee.',
  ],
  barber: [
    'Confirm your state\u2019s training hours.',
    'Graduate from a state-approved barber school.',
    'Background check where required.',
    'Register for the state board written + practical exam.',
    'Pass both parts of the exam.',
    'Submit your license application and pay the state fee.',
  ],
  'nail-technician': [
    'Confirm your state\u2019s training hours (often the shortest of the beauty trades).',
    'Complete a state-approved nail technician program.',
    'Background check where required.',
    'Register for the state written + practical exam.',
    'Pass both parts of the exam.',
    'Submit your license application and pay the state fee.',
  ],
  esthetician: [
    'Confirm your state\u2019s training hours.',
    'Complete a state-approved esthetics program.',
    'Background check where required.',
    'Register for the state written + practical exam.',
    'Pass both parts of the exam.',
    'Submit your license application and pay the state fee.',
  ],
  'massage-therapist': [
    'Confirm education hours — most states require 500+ hours from an approved school.',
    'Graduate from a state-approved massage therapy program.',
    'Background check and jurisprudence exam where required.',
    'Register for the MBLEx (FSMTB) or your state exam.',
    'Pass the licensing exam.',
    'Register with your state and get liability insurance.',
  ],
  'home-inspector': [
    'Check whether your state licenses, certifies or registers inspectors.',
    'Complete the required pre-license training (often 40–120 hours).',
    'Background check and any required errors & omissions insurance.',
    'Register for the National Home Inspector Exam or your state exam.',
    'Pass the exam.',
    'Register with the state authority and meet any supervised-inspection hours.',
  ],
  'pest-control-applicator': [
    'Confirm the category you need (general household, termite, etc.).',
    'Complete the state-mandated training for your category.',
    'Background check where required.',
    'Register for the state Department of Agriculture exam.',
    'Pass the written exam (some states add a practical).',
    'Get certified in your categories and file with the state.',
  ],
  'security-guard': [
    'Check state training-hour requirements (often 4–40 hours).',
    'Complete the state-approved basic training course.',
    'Background check and fingerprinting — required in nearly every state.',
    'Register with the state or apply for your guard card.',
    'Pass any required exam (many states are training-only).',
    'Receive your guard card and keep it renewed.',
  ],
}

const STORAGE_KEY = 'licensefig_progress_v1'

const stepIndex = (title: string) => BASE_STEPS.indexOf(title) + 1

export default function LicenseProgressTracker() {
  const [occupationId, setOccupationId] = useState('real-estate-salesperson')
  const [done, setDone] = useState<string[]>([])
  const [copied, setCopied] = useState(false)

  // Load progress: URL params first (?step=1,2,4&career=cna), then localStorage.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const career = params.get('career')
    if (career && OCCUPATIONS.some((o) => o.id === career)) setOccupationId(career)
    const stepParam = params.get('step')
    if (stepParam) {
      const steps = stepParam
        .split(',')
        .map((n) => parseInt(n, 10))
        .filter((n) => n >= 1 && n <= BASE_STEPS.length)
      if (steps.length) {
        setDone(steps.map((n) => BASE_STEPS[n - 1]))
        return
      }
    }
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) setDone(JSON.parse(raw))
    } catch {
      /* private mode — ignore */
    }
  }, [])

  // Persist locally and sync the URL in one effect.
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(done))
    } catch {
      /* private mode — ignore */
    }
    const params = new URLSearchParams()
    params.set('career', occupationId)
    const steps = done.map(stepIndex).filter((n) => n > 0).sort((a, b) => a - b)
    if (steps.length) params.set('step', steps.join(','))
    window.history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`)
  }, [done, occupationId])

  const copyLink = async () => {
    const url = window.location.href
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
    } catch {
      window.prompt('Copy this link:', url)
    } finally {
      window.setTimeout(() => setCopied(false), 2000)
    }
  }

  const occ = OCCUPATIONS.find((o) => o.id === occupationId) ?? OCCUPATIONS[0]
  const hints = OCCUPATION_HINTS[occ.id] ?? BASE_STEPS.map(() => 'Check your state board for exact requirements.')
  const steps: Step[] = BASE_STEPS.map((title, i) => ({ id: title, title, detail: hints[i] }))

  const toggle = (id: string) =>
    setDone((prev) => (prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]))

  const pct = Math.round((done.length / steps.length) * 100)
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div>
      <div className="no-print space-y-4 mb-6">
        <label className="block text-sm font-medium text-slate-700">
          Career
          <select
            value={occupationId}
            onChange={(e) => setOccupationId(e.target.value)}
            className="mt-1 w-full sm:w-80 block rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none"
          >
            {OCCUPATIONS.map((o) => (
              <option key={o.id} value={o.id}>
                {o.emoji} {o.name}
              </option>
            ))}
          </select>
        </label>
        <p className="text-sm text-slate-500">
          Tap each step as you complete it. Your progress is saved in this browser and in the page link,
          so you can share or reopen it on any device. Print the card below to keep your license road visible.
        </p>
      </div>

      {/* Printable report */}
      <div className="report-area rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4 mb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">LicenseFig · License Road Card</p>
            <h2 className="text-xl font-bold text-slate-900 mt-1">
              {occ.emoji} {occ.name} — licensing road
            </h2>
          </div>
          <div className="text-right text-xs text-slate-500">
            <p>{today}</p>
            <p className="font-semibold text-indigo-600 text-sm mt-1">{done.length}/{steps.length} done</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>Progress</span>
            <span>{pct}%</span>
          </div>
          <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>

        <ol className="space-y-3">
          {steps.map((s, i) => {
            const checked = done.includes(s.id)
            return (
              <li key={s.id} className="flex gap-3 items-start">
                <button
                  type="button"
                  onClick={() => toggle(s.id)}
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-xs font-bold transition-colors"
                  aria-label={checked ? `Mark ${s.title} as not done` : `Mark ${s.title} done`}
                  aria-pressed={checked}
                  style={{
                    borderColor: checked ? '#4f46e5' : '#cbd5e1',
                    background: checked ? '#4f46e5' : 'white',
                    color: checked ? 'white' : '#64748b',
                  }}
                >
                  {checked ? '✓' : i + 1}
                </button>
                <div>
                  <p className={`font-semibold text-sm ${checked ? 'text-slate-400 line-through' : 'text-slate-900'}`}>{s.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{s.detail}</p>
                </div>
              </li>
            )
          })}
        </ol>

        <p className="text-xs text-slate-500 border-t border-slate-100 mt-6 pt-4">
          Requirements vary by state and change often — always verify the current steps and deadlines with your
          state board before you pay for a course or exam.
        </p>
      </div>

      <div className="no-print mt-4 flex items-center gap-3">
        <PrintButton label="Print / Save this road card" />
        <button
          type="button"
          onClick={copyLink}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:border-indigo-400 hover:text-indigo-600"
        >
          {copied ? 'Copied!' : 'Copy link'}
        </button>
        <button
          type="button"
          onClick={() => setDone([])}
          className="text-sm text-slate-500 hover:text-red-600 underline"
        >
          Reset progress
        </button>
      </div>
    </div>
  )
}
