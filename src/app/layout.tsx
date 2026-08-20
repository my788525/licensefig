import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'
import { OCCUPATIONS } from '@/data/types'

const SITE = {
  name: 'LicenseFig',
  domain: 'https://licensefig.com',
  tagline: 'The license road: requirements, plans, costs and next steps for 15 licensed careers, in all 50 states.',
}

export const metadata: Metadata = {
  title: { default: 'LicenseFig — License Requirements & Exam Planning for 15 Careers', template: '%s | LicenseFig' },
  description:
    'Compare state-by-state license requirements, exam structure, costs, pass rates and retake rules for real estate, CNA, insurance, beauty and trade licenses. Free planning tools for every step of the licensing road.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'LicenseFig — The License Road, State by State',
    description: 'Free planning tools and state-by-state data for 15 licensed careers.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900 antialiased">
        <header className="border-b border-slate-200 bg-white sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
            <Link href="/" className="text-lg font-bold text-slate-900">
              License<span className="text-indigo-600">Fig</span>
            </Link>
            <nav className="hidden md:flex items-center gap-5 text-sm text-slate-600">
              <Link href="/occupations/" className="hover:text-indigo-600">Careers</Link>
              <Link href="/tools/" className="hover:text-indigo-600">Tools</Link>
              <Link href="/pass-rates/" className="hover:text-indigo-600">Pass Rates</Link>
              <Link href="/exam-costs/" className="hover:text-indigo-600">Exam Costs</Link>
              <Link href="/reciprocity/" className="hover:text-indigo-600">Reciprocity</Link>
            </nav>
          </div>
        </header>
        {children}
        <footer className="border-t border-slate-200 mt-16 py-10 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-sm text-slate-500 mb-4">
              <strong>LicenseFig</strong> — planning tools and state-by-state data for licensed careers. Not legal advice;
              requirements change, always verify with your state board.
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {OCCUPATIONS.map((o) => (
                <Link key={o.id} href={`/occupations/${o.slug}/`} className="text-slate-500 hover:text-indigo-600">
                  {o.shortName}
                </Link>
              ))}
              <Link href="/data/" className="text-slate-500 hover:text-indigo-600">Open data</Link>
              <Link href="/privacy/" className="text-slate-500 hover:text-indigo-600">Privacy</Link>
              <Link href="/about/" className="text-slate-500 hover:text-indigo-600">About</Link>
            </div>
            <p className="text-xs text-slate-400 mt-6">Data retrieved 2026-08-20 from state boards, PSI, Pearson VUE and CMS. © 2026 LicenseFig.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
