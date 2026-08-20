'use client'

import { useState } from 'react'
import { OCCUPATIONS } from '@/data/types'
import PrintButton from './PrintButton'

interface SheetSection {
  heading: string
  rows: { k: string; v: string }[]
}

interface Sheet {
  occupationNote: string
  sections: SheetSection[]
}

// General educational content. The real-estate math formulas are standard
// industry formulas used in state exams; clinical values are standard adult
// reference ranges taught in nurse aide training.
const SHEETS: Record<string, Sheet> = {
  'real-estate-salesperson': {
    occupationNote: 'Real estate math formulas are industry-standard and appear on state exams in a similar form everywhere.',
    sections: [
      {
        heading: 'Commission math',
        rows: [
          { k: 'Commission', v: 'Commission = Sale Price × Commission Rate' },
          { k: 'Rate', v: 'Rate = Commission ÷ Sale Price' },
          { k: 'Example', v: '$300,000 × 3% = $9,000' },
          { k: 'Split', v: 'Agent’s share = Commission × Agent’s split %' },
        ],
      },
      {
        heading: 'Financing',
        rows: [
          { k: 'Loan-to-value (LTV)', v: 'LTV % = Loan Amount ÷ Appraised Value' },
          { k: 'Example', v: '$200,000 loan ÷ $250,000 value = 80%' },
          { k: 'Annual interest', v: 'Annual Interest = Principal × Annual Rate' },
          { k: 'Monthly interest', v: 'Monthly = (Principal × Rate) ÷ 12' },
        ],
      },
      {
        heading: 'Area & conversions',
        rows: [
          { k: '1 acre', v: '43,560 square feet' },
          { k: '1 square mile', v: '640 acres' },
          { k: 'Price per square foot', v: 'Price ÷ Total Square Feet' },
          { k: 'Acres', v: 'Square Feet ÷ 43,560' },
        ],
      },
      {
        heading: 'Proration & percentages',
        rows: [
          { k: 'Percentage', v: 'Part = Total × Rate  ·  Rate = Part ÷ Total' },
          { k: 'Daily proration', v: 'Daily Amount = Annual Amount ÷ 365' },
          { k: 'Prorated total', v: 'Daily Amount × Days in the period' },
          { k: 'Rule of thumb', v: 'Convert every unit to a common unit before multiplying' },
        ],
      },
    ],
  },
  'real-estate-broker': {
    occupationNote: 'Broker candidates need the same math as salespersons plus basic business-finance figures.',
    sections: [
      {
        heading: 'Core formulas',
        rows: [
          { k: 'Commission', v: 'Commission = Sale Price × Rate' },
          { k: 'LTV', v: 'LTV % = Loan ÷ Appraised Value' },
          { k: 'Annual interest', v: 'Principal × Rate' },
          { k: 'Acres', v: 'Square Feet ÷ 43,560' },
        ],
      },
      {
        heading: 'Business & income',
        rows: [
          { k: 'Cap rate', v: 'Cap Rate = Net Operating Income ÷ Value' },
          { k: 'Gross rent multiplier', v: 'GRM = Price ÷ Monthly Gross Rent' },
          { k: 'Net income', v: 'NOI = Gross Income − Vacancy − Operating Expenses' },
          { k: 'Breakeven', v: 'Fixed Costs ÷ (Price − Variable Cost) = Units' },
        ],
      },
    ],
  },
  'real-estate-appraiser': {
    occupationNote: 'Appraisal math centers on adjustments, area and the three approaches to value.',
    sections: [
      {
        heading: 'Adjustments & area',
        rows: [
          { k: 'Adjustment', v: 'Comparable with a feature the subject lacks → subtract its value (and vice versa)' },
          { k: '1 acre', v: '43,560 square feet' },
          { k: 'Price per sq ft', v: 'Price ÷ Square Feet' },
          { k: 'Comparable range', v: 'Value = adjusted comparable prices, weighted by reliability' },
        ],
      },
      {
        heading: 'Income approach',
        rows: [
          { k: 'Net operating income', v: 'NOI = EGI − Operating Expenses' },
          { k: 'Cap rate', v: 'Cap = NOI ÷ Value  ·  Value = NOI ÷ Cap' },
          { k: 'Gross income multiplier', v: 'GIM = Price ÷ Gross Annual Income' },
        ],
      },
      {
        heading: 'Cost approach',
        rows: [
          { k: 'Value', v: 'Cost New − Depreciation + Land Value' },
          { k: 'Depreciation', v: 'Age-Life Method: (Age ÷ Total Economic Life) × Cost' },
        ],
      },
    ],
  },
  cna: {
    occupationNote: 'Normal adult ranges and infection-control rules below are standard curriculum for nurse aide training.',
    sections: [
      {
        heading: 'Adult vital signs — normal ranges',
        rows: [
          { k: 'Temperature (oral)', v: '97.8–99.1°F (36.5–37.3°C)' },
          { k: 'Pulse', v: '60–100 beats per minute' },
          { k: 'Respiration', v: '12–20 breaths per minute' },
          { k: 'Blood pressure', v: 'Systolic < 120 / Diastolic < 80 (normal)' },
          { k: 'Oxygen saturation', v: '95–100% on room air' },
        ],
      },
      {
        heading: 'Infection control — quick table',
        rows: [
          { k: 'Standard precautions', v: 'Used for ALL patients — blood, body fluids, mucous membranes' },
          { k: 'Hand hygiene', v: 'The #1 way to stop infection spread — before & after every patient' },
          { k: 'PPE order (donning)', v: 'Gown → Mask → Gloves (gloves last)' },
          { k: 'PPE removal', v: 'Gloves → Gown → Mask → Wash hands' },
          { k: 'Pressure injury prevention', v: 'Reposition at least every 2 hours' },
        ],
      },
      {
        heading: 'Key numbers to memorize',
        rows: [
          { k: 'Hip fracture risk', v: 'Highest with falls — keep beds low, wheels locked' },
          { k: 'Call light', v: 'Always within reach of the resident' },
          { k: 'Hearing aid batteries', v: 'Store dry, away from heat and moisture' },
        ],
      },
    ],
  },
  'insurance-agent-pc': {
    occupationNote: 'P&C candidates use a handful of simple formulas for premiums, ACV and coinsurance.',
    sections: [
      {
        heading: 'Money math',
        rows: [
          { k: 'Annual premium', v: 'Monthly Premium × 12' },
          { k: 'Commission', v: 'Premium × Commission Rate' },
          { k: 'Rate per $1,000', v: 'Premium = Coverage ($000s) × Rate per $1,000' },
        ],
      },
      {
        heading: 'Key property concepts',
        rows: [
          { k: 'Actual cash value (ACV)', v: 'Replacement Cost − Depreciation' },
          { k: 'Coinsurance', v: 'Insure to ≥ the stated % (often 80%) of value or face a partial-loss penalty' },
          { k: 'Coinsurance formula', v: '(Coverage Carried ÷ Coverage Required) × Loss − Deductible = Payment' },
          { k: 'Deductible', v: 'The amount the insured pays first; higher deductible → lower premium' },
        ],
      },
    ],
  },
  'insurance-agent-lh': {
    occupationNote: 'L&H candidates need policy math and the basics of premium, riders and cash value.',
    sections: [
      {
        heading: 'Policy math',
        rows: [
          { k: 'Annual premium', v: 'Face Amount × Rate per $1,000' },
          { k: 'Commission', v: 'First-year premium × Commission Rate' },
          { k: 'Cash value', v: 'Built over time on whole/universal life — not on term' },
        ],
      },
      {
        heading: 'Key concepts',
        rows: [
          { k: 'Term life', v: 'Pure protection for a set period — no cash value' },
          { k: 'Whole life', v: 'Level premium + cash value for life' },
          { k: 'Insurable interest', v: 'You must suffer a financial loss if the insured dies' },
          { k: 'Grace period', v: 'Usually 30–31 days to pay a late premium' },
        ],
      },
    ],
  },
  cosmetologist: {
    occupationNote: 'Beauty boards test infection control and product knowledge more than math.',
    sections: [
      {
        heading: 'Infection-control hierarchy',
        rows: [
          { k: 'Sanitize', v: 'Reduces the number of germs on the skin' },
          { k: 'Disinfect', v: 'Destroys most disease-causing microorganisms on surfaces' },
          { k: 'Sterilize', v: 'Destroys ALL microbial life — for implements that pierce skin' },
          { k: 'EPA-registered', v: 'Disinfectants must be EPA-registered hospital grade for surfaces' },
        ],
      },
      {
        heading: 'Key facts',
        rows: [
          { k: 'Skin pH', v: 'About 4.5–5.5 (acid mantle)' },
          { k: 'Metal implements', v: 'Clean then disinfect with an EPA-registered solution after each client' },
          { k: 'Porous items', v: 'Cannot be reliably disinfected → single-use or discard' },
          { k: 'Blood exposure', v: 'Stop service, follow bloodborne-pathogen protocol' },
        ],
      },
    ],
  },
  barber: {
    occupationNote: 'Barber boards emphasize sanitation of tools and the disinfection hierarchy.',
    sections: [
      {
        heading: 'Sanitation quick card',
        rows: [
          { k: 'Combs & brushes', v: 'Wash, then disinfect after each client' },
          { k: 'Clippers & metal implements', v: 'Clean, then disinfect with EPA-registered solution' },
          { k: 'Blades & razors', v: 'Single-use only — never reused' },
          { k: 'Disinfection hierarchy', v: 'Sanitize < Disinfect < Sterilize' },
        ],
      },
    ],
  },
  'nail-technician': {
    occupationNote: 'Nail techs must know which implements get disinfected vs sterilized.',
    sections: [
      {
        heading: 'Implement care',
        rows: [
          { k: 'Cuticle pushers / metal tools', v: 'Disinfect after each client; sterilize tools that can break skin' },
          { k: 'Nippers', v: 'EPA-registered disinfection between clients' },
          { k: 'Files & buffers', v: 'Single-use disposable or disinfect if non-porous' },
          { k: 'Porous foot-spa parts', v: 'Clean and disinfect per state rule after each client' },
        ],
      },
    ],
  },
  esthetician: {
    occupationNote: 'Esthetics boards focus on skin science, product pH and disinfection.',
    sections: [
      {
        heading: 'Skin science quick card',
        rows: [
          { k: 'Skin pH', v: '4.5–5.5' },
          { k: 'Hydration', v: 'Water keeps the barrier intact; damaged barrier = irritation' },
          { k: 'Product pH', v: 'Match near skin pH unless the treatment needs acid (e.g., chemical exfoliation)' },
          { k: 'Sterilization', v: 'Tools that break the skin must be sterilized or single-use' },
        ],
      },
    ],
  },
  'massage-therapist': {
    occupationNote: 'Massage licensing emphasizes contraindications and professional standards.',
    sections: [
      {
        heading: 'Contraindications — when NOT to massage',
        rows: [
          { k: 'Deep-vein thrombosis (DVT)', v: 'Avoid the area entirely — risk of clot movement' },
          { k: 'Fever / acute infection', v: 'Reschedule' },
          { k: 'Open wounds / recent fracture', v: 'Avoid the site' },
          { k: 'Contagious skin conditions', v: 'Reschedule to protect you and the client' },
        ],
      },
      {
        heading: 'Professional standards',
        rows: [
          { k: 'Draping', v: 'Only the treated area is exposed' },
          { k: 'Intake', v: 'Health history before every first session' },
          { k: 'Consent', v: 'Verbal consent for each session and pressure level' },
          { k: 'Resting HR', v: '60–100 bpm is normal adult range' },
        ],
      },
    ],
  },
  'notary-public': {
    occupationNote: 'Notary work is rule-based — these are the standard duties taught in every state course.',
    sections: [
      {
        heading: 'Core rules',
        rows: [
          { k: 'Identity', v: 'Current government-issued photo ID (or credible witnesses where allowed)' },
          { k: 'Willingness', v: 'Signer must appear freely and understand the act' },
          { k: 'Own documents', v: 'Never notarize your own signature or a document where you benefit' },
          { k: 'Journal', v: 'Record every notarization — most states require it' },
        ],
      },
      {
        heading: 'Acknowledgment vs jurat',
        rows: [
          { k: 'Acknowledgment', v: 'Signer appears and admits signing voluntarily' },
          { k: 'Jurat', v: 'Signer signs in your presence and swears/affirms the content is true' },
        ],
      },
    ],
  },
  'home-inspector': {
    occupationNote: 'Inspectors memorize inspection scope rules and what to flag.',
    sections: [
      {
        heading: 'Scope quick card',
        rows: [
          { k: 'Visual only', v: 'No moving furniture, no tearing walls, no invasive testing' },
          { k: 'Report', v: 'Visible conditions with professional judgment — not a pass/fail grade' },
          { k: 'Pre-inspection agreement', v: 'Defines scope before you start' },
          { k: 'Referrals', v: 'Engineers, roofers, electricians for anything beyond your expertise' },
        ],
      },
      {
        heading: 'Common flags',
        rows: [
          { k: 'GFCI', v: 'Required in wet areas (kitchen, bath, outdoors)' },
          { k: 'Water stains', v: 'Possible active or past leaks — flag for evaluation' },
          { k: 'Radon', v: 'Odorless gas; testing recommended' },
        ],
      },
    ],
  },
  'pest-control-applicator': {
    occupationNote: 'Pest control is regulation-heavy — the label drives every decision.',
    sections: [
      {
        heading: 'Label basics',
        rows: [
          { k: 'Label is the law', v: 'Mixing, rate, target pest and PPE all come from the label' },
          { k: 'Restricted use', v: 'Requires certified applicator + permits' },
          { k: 'PPE', v: 'Wear exactly what the label specifies' },
          { k: 'Records', v: 'Keep application records — your state requires them' },
        ],
      },
      {
        heading: 'Quick reference',
        rows: [
          { k: 'Identify first', v: 'Correct pest ID drives product, placement and rate' },
          { k: 'Drift', v: 'You are responsible for preventing off-target drift' },
          { k: 'IPM', v: 'Sanitation + exclusion + targeted products beat blanket spraying' },
        ],
      },
    ],
  },
  'security-guard': {
    occupationNote: 'Guard cards test observation, reporting and use-of-force basics.',
    sections: [
      {
        heading: 'Duties quick card',
        rows: [
          { k: 'Role', v: 'Deter, observe and report — never escalate' },
          { k: 'Use of force', v: 'Reasonable force for self-defense only' },
          { k: 'Reports', v: 'Facts + times + descriptions + actions — no opinions' },
          { k: 'Access control', v: 'Verify visitors, check ID, log entry' },
        ],
      },
      {
        heading: 'Emergencies',
        rows: [
          { k: 'Fire alarm', v: 'Follow the plan — guide evacuation, control access' },
          { k: 'Suspicious package', v: 'Do not touch — isolate, notify, follow protocol' },
          { k: 'Suspicious vehicle', v: 'Record plate, make, model, color, time' },
        ],
      },
    ],
  },
}

