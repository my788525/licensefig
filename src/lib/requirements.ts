// ============================================================================
// Safe access to the requirements data registry (`src/data/requirements`).
//
// `getRequirements` never throws: missing occupation rows resolve to an empty
// array, incomplete rows keep unknown fields null. This module normalizes the
// array to a `{ STATE_CODE: LicenseRequirements }` map for tools that need
// per-state lookups. Empty maps render "Data pending — verify with your state
// board" in the UI instead of crashing.
// ============================================================================

import { getRequirements } from '@/data/requirements'
import type { LicenseRequirements } from '@/data/types'

export type RequirementMap = Record<string, LicenseRequirements>

export function requirementsMap(occupationId: string): RequirementMap {
  const map: RequirementMap = {}
  for (const item of getRequirements(occupationId)) {
    if (item && item.stateCode) map[item.stateCode.toUpperCase()] = item
  }
  return map
}

export function isPending(data: RequirementMap, stateCode?: string): boolean {
  if (!stateCode) return Object.keys(data).length === 0
  return !data[stateCode.toUpperCase()]
}
