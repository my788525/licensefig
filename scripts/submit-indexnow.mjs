// =============================================================================
// IndexNow URL submission — pings Bing/Yandex/Seekr right after deploy so the
// new licensefig pages get crawled fast.
// Usage: node scripts/submit-indexnow.mjs (run AFTER `git push` deploys)
// Docs: https://www.indexnow.org/documentation
// =============================================================================
const KEY = 'b7f3a91c4d52e80f6a2c5d94e1b8f073'
const HOST = 'licensefig.com'
const BASE = `https://${HOST}`

// Highest-value URLs first (keep payload useful): core tools + career hubs +
// top-state long-tails. Full sitemap (3168 URLs) is submitted to GSC/Bing
// separately; IndexNow accelerates the most important pages.
const urls = [
  `${BASE}/`,
  `${BASE}/occupations/`,
  `${BASE}/tools/`,
  `${BASE}/tools/license-journey/`,
  `${BASE}/tools/requirements-lookup/`,
  `${BASE}/tools/study-plan-generator/`,
  `${BASE}/tools/retake-interval/`,
  `${BASE}/tools/pass-rate-index/`,
  `${BASE}/tools/reciprocity-checker/`,
  `${BASE}/tools/exam-cost-compare/`,
  `${BASE}/tools/sample-questions/`,
  `${BASE}/occupations/real-estate-salesperson/`,
  `${BASE}/occupations/cna/`,
  `${BASE}/occupations/notary-public/`,
  `${BASE}/occupations/insurance-agent-pc/`,
  `${BASE}/occupations/cosmetologist/`,
  `${BASE}/licensing-guides/real-estate-salesperson/CA/`,
  `${BASE}/licensing-guides/real-estate-salesperson/TX/`,
  `${BASE}/licensing-guides/real-estate-salesperson/FL/`,
  `${BASE}/licensing-guides/cna/CA/`,
  `${BASE}/licensing-guides/cna/FL/`,
  `${BASE}/licensing-guides/notary-public/CA/`,
  `${BASE}/guides/real-estate-salesperson/`,
  `${BASE}/guides/cna/`,
  `${BASE}/guides/exam-changes-2026/`,
  `${BASE}/pass-rates/cna/`,
  `${BASE}/exam-costs/real-estate-salesperson/`,
  `${BASE}/reciprocity/real-estate-salesperson/`,
  `${BASE}/data/`,
  `${BASE}/methodology/`,
]

const payload = { host: HOST, key: KEY, keyLocation: `${BASE}/${KEY}.txt`, urlList: urls }

async function main() {
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  })
  console.log('IndexNow status:', res.status, res.status === 200 ? 'OK' : await res.text())
}

main()
