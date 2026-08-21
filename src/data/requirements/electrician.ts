import type { LicenseRequirements } from '../types';

// Electrician license requirements by state.
// Populated states are verified against official state boards as of 2026-08-21.
// States without a row = no verified data available yet (UI renders "—").
// NOTE on licensing structure: only CA, TX, WA and MI issue a state-level
// journeyman/certification credential. FL, GA, NC, OH and AZ license electrical
// CONTRACTORS at the state level (journeymen are not individually licensed);
// NY, PA and IL leave electrician licensing to cities/counties entirely.
// Rows for those states carry a truthful note rather than invented figures.
export const electricianRequirements: LicenseRequirements[] = [
  {
    occupationId: 'electrician',
    stateCode: 'CA',
    educationHours: 720, // related classroom instruction (General Electrician path)
    ageMinimum: 18,
    backgroundCheck: true,
    examVendor: { name: 'Pearson VUE', url: 'https://www.dir.ca.gov/dlse/ecu/ecu_testinfo.htm' },
    exam: {
      nationalQuestions: 100, // General Electrician exam: 100 questions, open-book NEC
      timeLimitMin: 270,
      passingPct: 70,
      retakeWait: '60 days after a failed exam',
      retakeFee: 100,
      examFee: 100,
    },
    applicationFee: 75,
    renewal: { years: 3, ceHours: 32 },
    reciprocity:
      'No formal reciprocity — CA issues certifications (not licenses) via DIR/DLSE; out-of-state hours/certifications are reviewed individually',
    officialUrl: 'https://www.dir.ca.gov/dlse/ecu/ElectricalTrade.html',
    officialName:
      'California Department of Industrial Relations — Division of Labor Standards Enforcement, Electrician Certification Unit',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'electrician',
    stateCode: 'TX',
    ageMinimum: 18,
    examVendor: { name: 'PSI', url: 'https://www.psiexams.com/' },
    exam: {
      nationalQuestions: 59, // NEC Knowledge portion (open-book, 2023 NEC)
      stateQuestions: 26, // Calculations portion
      timeLimitMin: 240, // 130 min + 110 min
      passingPct: 70,
      examFee: 78,
    },
    applicationFee: 30,
    renewal: { years: 1, ceHours: 4 },
    reciprocity:
      'Partial — no blanket reciprocity; TDLR may credit verifiable out-of-state experience toward the 8,000-hour requirement',
    officialUrl: 'https://www.tdlr.texas.gov/electricians/',
    officialName: 'Texas Department of Licensing and Regulation (TDLR) — Electrician Program',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'electrician',
    stateCode: 'WA',
    educationHours: 96, // basic classroom instruction for the 01 General Journey Level path
    ageMinimum: 18,
    examVendor: { name: 'PSI', url: 'https://www.psiexams.com/' },
    exam: {
      nationalQuestions: 60, // NEC & Theory portion
      stateQuestions: 17, // WA Laws & Rules portion
      timeLimitMin: 240, // 3 hours + 1 hour
      passingPct: 70,
      retakeWait: '14 days between retakes; after 3 failures wait 3 months',
    },
    applicationFee: 107.6,
    licenseFee: 160.6, // triennial certification fee
    renewal: { years: 3, ceHours: 24 }, // incl. 8 hrs NEC code update + 4 hrs RCW/WAC
    reciprocity:
      'Yes — Oregon only, for the 01 General Journey Level certificate (bilateral)',
    officialUrl: 'https://lni.wa.gov/licensing-permits/electrical/',
    officialName:
      'Washington State Department of Labor & Industries (L&I) — Electrical Program',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'electrician',
    stateCode: 'MI',
    ageMinimum: 20,
    examVendor: { name: 'PSI', url: 'https://www.psiexams.com/' },
    exam: {
      passingPct: 75,
      examFee: 100,
    },
    licenseFee: 40,
    renewal: { years: 1 }, // Journeyman license renewed annually (due December 31)
    reciprocity: 'No — Michigan does not hold reciprocity with any other state (per LARA)',
    officialUrl: 'https://www.michigan.gov/lara/bureau-list/bcc',
    officialName:
      'Michigan Department of Licensing and Regulatory Affairs (LARA) — Bureau of Construction Codes, Electrical Administrative Board',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'electrician',
    stateCode: 'FL',
    ageMinimum: 18,
    backgroundCheck: true,
    examVendor: { name: 'Pearson VUE' },
    reciprocity:
      'No state-level journeyman license — FL licenses electrical CONTRACTORS only (Certified EC statewide / Registered ER local) via the ECLB/DBPR; several counties (e.g. Miami-Dade, Broward) issue local journeyman licenses',
    officialUrl: 'https://www.myfloridalicense.com/',
    officialName:
      'Florida Department of Business and Professional Regulation (DBPR) — Electrical Contractors Licensing Board',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'electrician',
    stateCode: 'GA',
    ageMinimum: 21,
    examVendor: { name: 'PSI' },
    reciprocity:
      'No state-level journeyman license — GA licenses electrical CONTRACTORS (Class I restricted / Class II unrestricted) via the Construction Industry Licensing Board; individual electricians work under a contractor license',
    officialUrl: 'https://sos.ga.gov/georgia-construction-industry-licensing-board',
    officialName: 'Georgia Construction Industry Licensing Board (CILB) — Division of Electrical Contractors',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'electrician',
    stateCode: 'NC',
    ageMinimum: 18,
    examVendor: { name: 'PSI' },
    reciprocity:
      'Contractor-based licensing — the NC State Board of Examiners of Electrical Contractors licenses electrical contracting businesses (Limited/Intermediate/Unlimited); no state-issued journeyman license',
    officialUrl: 'https://www.ncbeec.org',
    officialName: 'North Carolina State Board of Examiners of Electrical Contractors',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'electrician',
    stateCode: 'OH',
    ageMinimum: 18,
    examVendor: { name: 'PSI' },
    reciprocity:
      'No state journeyman license — OCILB licenses electrical CONTRACTORS (commercial) at the state level; only the cities of Hamilton and Middletown require local journeyman licenses',
    officialUrl: 'https://com.ohio.gov/divisions/ocilb',
    officialName:
      'Ohio Construction Industry Licensing Board (OCILB) — Ohio Department of Commerce',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'electrician',
    stateCode: 'AZ',
    ageMinimum: 18,
    backgroundCheck: true,
    examVendor: { name: 'PSI' },
    reciprocity:
      'No state journeyman license — AZ licenses electrical contracting businesses (C-11 commercial / CR-11 residential / L-11 dual) via the Registrar of Contractors; some cities (Phoenix, Tucson) require local journeyman cards',
    officialUrl: 'https://roc.az.gov',
    officialName: 'Arizona Registrar of Contractors (ROC)',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'electrician',
    stateCode: 'NY',
    reciprocity:
      'No state license — electrician licensing is local in New York (NYC DOB Master/Special Electrician; upstate cities and counties license separately)',
    officialUrl: 'https://www.nyc.gov/site/buildings/industry/obtain-a-master-and-special-electrician-license.page',
    officialName: 'New York City Department of Buildings (licensing is at the local, not state, level)',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'electrician',
    stateCode: 'IL',
    reciprocity:
      'No state license — electrician licensing is municipal in Illinois (Chicago Department of Buildings; other municipalities vary); there is no statewide board, exam or license',
    officialUrl: 'https://www.chicago.gov/city/en/depts/bldgs.html',
    officialName: 'City of Chicago Department of Buildings (no state-level electrician license in Illinois)',
    retrieved: '2026-08-21',
  },
  {
    occupationId: 'electrician',
    stateCode: 'PA',
    reciprocity:
      'No state license — electrician licensing is local in Pennsylvania (Philadelphia, Pittsburgh and other municipalities); there is no state-level electrician board',
    officialUrl: 'https://www.phila.gov/departments/department-of-licenses-and-inspections/',
    officialName: 'Philadelphia Department of Licenses & Inspections (no state-level electrician license in Pennsylvania)',
    retrieved: '2026-08-21',
  },
];

// single-word slug: no separate snake_case alias needed
