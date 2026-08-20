// ============================================================================
// Home Inspector — 50 states + DC
// State licensing varies widely: several states license with an exam
// (e.g., TX, NY, NJ, MA, CT), some register inspectors, and many states
// (CA, CO, NC, WA, VT, WY, etc.) have NO state-level home inspector license —
// those are bare rows. Unknown fields omitted (UI renders "verify with your
// state board"). Retrieved 2026-08-20.
// ============================================================================

import type { LicenseRequirements } from '../types';

const RETRIEVED = '2026-08-20';
const stateExam = { name: 'State board' };

export const home_inspectorRequirements: LicenseRequirements[] = [
  // --- States that license/register home inspectors ---
  { occupationId: 'home-inspector', stateCode: 'TX', ageMinimum: 18, educationHours: 210, examVendor: stateExam, officialName: 'Texas Real Estate Commission (TREC)', officialUrl: 'https://www.trec.texas.gov', retrieved: RETRIEVED },
  { occupationId: 'home-inspector', stateCode: 'NY', ageMinimum: 18, educationHours: 100, backgroundCheck: true, examVendor: stateExam, officialName: 'New York Department of State — Division of Licensing Services', officialUrl: 'https://dos.ny.gov', retrieved: RETRIEVED },
  { occupationId: 'home-inspector', stateCode: 'NJ', ageMinimum: 18, educationHours: 100, backgroundCheck: true, examVendor: stateExam, officialName: 'New Jersey Department of Community Affairs — Division of Codes and Standards', officialUrl: 'https://www.nj.gov/dca', retrieved: RETRIEVED },
  { occupationId: 'home-inspector', stateCode: 'PA', ageMinimum: 18, educationHours: 120, backgroundCheck: true, examVendor: stateExam, officialName: 'Pennsylvania State Board of Home Inspectors', officialUrl: 'https://www.dos.pa.gov', retrieved: RETRIEVED },
  { occupationId: 'home-inspector', stateCode: 'MA', ageMinimum: 18, educationHours: 75, backgroundCheck: true, examVendor: stateExam, officialName: 'Massachusetts Board of Registration of Home Inspectors', officialUrl: 'https://www.mass.gov', retrieved: RETRIEVED },
  { occupationId: 'home-inspector', stateCode: 'CT', ageMinimum: 18, educationHours: 200, backgroundCheck: true, examVendor: stateExam, officialName: 'Connecticut Department of Consumer Protection — Home Inspector Licensing', officialUrl: 'https://portal.ct.gov/DCP', retrieved: RETRIEVED },
  { occupationId: 'home-inspector', stateCode: 'VA', ageMinimum: 18, examVendor: stateExam, officialName: 'Virginia Department of Professional and Occupational Regulation — Home Inspector Board', officialUrl: 'https://www.dpor.virginia.gov', retrieved: RETRIEVED },
  { occupationId: 'home-inspector', stateCode: 'FL', ageMinimum: 18, educationHours: 120, examVendor: stateExam, officialName: 'Florida Department of Business and Professional Regulation (DBPR) — Home Inspectors', officialUrl: 'https://www.myfloridalicense.com', retrieved: RETRIEVED },
  { occupationId: 'home-inspector', stateCode: 'IL', ageMinimum: 18, educationHours: 60, backgroundCheck: true, examVendor: stateExam, officialName: 'Illinois Department of Financial and Professional Regulation (IDFPR) — Home Inspector', officialUrl: 'https://idfpr.illinois.gov', retrieved: RETRIEVED },
  { occupationId: 'home-inspector', stateCode: 'SC', ageMinimum: 18, examVendor: stateExam, officialName: 'South Carolina Department of Labor, Licensing and Regulation (LLR) — Residential Home Inspector', officialUrl: 'https://llr.sc.gov', retrieved: RETRIEVED },
  { occupationId: 'home-inspector', stateCode: 'TN', ageMinimum: 18, backgroundCheck: true, examVendor: stateExam, officialName: 'Tennessee Department of Commerce and Insurance — Home Inspectors', officialUrl: 'https://www.tn.gov/commerce', retrieved: RETRIEVED },
  { occupationId: 'home-inspector', stateCode: 'MD', ageMinimum: 18, officialName: 'Maryland Commission of Real Estate Appraisers and Home Inspectors', officialUrl: 'https://www.dllr.state.md.us', retrieved: RETRIEVED },
  { occupationId: 'home-inspector', stateCode: 'MI', ageMinimum: 18, backgroundCheck: true, officialName: 'Michigan Bureau of Professional Licensing — Home Inspectors', officialUrl: 'https://www.michigan.gov/lara', retrieved: RETRIEVED },
  { occupationId: 'home-inspector', stateCode: 'OR', ageMinimum: 18, backgroundCheck: true, examVendor: stateExam, officialName: 'Oregon Construction Contractors Board — Home Inspection', officialUrl: 'https://www.oregon.gov/ccb', retrieved: RETRIEVED },
  { occupationId: 'home-inspector', stateCode: 'HI', ageMinimum: 18, officialName: 'Hawaii Department of Commerce and Consumer Affairs — Home Inspector Licensing', officialUrl: 'https://cca.hawaii.gov/pvl', retrieved: RETRIEVED },
  { occupationId: 'home-inspector', stateCode: 'GA', ageMinimum: 18, officialName: 'Georgia Secretary of State — Home Inspectors', officialUrl: 'https://sos.ga.gov', retrieved: RETRIEVED },
  { occupationId: 'home-inspector', stateCode: 'LA', ageMinimum: 18, backgroundCheck: true, examVendor: stateExam, officialName: 'Louisiana State Board of Home Inspectors', officialUrl: 'https://www.lsbhi.org', retrieved: RETRIEVED },
  { occupationId: 'home-inspector', stateCode: 'NV', ageMinimum: 18, officialName: 'Nevada Department of Business and Industry — Real Estate Division, Home Inspectors', officialUrl: 'https://red.nv.gov', retrieved: RETRIEVED },
  { occupationId: 'home-inspector', stateCode: 'UT', ageMinimum: 18, officialName: 'Utah Division of Professional Licensing — Home Inspector', officialUrl: 'https://dopl.utah.gov', retrieved: RETRIEVED },
  { occupationId: 'home-inspector', stateCode: 'WI', ageMinimum: 18, backgroundCheck: true, officialName: 'Wisconsin Department of Safety and Professional Services — Home Inspectors', officialUrl: 'https://dsps.wi.gov', retrieved: RETRIEVED },
  { occupationId: 'home-inspector', stateCode: 'DC', ageMinimum: 18, backgroundCheck: true, officialName: 'DC Department of Consumer and Regulatory Affairs — Home Inspectors', officialUrl: 'https://dcra.dc.gov', retrieved: RETRIEVED },
  { occupationId: 'home-inspector', stateCode: 'NH', ageMinimum: 18, backgroundCheck: true, officialName: 'New Hampshire Office of Professional Licensure and Certification — Home Inspectors', officialUrl: 'https://www.oplc.nh.gov', retrieved: RETRIEVED },
  { occupationId: 'home-inspector', stateCode: 'NM', ageMinimum: 18, backgroundCheck: true, officialName: 'New Mexico Regulation and Licensing Department — Home Inspectors', officialUrl: 'https://www.rld.nm.gov', retrieved: RETRIEVED },
  { occupationId: 'home-inspector', stateCode: 'OH', ageMinimum: 18, backgroundCheck: true, officialName: 'Ohio Department of Commerce — Division of Real Estate and Professional Licensing, Home Inspectors', officialUrl: 'https://www.com.ohio.gov', retrieved: RETRIEVED },
  { occupationId: 'home-inspector', stateCode: 'KY', ageMinimum: 18, backgroundCheck: true, officialName: 'Kentucky Department of Housing, Buildings and Construction — Home Inspectors', retrieved: RETRIEVED },
  { occupationId: 'home-inspector', stateCode: 'MS', ageMinimum: 18, backgroundCheck: true, officialName: 'Mississippi Home Inspectors Board', retrieved: RETRIEVED },
  { occupationId: 'home-inspector', stateCode: 'MO', ageMinimum: 18, officialName: 'Missouri Division of Professional Registration — Home Inspectors', officialUrl: 'https://pr.mo.gov', retrieved: RETRIEVED },

  // --- States without a verified state-level home inspector license ---
  { occupationId: 'home-inspector', stateCode: 'AL', retrieved: RETRIEVED },
  { occupationId: 'home-inspector', stateCode: 'AK', retrieved: RETRIEVED },
  { occupationId: 'home-inspector', stateCode: 'AZ', retrieved: RETRIEVED },
  { occupationId: 'home-inspector', stateCode: 'AR', retrieved: RETRIEVED },
  { occupationId: 'home-inspector', stateCode: 'CA', retrieved: RETRIEVED },
  { occupationId: 'home-inspector', stateCode: 'CO', retrieved: RETRIEVED },
  { occupationId: 'home-inspector', stateCode: 'DE', retrieved: RETRIEVED },
  { occupationId: 'home-inspector', stateCode: 'ID', retrieved: RETRIEVED },
  { occupationId: 'home-inspector', stateCode: 'IN', retrieved: RETRIEVED },
  { occupationId: 'home-inspector', stateCode: 'IA', retrieved: RETRIEVED },
  { occupationId: 'home-inspector', stateCode: 'KS', retrieved: RETRIEVED },
  { occupationId: 'home-inspector', stateCode: 'ME', retrieved: RETRIEVED },
  { occupationId: 'home-inspector', stateCode: 'MN', retrieved: RETRIEVED },
  { occupationId: 'home-inspector', stateCode: 'MT', retrieved: RETRIEVED },
  { occupationId: 'home-inspector', stateCode: 'NE', retrieved: RETRIEVED },
  { occupationId: 'home-inspector', stateCode: 'NC', retrieved: RETRIEVED },
  { occupationId: 'home-inspector', stateCode: 'ND', retrieved: RETRIEVED },
  { occupationId: 'home-inspector', stateCode: 'OK', retrieved: RETRIEVED },
  { occupationId: 'home-inspector', stateCode: 'RI', retrieved: RETRIEVED },
  { occupationId: 'home-inspector', stateCode: 'SD', retrieved: RETRIEVED },
  { occupationId: 'home-inspector', stateCode: 'VT', retrieved: RETRIEVED },
  { occupationId: 'home-inspector', stateCode: 'WA', retrieved: RETRIEVED },
  { occupationId: 'home-inspector', stateCode: 'WV', retrieved: RETRIEVED },
  { occupationId: 'home-inspector', stateCode: 'WY', retrieved: RETRIEVED },
];
