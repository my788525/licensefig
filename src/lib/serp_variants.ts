/**
 * SERP description A/B variant store (CTR optimization).
 * ACTIVE_VARIANT selects which description is served. Flip the index
 * once real GSC CTR data is available — no component edits required.
 */

export const ACTIVE_VARIANT = 0;

export const HOME_DESC_VARIANTS: string[] = [
  'Compare state-by-state license requirements, exam structure, costs, pass rates and retake rules for real estate, CNA, insurance, beauty and trade licenses. Free planning tools for every step of the licensing road.',
  'How do I get licensed in my state? LicenseFig compares requirements, exam structure, costs and pass rates for 15 careers — free, state by state.',
];

export const TOOL_DESC_VARIANTS: Record<string, string[]> = {
  tools: [
    'Free printable planning tools for every step of the licensing road: progress tracker, exam countdown, sample questions, flashcards, formula sheets, renewal calculators and more.',
    'What licensing tool do you need? Browse 20+ free in-browser planners — requirements lookup, study plan, exam countdown, retake interval and renewal.',
  ],
  occupations: [
    'Browse 15 licensed careers: real estate, CNA, insurance, beauty, trades and more. See state-by-state requirements, exam structure, costs and pass rates.',
    'Which career should I get licensed in? Compare 15 licensed careers state by state — requirements, exam, costs and pass rates.',
  ],
};

export function homeDescription(variant = ACTIVE_VARIANT): string {
  return HOME_DESC_VARIANTS[variant] ?? HOME_DESC_VARIANTS[0];
}

export function toolDescription(route: string, variant = ACTIVE_VARIANT): string {
  const arr = TOOL_DESC_VARIANTS[route];
  if (!arr) return '';
  return arr[variant] ?? arr[0];
}
