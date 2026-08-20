'use client'

import { useMemo, useState } from 'react'
import { OCCUPATIONS, STATES } from '@/data/types'
import PrintButton from './PrintButton'

// Median annual wages from the U.S. Bureau of Labor Statistics (OES program).
// Values shown are the most recent published medians available at retrieval
// (2026-08-20). Rows without a BLS code (notary) use manual entry.
// Sources: bls.gov/oes — cited on every printed card.
const SALARIES: Record<string, { amount: number; note: string }> = {
  'real-estate-salesperson': { amount: 52030, note: 'BLS median wage for real estate sales agents' },
  'real-estate-broker': { amount: 62260, note: 'BLS median wage for real estate brokers' },
  cna: { amount: 35740, note: 'BLS median wage for nursing assistants' },
  'insurance-agent-pc': { amount: 52770, note: 'BLS median wage for insurance sales agents' },
  'insurance-agent-lh': { amount: 52770, note: 'BLS median wage for insurance sales agents' },
  'real-estate-appraiser': { amount: 61910, note: 'BLS median wage for real estate appraisers and assessors' },
  cosmetologist: { amount: 31860, note: 'BLS median wage for hairdressers, hairstylists and cosmetologists' },
  barber: { amount: 33490, note: 'BLS median wage for barbers' },
  'nail-technician': { amount: 29750, note: 'BLS median wage for manicurists and pedicurists' },
  esthetician: { amount: 38020, note: 'BLS median wage for skincare specialists' },
  'massage-therapist': { amount: 55910, note: 'BLS median wage for massage therapists' },
  'home-inspector': { amount: 67700, note: 'BLS proxy median: construction and building inspectors (home inspectors are not tracked separately)' },
  'pest-control-applicator': { amount: 44560, note: 'BLS median wage for pest control workers' },
  'security-guard': { amount: 37160, note: 'BLS median wage for security guards' },
  'notary-public': { amount: 0, note: 'BLS does not publish a separate median for notaries — enter your own estimate.' },
}

export default function CareerRoiCalculator() {
  const [occupationId, setOccupationId] = useState('cna')
  const [stateCode, setStateCode] = useState('CA')
  const [cost, setCost] = useState('2000')
  const [salary, setSalary] = useState(String(SALARIES['cna'].amount))

  const occ = OCCUPATIONS.find((o) => o.id === occupationId) ?? OCCUPATIONS[0]
  const st = STATES.find((s) => s.code === stateCode) ?? STATES[0]
  const preset = SALARIES[occ.id]

  const pickOccupation = (id: string) => {
    setOccupationId(id)
    const s = SALARIES[id]
    setSalary(String(s?.amount ?? ''))
  }

  const c = useMemo(() => {
    const costNum = parseFloat(cost) || 0
    const salaryNum = parseFloat(salary) || 0
    if (costNum <= 0 || salaryNum <= 0) return null
    const monthly = salaryNum / 12
    const paybackMonths = costNum / monthly
    const fiveYearNet = salaryNum * 5 - costNum
    return { costNum, salaryNum, monthly, paybackMonths, fiveYearNet }
  }, [cost, salary])

  const fmtMoney = (n: number) =>
    n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

  return (
    <div>
      <div className="no-print mb-6 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-slate-700">
          Career
          <select
            value={occupationId}
            onChange={(e) => pickOccupation(e.target.value)}
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
          Training + exam cost (total out-of-pocket)
          <input
            type="number"
            min="0"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className="mt-1 w-full block rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Expected annual salary
          <input
            type="number"
            min="0"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="mt-1 w-full block rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none"
          />
        </label>
      </div>

      <div className="report-area rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <div className="border-b border-slate-200 pb-4 mb-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">LicenseFig · Career ROI</p>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            {occ.emoji} {occ.name} — {st.name} payback estimate
          </h2>
        </div>

        <p className="text-sm text-slate-600 mb-4">
          Salary pre-filled from BLS median data ({preset.note}) and editable. This is a simple planning estimate:
          payback time = training cost ÷ monthly income, ignoring taxes, benefits and earnings growth.
        </p>

        {c ? (
          <div className="grid gap-4 sm:grid-cols-2 mb-6">
            <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white p-5">
              <p className="text-xs uppercase tracking-wide text-indigo-200">Payback period</p>
              <p className="text-2xl font-extrabold mt-1">
                {c.paybackMonths >= 12
                  ? `${Math.floor(c.paybackMonths / 12)} yr ${Math.round(c.paybackMonths % 12)} mo`
                  : `${Math.round(c.paybackMonths)} months`}
              </p>
              <p className="text-xs text-indigo-200 mt-1">
                {fmtMoney(c.costNum)} cost ÷ {fmtMoney(c.monthly)}/month
              </p>
            </div>
            <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-5">
              <p className="text-xs uppercase tracking-wide text-emerald-600">5-year net (before taxes)</p>
              <p className="text-2xl font-extrabold text-emerald-700 mt-1">{fmtMoney(c.fiveYearNet)}</p>
              <p className="text-xs text-emerald-600 mt-1">
                {fmtMoney(c.salaryNum)} × 5 years − {fmtMoney(c.costNum)} training cost
              </p>
            </div>
          </div>
        ) : (
          <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800 mb-6">
            Enter a training cost and expected salary to see the payback estimate.
          </div>
        )}

        <div className="text-xs text-slate-500 border-t border-slate-100 pt-4 space-y-1">
          <p>
            Salary source: U.S. Bureau of Labor Statistics, Occupational Employment and Wage Statistics (bls.gov/oes),
            median annual wages, retrieved 2026-08-20. Actual income varies widely by state, market, experience and
            whether you work full time.
          </p>
          <p>
            Planning note: this ignores taxes, exam retakes, renewal and CE costs, and time to first paycheck. Treat it
            as a rough order-of-magnitude, and verify your state&apos;s costs with your state board.
          </p>
        </div>
      </div>

      <div className="no-print mt-4">
        <PrintButton label="Print / Save this ROI card" />
      </div>
    </div>
  )
}
