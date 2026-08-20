'use client'

import { useMemo, useState } from 'react'
import { OCCUPATIONS, STATES, getState } from '@/data/types'
import { requirementsMap } from '@/lib/requirements'
import { PrintButton, Disclaimer, Label, inputClass } from './shared'

// Approximate published ranges (pre-license course providers, state boards,
// BLS). Used only when the requirements data file has not populated exact
// numbers — always labeled as an estimate in the UI.
const TRAINING_RANGE: Record<string, [number, number]> = {
  'real-estate-salesperson': [300, 1000],
  'real-estate-broker': [1000, 2500],
  'notary-public': [50, 300],
  cna: [800, 2500],
  'insurance-agent-pc': [200, 700],
  'insurance-agent-lh': [200, 700],
  'real-estate-appraiser': [2000, 5000],
  cosmetologist: [8000, 20000],
  barber: [8000, 18000],
  'nail-technician': [3000, 8000],
  esthetician: [6000, 15000],
  'massage-therapist': [8000, 15000],
  'home-inspector': [500, 2500],
  'pest-control-applicator': [100, 500],
  'security-guard': [50, 300],
}

const EXAM_RANGE: Record<string, [number, number]> = {
  cna: [120, 220],
  'real-estate-appraiser': [90, 250],
  'home-inspector': [150, 300],
}

const EDU_RANGE: Record<string, [number, number]> = {
  'real-estate-salesperson': [60, 180],
  'real-estate-broker': [90, 270],
  'notary-public': [0, 6],
  cna: [75, 120],
  'insurance-agent-pc': [20, 40],
  'insurance-agent-lh': [20, 40],
  'real-estate-appraiser': [150, 200],
  cosmetologist: [1000, 1500],
  barber: [1000, 1500],
  'nail-technician': [250, 400],
  esthetician: [400, 750],
  'massage-therapist': [500, 1000],
  'home-inspector': [60, 120],
  'pest-control-applicator': [20, 60],
  'security-guard': [8, 40],
}

// Approximate U.S. median annual pay (BLS occupational employment statistics,
// rounded). Clearly labeled as an estimate in the UI — actual pay varies by
// state, experience and market.
const SALARY: Record<string, number> = {
  'real-estate-salesperson': 55000,
  'real-estate-broker': 85000,
  cna: 38000,
  'insurance-agent-pc': 62000,
  'insurance-agent-lh': 62000,
  'real-estate-appraiser': 67000,
  cosmetologist: 38000,
  barber: 39000,
  'nail-technician': 33000,
  esthetician: 41000,
  'massage-therapist': 55000,
  'home-inspector': 65000,
  'pest-control-applicator': 46000,
  'security-guard': 38000,
}

const fmtMoney = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

