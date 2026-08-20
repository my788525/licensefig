'use client'

import { useMemo, useState } from 'react'
import { STATES, getState } from '@/data/types'
import { stateFromZip } from '@/lib/zip-states'
import { PrintButton, Disclaimer, Label, inputClass } from './shared'

// Official vendor test-center locators only. LicenseFig does not store live
// test-center availability — candidates must search on the vendor's site.
const VENDOR_LOCATORS = [
  {
    name: 'Pearson VUE',
    url: 'https://home.pearsonvue.com/Test-takers/Find-a-test-center.aspx',
    note: 'Most common for real estate, insurance and appraiser exams.',
  },
  {
    name: 'PSI',
    url: 'https://candidate.psiexams.com/',
    note: 'Used by many real estate, insurance and trade licensing boards.',
  },
  {
    name: 'Prometric',
    url: 'https://www.prometric.com/find-a-test-center',
    note: 'Used by some nursing, financial and specialty boards.',
  },
  {
    name: 'Credentia',
    url: 'https://www.credentia.com/',
    note: 'Administers many state CNA written and clinical skills exams.',
  },
]

export default function TestCenterFinder() {
  const [zip, setZip] = useState('')
  const [stateCode, setStateCode] = useState('CA')
  const [zipNote, setZipNote] = useState<string | null>(null)

  const state = useMemo(() => getState(stateCode), [stateCode])

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

  return (
    <div>
      <div className="no-print rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label>ZIP code (detects state)</Label>
            <input
              className={inputClass}
              inputMode="numeric"
              placeholder="e.g. 90210"
              value={zip}
              onChange={(e) => handleZip(e.target.value)}
            />
            {zipNote && <p className="mt-1 text-xs text-indigo-600">{zipNote}</p>}
          </div>
          <div>
            <Label>Or choose a state</Label>
            <select className={inputClass} value={stateCode} onChange={(e) => setStateCode(e.target.value)}>
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
              Test centers — {state?.name}
            </h2>
            <p className="text-sm text-slate-500">
              Search test centers on the official vendor site — availability changes daily.
            </p>
          </div>
          <PrintButton />
        </div>

        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
          <p>
            LicenseFig does not store live test-center addresses or availability. Your exam approval letter names the
            exact vendor (Pearson VUE, PSI, Prometric, Credentia or a state-run site). Use that vendor’s official
            locator to search centers near your ZIP and book your appointment.
          </p>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {VENDOR_LOCATORS.map((v) => (
            <a
              key={v.name}
              href={v.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-slate-200 p-4 hover:border-indigo-300 hover:shadow-sm transition"
            >
              <p className="font-bold text-slate-900">{v.name} ↗</p>
              <p className="mt-1 text-xs text-slate-500">{v.note}</p>
              <p className="mt-2 text-xs font-medium text-indigo-600">Search test centers on the official site</p>
            </a>
          ))}
        </div>

        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600">
          <p className="font-semibold text-slate-700">Before you book</p>
          <ul className="mt-1 list-disc pl-5 space-y-0.5">
            <li>Use the exact vendor named on your exam approval letter — centers are vendor-specific.</li>
            <li>Appointments book out days to weeks ahead, especially in metro areas — schedule early.</li>
            <li>Bring the required ID and your approval/authorization number on exam day.</li>
            <li>Confirm the center's check-in and rescheduling policy before you pay.</li>
          </ul>
        </div>

        <Disclaimer />
      </div>
    </div>
  )
}
