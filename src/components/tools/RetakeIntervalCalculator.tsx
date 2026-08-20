'use client'

import { useMemo, useState } from 'react'
import { OCCUPATIONS, STATES, getState } from '@/data/types'
import { requirementsMap } from '@/lib/requirements'
import { PrintButton, Disclaimer, Label, inputClass } from './shared'

// General state retake rules used only when the requirements data file has no
// `retakeWait` for the selected occupation-state. These are commonly published
// state rules — verify the current rule with your state board.
const FALLBACK_RULES: Record<string, string> = {
  CA: 'Next day',
  FL: '24 hours',
  NC: '10 days',
  TX: '3 attempts per year',
}

interface Parsed {
  kind: 'add' | 'annual' | 'unknown'
  addDays?: number
  annual?: number
  label: string
}

function parseRetakeWait(wait: string | undefined): Parsed {
  if (!wait) return { kind: 'unknown', label: 'Check with your state board' }
  const lower = wait.toLowerCase()
  const dayMatch = lower.match(/(\d+)\s*days?/)
  if (dayMatch) return { kind: 'add', addDays: Number(dayMatch[1]), label: wait }
  const hourMatch = lower.match(/(\d+)\s*hours?/)
  if (hourMatch) return { kind: 'add', addDays: Math.max(1, Math.ceil(Number(hourMatch[1]) / 24)), label: wait }
  const weekMatch = lower.match(/(\d+)\s*weeks?/)
  if (weekMatch) return { kind: 'add', addDays: Number(weekMatch[1]) * 7, label: wait }
  const monthMatch = lower.match(/(\d+)\s*months?/)
  if (monthMatch) return { kind: 'add', addDays: Number(monthMatch[1]) * 30, label: wait }
  if (lower.includes('next day') || lower.includes('next business day') || lower === 'next day') {
    return { kind: 'add', addDays: 1, label: wait }
  }
  const annualMatch = lower.match(/(\d+)\s*attempts?\s*per\s*(year|12)/)
  if (annualMatch) return { kind: 'annual', annual: Number(annualMatch[1]), label: wait }
  return { kind: 'unknown', label: wait }
}

const fmtDate = (d: Date) =>
  d.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })

export default function RetakeIntervalCalculator() {
  const [occupationId, setOccupationId] = useState(OCCUPATIONS[0].id)
  const [stateCode, setStateCode] = useState('CA')
  const [lastDate, setLastDate] = useState('')

  const occupation = useMemo(() => OCCUPATIONS.find((o) => o.id === occupationId), [occupationId])
  const state = getState(stateCode)
  const record = useMemo(() => requirementsMap(occupationId)[stateCode], [occupationId, stateCode])

  const rule = record?.exam?.retakeWait ?? FALLBACK_RULES[stateCode]
  const parsed = parseRetakeWait(rule)
  const retakeFee = record?.exam?.retakeFee
  const usingFallback = !record?.exam?.retakeWait && !!FALLBACK_RULES[stateCode]

  const result = useMemo(() => {
    if (!lastDate) return null
    const last = new Date(`${lastDate}T12:00:00`)
    if (Number.isNaN(last.getTime())) return null
    if (parsed.kind === 'add' && parsed.addDays != null) {
      const earliest = new Date(last)
      earliest.setDate(earliest.getDate() + parsed.addDays)
      const suggested = new Date(earliest)
      suggested.setDate(suggested.getDate() + 28)
      return { earliest, suggested, kind: parsed.kind }
    }
    return { earliest: null, suggested: null, kind: parsed.kind }
  }, [lastDate, parsed])

  return (
    <div>
      <div className="no-print rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <Label>Occupation</Label>
            <select className={inputClass} value={occupationId} onChange={(e) => setOccupationId(e.target.value)}>
              {OCCUPATIONS.map((o) => (
                <option key={o.id} value={o.id}>{o.name}</option>
              ))}
            </select>
          </div>
          <div>
            <Label>State</Label>
            <select className={inputClass} value={stateCode} onChange={(e) => setStateCode(e.target.value)}>
              {STATES.map((s) => (
                <option key={s.code} value={s.code}>{s.name} ({s.code})</option>
              ))}
            </select>
          </div>
          <div>
            <Label>Last exam date</Label>
            <input type="date" className={inputClass} value={lastDate} onChange={(e) => setLastDate(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="report-area mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm print:shadow-none">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Retake interval — {occupation?.shortName} in {state?.name}
            </h2>
            <p className="text-sm text-slate-500">Earliest retake date and recommended window</p>
          </div>
          <PrintButton />
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 p-4">
            <h3 className="text-sm font-bold text-indigo-700">State rule</h3>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              {parsed.label}
              {usingFallback && <span className="block text-xs font-normal text-amber-600">General state rule — not yet verified for {occupation?.shortName}. Confirm with the state board.</span>}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 p-4">
            <h3 className="text-sm font-bold text-indigo-700">Earliest retake date</h3>
            {!lastDate ? (
              <p className="mt-1 text-sm text-slate-500">Pick your last exam date.</p>
            ) : parsed.kind === 'add' && result?.earliest ? (
              <p className="mt-1 text-lg font-bold text-slate-900">{fmtDate(result.earliest)}</p>
            ) : parsed.kind === 'annual' ? (
              <p className="mt-1 text-sm text-slate-900">
                Limited to {parsed.annual} attempt{parsed.annual === 1 ? '' : 's'} per calendar year — the exact earliest
                date depends on your score notice. Check with the state board.
              </p>
            ) : (
              <p className="mt-1 text-sm text-slate-500">{parsed.label} — check with the state board for the exact date.</p>
            )}
          </div>
          <div className="rounded-xl border border-slate-200 p-4">
            <h3 className="text-sm font-bold text-indigo-700">Retake fee &amp; suggested window</h3>
            <p className="mt-1 text-sm text-slate-900">
              {retakeFee != null ? `$${retakeFee} (published)` : 'Fee not published — check with the state board.'}
            </p>
            {result?.suggested && (
              <p className="mt-1 text-sm text-slate-600">
                Best window: retake within 1–4 weeks after your review, by {fmtDate(result.suggested)}.
              </p>
            )}
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600">
          <p className="font-semibold text-slate-700">Suggested retake approach</p>
          <ul className="mt-1 list-disc pl-5 space-y-0.5">
            <li>Review your score report and isolate the sections you failed (national vs. state portion).</li>
            <li>Re-study only the weak areas — do not repeat the whole syllabus if you were close.</li>
            <li>Schedule the retake as soon as the rule allows, but only when you are consistently passing practice sets at or above the passing score.</li>
            <li>Confirm the retake window and fee on your official score notice — it overrides any general rule.</li>
          </ul>
        </div>

        <Disclaimer />
      </div>
    </div>
  )
}
