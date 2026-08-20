'use client'

import { useMemo, useState } from 'react'
import { OCCUPATIONS, STATES, getState } from '@/data/types'
import { requirementsMap } from '@/lib/requirements'
import { PrintButton, Disclaimer, Label, inputClass } from './shared'

export default function ReciprocityChecker() {
  const [occupationId, setOccupationId] = useState(OCCUPATIONS[0].id)
  const [fromCode, setFromCode] = useState('CA')
  const [toCode, setToCode] = useState('TX')

  const occupation = useMemo(() => OCCUPATIONS.find((o) => o.id === occupationId), [occupationId])
  const fromState = getState(fromCode)
  const toState = getState(toCode)
  const data = useMemo(() => requirementsMap(occupationId), [occupationId])

  const fromRec = data[fromCode]
  const toRec = data[toCode]
  const sameState = fromCode === toCode

  const reciprocityNote = fromRec?.reciprocity ?? toRec?.reciprocity ?? null

  const fromBoard = fromRec?.officialUrl
    ? { name: fromRec.officialName ?? `${fromState?.name} board`, url: fromRec.officialUrl }
    : null
  const toBoard = toRec?.officialUrl
    ? { name: toRec.officialName ?? `${toState?.name} board`, url: toRec.officialUrl }
    : null

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
            <Label>Licensed in (current state)</Label>
            <select className={inputClass} value={fromCode} onChange={(e) => setFromCode(e.target.value)}>
              {STATES.map((s) => (
                <option key={s.code} value={s.code}>{s.name} ({s.code})</option>
              ))}
            </select>
          </div>
          <div>
            <Label>Moving to (target state)</Label>
            <select className={inputClass} value={toCode} onChange={(e) => setToCode(e.target.value)}>
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
            <h2 className="text-xl font-bold text-slate-900">
              Reciprocity — {occupation?.shortName}
            </h2>
            <p className="text-sm text-slate-500">{fromState?.name} → {toState?.name}</p>
          </div>
          <PrintButton />
        </div>

        {sameState ? (
          <p className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            Same state selected — no reciprocity needed. You are already licensed in {toState?.name}.
          </p>
        ) : reciprocityNote ? (
          <div className="mt-4">
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
              <p className="font-semibold">Published reciprocity note</p>
              <p className="mt-1">{reciprocityNote}</p>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              This note comes from the state requirements data. Reciprocity rules change frequently — confirm with
              both boards before paying any application fee.
            </p>
          </div>
        ) : (
          <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            <p className="font-semibold">No reciprocity terms in our data for {occupation?.shortName}</p>
            <p className="mt-1">
              Endorsement, waiver or “license-by-licensure” terms vary by state and change often. Check both state
              boards directly — most post a reciprocity/endorsement page and an application for license transfer.
            </p>
          </div>
        )}

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 p-4">
            <h3 className="text-sm font-bold text-indigo-700">{fromState?.name} board</h3>
            {fromBoard ? (
              <a href={fromBoard.url} target="_blank" rel="noopener noreferrer" className="mt-1 block text-sm font-medium text-indigo-600 hover:underline">
                {fromBoard.name} ↗
              </a>
            ) : (
              <p className="mt-1 text-sm text-slate-500">
                Search “{fromState?.name} {occupation?.shortName} license board” online.
              </p>
            )}
          </div>
          <div className="rounded-xl border border-slate-200 p-4">
            <h3 className="text-sm font-bold text-indigo-700">{toState?.name} board</h3>
            {toBoard ? (
              <a href={toBoard.url} target="_blank" rel="noopener noreferrer" className="mt-1 block text-sm font-medium text-indigo-600 hover:underline">
                {toBoard.name} ↗
              </a>
            ) : (
              <p className="mt-1 text-sm text-slate-500">
                Search “{toState?.name} {occupation?.shortName} license board” online.
              </p>
            )}
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600">
          <p className="font-semibold text-slate-700">What to check with each board</p>
          <ul className="mt-1 list-disc pl-5 space-y-0.5">
            <li>Does {toState?.name} have an endorsement/reciprocity path, or do you sit the exam like a new applicant?</li>
            <li>Is your current license active and in good standing (no discipline, no lapse)?</li>
            <li>Education-hour and background-check requirements often still apply even with reciprocity.</li>
            <li>Application fees, fingerprinting and processing time — budgets usually need a few months of buffer.</li>
          </ul>
        </div>

        <Disclaimer>Reciprocity rules change frequently — verify with both state boards before applying.</Disclaimer>
      </div>
    </div>
  )
}
