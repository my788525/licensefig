'use client'

import { useState } from 'react'
import { OCCUPATIONS } from '@/data/types'
import PrintButton from './PrintButton'

interface Card {
  term: string
  def: string
}

// Original flashcard definitions of real industry terms, written in-house.
const DECKS: Record<string, Card[]> = {
  'real-estate-salesperson': [
    { term: 'Agency', def: 'The legal relationship in which an agent acts for a principal (the client) in a real estate transaction.' },
    { term: 'Fiduciary duty', def: 'The duty to act in the client’s best interest — including loyalty, confidentiality and full disclosure.' },
    { term: 'Proration', def: 'Splitting ongoing expenses like property taxes between buyer and seller at closing, based on days of ownership.' },
    { term: 'Loan-to-value (LTV)', def: 'Loan amount divided by appraised value, shown as a percentage — e.g., $200k ÷ $250k = 80%.' },
    { term: 'Earnest money', def: 'A good-faith deposit the buyer makes with the offer; held in escrow and credited at closing.' },
    { term: 'Contingency', def: 'A condition that must be met for the contract to stand, such as financing or a home sale.' },
    { term: 'Escrow', def: 'A neutral holding account for funds and documents during the transaction.' },
    { term: 'Dual agency', def: 'Representing both buyer and seller in one transaction — only allowed with written consent in states that permit it.' },
    { term: 'Disclosure', def: 'The seller’s legal duty to reveal known material defects that affect the property’s value or safety.' },
    { term: 'Amortization', def: 'Paying off a loan in regular installments of principal and interest over a set term.' },
    { term: 'Appraisal', def: 'A professional opinion of market value by a qualified appraiser — not a home inspection.' },
    { term: 'Commission', def: 'The fee paid to the broker, typically a percentage of the sale price, split between listing and selling sides.' },
    { term: 'Cap rate', def: 'Net operating income divided by property value — a measure of investment return on income properties.' },
    { term: 'Listing agreement', def: 'The contract authorizing a broker to market and sell a property on the owner’s behalf.' },
    { term: 'Material fact', def: 'Information that would affect a buyer’s decision or the property’s value — it must be disclosed.' },
    { term: 'Closing', def: 'The final step where ownership transfers, funds are exchanged and documents are signed and recorded.' },
  ],
  'real-estate-broker': [
    { term: 'Fiduciary duty', def: 'Acting in the client’s best interest with loyalty, care and full disclosure.' },
    { term: 'Brokerage', def: 'The business of bringing parties together in real estate transactions for a fee.' },
    { term: 'Supervision', def: 'The broker’s legal responsibility for the acts of the salespersons they employ.' },
    { term: 'Cap rate', def: 'Net operating income ÷ value — the yield an income property produces.' },
    { term: 'Trust account', def: 'A separate account holding client funds; never co-mingled with the broker’s own money.' },
    { term: 'Agency disclosure', def: 'Informing clients who you represent before confidential information is shared.' },
    { term: 'Independent contractor', def: 'A salesperson who works for a broker but is not an employee — common in real estate.' },
    { term: 'Escrow', def: 'A neutral holding arrangement for funds and documents during the transaction.' },
    { term: 'Proration', def: 'Dividing ongoing costs like taxes between parties at closing by days of ownership.' },
    { term: 'Net listing', def: 'A listing where the broker keeps everything above a set price — illegal in most states.' },
    { term: 'Option', def: 'A right to buy a property at a set price within a time period, granted for consideration.' },
    { term: 'Qualifying a buyer', def: 'Verifying a buyer’s ability to pay before showing homes or writing an offer.' },
  ],
  'real-estate-appraiser': [
    { term: 'Highest and best use', def: 'The legally permitted, physically possible, financially feasible use that gives the highest value.' },
    { term: 'Sales comparison approach', def: 'Valuing a property by adjusting recent sales of comparable properties for differences.' },
    { term: 'Cost approach', def: 'Value = cost to rebuild minus depreciation, plus land value — best for special-purpose properties.' },
    { term: 'Income approach', def: 'Value derived from the income the property produces (NOI ÷ cap rate).' },
    { term: 'USPAP', def: 'The Uniform Standards of Professional Appraisal Practice — the ethics and performance standard.' },
    { term: 'Scope of work', def: 'The type and extent of research and analysis the assignment requires.' },
    { term: 'Reconciliation', def: 'Weighing the reliability of each approach to reach a final value opinion.' },
    { term: 'Adjustment', def: 'Adding or subtracting value for differences between the subject and a comparable sale.' },
    { term: 'Gross rent multiplier', def: 'Price ÷ gross monthly rent — a quick income-property comparison tool.' },
    { term: 'Depreciation', def: 'Loss of value from physical deterioration, functional or external obsolescence.' },
    { term: 'Net operating income', def: 'Effective gross income minus operating expenses — before debt service.' },
    { term: 'Subject property', def: 'The property being appraised.' },
  ],
  'insurance-agent-pc': [
    { term: 'Peril', def: 'The actual cause of a loss — e.g., fire, wind or theft.' },
    { term: 'Hazard', def: 'A condition that increases the likelihood of a loss — e.g., a frayed electrical wire.' },
    { term: 'Deductible', def: 'The amount the insured pays first on a covered claim before the insurer pays.' },
    { term: 'Actual cash value (ACV)', def: 'Replacement cost minus depreciation — the standard auto/property settlement basis.' },
    { term: 'Coinsurance', def: 'A clause requiring coverage equal to a set % of property value to avoid a partial-loss penalty.' },
    { term: 'Insurable interest', def: 'A financial stake in the insured person or property — required for a valid policy.' },
    { term: 'Endorsement', def: 'A written change to an insurance policy that adds, removes or alters coverage.' },
    { term: 'Binder', def: 'A temporary, short-term proof of coverage before the policy is issued.' },
    { term: 'Misrepresentation', def: 'A false or incomplete material statement on an application that the insurer relied on.' },
    { term: 'Proximate cause', def: 'The dominant, efficient cause of a loss, used to decide if coverage applies.' },
    { term: 'Subrogation', def: 'The insurer’s right to pursue the party at fault to recover what it paid on a claim.' },
    { term: 'Policyholder', def: 'The person or entity who owns the insurance policy.' },
  ],
  'insurance-agent-lh': [
    { term: 'Beneficiary', def: 'The named person who receives the death benefit when the insured dies.' },
    { term: 'Term life', def: 'Pure protection for a set period (e.g., 20 years) with no cash value.' },
    { term: 'Whole life', def: 'Level-premium life insurance that builds cash value over the insured’s lifetime.' },
    { term: 'Insurable interest', def: 'You must suffer a financial loss if the insured dies — the basis of life insurance.' },
    { term: 'Rider', def: 'An add-on that changes a base life policy — e.g., accidental death benefit.' },
    { term: 'Grace period', def: 'The extra time (usually 30–31 days) to pay a late premium without losing coverage.' },
    { term: 'Cash value', def: 'The savings component of a permanent life policy that grows over time.' },
    { term: 'Contestability period', def: 'The first 2 years when an insurer can investigate misstatements before paying a claim.' },
    { term: 'Annuity', def: 'A contract that pays a stream of income, usually in retirement.' },
    { term: 'Reinstatement', def: 'Restoring a lapsed life policy by paying back premiums and meeting requirements.' },
    { term: 'Face amount', def: 'The death benefit stated in the policy — what the beneficiary receives.' },
    { term: 'Underwriting', def: 'The insurer’s process of evaluating risk to set premiums or approve coverage.' },
  ],
  cna: [
    { term: 'Standard precautions', def: 'Infection-prevention steps used with every patient — treat all blood and body fluids as infectious.' },
    { term: 'HIPAA', def: 'The federal law protecting patient health information — share only with the care team and with permission.' },
    { term: 'ADL', def: 'Activities of daily living — bathing, dressing, eating, toileting, transferring and walking.' },
    { term: 'Vital signs', def: 'Temperature, pulse, respirations, blood pressure and often oxygen saturation.' },
    { term: 'PPE', def: 'Personal protective equipment — gloves, gown, mask, eyewear — used to block infection.' },
    { term: 'Pressure injury', def: 'Skin breakdown from unrelieved pressure over bony areas — prevented with 2-hour repositioning.' },
    { term: 'Ambulation', def: 'Helping a resident walk, using safe technique and appropriate assistive devices.' },
    { term: 'Encouragement of fluids', def: 'Offering water regularly — many residents are at risk of dehydration.' },
    { term: 'Isolation precautions', def: 'Extra measures (contact, droplet, airborne) for residents with certain infections.' },
    { term: 'Perineal care', def: 'Cleaning the genital and rectal area — done front to back to prevent infection.' },
    { term: 'Observation', def: 'Noticing and reporting changes in a resident’s condition to the nurse.' },
    { term: 'Privacy & dignity', def: 'Keeping residents covered, knocking, and protecting their modesty during care.' },
    { term: 'Body mechanics', def: 'Using proper posture and lifting technique to protect your back and the resident.' },
    { term: 'Registry', def: 'The official state list of certified nurse aides — your employer verifies you are listed.' },
  ],
  cosmetologist: [
    { term: 'Sanitize', def: 'Reducing the number of germs — the mildest level of cleaning.' },
    { term: 'Disinfect', def: 'Destroying most disease-causing microorganisms on non-porous surfaces.' },
    { term: 'Sterilize', def: 'Destroying all microbial life — required for implements that break the skin.' },
    { term: 'EPA-registered', def: 'A disinfectant approved by the EPA for killing specific pathogens.' },
    { term: 'Contraindication', def: 'A condition that means a service should not be performed — e.g., an open sore.' },
    { term: 'Acid mantle', def: 'The skin’s protective acidic layer, around pH 4.5–5.5.' },
    { term: 'Bloodborne pathogens', def: 'Disease-causing organisms in blood — OSHA sets the salon’s exposure standard.' },
    { term: 'Porous', def: 'Absorbent materials that cannot be reliably disinfected — single-use or discard.' },
    { term: 'Non-porous', def: 'Smooth materials like metal and glass that can be cleaned and disinfected.' },
    { term: 'Patch test', def: 'A small trial application to check a client’s reaction before a full service.' },
    { term: 'MSDS/SDS', def: 'Safety Data Sheet — the document describing a product’s hazards and handling.' },
    { term: 'Infection', def: 'Invasion of the body by disease-causing microorganisms.' },
  ],
  barber: [
    { term: 'Disinfect', def: 'Destroying most pathogens on tools after each client using an EPA-registered solution.' },
    { term: 'Single-use', def: 'Items like razor blades and neck strips used once and discarded.' },
    { term: 'Sanitize', def: 'Reducing germs to a safe level — the minimum for skin before a service.' },
    { term: 'Bloodborne pathogen', def: 'Infectious organisms in blood — handled by OSHA’s exposure control standard.' },
    { term: 'Contraindication', def: 'A skin condition (e.g., razor burn, infection) that means the service is deferred.' },
    { term: 'Porous', def: 'Absorbent materials that can’t be disinfected reliably — single-use only.' },
    { term: 'EPA-registered', def: 'A disinfectant approved to kill pathogens on salon implements.' },
    { term: 'Post-service sanitation', def: 'Cleaning and disinfecting the workstation, chair and tools after every client.' },
  ],
  'nail-technician': [
    { term: 'Disinfect', def: 'Killing pathogens on non-porous implements using an EPA-registered solution.' },
    { term: 'Sterilize', def: 'Destroying all microbial life — for tools that can pierce the skin.' },
    { term: 'Single-use', def: 'Disposable items used once and thrown away — never reused.' },
    { term: 'Sanitize', def: 'Lowering germ counts — the first step before disinfection.' },
    { term: 'Non-porous', def: 'Smooth surfaces (metal, glass) that can be disinfected.' },
    { term: 'Porous', def: 'Absorbent materials that cannot be reliably disinfected.' },
    { term: 'Contraindication', def: 'A nail or skin condition that prevents the service, e.g., a fungal infection.' },
    { term: 'EPA-registered', def: 'A disinfectant EPA-approved for killing pathogens.' },
  ],
  esthetician: [
    { term: 'Acid mantle', def: 'The skin’s protective acidic barrier, about pH 4.5–5.5.' },
    { term: 'pH', def: 'A 0–14 scale of acidity/alkalinity; skin sits around 4.5–5.5.' },
    { term: 'Dehydration', def: 'Low water content in the skin — feels tight and shows fine lines.' },
    { term: 'Contraindication', def: 'A condition (like active infection or healing wound) that bars the treatment.' },
    { term: 'Disinfect', def: 'Killing pathogens on tools and surfaces with an EPA-registered product.' },
    { term: 'Patch test', def: 'Trying a product on a small area first to check for a reaction.' },
    { term: 'Non-porous', def: 'Smooth materials that can be disinfected between clients.' },
    { term: 'SPF', def: 'Sun protection factor — the sunscreen’s protection rating against UVB.' },
  ],
  'massage-therapist': [
    { term: 'Contraindication', def: 'A condition that means massage should not be performed, e.g., DVT or acute infection.' },
    { term: 'MBLEx', def: 'The Massage & Bodywork Licensing Examination administered by the FSMTB — used by most states.' },
    { term: 'Scope of practice', def: 'The treatments a state allows a licensed massage therapist to perform.' },
    { term: 'Draping', def: 'Covering the client so only the area being treated is exposed.' },
    { term: 'Intake', def: 'The health-history and goal interview before a session.' },
    { term: 'Informed consent', def: 'The client agreeing to the treatment, pressure and areas after explanation.' },
    { term: 'Body mechanics', def: 'The therapist’s posture and movement that protect their body during work.' },
    { term: 'Contraindicated site', def: 'A specific area to avoid, such as a recent scar or varicose vein.' },
    { term: 'Hydrotherapy', def: 'The use of water (heat, steam, cold) as part of treatment.' },
    { term: 'Endangerment sites', def: 'Anatomical areas that require extra caution or avoidance by policy.' },
  ],
  'notary-public': [
    { term: 'Acknowledgment', def: 'The signer appears and admits signing voluntarily; identity is verified.' },
    { term: 'Jurat', def: 'The signer signs in the notary’s presence and swears or affirms the content is true.' },
    { term: 'Oath', def: 'A solemn promise — a notary administers it and attests the signer made it.' },
    { term: 'Affirmation', def: 'A solemn promise without religious wording, used when the signer prefers it.' },
    { term: 'Journal', def: 'The notary’s official record of every notarization.' },
    { term: 'Commission', def: 'The state’s authorization for a notary to act, for a fixed term.' },
    { term: 'Seal/stamp', def: 'The official stamp that authenticates the notarization.' },
    { term: 'Credible witness', def: 'A person who vouches for the signer’s identity where permitted by state law.' },
    { term: 'Disqualifying interest', def: 'A personal stake in the document that bars the notary from acting.' },
    { term: 'Certificate', def: 'The notarial wording on the document describing the act performed.' },
  ],
  'home-inspector': [
    { term: 'Visual inspection', def: 'Inspecting visible, readily accessible areas without moving furniture or opening walls.' },
    { term: 'Pre-inspection agreement', def: 'The contract defining the scope, limits and terms before the inspection.' },
    { term: 'Deficiency', def: 'A condition found during the inspection that is unsafe or needs repair.' },
    { term: 'GFCI', def: 'Ground-fault circuit interrupter — a safety outlet required in wet areas.' },
    { term: 'Radon', def: 'An odorless radioactive gas that can cause lung cancer; testing is recommended.' },
    { term: 'Referral', def: 'Sending a specialty issue (e.g., structural) to an engineer or specialist.' },
    { term: 'Non-invasive', def: 'The inspection method — no probing, no dismantling, no invasive testing.' },
    { term: 'Material defect', def: 'A significant condition that could affect safety, health or value.' },
    { term: 'Attic/crawlspace', def: 'Accessible areas inspected when an entry point exists and conditions allow.' },
    { term: 'Report', def: 'The documented findings delivered after the inspection — the client’s deliverable.' },
  ],
  'pest-control-applicator': [
    { term: 'Label', def: 'The legally binding instructions on a pesticide — rate, target, PPE, and safety.' },
    { term: 'Restricted-use pesticide', def: 'A pesticide that only certified applicators may purchase and apply.' },
    { term: 'PPE', def: 'Personal protective equipment specified on the label.' },
    { term: 'IPM', def: 'Integrated pest management — combining sanitation, exclusion and targeted treatments.' },
    { term: 'Drift', def: 'Pesticide moving off-target; the applicator is responsible for preventing it.' },
    { term: 'Certification category', def: 'A specialty license, e.g., termite/structural, household, or ornamental.' },
    { term: 'Harborage', def: 'Places where pests shelter — eliminating them is a key control step.' },
    { term: 'Application record', def: 'The log of what was applied, where, when and how much — required by states.' },
    { term: 'Mode of action', def: 'How a pesticide kills or affects the target pest.' },
    { term: 'Signal word', def: 'Label words — CAUTION, WARNING or DANGER — showing toxicity level.' },
  ],
  'security-guard': [
    { term: 'Deter', def: 'Preventing incidents by your visible presence.' },
    { term: 'Observe and report', def: 'The unarmed guard’s core function — document what you see, do not engage.' },
    { term: 'Use of force', def: 'Physical action — limited to reasonable self-defense; never for property or escalation.' },
    { term: 'Access control', def: 'Verifying and logging who enters and exits a facility.' },
    { term: 'Incident report', def: 'A written record of facts, times, descriptions and actions taken.' },
    { term: 'Patrol', def: 'Systematic movement through an area to detect and deter problems.' },
    { term: 'Controlled access point', def: 'A secured entry where visitors are checked before entry.' },
    { term: 'Observation post', def: 'A fixed position chosen to maximize visibility of an area.' },
    { term: 'Code of conduct', def: 'The rules of behavior, ethics and limits a guard must follow.' },
    { term: 'Emergency plan', def: 'The facility’s procedures for fire, weather and other emergencies.' },
  ],
}

