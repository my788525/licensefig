import type { LicenseRequirements } from '../types';

// HVAC Technician license requirements by state.
// Populated states are verified against official state boards as of 2026-08-21.
// States without a row = no verified data available yet (UI renders "—").
// IMPORTANT TRUTH: no state licenses individual HVAC technicians. EPA Section 608
// certification (federal) is required nationwide for anyone handling refrigerants.
// States that regulate HVAC at all do so at the CONTRACTOR level: TX (TDLR ACR),
// CA (CSLB C-20), AZ (ROC), FL (DBPR), GA (Conditioned Air), NC (heating), OH
// (OCILB) and MI (Mechanical Contractor). Rows below reflect that structure.
export const hvacTechnicianRequirements: LicenseRequirements[] = [
  {
    occupationId: 'hvac-technician',
    stateCode: 'TX',
    ageMinimum: 18,
    examVendor: { name: 'PSI', url: 'https://license.state.tx.us/acr/acrexam.htm' },
    exam: {
      passingPct: 70,
      examFee: 74, // Class A Environmental Air / Commercial Refrigeration exam
      timeLimitMin: 240,
    },
    applicationFee: 115, // TDLR ACR contractor application fee
    renewal: { years: 2 }, // ACR contractor licenses renew every 2 years
    reciprocity:
      'No blanket reciprocity — TDLR ACR contractor licenses are state-specific; EPA Section 608 (federal) is required for refrigerant handling',
    officialUrl: 'https://www.tdlr.texas.gov/acr/',
    officialName:
      'Texas Department of Licensing and Regulation (TDLR) — Air Conditioning and Refrigeration (ACR) Program',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'hvac-technician',
    stateCode: 'CA',
    ageMinimum: 18,
    backgroundCheck: true,
    examVendor: { name: 'PSI', url: 'https://www.cslb.ca.gov/' },
    exam: {
      passingPct: 72,
      timeLimitMin: 210, // Law & Business (115 q) and C-20 Trade (115 q) exams
    },
    applicationFee: 450, // CSLB original application fee (covers one classification)
    licenseFee: 200, // initial license fee, sole owner
    renewal: { years: 2 }, // no CE required for CSLB contractor renewal
    reciprocity:
      'Trade exam waiver available to licensees from some states (e.g. AZ, NV, UT, LA, NC) with 5+ years active; EPA Section 608 required',
    officialUrl: 'https://www.cslb.ca.gov',
    officialName: 'California Contractors State License Board (CSLB) — C-20 Warm-Air Heating, Ventilating and Air-Conditioning Contractor',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'hvac-technician',
    stateCode: 'AZ',
    ageMinimum: 18,
    backgroundCheck: true,
    examVendor: { name: 'PSI', url: 'https://www.psiexams.com/' },
    exam: {
      passingPct: 70,
    },
    reciprocity:
      'Endorsement with trade-exam waiver available for substantially similar out-of-state licenses (e.g. CA, NV, UT, LA, NC); EPA Section 608 required',
    officialUrl: 'https://roc.az.gov',
    officialName: 'Arizona Registrar of Contractors (ROC) — HVAC Contractor',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'hvac-technician',
    stateCode: 'FL',
    ageMinimum: 18,
    backgroundCheck: true,
    examVendor: { name: 'Professional Testing (Pearson VUE)' },
    exam: {
      passingPct: 70,
      examFee: 199, // per exam part (Business & Finance + Trade Knowledge)
      timeLimitMin: 390, // per part (Class A)
    },
    applicationFee: 249, // DBPR/CILB application fee (varies by cycle timing)
    renewal: { years: 2, ceHours: 14 },
    reciprocity:
      'No state-level technician license — FL licenses air-conditioning CONTRACTORS (Class A / Class B) via DBPR CILB; EPA Section 608 required',
    officialUrl: 'https://www.myfloridalicense.com/',
    officialName:
      'Florida Department of Business and Professional Regulation (DBPR) — Construction Industry Licensing Board',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'hvac-technician',
    stateCode: 'GA',
    ageMinimum: 18,
    examVendor: { name: 'PSI' },
    exam: {
      passingPct: 70,
      examFee: 267, // Conditioned Air Contractor exam fee (paid to PSI)
      timeLimitMin: 420, // 120 questions in two 3.5-hour parts
    },
    applicationFee: 30,
    licenseFee: 75,
    renewal: { years: 2, ceHours: 8 },
    reciprocity:
      'Reciprocity with Louisiana only (as of 2026); EPA Section 608 required — GA licenses Conditioned Air CONTRACTORS (Class I / Class II), not individual technicians',
    officialUrl: 'https://sos.ga.gov/georgia-construction-industry-licensing-board',
    officialName: 'Georgia Construction Industry Licensing Board (CILB) — Division of Conditioned Air Contractors',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'hvac-technician',
    stateCode: 'NC',
    ageMinimum: 18,
    examVendor: { name: 'State board', url: 'https://www.nclicensing.org' },
    exam: {
      passingPct: 70,
      examFee: 100,
      timeLimitMin: 240,
    },
    applicationFee: 50,
    licenseFee: 150,
    renewal: { years: 1, ceHours: 8 }, // 8 hrs CE incl. NC mechanical code updates
    reciprocity:
      'Trade-exam waiver for GA, SC and TN heating contractors; EPA Section 608 required — NC licenses Heating Contractors (Groups 1-3), not individual technicians',
    officialUrl: 'https://www.nclicensing.org',
    officialName:
      'North Carolina State Board of Examiners of Plumbing, Heating and Fire Sprinkler Contractors',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'hvac-technician',
    stateCode: 'OH',
    ageMinimum: 18,
    examVendor: { name: 'PSI' },
    reciprocity:
      'No state-level technician license — OCILB licenses HVAC contractors (commercial) at the state level; EPA Section 608 required',
    officialUrl: 'https://com.ohio.gov/divisions/ocilb',
    officialName:
      'Ohio Construction Industry Licensing Board (OCILB) — Ohio Department of Commerce',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'hvac-technician',
    stateCode: 'MI',
    ageMinimum: 18,
    educationLevel: 'High school diploma / GED',
    examVendor: { name: 'PSI' },
    licenseFee: 300, // Mechanical Contractor license
    renewal: { years: 3 },
    reciprocity:
      'None — qualifying experience must be gained under a Michigan-licensed Mechanical Contractor; EPA Section 608 required',
    officialUrl: 'https://www.michigan.gov/lara/bureau-list/bcc',
    officialName:
      'Michigan Department of Licensing and Regulatory Affairs (LARA) — Bureau of Construction Codes, Mechanical Division',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'hvac-technician',
    stateCode: 'WA',
    reciprocity:
      'No state HVAC technician license — EPA Section 608 (federal) is required for refrigerant handling; HVAC electrical connection work requires an L&I 06A specialty electrician certificate',
    officialUrl: 'https://lni.wa.gov/licensing-permits/electrical/',
    officialName: 'Washington State Department of Labor & Industries (L&I)',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'hvac-technician',
    stateCode: 'NY',
    reciprocity:
      'No state HVAC technician/contractor license — EPA Section 608 (federal) required; NYC DOB licenses oil-burner equipment installers locally',
    officialUrl: 'https://www.nyc.gov/site/buildings/business/licenses.page',
    officialName: 'New York City Department of Buildings (no state-level HVAC license in New York)',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'hvac-technician',
    stateCode: 'PA',
    reciprocity:
      'No state HVAC technician/contractor license — EPA Section 608 (federal) required; Pennsylvania does not license HVAC at the state level',
    officialUrl: 'https://www.pa.gov',
    officialName: 'Commonwealth of Pennsylvania (no state-level HVAC license)',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'hvac-technician',
    stateCode: 'IL',
    reciprocity:
      'No state HVAC technician/contractor license — EPA Section 608 (federal) required; licensing is municipal in Illinois',
    officialUrl: 'https://www.chicago.gov/city/en/depts/bldgs.html',
    officialName: 'City of Chicago Department of Buildings (no state-level HVAC license in Illinois)',
    retrieved: '2026-08-21',
  },
];

export { hvacTechnicianRequirements as hvac_technicianRequirements };
