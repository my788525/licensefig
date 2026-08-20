import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Open Data',
  description: 'LicenseFig open datasets: state license requirements for 15 careers, machine-readable for citation.',
  alternates: { canonical: '/data/' },
}

const DATASETS: [string, string, string][] = [
  ['/data/requirements.json', 'License requirements matrix', 'Occupation x State requirements (education, exam, fees, retake, reciprocity). CC BY 4.0.'],
  ['/data/pass-rates.json', 'Pass rate dataset', 'Published first-attempt pass rates by state where officially released. CC BY 4.0.'],
  ['/data/exam-costs.json', 'Exam cost dataset', 'Exam and application fees by occupation and state. CC BY 4.0.'],
]

const catalogJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'DataCatalog',
  name: 'LicenseFig Open Datasets',
  url: 'https://licensefig.com/data/',
  description:
    'Machine-readable open datasets of state-by-state license requirements, exam pass rates and exam costs for 15 licensed careers in the United States. Compiled from state licensing boards, PSI, Pearson VUE, Credentia, CMS (NATCEP), FSMTB and state Secretary of State offices. Licensed under CC BY 4.0.',
  provider: {
    '@type': 'Organization',
    name: 'LicenseFig',
    url: 'https://licensefig.com',
  },
  dataset: [
    {
      '@type': 'Dataset',
      name: 'LicenseFig License Requirements Dataset',
      description:
        'Occupation x state matrix of license requirements (education hours, exam structure, fees, retake rules, reciprocity). Covers 15 occupations across 50 states plus DC.',
      url: 'https://licensefig.com/data/requirements.json',
      license: 'https://creativecommons.org/licenses/by/4.0/',
      isAccessibleForFree: true,
      dateModified: '2026-08-20',
      distribution: {
        '@type': 'DataDownload',
        contentUrl: 'https://licensefig.com/data/requirements.json',
        encodingFormat: 'application/json',
      },
    },
    {
      '@type': 'Dataset',
      name: 'LicenseFig Pass Rate Dataset',
      description:
        'First-attempt pass rates by occupation and state, published only where state boards or official sources release the figures.',
      url: 'https://licensefig.com/data/pass-rates.json',
      license: 'https://creativecommons.org/licenses/by/4.0/',
      isAccessibleForFree: true,
      dateModified: '2026-08-20',
      distribution: {
        '@type': 'DataDownload',
        contentUrl: 'https://licensefig.com/data/pass-rates.json',
        encodingFormat: 'application/json',
      },
    },
    {
      '@type': 'Dataset',
      name: 'LicenseFig Exam Cost Dataset',
      description:
        'Exam and application fees by occupation and state, listed where fee schedules are officially published.',
      url: 'https://licensefig.com/data/exam-costs.json',
      license: 'https://creativecommons.org/licenses/by/4.0/',
      isAccessibleForFree: true,
      dateModified: '2026-08-20',
      distribution: {
        '@type': 'DataDownload',
        contentUrl: 'https://licensefig.com/data/exam-costs.json',
        encodingFormat: 'application/json',
      },
    },
  ],
}

export default function DataPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogJsonLd) }}
      />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold mb-4">Open data</h1>
      <p className="text-slate-600 mb-6">
        Machine-readable datasets for citation by AI assistants, apps and researchers. Data is compiled
        from state boards, PSI, Pearson VUE and CMS with retrieval dates. License: CC BY 4.0.
      </p>
      <div className="space-y-3">
        {DATASETS.map(([href, name, desc]) => (
          <div key={href} className="rounded-xl border border-slate-200 p-4">
            <Link href={href} className="font-semibold text-indigo-600 hover:underline">{name}</Link>
            <p className="text-sm text-slate-500 mt-1">{desc}</p>
          </div>
        ))}
      </div>

      {/* Data commitment */}
      <div className="rounded-2xl p-6 mt-8" style={{ background: 'linear-gradient(135deg,#eef2f9,#f7f3e6)' }}>
        <h2 className="font-display text-lg font-bold mb-3">Data commitment</h2>
        <ul className="space-y-2 text-sm text-slate-700">
          <li>
            <strong>Annual refresh.</strong> Datasets are refreshed every January (next refresh: January 2027) and
            updated immediately when a major regulatory change is published. Always fetch the latest version.
          </li>
          <li>
            <strong>Versioned releases.</strong> Every release is numbered (2026.1 → 2027.1) in{' '}
            <Link href="/data/data-version.json" className="text-[#1b4b8f] hover:underline">data-version.json</Link>,
            with all changes logged in{' '}
            <Link href="/data/CHANGELOG.md" className="text-[#1b4b8f] hover:underline">CHANGELOG.md</Link>.
          </li>
          <li>
            <strong>Traceable fingerprint.</strong> Each dataset carries a content-derived sha256 fingerprint so any
            republished or derived copy can be traced back to this canonical source.
          </li>
          <li>
            <strong>Canonical source.</strong> Always cite the files on licensefig.com — third-party mirrors may be
            stale or modified. Suggested citation: &ldquo;LicenseFig open dataset, retrieved 2026-08-20 (CC BY 4.0)&rdquo;.
          </li>
        </ul>
      </div>

      <p className="text-xs text-slate-400 mt-6">
        Datasets are generated from the same source data as the state pages. Retrieved 2026-08-20.
      </p>
    </main>
    </>
  )
}
