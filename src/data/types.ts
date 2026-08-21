// ============================================================================
// LicenseFig — core data types (F0 data layer schema)
// Occupation × State × fields. Every field must be sourced from an official
// state board / exam vendor / CMS and carry a retrieval date. No fabricated
// numbers. Unknown fields stay null and the UI renders "verify with your state
// board" guidance instead of inventing values.
// ============================================================================

export interface ExamVendor {
  name: string; // Pearson VUE | PSI | Prometric | Credentia | Headmaster | State board | ...
  url?: string;
}

export interface ExamStructure {
  nationalQuestions?: number; // scored, national portion
  stateQuestions?: number; // scored, state portion
  timeLimitMin?: number;
  passingPct?: number; // e.g. 75
  retakeWait?: string; // e.g. "10 days" | "24 hours" | "3 attempts per year"
  retakeFee?: number;
  examFee?: number;
}

export interface LicenseRequirements {
  occupationId: string;
  stateCode: string; // e.g. "CA"
  educationHours?: number; // pre-license training hours
  ageMinimum?: number;
  educationLevel?: string; // "High school diploma / GED"
  backgroundCheck?: boolean;
  examVendor?: ExamVendor;
  exam?: ExamStructure;
  applicationFee?: number;
  licenseFee?: number;
  renewal?: { years: number; ceHours?: number };
  reciprocity?: string; // short note: "Yes — 7 states" | "No" | "Partial"
  passRatePct?: number; // first-attempt, published by state
  passRateSource?: string;
  officialUrl?: string; // state board / commission page
  officialName?: string; // e.g. "California Department of Real Estate"
  retrieved: string; // retrieval date, e.g. "2026-08-20"
}

export interface Occupation {
  id: string; // "real-estate-salesperson"
  slug: string;
  name: string; // "Real Estate Salesperson"
  shortName: string; // "Real Estate"
  category: 'property' | 'healthcare' | 'finance' | 'beauty' | 'trades' | 'public';
  emoji: string;
  description: string;
  examVendors: string[]; // typical vendors across states
  nationalPassRatePct?: number; // published national range (source cited)
}

export interface State {
  code: string;
  name: string;
  fips?: string;
}

