'use client'

import { useMemo, useState } from 'react'
import { OCCUPATIONS } from '@/data/types'
import PrintButton from './PrintButton'

interface Question {
  q: string
  options: string[]
  answer: number
  explain: string
}

// ---------------------------------------------------------------------------
// Original sample questions, written in-house and grouped by exam content
// domains (agency, contracts, math, nursing fundamentals, infection control,
// etc.). They are NOT actual exam questions and are not from any vendor bank.
// ---------------------------------------------------------------------------

const RE_BANK: Question[] = [
  {
    q: 'An agent lists a home for a seller. Under the agency relationship, the agent owes the seller a duty of loyalty. Which action would violate that duty?',
    options: ['Disclosing all offers received on time', 'Negotiating the highest price the market will bear', 'Secretly representing a buyer who competes with the seller', 'Keeping the seller informed of market feedback'],
    answer: 2,
    explain: 'Loyalty means the agent must put the principal first. Secretly helping a competing buyer without disclosure is a direct conflict of interest.',
  },
  {
    q: 'A home sells for $300,000 with a 3% commission paid to the listing broker. What is the total commission?',
    options: ['$9,000', '$3,000', '$30,000', '$900'],
    answer: 0,
    explain: 'Commission = sale price × rate = $300,000 × 0.03 = $9,000.',
  },
  {
    q: 'Which financing metric compares the loan amount to the appraised value of the property?',
    options: ['Debt-to-income ratio', 'Loan-to-value (LTV) ratio', 'Cap rate', 'Net operating income'],
    answer: 1,
    explain: 'LTV = loan amount ÷ appraised value. An 80% LTV means the borrower is financing 80% of the property value.',
  },
  {
    q: 'When must a buyer\u2019s agent disclose their agency relationship to the buyer?',
    options: ['After the offer is accepted', 'At the closing table', 'At the first substantive contact, before any confidential information is shared', 'Only if the buyer asks'],
    answer: 2,
    explain: 'Agency disclosure must happen early — before confidential or negotiating information changes hands — so the buyer knows who represents whom.',
  },
  {
    q: 'A property closes on the 15th of the month and the seller prepaid property taxes for the full month. The closing statement splits the tax between buyer and seller. This is called:',
    options: ['Escalation', 'Proration', 'Amortization', 'Subordination'],
    answer: 1,
    explain: 'Proration divides ongoing expenses such as taxes or rent fairly between buyer and seller at closing, based on days of ownership.',
  },
  {
    q: 'A buyer makes an offer that is accepted only if the buyer\u2019s home sells first. This type of provision is a:',
    options: ['Home sale contingency', 'Price escalation clause', 'Right of first refusal', 'Quitclaim deed'],
    answer: 0,
    explain: 'A home sale contingency lets the buyer back out (or renegotiate) if their current home does not sell, protecting them from owning two homes.',
  },
  {
    q: 'A buyer applies for a $200,000 loan on a home appraised at $250,000. What is the loan-to-value ratio?',
    options: ['75%', '80%', '90%', '125%'],
    answer: 1,
    explain: '$200,000 ÷ $250,000 = 0.80, or 80% LTV.',
  },
  {
    q: 'Which of the following is the best description of an appraisal?',
    options: ['A warranty that the property is defect-free', 'An estimate of market value by a qualified appraiser', 'A home inspection report', 'A property tax bill'],
    answer: 1,
    explain: 'An appraisal is a professional opinion of value; it is not a warranty and does not check the condition of the home the way an inspection does.',
  },
  {
    q: 'A listing agent also works with the buyer on the same transaction without telling either party. This is:',
    options: ['Legal in every state with no disclosure', 'A lawful team sale', 'An undisclosed dual agency and a conflict of interest', 'Always prohibited, even with consent'],
    answer: 2,
    explain: 'Dual agency is only permitted with full written disclosure and consent from both parties in states that allow it at all.',
  },
  {
    q: 'Money deposited by the buyer to show good faith is known as:',
    options: ['Earnest money', 'Discount points', 'A binder', 'Consideration of the appraisal'],
    answer: 0,
    explain: 'Earnest money is held in escrow to demonstrate the buyer\u2019s serious intent; it is credited toward the purchase at closing.',
  },
  {
    q: 'A seller is legally required to disclose which of the following?',
    options: ['The seller\u2019s mortgage balance', 'Known material defects such as a cracked foundation', 'The seller\u2019s original purchase price', 'The names of previous buyers who walked away'],
    answer: 1,
    explain: 'Sellers must disclose known material defects that affect value or safety. Disclosures vary by state, so check the state form.',
  },
  {
    q: 'A broker holds the buyer\u2019s earnest money in a separate trust account. This satisfies the duty of:',
    options: ['Loyalty', 'Accounting', 'Candor', 'Obedience'],
    answer: 1,
    explain: 'The duty of accounting requires the agent to keep client funds separate and account for them accurately — never co-mingle.',
  },
]

