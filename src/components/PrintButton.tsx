'use client'

// Small client component so static-exported pages can offer window.print().
// Hidden by the .no-print rule when the browser dialog is used.
export default function PrintButton({ label = 'Print / Save as PDF' }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold no-print border border-[#1b4b8f] text-[#1b4b8f] bg-white hover:bg-[#e8eef7] transition"
    >
      {label}
    </button>
  )
}