const FALLBACK_DECK: Card[] = [
  { term: 'License', def: 'Official state permission to perform a regulated occupation.' },
  { term: 'Endorsement / reciprocity', def: 'Accepting another state’s license without full retraining.' },
  { term: 'Scope of practice', def: 'The tasks and services your license allows you to perform.' },
  { term: 'Continuing education (CE)', def: 'Required training hours during each renewal cycle.' },
  { term: 'Background check', def: 'Criminal-history screening required before licensing in most occupations.' },
  { term: 'Exam vendor', def: 'The company the state uses to administer licensing exams (PSI, Pearson VUE…).' },
  { term: 'Renewal cycle', def: 'How often a license must be renewed — often 1–4 years.' },
  { term: 'State board', def: 'The official agency that regulates a licensed occupation in your state.' },
  { term: 'Application', def: 'The formal request for a license submitted to the state board.' },
  { term: 'Fee', def: 'The cost to apply, test, or renew — set by the state.' },
  { term: 'Passing score', def: 'The minimum score needed to pass the licensing exam.' },
  { term: 'Retake', def: 'Taking the exam again after a failed attempt — often with a waiting period.' },
]

export default function FlashcardGenerator() {
  const [occupationId, setOccupationId] = useState('real-estate-salesperson')
  const [flipped, setFlipped] = useState<Set<number>>(new Set())

  const occ = OCCUPATIONS.find((o) => o.id === occupationId) ?? OCCUPATIONS[0]
  const deck = (DECKS[occ.id]?.length ? DECKS[occ.id] : FALLBACK_DECK) as Card[]

  const toggle = (i: number) => {
    setFlipped((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  const flipAll = (to: boolean) =>
    setFlipped(to ? new Set(deck.map((_, i) => i)) : new Set())

  return (
    <div>
      <div className="no-print space-y-4 mb-6">
        <label className="block text-sm font-medium text-slate-700">
          Career
          <select
            value={occupationId}
            onChange={(e) => {
              setOccupationId(e.target.value)
              setFlipped(new Set())
            }}
            className="mt-1 w-full sm:w-80 block rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none"
          >
            {OCCUPATIONS.map((o) => (
              <option key={o.id} value={o.id}>
                {o.emoji} {o.name}
              </option>
            ))}
          </select>
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => flipAll(true)}
            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-slate-100 text-slate-700 hover:bg-slate-200"
          >
            Flip all
          </button>
          <button
            type="button"
            onClick={() => flipAll(false)}
            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-slate-100 text-slate-700 hover:bg-slate-200"
          >
            Reset all
          </button>
        </div>
        <p className="text-sm text-slate-500">
          Click a card to flip it. Terms and definitions are original and cover the real vocabulary of this career.
        </p>
      </div>

      <div className="report-area rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <div className="border-b border-slate-200 pb-4 mb-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">LicenseFig · Flashcards</p>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            {occ.emoji} {occ.name} — vocabulary deck ({deck.length} cards)
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {deck.map((c, i) => {
            const isFlipped = flipped.has(i)
            return (
              <button
                key={c.term}
                type="button"
                onClick={() => toggle(i)}
                className="no-print min-h-[110px] rounded-xl border text-left p-4 transition-all"
                style={{
                  borderColor: isFlipped ? '#a7f3d0' : '#e2e8f0',
                  background: isFlipped ? '#ecfdf5' : '#ffffff',
                }}
                aria-label={`${isFlipped ? 'Show term' : 'Show definition'} for ${c.term}`}
              >
                {isFlipped ? (
                  <span className="text-sm text-slate-700 leading-relaxed">{c.def}</span>
                ) : (
                  <span className="font-semibold text-slate-900">{c.term}</span>
                )}
              </button>
            )
          })}
        </div>

        {/* Print view: term + definition always together */}
        <div className="hidden print:block">
          <ol className="space-y-3">
            {deck.map((c) => (
              <li key={c.term} className="text-sm">
                <strong>{c.term}</strong> — {c.def}
              </li>
            ))}
          </ol>
        </div>

        <p className="text-xs text-slate-500 border-t border-slate-100 mt-6 pt-4">
          Vocabulary is real industry terminology with original definitions, for study purposes. Exam wording and
          definitions vary by state and vendor — verify with your prep materials and state board.
        </p>
      </div>

      <div className="no-print mt-4">
        <PrintButton label="Print / Save this deck" />
      </div>
    </div>
  )
}