const INSURANCE_BANK: Question[] = [
  {
    q: 'A hazard is best defined as a condition that:',
    options: ['Guarantees a loss will occur', 'Increases the likelihood of a loss', 'Is the actual cause of a loss', 'Eliminates the need for insurance'],
    answer: 1,
    explain: 'A hazard is a condition that increases the chance of loss (e.g., a frayed wire); the peril is the actual cause of loss (e.g., fire).',
  },
  {
    q: 'A $10,000 auto is destroyed and the policy pays $8,000 — its value minus $2,000 of wear and tear. This payment reflects:',
    options: ['Replacement cost', 'Actual cash value', 'Stated amount', 'Guaranteed value'],
    answer: 1,
    explain: 'Actual cash value = replacement cost minus depreciation. It is the standard settlement for many property losses.',
  },
  {
    q: 'Which statement about a deductible is true?',
    options: ['A higher deductible usually lowers the premium', 'The insurer pays the deductible first', 'Deductibles only apply to life insurance', 'A deductible increases the premium always'],
    answer: 0,
    explain: 'Choosing a higher deductible shifts more risk to the policyholder, which normally lowers the premium.',
  },
  {
    q: 'An agent who recommends a policy purely for their own bonus rather than the client\u2019s needs violates the duty of:',
    options: ['Confidentiality', 'Fiduciary loyalty to the client', 'Timeliness', 'Indemnification'],
    answer: 1,
    explain: 'Insurance agents act as fiduciaries — the client\u2019s interests must come before the agent\u2019s own compensation.',
  },
  {
    q: 'In a life insurance policy, the person who receives the death benefit is the:',
    options: ['Policyowner', 'Beneficiary', 'Insured', 'Contingent rider'],
    answer: 1,
    explain: 'The beneficiary is the named party entitled to the death benefit when the insured dies.',
  },
  {
    q: 'A policy that provides coverage only for a set period and builds no cash value is:',
    options: ['Whole life', 'Term life', 'Universal life', 'Endowment'],
    answer: 1,
    explain: 'Term life covers a fixed period with no savings or cash value component — typically the cheapest form of life insurance.',
  },
  {
    q: 'A property policy requires the insured to carry coverage equal to a set percentage of the property value or face a penalty on partial losses. This is the:',
    options: ['Coinsurance clause', 'Reinstatement clause', 'Subrogation clause', 'Incontestability clause'],
    answer: 0,
    explain: 'Coinsurance requires the insured to insure the property to a stated percentage (often 80%) of its value to receive full partial-loss payment.',
  },
  {
    q: 'Misstating a material fact on an application that the insurer relied on is called:',
    options: ['Warranty', 'Misrepresentation', 'Endorsement', 'Rider'],
    answer: 1,
    explain: 'Misrepresentation is a false or incomplete material statement; if relied on by the insurer it can void the policy.',
  },
  {
    q: 'For an insurance contract to be valid, the policyholder must have a financial stake in the insured subject. This principle is:',
    options: ['Insurable interest', 'Utmost good faith', 'Indemnity', 'Proximate cause'],
    answer: 0,
    explain: 'Insurable interest means you would suffer a financial loss if the insured person or property is damaged.',
  },
  {
    q: 'A hurricane destroys a home; the windstorm and then flood damage the structure. The insurer applies the principle of:',
    options: ['Subrogation', 'Proximate cause', 'Coinsurance', 'Estoppel'],
    answer: 1,
    explain: 'Proximate cause identifies the dominant, efficient cause of the loss to decide whether coverage applies.',
  },
]

