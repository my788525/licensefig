import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'License Reciprocity',
  description: 'Which states honor your license — reciprocity by career and state.',
  alternates: { canonical: '/reciprocity/' },
}

export default function ReciprocityPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold mb-4">License reciprocity</h1>
      <p className="text-slate-600 mb-4">
        Reciprocity rules determine whether your license transfers when you move states. Rules vary by
        career and change frequently.
      </p>
      <p className="text-slate-600 mb-4">
        Use the <Link href="/tools/reciprocity-checker/" className="text-indigo-600 hover:underline">Reciprocity Checker</Link>{' '}
        to check a career + state pair.
      </p>
      <p className="text-xs text-slate-400">
        Interactive data landing soon — the dataset is being compiled from state reciprocity tables.
      </p>
    </main>
  )
}
