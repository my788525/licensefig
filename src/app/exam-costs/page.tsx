import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Exam Costs by State',
  description: 'License exam fees compared across all 50 states.',
  alternates: { canonical: '/exam-costs/' },
}

export default function ExamCostsPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold mb-4">Exam costs by state</h1>
      <p className="text-slate-600 mb-4">
        License exam fees vary widely — from about $15 (NY) to $150 (NE). Compare total costs with the{' '}
        <Link href="/tools/exam-cost-compare/" className="text-indigo-600 hover:underline">Exam Cost Compare</Link> tool.
      </p>
      <p className="text-xs text-slate-400">
        Interactive data landing soon — the dataset is being compiled from state fee schedules.
      </p>
    </main>
  )
}
