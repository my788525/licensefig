'use client'

import { useMemo, useState } from 'react'
import { OCCUPATIONS } from '@/data/types'
import { PrintButton, Disclaimer, Label, inputClass } from './shared'

// General, evidence-based study methodology — NOT a promise of passing.
// References real exam structure (national portion ~80 questions for real
// estate, weighted agency/contract content, math word problems) and learning
// science (spaced repetition, retrieval practice, timed mocks).

interface Emphasis {
  themes: string[]
  math: string
  practice: string
}

const EMPHASIS: Record<string, Emphasis> = {
  'real-estate-salesperson': {
    themes: ['Agency law & fiduciary duties', 'Contracts & property ownership', 'Fair housing, finance & title'],
    math: 'Commission, proration and loan math',
    practice: 'National portion ~80 questions plus a state portion',
  },
  'real-estate-broker': {
    themes: ['Brokerage management & supervision', 'Advanced agency law', 'Real estate finance & investment'],
    math: 'Investment, commission and mortgage math',
    practice: 'Broker-level national and state portions (harder than salesperson)',
  },
  'notary-public': {
    themes: ['Notarial duties & misconduct', 'Recordkeeping & journal entries', 'Document types (acknowledgments, jurats)'],
    math: 'None — focus on fee tables and dates',
    practice: 'Single state exam; many states allow immediate retakes',
  },
  cna: {
    themes: ['Patient care & safety', 'Infection control & communication', 'Legal & ethical behavior'],
    math: 'None — prioritize hands-on skills',
    practice: 'Written portion + clinical skills check (handwashing, vital signs, transfers)',
  },
  'insurance-agent-pc': {
    themes: ['Auto, home & commercial property', 'Liability basics & policy structure', 'State regulations & forms'],
    math: 'Basic premium calculations',
    practice: 'One national portion plus a state portion for most states',
  },
  'insurance-agent-lh': {
    themes: ['Life products & annuities', 'Health insurance & Medicare basics', 'Suitability & replacement rules'],
    math: 'Premium and benefit math',
    practice: 'National and state portions; annuity suitability is heavily tested',
  },
  'real-estate-appraiser': {
    themes: ['Approaches to value (sales comparison, cost, income)', 'USPAP standards & ethics', 'Report writing'],
    math: 'Area, adjustments and capitalization rate math',
    practice: 'Appraiser exam with math-heavy questions',
  },
  cosmetologist: {
    themes: ['Hair cutting & chemical services', 'Sanitation & infection control', 'Skin & nail care'],
    math: 'None — prioritize practical skills',
    practice: 'Written theory + practical demonstration at a state board',
  },
  barber: {
    themes: ['Haircutting & shaving services', 'Sanitation & infection control', 'State board laws'],
    math: 'None — prioritize practical skills',
    practice: 'Written theory + practical demonstration',
  },
  'nail-technician': {
    themes: ['Manicure & pedicure procedures', 'Sanitation & infection control', 'State board laws'],
    math: 'None — prioritize practical skills',
    practice: 'Written theory + practical demonstration',
  },
  esthetician: {
    themes: ['Skin analysis & facials', 'Waxing & hair removal', 'Sanitation & infection control'],
    math: 'None — prioritize practical skills',
    practice: 'Written theory + practical demonstration',
  },
  'massage-therapist': {
    themes: ['Anatomy & physiology', 'Massage techniques & draping', 'Ethics, contraindications & MBLEx content'],
    math: 'None — memorize anatomy terminology',
    practice: 'MBLEx computer-based exam (100 scored questions) in most states',
  },
  'home-inspector': {
    themes: ['Structural systems & exteriors', 'Electrical, plumbing & roofing basics', 'Report writing & standards of practice'],
    math: 'Slope, area and ventilation calculations',
    practice: 'National Home Inspector Exam plus state rules where required',
  },
  'pest-control-applicator': {
    themes: ['Pest identification & biology', 'Pesticide safety & label reading', 'Application methods & regulations'],
    math: 'Mixing ratios and dosage calculations',
    practice: 'Category-specific exams (general + structural/AG etc.)',
  },
  'security-guard': {
    themes: ['Observation & report writing', 'Legal authorities & use of force', 'Emergency response basics'],
    math: 'None — memorize state-specific hours',
    practice: 'Short state exam; many states have no exam at all',
  },
}

const FALLBACK_EMPHASIS: Emphasis = {
  themes: ['Core content from the vendor syllabus', 'State laws & regulations', 'Practice questions & weak areas'],
  math: 'Any calculations included in the exam blueprint',
  practice: 'Vendor practice exams that mirror the real format',
}

interface WeekPlan {
  week: number
  phase: string
  days: string[]
}

function phaseForWeek(index: number, total: number): 'national' | 'state' | 'practice' | 'sprint' {
  const ratio = (index + 1) / total
  if (ratio <= 0.35) return 'national'
  if (ratio <= 0.6) return 'state'
  if (ratio <= 0.85) return 'practice'
  return 'sprint'
}

