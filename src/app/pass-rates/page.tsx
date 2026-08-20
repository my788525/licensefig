import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pass Rates by State',
  description: 'First-attempt license exam pass rates by state — where each career is hardest.',
  alternates: { canonical: '/pass-rates/' },
}

export default function PassRatesPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold mb-4">Pass rates by state</h1>
      <p className="text-slate-600 mb-4">
        First-attempt pass rates for license exams, by career and state. Only ~15-20 states publish
        official figures; the rest are marked &ldquo;not published&rdquo;.
      </p>
      <p className="text-slate-600 mb-4">
        Use the <Link href="/tools/pass-rate-index/" className="text-indigo-600 hover:underline">Pass Rate Difficulty Index</Link>{' '}
        to rank states for a career.
      </p>
      <p className="text-xs text-slate-400">
        Interactive data landing soon — the dataset is being compiled from state commission reports.
      </p>
    </main>
  )
}
