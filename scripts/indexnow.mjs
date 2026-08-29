// IndexNow submission for licensefig.com.
// Reads the built sitemap and submits all URLs to IndexNow (Bing/Naver/Yandex).
// Key file (ownership verification): public/<KEY>.txt -> https://licensefig.com/<KEY>.txt
//
// Usage:
//   npm run indexnow            # submit all URLs from the built sitemap
//   node scripts/indexnow.mjs --dry   # print payload, do not POST
//
// 202 = accepted (batch). 403 = Bing WMT ownership gate (key file is in place; verify in Bing WMT). 429 = rate limited, retry later.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');
const OUT = path.join(ROOT, 'out');

const HOST = 'licensefig.com';
const KEY_FILE = 'ec7274e2733bb10d0ad4a636dbca453e.txt';
const KEY = fs.readFileSync(path.join(PUBLIC, KEY_FILE), 'utf8').trim();
const KEY_LOCATION = `https://${HOST}/${KEY_FILE}`;

const sitemapPath = fs.existsSync(path.join(OUT, 'sitemap-0.xml'))
  ? path.join(OUT, 'sitemap-0.xml')
  : fs.existsSync(path.join(OUT, 'sitemap.xml'))
    ? path.join(OUT, 'sitemap.xml')
    : path.join(PUBLIC, 'sitemap.xml');
const sitemap = fs.readFileSync(sitemapPath, 'utf8');
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

if (urlList.length === 0) {
  console.error('indexnow: no <loc> URLs found in', sitemapPath);
  process.exit(1);
}
console.log(`indexnow: ${urlList.length} URLs from ${path.relative(ROOT, sitemapPath)}`);
console.log(`indexnow: keyLocation=${KEY_LOCATION}`);

if (process.argv.includes('--dry')) {
  console.log('indexnow: DRY RUN — payload below, no POST sent.');
  console.log(JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }, null, 2));
  process.exit(0);
}

const payload = JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList });
const endpoint = 'https://api.indexnow.org/indexnow';
try {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: payload,
  });
  const text = await res.text();
  console.log(`indexnow: HTTP ${res.status} ${res.statusText}`);
  if (text) console.log(`indexnow: body: ${text}`);
  if (res.status === 202 || res.status === 200) {
    console.log('indexnow: SUCCESS — search engines notified.');
    process.exit(0);
  }
  process.exit(2);
} catch (err) {
  console.error('indexnow: request failed:', err.message);
  process.exit(3);
}