const CNA_BANK: Question[] = [
  {
    q: 'Standard precautions must be used for which patients?',
    options: ['Only patients with known infections', 'All patients, regardless of diagnosis', 'Only post-operative patients', 'Only elderly patients'],
    answer: 1,
    explain: 'Standard precautions apply to every patient\u2019s blood, body fluids and mucous membranes — you cannot know who is infectious.',
  },
  {
    q: 'The single most effective way to prevent the spread of infection is:',
    options: ['Wearing gloves for all care', 'Hand hygiene', 'Isolating every patient', 'Wearing a mask at all times'],
    answer: 1,
    explain: 'Frequent, correct handwashing is the #1 infection-prevention measure.',
  },
  {
    q: 'Which adult temperature reading is within the normal range?',
    options: ['99.5°F (37.5°C) orally', '103.2°F (39.6°C) orally', '94.0°F (34.4°C) orally', '104.5°F (40.3°C) orally'],
    answer: 0,
    explain: 'Normal adult oral temperature is roughly 97.8–99.1°F (36.5–37.3°C); 99.5°F is at the upper edge but normal for many people.',
  },
  {
    q: 'Which blood pressure reading is considered elevated for an adult?',
    options: ['110/70', '125/80', '90/60', '160/100'],
    answer: 1,
    explain: 'Systolic 120–129 with diastolic under 80 is elevated. 160/100 is hypertensive crisis-level and must be reported immediately.',
  },
  {
    q: 'To help prevent pressure injuries in a bed-bound resident, the aide should:',
    options: ['Keep the resident flat at all times', 'Reposition the resident at least every 2 hours', 'Use only soap on the skin', 'Apply heat to reddened areas'],
    answer: 1,
    explain: 'Regular repositioning every 2 hours relieves pressure over bony areas and prevents skin breakdown.',
  },
  {
    q: 'A resident\u2019s health information may be shared with whom?',
    options: ['Any family member who asks', 'Only the care team with a need to know', 'Other residents', 'Anyone on social media groups'],
    answer: 1,
    explain: 'HIPAA allows sharing only with those directly involved in the resident\u2019s care or with the resident\u2019s permission.',
  },
  {
    q: 'After giving perineal care, the aide should remove gloves and then:',
    options: ['Go directly to the next task', 'Perform hand hygiene', 'Remove the gown', 'Reuse the gloves if clean'],
    answer: 1,
    explain: 'Always wash hands immediately after removing gloves — gloves are not a substitute for hand hygiene.',
  },
  {
    q: 'What is the correct sequence when entering an isolation room?',
    options: ['Mask, then gloves, then gown', 'Gown, then mask, then gloves', 'Gloves, then gown, then mask', 'Order does not matter'],
    answer: 1,
    explain: 'Standard PPE order: gown first, then mask, then gloves. Gloves go on last so they stay clean.',
  },
  {
    q: 'Which is an example of an activity of daily living (ADL)?',
    options: ['Balancing the checkbook', 'Bathing and dressing', 'Choosing a primary physician', 'Writing a will'],
    answer: 1,
    explain: 'ADLs are basic self-care tasks: bathing, dressing, eating, toileting, transferring and walking.',
  },
  {
    q: 'To prevent a resident from falling, the aide should:',
    options: ['Keep the bed in the lowest position when occupied', 'Raise the bed high for easier transfers', 'Leave the side rails down always', 'Encourage unsupervised walking at night'],
    answer: 0,
    explain: 'Keeping the bed low, locking wheels and placing the call light within reach are core fall-prevention actions.',
  },
]

const BEAUTY_BANK: Question[] = [
  {
    q: 'Which product category is EPA-registered and required to kill bacteria, viruses and fungi on salon surfaces?',
    options: ['Cosmetic-grade lotion', 'Hospital-grade disinfectant', 'Hand cream', 'Plain water'],
    answer: 1,
    explain: 'EPA-registered hospital-grade disinfectants are the standard for cleaning non-porous surfaces in a salon.',
  },
  {
    q: 'The difference between sanitation and disinfection is that disinfection:',
    options: ['Reduces the number of germs', 'Destroys most harmful microorganisms on surfaces', 'Only removes visible dirt', 'Is the same as sterilization'],
    answer: 1,
    explain: 'Sanitation reduces germs; disinfection destroys most disease-causing microorganisms. Sterilization destroys all microbial life.',
  },
  {
    q: 'After a client\u2019s treatment, contaminated single-use implements should be:',
    options: ['Reused on the next client', 'Discarded in the proper waste container', 'Rinsed and stored', 'Disinfected and kept for personal use'],
    answer: 1,
    explain: 'Single-use (disposable) items are never reused — discard them after one client.',
  },
  {
    q: 'The federal law that governs workplace safety in the salon is:',
    options: ['OSHA', 'FDA food code', 'ADA', 'FLSA'],
    answer: 0,
    explain: 'OSHA (Occupational Safety and Health Administration) sets workplace safety and bloodborne-pathogen rules for salons.',
  },
  {
    q: 'Metal implements such as clippers should be cleaned and then:',
    options: ['Stored wet', 'Disinfected with an EPA-registered solution', 'Sanitized with warm water only', 'Wiped with a paper towel'],
    answer: 1,
    explain: 'Metal tools must be disinfected (not just sanitized) after each use per state board rules.',
  },
  {
    q: 'The pH of healthy skin is approximately:',
    options: ['1–2', '4.5–5.5', '9–10', 'Neutral at exactly 14'],
    answer: 1,
    explain: 'Skin\u2019s acid mantle sits around pH 4.5–5.5; most professional products are formulated near this range.',
  },
  {
    q: 'If a practitioner is exposed to a client\u2019s blood, the correct response is to:',
    options: ['Ignore it and continue', 'Stop the service and follow the bloodborne-pathogen procedure', 'Rinse the area with plain water and continue', 'Apply makeup to cover it'],
    answer: 1,
    explain: 'Exposure to blood requires stopping the service and following the salon\u2019s bloodborne-pathogen exposure protocol.',
  },
  {
    q: 'Sterilization is required for which salon items?',
    options: ['All lotions and creams', 'Items that penetrate the skin (e.g., certain implements)', 'Towels between uses', 'Combs after every client'],
    answer: 1,
    explain: 'Items that can puncture skin must be sterilized or be single-use; combs and brushes are disinfected.',
  },
  {
    q: 'Before performing a service, the first step is:',
    options: ['Client consultation and health history', 'Applying product immediately', 'Choosing the highest price add-on', 'Skipping documentation'],
    answer: 0,
    explain: 'A consultation and health history identify contraindications and client expectations before the service.',
  },
  {
    q: 'Porous items that cannot be disinfected should be:',
    options: ['Sanitized briefly', 'Discarded or made single-use', 'Soaked overnight', 'Kept in a drawer'],
    answer: 1,
    explain: 'Porous materials absorb contaminants and cannot be reliably disinfected, so they must be single-use or discarded.',
  },
]