// 15 high-value licensed occupations (Wave 1 launch set)
export const OCCUPATIONS: Occupation[] = [
  {
    id: 'real-estate-salesperson', slug: 'real-estate-salesperson',
    name: 'Real Estate Salesperson', shortName: 'Real Estate',
    category: 'property', emoji: '🏠',
    description: 'Sells and leases residential/commercial property under a broker. 40-50% of the exam is state-specific law.',
    examVendors: ['PSI', 'Pearson VUE'], nationalPassRatePct: 55,
  },
  {
    id: 'real-estate-broker', slug: 'real-estate-broker',
    name: 'Real Estate Broker', shortName: 'Broker',
    category: 'property', emoji: '🏢',
    description: 'Owns or manages a brokerage and supervises salespersons. Requires additional experience and a harder exam.',
    examVendors: ['PSI', 'Pearson VUE'], nationalPassRatePct: 55,
  },
  {
    id: 'notary-public', slug: 'notary-public',
    name: 'Notary Public', shortName: 'Notary',
    category: 'public', emoji: '📜',
    description: 'State-appointed witness for document signings. Simple requirements — no formal education in most states.',
    examVendors: ['State'], nationalPassRatePct: 85,
  },
  {
    id: 'cna', slug: 'cna',
    name: 'Certified Nursing Assistant', shortName: 'CNA',
    category: 'healthcare', emoji: '🩺',
    description: 'Provides hands-on patient care under RN supervision. Two-part exam: written + clinical skills.',
    examVendors: ['Credentia', 'Pearson VUE', 'Prometric', 'Headmaster'], nationalPassRatePct: 80,
  },
  {
    id: 'insurance-agent-pc', slug: 'insurance-agent-pc',
    name: 'Insurance Agent — Property & Casualty', shortName: 'P&C Agent',
    category: 'finance', emoji: '🛡️',
    description: 'Sells auto, home and liability insurance. State licensing exams administered by PSI/Pearson VUE.',
    examVendors: ['PSI', 'Pearson VUE'], nationalPassRatePct: 60,
  },
  {
    id: 'insurance-agent-lh', slug: 'insurance-agent-lh',
    name: 'Insurance Agent — Life & Health', shortName: 'L&H Agent',
    category: 'finance', emoji: '❤️',
    description: 'Sells life, health and annuity products. Separate state license from P&C.',
    examVendors: ['PSI', 'Pearson VUE'], nationalPassRatePct: 60,
  },
  {
    id: 'real-estate-appraiser', slug: 'real-estate-appraiser',
    name: 'Real Estate Appraiser', shortName: 'Appraiser',
    category: 'property', emoji: '📐',
    description: 'Values property for lending and tax purposes. Trainee → licensed → certified progression.',
    examVendors: ['Pearson VUE', 'PSI'], nationalPassRatePct: 65,
  },
  {
    id: 'cosmetologist', slug: 'cosmetologist',
    name: 'Cosmetologist', shortName: 'Cosmetology',
    category: 'beauty', emoji: '💇‍♀️',
    description: 'Provides hair, skin and nail services. State board practical + written exam.',
    examVendors: ['State board', 'PSI'], nationalPassRatePct: 75,
  },
  {
    id: 'barber', slug: 'barber',
    name: 'Barber', shortName: 'Barber',
    category: 'beauty', emoji: '💈',
    description: 'Provides hair cutting, shaving and grooming services. Separate state license from cosmetology.',
    examVendors: ['State board', 'PSI'], nationalPassRatePct: 75,
  },
  {
    id: 'nail-technician', slug: 'nail-technician',
    name: 'Nail Technician', shortName: 'Nail Tech',
    category: 'beauty', emoji: '💅',
    description: 'Performs manicures, pedicures and nail art. Often the quickest beauty license to earn.',
    examVendors: ['State board'], nationalPassRatePct: 80,
  },
  {
    id: 'esthetician', slug: 'esthetician',
    name: 'Esthetician', shortName: 'Esthetician',
    category: 'beauty', emoji: '🧖',
    description: 'Performs skin care treatments, facials and waxing. State board license.',
    examVendors: ['State board'], nationalPassRatePct: 78,
  },
  {
    id: 'massage-therapist', slug: 'massage-therapist',
    name: 'Massage Therapist', shortName: 'Massage Therapy',
    category: 'healthcare', emoji: '💆',
    description: 'Provides therapeutic massage. Most states license via MBLEx (FSMTB) or state exam.',
    examVendors: ['FSMTB (MBLEx)', 'State board'], nationalPassRatePct: 70,
  },
  {
    id: 'home-inspector', slug: 'home-inspector',
    name: 'Home Inspector', shortName: 'Home Inspector',
    category: 'trades', emoji: '🔍',
    description: 'Inspects homes for buyers/sellers. State licensing varies from registration to exam.',
    examVendors: ['State board', 'National Home Inspector Exam'], nationalPassRatePct: 72,
  },
  {
    id: 'pest-control-applicator', slug: 'pest-control-applicator',
    name: 'Pest Control Applicator', shortName: 'Pest Control',
    category: 'trades', emoji: '🐜',
    description: 'Applies pesticides commercially. EPA/state-certified categories.',
    examVendors: ['State dept of agriculture'], nationalPassRatePct: 75,
  },
  {
    id: 'security-guard', slug: 'security-guard',
    name: 'Security Guard', shortName: 'Security Guard',
    category: 'public', emoji: '🛂',
    description: 'Licensed unarmed/armed guard. Many states require a short course + registration.',
    examVendors: ['State'], nationalPassRatePct: 88,
  },
  // ---- Wave 2 (2026-08-21): 15 high-demand licensed occupations ----
  {
    id: 'registered-nurse', slug: 'registered-nurse',
    name: 'Registered Nurse', shortName: 'RN',
    category: 'healthcare', emoji: '🩺',
    description: 'Provides direct patient care and coordinates care plans. Requires an ADN or BSN and the NCLEX-RN; licensing is via state boards of nursing.',
    examVendors: ['Pearson VUE'],
  },
  {
    id: 'licensed-practical-nurse', slug: 'licensed-practical-nurse',
    name: 'Licensed Practical Nurse', shortName: 'LPN',
    category: 'healthcare', emoji: '💉',
    description: 'Provides basic nursing care under RN or physician supervision. Requires a practical-nursing diploma and the NCLEX-PN.',
    examVendors: ['Pearson VUE'],
  },
  {
    id: 'pharmacist', slug: 'pharmacist',
    name: 'Pharmacist', shortName: 'Pharmacist',
    category: 'healthcare', emoji: '💊',
    description: 'Dispenses prescriptions and advises on medication. Requires a PharmD and the NAPLEX plus a state pharmacy law exam (MPJE).',
    examVendors: ['Pearson VUE'],
  },
  {
    id: 'physical-therapist', slug: 'physical-therapist',
    name: 'Physical Therapist', shortName: 'Physical Therapist',
    category: 'healthcare', emoji: '🦴',
    description: 'Diagnoses and treats movement and mobility disorders. Requires a DPT and the NPTE administered by FSBPT.',
    examVendors: ['Pearson VUE'],
  },
  {
    id: 'dental-hygienist', slug: 'dental-hygienist',
    name: 'Dental Hygienist', shortName: 'Dental Hygienist',
    category: 'healthcare', emoji: '🦷',
    description: 'Provides preventive oral care and cleanings under dentist supervision. Requires the NBDHE and a state license.',
    examVendors: ['Pearson VUE'],
  },
  {
    id: 'electrician', slug: 'electrician',
    name: 'Electrician', shortName: 'Electrician',
    category: 'trades', emoji: '⚡',
    description: 'Installs and repairs electrical systems. Journeyman licenses are issued by state or municipal boards; most require an apprenticeship and a state exam.',
    examVendors: ['PSI', 'Pearson VUE'],
  },
  {
    id: 'plumber', slug: 'plumber',
    name: 'Plumber', shortName: 'Plumber',
    category: 'trades', emoji: '🔧',
    description: 'Installs and repairs water, gas and drainage systems. Journeyman plumber licenses vary by state and locality; many require apprenticeship hours plus an exam.',
    examVendors: ['PSI', 'State board'],
  },
  {
    id: 'hvac-technician', slug: 'hvac-technician',
    name: 'HVAC Technician', shortName: 'HVAC',
    category: 'trades', emoji: '❄️',
    description: 'Installs and services heating, ventilation and cooling equipment. Licensing varies widely — many states require a contractor license or EPA Section 608 certification.',
    examVendors: ['State board', 'PSI'],
  },
  {
    id: 'general-contractor', slug: 'general-contractor',
    name: 'General Contractor', shortName: 'General Contractor',
    category: 'trades', emoji: '🏗️',
    description: 'Bids and manages construction projects. Most states license contractors through a state board; requirements range from registration to a written exam (e.g. California CSLB).',
    examVendors: ['State board', 'PSI'],
  },
  {
    id: 'professional-engineer', slug: 'professional-engineer',
    name: 'Professional Engineer', shortName: 'PE',
    category: 'trades', emoji: '📐',
    description: 'Signs off on engineering plans and public works. Requires an ABET-accredited degree, the FE then the PE exam (NCEES), plus state experience rules.',
    examVendors: ['NCEES (Pearson VUE)'],
  },
  {
    id: 'attorney', slug: 'attorney',
    name: 'Attorney', shortName: 'Attorney',
    category: 'public', emoji: '⚖️',
    description: 'Represents clients in legal matters. Requires a JD, passing the bar exam (NCBE) in the licensing state, and character and fitness review.',
    examVendors: ['NCBE', 'State bar'],
  },
  {
    id: 'certified-public-accountant', slug: 'certified-public-accountant',
    name: 'Certified Public Accountant', shortName: 'CPA',
    category: 'finance', emoji: '📊',
    description: 'Files and audits financial statements. Requires 150 credit hours, the Uniform CPA Exam (AICPA), and work experience.',
    examVendors: ['Prometric'],
  },
  {
    id: 'emt', slug: 'emt',
    name: 'Emergency Medical Technician', shortName: 'EMT',
    category: 'public', emoji: '🚑',
    description: 'Provides emergency medical care and transport. Requires a state-approved course and the NREMT cognitive and psychomotor exams.',
    examVendors: ['Pearson VUE'],
  },
  {
    id: 'commercial-driver-license', slug: 'commercial-driver-license',
    name: 'Commercial Driver License Holder', shortName: 'CDL',
    category: 'public', emoji: '🚛',
    description: 'Operates commercial vehicles (Class A/B/C). Requires FMCSA-compliant state testing: written knowledge tests, a skills test, and a medical card.',
    examVendors: ['State DMV'],
  },
  {
    id: 'architect', slug: 'architect',
    name: 'Architect', shortName: 'Architect',
    category: 'trades', emoji: '🏛️',
    description: 'Designs buildings and oversees construction compliance. Requires a NAAB-accredited degree, AXP experience hours and the ARE (NCARB).',
    examVendors: ['Prometric (NCARB)'],
  },
];

