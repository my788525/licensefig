'use client'

// Small shared UI building blocks for the tool components. All controls are
// wrapped in `no-print` so the printable report only contains results.

import type { ReactNode } from 'react'

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      Print / Save as PDF
    </button>
  )
}

export function Disclaimer({ children }: { children?: ReactNode }) {
  return (
    <p className="no-print mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-800">
      {children ?? 'Requirements change — verify with your state board before applying.'}
    </p>
  )
}

export function DataPending() {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
      Data pending — verify with your state board.
    </div>
  )
}

export function Field({ label, value }: { label: string; value?: ReactNode }) {
  return (
    <div className="border-b border-slate-100 pb-2">
      <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{label}</dt>
      <dd className="mt-0.5 text-sm font-medium text-slate-900">
        {value ?? <span className="font-normal text-slate-400">Verify with your state board</span>}
      </dd>
    </div>
  )
}

export function Label({ children }: { children: ReactNode }) {
  return <label className="block text-sm font-semibold text-slate-700">{children}</label>
}

export const inputClass =
  'mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