const NOTARY_BANK: Question[] = [
  {
    q: 'A notary\u2019s core duty when performing an acknowledgment is to:',
    options: ['Verify the document is legally correct', 'Confirm the signer\u2019s identity and that they signed willingly', 'Prepare the document', 'Store the original document'],
    answer: 1,
    explain: 'The notary verifies identity and willingness — not the document\u2019s legal content.',
  },
  {
    q: 'Which is generally acceptable proof of identity for a notarization?',
    options: ['A friend vouching for the signer', 'A current government-issued ID with photo and signature', 'A library card', 'The signer\u2019s verbal assurance'],
    answer: 1,
    explain: 'Most states accept a current government-issued photo ID; credible witnesses are a fallback in some states.',
  },
  {
    q: 'A notary who is a party to the transaction may:',
    options: ['Notarize as long as they are not the signer', 'Notarize their own signature', 'Notarize only if they benefit financially', 'Never notarize their own documents'],
    answer: 3,
    explain: 'Notaries are prohibited from notarizing their own signatures and usually any document where they have a personal interest.',
  },
  {
    q: 'The difference between a jurat and an acknowledgment is that a jurat:',
    options: ['Requires the signer to take an oath or affirm the truth of the content', 'Only verifies identity', 'Is used for real estate only', 'Does not require a signature'],
    answer: 0,
    explain: 'A jurat includes the signer swearing or affirming to the truth of the document; an acknowledgment only verifies the signature was voluntary.',
  },
  {
    q: 'Most states require notaries to maintain a journal to:',
    options: ['Impress clients', 'Record each notarization for future reference', 'Replace the notary\u2019s records at the county', 'Publish names publicly'],
    answer: 1,
    explain: 'A journal creates a record of each notarization, which is critical if a document is challenged later.',
  },
  {
    q: 'A notary commission is issued by the:',
    options: ['Federal government', 'State (usually the Secretary of State or equivalent)', 'Local real estate board', 'The employer'],
    answer: 1,
    explain: 'Notaries are commissioned by their state, typically through the Secretary of State or another state office.',
  },
  {
    q: 'If a signer appears confused or appears to be under pressure, the notary should:',
    options: ['Proceed quickly', 'Notarize only with a witness', 'Stop and verify the signer\u2019s willingness and competency', 'Ask the signer to come back tomorrow without explanation'],
    answer: 2,
    explain: 'The notary must be satisfied the signer is acting freely; if not, the notarization should not proceed.',
  },
  {
    q: 'A notary\u2019s official seal is used to:',
    options: ['Decorate the document', 'Authenticate the notarization with official information', 'Replace the signature', 'Transfer the property'],
    answer: 1,
    explain: 'The seal (stamp) records the notary\u2019s name, state, commission details and date, authenticating the act.',
  },
]

