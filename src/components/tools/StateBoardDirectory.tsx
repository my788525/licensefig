'use client'

import { useState } from 'react'
import { OCCUPATIONS, STATES } from '@/data/types'
import { getRequirement } from '@/data/requirements'
import PrintButton from './PrintButton'

// Well-known official state licensing authorities (real public links). Used as
// a starting point when our data layer has not yet loaded a row for the exact
// occupation — the UI always tells the visitor to verify the board actually
// regulates the selected occupation.
const KNOWN_BOARDS: Record<string, { name: string; url: string }> = {
  CA: { name: 'California Department of Real Estate', url: 'https://www.dre.ca.gov' },
  TX: { name: 'Texas Real Estate Commission', url: 'https://www.trec.texas.gov' },
  FL: { name: 'Florida Department of Business & Professional Regulation', url: 'https://www.myfloridalicense.com' },
  NY: { name: 'New York Department of State', url: 'https://www.dos.ny.gov' },
  AZ: { name: 'Arizona Department of Real Estate', url: 'https://azre.gov' },
  NV: { name: 'Nevada Real Estate Division', url: 'https://red.nv.gov' },
  IL: { name: 'Illinois Department of Financial & Professional Regulation', url: 'https://idfpr.illinois.gov' },
  GA: { name: 'Georgia Real Estate Commission', url: 'https://grec.state.ga.us' },
  NC: { name: 'North Carolina Real Estate Commission', url: 'https://www.ncrec.gov' },
  OH: { name: 'Ohio Department of Commerce', url: 'https://www.com.ohio.gov' },
  PA: { name: 'Pennsylvania Department of State', url: 'https://www.dos.pa.gov' },
}

const VENDOR_LINKS: Record<string, string> = {
  'PSI': 'https://www.psionline.com',
  'Pearson VUE': 'https://home.pearsonvue.com',
  'Credentia': 'https://www.credentia.com',
  'Prometric': 'https://www.prometric.com',
  'FSMTB (MBLEx)': 'https://www.fsmtb.org',
}

export default function StateBoardDirectory() {
  const [occupationId, setOccupationId] = useState('real-estate-salesperson')
  const [stateCode, setStateCode] = useState('CA')

  const occ = OCCUPATIONS.find((o) => o.id === occupationId) ?? OCCUPATIONS[0]
  const st = STATES.find((s) => s.code === stateCode) ?? STATES[0]
  const req = getRequirement(occ.id, st.code)
  const known = KNOWN_BOARDS[st.code]

  const officialName = req?.officialName ?? known?.name ?? null
  const officialUrl = req?.officialUrl ?? known?.url ?? null
  const roles = req
    ? 'The official agency that licenses, regulates and enforces practice standards for this occupation in this state.'
    : null

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
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">LicenseFig · State Board Directory</p>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            {occ.name} — {st.name} licensing authority
          </h2>
        </div>

        {officialName && officialUrl ? (
          <div className="rounded-2xl bg-indigo-50 border border-indigo-100 p-5 mb-6">
            <p className="text-sm text-slate-500">Official agency</p>
            <p className="text-lg font-bold text-slate-900 mt-0.5">{officialName}</p>
            <a
              href={officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-sm font-semibold text-indigo-600 hover:underline break-all"
            >
              {officialUrl} ↗
            </a>
            {roles && <p className="text-sm text-slate-600 mt-2 leading-relaxed">{roles}</p>}
          </div>
        ) : (
          <div className="rounded-2xl bg-amber-50 border border-amber-200 p-5 mb-6">
            <p className="text-lg font-semibold text-amber-800">Data pending — check with your state board</p>
            <p className="text-sm text-amber-700 mt-1 leading-relaxed">
              We have not loaded the official {occ.name} authority for {st.name} yet. To find it, search the state
              government portal for: <em>“{st.name} {occ.shortName} license board”</em> or <em>“{st.name} {occ.shortName} license requirements”</em>.
            </p>
          </div>
        )}

        {!req && known && (
          <p className="text-xs text-slate-500 rounded-xl border border-slate-200 bg-slate-50 p-3 mb-6">
            Shown above is {st.name}&apos;s well-known licensing authority we keep on file — it may regulate several
            occupations. Before relying on it, confirm it is the board for <strong>{occ.name}</strong> specifically.
          </p>
        )}

        <h3 className="font-bold text-slate-900 text-sm mb-3">Exam vendors for this career</h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {occ.examVendors.map((v) => {
            const url = VENDOR_LINKS[v] ?? VENDOR_LINKS[v.split(' ')[0]]
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

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 mb-6">
          <strong className="text-slate-800 block mb-1">What the board does</strong>
          State licensing boards approve education, run background checks, issue licenses, set CE rules, handle
          reciprocity and discipline licensees. Contacting the official board (not a third-party “renewal service”
          that charges a fee) is the only way to get authoritative answers.
        </div>

        <p className="text-xs text-slate-500 border-t border-slate-100 pt-4">
          Links point to official state or vendor websites. Agencies and URLs change — if a link fails, search the
          state’s official portal, and never pay a third party that claims to renew your license.
        </p>
      </div>

      <div className="no-print mt-4">
        <PrintButton label="Print / Save this directory card" />
      </div>
    </div>
  )
}
