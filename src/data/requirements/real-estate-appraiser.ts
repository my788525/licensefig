import type { LicenseRequirements } from '../types'

// Real Estate Appraiser — Trainee / Licensed / Certified progression, 50 states + DC.
// Federal floor (AQB / Appraisal Foundation) applies in every state:
//   Trainee 75 hrs; Licensed Residential 150 hrs + 2,000 hrs experience;
//   Certified Residential 200 hrs + 2,500 hrs; Certified General 300 hrs + 3,000 hrs.
// All levels include the 15-hour National USPAP course. Renewal CE is the AQB
// standard 28 hrs / 2 yrs (incl. 7-hr USPAP update). State appraiser exams are
// administered nationally by Pearson VUE. Retrieved 2026-08-20. Unknown fields
// are omitted (UI renders "verify with your state board").
const RETRIEVED = '2026-08-20'

const pearson = { name: 'Pearson VUE', url: 'https://www.pearsonvue.com' }

export const real_estate_appraiserRequirements: LicenseRequirements[] = [
  // Alabama
  {
    occupationId: 'real-estate-appraiser', stateCode: 'AL', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 28 },
    officialName: 'Alabama Real Estate Appraisers Board',
    officialUrl: 'https://www.reab.alabama.gov',
  },
  // Alaska
  {
    occupationId: 'real-estate-appraiser', stateCode: 'AK', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 28 },
  },
  // Arizona
  {
    occupationId: 'real-estate-appraiser', stateCode: 'AZ', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 28 },
    officialName: 'Arizona Board of Appraisal',
    officialUrl: 'https://appraisal.az.gov',
  },
  // Arkansas
  {
    occupationId: 'real-estate-appraiser', stateCode: 'AR', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 28 },
    officialName: 'Arkansas Appraiser Licensing and Certification Board',
    officialUrl: 'https://www.aalcb.arkansas.gov',
  },
  // California
  {
    occupationId: 'real-estate-appraiser', stateCode: 'CA', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 28 },
    officialName: 'California Bureau of Real Estate Appraisers',
    officialUrl: 'https://www.brea.ca.gov',
  },
  // Colorado
  {
    occupationId: 'real-estate-appraiser', stateCode: 'CO', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 28 },
    officialName: 'Colorado Board of Real Estate Appraisers',
    officialUrl: 'https://www.colorado.gov/pacific/dora/real-estate-appraisers',
  },
  // Connecticut
  {
    occupationId: 'real-estate-appraiser', stateCode: 'CT', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 28 },
  },
  // Delaware
  {
    occupationId: 'real-estate-appraiser', stateCode: 'DE', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 28 },
    officialName: 'Delaware Council on Real Estate Appraisers',
  },
  // District of Columbia
  {
    occupationId: 'real-estate-appraiser', stateCode: 'DC', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 28 },
    officialName: 'DC Board of Real Estate Appraisers',
  },
  // Florida
  {
    occupationId: 'real-estate-appraiser', stateCode: 'FL', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 28 },
    officialName: 'Florida Department of Business and Professional Regulation',
    officialUrl: 'https://www.myfloridalicense.com',
  },
  // Georgia
  {
    occupationId: 'real-estate-appraiser', stateCode: 'GA', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 28 },
    officialName: 'Georgia Real Estate Appraisers Board',
    officialUrl: 'https://grec.ga.gov',
  },
  // Hawaii
  {
    occupationId: 'real-estate-appraiser', stateCode: 'HI', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 28 },
  },
  // Idaho
  {
    occupationId: 'real-estate-appraiser', stateCode: 'ID', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 28 },
  },
  // Illinois
  {
    occupationId: 'real-estate-appraiser', stateCode: 'IL', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 28 },
    officialName: 'Illinois Department of Financial and Professional Regulation',
    officialUrl: 'https://idfpr.illinois.gov',
  },
  // Indiana
  {
    occupationId: 'real-estate-appraiser', stateCode: 'IN', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 28 },
    officialName: 'Indiana Real Estate Appraiser Licensing and Certification Board',
    officialUrl: 'https://www.in.gov/pla',
  },
  // Iowa
  {
    occupationId: 'real-estate-appraiser', stateCode: 'IA', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 28 },
  },
  // Kansas
  {
    occupationId: 'real-estate-appraiser', stateCode: 'KS', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 28 },
    officialName: 'Kansas Real Estate Appraisal Board',
  },
  // Kentucky
  {
    occupationId: 'real-estate-appraiser', stateCode: 'KY', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 28 },
    officialName: 'Kentucky Real Estate Appraisal Board',
    officialUrl: 'https://kreab.ky.gov',
  },
  // Louisiana
  {
    occupationId: 'real-estate-appraiser', stateCode: 'LA', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 28 },
    officialName: 'Louisiana Real Estate Appraisers Board',
    officialUrl: 'https://www.lareab.com',
  },
  // Maine
  {
    occupationId: 'real-estate-appraiser', stateCode: 'ME', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 28 },
  },
  // Maryland
  {
    occupationId: 'real-estate-appraiser', stateCode: 'MD', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 28 },
    officialName: 'Maryland Commission of Real Estate Appraisers, Appraisal Management Companies and Home Inspectors',
  },
  // Massachusetts
  {
    occupationId: 'real-estate-appraiser', stateCode: 'MA', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 28 },
    officialName: 'Massachusetts Board of Registration of Real Estate Appraisers',
    officialUrl: 'https://www.mass.gov',
  },
  // Michigan
  {
    occupationId: 'real-estate-appraiser', stateCode: 'MI', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 28 },
    officialName: 'Michigan Real Estate Appraisers Board',
    officialUrl: 'https://www.michigan.gov/lara',
  },
  // Minnesota
  {
    occupationId: 'real-estate-appraiser', stateCode: 'MN', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 28 },
    officialName: 'Minnesota Department of Commerce',
    officialUrl: 'https://mn.gov/commerce',
  },
  // Mississippi
  {
    occupationId: 'real-estate-appraiser', stateCode: 'MS', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 28 },
    officialName: 'Mississippi Real Estate Appraiser Commission',
  },
  // Missouri
  {
    occupationId: 'real-estate-appraiser', stateCode: 'MO', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 28 },
    officialName: 'Missouri Real Estate Appraisers Commission',
  },
  // Montana
  {
    occupationId: 'real-estate-appraiser', stateCode: 'MT', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 28 },
    officialName: 'Montana Board of Real Estate Appraisers',
  },
  // Nebraska
  {
    occupationId: 'real-estate-appraiser', stateCode: 'NE', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 28 },
  },
  // Nevada
  {
    occupationId: 'real-estate-appraiser', stateCode: 'NV', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 28 },
    officialName: 'Nevada Real Estate Division — Appraiser Certification Program',
    officialUrl: 'https://red.nv.gov',
  },
  // New Hampshire
  {
    occupationId: 'real-estate-appraiser', stateCode: 'NH', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 28 },
    officialName: 'New Hampshire Real Estate Appraiser Board',
  },
  // New Jersey
  {
    occupationId: 'real-estate-appraiser', stateCode: 'NJ', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 28 },
  },
  // New Mexico
  {
    occupationId: 'real-estate-appraiser', stateCode: 'NM', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 28 },
    officialName: 'New Mexico Real Estate Appraisers Board',
  },
  // New York
  {
    occupationId: 'real-estate-appraiser', stateCode: 'NY', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 28 },
    officialName: 'New York State Department of State — Division of Licensing Services',
    officialUrl: 'https://www.dos.ny.gov',
  },
  // North Carolina
  {
    occupationId: 'real-estate-appraiser', stateCode: 'NC', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 28 },
    officialName: 'North Carolina Appraisal Board',
    officialUrl: 'https://www.ncappraisalboard.org',
  },
  // North Dakota
  {
    occupationId: 'real-estate-appraiser', stateCode: 'ND', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 28 },
  },
  // Ohio
  {
    occupationId: 'real-estate-appraiser', stateCode: 'OH', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 28 },
    officialName: 'Ohio Division of Real Estate and Professional Licensing',
    officialUrl: 'https://com.ohio.gov',
  },
  // Oklahoma
  {
    occupationId: 'real-estate-appraiser', stateCode: 'OK', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 28 },
    officialName: 'Oklahoma Real Estate Appraiser Board',
    officialUrl: 'https://www.oid.ok.gov',
  },
  // Oregon
  {
    occupationId: 'real-estate-appraiser', stateCode: 'OR', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 28 },
    officialName: 'Oregon Appraiser Certification and Licensure Board',
    officialUrl: 'https://www.oregon.gov/CCB/appraiser',
  },
  // Pennsylvania
  {
    occupationId: 'real-estate-appraiser', stateCode: 'PA', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 28 },
    officialName: 'Pennsylvania State Board of Certified Real Estate Appraisers',
    officialUrl: 'https://www.dos.pa.gov',
  },
  // Rhode Island
  {
    occupationId: 'real-estate-appraiser', stateCode: 'RI', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 28 },
    officialName: 'Rhode Island Real Estate Appraisers Board',
  },
  // South Carolina
  {
    occupationId: 'real-estate-appraiser', stateCode: 'SC', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 28 },
    officialName: 'South Carolina Appraisers Board',
    officialUrl: 'https://www.llr.sc.gov',
  },
  // South Dakota
  {
    occupationId: 'real-estate-appraiser', stateCode: 'SD', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 28 },
    officialName: 'South Dakota Real Estate Appraiser Certification Board',
  },
  // Tennessee
  {
    occupationId: 'real-estate-appraiser', stateCode: 'TN', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 28 },
    officialName: 'Tennessee Real Estate Appraiser Commission',
    officialUrl: 'https://www.tn.gov/commerce',
  },
  // Texas
  {
    occupationId: 'real-estate-appraiser', stateCode: 'TX', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 28 },
    officialName: 'Texas Appraiser Licensing and Certification Board',
    officialUrl: 'https://www.talcb.texas.gov',
  },
  // Utah
  {
    occupationId: 'real-estate-appraiser', stateCode: 'UT', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 28 },
    officialName: 'Utah Real Estate Appraiser Licensing Board',
  },
  // Vermont
  {
    occupationId: 'real-estate-appraiser', stateCode: 'VT', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 28 },
    officialName: 'Vermont Real Estate Appraiser Board',
  },
  // Virginia
  {
    occupationId: 'real-estate-appraiser', stateCode: 'VA', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 28 },
    officialName: 'Virginia Real Estate Appraiser Board',
    officialUrl: 'https://www.dpor.virginia.gov',
  },
  // Washington
  {
    occupationId: 'real-estate-appraiser', stateCode: 'WA', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 28 },
    officialName: 'Washington State Department of Licensing',
    officialUrl: 'https://www.dol.wa.gov',
  },
  // West Virginia
  {
    occupationId: 'real-estate-appraiser', stateCode: 'WV', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 28 },
    officialName: 'West Virginia Real Estate Appraiser Licensing and Certification Board',
  },
  // Wisconsin
  {
    occupationId: 'real-estate-appraiser', stateCode: 'WI', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 28 },
    officialName: 'Wisconsin Real Estate Appraisers Board',
    officialUrl: 'https://dsps.wi.gov',
  },
  // Wyoming
  {
    occupationId: 'real-estate-appraiser', stateCode: 'WY', retrieved: RETRIEVED,
    educationHours: 75, ageMinimum: 18, backgroundCheck: true,
    examVendor: pearson,
    renewal: { years: 2, ceHours: 28 },
    officialName: 'Wyoming Real Estate Appraiser Board',
  },
]