const FALLBACK_SHEET: Sheet = {
  occupationNote: 'General licensing cheat sheet — always confirm specifics with your state board.',
  sections: [
    {
      heading: 'License-road reminders',
      rows: [
        { k: 'Requirements first', v: 'Confirm age, education, background-check rules before paying anything' },
        { k: 'Exam vendor', v: 'Your state assigns the vendor (PSI, Pearson VUE, state board…)' },
        { k: 'Renewal', v: 'Mark your renewal date — most licenses renew every 1–4 years' },
        { k: 'Reciprocity', v: 'Some states accept another state’s license — ask your board' },
      ],
    },
  ],
}

export default function FormulaCheatSheet() {
  const [occupationId, setOccupationId] = useState('real-estate-salesperson')
  const occ = OCCUPATIONS.find((o) => o.id === occupationId) ?? OCCUPATIONS[0]
  const sheet = SHEETS[occ.id] ?? FALLBACK_SHEET

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
        <div className="border-b border-slate-200 pb-4 mb-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">LicenseFig · Formula & Cheat Sheet</p>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            {occ.emoji} {occ.name} — printable formula &amp; quick-reference card
          </h2>
          <p className="text-sm text-slate-500 mt-2">{sheet.occupationNote}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {sheet.sections.map((sec) => (
            <div key={sec.heading} className="rounded-xl border border-slate-200 overflow-hidden">
              <div className="bg-indigo-50 border-b border-slate-200 px-4 py-2.5 font-semibold text-slate-800 text-sm">
                {sec.heading}
              </div>
              <dl className="p-4 space-y-3">
                {sec.rows.map((r) => (
                  <div key={r.k} className="text-sm">
                    <dt className="font-semibold text-slate-700">{r.k}</dt>
                    <dd className="text-slate-600 mt-0.5 leading-relaxed">{r.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>

        <p className="text-xs text-slate-500 border-t border-slate-100 mt-6 pt-4">
          This card is general educational content for practice and planning. Real estate math formulas are
          industry-standard; clinical values are standard reference ranges. Exam content varies by state — verify
          the current outline with your state board and vendor.
        </p>
      </div>

      <div className="no-print mt-4">
        <PrintButton label="Print / Save this cheat sheet" />
      </div>
    </div>
  )
}
