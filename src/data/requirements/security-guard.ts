// ============================================================================
// Security Guard — 50 states + DC
// Most states use a registration model: a short training course (4–40 hrs)
// + criminal background check + registration fee; armed guards require
// extra training. Several states have no state-level license for unarmed
// guards. Most states have no written exam (registration only); published
// pass rates are rare. Retrieved 2026-08-20.
// Unknown fields are omitted (UI renders "verify with your state board").
// ============================================================================

import type { LicenseRequirements } from '../types';

const RETRIEVED = '2026-08-20';

export const security_guardRequirements: LicenseRequirements[] = [
  // --- States with structured unarmed guard training requirements ---
  {
    occupationId: 'security-guard', stateCode: 'CA', retrieved: RETRIEVED,
    educationHours: 40, ageMinimum: 18, backgroundCheck: true,
    renewal: { years: 2 },
    officialName: 'California Bureau of Security and Investigative Services (BSIS)',
    officialUrl: 'https://www.bsis.ca.gov',
  },
  {
    occupationId: 'security-guard', stateCode: 'FL', retrieved: RETRIEVED,
    educationHours: 40, ageMinimum: 18, backgroundCheck: true,
    officialName: 'Florida Department of Agriculture and Consumer Services — Division of Licensing',
    officialUrl: 'https://www.fdacs.gov',
  },
  {
    occupationId: 'security-guard', stateCode: 'TX', retrieved: RETRIEVED,
    educationHours: 6, ageMinimum: 18, backgroundCheck: true,
    officialName: 'Texas Department of Public Safety — Private Security Bureau',
    officialUrl: 'https://www.txdps.state.tx.us',
  },
  {
    occupationId: 'security-guard', stateCode: 'NY', retrieved: RETRIEVED,
    educationHours: 8, ageMinimum: 18, backgroundCheck: true,
    renewal: { years: 2 },
    officialName: 'New York Department of State — Division of Licensing Services',
    officialUrl: 'https://dos.ny.gov',
  },
  {
    occupationId: 'security-guard', stateCode: 'NJ', retrieved: RETRIEVED,
    educationHours: 24, ageMinimum: 18, backgroundCheck: true,
    officialName: 'New Jersey State Police — SORA',
    officialUrl: 'https://www.nj.gov/njsp',
  },
  {
    occupationId: 'security-guard', stateCode: 'IL', retrieved: RETRIEVED,
    educationHours: 20, ageMinimum: 18, backgroundCheck: true,
    officialName: 'Illinois Department of Financial and Professional Regulation (IDFPR)',
    officialUrl: 'https://www.idfpr.com',
  },

  // --- States that license/register guards (background check + registration; training hours vary) ---
  {
    occupationId: 'security-guard', stateCode: 'DC', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    officialName: 'DC Department of Consumer and Regulatory Affairs — Security Officers',
    officialUrl: 'https://dcra.dc.gov',
  },
  {
    occupationId: 'security-guard', stateCode: 'MD', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    officialName: 'Maryland State Police — Security Guard Licensing',
    officialUrl: 'https://mdsp.maryland.gov',
  },
  {
    occupationId: 'security-guard', stateCode: 'VA', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    officialName: 'Virginia Department of Criminal Justice Services — Private Security Services',
    officialUrl: 'https://www.dcjs.virginia.gov',
  },
  {
    occupationId: 'security-guard', stateCode: 'SC', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    officialName: 'South Carolina Law Enforcement Division (SLED) — Security Officer Licensing',
    officialUrl: 'https://www.sled.sc.gov',
  },
  {
    occupationId: 'security-guard', stateCode: 'OK', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    officialName: 'Oklahoma Council on Law Enforcement Education and Training (CLEET)',
    officialUrl: 'https://www.ok.gov/cleet',
  },
  {
    occupationId: 'security-guard', stateCode: 'TN', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    officialName: 'Tennessee Department of Commerce and Insurance — Private Protective Services',
    officialUrl: 'https://www.tn.gov/commerce',
  },
  {
    occupationId: 'security-guard', stateCode: 'LA', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    officialName: 'Louisiana State Board of Private Security Examiners',
  },

  // --- States without a verified state-level unarmed guard license/course ---
  { occupationId: 'security-guard', stateCode: 'AL', retrieved: RETRIEVED },
  { occupationId: 'security-guard', stateCode: 'AK', retrieved: RETRIEVED },
  { occupationId: 'security-guard', stateCode: 'AZ', retrieved: RETRIEVED },
  { occupationId: 'security-guard', stateCode: 'AR', retrieved: RETRIEVED },
  { occupationId: 'security-guard', stateCode: 'CO', retrieved: RETRIEVED },
  { occupationId: 'security-guard', stateCode: 'CT', retrieved: RETRIEVED },
  { occupationId: 'security-guard', stateCode: 'DE', retrieved: RETRIEVED },
  { occupationId: 'security-guard', stateCode: 'GA', retrieved: RETRIEVED },
  { occupationId: 'security-guard', stateCode: 'HI', retrieved: RETRIEVED },
  { occupationId: 'security-guard', stateCode: 'ID', retrieved: RETRIEVED },
  { occupationId: 'security-guard', stateCode: 'IN', retrieved: RETRIEVED },
  { occupationId: 'security-guard', stateCode: 'IA', retrieved: RETRIEVED },
  { occupationId: 'security-guard', stateCode: 'KS', retrieved: RETRIEVED },
  { occupationId: 'security-guard', stateCode: 'KY', retrieved: RETRIEVED },
  { occupationId: 'security-guard', stateCode: 'ME', retrieved: RETRIEVED },
  { occupationId: 'security-guard', stateCode: 'MA', retrieved: RETRIEVED },
  { occupationId: 'security-guard', stateCode: 'MI', retrieved: RETRIEVED },
  { occupationId: 'security-guard', stateCode: 'MN', retrieved: RETRIEVED },
  { occupationId: 'security-guard', stateCode: 'MS', retrieved: RETRIEVED },
  { occupationId: 'security-guard', stateCode: 'MO', retrieved: RETRIEVED },
  { occupationId: 'security-guard', stateCode: 'MT', retrieved: RETRIEVED },
  { occupationId: 'security-guard', stateCode: 'NE', retrieved: RETRIEVED },
  { occupationId: 'security-guard', stateCode: 'NV', retrieved: RETRIEVED },
  { occupationId: 'security-guard', stateCode: 'NH', retrieved: RETRIEVED },
  { occupationId: 'security-guard', stateCode: 'NM', retrieved: RETRIEVED },
  { occupationId: 'security-guard', stateCode: 'NC', retrieved: RETRIEVED },
  { occupationId: 'security-guard', stateCode: 'ND', retrieved: RETRIEVED },
  { occupationId: 'security-guard', stateCode: 'OH', retrieved: RETRIEVED },
  { occupationId: 'security-guard', stateCode: 'OR', retrieved: RETRIEVED },
  { occupationId: 'security-guard', stateCode: 'PA', retrieved: RETRIEVED },
  { occupationId: 'security-guard', stateCode: 'RI', retrieved: RETRIEVED },
  { occupationId: 'security-guard', stateCode: 'SD', retrieved: RETRIEVED },
  { occupationId: 'security-guard', stateCode: 'UT', retrieved: RETRIEVED },
  { occupationId: 'security-guard', stateCode: 'VT', retrieved: RETRIEVED },
  { occupationId: 'security-guard', stateCode: 'WA', retrieved: RETRIEVED },
  { occupationId: 'security-guard', stateCode: 'WV', retrieved: RETRIEVED },
  { occupationId: 'security-guard', stateCode: 'WI', retrieved: RETRIEVED },
  { occupationId: 'security-guard', stateCode: 'WY', retrieved: RETRIEVED },
];
