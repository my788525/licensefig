'use client'

import { useState } from 'react'
import { OCCUPATIONS, STATES } from '@/data/types'
import { getRequirement } from '@/data/requirements'
import PrintButton from './PrintButton'

const VENDOR_URLS: Record<string, string> = {
  'PSI': 'https://www.psionline.com',
  'Pearson VUE': 'https://home.pearsonvue.com',
  'Credentia': 'https://www.credentia.com',
  'Prometric': 'https://www.prometric.com',
  'FSMTB (MBLEx)': 'https://www.fsmtb.org',
  'Headmaster': 'https://www.headmasterllp.com',
}

// 2026 changes the exam-prep community is tracking. These are real, publicly
// reported changes — they are the reason candidates should re-verify exam
// structure with their vendor before studying.
const CHANGES_2026 = [
  {
    title: 'Arizona — real estate exam split',
    detail:
      'Arizona split the real estate salesperson exam into two timed portions: a national portion of 80 questions and a state portion of 60 questions. Candidates must pass both portions within the same appointment.',
  },
  {
    title: 'Texas — new national exam outline',
    detail:
      'Texas updated its real estate exam blueprint: the national portion is now 40 questions organized around 6 content domains. Study with the current outline, not older materials.',
  },
  {
    title: 'NAR settlement — buyer agency tested in all 50 states',
    detail:
      'Following the 2024 NAR commission settlement and the industry shift to written buyer representation agreements, buyer-agency topics now appear on real estate licensing exams in every state. Expect questions on buyer representation agreements, compensation disclosure and fiduciary duty.',
  },
]

interface Row {
  label: string
  value: string
  hint: string
}

export default function ExamStructureLookup() {
  const [occupationId, setOccupationId] = useState('real-estate-salesperson')
  const [stateCode, setStateCode] = useState('CA')

  const occ = OCCUPATIONS.find((o) => o.id === occupationId) ?? OCCUPATIONS[0]
  const st = STATES.find((s) => s.code === stateCode) ?? STATES[0]
  const req = getRequirement(occ.id, st.code)
  const exam = req?.exam

  const rows: Row[] = [
    {
      label: 'Exam vendor',
      value: req?.examVendor?.name ?? (occ.examVendors.length ? occ.examVendors.join(' / ') : 'Check with your state'),
      hint: req?.examVendor ? '' : 'Typical vendors for this career. Your state picks one.',
    },
    {
      label: 'Questions (national)',
      value: exam?.nationalQuestions != null ? String(exam.nationalQuestions) : 'Data pending',
      hint: exam?.nationalQuestions != null ? '' : 'Check with your vendor for the current count.',
    },
    {
      label: 'Questions (state)',
      value: exam?.stateQuestions != null ? String(exam.stateQuestions) : 'Data pending',
      hint: exam?.stateQuestions != null ? '' : 'Some careers do not have a state portion.',
    },
    {
      label: 'Time limit',
      value: exam?.timeLimitMin != null ? `${exam.timeLimitMin} minutes` : 'Data pending',
      hint: exam?.timeLimitMin != null ? '' : 'Check with your vendor.',
    },
    {
      label: 'Passing score',
      value: exam?.passingPct != null ? `${exam.passingPct}%` : 'Data pending',
      hint: exam?.passingPct != null ? '' : 'Passing scales are set by the state; confirm before you sit.',
    },
    {
      label: 'Retake wait',
      value: exam?.retakeWait ?? 'Data pending',
      hint: exam?.retakeWait != null ? '' : 'Retake rules vary by state.',
    },
    {
      label: 'Exam fee',
      value: exam?.examFee != null ? `$${exam.examFee}` : 'Data pending',
      hint: exam?.examFee != null ? '' : 'Fee is set by the vendor/state.',
    },
  ]

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
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">LicenseFig · Exam Structure Lookup</p>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            {occ.name} exam — {st.name}
          </h2>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 mb-6">
          <table className="w-full text-sm">
            <tbody>
              {rows.map((r) => (
                <tr key={r.label} className="border-b border-slate-100 last:border-0">
                  <td className="px-4 py-3 font-semibold text-slate-700 w-44 align-top">{r.label}</td>
                  <td className="px-4 py-3 align-top">
                    <span
                      className={
                        r.value === 'Data pending'
                          ? 'text-amber-600 font-medium'
                          : 'text-slate-900 font-medium'
                      }
                    >
                      {r.value}
                    </span>
                    {r.hint && <span className="block text-xs text-slate-500 mt-0.5">{r.hint}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!exam && (
          <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800 mb-6">
            We have not yet loaded the official {st.name} exam numbers for {occ.name}. Until we do, treat this page
            as a planner, not a source — <strong>check the current structure with your vendor or state board</strong>{' '}
            before you pay for prep.
          </div>
        )}

        <h3 className="font-bold text-slate-900 text-sm mb-3">Exam vendors for this career</h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {occ.examVendors.map((v) => {
            const url = VENDOR_URLS[v]
            return url ? (
              <a
                key={v}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-100"
              >
                {v} ↗
              </a>
            ) : (
              <span key={v} className="text-xs font-medium px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                {v}
              </span>
            )
          })}
        </div>

        <h3 className="font-bold text-slate-900 text-sm mb-3">2026 changes to watch</h3>
        <div className="space-y-3">
          {CHANGES_2026.map((c) => (
            <div key={c.title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">{c.title}</p>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">{c.detail}</p>
            </div>
          ))}
        </div>

        <p className="text-xs text-slate-500 border-t border-slate-100 mt-6 pt-4">
          Exam structure is set by each state and its vendor and changes frequently — including major blueprint
          updates in 2026. Always verify the current question counts, time limit, passing standard and fee with your
          state board or exam vendor before you register.
        </p>
      </div>

      <div className="no-print mt-4">
        <PrintButton label="Print / Save this lookup" />
      </div>
    </div>
  )
}
