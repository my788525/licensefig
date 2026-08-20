// ============================================================================
// Massage Therapist — 50 states + DC
// Most states license through the Massage & Bodywork Licensing Examination
// (MBLEx) from FSMTB; a few use a state exam. Pre-license training commonly
// 500–750 hours. Several states (KS, MN, MO, VT, WY, AK, AL) do NOT have a
// state-level license — those are bare rows. Unknown fields omitted (UI
// renders "verify with your state board"). Retrieved 2026-08-20.
// ============================================================================

import type { LicenseRequirements } from '../types';

const RETRIEVED = '2026-08-20';
const mblex = { name: 'FSMTB (MBLEx)' };

export const massage_therapistRequirements: LicenseRequirements[] = [
  // --- States with a massage license (MBLEx is the standard exam) ---
  { occupationId: 'massage-therapist', stateCode: 'AL', retrieved: RETRIEVED },
  { occupationId: 'massage-therapist', stateCode: 'AK', retrieved: RETRIEVED },
  { occupationId: 'massage-therapist', stateCode: 'AZ', educationHours: 500, ageMinimum: 18, backgroundCheck: true, examVendor: mblex, officialName: 'Arizona State Board of Massage Therapy', retrieved: RETRIEVED },
  { occupationId: 'massage-therapist', stateCode: 'AR', educationHours: 500, ageMinimum: 18, backgroundCheck: true, examVendor: mblex, officialName: 'Arkansas State Board of Massage Therapy', officialUrl: 'https://www.armassage.org', retrieved: RETRIEVED },
  { occupationId: 'massage-therapist', stateCode: 'CA', educationHours: 500, ageMinimum: 18, backgroundCheck: true, examVendor: mblex, officialName: 'California Massage Therapy Council (CAMTC)', officialUrl: 'https://www.camtc.org', retrieved: RETRIEVED },
  { occupationId: 'massage-therapist', stateCode: 'CO', educationHours: 500, ageMinimum: 18, backgroundCheck: true, examVendor: mblex, officialName: 'Colorado State Board of Massage Therapy', officialUrl: 'https://dpo.colorado.gov/Massage', retrieved: RETRIEVED },
  { occupationId: 'massage-therapist', stateCode: 'CT', educationHours: 500, ageMinimum: 18, backgroundCheck: true, examVendor: mblex, officialName: 'Connecticut Department of Public Health — Massage Therapy', officialUrl: 'https://portal.ct.gov/DPH', retrieved: RETRIEVED },
  { occupationId: 'massage-therapist', stateCode: 'DE', educationHours: 500, ageMinimum: 18, backgroundCheck: true, examVendor: mblex, officialName: 'Delaware Board of Massage and Bodywork', officialUrl: 'https://dpr.delaware.gov', retrieved: RETRIEVED },
  { occupationId: 'massage-therapist', stateCode: 'DC', educationHours: 500, ageMinimum: 18, backgroundCheck: true, examVendor: mblex, officialName: 'DC Board of Massage Therapy', officialUrl: 'https://dcra.dc.gov', retrieved: RETRIEVED },
  { occupationId: 'massage-therapist', stateCode: 'FL', educationHours: 500, ageMinimum: 18, backgroundCheck: true, examVendor: mblex, renewal: { years: 2 }, officialName: 'Florida Board of Massage Therapy', officialUrl: 'https://www.myfloridalicense.com', retrieved: RETRIEVED },
  { occupationId: 'massage-therapist', stateCode: 'GA', educationHours: 500, ageMinimum: 18, backgroundCheck: true, examVendor: mblex, officialName: 'Georgia State Board of Massage Therapy', officialUrl: 'https://sos.ga.gov', retrieved: RETRIEVED },
  { occupationId: 'massage-therapist', stateCode: 'HI', educationHours: 500, ageMinimum: 18, backgroundCheck: true, examVendor: mblex, officialName: 'Hawaii Board of Massage Therapy', officialUrl: 'https://cca.hawaii.gov/pvl', retrieved: RETRIEVED },
  { occupationId: 'massage-therapist', stateCode: 'ID', educationHours: 500, ageMinimum: 18, backgroundCheck: true, examVendor: mblex, officialName: 'Idaho State Board of Massage Therapy', officialUrl: 'https://ibol.idaho.gov', retrieved: RETRIEVED },
  { occupationId: 'massage-therapist', stateCode: 'IL', educationHours: 500, ageMinimum: 18, backgroundCheck: true, examVendor: mblex, renewal: { years: 2 }, officialName: 'Illinois Department of Financial and Professional Regulation — Massage Therapy', officialUrl: 'https://idfpr.illinois.gov', retrieved: RETRIEVED },
  { occupationId: 'massage-therapist', stateCode: 'IN', retrieved: RETRIEVED },
  { occupationId: 'massage-therapist', stateCode: 'IA', educationHours: 500, ageMinimum: 18, backgroundCheck: true, examVendor: mblex, officialName: 'Iowa Board of Massage Therapy', officialUrl: 'https://dial.iowa.gov', retrieved: RETRIEVED },
  { occupationId: 'massage-therapist', stateCode: 'KS', retrieved: RETRIEVED },
  { occupationId: 'massage-therapist', stateCode: 'KY', educationHours: 600, ageMinimum: 18, backgroundCheck: true, examVendor: mblex, officialName: 'Kentucky Board of Licensure for Massage Therapy', officialUrl: 'https://blc.ky.gov', retrieved: RETRIEVED },
  { occupationId: 'massage-therapist', stateCode: 'LA', educationHours: 500, ageMinimum: 18, backgroundCheck: true, examVendor: mblex, officialName: 'Louisiana Board of Massage Therapy', officialUrl: 'https://www.labmt.org', retrieved: RETRIEVED },
  { occupationId: 'massage-therapist', stateCode: 'ME', educationHours: 500, ageMinimum: 18, backgroundCheck: true, examVendor: mblex, officialName: 'Maine State Board of Massage Therapy', officialUrl: 'https://www.maine.gov/pfr/professionallicensing', retrieved: RETRIEVED },
  { occupationId: 'massage-therapist', stateCode: 'MD', educationHours: 500, ageMinimum: 18, backgroundCheck: true, examVendor: mblex, officialName: 'Maryland Board of Massage Therapy Examiners', officialUrl: 'https://www.dllr.state.md.us', retrieved: RETRIEVED },
  { occupationId: 'massage-therapist', stateCode: 'MA', educationHours: 500, ageMinimum: 18, backgroundCheck: true, examVendor: mblex, officialName: 'Massachusetts Board of Registration of Massage Therapy', officialUrl: 'https://www.mass.gov', retrieved: RETRIEVED },
  { occupationId: 'massage-therapist', stateCode: 'MI', educationHours: 500, ageMinimum: 18, backgroundCheck: true, examVendor: mblex, renewal: { years: 2 }, officialName: 'Michigan Board of Massage Therapy', officialUrl: 'https://www.michigan.gov/lara', retrieved: RETRIEVED },
  { occupationId: 'massage-therapist', stateCode: 'MN', retrieved: RETRIEVED },
  { occupationId: 'massage-therapist', stateCode: 'MS', educationHours: 500, ageMinimum: 18, backgroundCheck: true, examVendor: mblex, officialName: 'Mississippi State Board of Massage Therapy', officialUrl: 'https://msdh.ms.gov', retrieved: RETRIEVED },
  { occupationId: 'massage-therapist', stateCode: 'MO', retrieved: RETRIEVED },
  { occupationId: 'massage-therapist', stateCode: 'MT', educationHours: 500, ageMinimum: 18, backgroundCheck: true, examVendor: mblex, officialName: 'Montana Board of Massage Therapy', officialUrl: 'https://boards.bsd.dli.mt.gov', retrieved: RETRIEVED },
  { occupationId: 'massage-therapist', stateCode: 'NE', educationHours: 1000, ageMinimum: 18, backgroundCheck: true, examVendor: mblex, officialName: 'Nebraska Department of Health and Human Services — Massage Therapy', officialUrl: 'https://dhhs.ne.gov', retrieved: RETRIEVED },
  { occupationId: 'massage-therapist', stateCode: 'NV', educationHours: 500, ageMinimum: 18, backgroundCheck: true, examVendor: mblex, officialName: 'Nevada State Board of Massage Therapy', retrieved: RETRIEVED },
  { occupationId: 'massage-therapist', stateCode: 'NH', educationHours: 600, ageMinimum: 18, backgroundCheck: true, examVendor: mblex, officialName: 'New Hampshire Board of Massage Therapy', officialUrl: 'https://www.oplc.nh.gov', retrieved: RETRIEVED },
  { occupationId: 'massage-therapist', stateCode: 'NJ', educationHours: 500, ageMinimum: 18, backgroundCheck: true, examVendor: mblex, officialName: 'New Jersey Board of Massage, Bodywork and Somatic Therapy', officialUrl: 'https://www.njconsumeraffairs.gov', retrieved: RETRIEVED },
  { occupationId: 'massage-therapist', stateCode: 'NM', educationHours: 650, ageMinimum: 18, backgroundCheck: true, examVendor: mblex, officialName: 'New Mexico Board of Massage Therapy', officialUrl: 'https://www.rld.nm.gov', retrieved: RETRIEVED },
  { occupationId: 'massage-therapist', stateCode: 'NY', educationHours: 1000, ageMinimum: 18, backgroundCheck: true, examVendor: mblex, officialName: 'New York State Education Department — Massage Therapy', officialUrl: 'https://www.op.nysed.gov', retrieved: RETRIEVED },
  { occupationId: 'massage-therapist', stateCode: 'NC', educationHours: 500, ageMinimum: 18, backgroundCheck: true, examVendor: mblex, officialName: 'North Carolina Board of Massage and Bodywork Therapy', officialUrl: 'https://www.ncbmbt.org', retrieved: RETRIEVED },
  { occupationId: 'massage-therapist', stateCode: 'ND', educationHours: 750, ageMinimum: 18, backgroundCheck: true, examVendor: mblex, officialName: 'North Dakota Board of Massage Therapy', retrieved: RETRIEVED },
  { occupationId: 'massage-therapist', stateCode: 'OH', educationHours: 750, ageMinimum: 18, backgroundCheck: true, examVendor: mblex, officialName: 'Ohio State Medical Board — Massage Therapy', officialUrl: 'https://med.ohio.gov', retrieved: RETRIEVED },
  { occupationId: 'massage-therapist', stateCode: 'OK', retrieved: RETRIEVED },
  { occupationId: 'massage-therapist', stateCode: 'OR', educationHours: 500, ageMinimum: 18, backgroundCheck: true, examVendor: mblex, officialName: 'Oregon Board of Massage Therapists', retrieved: RETRIEVED },
  { occupationId: 'massage-therapist', stateCode: 'PA', educationHours: 600, ageMinimum: 18, backgroundCheck: true, examVendor: mblex, officialName: 'Pennsylvania State Board of Massage Therapy', officialUrl: 'https://www.dos.pa.gov', retrieved: RETRIEVED },
  { occupationId: 'massage-therapist', stateCode: 'RI', educationHours: 500, ageMinimum: 18, backgroundCheck: true, examVendor: mblex, officialName: 'Rhode Island Board of Massage Therapy', officialUrl: 'https://health.ri.gov', retrieved: RETRIEVED },
  { occupationId: 'massage-therapist', stateCode: 'SC', educationHours: 500, ageMinimum: 18, backgroundCheck: true, examVendor: mblex, officialName: 'South Carolina Board of Massage/Bodywork Therapy', officialUrl: 'https://llr.sc.gov', retrieved: RETRIEVED },
  { occupationId: 'massage-therapist', stateCode: 'SD', ageMinimum: 18, backgroundCheck: true, examVendor: mblex, officialName: 'South Dakota Department of Labor and Regulation — Massage Therapy', officialUrl: 'https://dlr.sd.gov', retrieved: RETRIEVED },
  { occupationId: 'massage-therapist', stateCode: 'TN', educationHours: 500, ageMinimum: 18, backgroundCheck: true, examVendor: mblex, officialName: 'Tennessee Board of Massage Licensure', officialUrl: 'https://www.tn.gov/commerce', retrieved: RETRIEVED },
  { occupationId: 'massage-therapist', stateCode: 'TX', educationHours: 500, ageMinimum: 18, backgroundCheck: true, examVendor: mblex, renewal: { years: 2 }, officialName: 'Texas Department of Licensing and Regulation (TDLR) — Massage Therapy', officialUrl: 'https://www.tdlr.texas.gov', retrieved: RETRIEVED },
  { occupationId: 'massage-therapist', stateCode: 'UT', educationHours: 600, ageMinimum: 18, backgroundCheck: true, examVendor: mblex, officialName: 'Utah Division of Professional Licensing — Massage Therapy', officialUrl: 'https://dopl.utah.gov', retrieved: RETRIEVED },
  { occupationId: 'massage-therapist', stateCode: 'VT', retrieved: RETRIEVED },
  { occupationId: 'massage-therapist', stateCode: 'VA', educationHours: 500, ageMinimum: 18, backgroundCheck: true, examVendor: mblex, officialName: 'Virginia Board of Nursing — Massage Therapy', officialUrl: 'https://www.dhp.virginia.gov', retrieved: RETRIEVED },
  { occupationId: 'massage-therapist', stateCode: 'WA', educationHours: 700, ageMinimum: 18, backgroundCheck: true, examVendor: mblex, officialName: 'Washington State Department of Health — Massage Therapy', officialUrl: 'https://www.doh.wa.gov', retrieved: RETRIEVED },
  { occupationId: 'massage-therapist', stateCode: 'WV', educationHours: 500, ageMinimum: 18, backgroundCheck: true, examVendor: mblex, officialName: 'West Virginia Board of Massage Therapy', retrieved: RETRIEVED },
  { occupationId: 'massage-therapist', stateCode: 'WI', educationHours: 600, ageMinimum: 18, backgroundCheck: true, examVendor: mblex, officialName: 'Wisconsin Department of Safety and Professional Services — Massage Therapy', officialUrl: 'https://dsps.wi.gov', retrieved: RETRIEVED },
  { occupationId: 'massage-therapist', stateCode: 'WY', retrieved: RETRIEVED },
];