const MASSAGE_BANK: Question[] = [
  {
    q: 'A client reports a recent deep-vein thrombosis (DVT). The therapist should:',
    options: ['Massage the area deeply', 'Avoid the area and refer the client to a physician', 'Use heat packs on the leg', 'Massage the unaffected leg harder'],
    answer: 1,
    explain: 'DVT is a contraindication for massage — the risk of dislodging a clot is serious. Refer to a physician.',
  },
  {
    q: 'Professional draping standards require that:',
    options: ['Clients be fully exposed', 'Only the area being treated is exposed', 'Draping is optional', 'Draping is a personal choice of the therapist'],
    answer: 1,
    explain: 'Standard practice drapes the client so only the region being worked is uncovered.',
  },
  {
    q: 'Which is a normal resting adult heart rate?',
    options: ['40 beats/min', '72 beats/min', '120 beats/min', '150 beats/min'],
    answer: 1,
    explain: 'Normal adult resting heart rate is about 60–100 beats per minute; 72 is typical.',
  },
  {
    q: 'The scope of practice for a licensed massage therapist includes:',
    options: ['Diagnosing medical conditions', 'Treating clients as prescribed by the state\u2019s scope laws', 'Prescribing medications', 'Performing surgery'],
    answer: 1,
    explain: 'Massage therapists work within their state\u2019s scope — treating soft tissue, not diagnosing or prescribing.',
  },
  {
    q: 'Before the first session, the therapist should:',
    options: ['Skip the intake form', 'Complete an intake and health history', 'Begin without discussion', 'Only ask about payment'],
    answer: 1,
    explain: 'An intake and health history identify contraindications and let the therapist plan the session safely.',
  },
  {
    q: 'Which certification exam is used by most states to license massage therapists?',
    options: ['MBLEx', 'NCLEX', 'CPA exam', 'NREMT'],
    answer: 0,
    explain: 'The MBLEx, administered by the FSMTB, is the exam most states accept for massage therapy licensure.',
  },
  {
    q: 'Client health information discussed during a session is protected by:',
    options: ['No rule', 'Confidentiality and HIPAA where applicable', 'Only the therapist\u2019s mood', 'State advertising law'],
    answer: 1,
    explain: 'Client health details are confidential; HIPAA applies when the practice is a covered entity.',
  },
  {
    q: 'A common indication for massage is:',
    options: ['Acute infection with fever', 'Chronic muscle tension', 'Open wounds at the site', 'Immediately after a fracture'],
    answer: 1,
    explain: 'Chronic muscle tension is a standard indication; acute infection, open wounds and recent fractures are contraindications.',
  },
]

const APPRAISER_BANK: Question[] = [
  {
    q: 'The principle that the value of a property is set by the most profitable legal use is:',
    options: ['Substitution', 'Highest and best use', 'Progression', 'Anticipation'],
    answer: 1,
    explain: 'Highest and best use is the legally permitted, physically possible, financially feasible use that yields the highest value.',
  },
  {
    q: 'The appraisal approach that compares a subject to recently sold similar properties is the:',
    options: ['Cost approach', 'Sales comparison approach', 'Income approach', 'Reconciliation approach'],
    answer: 1,
    explain: 'The sales comparison approach values a property by adjusting comparable sales for differences.',
  },
  {
    q: 'The professional standards that govern real estate appraisers in the U.S. are:',
    options: ['GAAP', 'USPAP', 'ISO 9001', 'Code of Federal Regulations Title 42'],
    answer: 1,
    explain: 'USPAP (Uniform Standards of Professional Appraisal Practice) is the ethics and performance standard for appraisers.',
  },
  {
    q: 'If a comparable sold for $500,000 but had a pool worth $25,000 more than the subject\u2019s features, the adjustment is:',
    options: ['+$25,000', '−$25,000', 'No adjustment', 'Double the difference'],
    answer: 1,
    explain: 'You subtract the value of a feature the comparable has but the subject lacks.',
  },
  {
    q: 'The type and extent of research and analysis in an appraisal is defined by the:',
    options: ['Scope of work', 'Client\u2019s verbal request', 'County tax roll', 'Lender\u2019s marketing team'],
    answer: 0,
    explain: 'Scope of work sets what data, approaches and analysis the assignment requires — determined by the intended use.',
  },
  {
    q: 'Appraisals for FHA-insured mortgages must be performed by appraisers:',
    options: ['Chosen by the buyer', 'On the FHA roster of approved appraisers', 'Any licensed realtor', 'Hired by the seller'],
    answer: 1,
    explain: 'FHA requires appraisals from appraisers on its approved roster for the property\u2019s location.',
  },
  {
    q: 'When an appraiser\u2019s three approaches produce different values, the final opinion is determined by:',
    options: ['Averaging them', 'Reconciliation — weighing the reliability of each approach', 'Choosing the highest', 'The lender\u2019s preference'],
    answer: 1,
    explain: 'Reconciliation weighs each approach\u2019s reliability for the specific assignment to reach a defensible conclusion.',
  },
  {
    q: 'A property\u2019s current use is a parking lot, but zoning allows a 20-unit building with higher value. This is an example of a(n):',
    options: ['Incomplete improvement', 'Under-improvement relative to highest and best use', 'Over-improvement', 'Conforming use'],
    answer: 1,
    explain: 'When a site could support a more valuable legal use, the current use is considered an under-improvement.',
  },
]

