'use client'

import { useEffect, useMemo, useState } from 'react'
import { OCCUPATIONS, STATES, getOccupation } from '@/data/types'
import { getRequirement } from '@/data/requirements'
import { stateFromZip } from '@/lib/zip-states'

const DEFAULT_OCCUPATION = 'real-estate-salesperson'
const DEFAULT_STATE = 'CA'
const ZIP_RE = /^\d{5}$/

/**
 * LicenseJourneyWizard — the full license lifecycle planner.
 * Pick a career + state (or ZIP), get a printable end-to-end roadmap:
 * eligibility → education → background check → exam → issuance → renewal/CE → advancement.
 * Each stage shows real data where verified and embeds the matching tool.
 * Time estimates are planning estimates, labeled as such.
 */

interface Stage {
  key: string
  title: string
  detail: string
  weeks?: string // estimated range
  tool?: { href: string; label: string }
}

const STUDY_HOURS_PER_WEEK = 20 // planning assumption

export default function LicenseJourneyWizard() {
  const [occupationId, setOccupationId] = useState(DEFAULT_OCCUPATION)
  const [stateCode, setStateCode] = useState(DEFAULT_STATE)
  const [zip, setZip] = useState('')
  const [copied, setCopied] = useState(false)

  // Initialize from URL params on mount (?career=&state=&zip=) so the planner
  // is shareable and bookmarkable. Invalid values fall back to defaults.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const career = params.get('career')
    if (career && getOccupation(career)) setOccupationId(career)
    const state = params.get('state')
    if (state && STATES.some((s) => s.code === state)) setStateCode(state)
    const zipParam = params.get('zip')
    if (zipParam && ZIP_RE.test(zipParam)) setZip(zipParam)
  }, [])

  // Keep the URL in sync with user changes (replaceState — no history spam).
  useEffect(() => {
    const params = new URLSearchParams()
    params.set('career', occupationId)
    params.set('state', stateCode)
    if (ZIP_RE.test(zip)) params.set('zip', zip)
    window.history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`)
  }, [occupationId, stateCode, zip])

  const copyLink = async () => {
    const url = window.location.href
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
    } catch {
      window.prompt('Copy this link:', url)
    } finally {
      window.setTimeout(() => setCopied(false), 2000)
    }
  }

  const occ = getOccupation(occupationId) ?? OCCUPATIONS[0]
  const st = STATES.find((s) => s.code === stateCode)

  const applyZip = () => {
    const s = stateFromZip(zip)
    if (s) setStateCode(s)
  }

  const d = useMemo(() => getRequirement(occ.id, stateCode), [occ.id, stateCode])

  const eduWeeks = d?.educationHours != null ? Math.max(2, Math.ceil(d.educationHours / STUDY_HOURS_PER_WEEK)) : null

  const stages: Stage[] = [
    {
      key: 'eligibility',
      title: '1 · Confirm eligibility',
      detail: [
        d?.ageMinimum != null ? `Minimum age: ${d.ageMinimum}.` : 'Age minimum not published here.',
        d?.backgroundCheck ? 'A criminal background check is required.' : 'Background check rules vary by state.',
        d?.educationLevel ? `Education: ${d.educationLevel}.` : '',
      ].filter(Boolean).join(' '),
      weeks: '1 week',
      tool: { href: '/tools/requirements-lookup/', label: 'Requirements lookup' },
    },
    {
      key: 'education',
      title: '2 · Pre-license education',
      detail: d?.educationHours != null
        ? `${d.educationHours} hours of approved training in ${st?.name ?? stateCode}${eduWeeks ? ` — roughly ${eduWeeks} weeks at ${STUDY_HOURS_PER_WEEK} hrs/week (planning estimate)` : ''}.`
        : `Required education hours are not published here — check ${d?.officialName ?? 'the state board'}.`,
      weeks: eduWeeks ? `${eduWeeks} weeks` : 'varies',
    },
    {
      key: 'exam',
      title: '3 · Register & pass the exam',
      detail: [
        d?.examVendor?.name ? `Administered by ${d.examVendor.name}.` : 'Exam vendor varies by state.',
        d?.exam?.nationalQuestions != null && d.exam.stateQuestions != null ? `${d.exam.nationalQuestions} national + ${d.exam.stateQuestions} state questions.` : '',
        d?.exam?.passingPct != null ? `Passing score ${d.exam.passingPct}%.` : '',
        d?.exam?.examFee != null ? `Exam fee $${d.exam.examFee}.` : '',
        'Most candidates study 4-12 weeks before the exam (planning estimate).',
      ].filter(Boolean).join(' '),
      weeks: '4-12 weeks',
      tool: { href: '/tools/study-plan-generator/', label: 'Study plan generator' },
    },
    {
      key: 'issuance',
      title: '4 · Pay fees & receive license',
      detail: [
        d?.applicationFee != null ? `Application fee $${d.applicationFee}.` : '',
        d?.licenseFee != null ? `License fee $${d.licenseFee}.` : '',
        'Issuance timelines vary from days to weeks depending on the state.',
      ].filter(Boolean).join(' '),
      weeks: '1-4 weeks',
      tool: { href: '/tools/exam-cost-compare/', label: 'Cost compare' },
    },
    {
      key: 'renewal',
      title: '5 · Renew & continuing education',
      detail: d?.renewal
        ? `Renew every ${d.renewal.years} years${d.renewal.ceHours ? ` with ${d.renewal.ceHours} hours of continuing education` : ''}.`
        : 'Renewal cycle and CE vary by state — check the board.',
      weeks: 'ongoing',
      tool: { href: '/tools/ce-requirements/', label: 'CE requirements' },
    },
    {
      key: 'advance',
      title: '6 · Advancement path',
      detail: ADVANCEMENT[occ.id] ?? 'Advancement options vary by career — check your state board for next-level licenses.',
      weeks: '',
    },
  ]

  const totalWeeks = stages.reduce((acc, s) => {
    if (s.key === 'renewal' || s.key === 'advance') return acc
    const n = parseInt(s.weeks?.split('-')[0] ?? '0', 10)
    return acc + (isNaN(n) ? 0 : n)
  }, 0)

  return (
    <section className="card-rule p-6 mb-10" aria-label="License journey wizard">
      <h2 className="font-display text-xl font-bold mb-1">Plan your license journey</h2>
      <p className="text-sm text-slate-500 mb-5">
        Pick a career and state (or ZIP) to get a printable end-to-end roadmap — every stage links the
        tool that does the work. Timelines are planning estimates.
      </p>

      <div className="grid sm:grid-cols-4 gap-3 mb-6">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Career</label>
          <select
            value={occupationId}
            onChange={(e) => setOccupationId(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm outline-none focus:border-[#1b4b8f]"
          >
            {OCCUPATIONS.map((o) => (
              <option key={o.id} value={o.id}>{o.emoji} {o.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">State</label>
          <select
            value={stateCode}
            onChange={(e) => setStateCode(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm outline-none focus:border-[#1b4b8f]"
          >
            {STATES.map((s) => (
              <option key={s.code} value={s.code}>{s.code} — {s.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">ZIP (auto-detect)</label>
          <div className="flex gap-2">
            <input
              type="text"
              inputMode="numeric"
              value={zip}
              onChange={(e) => setZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
              placeholder="90210"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm outline-none focus:border-[#1b4b8f]"
            />
            <button onClick={applyZip} className="px-3 py-2 rounded-lg bg-[#0b2545] text-white text-xs font-semibold whitespace-nowrap">
              Detect
            </button>
          </div>
        </div>
        <div className="flex flex-col items-stretch gap-2">
          <button onClick={() => window.print()} className="btn-cta w-full justify-center">Print roadmap</button>
          <button
            onClick={copyLink}
            className="px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-700 hover:border-[#1b4b8f] hover:text-[#1b4b8f] whitespace-nowrap"
          >
            {copied ? 'Copied!' : 'Copy link'}
          </button>
        </div>
      </div>

      {/* Timeline summary */}
      <div className="rounded-xl p-4 mb-6" style={{ background: 'linear-gradient(135deg,#eef2f9,#f7f3e6)' }}>
        <div className="text-sm text-slate-600">
          <strong>{occ.name}</strong> in <strong>{st?.name ?? stateCode}</strong> — estimated time from start to
          licensed: <strong className="text-[#0b2545]">~{totalWeeks} weeks</strong> of active prep
          (education + study + processing; planning estimate, excludes waiting periods).
        </div>
      </div>

      {/* Stages */}
      <ol className="space-y-3 no-print-keep">
        {stages.map((s, i) => (
          <li key={s.key} className="rounded-xl border border-slate-200 p-4 flex gap-4">
            <span className="shrink-0 w-8 h-8 rounded-full text-white text-sm font-bold grid place-items-center mt-0.5" style={{ background: i < 2 ? '#1b4b8f' : i < 4 ? '#0b2545' : '#5b7aa8' }}>
              {i + 1}
            </span>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-slate-900">{s.title}</span>
                {s.weeks && <span className="source-badge">{s.weeks}</span>}
              </div>
              <p className="text-sm text-slate-600 mt-1">{s.detail}</p>
              {s.tool && (
                <a href={s.tool.href} className="inline-block mt-2 text-xs font-semibold text-[#1b4b8f] hover:underline">
                  → {s.tool.label}
                </a>
              )}
            </div>
          </li>
        ))}
      </ol>

      <p className="text-xs text-slate-400 border-t border-slate-200 pt-3 mt-4">
        Data retrieved 2026-08-20 from state boards, PSI, Pearson VUE and CMS. Timelines are planning
        estimates, not guarantees. Requirements change — verify with {d?.officialName ?? 'your state board'}.
      </p>
    </section>
  )
}

// Real, documented advancement paths (career-specific, from public licensing structures)
const ADVANCEMENT: Record<string, string> = {
  'real-estate-salesperson': 'With 1-3 years of sales experience you can qualify for the Broker license, which lets you own or manage a brokerage.',
  'real-estate-broker': 'Brokers can add a commercial/investment designation or open additional branch offices; some pursue appraiser or property-management licenses.',
  cna: 'CNAs commonly advance to LPN (1-year program) or RN (ADN/BSN) — many nursing schools give priority admission to applicants with CNA experience.',
  'insurance-agent-pc': 'Add Life & Health (L&H) lines to sell a full portfolio, or pursue CIC/CPCU designations for higher-level roles.',
  'insurance-agent-lh': 'Add Property & Casualty (P&C) lines, or pursue LUTCF/ChFC designations for advanced planning roles.',
  cosmetologist: 'Licensed cosmetologists can advance to instructor licensure, salon management, or add esthetician/barber licenses.',
  barber: 'Barbers can add an instructor license or open/own a barbershop; some add cosmetology for expanded services.',
  'nail-technician': 'Add esthetician or cosmetology licenses to expand services and earning potential.',
  esthetician: 'Advance to master esthetician or instructor status where the state offers those tiers.',
  'massage-therapist': 'Add specializations (sports, medical, prenatal) or pursue the NCBTMB board certification.',
  'notary-public': 'Some states offer a Loan Signing Agent path or notary education credentials for higher-value signing work.',
  'real-estate-appraiser': 'Progress through the licensed → certified residential → certified general levels by adding experience and education.',
  'home-inspector': 'Add specializations (radon, mold, commercial) or pursue InterNACHI certification for credibility.',
  'pest-control-applicator': 'Add categories (termite, fumigation, agricultural) or advance to a supervising/operator license.',
  'security-guard': 'Armed guard certification, then supervisor or security-manager roles; some guards advance into law enforcement.',
}
