import type { LicenseRequirements } from '../types'

// Insurance Agent — Property & Casualty (P&C) producer license, 50 states + DC.
// Sources: state Departments of Insurance producer-licensing pages and the
// exam vendors (PSI / Pearson VUE) that administer state insurance exams.
// Retrieved 2026-08-20. Unknown fields are omitted (UI renders "verify with
// your state board"). Notes on defaults used only where they are the
// prevailing, well-established requirement for that state.
//
// Field additions verified 2026-08-20 via official sources:
//   CA — educationHours 12 (AB 943, eff. 2026-01-01: 12-hr Ethics & CA Ins. Code; was 20),
//        exam 150q/180min/60%  https://www.insurance.ca.gov/0200-industry/0010-producer-online-services/0200-exam-info/examtimesandquestion.cfm
//   FL — educationHours 200 (2-20 General Lines course), exam 160 scored/180min/70%/$44,
//        applicationFee $50, licenseFee $5  https://www.pearsonvue.com/content/dam/VUE/vue/en/documents/publications/121000.pdf
//   GA — educationHours 16 (P&C prelicensing course, 8h each line), applicationFee $120
//        https://oci.georgia.gov/get-insurance-agent-license
//   NY — educationHours 90, exam 150q/150min/70%/$33, applicationFee $80 (2-yr term)
//        https://www.dfs.ny.gov (PSI NY producer licensing)
//   ND — exam 110q/150min/70%/$67 (PSI bulletin)  https://www.insurance.nd.gov
//   OK — examFee $38 (PSI bulletin)  https://test-takers.psiexams.com/api/content/bulletin/10769
//   PA — exam 150q/170min/70%/$55, applicationFee $55 (PSI program instructions)
//        https://proctor2.psionline.com/media/programs/Instructions/PA%20Insurance%20-%20Migration.pdf
//   TN — examFee $80 combined P&C (Pearson VUE TN page)  https://home.pearsonvue.com/tn/insurance
//   TX — vendor Pearson VUE (corrected from PSI), exam 130 scored (145 total)/150min/70%/$49,
//        applicationFee $50  https://www.pearsonvue.com (Texas Insurance Licensing Candidate Handbook)
const RETRIEVED = '2026-08-20'

const psi = { name: 'PSI', url: 'https://www.psiexams.com' }
const pearson = { name: 'Pearson VUE', url: 'https://www.pearsonvue.com' }

