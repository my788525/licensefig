import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'
import Logo from '@/components/Logo'
import { OCCUPATIONS } from '@/data/types'

const SITE = {
  name: 'LicenseFig',
  domain: 'https://licensefig.com',
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
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#f8f9fb] text-[#1a2233] antialiased">
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
                  <Link href="/about/" className="block text-slate-300 hover:text-white">About</Link>
                  <Link href="/privacy/" className="block text-slate-300 hover:text-white">Privacy</Link>
                  <Link href="/terms/" className="block text-slate-300 hover:text-white">Terms</Link>
                </div>
              </div>
            </div>
            <div className="border-t border-slate-700 pt-5 text-xs text-slate-500 flex flex-col md:flex-row justify-between gap-2">
              <span>© 2026 LicenseFig. Data retrieved 2026-08-20 from state boards, PSI, Pearson VUE and CMS.</span>
              <span>Not legal advice — requirements change, verify with your state board.</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
