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
}
