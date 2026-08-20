import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'About LicenseFig — free license planning tools and state-by-state data for licensed careers.',
  alternates: { canonical: '/about/' },
}

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold mb-4">About LicenseFig</h1>
      <p className="text-slate-600 mb-3">
        LicenseFig is a free planning resource for the licensing road: state-by-state license
        requirements, exam structure, costs, pass rates, retake rules and reciprocity for 15 licensed careers.
      </p>
      <p className="text-slate-600 mb-3">
        We are deliberately <strong>not</strong> a course or question-bank platform. Planning tools stay
        free; where useful we point to reputable exam prep providers. Sample questions on this site are
        original and not actual exam questions.
      </p>
      <p className="text-slate-600 mb-3">
        Data is compiled from state boards, PSI, Pearson VUE and CMS, with retrieval dates on every page.
        Requirements change — always verify with your state board.
      </p>
      <h2 className="text-xl font-bold mt-8 mb-2">Disclaimer</h2>
      <p className="text-slate-600 mb-3">
        Everything on LicenseFig is informational only and is <strong>not</strong> legal, financial, medical or
        professional advice. Figures, fees, pass rates and rules change frequently; we list only what state
        boards and official sources publish, with retrieval dates, and mark anything unverified as pending.
        Always confirm the current rules with your state board, exam vendor or a qualified professional before
        enrolling, paying or acting.
      </p>
      <h2 className="text-xl font-bold mt-8 mb-2">Contact</h2>
      <p className="text-slate-600 mb-3">
        Corrections, source suggestions or questions? Email{' '}
        <a href="mailto:hello@licensefig.com" className="text-[#1b4b8f] underline">hello@licensefig.com</a>.
      </p>
    </main>
  )
}
