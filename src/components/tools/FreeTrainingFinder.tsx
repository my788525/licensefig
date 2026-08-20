'use client'

import { useState } from 'react'
import { STATES } from '@/data/types'
import PrintButton from './PrintButton'

// CNA-only tool. Explains the real, widely available paths to free CNA
// training: employer-sponsored programs (nursing homes / hospitals pay for
// training in exchange for a work commitment) and state workforce programs.
// We do NOT list specific employers — instead we point to the official
// channels where a candidate can find current openings.
const NATIONAL_RESOURCES = [
  {
    name: 'CareerOneStop (U.S. Department of Labor)',
    url: 'https://www.careeronestop.org',
    note: 'Free tool to find training programs, apprenticeships and local American Job Centers in your state.',
  },
  {
    name: 'American Health Care Association (AHCA)',
    url: 'https://www.ahcancal.org',
    note: 'The national trade group for skilled nursing and assisted living centers — many of its members sponsor paid CNA training.',
  },
  {
    name: 'Medicare (CMS)',
    url: 'https://www.medicare.gov',
    note: 'Nursing homes that take Medicare must use trained nurse aides; check facility care quality and contact information here.',
  },
]

export default function FreeTrainingFinder() {
  const [stateCode, setStateCode] = useState('CA')
  const st = STATES.find((s) => s.code === stateCode) ?? STATES[0]

  return (
    <div>
      <div className="no-print mb-6">
        <label className="block text-sm font-medium text-slate-700">
          State
          <select
            value={stateCode}
            onChange={(e) => setStateCode(e.target.value)}
            className="mt-1 w-full sm:w-80 block rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none"
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
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">LicenseFig · CNA Training Cost Finder</p>
          <h2 className="text-xl font-bold text-slate-900 mt-1">Free CNA training paths — {st.name}</h2>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed mb-6">
          CNA certification is one of the cheapest healthcare licenses to start, and in many states you can get the
          training paid for. In {st.name}, three real paths exist — none of them are “gimmicks,” but each one
          requires you to verify the current details with the official source listed below.
        </p>

        {/* Path 1 */}
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-5 mb-4">
          <h3 className="font-bold text-slate-900 text-sm">1 · Employer-sponsored training (the most common free path)</h3>
          <p className="text-sm text-slate-700 mt-2 leading-relaxed">
            Many skilled-nursing facilities (nursing homes) and some hospitals offer <strong>free CNA training</strong>{' '}
            as a recruiting tool. The usual deal: the employer pays your tuition and your exam fee, and you agree to
            work for them <strong>6–12 months</strong> as a certified nurse aide. Some programs even pay you a
            training wage while you study.
          </p>
          <p className="text-sm text-slate-700 mt-2 leading-relaxed">
            In {st.name}, call or visit the HR department of 3–5 Medicare-certified nursing homes or hospitals in your
            area and ask directly: <em>“Do you sponsor paid nurse aide training with a work commitment?”</em> Facility
            contact info is public on Medicare.gov.
          </p>
        </div>

        {/* Path 2 */}
        <div className="rounded-xl bg-indigo-50 border border-indigo-200 p-5 mb-4">
          <h3 className="font-bold text-slate-900 text-sm">2 · State workforce programs</h3>
          <p className="text-sm text-slate-700 mt-2 leading-relaxed">
            {st.name}&apos;s workforce development agency and the local American Job Center sometimes pay for CNA
            training when the area has a nurse-aide shortage. Ask about <strong>Individual Training Accounts (ITAs)</strong>{' '}
            or similar tuition assistance — funding comes and goes, so check the current program year.
          </p>
          <p className="text-sm text-slate-700 mt-2 leading-relaxed">
            Start at <a className="text-indigo-600 hover:underline font-medium" href="https://www.careeronestop.org" target="_blank" rel="noopener noreferrer">careeronestop.org</a>{' '}
            and search for the American Job Center nearest you in {st.name}.
          </p>
        </div>

        {/* Path 3 */}
        <div className="rounded-xl bg-amber-50 border border-amber-200 p-5 mb-6">
          <h3 className="font-bold text-slate-900 text-sm">3 · Medicaid / state training-subsidy programs</h3>
          <p className="text-sm text-slate-700 mt-2 leading-relaxed">
            A number of states fund nurse-aide training through Medicaid workforce initiatives or community-college
            scholarships, especially for long-term-care jobs. Contact the <strong>{st.name} nurse aide registry</strong>{' '}
            and the state community-college system for current grants. Search:
          </p>
          <p className="text-sm text-slate-500 mt-1">
            “{st.name} nurse aide training grant” · “{st.name} community college CNA scholarship”
          </p>
        </div>

        {/* Official channels */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 mb-6">
          <h3 className="font-bold text-slate-900 text-sm">Where to verify — official channels</h3>
          <ul className="text-sm text-slate-700 mt-2 space-y-2">
            <li>
              <strong>{st.name} nurse aide registry</strong> — confirms which training programs are approved and how to
              take the certification exam. (Search: “{st.name} nurse aide registry”.)
            </li>
            <li>
              <strong>{st.name} workforce development agency</strong> — the state office that funds training programs.
            </li>
            <li>
              <strong>Facilities themselves</strong> — nursing homes and hospitals are the ones who actually sponsor the
              training, so ask them directly.
            </li>
          </ul>
        </div>

        <h3 className="font-bold text-slate-900 text-sm mb-2">National resources</h3>
        <div className="space-y-3 mb-6">
          {NATIONAL_RESOURCES.map((r) => (
            <div key={r.url} className="text-sm border-l-2 border-indigo-200 pl-3">
              <a className="font-semibold text-indigo-600 hover:underline" href={r.url} target="_blank" rel="noopener noreferrer">
                {r.name}
              </a>
              <p className="text-slate-600 text-xs mt-0.5">{r.note}</p>
            </div>
          ))}
        </div>

        <p className="text-xs text-slate-500 border-t border-slate-100 pt-4">
          Program availability, funding and employer offers change constantly. This guide describes real public paths
          that exist in most states — it does not list specific employers. Always confirm the current program details
          and the work commitment with the official source above and with your state nurse aide registry before you
          enroll.
        </p>
      </div>

      <div className="no-print mt-4">
        <PrintButton label="Print / Save this guide" />
      </div>
    </div>
  )
}