const INSPECTOR_BANK: Question[] = [
  {
    q: 'A home inspector\u2019s report is best described as:',
    options: ['A pass/fail grade', 'A description of visible conditions with professional judgment', 'A cost estimate for all repairs', 'A warranty against defects'],
    answer: 1,
    explain: 'Inspections document visible, readily accessible conditions — they do not grade, warrant or price every repair.',
  },
  {
    q: 'Which action is typically outside a standard home inspection?',
    options: ['Opening accessible panels and doors', 'Testing visible outlets', 'Moving furniture or tearing into walls', 'Running water fixtures'],
    answer: 2,
    explain: 'Standard inspections are non-invasive — inspectors do not move furniture or open up walls.',
  },
  {
    q: 'A GFCI outlet is most important in areas exposed to:',
    options: ['Dry heat', 'Water (kitchens, baths, outdoors)', 'Low ceilings', 'Concrete floors only'],
    answer: 1,
    explain: 'Ground-fault circuit interrupters cut power on ground faults and are required in wet locations.',
  },
  {
    q: 'The document signed before the inspection that defines the scope and limits is the:',
    options: ['Listing agreement', 'Pre-inspection agreement', 'Deed', 'Warranty deed'],
    answer: 1,
    explain: 'A pre-inspection agreement protects both parties by defining exactly what will and will not be inspected.',
  },
  {
    q: 'Inspectors should refer issues beyond their expertise to:',
    options: ['The next buyer', 'Specialists such as structural engineers or electricians', 'The county assessor', 'Their favorite contractor'],
    answer: 1,
    explain: 'Recognizing limits and referring to specialists (engineers, roofers, electricians) is a professional standard.',
  },
  {
    q: 'Radon testing is important because radon:',
    options: ['Is always visible', 'Is an odorless gas that can cause lung cancer', 'Only affects basements in winter', 'Is harmless at any level'],
    answer: 1,
    explain: 'Radon is an invisible, odorless radioactive gas and the leading cause of lung cancer in non-smokers.',
  },
  {
    q: 'Visible water staining on a ceiling should be noted because it may indicate:',
    options: ['A recent paint job', 'An active or past leak', 'Normal aging', 'No concern'],
    answer: 1,
    explain: 'Stains can signal current or past roof or plumbing leaks; the inspector should flag them for evaluation.',
  },
  {
    q: 'The condition of the electrical service panel is inspected to:',
    options: ['Read the meter for the bill', 'Check for unsafe conditions like double-tapped breakers', 'Change fuses', 'None of the above'],
    answer: 1,
    explain: 'Inspectors look for common hazards such as double-tapped breakers, aluminum wiring concerns or improper panels.',
  },
]

const PEST_BANK: Question[] = [
  {
    q: 'Pesticide labels are legally binding. Before application, the applicator must:',
    options: ['Guess the rate', 'Read and follow the label directions', 'Apply at double strength for safety', 'Mix it with other chemicals'],
    answer: 1,
    explain: 'The label is the law — mixing, rates, target pests and PPE must all follow it.',
  },
  {
    q: 'EPA-registered pesticides are categorized as general use or:',
    options: ['Home use', 'Restricted use', 'Organic use', 'Garden use'],
    answer: 1,
    explain: 'Restricted-use pesticides require certified applicators and additional permits.',
  },
  {
    q: 'The label tells the applicator what personal protective equipment (PPE) to wear. PPE must be:',
    options: ['Optional if the weather is hot', 'Worn exactly as the label requires', 'Shared between applicators', 'Skipped for indoor jobs'],
    answer: 1,
    explain: 'Label-specified PPE protects the applicator; it is mandatory, not optional.',
  },
  {
    q: 'Termite treatments often require the applicator to hold a certification in the:',
    options: ['Termite / structural pest category', 'General household category only', 'Rodent category', 'No category'],
    answer: 0,
    explain: 'Structural pest (termite) work is a separate certification category in most states.',
  },
  {
    q: 'If a spray application drifts onto a neighbor\u2019s property, the applicator should:',
    options: ['Ignore it', 'Take steps to prevent drift and correct the situation', 'Blame the wind', 'Stop spraying forever'],
    answer: 1,
    explain: 'Applicators are responsible for preventing drift and handling any off-target exposure properly.',
  },
  {
    q: 'A preventive measure for cockroach infestations in a kitchen is:',
    options: ['Leaving food out', 'Eliminating food, water and hiding places', 'Sealing nothing', 'Only spraying once'],
    answer: 1,
    explain: 'Sanitation and exclusion (removing food, moisture and harborage) are the foundation of roach control.',
  },
  {
    q: 'Records of pesticide applications must be kept because:',
    options: ['The state requires documentation', 'It makes the applicator look busy', 'It is only for tax purposes', 'Records are optional'],
    answer: 0,
    explain: 'States require application records (product, amount, site, date) for accountability and compliance.',
  },
  {
    q: 'The best way to identify the pest before treating is to:',
    options: ['Treat broadly with every product', 'Properly identify the pest and choose a targeted product', 'Skip identification', 'Use more than the label rate'],
    answer: 1,
    explain: 'Correct pest identification drives product choice, placement and rate — the basis of effective IPM.',
  },
]

