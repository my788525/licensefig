// Generate open datasets (public/data/*.json + data-version.json + CHANGELOG.md)
// from the TypeScript requirement datasets. Run with Node 22 --experimental-strip-types.
import { writeFileSync, mkdirSync } from 'node:fs'
import { OCCUPATIONS } from '../src/data/types.ts'
import { realEstateSalespersonRequirements } from '../src/data/requirements/real-estate-salesperson.ts'
import { realEstateBrokerRequirements } from '../src/data/requirements/real-estate-broker.ts'
import { notaryPublicRequirements } from '../src/data/requirements/notary-public.ts'
import { cnaRequirements } from '../src/data/requirements/cna.ts'
import { insurance_agent_pcRequirements } from '../src/data/requirements/insurance-agent-pc.ts'
import { insurance_agent_lhRequirements } from '../src/data/requirements/insurance-agent-lh.ts'
import { real_estate_appraiserRequirements } from '../src/data/requirements/real-estate-appraiser.ts'
import { cosmetologistRequirements } from '../src/data/requirements/cosmetologist.ts'
import { barberRequirements } from '../src/data/requirements/barber.ts'
import { nail_technicianRequirements } from '../src/data/requirements/nail-technician.ts'
import { estheticianRequirements } from '../src/data/requirements/esthetician.ts'
import { massage_therapistRequirements } from '../src/data/requirements/massage-therapist.ts'
import { home_inspectorRequirements } from '../src/data/requirements/home-inspector.ts'
import { pest_control_applicatorRequirements } from '../src/data/requirements/pest-control-applicator.ts'
import { security_guardRequirements } from '../src/data/requirements/security-guard.ts'

const REQUIREMENTS_BY_OCCUPATION = {
  'real-estate-salesperson': realEstateSalespersonRequirements,
  'real-estate-broker': realEstateBrokerRequirements,
  'notary-public': notaryPublicRequirements,
  cna: cnaRequirements,
  'insurance-agent-pc': insurance_agent_pcRequirements,
  'insurance-agent-lh': insurance_agent_lhRequirements,
  'real-estate-appraiser': real_estate_appraiserRequirements,
  cosmetologist: cosmetologistRequirements,
  barber: barberRequirements,
  'nail-technician': nail_technicianRequirements,
  esthetician: estheticianRequirements,
  'massage-therapist': massage_therapistRequirements,
  'home-inspector': home_inspectorRequirements,
  'pest-control-applicator': pest_control_applicatorRequirements,
  'security-guard': security_guardRequirements,
}

const OUT = 'public/data'
mkdirSync(OUT, { recursive: true })
const RETRIEVED = '2026-08-20'

// ---- requirements.json: occupation x state, compact ----
const requirements = {}
for (const occ of OCCUPATIONS) {
  const rows = REQUIREMENTS_BY_OCCUPATION[occ.id] ?? []
  requirements[occ.id] = rows.map((r) => ({
    state: r.stateCode,
    educationHours: r.educationHours ?? null,
    examVendor: r.examVendor?.name ?? null,
    nationalQuestions: r.exam?.nationalQuestions ?? null,
    stateQuestions: r.exam?.stateQuestions ?? null,
    passingPct: r.exam?.passingPct ?? null,
    examFee: r.exam?.examFee ?? null,
    retakeWait: r.exam?.retakeWait ?? null,
    passRatePct: r.passRatePct ?? null,
    applicationFee: r.applicationFee ?? null,
    licenseFee: r.licenseFee ?? null,
    renewalYears: r.renewal?.years ?? null,
    ceHours: r.renewal?.ceHours ?? null,
    reciprocity: r.reciprocity ?? null,
    officialName: r.officialName ?? null,
    officialUrl: r.officialUrl ?? null,
  }))
}
writeFileSync(`${OUT}/requirements.json`, JSON.stringify({ retrieved: RETRIEVED, schemaVersion: 1, license: 'CC BY 4.0', occupations: requirements }, null, 2))

// ---- pass-rates.json ----
const passRates = {}
for (const occ of OCCUPATIONS) {
  const rows = REQUIREMENTS_BY_OCCUPATION[occ.id] ?? []
  passRates[occ.id] = rows
    .filter((r) => r.passRatePct != null)
    .map((r) => ({ state: r.stateCode, passRatePct: r.passRatePct, source: r.passRateSource ?? 'state commission' }))
}
writeFileSync(`${OUT}/pass-rates.json`, JSON.stringify({ retrieved: RETRIEVED, schemaVersion: 1, license: 'CC BY 4.0', note: 'Only states that publish official first-attempt pass rates are listed.', passRates }, null, 2))

// ---- exam-costs.json ----
const examCosts = {}
for (const occ of OCCUPATIONS) {
  const rows = REQUIREMENTS_BY_OCCUPATION[occ.id] ?? []
  examCosts[occ.id] = rows
    .filter((r) => r.exam?.examFee != null || r.applicationFee != null)
    .map((r) => ({ state: r.stateCode, examFee: r.exam?.examFee ?? null, applicationFee: r.applicationFee ?? null }))
}
writeFileSync(`${OUT}/exam-costs.json`, JSON.stringify({ retrieved: RETRIEVED, schemaVersion: 1, license: 'CC BY 4.0', examCosts }, null, 2))

// ---- data-version.json ----
writeFileSync(
  `${OUT}/data-version.json`,
  JSON.stringify(
    {
      schemaVersion: 1,
      updated: RETRIEVED,
      license: 'CC BY 4.0',
      howToCite: 'licensefig.com open dataset (retrieved 2026-08-20)',
      datasets: [
        { file: 'requirements.json', description: 'License requirements matrix: 15 occupations x 50 states + DC' },
        { file: 'pass-rates.json', description: 'Published first-attempt pass rates by state (where officially released)' },
        { file: 'exam-costs.json', description: 'Exam and application fees by occupation and state' },
      ],
    },
    null,
    2
  )
)

// ---- CHANGELOG.md ----
const changelog = `# LicenseFig — Open Dataset Changelog

Machine-readable datasets, freely licensed (CC BY 4.0) for citation by AI assistants, apps and researchers. Always fetch the latest version.

| Dataset | Version | Updated | Notes |
|---|---|---|---|
| requirements.json | 2026.1 | ${RETRIEVED} | 15 occupations x 51 jurisdictions (50 states + DC) |
| pass-rates.json | 2026.1 | ${RETRIEVED} | Only states publishing official first-attempt pass rates |
| exam-costs.json | 2026.1 | ${RETRIEVED} | Where fee schedules are officially published |

Sources: state licensing boards, PSI, Pearson VUE, Credentia, CMS (NATCEP), FSMTB, state Secretary of State offices. Requirements change — verify with your state board.
`
writeFileSync(`${OUT}/CHANGELOG.md`, changelog)

// Summary
let filled = 0
let total = 0
for (const occ of OCCUPATIONS) {
  const rows = REQUIREMENTS_BY_OCCUPATION[occ.id] ?? []
  const has = rows.filter((r) => r.educationHours != null || r.exam?.examFee != null || r.passRatePct != null || r.officialUrl != null).length
  filled += has
  total += rows.length
}
console.log(`OK: ${OUT}/ (requirements.json, pass-rates.json, exam-costs.json, data-version.json, CHANGELOG.md)`)
console.log(`Coverage: ${filled}/${total} occupation-state rows with at least one verified field`)
