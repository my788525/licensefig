'use client'

import { useState } from 'react'
import { OCCUPATIONS, STATES } from '@/data/types'
import { getRequirement } from '@/data/requirements'
import PrintButton from './PrintButton'

// Complementary to the Renewal Calculator: this tool focuses on the CE
// requirement itself — how many hours, per what period, and where to verify.
export default function CERequirementsLookup() {
  const [occupationId, setOccupationId] = useState('real-estate-salesperson')
  const [stateCode, setStateCode] = useState('CA')

  const occ = OCCUPATIONS.find((o) => o.id === occupationId) ?? OCCUPATIONS[0]
  const st = STATES.find((s) => s.code === stateCode) ?? STATES[0]
  const req = getRequirement(occ.id, st.code)
  const renewal = req?.renewal

  const ceHours = renewal?.ceHours ?? null
  const cycleYears = renewal?.years ?? null

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
      </div>

      <div className="report-area rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <div className="border-b border-slate-200 pb-4 mb-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">LicenseFig · CE Requirements</p>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            {occ.name} continuing education — {st.name}
          </h2>
        </div>

        <div className="rounded-2xl bg-indigo-50 border border-indigo-100 p-6 text-center mb-6">
          {ceHours != null ? (
            <>
              <p className="text-4xl font-extrabold text-indigo-700">{ceHours}</p>
              <p className="text-sm text-indigo-800 mt-1">
                continuing education hours required
                {cycleYears ? ` per ${cycleYears}-year renewal cycle` : ''}
              </p>
            </>
          ) : (
            <p className="text-lg font-semibold text-amber-700">
              Data pending — check with your state board
            </p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 mb-6">
          <div className="rounded-xl border border-slate-200 p-4 text-sm text-slate-600">
            <strong className="text-slate-800 block mb-1">Where to verify</strong>
            Contact your <strong>{st.name} state board</strong> for the exact CE rules: hour total, allowed course
            categories, in-person vs online limits and any ethics requirement. Some boards publish a course-approval
            list.
          </div>
          <div className="rounded-xl border border-slate-200 p-4 text-sm text-slate-600">
            <strong className="text-slate-800 block mb-1">Planning tips</strong>
            Spread CE across the cycle instead of doing it in the final month, keep your completion certificates,
            and confirm the board accepts the course before you pay for it.
          </div>
        </div>

        <p className="text-xs text-slate-500 border-t border-slate-100 pt-4">
          Continuing education requirements vary widely by state and occupation, and they change. Always confirm the
          current CE total, course rules and deadlines with your state board.
        </p>
      </div>

      <div className="no-print mt-4">
        <PrintButton label="Print / Save this CE lookup" />
      </div>
    </div>
  )
}
