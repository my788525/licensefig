// =============================================================================
// Bing Webmaster URL submission — run AFTER every deploy.
// Reads the built sitemap, picks the highest-priority URLs within Bing's daily
// quota, and pushes them via SubmitUrlBatch (plus IndexNow for cross-engine).
// API key is read from .env (BING_WMT_API_KEY) — never commit the key.
// Docs: https://learn.microsoft.com/bingwebmaster/api-protocols
// =============================================================================
import { readFileSync, existsSync } from 'node:fs'

const SITEMAP = 'out/sitemap.xml'
const BING_API = 'https://ssl.bing.com/webmaster/api.svc/json'
const SITE_URL = 'https://licensefig.com/'

// Load key from .env (not committed)
function loadKey() {
  if (process.env.BING_WMT_API_KEY) return process.env.BING_WMT_API_KEY
  if (existsSync('.env')) {
    for (const line of readFileSync('.env', 'utf8').split('\n')) {
      const m = line.match(/^BING_WMT_API_KEY=(.+)$/)
      if (m) return m[1].trim()
    }
  }
  throw new Error('Missing BING_WMT_API_KEY in .env')
}

// Parse sitemap -> [{url, priority}], sort by priority desc
function loadUrls(limit) {
  const xml = readFileSync(SITEMAP, 'utf8')
  const urls = []
  const re = /<url>[\s\S]*?<loc>([^<]+)<\/loc>[\s\S]*?(?:<priority>([^<]+)<\/priority>)?/g
  let m
  while ((m = re.exec(xml))) {
    urls.push({ url: m[1].trim(), priority: parseFloat(m[2] || '0.5') })
  }
  urls.sort((a, b) => b.priority - a.priority)
  return urls.slice(0, limit).map((u) => u.url)
}

async function main() {
  const KEY = loadKey()
  const limit = parseInt(process.argv[2] || '80', 10) // keep under daily quota (100)
  const urls = loadUrls(limit)
  console.log(`Loaded ${urls.length} URLs from sitemap (limit ${limit})`)

  // 1) Bing SubmitUrlBatch
  const res = await fetch(`${BING_API}/SubmitUrlBatch?apikey=${KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'User-Agent': 'Mozilla/5.0 (LicenseFig)' },
    body: JSON.stringify({ siteUrl: SITE_URL, urlList: urls }),
  })
  console.log('Bing SubmitUrlBatch:', res.status, res.status === 200 ? 'OK' : await res.text())

  // 2) Bing quota status
  const q = await fetch(`${BING_API}/GetUrlSubmissionQuota?apikey=${KEY}&siteUrl=${encodeURIComponent(SITE_URL)}`, {
    headers: { 'User-Agent': 'Mozilla/5.0 (LicenseFig)' },
  })
  console.log('Bing quota:', await q.text())
}

main().catch((e) => {
  console.error('ERROR:', e.message)
  process.exit(1)
})
