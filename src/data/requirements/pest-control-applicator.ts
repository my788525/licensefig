// ============================================================================
// Pest Control Applicator — 50 states + DC
// Commercial pesticide applicators are certified in every state, typically by
// the state department of agriculture (or environmental protection agency),
// in line with EPA regulation. Certification is category-based (general,
// termite, fumigation, etc.) and nearly always requires a written state exam.
// Training-hour totals vary by category and are omitted. Unknown fields
// omitted (UI renders "verify with your state board"). Retrieved 2026-08-20.
//
// Fee additions verified 2026-08-20 via official sources:
//   FL — examFee $300 per category (structural pest control), license fees:
//        commercial applicator $250  https://fdacs.ccplatform.net/Business-Services/Pest-Control/Exam-Schedule-and-Information
// ============================================================================

import type { LicenseRequirements } from '../types';

const RETRIEVED = '2026-08-20';
const stateExam = { name: 'State exam' };

export const pest_control_applicatorRequirements: LicenseRequirements[] = [
  { occupationId: 'pest-control-applicator', stateCode: 'AL', ageMinimum: 18, examVendor: stateExam, officialName: 'Alabama Department of Agriculture and Industries', officialUrl: 'https://agi.alabama.gov', retrieved: RETRIEVED },
  { occupationId: 'pest-control-applicator', stateCode: 'AK', ageMinimum: 18, examVendor: stateExam, officialName: 'Alaska Department of Environmental Conservation — Pesticide Program', officialUrl: 'https://dec.alaska.gov', retrieved: RETRIEVED },
  { occupationId: 'pest-control-applicator', stateCode: 'AZ', ageMinimum: 18, examVendor: stateExam, officialName: 'Arizona Department of Agriculture', officialUrl: 'https://agriculture.az.gov', retrieved: RETRIEVED },
  { occupationId: 'pest-control-applicator', stateCode: 'AR', ageMinimum: 18, examVendor: stateExam, officialName: 'Arkansas State Plant Board', officialUrl: 'https://www.plantboard.arkansas.gov', retrieved: RETRIEVED },
  { occupationId: 'pest-control-applicator', stateCode: 'CA', ageMinimum: 18, examVendor: stateExam, officialName: 'California Department of Pesticide Regulation (DPR)', officialUrl: 'https://www.cdpr.ca.gov', retrieved: RETRIEVED },
  { occupationId: 'pest-control-applicator', stateCode: 'CO', ageMinimum: 18, examVendor: stateExam, officialName: 'Colorado Department of Agriculture — Pesticide Program', officialUrl: 'https://ag.colorado.gov', retrieved: RETRIEVED },
  { occupationId: 'pest-control-applicator', stateCode: 'CT', ageMinimum: 18, examVendor: stateExam, officialName: 'Connecticut Department of Energy and Environmental Protection — Pesticide Management', officialUrl: 'https://portal.ct.gov/DEEP', retrieved: RETRIEVED },
  { occupationId: 'pest-control-applicator', stateCode: 'DE', ageMinimum: 18, examVendor: stateExam, officialName: 'Delaware Department of Agriculture — Pesticide Compliance', officialUrl: 'https://agriculture.delaware.gov', retrieved: RETRIEVED },
  { occupationId: 'pest-control-applicator', stateCode: 'DC', ageMinimum: 18, examVendor: stateExam, officialName: 'DC Department of Energy and Environment', officialUrl: 'https://doee.dc.gov', retrieved: RETRIEVED },
  { occupationId: 'pest-control-applicator', stateCode: 'FL', ageMinimum: 18, examVendor: stateExam, exam: { examFee: 300 }, licenseFee: 250, officialName: 'Florida Department of Agriculture and Consumer Services (FDACS)', officialUrl: 'https://www.fdacs.gov', retrieved: RETRIEVED },
  { occupationId: 'pest-control-applicator', stateCode: 'GA', ageMinimum: 18, examVendor: stateExam, officialName: 'Georgia Department of Agriculture — Pesticide Division', officialUrl: 'https://agr.georgia.gov', retrieved: RETRIEVED },
  { occupationId: 'pest-control-applicator', stateCode: 'HI', ageMinimum: 18, examVendor: stateExam, officialName: 'Hawaii Department of Agriculture — Pesticides Branch', officialUrl: 'https://hdoa.hawaii.gov', retrieved: RETRIEVED },
  { occupationId: 'pest-control-applicator', stateCode: 'ID', ageMinimum: 18, examVendor: stateExam, officialName: 'Idaho State Department of Agriculture', officialUrl: 'https://agri.idaho.gov', retrieved: RETRIEVED },
  { occupationId: 'pest-control-applicator', stateCode: 'IL', ageMinimum: 18, examVendor: stateExam, officialName: 'Illinois Department of Agriculture', officialUrl: 'https://agr.illinois.gov', retrieved: RETRIEVED },
  { occupationId: 'pest-control-applicator', stateCode: 'IN', ageMinimum: 18, examVendor: stateExam, officialName: 'Indiana Office of the State Chemist', officialUrl: 'https://www.oisc.purdue.edu', retrieved: RETRIEVED },
  { occupationId: 'pest-control-applicator', stateCode: 'IA', ageMinimum: 18, examVendor: stateExam, officialName: 'Iowa Department of Agriculture and Land Stewardship', officialUrl: 'https://iowaagriculture.gov', retrieved: RETRIEVED },
  { occupationId: 'pest-control-applicator', stateCode: 'KS', ageMinimum: 18, examVendor: stateExam, officialName: 'Kansas Department of Agriculture — Pesticide and Fertilizer Program', officialUrl: 'https://agriculture.ks.gov', retrieved: RETRIEVED },
  { occupationId: 'pest-control-applicator', stateCode: 'KY', ageMinimum: 18, examVendor: stateExam, officialName: 'Kentucky Department of Agriculture — Division of Pesticide Regulation', officialUrl: 'https://www.kyagr.com', retrieved: RETRIEVED },
  { occupationId: 'pest-control-applicator', stateCode: 'LA', ageMinimum: 18, examVendor: stateExam, officialName: 'Louisiana Department of Agriculture and Forestry', officialUrl: 'https://www.ldaf.state.la.us', retrieved: RETRIEVED },
  { occupationId: 'pest-control-applicator', stateCode: 'ME', ageMinimum: 18, examVendor: stateExam, officialName: 'Maine Board of Pesticides Control', officialUrl: 'https://www.maine.gov/agriculture/pesticides', retrieved: RETRIEVED },
  { occupationId: 'pest-control-applicator', stateCode: 'MD', ageMinimum: 18, examVendor: stateExam, officialName: 'Maryland Department of Agriculture — Pesticide Regulation Section', officialUrl: 'https://mda.maryland.gov', retrieved: RETRIEVED },
  { occupationId: 'pest-control-applicator', stateCode: 'MA', ageMinimum: 18, examVendor: stateExam, officialName: 'Massachusetts Department of Agricultural Resources — Pesticide Program', officialUrl: 'https://www.mass.gov', retrieved: RETRIEVED },
  { occupationId: 'pest-control-applicator', stateCode: 'MI', ageMinimum: 18, examVendor: stateExam, officialName: 'Michigan Department of Agriculture and Rural Development', officialUrl: 'https://www.michigan.gov/mdard', retrieved: RETRIEVED },
  { occupationId: 'pest-control-applicator', stateCode: 'MN', ageMinimum: 18, examVendor: stateExam, officialName: 'Minnesota Department of Agriculture — Pesticide and Fertilizer Management', officialUrl: 'https://www.mda.state.mn.us', retrieved: RETRIEVED },
  { occupationId: 'pest-control-applicator', stateCode: 'MS', ageMinimum: 18, examVendor: stateExam, officialName: 'Mississippi Department of Agriculture and Commerce — Bureau of Plant Industry', officialUrl: 'https://www.mdac.ms.gov', retrieved: RETRIEVED },
  { occupationId: 'pest-control-applicator', stateCode: 'MO', ageMinimum: 18, examVendor: stateExam, officialName: 'Missouri Department of Agriculture — Pesticide Program', officialUrl: 'https://agriculture.mo.gov', retrieved: RETRIEVED },
  { occupationId: 'pest-control-applicator', stateCode: 'MT', ageMinimum: 18, examVendor: stateExam, officialName: 'Montana Department of Agriculture', officialUrl: 'https://agr.mt.gov', retrieved: RETRIEVED },
  { occupationId: 'pest-control-applicator', stateCode: 'NE', ageMinimum: 18, examVendor: stateExam, officialName: 'Nebraska Department of Agriculture — Pesticide Program', officialUrl: 'https://nda.nebraska.gov', retrieved: RETRIEVED },
  { occupationId: 'pest-control-applicator', stateCode: 'NV', ageMinimum: 18, examVendor: stateExam, officialName: 'Nevada Department of Agriculture', officialUrl: 'https://agri.nv.gov', retrieved: RETRIEVED },
  { occupationId: 'pest-control-applicator', stateCode: 'NH', ageMinimum: 18, examVendor: stateExam, officialName: 'New Hampshire Department of Agriculture, Markets and Food — Pesticide Control', officialUrl: 'https://www.agriculture.nh.gov', retrieved: RETRIEVED },
  { occupationId: 'pest-control-applicator', stateCode: 'NJ', ageMinimum: 18, examVendor: stateExam, officialName: 'New Jersey Department of Environmental Protection — Pesticide Control Program', officialUrl: 'https://www.nj.gov/dep', retrieved: RETRIEVED },
  { occupationId: 'pest-control-applicator', stateCode: 'NM', ageMinimum: 18, examVendor: stateExam, officialName: 'New Mexico Department of Agriculture', officialUrl: 'https://www.nmda.nmsu.edu', retrieved: RETRIEVED },
  { occupationId: 'pest-control-applicator', stateCode: 'NY', ageMinimum: 18, examVendor: stateExam, officialName: 'New York State Department of Environmental Conservation — Pesticide Certification', officialUrl: 'https://www.dec.ny.gov', retrieved: RETRIEVED },
  { occupationId: 'pest-control-applicator', stateCode: 'NC', ageMinimum: 18, examVendor: stateExam, officialName: 'North Carolina Department of Agriculture and Consumer Services — Structural Pest Control', officialUrl: 'https://www.ncagr.gov', retrieved: RETRIEVED },
  { occupationId: 'pest-control-applicator', stateCode: 'ND', ageMinimum: 18, examVendor: stateExam, officialName: 'North Dakota Department of Agriculture', officialUrl: 'https://www.ndda.nd.gov', retrieved: RETRIEVED },
  { occupationId: 'pest-control-applicator', stateCode: 'OH', ageMinimum: 18, examVendor: stateExam, officialName: 'Ohio Department of Agriculture — Pesticide Regulation', officialUrl: 'https://agri.ohio.gov', retrieved: RETRIEVED },
  { occupationId: 'pest-control-applicator', stateCode: 'OK', ageMinimum: 18, examVendor: stateExam, officialName: 'Oklahoma Department of Agriculture, Food and Forestry', officialUrl: 'https://ag.ok.gov', retrieved: RETRIEVED },
  { occupationId: 'pest-control-applicator', stateCode: 'OR', ageMinimum: 18, examVendor: stateExam, officialName: 'Oregon Department of Agriculture — Pesticides Division', officialUrl: 'https://www.oregon.gov/oda', retrieved: RETRIEVED },
  { occupationId: 'pest-control-applicator', stateCode: 'PA', ageMinimum: 18, examVendor: stateExam, officialName: 'Pennsylvania Department of Agriculture — Bureau of Plant Industry, Pesticide Regulation', officialUrl: 'https://www.agriculture.pa.gov', retrieved: RETRIEVED },
  { occupationId: 'pest-control-applicator', stateCode: 'RI', ageMinimum: 18, examVendor: stateExam, officialName: 'Rhode Island Department of Environmental Management — Pesticide Registration', officialUrl: 'https://dem.ri.gov', retrieved: RETRIEVED },
  { occupationId: 'pest-control-applicator', stateCode: 'SC', ageMinimum: 18, examVendor: stateExam, officialName: 'South Carolina Department of Pesticide Regulation', officialUrl: 'https://agriculture.sc.gov', retrieved: RETRIEVED },
  { occupationId: 'pest-control-applicator', stateCode: 'SD', ageMinimum: 18, examVendor: stateExam, officialName: 'South Dakota Department of Agriculture and Natural Resources', officialUrl: 'https://danr.sd.gov', retrieved: RETRIEVED },
  { occupationId: 'pest-control-applicator', stateCode: 'TN', ageMinimum: 18, examVendor: stateExam, officialName: 'Tennessee Department of Agriculture', officialUrl: 'https://www.tn.gov/agriculture', retrieved: RETRIEVED },
  { occupationId: 'pest-control-applicator', stateCode: 'TX', ageMinimum: 18, examVendor: stateExam, officialName: 'Texas Department of Agriculture — Structural Pest Control Service', officialUrl: 'https://www.texasagriculture.gov', retrieved: RETRIEVED },
  { occupationId: 'pest-control-applicator', stateCode: 'UT', ageMinimum: 18, examVendor: stateExam, officialName: 'Utah Department of Agriculture and Food', officialUrl: 'https://ag.utah.gov', retrieved: RETRIEVED },
  { occupationId: 'pest-control-applicator', stateCode: 'VT', ageMinimum: 18, examVendor: stateExam, officialName: 'Vermont Agency of Agriculture, Food and Markets', officialUrl: 'https://agriculture.vermont.gov', retrieved: RETRIEVED },
  { occupationId: 'pest-control-applicator', stateCode: 'VA', ageMinimum: 18, examVendor: stateExam, officialName: 'Virginia Department of Agriculture and Consumer Services — Office of Pesticide Services', officialUrl: 'https://www.vdacs.virginia.gov', retrieved: RETRIEVED },
  { occupationId: 'pest-control-applicator', stateCode: 'WA', ageMinimum: 18, examVendor: stateExam, officialName: 'Washington State Department of Agriculture — Pesticide Management Division', officialUrl: 'https://agr.wa.gov', retrieved: RETRIEVED },
  { occupationId: 'pest-control-applicator', stateCode: 'WV', ageMinimum: 18, examVendor: stateExam, officialName: 'West Virginia Department of Agriculture — Pesticide Regulatory Programs', officialUrl: 'https://agriculture.wv.gov', retrieved: RETRIEVED },
  { occupationId: 'pest-control-applicator', stateCode: 'WI', ageMinimum: 18, examVendor: stateExam, officialName: 'Wisconsin Department of Agriculture, Trade and Consumer Protection — Pesticide Management', officialUrl: 'https://datcp.wi.gov', retrieved: RETRIEVED },
  { occupationId: 'pest-control-applicator', stateCode: 'WY', ageMinimum: 18, examVendor: stateExam, officialName: 'Wyoming Department of Agriculture', officialUrl: 'https://wyagric.state.wy.us', retrieved: RETRIEVED },
];
