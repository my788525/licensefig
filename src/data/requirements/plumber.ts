import type { LicenseRequirements } from '../types';

// Plumber license requirements by state.
// Populated states are verified against official state boards as of 2026-08-21.
// States without a row = no verified data available yet (UI renders "—").
// NOTE on licensing structure: TX (TSBPE), WA (L&I), MI (LARA), GA and NC issue
// state-level journeyman plumber credentials. CA, FL, AZ and OH license plumbing
// CONTRACTORS at the state level; NY, PA and IL leave plumbing licensing to local
// jurisdictions. Rows for those states carry a truthful note rather than invented figures.
export const plumberRequirements: LicenseRequirements[] = [
  {
    occupationId: 'plumber',
    stateCode: 'TX',
    educationHours: 48, // TSBPE-approved training course (waived if licensed in another state)
    ageMinimum: 18,
    backgroundCheck: true, // fingerprints required by Texas law for all applicants/examinees
    examVendor: { name: 'Pearson VUE', url: 'https://tsbpe.texas.gov/license-types/journeyman/' },
    exam: {
      examFee: 40,
      retakeWait: '30 days after a failed attempt, increasing with each retake; up to 5 attempts within 1 year',
    },
    applicationFee: 40,
    licenseFee: 40,
    renewal: { years: 1, ceHours: 6 },
    reciprocity:
      'No blanket reciprocity — TSBPE reviews each case; holding a journeyman/master license from another state waives the 48-hour training requirement',
    officialUrl: 'https://tsbpe.texas.gov/license-types/journeyman/',
    officialName: 'Texas State Board of Plumbing Examiners (TSBPE)',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'plumber',
    stateCode: 'WA',
    ageMinimum: 18,
    examVendor: { name: 'PSI' },
    exam: {
      passingPct: 70,
      examFee: 202.1, // L&I plumber examination fee
    },
    licenseFee: 242.7, // Journey Level / Residential / Residential Service certification fee
    renewal: { years: 2, ceHours: 16 }, // incl. min 8 hrs plumbing code + 4 hrs industry-related electrical
    reciprocity: 'Yes — Idaho only, for journey level plumbers (bilateral)',
    officialUrl: 'https://lni.wa.gov/licensing-permits/plumbing/',
    officialName:
      'Washington State Department of Labor & Industries (L&I) — Plumber Certification Program',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'plumber',
    stateCode: 'MI',
    ageMinimum: 18,
    examVendor: { name: 'PSI', url: 'https://www.psiexams.com/' },
    exam: {
      passingPct: 70,
      timeLimitMin: 180,
      examFee: 100,
    },
    applicationFee: 40,
    licenseFee: 40,
    renewal: { years: 1 }, // Journey Plumber license renewed annually (due April 30)
    reciprocity: 'No — Michigan does not have reciprocity agreements for plumbers',
    officialUrl: 'https://www.michigan.gov/lara/bureau-list/bcc',
    officialName:
      'Michigan Department of Licensing and Regulatory Affairs (LARA) — Bureau of Construction Codes, Plumbing Division',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'plumber',
    stateCode: 'GA',
    ageMinimum: 18,
    examVendor: { name: 'PSI' },
    exam: {
      passingPct: 70,
    },
    applicationFee: 40, // $30 application + $10 processing fee
    renewal: { years: 2, ceHours: 8 }, // even-numbered years (Nov 30 expiration); 8 hrs CE within 24 months
    reciprocity:
      'No — Georgia has no plumbing reciprocity agreements; out-of-state plumbers apply and pass the exam',
    officialUrl: 'https://sos.ga.gov/georgia-construction-industry-licensing-board',
    officialName: 'Georgia Construction Industry Licensing Board (CILB) — Division of Master Plumbers and Journeyman Plumbers',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'plumber',
    stateCode: 'NC',
    ageMinimum: 18,
    examVendor: { name: 'PSI' },
    exam: {
      passingPct: 70,
      examFee: 75,
    },
    applicationFee: 100, // exam application fee
    licenseFee: 75, // Plumbing Technician license (entry-level individual credential)
    renewal: { years: 1 }, // renewed annually by December 31; no CE required
    reciprocity:
      'Limited/none — NC licenses Plumbing Technicians and Plumbing Contractors (P-I/P-II); reciprocity is not offered for most paths',
    officialUrl: 'https://www.nclicensing.org',
    officialName:
      'North Carolina State Board of Examiners of Plumbing, Heating and Fire Sprinkler Contractors',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'plumber',
    stateCode: 'CA',
    reciprocity:
      'No state-level plumber license — plumbing contractors are licensed by the CSLB (C-36 Plumbing Contractor); journeymen are not state-licensed',
    officialUrl: 'https://www.cslb.ca.gov',
    officialName: 'California Contractors State License Board (CSLB)',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'plumber',
    stateCode: 'FL',
    reciprocity:
      'No state-level journeyman plumber license — DBPR licenses plumbing contractors (Certified/Registered)',
    officialUrl: 'https://www.myfloridalicense.com/',
    officialName: 'Florida Department of Business and Professional Regulation (DBPR)',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'plumber',
    stateCode: 'AZ',
    reciprocity:
      'No state-level journeyman plumber license — the Arizona Registrar of Contractors licenses plumbing contractors (C-37)',
    officialUrl: 'https://roc.az.gov',
    officialName: 'Arizona Registrar of Contractors (ROC)',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'plumber',
    stateCode: 'OH',
    reciprocity:
      'No state-level journeyman plumber license — OCILB licenses plumbing contractors (commercial) at the state level',
    officialUrl: 'https://com.ohio.gov/divisions/ocilb',
    officialName:
      'Ohio Construction Industry Licensing Board (OCILB) — Ohio Department of Commerce',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'plumber',
    stateCode: 'NY',
    reciprocity:
      'No state license — NYC DOB licenses master plumbers locally; other jurisdictions (counties, upstate cities) license separately',
    officialUrl: 'https://www.nyc.gov/site/buildings/business/licenses.page',
    officialName: 'New York City Department of Buildings (licensing is at the local, not state, level)',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'plumber',
    stateCode: 'IL',
    reciprocity:
      'No state license — plumber licensing is municipal in Illinois (Chicago and other local jurisdictions); there is no statewide plumbing license',
    officialUrl: 'https://www.chicago.gov/city/en/depts/bldgs.html',
    officialName: 'City of Chicago Department of Buildings (no state-level plumber license in Illinois)',
    retrieved: '2026-08-21',
  },
];

// single-word slug: no separate snake_case alias needed
