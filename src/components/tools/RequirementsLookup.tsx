'use client'

import { useMemo, useState } from 'react'
import { OCCUPATIONS, STATES, getState } from '@/data/types'
import { requirementsMap, type RequirementMap } from '@/lib/requirements'
import { stateFromZip } from '@/lib/zip-states'
import { PrintButton, Disclaimer, Field, DataPending, Label, inputClass } from './shared'

export default function RequirementsLookup() {
  const [occupationId, setOccupationId] = useState(OCCUPATIONS[0].id)
  const [stateCode, setStateCode] = useState('CA')
  const [zip, setZip] = useState('')
  const [zipNote, setZipNote] = useState<string | null>(null)

  const data: RequirementMap = useMemo(() => requirementsMap(occupationId), [occupationId])

  const record = useMemo(() => data[stateCode], [data, stateCode])
  const occupation = useMemo(() => OCCUPATIONS.find((o) => o.id === occupationId), [occupationId])
  const state = getState(stateCode)

  function handleZip(value: string) {
    const clean = value.replace(/\D/g, '').slice(0, 5)
    setZip(clean)
    setZipNote(null)
    if (clean.length === 5) {
      const detected = stateFromZip(clean)
      if (detected) {
        setStateCode(detected)
        setZipNote(`ZIP ${clean} → ${detected}`)
      } else {
        setZipNote('ZIP not recognized — choose a state manually')
      }
    }
  }

  const exam = record?.exam
  const vendor = record?.examVendor

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
            <Label>ZIP (optional, detects state)</Label>
            <input
              className={inputClass}
              inputMode="numeric"
              placeholder="e.g. 90210"
              value={zip}
              onChange={(e) => handleZip(e.target.value)}
            />
            {zipNote && <p className="mt-1 text-xs text-indigo-600">{zipNote}</p>}
          </div>
        </div>
      </div>

      <div className="report-area mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm print:shadow-none">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {occupation?.name} — {state?.name}
            </h2>
            <p className="text-sm text-slate-500">License requirements summary</p>
          </div>
          <PrintButton />
        </div>

        {!record ? (
          <div className="mt-4">
            <DataPending />
            <p className="mt-2 text-sm text-slate-500">
              State-specific data for {state?.name} has not been published here yet. Check the state board page below
              for the current requirement sheet.
            </p>
          </div>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <dl className="rounded-xl border border-slate-200 p-4">
              <h3 className="mb-2 text-sm font-bold text-indigo-700">Eligibility</h3>
              <Field label="Education hours" value={record.educationHours != null ? `${record.educationHours} hours` : undefined} />
              <Field label="Education level" value={record.educationLevel} />
              <Field label="Minimum age" value={record.ageMinimum != null ? `${record.ageMinimum} years` : undefined} />
              <Field label="Background check" value={record.backgroundCheck != null ? (record.backgroundCheck ? 'Yes' : 'No') : undefined} />
            </dl>

            <dl className="rounded-xl border border-slate-200 p-4">
              <h3 className="mb-2 text-sm font-bold text-indigo-700">Exam structure</h3>
              <Field label="Exam vendor" value={vendor?.name ? (vendor.url ? `${vendor.name} ↗` : vendor.name) : undefined} />
              <Field label="National questions" value={exam?.nationalQuestions != null ? String(exam.nationalQuestions) : undefined} />
              <Field label="State questions" value={exam?.stateQuestions != null ? String(exam.stateQuestions) : undefined} />
              <Field label="Time limit" value={exam?.timeLimitMin != null ? `${exam.timeLimitMin} minutes` : undefined} />
              <Field label="Passing score" value={exam?.passingPct != null ? `${exam.passingPct}%` : undefined} />
            </dl>

            <dl className="rounded-xl border border-slate-200 p-4">
              <h3 className="mb-2 text-sm font-bold text-indigo-700">Costs &amp; retake</h3>
              <Field label="Application fee" value={record.applicationFee != null ? `$${record.applicationFee}` : undefined} />
              <Field label="Exam fee" value={exam?.examFee != null ? `$${exam.examFee}` : undefined} />
              <Field label="License fee" value={record.licenseFee != null ? `$${record.licenseFee}` : undefined} />
              <Field label="Retake wait" value={exam?.retakeWait} />
              <Field label="Retake fee" value={exam?.retakeFee != null ? `$${exam.retakeFee}` : undefined} />
            </dl>

            <dl className="rounded-xl border border-slate-200 p-4">
              <h3 className="mb-2 text-sm font-bold text-indigo-700">Renewal &amp; reciprocity</h3>
              <Field label="License valid" value={record.renewal ? `${record.renewal.years} years` : undefined} />
              <Field label="CE required" value={record.renewal?.ceHours != null ? `${record.renewal.ceHours} hours` : undefined} />
              <Field label="Reciprocity" value={record.reciprocity} />
            </dl>

            <div className="rounded-xl border border-slate-200 p-4 sm:col-span-2 lg:col-span-2">
              <h3 className="mb-2 text-sm font-bold text-indigo-700">Official source</h3>
              {record.officialUrl ? (
                <p className="text-sm">
                  <a href={record.officialUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-indigo-600 hover:underline">
                    {record.officialName ?? `${state?.name} state board`} ↗
                  </a>
                  <span className="ml-2 text-xs text-slate-400">retrieved {record.retrieved}</span>
                </p>
              ) : (
                <p className="text-sm text-slate-500">
                  Search “{state?.name} {occupation?.shortName} license board” on the web for the official requirement sheet.
                </p>
              )}
              {exam?.passingPct && (
                <p className="mt-2 text-xs text-slate-500">
                  First-attempt pass rate: {record.passRatePct != null ? `${record.passRatePct}% (published)` : 'not published'}.
                </p>
              )}
            </div>
          </div>
        )}

        <Disclaimer />
      </div>
    </div>
  )
}
