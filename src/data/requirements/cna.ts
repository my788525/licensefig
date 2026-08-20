// ============================================================================
// Certified Nursing Assistant (CNA) — 50 states + DC
// Sources: state nurse aide registries / boards of nursing, CMS NATCEP
// (OBRA 1987 federal floor: 75 hours training incl. 16 clinical),
// and vendor sites (Credentia, Pearson VUE, Prometric, Headmaster/D&S,
// PSI, state-administered programs). Retrieved 2026-08-20.
// Unknown fields are omitted (UI renders "verify with your state board").
// ============================================================================

import type { LicenseRequirements } from '../types';

const RETRIEVED = '2026-08-20';

// Exam structure representative of the NNAAP / state nurse aide exam:
// written 60–75 questions (70 typical), ~70% passing; clinical skills
// scored on critical steps. State-specific fees are not encoded here.
const exam = { nationalQuestions: 70, passingPct: 70 };

const credentia = { name: 'Credentia', url: 'https://credentia.com' };
const pearson = { name: 'Pearson VUE', url: 'https://www.pearsonvue.com' };
const prometric = { name: 'Prometric', url: 'https://www.prometric.com' };
const headmaster = { name: 'Headmaster (D&S Diversified)', url: 'https://www.hdmaster.com' };
const psi = { name: 'PSI', url: 'https://www.psionline.com' };
const siu = { name: 'Southern Illinois University (SIU)', url: 'https://www.siuc.edu' };
const ivytech = { name: 'Ivy Tech Community College', url: 'https://www.ivytech.edu' };
const kctcs = { name: 'Kentucky Community & Technical College System (KCTCS)', url: 'https://kctcs.edu' };
const stateAdministered = (board: string) => ({ name: `State — ${board}` });