export const insurance_agent_pcRequirements: LicenseRequirements[] = [
  // Alabama
  {
    occupationId: 'insurance-agent-pc', stateCode: 'AL', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    examVendor: psi,
    renewal: { years: 2, ceHours: 24 },
    officialName: 'Alabama Department of Insurance',
    officialUrl: 'https://www.aldoi.gov',
  },
  // Alaska
  {
    occupationId: 'insurance-agent-pc', stateCode: 'AK', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    examVendor: psi,
    renewal: { years: 2, ceHours: 24 },
    officialName: 'Alaska Division of Insurance',
    officialUrl: 'https://www.commerce.alaska.gov/web/ins',
  },
  // Arizona
  {
    occupationId: 'insurance-agent-pc', stateCode: 'AZ', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 24 },
    officialName: 'Arizona Department of Insurance and Financial Institutions',
    officialUrl: 'https://insurance.az.gov',
  },
  // Arkansas
  {
    occupationId: 'insurance-agent-pc', stateCode: 'AR', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    examVendor: psi,
    renewal: { years: 2, ceHours: 24 },
    officialName: 'Arkansas Insurance Department',
    officialUrl: 'https://insurance.arkansas.gov',
  },
  // California
  {
    occupationId: 'insurance-agent-pc', stateCode: 'CA', retrieved: RETRIEVED,
    educationHours: 12, ageMinimum: 18, backgroundCheck: true,
    examVendor: psi,
    exam: { nationalQuestions: 150, timeLimitMin: 180, passingPct: 60 },
    renewal: { years: 2, ceHours: 24 },
    officialName: 'California Department of Insurance',
    officialUrl: 'https://www.insurance.ca.gov',
  },
  // Colorado
  {
    occupationId: 'insurance-agent-pc', stateCode: 'CO', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    examVendor: psi,
    renewal: { years: 2, ceHours: 24 },
    officialName: 'Colorado Division of Insurance',
    officialUrl: 'https://doi.colorado.gov',
  },
  // Connecticut
  {
    occupationId: 'insurance-agent-pc', stateCode: 'CT', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 24 },
    officialName: 'Connecticut Insurance Department',
    officialUrl: 'https://portal.ct.gov/CID',
  },
  // Delaware
  {
    occupationId: 'insurance-agent-pc', stateCode: 'DE', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    examVendor: psi,
    renewal: { years: 2, ceHours: 24 },
    officialName: 'Delaware Department of Insurance',
    officialUrl: 'https://insurance.delaware.gov',
  },
  // District of Columbia
  {
    occupationId: 'insurance-agent-pc', stateCode: 'DC', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    examVendor: psi,
    renewal: { years: 2, ceHours: 24 },
    officialName: 'DC Department of Insurance, Securities and Banking',
    officialUrl: 'https://disb.dc.gov',
  },
  // Florida
  {
    occupationId: 'insurance-agent-pc', stateCode: 'FL', retrieved: RETRIEVED,
    educationHours: 200, ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    exam: { nationalQuestions: 160, timeLimitMin: 180, passingPct: 70, examFee: 44 },
    applicationFee: 50, licenseFee: 5,
    renewal: { years: 2, ceHours: 24 },
    officialName: 'Florida Department of Financial Services',
    officialUrl: 'https://www.myfloridacfo.com',
  },
  // Georgia
  {
    occupationId: 'insurance-agent-pc', stateCode: 'GA', retrieved: RETRIEVED,
    educationHours: 16, ageMinimum: 18, backgroundCheck: true,
    examVendor: psi,
    applicationFee: 120,
    renewal: { years: 2, ceHours: 24 },
    officialName: 'Georgia Office of Commissioner of Insurance and Safety Fire',
    officialUrl: 'https://oci.georgia.gov',
  },
  // Hawaii
  {
    occupationId: 'insurance-agent-pc', stateCode: 'HI', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    examVendor: psi,
    renewal: { years: 2, ceHours: 24 },
    officialName: 'Hawaii Insurance Division',
    officialUrl: 'https://cca.hawaii.gov/ins',
  },
  // Idaho
  {
    occupationId: 'insurance-agent-pc', stateCode: 'ID', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 24 },
    officialName: 'Idaho Department of Insurance',
    officialUrl: 'https://doi.idaho.gov',
  },
  // Illinois
  {
    occupationId: 'insurance-agent-pc', stateCode: 'IL', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 24 },
    officialName: 'Illinois Department of Insurance',
    officialUrl: 'https://insurance.illinois.gov',
  },
  // Indiana
  {
    occupationId: 'insurance-agent-pc', stateCode: 'IN', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 24 },
    officialName: 'Indiana Department of Insurance',
    officialUrl: 'https://www.in.gov/idoi',
  },
  // Iowa
  {
    occupationId: 'insurance-agent-pc', stateCode: 'IA', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2 },
    officialName: 'Iowa Insurance Division',
    officialUrl: 'https://iid.iowa.gov',
  },
  // Kansas
  {
    occupationId: 'insurance-agent-pc', stateCode: 'KS', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    examVendor: psi,
    renewal: { years: 2, ceHours: 24 },
    officialName: 'Kansas Insurance Department',
    officialUrl: 'https://insurance.kansas.gov',
  },
  // Kentucky
  {
    occupationId: 'insurance-agent-pc', stateCode: 'KY', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    examVendor: psi,
    renewal: { years: 2, ceHours: 24 },
    officialName: 'Kentucky Department of Insurance',
    officialUrl: 'https://insurance.ky.gov',
  },
  // Louisiana
  {
    occupationId: 'insurance-agent-pc', stateCode: 'LA', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    examVendor: psi,
    renewal: { years: 2, ceHours: 24 },
    officialName: 'Louisiana Department of Insurance',
    officialUrl: 'https://www.ldi.la.gov',
  },
  // Maine
  {
    occupationId: 'insurance-agent-pc', stateCode: 'ME', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 24 },
    officialName: 'Maine Bureau of Insurance',
    officialUrl: 'https://www.maine.gov/pfr/insurance',
  },
  // Maryland
  {
    occupationId: 'insurance-agent-pc', stateCode: 'MD', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    examVendor: psi,
    renewal: { years: 2, ceHours: 24 },
    officialName: 'Maryland Insurance Administration',
    officialUrl: 'https://insurance.maryland.gov',
  },
  // Massachusetts
  {
    occupationId: 'insurance-agent-pc', stateCode: 'MA', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 24 },
    officialName: 'Massachusetts Division of Insurance',
    officialUrl: 'https://www.mass.gov/orgs/division-of-insurance',
  },
  // Michigan
  {
    occupationId: 'insurance-agent-pc', stateCode: 'MI', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    examVendor: psi,
    renewal: { years: 2, ceHours: 24 },
    officialName: 'Michigan Department of Insurance and Financial Services',
    officialUrl: 'https://www.michigan.gov/difs',
  },
  // Minnesota
  {
    occupationId: 'insurance-agent-pc', stateCode: 'MN', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 24 },
    officialName: 'Minnesota Department of Commerce',
    officialUrl: 'https://mn.gov/commerce',
  },
  // Mississippi
  {
    occupationId: 'insurance-agent-pc', stateCode: 'MS', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    examVendor: psi,
    renewal: { years: 2, ceHours: 24 },
    officialName: 'Mississippi Insurance Department',
    officialUrl: 'https://www.mid.ms.gov',
  },
  // Missouri
  {
    occupationId: 'insurance-agent-pc', stateCode: 'MO', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    examVendor: psi,
    renewal: { years: 2 },
    officialName: 'Missouri Department of Commerce and Insurance',
    officialUrl: 'https://insurance.mo.gov',
  },
  // Montana
  {
    occupationId: 'insurance-agent-pc', stateCode: 'MT', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 24 },
    officialName: 'Montana Office of the Commissioner of Securities and Insurance',
    officialUrl: 'https://csimt.gov',
  },
  // Nebraska
  {
    occupationId: 'insurance-agent-pc', stateCode: 'NE', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    examVendor: psi,
    renewal: { years: 2, ceHours: 24 },
    officialName: 'Nebraska Department of Insurance',
    officialUrl: 'https://doi.nebraska.gov',
  },
  // Nevada
  {
    occupationId: 'insurance-agent-pc', stateCode: 'NV', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    examVendor: psi,
    renewal: { years: 2, ceHours: 24 },
    officialName: 'Nevada Division of Insurance',
    officialUrl: 'https://doi.nv.gov',
  },
  // New Hampshire
  {
    occupationId: 'insurance-agent-pc', stateCode: 'NH', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    examVendor: psi,
    renewal: { years: 2 },
    officialName: 'New Hampshire Insurance Department',
    officialUrl: 'https://www.nh.gov/insurance',
  },
  // New Jersey
  {
    occupationId: 'insurance-agent-pc', stateCode: 'NJ', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 24 },
    officialName: 'New Jersey Department of Banking and Insurance',
    officialUrl: 'https://www.state.nj.us/dobi',
  },
  // New Mexico
  {
    occupationId: 'insurance-agent-pc', stateCode: 'NM', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    examVendor: psi,
    renewal: { years: 2, ceHours: 24 },
    officialName: 'New Mexico Office of Superintendent of Insurance',
    officialUrl: 'https://www.osi.state.nm.us',
  },
  // New York
  {
    occupationId: 'insurance-agent-pc', stateCode: 'NY', retrieved: RETRIEVED,
    educationHours: 90, ageMinimum: 18, backgroundCheck: true,
    examVendor: psi,
    exam: { nationalQuestions: 150, timeLimitMin: 150, passingPct: 70, examFee: 33 },
    applicationFee: 80,
    renewal: { years: 2, ceHours: 15 },
    officialName: 'New York State Department of Financial Services',
    officialUrl: 'https://www.dfs.ny.gov',
  },
  // North Carolina
  {
    occupationId: 'insurance-agent-pc', stateCode: 'NC', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 24 },
    officialName: 'North Carolina Department of Insurance',
    officialUrl: 'https://www.ncdoi.gov',
  },
  // North Dakota
  {
    occupationId: 'insurance-agent-pc', stateCode: 'ND', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    examVendor: psi,
    exam: { nationalQuestions: 110, timeLimitMin: 150, passingPct: 70, examFee: 67 },
    renewal: { years: 2, ceHours: 24 },
    officialName: 'North Dakota Insurance Department',
    officialUrl: 'https://www.nd.gov/ndins',
  },
  // Ohio
  {
    occupationId: 'insurance-agent-pc', stateCode: 'OH', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 24 },
    officialName: 'Ohio Department of Insurance',
    officialUrl: 'https://insurance.ohio.gov',
  },
  // Oklahoma
  {
    occupationId: 'insurance-agent-pc', stateCode: 'OK', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    examVendor: psi,
    exam: { examFee: 38 },
    renewal: { years: 2, ceHours: 24 },
    officialName: 'Oklahoma Insurance Department',
    officialUrl: 'https://www.oid.ok.gov',
  },
  // Oregon
  {
    occupationId: 'insurance-agent-pc', stateCode: 'OR', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    examVendor: psi,
    renewal: { years: 2, ceHours: 24 },
    officialName: 'Oregon Division of Financial Regulation',
    officialUrl: 'https://dfr.oregon.gov',
  },
  // Pennsylvania
  {
    occupationId: 'insurance-agent-pc', stateCode: 'PA', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    examVendor: psi,
    exam: { nationalQuestions: 150, timeLimitMin: 170, passingPct: 70, examFee: 55 },
    applicationFee: 55,
    renewal: { years: 2, ceHours: 24 },
    officialName: 'Pennsylvania Insurance Department',
    officialUrl: 'https://www.insurance.pa.gov',
  },
  // Rhode Island
  {
    occupationId: 'insurance-agent-pc', stateCode: 'RI', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 24 },
    officialName: 'Rhode Island Department of Business Regulation — Insurance Division',
    officialUrl: 'https://dbr.ri.gov',
  },
  // South Carolina
  {
    occupationId: 'insurance-agent-pc', stateCode: 'SC', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    examVendor: psi,
    renewal: { years: 2, ceHours: 24 },
    officialName: 'South Carolina Department of Insurance',
    officialUrl: 'https://www.doi.sc.gov',
  },
  // South Dakota
  {
    occupationId: 'insurance-agent-pc', stateCode: 'SD', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    examVendor: psi,
    renewal: { years: 2, ceHours: 24 },
    officialName: 'South Dakota Division of Insurance',
    officialUrl: 'https://dlr.sd.gov/insurance',
  },
  // Tennessee
  {
    occupationId: 'insurance-agent-pc', stateCode: 'TN', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    exam: { examFee: 80 },
    renewal: { years: 2, ceHours: 24 },
    officialName: 'Tennessee Department of Commerce and Insurance',
    officialUrl: 'https://www.tn.gov/commerce',
  },
  // Texas
  {
    occupationId: 'insurance-agent-pc', stateCode: 'TX', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    exam: { nationalQuestions: 130, timeLimitMin: 150, passingPct: 70, examFee: 49 },
    applicationFee: 50,
    renewal: { years: 2, ceHours: 24 },
    officialName: 'Texas Department of Insurance',
    officialUrl: 'https://www.tdi.texas.gov',
  },
  // Utah
  {
    occupationId: 'insurance-agent-pc', stateCode: 'UT', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 24 },
    officialName: 'Utah Insurance Department',
    officialUrl: 'https://insurance.utah.gov',
  },
  // Vermont
  {
    occupationId: 'insurance-agent-pc', stateCode: 'VT', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 24 },
    officialName: 'Vermont Department of Financial Regulation',
    officialUrl: 'https://dfr.vermont.gov',
  },
  // Virginia
  {
    occupationId: 'insurance-agent-pc', stateCode: 'VA', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    examVendor: psi,
    renewal: { years: 2, ceHours: 24 },
    officialName: 'Virginia State Corporation Commission — Bureau of Insurance',
    officialUrl: 'https://www.scc.virginia.gov',
  },
  // Washington
  {
    occupationId: 'insurance-agent-pc', stateCode: 'WA', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    examVendor: psi,
    renewal: { years: 2, ceHours: 24 },
    officialName: 'Washington Office of the Insurance Commissioner',
    officialUrl: 'https://www.insurance.wa.gov',
  },
  // West Virginia
  {
    occupationId: 'insurance-agent-pc', stateCode: 'WV', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 24 },
    officialName: 'West Virginia Offices of the Insurance Commissioner',
    officialUrl: 'https://www.wvinsurance.gov',
  },
  // Wisconsin
  {
    occupationId: 'insurance-agent-pc', stateCode: 'WI', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    examVendor: psi,
    renewal: { years: 2, ceHours: 24 },
    officialName: 'Wisconsin Office of the Commissioner of Insurance',
    officialUrl: 'https://oci.wi.gov',
  },
  // Wyoming
  {
    occupationId: 'insurance-agent-pc', stateCode: 'WY', retrieved: RETRIEVED,
    ageMinimum: 18, backgroundCheck: true,
    examVendor: psi,
    renewal: { years: 2, ceHours: 24 },
    officialName: 'Wyoming Department of Insurance',
    officialUrl: 'https://insurance.wyo.gov',
  },
]
