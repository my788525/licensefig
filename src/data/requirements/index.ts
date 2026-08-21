// ============================================================================
// LicenseFig — requirements data registry.
//
// Safe access pattern: pages/tools import `getRequirements` / `getRequirement`
// instead of importing requirement files directly, so a missing data file or
// an incomplete state row can never break the build. Empty data renders
// "Data pending — verify with your state board" in the UI.
// ============================================================================

import type { LicenseRequirements } from '../types'
import { barberRequirements } from './barber'
import { cnaRequirements } from './cna'
import { cosmetologistRequirements } from './cosmetologist'
import { estheticianRequirements } from './esthetician'
import { home_inspectorRequirements } from './home-inspector'
import { insurance_agent_lhRequirements } from './insurance-agent-lh'
import { insurance_agent_pcRequirements } from './insurance-agent-pc'
import { massage_therapistRequirements } from './massage-therapist'
import { nail_technicianRequirements } from './nail-technician'
import { notaryPublicRequirements } from './notary-public'
import { pest_control_applicatorRequirements } from './pest-control-applicator'
import { real_estate_appraiserRequirements } from './real-estate-appraiser'
import { realEstateBrokerRequirements } from './real-estate-broker'
import { realEstateSalespersonRequirements } from './real-estate-salesperson'
import { security_guardRequirements } from './security-guard'
// ---- Wave 2 occupations (2026-08-21) ----
import { registeredNurseRequirements } from './registered-nurse'
import { licensedPracticalNurseRequirements } from './licensed-practical-nurse'
import { pharmacistRequirements } from './pharmacist'
import { physicalTherapistRequirements } from './physical-therapist'
import { dentalHygienistRequirements } from './dental-hygienist'
import { electricianRequirements } from './electrician'
import { plumberRequirements } from './plumber'
import { hvacTechnicianRequirements } from './hvac-technician'
import { generalContractorRequirements } from './general-contractor'
import { professionalEngineerRequirements } from './professional-engineer'
import { attorneyRequirements } from './attorney'
import { certifiedPublicAccountantRequirements } from './certified-public-accountant'
import { emtRequirements } from './emt'
import { commercialDriverLicenseRequirements } from './commercial-driver-license'
import { architectRequirements } from './architect'

export const REQUIREMENTS_BY_OCCUPATION: Record<string, LicenseRequirements[]> = {
  barber: barberRequirements,
  cna: cnaRequirements,
  cosmetologist: cosmetologistRequirements,
  esthetician: estheticianRequirements,
  'home-inspector': home_inspectorRequirements,
  'insurance-agent-lh': insurance_agent_lhRequirements,
  'insurance-agent-pc': insurance_agent_pcRequirements,
  'massage-therapist': massage_therapistRequirements,
  'nail-technician': nail_technicianRequirements,
  'notary-public': notaryPublicRequirements,
  'pest-control-applicator': pest_control_applicatorRequirements,
  'real-estate-appraiser': real_estate_appraiserRequirements,
  'real-estate-broker': realEstateBrokerRequirements,
  'real-estate-salesperson': realEstateSalespersonRequirements,
  'security-guard': security_guardRequirements,
  // ---- Wave 2 (2026-08-21) ----
  'registered-nurse': registeredNurseRequirements,
  'licensed-practical-nurse': licensedPracticalNurseRequirements,
  pharmacist: pharmacistRequirements,
  'physical-therapist': physicalTherapistRequirements,
  'dental-hygienist': dentalHygienistRequirements,
  electrician: electricianRequirements,
  plumber: plumberRequirements,
  'hvac-technician': hvacTechnicianRequirements,
  'general-contractor': generalContractorRequirements,
  'professional-engineer': professionalEngineerRequirements,
  attorney: attorneyRequirements,
  'certified-public-accountant': certifiedPublicAccountantRequirements,
  emt: emtRequirements,
  'commercial-driver-license': commercialDriverLicenseRequirements,
  architect: architectRequirements,
}

/** All rows we have for an occupation (safe — never throws). */
export const getRequirements = (occupationId: string): LicenseRequirements[] =>
  REQUIREMENTS_BY_OCCUPATION[occupationId] ?? []

/** Single state row for an occupation, or undefined. */
export const getRequirement = (occupationId: string, stateCode: string): LicenseRequirements | undefined =>
  getRequirements(occupationId).find((r) => r.stateCode === stateCode)
