// Canonical network directory for the whole site matrix.
// Every site renders a THEMED SUBSET of this (minus its own domain) in a
// categorized footer strip. Links are nofollow + noopener (SEO-safe and
// compliant with Google's link-scheme policy for cross-site footer links).
//
// RELATIONS maps each category to the categories whose sites are thematically
// relevant to show from it. A site displays up to MAX_LINKS sites drawn from
// its own category first, then adjacent relevant categories. This keeps the
// footer focused (6–8 links) instead of a full 32-site reciprocal mesh, which
// Google's spam policy treats as "widely distributed template links" + "excessive
// link exchanges".

export const MAX_LINKS = 8;

export const NETWORK_SITES = [
  // Moving & home
  { domain: "relofig.com", label: "ReloFig", cat: "Moving & home", desc: "Moving cost calculators and household & commercial guides" },
  { domain: "renofig.com", label: "RenoFig", cat: "Moving & home", desc: "Renovation and remodeling cost estimates" },
  { domain: "estatefig.com", label: "EstateFig", cat: "Moving & home", desc: "Estate, probate, and inheritance planning" },
  // Money & tax
  { domain: "fisctalk.com", label: "Fisctalk", cat: "Money & tax", desc: "Tax calculators and filing guidance" },
  { domain: "paycalcfig.com", label: "PayCalc", cat: "Money & tax", desc: "Paycheck and take-home pay calculator" },
  { domain: "compoundfig.com", label: "CompoundFig", cat: "Money & tax", desc: "Compound interest and savings projections" },
  { domain: "allmoneycalc.com", label: "AllMoneyCalc", cat: "Money & tax", desc: "Everyday money and budget tools" },
  { domain: "ratefig.com", label: "RateFig", cat: "Money & tax", desc: "Rates, mortgage, and loan comparisons" },
  // Vehicle & insurance
  { domain: "vehcalc.com", label: "VehCalc", cat: "Vehicle & insurance", desc: "Vehicle ownership and running costs" },
  { domain: "insurtool.com", label: "InsurTool", cat: "Vehicle & insurance", desc: "Insurance premium comparison" },
  // Health & pet
  { domain: "pawfig.com", label: "PawFig", cat: "Health & pet", desc: "Pet care and ownership costs" },
  { domain: "bodystd.com", label: "BodyStd", cat: "Health & pet", desc: "Body measurement standards" },
  { domain: "caloriefig.com", label: "CalorieFig", cat: "Health & pet", desc: "Calorie and nutrition tools" },
  { domain: "mindtest.com", label: "MindTest", cat: "Health & pet", desc: "Mental wellbeing self-checks" },
  { domain: "moodfig.com", label: "MoodFig", cat: "Health & pet", desc: "Mood and habit tracking" },
  { domain: "vivmetric.com", label: "VivMetric", cat: "Health & pet", desc: "Body and vitals metrics" },
  // Safety & security
  { domain: "securfig.com", label: "SecurFig", cat: "Safety & security", desc: "Personal and home security guidance" },
  // Life events
  { domain: "childsupportfig.com", label: "ChildSupportFig", cat: "Life events", desc: "Child support calculators by state" },
  { domain: "visafig.com", label: "VisaFig", cat: "Life events", desc: "U.S. visa and immigration guides" },
  // Practical tools
  { domain: "edcost.com", label: "EdCost", cat: "Practical tools", desc: "College and education cost planning" },
  { domain: "unitfig.com", label: "UnitFig", cat: "Practical tools", desc: "Unit and measurement conversion" },
  { domain: "dayfig.com", label: "DayFig", cat: "Practical tools", desc: "Time zones and date math" },
  { domain: "tipfig.com", label: "TipFig", cat: "Practical tools", desc: "Tip and gratuity calculator" },
  { domain: "gradefig.com", label: "GradeFig", cat: "Practical tools", desc: "Grade and GPA calculators" },
  { domain: "pvfig.com", label: "PVFig", cat: "Practical tools", desc: "Solar PV system estimates" },
  { domain: "biztool.com", label: "BizTool", cat: "Practical tools", desc: "Small-business calculators" },
  { domain: "wikest.com", label: "WikiEst", cat: "Practical tools", desc: "Estimation reference wiki" },
  // Gaming & dev tools
  { domain: "gamesfig.com", label: "GamesFig", cat: "Tools", desc: "Game-related calculators" },
  { domain: "gamerulepro.com", label: "GameRulePro", cat: "Tools", desc: "Game rules and references" },
  { domain: "gamefixpro.com", label: "GameFixPro", cat: "Tools", desc: "Game troubleshooting" },
  { domain: "devfixpro.com", label: "DevFixPro", cat: "Tools", desc: "Developer fix guides" },
  { domain: "filefixpro.com", label: "FileFixPro", cat: "Tools", desc: "File repair guides" },
  { domain: "TweakGearPro.com", label: "TweakGearPro", cat: "Tools", desc: "Gear tweak guides" },
];

export const NETWORK_CATS = [
  "Moving & home",
  "Money & tax",
  "Vehicle & insurance",
  "Health & pet",
  "Safety & security",
  "Life events",
  "Practical tools",
  "Tools",
];

// Category affinity: which categories are relevant to show for a given category.
export const RELATIONS = {
  "Moving & home": [
    "Moving & home",
    "Vehicle & insurance",
    "Safety & security",
    "Health & pet",
    "Life events",
  ],
  "Money & tax": [
    "Money & tax",
    "Vehicle & insurance",
    "Life events",
    "Moving & home",
  ],
  "Vehicle & insurance": [
    "Vehicle & insurance",
    "Money & tax",
    "Moving & home",
  ],
  "Health & pet": [
    "Health & pet",
    "Safety & security",
    "Moving & home",
  ],
  "Safety & security": [
    "Safety & security",
    "Moving & home",
    "Health & pet",
    "Vehicle & insurance",
  ],
  "Life events": [
    "Life events",
    "Money & tax",
    "Moving & home",
  ],
  "Practical tools": [
    "Practical tools",
    "Money & tax",
    "Moving & home",
    "Vehicle & insurance",
  ],
  "Tools": [
    "Tools",
    "Practical tools",
  ],
};

// Given this site's own domain, return the themed subset of network sites to
// display: own category first, then adjacent relevant categories, capped at
// MAX_LINKS, with self removed.
export function getNetworkStrip(self) {
  const me = NETWORK_SITES.find((s) => s.domain === self);
  const cats = me ? RELATIONS[me.cat] || [me.cat] : NETWORK_CATS;
  const items = NETWORK_SITES.filter(
    (s) => s.domain !== self && cats.includes(s.cat)
  );
  items.sort((a, b) => cats.indexOf(a.cat) - cats.indexOf(b.cat));
  return { items: items.slice(0, MAX_LINKS), cats };
}
