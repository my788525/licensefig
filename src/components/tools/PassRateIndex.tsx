'use client'

import { useMemo, useState } from 'react'
import { OCCUPATIONS, STATES, getState } from '@/data/types'
import { requirementsMap } from '@/lib/requirements'
import { PrintButton, Disclaimer, Label, inputClass } from './shared'

function difficulty(pct: number): { label: string; cls: string } {
  if (pct >= 80) return { label: 'Low', cls: 'bg-emerald-100 text-emerald-700' }
  if (pct >= 65) return { label: 'Med', cls: 'bg-amber-100 text-amber-700' }
  return { label: 'High', cls: 'bg-rose-100 text-rose-700' }
}

export default function PassRateIndex() {
  const [occupationId, setOccupationId] = useState(OCCUPATIONS[0].id)
  const [highlightCode, setHighlightCode] = useState('')

  const occupation = useMemo(() => OCCUPATIONS.find((o) => o.id === occupationId), [occupationId])
  const data = useMemo(() => requirementsMap(occupationId), [occupationId])

  const withData = useMemo(() => {
    return STATES.map((s) => ({
      state: s,
      pct: data[s.code]?.passRatePct ?? null,
    }))
      .filter((r) => r.pct != null)
      .sort((a, b) => (b.pct as number) - (a.pct as number))
  }, [data])

  const withoutData = useMemo(() => {
    return STATES.map((s) => ({ state: s, pct: data[s.code]?.passRatePct ?? null })).filter((r) => r.pct == null)
  }, [data])

  return (
    <div>
      <div className="no-print rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Occupation</Label>
            <select className={inputClass} value={occupationId} onChange={(e) => setOccupationId(e.target.value)}>
              {OCCUPATIONS.map((o) => (
                <option key={o.id} value={o.id}>{o.name}</option>
              ))}
            </select>
          </div>
          <div>
            <Label>Highlight a state (optional)</Label>
            <select className={inputClass} value={highlightCode} onChange={(e) => setHighlightCode(e.target.value)}>
              <option value="">— None —</option>
              {STATES.map((s) => (
                <option key={s.code} value={s.code}>{s.name} ({s.code})</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="report-area mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm print:shadow-none">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">{occupation?.name} — pass rate index</h2>
            <p className="text-sm text-slate-500">
              First-attempt pass rates by state, highest first. Only ~15–20 states publish official pass rates.
            </p>
          </div>
          <PrintButton />
        </div>

        {withData.length === 0 ? (
          <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            No official pass rates published for {occupation?.name} yet. Only about 15–20 states publish official
            pass-rate figures at all — data pending, verify with your state board.
          </div>
        ) : (
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  <th className="px-3 py-2.5 font-semibold">Rank</th>
                  <th className="px-3 py-2.5 font-semibold">State</th>
                  <th className="px-3 py-2.5 font-semibold">Pass rate</th>
                  <th className="px-3 py-2.5 font-semibold">Difficulty</th>
                  <th className="px-3 py-2.5 font-semibold">Source</th>
                </tr>
              </thead>
              <tbody>
                {withData.map((row, i) => {
                  const diff = difficulty(row.pct as number)
                  const isHighlight = highlightCode === row.state.code
                  return (
                    <tr
                      key={row.state.code}
                      className={
                        'border-t border-slate-100 ' +
                        (isHighlight ? 'bg-indigo-50 ring-1 ring-inset ring-indigo-200' : '')
                      }
                    >
                      <td className="px-3 py-2.5 text-slate-500">{i + 1}</td>
                      <td className="px-3 py-2.5 font-medium">
                        {row.state.code}
                        {isHighlight && <span className="ml-1 text-[11px] text-indigo-600">(selected)</span>}
                      </td>
                      <td className="px-3 py-2.5 font-semibold">{row.pct}%</td>
                      <td className="px-3 py-2.5">
                        <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${diff.cls}`}>{diff.label}</span>
                      </td>
                      <td className="px-3 py-2.5 text-xs text-slate-500">{data[row.state.code]?.passRateSource ?? '—'}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {withoutData.length > 0 && (
          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600">
            <p className="font-semibold text-slate-700">
              States without published pass rates ({withoutData.length}):
            </p>
            <p className="mt-1">
              {withoutData.map((r) => r.state.code).join(', ')} — pass rate “not published”. States vary: many boards
              never release first-attempt pass rates. Check the state board or vendor directly.
            </p>
          </div>
        )}

        <p className="mt-4 text-xs text-slate-500">
          Difficulty is a rough label derived from the pass rate: ≥80% Low, 65–79% Med, &lt;65% High. A high pass rate
          does not mean the exam is easy — it reflects who shows up prepared. Rates are first-attempt, where
          published, and change each testing cycle.
        </p>

        <Disclaimer />
      </div>
    </div>
  )
}
