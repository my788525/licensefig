// ============================================================================
// Notary Public — 50 states + DC
// Almost all states require no formal education (exceptions: CA 6 hrs,
// NY 3 hrs). Exam required in ~9 states (CA, IL, KS, LA, MO, MT, NY, OK, UT);
// all others are application-only. Each commission issued by the state
// Secretary of State (or equivalent). Retrieved 2026-08-20.
// Unknown fees/terms are omitted (UI renders "verify with your state board").
// ============================================================================

import type { LicenseRequirements } from '../types';

const RETRIEVED = '2026-08-20';
const stateExam = { name: 'State' };

export const notaryPublicRequirements: LicenseRequirements[] = [
  { occupationId: 'notary-public', stateCode: 'AL', ageMinimum: 18, educationHours: 0, renewal: { years: 4 }, officialName: 'Alabama Secretary of State', officialUrl: 'https://www.sos.alabama.gov', retrieved: RETRIEVED },
  { occupationId: 'notary-public', stateCode: 'AK', ageMinimum: 18, educationHours: 0, renewal: { years: 4 }, officialName: 'Alaska Department of Commerce — Corporations, Business & Professional Licensing', officialUrl: 'https://www.commerce.alaska.gov/web/cbpl', retrieved: RETRIEVED },
  { occupationId: 'notary-public', stateCode: 'AZ', ageMinimum: 18, educationHours: 0, renewal: { years: 4 }, officialName: 'Arizona Secretary of State', officialUrl: 'https://azsos.gov', retrieved: RETRIEVED },
  { occupationId: 'notary-public', stateCode: 'AR', ageMinimum: 18, educationHours: 0, renewal: { years: 4 }, officialName: 'Arkansas Secretary of State', officialUrl: 'https://www.sos.arkansas.gov', retrieved: RETRIEVED },
  { occupationId: 'notary-public', stateCode: 'CA', ageMinimum: 18, educationHours: 6, examVendor: stateExam, applicationFee: 20, renewal: { years: 4 }, officialName: 'California Secretary of State', officialUrl: 'https://www.sos.ca.gov', retrieved: RETRIEVED },
  { occupationId: 'notary-public', stateCode: 'CO', ageMinimum: 18, educationHours: 0, renewal: { years: 4 }, officialName: 'Colorado Secretary of State', officialUrl: 'https://www.sos.state.co.us', retrieved: RETRIEVED },
  { occupationId: 'notary-public', stateCode: 'CT', ageMinimum: 18, educationHours: 0, renewal: { years: 5 }, officialName: 'Connecticut Secretary of the State', officialUrl: 'https://portal.ct.gov/SOTS', retrieved: RETRIEVED },
  { occupationId: 'notary-public', stateCode: 'DE', ageMinimum: 18, educationHours: 0, officialName: 'Delaware Secretary of State', officialUrl: 'https://www.delaware.gov', retrieved: RETRIEVED },
  { occupationId: 'notary-public', stateCode: 'DC', ageMinimum: 18, educationHours: 0, officialName: 'DC Department of Consumer and Regulatory Affairs — Notary Commission', officialUrl: 'https://dcra.dc.gov', retrieved: RETRIEVED },
  { occupationId: 'notary-public', stateCode: 'FL', ageMinimum: 18, educationHours: 0, renewal: { years: 4 }, officialName: 'Florida Department of State', officialUrl: 'https://dos.myflorida.com', retrieved: RETRIEVED },
  { occupationId: 'notary-public', stateCode: 'GA', ageMinimum: 18, educationHours: 0, renewal: { years: 4 }, officialName: 'Georgia Secretary of State', officialUrl: 'https://sos.ga.gov', retrieved: RETRIEVED },
  { occupationId: 'notary-public', stateCode: 'HI', ageMinimum: 18, educationHours: 0, renewal: { years: 4 }, officialName: 'Hawaii Lieutenant Governor — Business Registration Division', officialUrl: 'https://ltgov.hawaii.gov', retrieved: RETRIEVED },
  { occupationId: 'notary-public', stateCode: 'ID', ageMinimum: 18, educationHours: 0, renewal: { years: 4 }, officialName: 'Idaho Secretary of State', officialUrl: 'https://sos.idaho.gov', retrieved: RETRIEVED },
  { occupationId: 'notary-public', stateCode: 'IL', ageMinimum: 18, educationHours: 0, examVendor: stateExam, renewal: { years: 10 }, officialName: 'Illinois Secretary of State', officialUrl: 'https://www.ilsos.gov', retrieved: RETRIEVED },
  { occupationId: 'notary-public', stateCode: 'IN', ageMinimum: 18, educationHours: 0, renewal: { years: 8 }, officialName: 'Indiana Secretary of State', officialUrl: 'https://www.in.gov/sos', retrieved: RETRIEVED },
  { occupationId: 'notary-public', stateCode: 'IA', ageMinimum: 18, educationHours: 0, renewal: { years: 4 }, officialName: 'Iowa Secretary of State', officialUrl: 'https://sos.iowa.gov', retrieved: RETRIEVED },
  { occupationId: 'notary-public', stateCode: 'KS', ageMinimum: 18, educationHours: 0, examVendor: stateExam, renewal: { years: 4 }, officialName: 'Kansas Secretary of State', officialUrl: 'https://sos.ks.gov', retrieved: RETRIEVED },
  { occupationId: 'notary-public', stateCode: 'KY', ageMinimum: 18, educationHours: 0, renewal: { years: 4 }, officialName: 'Kentucky Secretary of State', officialUrl: 'https://www.sos.ky.gov', retrieved: RETRIEVED },
  { occupationId: 'notary-public', stateCode: 'LA', ageMinimum: 18, educationHours: 0, examVendor: stateExam, officialName: 'Louisiana Secretary of State', officialUrl: 'https://www.sos.la.gov', retrieved: RETRIEVED },
  { occupationId: 'notary-public', stateCode: 'ME', ageMinimum: 18, educationHours: 0, renewal: { years: 7 }, officialName: 'Maine Secretary of State', officialUrl: 'https://www.maine.gov/sos', retrieved: RETRIEVED },
  { occupationId: 'notary-public', stateCode: 'MD', ageMinimum: 18, educationHours: 0, officialName: 'Maryland Secretary of State', officialUrl: 'https://www.sos.maryland.gov', retrieved: RETRIEVED },
  { occupationId: 'notary-public', stateCode: 'MA', ageMinimum: 18, educationHours: 0, applicationFee: 60, renewal: { years: 7 }, officialName: 'Massachusetts Secretary of the Commonwealth', officialUrl: 'https://www.sec.state.ma.us', retrieved: RETRIEVED },
  { occupationId: 'notary-public', stateCode: 'MI', ageMinimum: 18, educationHours: 0, officialName: 'Michigan Department of State', officialUrl: 'https://www.michigan.gov/sos', retrieved: RETRIEVED },
  { occupationId: 'notary-public', stateCode: 'MN', ageMinimum: 18, educationHours: 0, renewal: { years: 4 }, officialName: 'Minnesota Secretary of State', officialUrl: 'https://www.sos.state.mn.us', retrieved: RETRIEVED },
  { occupationId: 'notary-public', stateCode: 'MS', ageMinimum: 18, educationHours: 0, renewal: { years: 4 }, officialName: 'Mississippi Secretary of State', officialUrl: 'https://www.sos.ms.gov', retrieved: RETRIEVED },
  { occupationId: 'notary-public', stateCode: 'MO', ageMinimum: 18, educationHours: 0, examVendor: stateExam, renewal: { years: 4 }, officialName: 'Missouri Secretary of State', officialUrl: 'https://www.sos.mo.gov', retrieved: RETRIEVED },
  { occupationId: 'notary-public', stateCode: 'MT', ageMinimum: 18, educationHours: 0, examVendor: stateExam, renewal: { years: 4 }, officialName: 'Montana Secretary of State', officialUrl: 'https://sosmt.gov', retrieved: RETRIEVED },
  { occupationId: 'notary-public', stateCode: 'NE', ageMinimum: 18, educationHours: 0, renewal: { years: 4 }, officialName: 'Nebraska Secretary of State', officialUrl: 'https://sos.nebraska.gov', retrieved: RETRIEVED },
  { occupationId: 'notary-public', stateCode: 'NV', ageMinimum: 18, educationHours: 0, renewal: { years: 4 }, officialName: 'Nevada Secretary of State', officialUrl: 'https://www.nvsos.gov', retrieved: RETRIEVED },
  { occupationId: 'notary-public', stateCode: 'NH', ageMinimum: 18, educationHours: 0, officialName: 'New Hampshire Secretary of State', officialUrl: 'https://sos.nh.gov', retrieved: RETRIEVED },
  { occupationId: 'notary-public', stateCode: 'NJ', ageMinimum: 18, educationHours: 0, renewal: { years: 5 }, officialName: 'New Jersey Department of State', officialUrl: 'https://www.nj.gov/state', retrieved: RETRIEVED },
  { occupationId: 'notary-public', stateCode: 'NM', ageMinimum: 18, educationHours: 0, renewal: { years: 4 }, officialName: 'New Mexico Secretary of State', officialUrl: 'https://www.sos.state.nm.us', retrieved: RETRIEVED },
  { occupationId: 'notary-public', stateCode: 'NY', ageMinimum: 18, educationHours: 3, examVendor: stateExam, applicationFee: 60, renewal: { years: 4 }, officialName: 'New York Department of State — Division of Licensing Services', officialUrl: 'https://dos.ny.gov', retrieved: RETRIEVED },
  { occupationId: 'notary-public', stateCode: 'NC', ageMinimum: 18, educationHours: 0, renewal: { years: 5 }, officialName: 'North Carolina Secretary of State', officialUrl: 'https://www.sosnc.gov', retrieved: RETRIEVED },
  { occupationId: 'notary-public', stateCode: 'ND', ageMinimum: 18, educationHours: 0, renewal: { years: 4 }, officialName: 'North Dakota Secretary of State', officialUrl: 'https://www.sos.nd.gov', retrieved: RETRIEVED },
  { occupationId: 'notary-public', stateCode: 'OH', ageMinimum: 18, educationHours: 0, renewal: { years: 5 }, officialName: 'Ohio Secretary of State', officialUrl: 'https://www.sos.state.oh.us', retrieved: RETRIEVED },
  { occupationId: 'notary-public', stateCode: 'OK', ageMinimum: 18, educationHours: 0, examVendor: stateExam, renewal: { years: 4 }, officialName: 'Oklahoma Secretary of State', officialUrl: 'https://www.sos.ok.gov', retrieved: RETRIEVED },
  { occupationId: 'notary-public', stateCode: 'OR', ageMinimum: 18, educationHours: 0, renewal: { years: 4 }, officialName: 'Oregon Secretary of State', officialUrl: 'https://sos.oregon.gov', retrieved: RETRIEVED },
  { occupationId: 'notary-public', stateCode: 'PA', ageMinimum: 18, educationHours: 0, renewal: { years: 4 }, officialName: 'Pennsylvania Department of State', officialUrl: 'https://www.dos.pa.gov', retrieved: RETRIEVED },
  { occupationId: 'notary-public', stateCode: 'RI', ageMinimum: 18, educationHours: 0, renewal: { years: 10 }, officialName: 'Rhode Island Secretary of State', officialUrl: 'https://www.sos.ri.gov', retrieved: RETRIEVED },
  { occupationId: 'notary-public', stateCode: 'SC', ageMinimum: 18, educationHours: 0, renewal: { years: 10 }, officialName: 'South Carolina Secretary of State', officialUrl: 'https://www.scsos.com', retrieved: RETRIEVED },
  { occupationId: 'notary-public', stateCode: 'SD', ageMinimum: 18, educationHours: 0, renewal: { years: 4 }, officialName: 'South Dakota Secretary of State', officialUrl: 'https://sdsos.gov', retrieved: RETRIEVED },
  { occupationId: 'notary-public', stateCode: 'TN', ageMinimum: 18, educationHours: 0, renewal: { years: 4 }, officialName: 'Tennessee Secretary of State', officialUrl: 'https://sos.tn.gov', retrieved: RETRIEVED },
  { occupationId: 'notary-public', stateCode: 'TX', ageMinimum: 18, educationHours: 0, applicationFee: 21, renewal: { years: 4 }, officialName: 'Texas Secretary of State', officialUrl: 'https://www.sos.state.tx.us', retrieved: RETRIEVED },
  { occupationId: 'notary-public', stateCode: 'UT', ageMinimum: 18, educationHours: 0, examVendor: stateExam, renewal: { years: 4 }, officialName: 'Utah Lieutenant Governor — Notary Division', officialUrl: 'https://utah.gov', retrieved: RETRIEVED },
  { occupationId: 'notary-public', stateCode: 'VT', ageMinimum: 18, educationHours: 0, officialName: 'Vermont Secretary of State', officialUrl: 'https://sos.vermont.gov', retrieved: RETRIEVED },
  { occupationId: 'notary-public', stateCode: 'VA', ageMinimum: 18, educationHours: 0, renewal: { years: 5 }, officialName: 'Virginia Secretary of the Commonwealth', officialUrl: 'https://www.commonwealth.virginia.gov', retrieved: RETRIEVED },
  { occupationId: 'notary-public', stateCode: 'WA', ageMinimum: 18, educationHours: 0, renewal: { years: 4 }, officialName: 'Washington Secretary of State', officialUrl: 'https://www.sos.wa.gov', retrieved: RETRIEVED },
  { occupationId: 'notary-public', stateCode: 'WV', ageMinimum: 18, educationHours: 0, officialName: 'West Virginia Secretary of State', officialUrl: 'https://sos.wv.gov', retrieved: RETRIEVED },
  { occupationId: 'notary-public', stateCode: 'WI', ageMinimum: 18, educationHours: 0, renewal: { years: 4 }, officialName: 'Wisconsin Department of Financial Institutions — Notary', officialUrl: 'https://www.wdfi.org', retrieved: RETRIEVED },
  { occupationId: 'notary-public', stateCode: 'WY', ageMinimum: 18, educationHours: 0, renewal: { years: 4 }, officialName: 'Wyoming Secretary of State', officialUrl: 'https://sos.wyo.gov', retrieved: RETRIEVED },
];