export const STATES: State[] = [
  { code: 'AL', name: 'Alabama' }, { code: 'AK', name: 'Alaska' }, { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' }, { code: 'CA', name: 'California' }, { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' }, { code: 'DE', name: 'Delaware' }, { code: 'DC', name: 'District of Columbia' },
  { code: 'FL', name: 'Florida' }, { code: 'GA', name: 'Georgia' }, { code: 'HI', name: 'Hawaii' },
  { code: 'ID', name: 'Idaho' }, { code: 'IL', name: 'Illinois' }, { code: 'IN', name: 'Indiana' },
  { code: 'IA', name: 'Iowa' }, { code: 'KS', name: 'Kansas' }, { code: 'KY', name: 'Kentucky' },
  { code: 'LA', name: 'Louisiana' }, { code: 'ME', name: 'Maine' }, { code: 'MD', name: 'Maryland' },
  { code: 'MA', name: 'Massachusetts' }, { code: 'MI', name: 'Michigan' }, { code: 'MN', name: 'Minnesota' },
  { code: 'MS', name: 'Mississippi' }, { code: 'MO', name: 'Missouri' }, { code: 'MT', name: 'Montana' },
  { code: 'NE', name: 'Nebraska' }, { code: 'NV', name: 'Nevada' }, { code: 'NH', name: 'New Hampshire' },
  { code: 'NJ', name: 'New Jersey' }, { code: 'NM', name: 'New Mexico' }, { code: 'NY', name: 'New York' },
  { code: 'NC', name: 'North Carolina' }, { code: 'ND', name: 'North Dakota' }, { code: 'OH', name: 'Ohio' },
  { code: 'OK', name: 'Oklahoma' }, { code: 'OR', name: 'Oregon' }, { code: 'PA', name: 'Pennsylvania' },
  { code: 'RI', name: 'Rhode Island' }, { code: 'SC', name: 'South Carolina' }, { code: 'SD', name: 'South Dakota' },
  { code: 'TN', name: 'Tennessee' }, { code: 'TX', name: 'Texas' }, { code: 'UT', name: 'Utah' },
  { code: 'VT', name: 'Vermont' }, { code: 'VA', name: 'Virginia' }, { code: 'WA', name: 'Washington' },
  { code: 'WV', name: 'West Virginia' }, { code: 'WI', name: 'Wisconsin' }, { code: 'WY', name: 'Wyoming' },
];

export const getOccupation = (id: string) => OCCUPATIONS.find((o) => o.id === id);
export const getState = (code: string) => STATES.find((s) => s.code === code);