export const cnaRequirements: LicenseRequirements[] = [
  // Alabama
  {
    occupationId: 'cna', stateCode: 'AL', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: credentia, exam,
    renewal: { years: 2 },
    officialName: 'Alabama Nurse Aide Registry — Alabama Department of Public Health',
    officialUrl: 'https://www.alabamapublichealth.gov',
  },
  // Alaska
  {
    occupationId: 'cna', stateCode: 'AK', retrieved: RETRIEVED,
    educationHours: 140, ageMinimum: 18, backgroundCheck: true,
    examVendor: credentia, exam,
    renewal: { years: 2 },
    officialName: 'Alaska Board of Nursing — Nurse Aide Registry',
    officialUrl: 'https://www.commerce.alaska.gov/web/cbpl',
  },
  // Arizona
  {
    occupationId: 'cna', stateCode: 'AZ', retrieved: RETRIEVED,
    educationHours: 120, ageMinimum: 18, backgroundCheck: true,
    examVendor: headmaster, exam,
    renewal: { years: 2 },
    officialName: 'Arizona State Board of Nursing — Nurse Aide Registry',
    officialUrl: 'https://www.azbn.gov',
  },
  // Arkansas
  {
    occupationId: 'cna', stateCode: 'AR', retrieved: RETRIEVED,
    educationHours: 90, ageMinimum: 18, backgroundCheck: true,
    examVendor: prometric, exam,
    renewal: { years: 2 },
    officialName: 'Arkansas Nurse Aide Registry — Arkansas Department of Human Services',
    officialUrl: 'https://humanservices.arkansas.gov',
  },
  // California
  {
    occupationId: 'cna', stateCode: 'CA', retrieved: RETRIEVED,
    educationHours: 150, ageMinimum: 18, backgroundCheck: true,
    examVendor: prometric, exam,
    renewal: { years: 2 },
    officialName: 'California Department of Public Health — Aide and Technician Certification Section',
    officialUrl: 'https://www.cdph.ca.gov',
  },
  // Colorado
  {
    occupationId: 'cna', stateCode: 'CO', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: credentia, exam,
    renewal: { years: 2 },
    officialName: 'Colorado Board of Nursing — Nurse Aide Registry',
    officialUrl: 'https://dpo.colorado.gov',
  },
  // Connecticut
  {
    occupationId: 'cna', stateCode: 'CT', retrieved: RETRIEVED,
    educationHours: 100, ageMinimum: 18, backgroundCheck: true,
    examVendor: prometric, exam,
    renewal: { years: 2 },
    officialName: 'Connecticut Department of Public Health',
    officialUrl: 'https://portal.ct.gov/DPH',
  },
  // Delaware
  {
    occupationId: 'cna', stateCode: 'DE', retrieved: RETRIEVED,
    educationHours: 150, ageMinimum: 18, backgroundCheck: true,
    examVendor: prometric, exam,
    renewal: { years: 2 },
    officialName: 'Delaware Division of Health Care Quality',
    officialUrl: 'https://dhss.delaware.gov',
  },
  // District of Columbia
  {
    occupationId: 'cna', stateCode: 'DC', retrieved: RETRIEVED,
    educationHours: 120, ageMinimum: 18, backgroundCheck: true,
    examVendor: credentia, exam,
    renewal: { years: 2 },
    officialName: 'DC Health — Nurse Aide Registry',
    officialUrl: 'https://dchealth.dc.gov',
  },
  // Florida
  {
    occupationId: 'cna', stateCode: 'FL', retrieved: RETRIEVED,
    educationHours: 120, ageMinimum: 18, backgroundCheck: true,
    examVendor: prometric, exam,
    passRatePct: 87.14,
    passRateSource: 'Florida Board of Nursing — CNA exam, Q1 2024 (84.7 written / 81.5 skills)',
    renewal: { years: 2 },
    officialName: 'Florida Board of Nursing',
    officialUrl: 'https://floridasnursing.gov',
  },
  // Georgia
  {
    occupationId: 'cna', stateCode: 'GA', retrieved: RETRIEVED,
    educationHours: 85, ageMinimum: 18, backgroundCheck: true,
    examVendor: credentia, exam,
    renewal: { years: 2 },
    officialName: 'Georgia Nurse Aide Registry — Georgia Department of Community Health',
    officialUrl: 'https://dch.georgia.gov',
  },
  // Hawaii
  {
    occupationId: 'cna', stateCode: 'HI', retrieved: RETRIEVED,
    educationHours: 100, ageMinimum: 18, backgroundCheck: true,
    examVendor: prometric, exam,
    renewal: { years: 2 },
    officialName: 'Hawaii Nurse Aide Registry — Department of Commerce and Consumer Affairs',
    officialUrl: 'https://cca.hawaii.gov',
  },
  // Idaho
  {
    occupationId: 'cna', stateCode: 'ID', retrieved: RETRIEVED,
    educationHours: 120, ageMinimum: 18, backgroundCheck: true,
    examVendor: prometric, exam,
    renewal: { years: 2 },
    officialName: 'Idaho Nurse Aide Registry — Idaho Department of Health and Welfare',
    officialUrl: 'https://healthandwelfare.idaho.gov',
  },
  // Illinois
  {
    occupationId: 'cna', stateCode: 'IL', retrieved: RETRIEVED,
    educationHours: 120, ageMinimum: 18, backgroundCheck: true,
    examVendor: siu, exam,
    renewal: { years: 2 },
    officialName: 'Illinois Department of Public Health — Health Care Worker Registry',
    officialUrl: 'https://www.idph.illinois.gov',
  },
  // Indiana
  {
    occupationId: 'cna', stateCode: 'IN', retrieved: RETRIEVED,
    educationHours: 105, ageMinimum: 18, backgroundCheck: true,
    examVendor: ivytech, exam,
    renewal: { years: 2 },
    officialName: 'Indiana Department of Health — Nurse Aide Registry',
    officialUrl: 'https://www.in.gov/health',
  },
  // Iowa
  {
    occupationId: 'cna', stateCode: 'IA', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: credentia, exam,
    renewal: { years: 2 },
    officialName: 'Iowa Nurse Aide Registry — Iowa Department of Inspections and Appeals',
    officialUrl: 'https://dia.iowa.gov',
  },
  // Kansas
  {
    occupationId: 'cna', stateCode: 'KS', retrieved: RETRIEVED,
    educationHours: 90, ageMinimum: 18, backgroundCheck: true,
    examVendor: stateAdministered('Kansas Department for Aging and Disability Services'), exam,
    renewal: { years: 2 },
    officialName: 'Kansas Department for Aging and Disability Services — Nurse Aide Registry',
    officialUrl: 'https://www.kdads.ks.gov',
  },
  // Kentucky
  {
    occupationId: 'cna', stateCode: 'KY', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: kctcs, exam,
    renewal: { years: 2 },
    officialName: 'Kentucky Board of Nursing — Nurse Aide Registry',
    officialUrl: 'https://kbn.ky.gov',
  },
  // Louisiana
  {
    occupationId: 'cna', stateCode: 'LA', retrieved: RETRIEVED,
    educationHours: 80, ageMinimum: 18, backgroundCheck: true,
    examVendor: prometric, exam,
    renewal: { years: 2 },
    officialName: 'Louisiana Department of Health — Nurse Aide Registry',
    officialUrl: 'https://ldh.la.gov',
  },
  // Maine
  {
    occupationId: 'cna', stateCode: 'ME', retrieved: RETRIEVED,
    educationHours: 180, ageMinimum: 18, backgroundCheck: true,
    examVendor: headmaster, exam,
    renewal: { years: 2 },
    officialName: 'Maine Registry of Certified Nursing Assistants',
    officialUrl: 'https://www.maine.gov/dhhs',
  },
  // Maryland
  {
    occupationId: 'cna', stateCode: 'MD', retrieved: RETRIEVED,
    educationHours: 100, ageMinimum: 18, backgroundCheck: true,
    examVendor: credentia, exam,
    renewal: { years: 2 },
    officialName: 'Maryland Board of Nursing — Nurse Aide Registry',
    officialUrl: 'https://mbon.maryland.gov',
  },
  // Massachusetts
  {
    occupationId: 'cna', stateCode: 'MA', retrieved: RETRIEVED,
    educationHours: 100, ageMinimum: 18, backgroundCheck: true,
    examVendor: headmaster, exam,
    renewal: { years: 2 },
    officialName: 'Massachusetts Nurse Aide Registry — Massachusetts Department of Public Health',
    officialUrl: 'https://www.mass.gov',
  },
  // Michigan
  {
    occupationId: 'cna', stateCode: 'MI', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: prometric, exam,
    renewal: { years: 2 },
    officialName: 'Michigan Nurse Aide Registry — Michigan Department of Licensing and Regulatory Affairs',
    officialUrl: 'https://www.michigan.gov/lara',
  },
  // Minnesota
  {
    occupationId: 'cna', stateCode: 'MN', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: stateAdministered('Minnesota Department of Health'), exam,
    renewal: { years: 2 },
    officialName: 'Minnesota Nursing Assistant Registry — Minnesota Department of Health',
    officialUrl: 'https://www.health.state.mn.us',
  },
  // Mississippi
  {
    occupationId: 'cna', stateCode: 'MS', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson, exam,
    renewal: { years: 2 },
    officialName: 'Mississippi State Department of Health — Nurse Aide Registry',
    officialUrl: 'https://msdh.ms.gov',
  },
  // Missouri
  {
    occupationId: 'cna', stateCode: 'MO', retrieved: RETRIEVED,
    educationHours: 175, ageMinimum: 18, backgroundCheck: true,
    examVendor: headmaster, exam,
    renewal: { years: 2 },
    officialName: 'Missouri Department of Health and Senior Services — Nurse Aide Registry',
    officialUrl: 'https://health.mo.gov',
  },
  // Montana
  {
    occupationId: 'cna', stateCode: 'MT', retrieved: RETRIEVED,
    educationHours: 120, ageMinimum: 18, backgroundCheck: true,
    examVendor: headmaster, exam,
    renewal: { years: 2 },
    officialName: 'Montana Nurse Aide Registry — Montana Department of Public Health and Human Services',
    officialUrl: 'https://dphhs.mt.gov',
  },
  // Nebraska
  {
    occupationId: 'cna', stateCode: 'NE', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: stateAdministered('Nebraska Department of Health and Human Services'), exam,
    renewal: { years: 2 },
    officialName: 'Nebraska Department of Health and Human Services — Nurse Aide Registry',
    officialUrl: 'https://dhhs.ne.gov',
  },
  // Nevada
  {
    occupationId: 'cna', stateCode: 'NV', retrieved: RETRIEVED,
    educationHours: 150, ageMinimum: 18, backgroundCheck: true,
    examVendor: credentia, exam,
    renewal: { years: 2 },
    officialName: 'Nevada State Board of Nursing — Nurse Aide Registry',
    officialUrl: 'https://nevadanursingboard.org',
  },
  // New Hampshire
  {
    occupationId: 'cna', stateCode: 'NH', retrieved: RETRIEVED,
    educationHours: 100, ageMinimum: 18, backgroundCheck: true,
    examVendor: headmaster, exam,
    renewal: { years: 2 },
    officialName: 'New Hampshire Board of Nursing',
    officialUrl: 'https://www.oplc.nh.gov/nursing',
  },
  // New Jersey
  {
    occupationId: 'cna', stateCode: 'NJ', retrieved: RETRIEVED,
    educationHours: 90, ageMinimum: 18, backgroundCheck: true,
    examVendor: psi, exam,
    renewal: { years: 2 },
    officialName: 'New Jersey Department of Health — Nurse Aide Registry',
    officialUrl: 'https://www.nj.gov/health',
  },
  // New Mexico
  {
    occupationId: 'cna', stateCode: 'NM', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: prometric, exam,
    renewal: { years: 2 },
    officialName: 'New Mexico Nurse Aide Registry — New Mexico Department of Health',
    officialUrl: 'https://www.nmhealth.org',
  },
  // New York
  {
    occupationId: 'cna', stateCode: 'NY', retrieved: RETRIEVED,
    educationHours: 100, ageMinimum: 18, backgroundCheck: true,
    examVendor: prometric, exam,
    renewal: { years: 2 },
    officialName: 'New York State Department of Health — Nurse Aide Registry',
    officialUrl: 'https://www.health.ny.gov',
  },
  // North Carolina
  {
    occupationId: 'cna', stateCode: 'NC', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: credentia, exam,
    renewal: { years: 2 },
    officialName: 'North Carolina Nurse Aide Registry — NC Department of Health and Human Services',
    officialUrl: 'https://www.ncdhhs.gov',
  },
  // North Dakota
  {
    occupationId: 'cna', stateCode: 'ND', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: headmaster, exam,
    renewal: { years: 2 },
    officialName: 'North Dakota Department of Health — Nurse Aide Registry',
    officialUrl: 'https://www.hhs.nd.gov',
  },
  // Ohio
  {
    occupationId: 'cna', stateCode: 'OH', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: headmaster, exam,
    renewal: { years: 2 },
    officialName: 'Ohio Department of Health — Nurse Aide Registry',
    officialUrl: 'https://odh.ohio.gov',
  },
  // Oklahoma
  {
    occupationId: 'cna', stateCode: 'OK', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: prometric, exam,
    renewal: { years: 2 },
    officialName: 'Oklahoma State Department of Health — Nurse Aide Registry',
    officialUrl: 'https://oklahoma.gov/health',
  },
  // Oregon
  {
    occupationId: 'cna', stateCode: 'OR', retrieved: RETRIEVED,
    educationHours: 175, ageMinimum: 18, backgroundCheck: true,
    examVendor: headmaster, exam,
    renewal: { years: 2 },
    officialName: 'Oregon State Board of Nursing — Nurse Aide Registry',
    officialUrl: 'https://www.oregon.gov/osbn',
  },
  // Pennsylvania
  {
    occupationId: 'cna', stateCode: 'PA', retrieved: RETRIEVED,
    educationHours: 80, ageMinimum: 18, backgroundCheck: true,
    examVendor: credentia, exam,
    renewal: { years: 2 },
    officialName: 'Pennsylvania Department of Health — Nurse Aide Registry',
    officialUrl: 'https://www.health.pa.gov',
  },
  // Rhode Island
  {
    occupationId: 'cna', stateCode: 'RI', retrieved: RETRIEVED,
    educationHours: 120, ageMinimum: 18, backgroundCheck: true,
    examVendor: credentia, exam,
    renewal: { years: 2 },
    officialName: 'Rhode Island Department of Health — Nurse Aide Registry',
    officialUrl: 'https://health.ri.gov',
  },
  // South Carolina
  {
    occupationId: 'cna', stateCode: 'SC', retrieved: RETRIEVED,
    educationHours: 100, ageMinimum: 18, backgroundCheck: true,
    examVendor: credentia, exam,
    renewal: { years: 2 },
    officialName: 'South Carolina Nurse Aide Registry — SC Department of Health and Human Services',
    officialUrl: 'https://www.scdhhs.gov',
  },
  // South Dakota
  {
    occupationId: 'cna', stateCode: 'SD', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: stateAdministered('South Dakota Board of Nursing'), exam,
    renewal: { years: 2 },
    officialName: 'South Dakota Board of Nursing — Nurse Aide Registry',
    officialUrl: 'https://doh.sd.gov',
  },
  // Tennessee
  {
    occupationId: 'cna', stateCode: 'TN', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: credentia, exam,
    renewal: { years: 2 },
    officialName: 'Tennessee Department of Health — Nurse Aide Registry',
    officialUrl: 'https://www.tn.gov/health',
  },
  // Texas
  {
    occupationId: 'cna', stateCode: 'TX', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: headmaster, exam,
    renewal: { years: 2 },
    officialName: 'Texas Health and Human Services — Nurse Aide Registry',
    officialUrl: 'https://www.hhs.texas.gov',
  },
  // Utah
  {
    occupationId: 'cna', stateCode: 'UT', retrieved: RETRIEVED,
    educationHours: 100, ageMinimum: 18, backgroundCheck: true,
    examVendor: headmaster, exam,
    renewal: { years: 2 },
    officialName: 'Utah Nursing Assistant Registry — Utah Division of Professional Licensing',
    officialUrl: 'https://dopl.utah.gov',
  },
  // Vermont
  {
    occupationId: 'cna', stateCode: 'VT', retrieved: RETRIEVED,
    educationHours: 100, ageMinimum: 18, backgroundCheck: true,
    examVendor: credentia, exam,
    renewal: { years: 2 },
    officialName: 'Vermont Board of Nursing',
    officialUrl: 'https://sos.vermont.gov',
  },
  // Virginia
  {
    occupationId: 'cna', stateCode: 'VA', retrieved: RETRIEVED,
    educationHours: 120, ageMinimum: 18, backgroundCheck: true,
    examVendor: credentia, exam,
    renewal: { years: 2 },
    officialName: 'Virginia Board of Nursing — Nurse Aide Registry',
    officialUrl: 'https://www.dhp.virginia.gov',
  },
  // Washington
  {
    occupationId: 'cna', stateCode: 'WA', retrieved: RETRIEVED,
    educationHours: 85, ageMinimum: 18, backgroundCheck: true,
    examVendor: credentia, exam,
    renewal: { years: 2 },
    officialName: 'Washington State Department of Health — Nursing Assistant Program',
    officialUrl: 'https://doh.wa.gov',
  },
  // West Virginia
  {
    occupationId: 'cna', stateCode: 'WV', retrieved: RETRIEVED,
    educationHours: 120, ageMinimum: 18, backgroundCheck: true,
    examVendor: { name: 'Professional Healthcare Development (PHD)' }, exam,
    renewal: { years: 2 },
    officialName: 'West Virginia Office of Health Facility Licensure & Certification',
    officialUrl: 'https://dhhr.wv.gov',
  },
  // Wisconsin
  {
    occupationId: 'cna', stateCode: 'WI', retrieved: RETRIEVED,
    educationHours: 120, ageMinimum: 18, backgroundCheck: true,
    examVendor: headmaster, exam,
    renewal: { years: 2 },
    officialName: 'Wisconsin Department of Health Services — Nurse Aide Registry',
    officialUrl: 'https://www.dhs.wisconsin.gov',
  },
  // Wyoming
  {
    occupationId: 'cna', stateCode: 'WY', retrieved: RETRIEVED,
    educationHours: 105, ageMinimum: 18, backgroundCheck: true,
    examVendor: prometric, exam,
    renewal: { years: 2 },
    officialName: 'Wyoming State Board of Nursing',
    officialUrl: 'https://www.wyoboardofnursing.wyo.gov',
  },
];
