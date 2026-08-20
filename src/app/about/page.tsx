import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'About LicenseFig — free license planning tools and state-by-state data for licensed careers. Run by an independent editorial team.',
  alternates: { canonical: '/about/' },
}

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold mb-4">About LicenseFig</h1>

      <h2 className="text-xl font-bold mt-6 mb-2">Who runs LicenseFig</h2>
      <p className="text-slate-600 mb-3">
        LicenseFig is an <strong>independent editorial research project</strong> run by{' '}
        <strong>The LicenseFig Editorial Team</strong>. We are not affiliated with, endorsed by, or
        sponsored by any state licensing board, exam vendor, testing company or school — and we do
        not issue licenses. The team is responsible for every page, figure and tool on this site.
      </p>

      <h2 className="text-xl font-bold mt-6 mb-2">What LicenseFig is</h2>
      <p className="text-slate-600 mb-3">
        LicenseFig is a free planning resource for the licensing road: state-by-state license
        requirements, exam structure, costs, pass rates, retake rules and reciprocity for 15 licensed careers.
      </p>
      <p className="text-slate-600 mb-3">
        We are deliberately <strong>not</strong> a course or question-bank platform. Planning tools stay
        free; where useful we point to reputable exam prep providers. Sample questions on this site are
        original and not actual exam questions.
      </p>

      <h2 className="text-xl font-bold mt-6 mb-2">Our approach</h2>
      <p className="text-slate-600 mb-3">
        Data is compiled from state boards, PSI, Pearson VUE and CMS, with retrieval dates on every page.
        Every figure is verified against a primary source before it is published; anything unverified is
        marked as pending or omitted entirely. Our full method is documented on the{' '}
        <a href="/methodology/" className="text-[#1b4b8f] underline">Methodology</a> page, and our open
        dataset is refreshed annually with a versioned changelog — see{' '}
        <a href="/data/" className="text-[#1b4b8f] underline">Open data</a>.
      </p>

      <h2 className="text-xl font-bold mt-6 mb-2">What we are not</h2>
      <p className="text-slate-600 mb-3">
        We are not a law firm, a licensing authority, or a course provider. Where exam prep helps, we
        point to reputable third-party providers, but we hold no special endorsement from them and our
        recommendations are never paid for. Requirements change — always verify with your state board
        or a qualified professional before enrolling, paying or acting.
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
        Corrections, source suggestions or questions? Reach us via the{' '}
        <a href="/contact/" className="text-[#1b4b8f] underline">contact form</a> or email{' '}
        <a href="mailto:team@licensefig.com" className="text-[#1b4b8f] underline">team@licensefig.com</a>.
        We respond to every legitimate inquiry.
      </p>
    </main>
  )
}