function buildPlan(totalWeeks: number): WeekPlan[] {
  return Array.from({ length: totalWeeks }, (_, i) => {
    const phase = phaseForWeek(i, totalWeeks)
    const days =
      phase === 'national'
        ? [
            'Mon: Content block 1 — new topic',
            'Tue: Content block 2 — new topic',
            'Wed: Math drills + flashcards for block 1',
            'Thu: Content block 3 — new topic',
            'Fri: 20–30 practice questions on this week’s topics',
            'Sat: Review wrong answers, rewrite notes',
            'Sun: Rest / light flashcards',
          ]
        : phase === 'state'
          ? [
              'Mon: State law block 1',
              'Tue: State law block 2',
              'Wed: State-specific practice questions + flashcards',
              'Thu: State law block 3 + vendor/registration rules',
              'Fri: Mixed 30-question timed quiz',
              'Sat: Review weak areas from the week',
              'Sun: Rest',
            ]
          : phase === 'practice'
            ? [
                'Mon: Timed 50-question mixed set',
                'Tue: Review errors — 10 questions on each weak topic',
                'Wed: Math / scenario drills',
                'Thu: Timed 50-question mixed set',
                'Fri: Review errors + flashcards',
                'Sat: 100-question untimed mock',
                'Sun: Rest',
              ]
            : [
                'Mon: Full-length timed mock exam',
                'Tue: Review every wrong answer, rewrite notes',
                'Wed: Second full-length timed mock (if time allows)',
                'Thu: Light review — flashcards, formulas, state rules',
                'Fri: Logistics — test center, ID, fees; sleep early',
                'Sat: Exam day (or light review if not scheduled)',
                'Sun: Rest',
              ]
    return { week: i + 1, phase, days }
  })
}

export default function StudyPlanGenerator() {
  const [occupationId, setOccupationId] = useState(OCCUPATIONS[0].id)
  const [examDate, setExamDate] = useState('')
  const [dailyHours, setDailyHours] = useState(2)

  const occupation = useMemo(() => OCCUPATIONS.find((o) => o.id === occupationId), [occupationId])
  const emphasis = EMPHASIS[occupationId] ?? FALLBACK_EMPHASIS

  const plan = useMemo(() => {
    if (!examDate) return null
    const exam = new Date(`${examDate}T12:00:00`)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const days = Math.ceil((exam.getTime() - today.getTime()) / 86400000)
    if (days <= 0) return { invalid: true, weeks: 0 }
    const weeks = Math.max(1, Math.ceil(days / 7))
    return { invalid: false, weeks, days, plan: buildPlan(weeks) }
  }, [examDate])

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
            <Label>Exam date</Label>
            <input type="date" className={inputClass} value={examDate} onChange={(e) => setExamDate(e.target.value)} />
          </div>
          <div>
            <Label>Available study hours per day</Label>
            <input
              type="number"
              min={0.5}
              max={12}
              step={0.5}
              className={inputClass}
              value={dailyHours}
              onChange={(e) => setDailyHours(Number(e.target.value))}
            />
          </div>
        </div>
      </div>

      <div className="report-area mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm print:shadow-none">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {occupation?.name} — {plan?.invalid ? 'Exam date in the past' : plan ? `${plan.weeks}-week study plan` : 'Study plan'}
            </h2>
            <p className="text-sm text-slate-500">
              {plan && !plan.invalid
                ? `${plan.days} days out · ${dailyHours * 7} hours per week`
                : 'Pick an exam date to generate a countdown plan.'}
            </p>
          </div>
          <PrintButton />
        </div>

        {!plan || plan.invalid ? (
          <p className="mt-4 text-sm text-slate-500">
            {plan?.invalid
              ? 'The exam date must be in the future.'
              : 'Choose an exam date to generate a week-by-week countdown plan.'}
          </p>
        ) : (
          <div className="mt-4">
            <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-4 text-sm text-indigo-900">
              <p className="font-semibold">Your exam focus</p>
              <ul className="mt-1 list-disc pl-5 space-y-0.5">
                {emphasis.themes.map((t) => (
                  <li key={t}>{t}</li>
                ))}
                <li>Math practice: {emphasis.math}</li>
                <li>Practice: {emphasis.practice}</li>
              </ul>
              <p className="mt-2 text-xs text-indigo-600">
                Spaced repetition + retrieval practice (quizzes and mocks) beats re-reading. Study in blocks of
                45–90 minutes with short breaks.
              </p>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {plan.plan?.map((w) => (
                <div key={w.week} className="rounded-xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900">Week {w.week}</h3>
                    <span
                      className={
                        'rounded-full px-2.5 py-0.5 text-[11px] font-semibold ' +
                        (w.phase === 'national'
                          ? 'bg-indigo-100 text-indigo-700'
                          : w.phase === 'state'
                            ? 'bg-violet-100 text-violet-700'
                            : w.phase === 'practice'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-rose-100 text-rose-700')
                      }
                    >
                      {w.phase === 'national' ? 'National core' : w.phase === 'state' ? 'State content' : w.phase === 'practice' ? 'Practice & mocks' : 'Final sprint'}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    {Math.round(dailyHours * 7)} hours this week · ~{Math.round(dailyHours * 7 * 0.5)} hours study, ~
                    {Math.round(dailyHours * 7 * 0.3)} hours practice, rest review
                  </p>
                  <ul className="mt-2 space-y-1 text-xs text-slate-600">
                    {w.days.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600">
              <p className="font-semibold text-slate-700">Methodology notes</p>
              <ul className="mt-1 list-disc pl-5 space-y-0.5">
                <li>National content first — most exams weight it heavily (e.g. real estate national portion ~80 scored questions, agency & contracts are the highest-weight topics).</li>
                <li>State content second — state-specific law is usually the easiest points to gain and the easiest to lose.</li>
                <li>Do math every week — commission, proration, premium or dosage questions appear in most licensing exams.</li>
                <li>Take at least two full-length timed mocks before exam day to build stamina and timing.</li>
                <li>This is a study method, not a passing guarantee — verify your exam outline with the vendor and state board.</li>
              </ul>
            </div>
          </div>
        )}

        <Disclaimer />
      </div>
    </div>
  )
}
