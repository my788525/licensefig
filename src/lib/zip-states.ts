// ============================================================================
// ZIP code → state detection using the standard USPS first-3-digit prefix
// ranges (public postal data). Used by TestCenterFinder and as an optional
// convenience in RequirementsLookup. Overlap between states at range edges
// is resolved in favor of the primary range; ZIP codes with no match (APO/FPO
// or non-standard) return null.
// ============================================================================

type ZipRange = readonly [number, number, string]

const ZIP3: ZipRange[] = [
  [350, 369, 'AL'], [995, 999, 'AK'], [850, 865, 'AZ'], [716, 729, 'AR'],
  [900, 961, 'CA'], [800, 816, 'CO'], [60, 69, 'CT'], [197, 199, 'DE'],
  [200, 205, 'DC'], [320, 349, 'FL'], [300, 319, 'GA'], [398, 399, 'GA'],
  [967, 968, 'HI'], [832, 838, 'ID'], [600, 629, 'IL'], [460, 479, 'IN'],
  [500, 528, 'IA'], [660, 679, 'KS'], [400, 427, 'KY'], [700, 714, 'LA'],
  [39, 49, 'ME'], [206, 219, 'MD'], [10, 27, 'MA'], [480, 499, 'MI'],
  [550, 567, 'MN'], [386, 397, 'MS'], [630, 658, 'MO'], [590, 599, 'MT'],
  [680, 693, 'NE'], [889, 898, 'NV'], [30, 38, 'NH'], [70, 89, 'NJ'],
  [870, 884, 'NM'], [100, 149, 'NY'], [5, 5, 'NY'], [270, 289, 'NC'],
  [580, 588, 'ND'], [430, 459, 'OH'], [730, 749, 'OK'], [970, 979, 'OR'],
  [150, 196, 'PA'], [28, 29, 'RI'], [290, 299, 'SC'], [570, 577, 'SD'],
  [370, 385, 'TN'], [733, 733, 'TX'], [750, 799, 'TX'], [885, 885, 'TX'],
  [840, 847, 'UT'], [50, 59, 'VT'], [201, 201, 'VA'], [220, 246, 'VA'],
  [980, 994, 'WA'], [247, 268, 'WV'], [530, 549, 'WI'], [820, 831, 'WY'],
]

export function stateFromZip(zip: string): string | null {
  const clean = zip.replace(/\D/g, '')
  if (clean.length !== 5) return null
  const prefix = Math.floor(Number(clean) / 100)
  for (const [lo, hi, code] of ZIP3) {
    if (prefix >= lo && prefix <= hi) return code
  }
  return null
}
