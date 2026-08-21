import type { LicenseRequirements } from '../types';

// General Contractor license requirements by state.
// Populated states are verified against official state boards as of 2026-08-21.
// States without a row = no verified data available yet (UI renders "—").
// NOTE on licensing structure: CA (CSLB), FL (CILB), AZ (ROC), NC (NCLBGC) and GA
// (SLBRGC) issue state-level contractor licenses. WA uses a contractor REGISTRATION
// (no exam). TX, IL, OH, MI and NY have no state-level general contractor license;
// PA requires Home Improvement Contractor registration (no exam). Rows for those
// states carry a truthful note rather than invented figures.
export const generalContractorRequirements: LicenseRequirements[] = [
  {
    occupationId: 'general-contractor',
    stateCode: 'CA',
    ageMinimum: 18,
    backgroundCheck: true,
    examVendor: { name: 'PSI', url: 'https://www.cslb.ca.gov/' },
    exam: {
      passingPct: 72, // Law & Business exam and the B trade exam
    },
    applicationFee: 450, // CSLB original application fee (as of July 2026)
    licenseFee: 200, // initial license fee, sole owner
    renewal: { years: 2 }, // no CE required for CSLB contractor renewal
    reciprocity:
      'Trade exam waiver available to licensees from some states (e.g. AZ, NV, UT) with 5+ years active',
    officialUrl: 'https://www.cslb.ca.gov',
    officialName: 'California Contractors State License Board (CSLB) — Class B General Building Contractor',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'general-contractor',
    stateCode: 'FL',
    ageMinimum: 18,
    backgroundCheck: true,
    examVendor: { name: 'Professional Testing (Pearson VUE)' },
    exam: {
      passingPct: 70, // Business & Finance, Contract Administration and Project Management
      examFee: 199, // per exam part
    },
    applicationFee: 249, // DBPR/CILB application fee (varies by cycle timing)
    licenseFee: 209, // initial license fee, sole owner
    renewal: { years: 2, ceHours: 14 },
    reciprocity:
      'NASCLA-accredited exam accepted for trade parts; trade-exam waivers with some states (e.g. NC, LA, MS)',
    officialUrl: 'https://www.myfloridalicense.com/',
    officialName:
      'Florida Department of Business and Professional Regulation (DBPR) — Construction Industry Licensing Board, Certified General Contractor (CGC)',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'general-contractor',
    stateCode: 'AZ',
    ageMinimum: 18,
    backgroundCheck: true,
    examVendor: { name: 'PSI', url: 'https://www.psiexams.com/' },
    exam: {
      passingPct: 70, // AZ Statutes & Rules Exam + B-1/B-2/KB combined trade exam
    },
    applicationFee: 200,
    reciprocity:
      'Trade-exam waiver available to licensees from CA, NV and UT with 5+ years active; AZ Statutes & Rules exam still required',
    officialUrl: 'https://roc.az.gov',
    officialName: 'Arizona Registrar of Contractors (ROC) — General Contractor (B / B-1 / KB classifications)',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'general-contractor',
    stateCode: 'NC',
    ageMinimum: 18,
    examVendor: { name: 'PSI', url: 'https://www.psiexams.com/' },
    exam: {
      nationalQuestions: 90, // Building Contractor trade exam (Limited tier)
      passingPct: 70,
      timeLimitMin: 180,
    },
    applicationFee: 75, // Limited tier application fee
    renewal: { years: 1, ceHours: 8 },
    reciprocity:
      'Trade-exam waiver with 7 southeastern states (SC, TN, LA, GA, MS, AL, FL); NC Business & Law exam always required',
    officialUrl: 'https://www.nclbgc.org',
    officialName: 'North Carolina Licensing Board for General Contractors (NCLBGC)',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'general-contractor',
    stateCode: 'GA',
    ageMinimum: 21,
    backgroundCheck: true,
    examVendor: { name: 'PSI' },
    exam: {
      passingPct: 70, // Business & Law exam (trade portion may be waived by reciprocity)
    },
    applicationFee: 200,
    renewal: { years: 2 },
    reciprocity:
      'Reciprocity with LA, MS and SC (residential qualifying agent); Georgia Business & Law exam still required',
    officialUrl: 'https://sos.ga.gov/state-licensing-board-residential-and-general-contractors',
    officialName:
      'Georgia State Licensing Board for Residential and General Contractors (SLBRGC)',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'general-contractor',
    stateCode: 'WA',
    reciprocity:
      'Registration, not a license — no exam, no experience verification and no CE; L&I requires a $30,000 surety bond (GC, since July 1, 2024) plus general liability insurance; renewed biennially',
    officialUrl: 'https://www.lni.wa.gov/licensing-permits/contractors/',
    officialName:
      'Washington State Department of Labor & Industries (L&I) — Contractor Registration',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'general-contractor',
    stateCode: 'TX',
    reciprocity:
      'No state general contractor license — Texas does not license general contractors at the state level (only specified trades such as electricians, plumbers and HVAC are licensed by TDLR)',
    officialUrl: 'https://www.tdlr.texas.gov',
    officialName: 'Texas Department of Licensing and Regulation (TDLR)',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'general-contractor',
    stateCode: 'IL',
    reciprocity:
      'No state general contractor license — Illinois has no statewide contractor licensing; some municipalities (e.g. Chicago) require local registration',
    officialUrl: 'https://idfpr.illinois.gov',
    officialName: 'Illinois Department of Financial and Professional Regulation (IDFPR)',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'general-contractor',
    stateCode: 'OH',
    reciprocity:
      'No state general contractor license — Ohio does not license general contractors at the state level (OCILB covers specified trades only)',
    officialUrl: 'https://com.ohio.gov',
    officialName: 'Ohio Department of Commerce',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'general-contractor',
    stateCode: 'MI',
    reciprocity:
      'No state general contractor license — general contractor licensing is local in Michigan (LARA licenses specified trades only)',
    officialUrl: 'https://www.michigan.gov/lara',
    officialName: 'Michigan Department of Licensing and Regulatory Affairs (LARA)',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'general-contractor',
    stateCode: 'NY',
    reciprocity:
      'No state general contractor license — NYC DOB licenses general contractors locally; New York home-improvement contractors are covered by consumer-protection law rather than a state license',
    officialUrl: 'https://www.nyc.gov/site/buildings/business/licenses.page',
    officialName: 'New York City Department of Buildings (no state-level general contractor license)',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'general-contractor',
    stateCode: 'PA',
    reciprocity:
      'No state general contractor license — PA requires Home Improvement Contractor registration with the Office of Attorney General (no exam); some cities (e.g. Philadelphia, Pittsburgh) license locally',
    officialUrl: 'https://www.attorneygeneral.gov',
    officialName: 'Pennsylvania Office of Attorney General — Home Improvement Consumer Protection Act',
    retrieved: '2026-08-21',
  },
];

export { generalContractorRequirements as general_contractorRequirements };
