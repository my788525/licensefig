'use client'

import { Printer } from 'lucide-react'

interface PrintButtonProps {
  label?: string
}

// Renders a "Print / Save as PDF" button. Hidden in print output via the
// global `@media print` rule on `.no-print`.
export default function PrintButton({ label = 'Print / Save as PDF' }: PrintButtonProps) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
      aria-label={label}
    >
      <Printer className="w-4 h-4" />
      {label}
    </button>
  )
}
