import type { Metadata } from 'next'
import Link from 'next/link'
import { OCCUPATIONS } from '@/data/types'

export const metadata: Metadata = {
  title: '15 Licensed Careers — Requirements by State',
  description:
    'Compare license requirements, exam structure, costs, pass rates and retake rules for 15 licensed careers across all 50 states.',
  alternates: { canonical: '/occupations/' },
}

export default function OccupationsPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2">Licensed careers we cover</h1>
      <p className="text-slate-500 max-w-2xl mb-8">
        Each career has a state-by-state requirement matrix, exam structure, cost &amp; pass-rate data,
        retake rules and reciprocity notes.
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
