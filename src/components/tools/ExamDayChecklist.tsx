'use client'

import { useState } from 'react'
import { OCCUPATIONS } from '@/data/types'
import PrintButton from './PrintButton'

interface Tip {
  title: string
  text: string
}

const GENERIC_CHECKLIST: { item: string; note: string }[] = [
  { item: 'Government-issued photo ID', note: 'Must match the name you registered under. No exceptions at most vendors.' },
  { item: 'Confirmation email / scheduling number', note: 'Bring it printed or on your phone for check-in (phone goes to your locker).' },
  { item: 'Arrive 30–45 minutes early', note: 'Late arrivals are usually turned away and you lose the fee.' },
  { item: 'Know your test center address & route', note: 'Do a dry run a few days ahead if it is a new area.' },
  { item: 'Approved calculator (if allowed)', note: 'Check the vendor policy first — some exams ban or restrict calculators.' },
  { item: 'Check phone & smartwatch rules', note: 'They stay in the locker at most centers; wearing one can void your exam.' },
  { item: 'Read the on-screen instructions', note: 'The tutorial before the exam shows how the interface works — use it.' },
  { item: 'No notes or study materials', note: 'Anything written on you or your ID is grounds for dismissal.' },
  { item: 'Dress comfortably, in layers', note: 'Test rooms are often cold; layers fix that without extra gear.' },
  { item: 'Eat and hydrate beforehand', note: 'A light meal beats an empty stomach for a 2–4 hour exam.' },
  { item: 'Plan your breaks', note: 'Some vendors let you pause the clock; confirm before you start.' },
  { item: 'Get real sleep the night before', note: 'Cramming the night before costs more than it saves.' },
]

const OCCUPATION_TIPS: Record<string, Tip[]> = {
  'real-estate-salesperson': [
    { title: 'Two timed portions', text: 'Most states split national + state sections. Pace yourself so the state portion gets enough time.' },
    { title: 'Calculator policy', text: 'PSI and Pearson VUE allow basic calculators — check their approved-device lists, and practice with the same model.' },
    { title: 'Math on paper', text: 'Scratch paper is provided. Write the formula before you compute (commission, LTV, proration).' },
  ],
  'real-estate-broker': [
    { title: 'Longer, harder exam', text: 'Broker exams cover management, finance and the same state law — budget more study time.' },
    { title: 'Calculator policy', text: 'Confirm the approved calculator list for your vendor; practice with that exact model.' },
  ],
  cna: [
    { title: 'Two parts', text: 'Written + clinical skills. You usually test both in one appointment.' },
    { title: 'Skills demonstration', text: 'You perform 3–5 randomly assigned skills. Practice them on a bed and mannequin beforehand.' },
    { title: 'Nothing to bring', text: 'Supplies and equipment are provided. Wear professional attire; no jewelry that interferes with care tasks.' },
    { title: 'Speak your steps', text: 'State each step aloud as you perform it — many candidates miss points by doing skills silently.' },
  ],
  'insurance-agent-pc': [
    { title: 'State-specific law', text: 'A large share of questions is state-specific. Review your state outline the day before.' },
    { title: 'Calculator', text: 'Simple math only — confirm whether your vendor permits a calculator.' },
  ],
  'insurance-agent-lh': [
    { title: 'Policy concepts', text: 'Term vs whole life, riders and insurable interest are heavily tested — review the definitions.' },
    { title: 'Calculator', text: 'Confirm whether your vendor permits a calculator.' },
  ],
  'real-estate-appraiser': [
    { title: 'Level matters', text: 'Trainee, licensed and certified exams differ — make sure you sit the right one.' },
    { title: 'Math focus', text: 'Adjustments and area problems dominate. Bring an approved calculator if your vendor allows it.' },
  ],
  cosmetologist: [
    { title: 'Practical component', text: 'You perform services on a mannequin or model. Check your state’s required kit and dress code.' },
    { title: 'Arrive early with your kit', text: 'Practical sessions have strict time slots; a missing tool can cost points.' },
  ],
  barber: [
    { title: 'Practical component', text: 'Check your state’s required implements and mannequin rules before the day.' },
    { title: 'Sanitation check', text: 'Disinfected tools are part of the scoring — show your sanitation routine.' },
  ],
  'nail-technician': [
    { title: 'Practical component', text: 'Manicure/pedicure services on a model or mannequin — check the kit list.' },
    { title: 'Disinfection stations', text: 'State boards observe how you handle implements; be methodical.' },
  ],
  esthetician: [
    { title: 'Practical component', text: 'Facials and skin services — verify your state’s required products and setup.' },
    { title: 'Client safety', text: 'Patch testing and sanitation are often scored in the practical.' },
  ],
  'massage-therapist': [
    { title: 'MBLEx format', text: '100 questions, 110 minutes, at Pearson VUE test centers — confirm your appointment time.' },
    { title: 'Nothing to bring', text: 'The MBLEx is computer-based with no equipment needed. Arrive with just your ID.' },
  ],
  'notary-public': [
    { title: 'No exam in most states', text: 'Most states are application + fee + oath, but a few require a short exam. Check before you plan for one.' },
    { title: 'Bringing your commission', text: 'Once commissioned, keep your seal, journal and commission certificate accessible.' },
  ],
  'home-inspector': [
    { title: 'Exam or course-based', text: 'Some states require the National Home Inspector Exam; others certify by training hours. Confirm your route.' },
    { title: 'No gear needed', text: 'The exam is multiple-choice and computer-based — bring only your ID and confirmation.' },
  ],
  'pest-control-applicator': [
    { title: 'Category-based exam', text: 'Questions follow your certification category (household, termite, etc.). Study your category outline.' },
    { title: 'Label law', text: 'Label-based questions are common — review rates, PPE and signal words.' },
  ],
  'security-guard': [
    { title: 'Training-based', text: 'Many states require a course and no exam; some add a test. Confirm your state’s format.' },
    { title: 'Bring course certificate', text: 'If you completed a training course, bring the certificate in case the state asks for it.' },
  ],
}