export default function PrepBudgetCalculator() {
  const [occupationId, setOccupationId] = useState(OCCUPATIONS[0].id)
  const [stateCode, setStateCode] = useState('CA')
  const [trainingCost, setTrainingCost] = useState<string>('')
  const [examFee, setExamFee] = useState<string>('')
  const [retakes, setRetakes] = useState(0)
  const [weeklyHours, setWeeklyHours] = useState(10)

  const occupation = useMemo(() => OCCUPATIONS.find((o) => o.id === occupationId), [occupationId])
  const state = getState(stateCode)
  const record = useMemo(() => requirementsMap(occupationId)[stateCode], [occupationId, stateCode])

  const trainingRange = TRAINING_RANGE[occupationId] ?? [200, 1000]
  const examRange = EXAM_RANGE[occupationId] ?? [45, 150]
  const eduRange = EDU_RANGE[occupationId] ?? [40, 100]

  const result = useMemo(() => {
    const defaultTraining = trainingCost === '' ? Math.round((trainingRange[0] + trainingRange[1]) / 2) : Number(trainingCost) || 0
    const dataExamFee = record?.exam?.examFee ?? 0
    const dataAppFee = record?.applicationFee ?? 0
    const dataLicFee = record?.licenseFee ?? 0
    const defaultExam = examFee === '' ? (dataExamFee > 0 ? dataExamFee + dataAppFee : Math.round((examRange[0] + examRange[1]) / 2)) : Number(examFee) || 0

    const examTotal = defaultExam * (1 + retakes)
    const total = defaultTraining + examTotal + dataAppFee + dataLicFee

    const eduHours = record?.educationHours ?? Math.round((eduRange[0] + eduRange[1]) / 2)
    const hoursLabel = record?.educationHours != null ? `${record.educationHours} hours (official)` : `${eduRange[0]}–${eduRange[1]} hours (estimate)`
    const weeks = weeklyHours > 0 ? Math.ceil(eduHours / weeklyHours) : 0

    const salary = SALARY[occupationId]
    const pctOfSalary = salary ? Math.round((total / salary) * 100) : null

    return {
      defaultTraining,
      dataExamFee,
      dataAppFee,
      dataLicFee,
      defaultExam,
      examTotal,
      total,
      eduHours,
      hoursLabel,
      weeks,
      salary,
      pctOfSalary,
      usingEstimates: record?.educationHours == null || !dataExamFee,
    }
  }, [trainingCost, examFee, retakes, weeklyHours, record, occupationId, trainingRange, examRange, eduRange])

  return (
    <div>
      <div className="no-print rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
            <Label>Training / education cost ($)</Label>
            <input
              type="number"
              min={0}
              className={inputClass}
              placeholder={`Typical ${fmtMoney(trainingRange[0])}–${fmtMoney(trainingRange[1])}`}
              value={trainingCost}
              onChange={(e) => setTrainingCost(e.target.value)}
            />
            <p className="mt-1 text-xs text-slate-500">
              Blank = midpoint of typical range ({fmtMoney(trainingRange[0])}–{fmtMoney(trainingRange[1])})
            </p>
          </div>
          <div>
            <Label>Exam fee ($)</Label>
            <input
              type="number"
              min={0}
              className={inputClass}
              placeholder={`Blank = ${result.dataExamFee > 0 ? `official $${result.dataExamFee}` : `typical ${fmtMoney(examRange[0])}–${fmtMoney(examRange[1])}`}`}
              value={examFee}
              onChange={(e) => setExamFee(e.target.value)}
            />
          </div>
          <div>
            <Label>Expected retakes (0–3)</Label>
            <select className={inputClass} value={retakes} onChange={(e) => setRetakes(Number(e.target.value))}>
              {[0, 1, 2, 3].map((n) => (
                <option key={n} value={n}>{n} {n === 1 ? 'retake' : 'retakes'}</option>
              ))}
            </select>
          </div>
          <div>
            <Label>Study hours per week</Label>
            <input
              type="number"
              min={1}
              max={60}
              className={inputClass}
              value={weeklyHours}
              onChange={(e) => setWeeklyHours(Number(e.target.value))}
            />
            <p className="mt-1 text-xs text-slate-500">Used to estimate weeks of study</p>
          </div>
        </div>
      </div>

      <div className="report-area mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm print:shadow-none">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Prep budget — {occupation?.shortName} in {state?.name}
            </h2>
            <p className="text-sm text-slate-500">Cost and time breakdown</p>
          </div>
          <PrintButton />
        </div>

        {result.usingEstimates && (
          <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-xs text-amber-800">
            Some official numbers are not populated for this occupation/state yet — estimates use typical published
            ranges. Official fees vary.
          </p>
        )}

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 p-4">
            <h3 className="text-sm font-bold text-indigo-700">Cost breakdown</h3>
            <dl className="mt-2 space-y-1.5 text-sm">
              <div className="flex justify-between"><dt className="text-slate-500">Training / education</dt><dd className="font-semibold">{fmtMoney(result.defaultTraining)}</dd></div>
              <div className="flex justify-between"><dt className="text-slate-500">Exam fee × {1 + retakes} attempt{retakes > 0 ? 's' : ''}</dt><dd className="font-semibold">{fmtMoney(result.defaultExam)} × {1 + retakes}</dd></div>
              <div className="flex justify-between"><dt className="text-slate-500">Application fee</dt><dd className="font-semibold">{result.dataAppFee > 0 ? fmtMoney(result.dataAppFee) : '—'}</dd></div>
              <div className="flex justify-between"><dt className="text-slate-500">License fee</dt><dd className="font-semibold">{result.dataLicFee > 0 ? fmtMoney(result.dataLicFee) : '—'}</dd></div>
              <div className="flex justify-between border-t border-slate-200 pt-1.5"><dt className="font-bold text-slate-900">Total</dt><dd className="font-bold text-indigo-700">{fmtMoney(result.total)}</dd></div>
            </dl>
          </div>

          <div className="rounded-xl border border-slate-200 p-4">
            <h3 className="text-sm font-bold text-indigo-700">Time cost</h3>
            <dl className="mt-2 space-y-1.5 text-sm">
              <div className="flex justify-between"><dt className="text-slate-500">Education hours</dt><dd className="font-semibold">{result.hoursLabel}</dd></div>
              <div className="flex justify-between"><dt className="text-slate-500">At {weeklyHours} hrs/week</dt><dd className="font-semibold">≈ {result.weeks} weeks</dd></div>
              <p className="mt-2 text-xs text-slate-500">
                Studying to the schedule shortens your timeline — most states also allow retakes quickly after a fail.
              </p>
            </dl>
          </div>

          <div className="rounded-xl border border-slate-200 p-4">
            <h3 className="text-sm font-bold text-indigo-700">ROI hint</h3>
            {result.salary ? (
              <dl className="mt-2 space-y-1.5 text-sm">
                <div className="flex justify-between"><dt className="text-slate-500">Approx. median pay</dt><dd className="font-semibold">{fmtMoney(result.salary)}/yr</dd></div>
                <div className="flex justify-between"><dt className="text-slate-500">Cost as % of 1 yr pay</dt><dd className="font-semibold">{result.pctOfSalary}%</dd></div>
                <div className="flex justify-between"><dt className="text-slate-500">Break-even if you earn median</dt><dd className="font-semibold">≈ {Math.round(result.total / (result.salary / 12))} months</dd></div>
                <p className="mt-2 text-xs text-slate-500">
                  Approximate BLS median — actual pay varies by state, experience and market. Time to license is usually
                  the bigger cost.
                </p>
              </dl>
            ) : (
              <p className="mt-2 text-sm text-slate-500">
                Median pay is not tracked for this career in our dataset — compare the total cost against local job
                postings in your area.
              </p>
            )}
          </div>
        </div>

        <Disclaimer />
      </div>
    </div>
  )
}
