import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'
import Logo from '@/components/Logo'
import { OCCUPATIONS } from '@/data/types'

const SITE = {
  name: 'LicenseFig',
  domain: 'https://licensefig.com',
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'LicenseFig',
  url: 'https://licensefig.com',
  description:
    'Free planning resource for the licensing road: state-by-state license requirements, exam structure, costs, pass rates, retake rules and reciprocity for 15 licensed careers.',
}

const siteLd = {
  '@context': 'https://schema.org',
  '@graph': [
    organizationJsonLd,
    {
      '@type': 'WebSite',
      '@id': 'https://licensefig.com/#website',
      url: 'https://licensefig.com',
      name: 'LicenseFig',
      publisher: { '@id': 'https://licensefig.com/#organization' },
      description:
        'Free planning tools and state-by-state data for 15 licensed careers: requirements, exam structure, costs, pass rates, retake rules and reciprocity.',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://licensefig.com/tools?tool={search_term_string}',
          queryTemplate: 'tool={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL('https://licensefig.com'),
  title: { default: 'LicenseFig — License Requirements & Exam Planning for 15 Licensed Careers', template: '%s | LicenseFig' },
  description:
    'Compare state-by-state license requirements, exam structure, costs, pass rates and retake rules for real estate, CNA, insurance, beauty and trade licenses. Free planning tools for every step of the licensing road.',
  alternates: { canonical: '/' },
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
  openGraph: {
    title: 'LicenseFig — The License Road, State by State',
    description: 'Free planning tools and state-by-state data for 15 licensed careers.',
    type: 'website',
    url: 'https://licensefig.com',
    siteName: 'LicenseFig',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'LicenseFig — license requirements, state by state',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LicenseFig — The License Road, State by State',
    description: 'Free planning tools and state-by-state data for 15 licensed careers.',
    images: ['/og-default.png'],
  },
}

import Breadcrumbs from '@/components/Breadcrumbs';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#f8f9fb] text-[#1a2233] antialiased">
      <Breadcrumbs domain="licensefig.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteLd) }}
        />
        <header className="bg-white border-b-2 border-[#0b2545] sticky top-0 z-40 no-print">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" aria-label="LicenseFig home" className="group">
              <Logo size={30} />
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
              <Link href="/occupations/" className="hover:text-[#1b4b8f]">Careers</Link>
              <Link href="/tools/" className="hover:text-[#1b4b8f]">Tools</Link>
              <Link href="/pass-rates/" className="hover:text-[#1b4b8f]">Pass Rates</Link>
              <Link href="/exam-costs/" className="hover:text-[#1b4b8f]">Exam Costs</Link>
              <Link href="/reciprocity/" className="hover:text-[#1b4b8f]">Reciprocity</Link>
              <Link
                href="/tools/requirements-lookup/"
                className="px-4 py-1.5 rounded-md text-white text-sm font-semibold"
                style={{ background: 'linear-gradient(135deg,#123b6d,#0b2545)', borderBottom: '2px solid #c9a227' }}
              >
                Look up requirements
              </Link>
            </nav>
          </div>
        </header>

        {children}

        <footer className="bg-[#0b2545] text-slate-300 mt-20 pt-12 pb-10 no-print">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <Logo size={28} withWordmark={false} />
                <p className="text-sm text-slate-400 mt-3 max-w-xs leading-relaxed">
                  The license road, state by state — requirements, exam structure, costs, pass rates,
                  retake rules and reciprocity for licensed careers.
                </p>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#c9a227] mb-3">Careers</div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
                  {OCCUPATIONS.map((o) => (
                    <Link key={o.id} href={`/occupations/${o.slug}/`} className="text-slate-300 hover:text-white">
                      {o.shortName}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#c9a227] mb-3">Resources</div>
                <div className="space-y-1.5 text-sm">
                  <Link href="/tools/" className="block text-slate-300 hover:text-white">All tools</Link>
                  <Link href="/data/" className="block text-slate-300 hover:text-white">Open data</Link>
                  <Link href="/pass-rates/" className="block text-slate-300 hover:text-white">Pass rates</Link>
                  <Link href="/reciprocity/" className="block text-slate-300 hover:text-white">Reciprocity</Link>
                  <Link href="/methodology/" className="block text-slate-300 hover:text-white">Methodology</Link>
                  <Link href="/about/" className="block text-slate-300 hover:text-white">About</Link>
                  <Link href="/contact/" className="block text-slate-300 hover:text-white">Contact</Link>
                  <Link href="/privacy/" className="block text-slate-300 hover:text-white">Privacy</Link>
                  <Link href="/terms/" className="block text-slate-300 hover:text-white">Terms</Link>
                </div>
              </div>
            </div>
            <div className="border-t border-slate-700 pt-5 mb-5 text-sm">
              <span className="text-slate-400">Related planning tools: </span>
              <span className="inline-flex flex-wrap gap-x-4 gap-y-1">
                <a href="https://unitfig.com" rel="nofollow noopener noreferrer" className="text-slate-300 hover:text-white">UnitFig</a>
                <a href="https://edcost.com" rel="nofollow noopener noreferrer" className="text-slate-300 hover:text-white">EdCost</a>
                <a href="https://wikest.com" rel="nofollow noopener noreferrer" className="text-slate-300 hover:text-white">WikEst</a>
                <a href="https://paycalcfig.com" rel="nofollow noopener noreferrer" className="text-slate-300 hover:text-white">PayCalcFig</a>
                <a href="https://insurtool.com" rel="nofollow noopener noreferrer" className="text-slate-300 hover:text-white">InsurTool</a>
                <a href="https://relofig.com" rel="nofollow noopener noreferrer" className="text-slate-300 hover:text-white">ReloFig</a>
              </span>
            </div>
            <div className="border-t border-slate-700 pt-5 text-xs text-slate-500 flex flex-col md:flex-row justify-between gap-2">
              <span>© 2026 LicenseFig. Data retrieved 2026-08-20 from state boards, PSI, Pearson VUE and CMS.</span>
              <span>Not legal advice — requirements change, verify with your state board.</span>
            </div>
          </div>
        </footer>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      '@context': 'https://schema.org', '@type': 'Dataset',
      name: 'US Professional Licensing by State Dataset 2026',
      description: 'Professional licensing dataset: education requirements, exam fees, renewal cycles, reciprocity agreements, and scope of practice for licensed professions (nursing, real estate, contracting, cosmetology, etc.) across all 50 states. Sourced from state licensing boards.',
      url: 'https://licensefig.com/data/professional-licensing-2026.json',
      identifier: 'professional-licensing-2026',
      datePublished: '2026-01-01', dateModified: '2026-08-27',
      creator: { '@type': 'Organization', name: 'LicenseFig' },
      publisher: { '@type': 'Organization', name: 'LicenseFig', url: 'https://licensefig.com' },
      includedInDataCatalog: { '@type': 'DataCatalog', name: 'LicenseFig Data' },
      distribution: { '@type': 'DataDownload', encodingFormat: 'application/json', contentUrl: 'https://licensefig.com/data/professional-licensing-2026.json' },
      spatialCoverage: { '@type': 'Place', name: 'United States' }, temporalCoverage: '2026',
    }) }} />
    </body>
    </html>
  )
}
