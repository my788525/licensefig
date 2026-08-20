'use client'

import { useMemo, useState } from 'react'
import { OCCUPATIONS, STATES } from '@/data/types'
import { requirementsMap } from '@/lib/requirements'
import { PrintButton, Disclaimer, Label, inputClass } from './shared'

interface CostRow {
  state: string
  examFee: number | null
  appFee: number | null
  total: number | null
}

export default function ExamCostCompare() {
  const [occupationId, setOccupationId] = useState(OCCUPATIONS[0].id)

  const occupation = useMemo(() => OCCUPATIONS.find((o) => o.id === occupationId), [occupationId])
  const data = useMemo(() => requirementsMap(occupationId), [occupationId])

  const rows: CostRow[] = useMemo(() => {
    return STATES.map((s) => {
      const r = data[s.code]
      const examFee = r?.exam?.examFee ?? null
      const appFee = r?.applicationFee ?? null
      const total = examFee != null || appFee != null ? (examFee ?? 0) + (appFee ?? 0) : null
      return { state: s.code, examFee, appFee, total }
    })
  }, [data])

  const known = rows.filter((r) => r.total != null) as Array<CostRow & { total: number }>
  const unknown = rows.filter((r) => r.total == null)

  const sorted = [...known].sort((a, b) => a.total - b.total)
  const minTotal = sorted.length ? sorted[0].total : null
  const maxTotal = sorted.length ? sorted[sorted.length - 1].total : null

  return (
    <div>
      <div className="no-print rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <div className="max-w-sm">
          <Label>Occupation</Label>
          <select className={inputClass} value={occupationId} onChange={(e) => setOccupationId(e.target.value)}>
            {OCCUPATIONS.map((o) => (
              <option key={o.id} value={o.id}>{o.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="report-area mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm print:shadow-none">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">{occupation?.name} — exam cost by state</h2>
            <p className="text-sm text-slate-500">
              Exam fee + application fee where published. Official fees vary — verify with the state board.
            </p>
          </div>
          <PrintButton />
        </div>

        {sorted.length === 0 ? (
          <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            No official fee data published for {occupation?.name} yet. Exam fees typically run $45–$150 plus an
            application fee — official fees vary by state, so check the state board or exam vendor directly.
          </div>
        ) : (
          <>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                <p className="text-xs font-semibold uppercase text-emerald-700">Lowest</p>
                <p className="text-lg font-bold text-emerald-800">
                  {sorted[0].state} — ${sorted[0].total}
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase text-slate-600">States with data</p>
                <p className="text-lg font-bold text-slate-800">{sorted.length} of {STATES.length}</p>
              </div>
              <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
                <p className="text-xs font-semibold uppercase text-rose-700">Highest</p>
                <p className="text-lg font-bold text-rose-800">
                  {sorted[sorted.length - 1].state} — ${sorted[sorted.length - 1].total}
                </p>
              </div>
            </div>

            <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-left">
                  <tr>
                    <th className="px-3 py-2.5 font-semibold">State</th>
                    <th className="px-3 py-2.5 font-semibold text-right">Exam fee</th>
                    <th className="px-3 py-2.5 font-semibold text-right">Application fee</th>
                    <th className="px-3 py-2.5 font-semibold text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((row) => (
                    <tr key={row.state} className="border-t border-slate-100 hover:bg-slate-50">
                      <td className="px-3 py-2 font-medium">
                        {row.state}
                        {row.total === minTotal && (
                          <span className="ml-1.5 rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">Lowest</span>
                        )}
                        {row.total === maxTotal && (
                          <span className="ml-1.5 rounded bg-rose-100 px-1.5 py-0.5 text-[10px] font-semibold text-rose-700">Highest</span>
                        )}
                      </td>
                      <td className="px-3 py-2 text-right">{row.examFee != null ? `$${row.examFee}` : '—'}</td>
                      <td className="px-3 py-2 text-right">{row.appFee != null ? `$${row.appFee}` : '—'}</td>
                      <td className="px-3 py-2 text-right font-semibold">${row.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {unknown.length > 0 && (
              <p className="mt-3 text-xs text-slate-500">
                {unknown.length} states without published fee data ({unknown.map((r) => r.state).join(', ')}). Official
                fees vary — check the state board.
              </p>
            )}
          </>
        )}

        <Disclaimer />
      </div>
    </div>
  )
}