const SECURITY_BANK: Question[] = [
  {
    q: 'The primary role of an unarmed security guard is to:',
    options: ['Engage physically with intruders', 'Deter, observe and report', 'Make arrests', 'Carry a firearm'],
    answer: 1,
    explain: 'Unarmed guards deter, observe and report — they do not apprehend or use force.',
  },
  {
    q: 'A guard observes a package left unattended in a busy lobby. The correct action is:',
    options: ['Touch and open it', 'Mark the area, notify the supervisor and follow procedures', 'Ignore it', 'Move it to a closet'],
    answer: 1,
    explain: 'Unknown packages are never touched — isolate the area and follow the facility\u2019s protocol.',
  },
  {
    q: 'A written report of an incident should include:',
    options: ['Only the guard\u2019s opinion', 'Facts, times, descriptions and actions taken', 'Nothing', 'Rumors from coworkers'],
    answer: 1,
    explain: 'Reports document objective facts — what happened, when, who and what the guard did.',
  },
  {
    q: 'When verifying a visitor at a controlled access point, the guard should:',
    options: ['Wave them through', 'Confirm the visit, check ID and log the entry', 'Ask for a phone number only', 'Let anyone in with a badge'],
    answer: 1,
    explain: 'Access control means verifying the visitor is expected and logging their entry.',
  },
  {
    q: 'A guard\u2019s use of force is generally limited to:',
    options: ['Any force necessary to win', 'Reasonable force for self-defense', 'Deadly force for property', 'Force to detain anyone'],
    answer: 1,
    explain: 'Guards may only use reasonable, proportional force in self-defense — never to recover property or escalate.',
  },
  {
    q: 'During a fire alarm, the guard should first:',
    options: ['Hide', 'Follow the emergency plan and assist with evacuation', 'Open all doors', 'Leave everyone behind'],
    answer: 1,
    explain: 'Guards execute the facility\u2019s emergency plan — guiding evacuation and controlling access for responders.',
  },
  {
    q: 'The most reliable way a guard can document a suspicious vehicle is to:',
    options: ['Memorize the plate', 'Record the license plate, make, model, color and time', 'Take no notes', 'Chase it'],
    answer: 1,
    explain: 'Objective vehicle details (plate, make, model, color, time) make the report useful to law enforcement.',
  },
  {
    q: 'Observation posts and patrol routes are used to:',
    options: ['Give the guard a break', 'Maximize coverage and reduce predictable patterns', 'Replace reporting', 'Avoid interaction'],
    answer: 1,
    explain: 'Varied patrol patterns and observation posts improve security by making detection likely and response predictable.',
  },
]

const FALLBACK_BANK: Question[] = [
  {
    q: 'The first thing to confirm before starting any license application is:',
    options: ['Your exam date', 'The current requirements from your state board', 'Your license number', 'The renewal fee'],
    answer: 1,
    explain: 'Requirements change and vary by state — always start with the official state board requirements.',
  },
  {
    q: 'If a state accepts a license issued by another state, this is called:',
    options: ['Endorsement or reciprocity', 'Renewal', 'Discipline', 'Revocation'],
    answer: 0,
    explain: 'Reciprocity or endorsement lets a licensee transfer an existing credential without full retraining.',
  },
  {
    q: 'Continuing education (CE) is usually required:',
    options: ['Only once in a career', 'During each renewal cycle', 'Never', 'Only if you change employers'],
    answer: 1,
    explain: 'Most licenses require a set number of CE hours each renewal cycle to keep skills current.',
  },
  {
    q: 'A license that lapses because the holder forgot to renew is:',
    options: ['Automatically reinstated', 'Lapsed and may require a late fee or reinstatement steps', 'Never a problem', 'Transferred to another state'],
    answer: 1,
    explain: 'A lapsed license usually needs a late fee and possible reinstatement steps — mark your renewal date.',
  },
]