export default function ExamDayChecklist() {
  const [occupationId, setOccupationId] = useState('cna')
  const occ = OCCUPATIONS.find((o) => o.id === occupationId) ?? OCCUPATIONS[0]
  const tips = OCCUPATION_TIPS[occ.id] ?? []
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div>
      <div className="no-print mb-6">
        <label className="block text-sm font-medium text-slate-700">
          Career
          <select
            value={occupationId}
            onChange={(e) => setOccupationId(e.target.value)}
            className="mt-1 w-full sm:w-80 block rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none"
          >
            {OCCUPATIONS.map((o) => (
              <option key={o.id} value={o.id}>
                {o.emoji} {o.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="report-area rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <div className="border-b border-slate-200 pb-4 mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">LicenseFig · Exam Day Checklist</p>
            <h2 className="text-xl font-bold text-slate-900 mt-1">
              {occ.emoji} {occ.name} — exam day checklist
            </h2>
          </div>
          <p className="text-right text-xs text-slate-500">{today}</p>
        </div>

        <h3 className="font-bold text-slate-900 text-sm mb-3">Checklist for every exam</h3>
        <ul className="space-y-2 mb-6">
          {GENERIC_CHECKLIST.map((c) => (
            <li key={c.item} className="flex gap-3 items-start">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-slate-300 text-xs text-slate-400">
                ☐
              </span>
              <div className="text-sm">
                <span className="font-semibold text-slate-800">{c.item}</span>
                <span className="text-slate-500"> — {c.note}</span>
              </div>
            </li>
          ))}
        </ul>

        {tips.length > 0 && (
          <>
            <h3 className="font-bold text-slate-900 text-sm mb-3">Career-specific tips — {occ.shortName}</h3>
            <div className="grid gap-3 sm:grid-cols-2 mb-6">
              {tips.map((t) => (
                <div key={t.title} className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-4">
                  <p className="font-semibold text-slate-800 text-sm">{t.title}</p>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">{t.text}</p>
                </div>
              ))}
            </div>
          </>
        )}

        <p className="text-xs text-slate-500 border-t border-slate-100 pt-4">
          Rules, ID policies and practical-exam requirements vary by state and vendor — verify the details in your
          confirmation email and with your state board before exam day.
        </p>
      </div>

      <div className="no-print mt-4">
        <PrintButton label="Print / Save this checklist" />
      </div>
    </div>
  )
}
