// ============================================================================
// Barber — 50 states + DC
// Regulated by state cosmetology/barber boards (or TDLR / DBPR style agencies).
// Written + practical ("State board") exam in nearly every state. Training hours
// vary widely (600–1500+). Unknown fields omitted (UI renders "verify with your
// state board"). Retrieved 2026-08-20.
//
// Fee/renewal additions verified 2026-08-20 via official sources:
//   CA — examFee $75, licenseFee $50, renewal 2 yr  CA Code Regs. Title 16 §998
//        https://shared-govt.westlaw.com/calregs/Document/IE9BFA7B076C211F0A403A5163E2D806C
//   NY — app fee $40, license/renewal $40, exam $15 written + $15 practical,
//        4-yr term (corrected from 3)  https://dos.ny.gov/node/64686
//   TX — applicationFee $50  https://www.tdlr.texas.gov/barbering-and-cosmetology/
// ============================================================================

import type { LicenseRequirements } from '../types';

const RETRIEVED = '2026-08-20';
const stateExam = { name: 'State board' };

export const barberRequirements: LicenseRequirements[] = [
  { occupationId: 'barber', stateCode: 'AL', educationHours: 1500, ageMinimum: 18, backgroundCheck: true, examVendor: stateExam, officialName: 'Alabama Board of Cosmetology and Barbering', officialUrl: 'https://www.cosmetology.alabama.gov', retrieved: RETRIEVED },
  { occupationId: 'barber', stateCode: 'AK', ageMinimum: 18, backgroundCheck: true, examVendor: stateExam, officialName: 'Alaska Board of Barbers and Hairdressers', officialUrl: 'https://www.commerce.alaska.gov/web/cbpl', retrieved: RETRIEVED },
  { occupationId: 'barber', stateCode: 'AZ', ageMinimum: 18, backgroundCheck: true, examVendor: stateExam, officialName: 'Arizona State Board of Cosmetology — Barbering', officialUrl: 'https://cosmetology.az.gov', retrieved: RETRIEVED },
  { occupationId: 'barber', stateCode: 'AR', educationHours: 1500, ageMinimum: 18, backgroundCheck: true, examVendor: stateExam, officialName: 'Arkansas State Board of Cosmetology — Barbering', officialUrl: 'https://www.arkcosmetology.org', retrieved: RETRIEVED },
  { occupationId: 'barber', stateCode: 'CA', educationHours: 1500, ageMinimum: 18, backgroundCheck: true, examVendor: stateExam, renewal: { years: 2 }, exam: { examFee: 75 }, licenseFee: 50, officialName: 'California Board of Barbering and Cosmetology', officialUrl: 'https://www.barbercosmo.ca.gov', retrieved: RETRIEVED },
  { occupationId: 'barber', stateCode: 'CO', ageMinimum: 18, backgroundCheck: true, examVendor: stateExam, officialName: 'Colorado Office of Barber and Cosmetology Licensure', officialUrl: 'https://dpo.colorado.gov/BarberCosmetology', retrieved: RETRIEVED },
  { occupationId: 'barber', stateCode: 'CT', educationHours: 1000, ageMinimum: 18, backgroundCheck: true, examVendor: stateExam, officialName: 'Connecticut Department of Public Health — Barbering and Cosmetology', officialUrl: 'https://portal.ct.gov/DPH', retrieved: RETRIEVED },
  { occupationId: 'barber', stateCode: 'DE', ageMinimum: 18, backgroundCheck: true, examVendor: stateExam, officialName: 'Delaware Board of Cosmetology and Barbering', officialUrl: 'https://dpr.delaware.gov', retrieved: RETRIEVED },
  { occupationId: 'barber', stateCode: 'DC', ageMinimum: 18, backgroundCheck: true, examVendor: stateExam, officialName: 'DC Board of Cosmetology — Barbering', officialUrl: 'https://dcra.dc.gov', retrieved: RETRIEVED },
  { occupationId: 'barber', stateCode: 'FL', educationHours: 1200, backgroundCheck: true, examVendor: stateExam, renewal: { years: 2 }, officialName: 'Florida Department of Business and Professional Regulation — Board of Barbering', officialUrl: 'https://www.myfloridalicense.com', retrieved: RETRIEVED },
  { occupationId: 'barber', stateCode: 'GA', educationHours: 1500, ageMinimum: 18, backgroundCheck: true, examVendor: stateExam, officialName: 'Georgia State Board of Barbering', officialUrl: 'https://sos.ga.gov', retrieved: RETRIEVED },
  { occupationId: 'barber', stateCode: 'HI', ageMinimum: 18, backgroundCheck: true, examVendor: stateExam, officialName: 'Hawaii Board of Cosmetology — Barbering', officialUrl: 'https://cca.hawaii.gov/pvl', retrieved: RETRIEVED },
  { occupationId: 'barber', stateCode: 'ID', ageMinimum: 18, backgroundCheck: true, examVendor: stateExam, officialName: 'Idaho Board of Occupational Licenses — Barbering', officialUrl: 'https://ibol.idaho.gov', retrieved: RETRIEVED },
  { occupationId: 'barber', stateCode: 'IL', educationHours: 1500, ageMinimum: 18, backgroundCheck: true, examVendor: stateExam, renewal: { years: 2 }, officialName: 'Illinois Department of Financial and Professional Regulation — Barber', officialUrl: 'https://idfpr.illinois.gov', retrieved: RETRIEVED },
  { occupationId: 'barber', stateCode: 'IN', educationHours: 1500, ageMinimum: 18, backgroundCheck: true, examVendor: stateExam, officialName: 'Indiana State Board of Cosmetology and Barber Examiners', officialUrl: 'https://www.in.gov/pla', retrieved: RETRIEVED },
  { occupationId: 'barber', stateCode: 'IA', ageMinimum: 18, backgroundCheck: true, examVendor: stateExam, officialName: 'Iowa Board of Cosmetology Arts and Sciences — Barbering', officialUrl: 'https://dial.iowa.gov', retrieved: RETRIEVED },
  { occupationId: 'barber', stateCode: 'KS', educationHours: 1500, ageMinimum: 18, backgroundCheck: true, examVendor: stateExam, officialName: 'Kansas State Board of Barbering', retrieved: RETRIEVED },
  { occupationId: 'barber', stateCode: 'KY', ageMinimum: 18, backgroundCheck: true, examVendor: stateExam, officialName: 'Kentucky State Board of Hairdressers and Cosmetologists — Barbering', retrieved: RETRIEVED },
  { occupationId: 'barber', stateCode: 'LA', ageMinimum: 18, backgroundCheck: true, examVendor: stateExam, officialName: 'Louisiana State Board of Cosmetology — Barbering', officialUrl: 'https://www.lsbce.org', retrieved: RETRIEVED },
  { occupationId: 'barber', stateCode: 'ME', ageMinimum: 18, backgroundCheck: true, examVendor: stateExam, officialName: 'Maine Board of Barbering and Cosmetology', officialUrl: 'https://www.maine.gov/pfr/professionallicensing', retrieved: RETRIEVED },
  { occupationId: 'barber', stateCode: 'MD', educationHours: 1500, ageMinimum: 18, backgroundCheck: true, examVendor: stateExam, officialName: 'Maryland Board of Barbers', officialUrl: 'https://www.dllr.state.md.us', retrieved: RETRIEVED },
  { occupationId: 'barber', stateCode: 'MA', ageMinimum: 18, backgroundCheck: true, examVendor: stateExam, officialName: 'Massachusetts Board of Registration of Cosmetology and Barbering', officialUrl: 'https://www.mass.gov', retrieved: RETRIEVED },
  { occupationId: 'barber', stateCode: 'MI', ageMinimum: 18, backgroundCheck: true, examVendor: stateExam, renewal: { years: 2 }, officialName: 'Michigan Bureau of Professional Licensing — Board of Barber Examiners', officialUrl: 'https://www.michigan.gov/lara', retrieved: RETRIEVED },
  { occupationId: 'barber', stateCode: 'MN', educationHours: 1500, ageMinimum: 18, backgroundCheck: true, examVendor: stateExam, officialName: 'Minnesota Board of Barber and Cosmetologist Examiners', officialUrl: 'https://mn.gov/boards/barber-cosmetologist', retrieved: RETRIEVED },
  { occupationId: 'barber', stateCode: 'MS', educationHours: 1500, ageMinimum: 18, backgroundCheck: true, examVendor: stateExam, officialName: 'Mississippi State Board of Cosmetology — Barbering', officialUrl: 'https://www.msboc.us', retrieved: RETRIEVED },
  { occupationId: 'barber', stateCode: 'MO', educationHours: 1500, ageMinimum: 18, backgroundCheck: true, examVendor: stateExam, officialName: 'Missouri Board of Cosmetology and Barber Examiners', officialUrl: 'https://pr.mo.gov', retrieved: RETRIEVED },
  { occupationId: 'barber', stateCode: 'MT', ageMinimum: 18, backgroundCheck: true, examVendor: stateExam, officialName: 'Montana Board of Barbers and Cosmetologists', officialUrl: 'https://boards.bsd.dli.mt.gov', retrieved: RETRIEVED },
  { occupationId: 'barber', stateCode: 'NE', ageMinimum: 18, backgroundCheck: true, examVendor: stateExam, officialName: 'Nebraska Department of Health and Human Services — Barbering', officialUrl: 'https://dhhs.ne.gov', retrieved: RETRIEVED },
  { occupationId: 'barber', stateCode: 'NV', educationHours: 1000, ageMinimum: 18, backgroundCheck: true, examVendor: stateExam, officialName: 'Nevada State Board of Cosmetology — Barbering', officialUrl: 'https://nscosmetology.nv.gov', retrieved: RETRIEVED },
  { occupationId: 'barber', stateCode: 'NH', ageMinimum: 18, backgroundCheck: true, examVendor: stateExam, officialName: 'New Hampshire Board of Barbering and Cosmetology', officialUrl: 'https://www.oplc.nh.gov', retrieved: RETRIEVED },
  { occupationId: 'barber', stateCode: 'NJ', educationHours: 600, ageMinimum: 18, backgroundCheck: true, examVendor: stateExam, officialName: 'New Jersey Board of Cosmetology and Hairstyling — Barbering', officialUrl: 'https://www.njconsumeraffairs.gov', retrieved: RETRIEVED },
  { occupationId: 'barber', stateCode: 'NM', ageMinimum: 18, backgroundCheck: true, examVendor: stateExam, officialName: 'New Mexico Board of Barbers and Cosmetologists', officialUrl: 'https://www.rld.nm.gov', retrieved: RETRIEVED },
  { occupationId: 'barber', stateCode: 'NY', ageMinimum: 18, backgroundCheck: true, examVendor: stateExam, renewal: { years: 4 }, applicationFee: 40, licenseFee: 40, exam: { examFee: 15 }, officialName: 'New York Department of State — Barbering', officialUrl: 'https://dos.ny.gov', retrieved: RETRIEVED },
  { occupationId: 'barber', stateCode: 'NC', ageMinimum: 18, backgroundCheck: true, examVendor: stateExam, officialName: 'North Carolina State Board of Cosmetic Art Examiners — Barbering', officialUrl: 'https://www.nccosmeticarts.com', retrieved: RETRIEVED },
  { occupationId: 'barber', stateCode: 'ND', ageMinimum: 18, backgroundCheck: true, examVendor: stateExam, officialName: 'North Dakota State Board of Cosmetology — Barbering', retrieved: RETRIEVED },
  { occupationId: 'barber', stateCode: 'OH', ageMinimum: 18, backgroundCheck: true, examVendor: stateExam, officialName: 'Ohio State Cosmetology Board — Barbering', officialUrl: 'https://cos.ohio.gov', retrieved: RETRIEVED },
  { occupationId: 'barber', stateCode: 'OK', educationHours: 1500, ageMinimum: 18, backgroundCheck: true, examVendor: stateExam, officialName: 'Oklahoma State Board of Cosmetology and Barbering', retrieved: RETRIEVED },
  { occupationId: 'barber', stateCode: 'OR', ageMinimum: 18, backgroundCheck: true, examVendor: stateExam, officialName: 'Oregon Board of Cosmetology — Barbering', officialUrl: 'https://www.oregon.gov/ohlo', retrieved: RETRIEVED },
  { occupationId: 'barber', stateCode: 'PA', educationHours: 1250, ageMinimum: 18, backgroundCheck: true, examVendor: stateExam, officialName: 'Pennsylvania State Board of Barber Examiners', officialUrl: 'https://www.dos.pa.gov', retrieved: RETRIEVED },
  { occupationId: 'barber', stateCode: 'RI', ageMinimum: 18, backgroundCheck: true, examVendor: stateExam, officialName: 'Rhode Island Board of Hairdressers, Cosmetology and Barbering', officialUrl: 'https://health.ri.gov', retrieved: RETRIEVED },
  { occupationId: 'barber', stateCode: 'SC', educationHours: 1500, ageMinimum: 18, backgroundCheck: true, examVendor: stateExam, officialName: 'South Carolina Board of Barbering', officialUrl: 'https://llr.sc.gov', retrieved: RETRIEVED },
  { occupationId: 'barber', stateCode: 'SD', ageMinimum: 18, backgroundCheck: true, examVendor: stateExam, officialName: 'South Dakota Cosmetology Commission — Barbering', officialUrl: 'https://dlr.sd.gov', retrieved: RETRIEVED },
  { occupationId: 'barber', stateCode: 'TN', educationHours: 1500, ageMinimum: 18, backgroundCheck: true, examVendor: stateExam, officialName: 'Tennessee Board of Cosmetology and Barber Examiners', officialUrl: 'https://www.tn.gov/commerce', retrieved: RETRIEVED },
  { occupationId: 'barber', stateCode: 'TX', ageMinimum: 18, backgroundCheck: true, examVendor: stateExam, renewal: { years: 2 }, applicationFee: 50, officialName: 'Texas Department of Licensing and Regulation (TDLR)', officialUrl: 'https://www.tdlr.texas.gov', retrieved: RETRIEVED },
  { occupationId: 'barber', stateCode: 'UT', ageMinimum: 18, backgroundCheck: true, examVendor: stateExam, officialName: 'Utah Division of Professional Licensing — Barber/Cosmetology', officialUrl: 'https://dopl.utah.gov', retrieved: RETRIEVED },
  { occupationId: 'barber', stateCode: 'VT', ageMinimum: 18, backgroundCheck: true, examVendor: stateExam, officialName: 'Vermont Board of Barbers and Cosmetologists', officialUrl: 'https://sos.vermont.gov', retrieved: RETRIEVED },
  { occupationId: 'barber', stateCode: 'VA', educationHours: 1500, ageMinimum: 18, backgroundCheck: true, examVendor: stateExam, renewal: { years: 2 }, officialName: 'Virginia Board for Barbers and Cosmetology', officialUrl: 'https://www.dpor.virginia.gov', retrieved: RETRIEVED },
  { occupationId: 'barber', stateCode: 'WA', ageMinimum: 18, backgroundCheck: true, examVendor: stateExam, officialName: 'Washington State Department of Licensing — Barbering', officialUrl: 'https://www.dol.wa.gov', retrieved: RETRIEVED },
  { occupationId: 'barber', stateCode: 'WV', ageMinimum: 18, backgroundCheck: true, examVendor: stateExam, officialName: 'West Virginia Board of Barbers and Cosmetologists', officialUrl: 'https://wvbc.us', retrieved: RETRIEVED },
  { occupationId: 'barber', stateCode: 'WI', ageMinimum: 18, backgroundCheck: true, examVendor: stateExam, officialName: 'Wisconsin Department of Safety and Professional Services — Barbering', officialUrl: 'https://dsps.wi.gov', retrieved: RETRIEVED },
  { occupationId: 'barber', stateCode: 'WY', ageMinimum: 18, backgroundCheck: true, examVendor: stateExam, officialName: 'Wyoming Board of Cosmetology — Barbering', retrieved: RETRIEVED },
];
