// ============================================================================
// LicenseFig — BLS median annual wages (U.S. Bureau of Labor Statistics,
// Occupational Employment and Wage Statistics, bls.gov/oes).
// Consumed by the /licensing-guides/{occ}/{state}/cost/ variant pages for the
// "fees vs. median pay" reality check, and by the career ROI tool. Values are
// the median annual wages published at retrieval date 2026-08-20.
// Notaries are not tracked separately by BLS (amount 0 → comparison is omitted).
// ============================================================================

export interface BlsSalary {
  amount: number // median annual wage in USD; 0 = not published
  note: string // BLS occupational title the figure refers to
}

export const BLS_SALARIES: Record<string, BlsSalary> = {
  'real-estate-salesperson': { amount: 52030, note: 'real estate sales agents' },
  'real-estate-broker': { amount: 62260, note: 'real estate brokers' },
  cna: { amount: 35740, note: 'nursing assistants' },
  'insurance-agent-pc': { amount: 52770, note: 'insurance sales agents' },
  'insurance-agent-lh': { amount: 52770, note: 'insurance sales agents' },
  'real-estate-appraiser': { amount: 61910, note: 'real estate appraisers and assessors' },
  cosmetologist: { amount: 31860, note: 'hairdressers, hairstylists and cosmetologists' },
  barber: { amount: 33490, note: 'barbers' },
  'nail-technician': { amount: 29750, note: 'manicurists and pedicurists' },
  esthetician: { amount: 38020, note: 'skincare specialists' },
  'massage-therapist': { amount: 55910, note: 'massage therapists' },
  'home-inspector': {
    amount: 67700,
    note: 'construction and building inspectors (home inspectors are not tracked separately by BLS)',
  },
  'pest-control-applicator': { amount: 44560, note: 'pest control workers' },
  'security-guard': { amount: 37160, note: 'security guards' },
  'notary-public': { amount: 0, note: 'notaries' },
  // ---- Wave 2 occupations (BLS OES May 2025, retrieved 2026-08-21) ----
  'registered-nurse': { amount: 97550, note: 'registered nurses' },
  'licensed-practical-nurse': { amount: 64400, note: 'licensed practical and licensed vocational nurses' },
  pharmacist: { amount: 140910, note: 'pharmacists' },
  'physical-therapist': { amount: 102760, note: 'physical therapists' },
  'dental-hygienist': { amount: 98100, note: 'dental hygienists' },
  electrician: { amount: 63190, note: 'electricians' },
  plumber: { amount: 63800, note: 'plumbers, pipefitters, and steamfitters' },
  'hvac-technician': {
    amount: 61010,
    note: 'heating, air conditioning, and refrigeration mechanics and installers',
  },
  'general-contractor': { amount: 114990, note: 'construction managers' },
  'professional-engineer': {
    amount: 104110,
    note: 'mechanical engineers (BLS does not track professional engineers separately)',
  },
  attorney: { amount: 159670, note: 'lawyers' },
  'certified-public-accountant': { amount: 83680, note: 'accountants and auditors' },
  emt: { amount: 48150, note: 'EMTs and paramedics (BLS median hourly x 2,080)' },
  'commercial-driver-license': { amount: 58640, note: 'heavy and tractor-trailer truck drivers' },
  architect: { amount: 99280, note: 'architects, except landscape and naval' },
}