const BANKS: Record<string, Question[]> = {
  'real-estate-salesperson': RE_BANK,
  'real-estate-broker': RE_BANK,
  'real-estate-appraiser': APPRAISER_BANK,
  'insurance-agent-pc': INSURANCE_BANK,
  'insurance-agent-lh': INSURANCE_BANK,
  cna: CNA_BANK,
  cosmetologist: BEAUTY_BANK,
  barber: BEAUTY_BANK,
  'nail-technician': BEAUTY_BANK,
  esthetician: BEAUTY_BANK,
  'massage-therapist': MASSAGE_BANK,
  'notary-public': NOTARY_BANK,
  'home-inspector': INSPECTOR_BANK,
  'pest-control-applicator': PEST_BANK,
  'security-guard': SECURITY_BANK,
}

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function SampleQuestionEngine() {
  const [occupationId, setOccupationId] = useState('real-estate-salesperson')
  const [selected, setSelected] = useState<number | null>(null)
  const [revealed, setRevealed] = useState<number[]>([])
  const [seed, setSeed] = useState(0)

  const occ = OCCUPATIONS.find((o) => o.id === occupationId) ?? OCCUPATIONS[0]
  const bank = BANKS[occ.id] ?? FALLBACK_BANK

  // Deterministic-ish per seed for SSR/hydration safety (Math.random in render
  // is fine because results are the same on server and client only if we memo
  // — but this is a client component, so no SSR mismatch occurs).
  const questions = useMemo(() => shuffle(bank).slice(0, Math.min(10, bank.length)), [bank, seed])

  const answer = (qIndex: number, optionIndex: number) => {
    if (selected !== null) return
    setSelected(optionIndex)
    setRevealed((prev) => (prev.includes(qIndex) ? prev : [...prev, qIndex]))
  }

  const reset = () => {
    setSelected(null)
    setRevealed([])
    setSeed((s) => s + 1)
  }

  return (
    <div>
      <div className="no-print space-y-4 mb-6">
        <label className="block text-sm font-medium text-slate-700">
          Career
          <select
            value={occupationId}
            onChange={(e) => {
              setOccupationId(e.target.value)
              reset()
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
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition-colors"
        >
          🔀 New random set
        </button>
        <p className="text-sm text-slate-500">
          Select a career, then answer on screen or print the sheet. Sample questions are written in-house from the
          exam content outlines — they are not actual exam questions.
        </p>
      </div>

      <div className="report-area rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <div className="border-b border-slate-200 pb-4 mb-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">LicenseFig · Sample Questions</p>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            {occ.emoji} {occ.name} — practice set
          </h2>
          <p className="text-xs text-slate-500 mt-2 font-medium">
            ⚠️ Sample questions — not actual exam questions. They mirror the content domains (agency, contracts, math /
            nursing fundamentals, infection control) but come from no vendor bank.
          </p>
        </div>

        <ol className="space-y-5">
          {questions.map((item, i) => {
            const isAnswered = revealed.includes(i)
            const chosen = selected !== null && revealed.includes(i) ? selected : null
            return (
              <li key={`${seed}-${i}`} className="border border-slate-200 rounded-xl p-4">
                <p className="font-semibold text-slate-900 text-sm mb-3">
                  {i + 1}. {item.q}
                </p>
                <div className="space-y-2">
                  {item.options.map((opt, oi) => {
                    const isCorrect = oi === item.answer
                    const isChosen = chosen === oi
                    let cls = 'border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40'
                    if (isAnswered) {
                      if (isCorrect) cls = 'border-emerald-400 bg-emerald-50 text-emerald-900'
                      else if (isChosen) cls = 'border-red-400 bg-red-50 text-red-900'
                      else cls = 'border-slate-200 opacity-60'
                    }
                    return (
                      <button
                        key={oi}
                        type="button"
                        onClick={() => answer(i, oi)}
                        disabled={isAnswered}
                        className={`w-full text-left text-sm px-3 py-2 rounded-lg border transition-colors ${cls}`}
                      >
                        <span className="font-medium">{String.fromCharCode(65 + oi)}.</span> {opt}
                      </button>
                    )
                  })}
                </div>
                {isAnswered && (
                  <p className="text-sm mt-3 rounded-lg bg-slate-50 border border-slate-200 p-3 text-slate-700">
                    <span className="font-semibold text-emerald-700">
                      ✓ {String.fromCharCode(65 + item.answer)}
                    </span>{' '}
                    — {item.explain}
                  </p>
                )}
              </li>
            )
          })}
        </ol>

        <p className="text-xs text-slate-500 border-t border-slate-100 mt-6 pt-4">
          These questions are original and written for practice only. Real exams come from your state vendor and
          change — verify the current content outline with your state board and vendor.
        </p>
      </div>

      <div className="no-print mt-4">
        <PrintButton label="Print / Save this practice set" />
      </div>
    </div>
  )
}
