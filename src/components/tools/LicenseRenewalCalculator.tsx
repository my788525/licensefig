'use client'

import { useMemo, useState } from 'react'
import { OCCUPATIONS, STATES } from '@/data/types'
import { getRequirement } from '@/data/requirements'
import PrintButton from './PrintButton'

export default function LicenseRenewalCalculator() {
  const [occupationId, setOccupationId] = useState('real-estate-salesperson')
  const [stateCode, setStateCode] = useState('CA')
  const [issueDate, setIssueDate] = useState('')
  const [manualYears, setManualYears] = useState('')

  const occ = OCCUPATIONS.find((o) => o.id === occupationId) ?? OCCUPATIONS[0]
  const st = STATES.find((s) => s.code === stateCode) ?? STATES[0]
  const req = getRequirement(occ.id, st.code)
  const renewal = req?.renewal

  const dataYears = renewal?.years ?? null
  const years = dataYears ?? (manualYears ? parseFloat(manualYears) : null)
  const ceHours = renewal?.ceHours ?? null

  const nextRenewal = useMemo(() => {
    if (!issueDate || !years) return null
    const d = new Date(`${issueDate}T00:00:00`)
    if (isNaN(d.getTime())) return null
    d.setFullYear(d.getFullYear() + Math.round(years))
    return d
  }, [issueDate, years])

  const daysLeft = useMemo(() => {
    if (!nextRenewal) return null
    const ms = nextRenewal.getTime() - Date.now()
    return Math.max(0, Math.ceil(ms / (24 * 60 * 60 * 1000)))
  }, [nextRenewal])

  const fmt = (d: Date) =>
    d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div>
      <div className="no-print mb-6 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-slate-700">
          Career
          <select
            value={occupationId}
            onChange={(e) => setOccupationId(e.target.value)}
            className="mt-1 w-full block rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none"
          >
            {OCCUPATIONS.map((o) => (
              <option key={o.id} value={o.id}>
                {o.emoji} {o.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-medium text-slate-700">
          State
          <select
            value={stateCode}
            onChange={(e) => setStateCode(e.target.value)}
            className="mt-1 w-full block rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none"
          >
            {STATES.map((s) => (
              <option key={s.code} value={s.code}>
                {s.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-medium text-slate-700">
          License issued date
          <input
            type="date"
            value={issueDate}
            onChange={(e) => setIssueDate(e.target.value)}
            className="mt-1 w-full block rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none"
          />
        </label>
        {dataYears == null && (
          <label className="block text-sm font-medium text-slate-700">
            Renewal period (years) — manual
            <input
              type="number"
              min="1"
              max="10"
              step="0.5"
              value={manualYears}
              onChange={(e) => setManualYears(e.target.value)}
              placeholder="e.g. 2"
              className="mt-1 w-full block rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none"
            />
          </label>
        )}
      </div>

      <div className="report-area rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <div className="border-b border-slate-200 pb-4 mb-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">LicenseFig · Renewal Calculator</p>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            {occ.name} renewal — {st.name}
          </h2>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 mb-6">
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="px-4 py-3 font-semibold text-slate-700 w-44">Renewal cycle</td>
                <td className="px-4 py-3">
                  {dataYears != null ? (
                    <span className="text-slate-900 font-medium">{dataYears} year(s)</span>
                  ) : (
                    <span className="text-amber-600 font-medium">Data pending — check with your state board</span>
                  )}
                </td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="px-4 py-3 font-semibold text-slate-700 w-44">CE hours required</td>
                <td className="px-4 py-3">
                  {ceHours != null ? (
                    <span className="text-slate-900 font-medium">{ceHours} hours per cycle</span>
                  ) : (
                    <span className="text-amber-600 font-medium">Data pending — check with your state board</span>
                  )}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-slate-700 w-44">Next renewal date</td>
                <td className="px-4 py-3">
                  {nextRenewal ? (
                    <span className="text-slate-900 font-medium">
                      {fmt(nextRenewal)} <span className="text-slate-500">({daysLeft} days away)</span>
                    </span>
                  ) : (
                    <span className="text-slate-500">
                      {years ? 'Enter your license issued date above.' : 'Set a renewal period to calculate the date.'}
                    </span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {dataYears == null && (
          <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800 mb-6">
            We have not yet loaded the official renewal rules for {occ.name} in {st.name}. The renewal period you enter
            is a manual estimate for planning — <strong>verify the real cycle and CE hours with your state board</strong>.
          </div>
        )}

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
          <strong className="text-slate-800">Renewal reminders:</strong> mark your renewal date, complete CE before
          the deadline (not the week of it), and watch for late fees and reinstatement steps if your license lapses.
          Many boards allow renewal 60–90 days early — do it when you can.
        </div>

        <p className="text-xs text-slate-500 border-t border-slate-100 mt-6 pt-4">
          Renewal cycles and CE requirements are set by each state board and change — always verify with your state
          board before planning around this date.
        </p>
      </div>

      <div className="no-print mt-4">
        <PrintButton label="Print / Save this renewal plan" />
      </div>
    </div>
  )
}
