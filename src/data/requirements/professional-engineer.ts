import type { LicenseRequirements } from '../types';

// Professional Engineer license requirements by state.
// Populated states are verified against official state boards as of 2026-08-21.
// States without a row = no verified data available yet (UI renders "—").
// Common structure across states: ABET-accredited engineering degree, FE exam
// ($225, NCEES), then 4 years of progressive experience and the PE exam ($400,
// NCEES) — both administered at Pearson VUE. Passing standard is 70 (NCEES scaled
// score). Every state board licenses PEs; fees, renewal cycles and PDH differ.
export const professionalEngineerRequirements: LicenseRequirements[] = [
  {
    occupationId: 'professional-engineer',
    stateCode: 'CA',
    educationLevel: 'ABET-accredited engineering degree',
    examVendor: { name: 'NCEES (Pearson VUE)', url: 'https://ncees.org/exams/' },
    exam: {
      passingPct: 70, // NCEES scaled passing standard
      examFee: 400, // NCEES PE exam fee
      retakeWait: 'Up to 3 attempts per 12-month period (NCEES)',
    },
    applicationFee: 175,
    renewal: { years: 2 }, // no CE required in California
    reciprocity:
      'Yes — comity via NCEES Record; CA requires additional state-specific exams for civil engineers (Seismic Principles + Surveying)',
    officialUrl: 'https://www.bpelsg.ca.gov',
    officialName:
      'California Board for Professional Engineers, Land Surveyors, and Geologists (BPELSG)',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'professional-engineer',
    stateCode: 'TX',
    educationLevel: 'ABET-accredited engineering degree',
    examVendor: { name: 'NCEES (Pearson VUE)', url: 'https://ncees.org/exams/' },
    exam: {
      passingPct: 70, // NCEES scaled passing standard
      examFee: 400, // NCEES PE exam fee
      retakeWait: 'Up to 3 attempts per 12-month period (NCEES)',
    },
    renewal: { years: 2, ceHours: 30 }, // 30 PDH/2-yr (min 2 ethics) after the 2026 transition to two-year renewals
    reciprocity: 'Yes — comity via NCEES Record / Model Law Engineer',
    officialUrl: 'https://www.pels.texas.gov',
    officialName: 'Texas Board of Professional Engineers and Land Surveyors (TBPELS)',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'professional-engineer',
    stateCode: 'FL',
    educationLevel: 'ABET-accredited engineering degree',
    examVendor: { name: 'NCEES (Pearson VUE)', url: 'https://ncees.org/exams/' },
    exam: {
      passingPct: 70, // NCEES scaled passing standard
      examFee: 400, // NCEES PE exam fee
      retakeWait: 'Up to 3 attempts per 12-month period (NCEES)',
    },
    applicationFee: 230, // FBPE application for licensure ($130 non-refundable)
    renewal: { years: 2, ceHours: 18 }, // incl. 1 hr laws & rules + 1 hr ethics
    reciprocity: 'Yes — comity via NCEES Record / Model Law Engineer',
    officialUrl: 'https://fbpe.org',
    officialName: 'Florida Board of Professional Engineers (FBPE)',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'professional-engineer',
    stateCode: 'NY',
    educationLevel: 'ABET-accredited engineering degree',
    examVendor: { name: 'NCEES (Pearson VUE)', url: 'https://ncees.org/exams/' },
    exam: {
      passingPct: 70, // NCEES scaled passing standard
      examFee: 400, // NCEES PE exam fee
      retakeWait: 'Up to 3 attempts per 12-month period (NCEES)',
    },
    applicationFee: 135, // NYSED application fee; $377 total covers application + first 3-year registration
    licenseFee: 242, // first 3-year registration fee
    renewal: { years: 3, ceHours: 36 }, // incl. 1 hr ethics + 1 hr standards of practice
    reciprocity: 'Yes — endorsement by evaluation of substantially equivalent requirements',
    officialUrl: 'https://www.op.nysed.gov/professions/engineering',
    officialName: 'New York State Education Department — Office of the Professions',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'professional-engineer',
    stateCode: 'PA',
    educationLevel: 'ABET-accredited engineering degree',
    examVendor: { name: 'NCEES (Pearson VUE)', url: 'https://ncees.org/exams/' },
    exam: {
      passingPct: 70, // NCEES scaled passing standard
      examFee: 400, // NCEES PE exam fee
      retakeWait: 'Up to 3 attempts per 12-month period (NCEES)',
    },
    licenseFee: 50, // initial licensing fee
    renewal: { years: 2, ceHours: 24 }, // 24 PDH per biennium
    reciprocity: 'Yes — comity via NCEES Record / Act 41 endorsement',
    officialUrl:
      'https://www.dos.pa.gov/ProfessionalLicensing/BoardsCommissions/EngineersLandSurveyorsandGeologists',
    officialName:
      'Pennsylvania State Registration Board for Professional Engineers, Land Surveyors and Geologists',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'professional-engineer',
    stateCode: 'IL',
    educationLevel: 'ABET-accredited engineering degree',
    examVendor: { name: 'NCEES (Pearson VUE)', url: 'https://ncees.org/exams/' },
    exam: {
      passingPct: 70, // NCEES scaled passing standard
      examFee: 400, // NCEES PE exam fee
      retakeWait: 'Up to 3 attempts per 12-month period (NCEES)',
    },
    applicationFee: 175, // per 68 Ill. Admin. Code 1380.275
    renewal: { years: 2, ceHours: 30 }, // incl. 1 PDH ethics + 1 PDH laws & rules
    reciprocity: 'Yes — endorsement/reciprocity evaluated individually by IDFPR',
    officialUrl: 'https://idfpr.illinois.gov/profs/profengineer.asp',
    officialName:
      'Illinois Department of Financial and Professional Regulation (IDFPR)',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'professional-engineer',
    stateCode: 'OH',
    educationLevel: 'ABET-accredited engineering degree',
    examVendor: { name: 'NCEES (Pearson VUE)', url: 'https://ncees.org/exams/' },
    exam: {
      passingPct: 70, // NCEES scaled passing standard
      examFee: 400, // NCEES PE exam fee
      retakeWait: 'Up to 3 attempts per 12-month period (NCEES)',
    },
    licenseFee: 40, // initial registration fee
    renewal: { years: 2, ceHours: 30 }, // 30 CPD hrs incl. 2 hrs ethics
    reciprocity: 'Yes — comity via NCEES Record',
    officialUrl: 'https://www.peps.ohio.gov',
    officialName: 'Ohio Board of Professional Engineers and Surveyors',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'professional-engineer',
    stateCode: 'GA',
    educationLevel: 'ABET-accredited engineering degree',
    examVendor: { name: 'NCEES (Pearson VUE)', url: 'https://ncees.org/exams/' },
    exam: {
      passingPct: 70, // NCEES scaled passing standard
      examFee: 400, // NCEES PE exam fee
      retakeWait: 'Up to 3 attempts per 12-month period (NCEES)',
    },
    applicationFee: 100, // per PELS Board fee schedule (post HB 476)
    renewal: { years: 1, ceHours: 15 }, // annual renewal, 15 PDH per year
    reciprocity: 'Yes — comity via NCEES Record; Mutual Recognition Agreement (UK) available',
    officialUrl: 'https://pels.georgia.gov',
    officialName: 'Georgia Professional Engineers and Land Surveyors Board (PELS)',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'professional-engineer',
    stateCode: 'NC',
    educationLevel: 'ABET-accredited engineering degree',
    examVendor: { name: 'NCEES (Pearson VUE)', url: 'https://ncees.org/exams/' },
    exam: {
      passingPct: 70, // NCEES scaled passing standard
      examFee: 400, // NCEES PE exam fee
      retakeWait: 'Up to 3 attempts per 12-month period (NCEES)',
    },
    applicationFee: 75,
    renewal: { years: 1, ceHours: 15 }, // annual renewal, 15 PDH incl. 1 hr ethics
    reciprocity: 'Yes — comity via NCEES Record / Model Law Engineer',
    officialUrl: 'https://www.ncbels.org',
    officialName:
      'North Carolina Board of Examiners for Engineers and Surveyors (NCBELS)',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'professional-engineer',
    stateCode: 'MI',
    educationLevel: 'ABET-accredited engineering degree',
    examVendor: { name: 'NCEES (Pearson VUE)', url: 'https://ncees.org/exams/' },
    exam: {
      passingPct: 70, // NCEES scaled passing standard
      examFee: 400, // NCEES PE exam fee
      retakeWait: 'Up to 3 attempts per 12-month period (NCEES)',
    },
    renewal: { years: 2, ceHours: 30 }, // 30 PDH per biennium (15 for first renewal cycle)
    reciprocity: 'Yes — comity via NCEES Record',
    officialUrl: 'https://www.michigan.gov/lara/bureau-list/bpl/occ/prof/engineers',
    officialName:
      'Michigan Department of Licensing and Regulatory Affairs (LARA) — Bureau of Professional Licensing',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'professional-engineer',
    stateCode: 'WA',
    educationLevel: 'ABET-accredited engineering degree',
    examVendor: { name: 'NCEES (Pearson VUE)', url: 'https://ncees.org/exams/' },
    exam: {
      passingPct: 70, // NCEES scaled passing standard
      examFee: 400, // NCEES PE exam fee
      retakeWait: 'Up to 3 attempts per 12-month period (NCEES)',
    },
    applicationFee: 65, // exam application fee (includes application, license and wall certificate)
    renewal: { years: 2 }, // no CE required for PE renewal in Washington
    reciprocity: 'Yes — comity via NCEES Record',
    officialUrl: 'https://www.dol.wa.gov/business/engineerslandsurveyors/',
    officialName:
      'Washington State Board of Registration for Professional Engineers and Land Surveyors (BRPELS)',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'professional-engineer',
    stateCode: 'AZ',
    educationLevel: 'ABET-accredited engineering degree',
    examVendor: { name: 'NCEES (Pearson VUE)', url: 'https://ncees.org/exams/' },
    exam: {
      passingPct: 70, // NCEES scaled passing standard
      examFee: 400, // NCEES PE exam fee
      retakeWait: 'Up to 3 attempts per 12-month period (NCEES)',
    },
    renewal: { years: 3 }, // triennial renewal from original registration date; no CE required
    reciprocity: 'Yes — comity via NCEES Record',
    officialUrl: 'https://btr.az.gov',
    officialName: 'Arizona State Board of Technical Registration (BTR)',
    retrieved: '2026-08-21',
  },
];

export { professionalEngineerRequirements as professional_engineerRequirements };
