import type { Metadata } from 'next'
import Link from 'next/link'
import { OCCUPATIONS } from '@/data/types'
import { toolDescription } from '@/lib/serp_variants'

export const metadata: Metadata = {
  title: '15 Licensed Careers — Requirements by State',
  description: toolDescription('occupations'),
  alternates: { canonical: '/occupations/' },
}

const crumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://licensefig.com/' },
    { '@type': 'ListItem', position: 2, name: 'Careers', item: 'https://licensefig.com/occupations/' },
  ],
}

export default function OccupationsPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbLd) }} />
      <h1 className="text-3xl font-bold mb-2">Licensed careers we cover</h1>
      <p className="text-slate-500 max-w-2xl mb-2">
        Each career has a state-by-state requirement matrix, exam structure, cost &amp; pass-rate data,
        retake rules and reciprocity notes.
      </p>
      <p className="text-xs text-slate-500 mb-8">
        <span className="inline-block rounded-full bg-green-50 border border-green-200 text-green-700 font-semibold px-2.5 py-0.5 mr-2">● Data updated 2026-08-20</span>
        Requirement data retrieved 2026-08-20 from state boards, PSI, Pearson VUE and CMS.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {OCCUPATIONS.map((o) => (
          <Link key={o.id} href={`/occupations/${o.slug}/`} className="rounded-xl border border-slate-200 p-5 hover:border-indigo-300 hover:shadow-sm transition">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{o.emoji}</span>
              <div>
                <div className="font-semibold">{o.name}</div>
                <div className="text-xs text-slate-400 uppercase tracking-wide">{o.category}</div>
              </div>
            </div>
            <p className="text-sm text-slate-600">{o.description}</p>
          </Link>
        ))}
      </div>
    </main>
  )
}
