import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms',
  description: 'LicenseFig terms of use — informational content, data accuracy disclaimer, no professional advice, intellectual property and external links.',
  alternates: { canonical: '/terms/' },
}

export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold mb-4">Terms of Use</h1>
      <p className="text-slate-600 mb-6">
        By using LicenseFig you agree to these terms. If you do not agree, please do not use the site.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-2">Use of the site</h2>
      <p className="text-slate-600 mb-3">
        LicenseFig provides free, browser-based planning tools and state-by-state reference data for licensed
        careers. Calculators run entirely in your browser; no account or personal data is required.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-2">No professional advice</h2>
      <p className="text-slate-600 mb-3">
        Content on this site is informational and is <strong>not</strong> legal, financial, medical or other
        professional advice. It does not create any advisory, fiduciary or client relationship. Licensing laws,
        fees, exam content and pass rates change frequently — verify everything with your state board, exam
        vendor or a qualified professional before relying on it.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-2">Data accuracy</h2>
      <p className="text-slate-600 mb-3">
        We compile data from official sources (state boards, PSI, Pearson VUE, CMS and others) with retrieval
        dates shown on each page, and we mark unverified items as pending rather than guessing. Still, we do not
        warrant that any figure is complete, current or error-free. Use the site at your own risk.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-2">Intellectual property</h2>
      <p className="text-slate-600 mb-3">
        All original content on LicenseFig — text, tables, tools, sample questions and code — is protected by
        copyright and owned by LicenseFig. Sample questions are original and are not actual exam questions.
        Open datasets are released under CC BY 4.0 as noted on the data page. Everything else may not be
        reproduced commercially without written permission.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-2">External links</h2>
      <p className="text-slate-600 mb-3">
        The site links to state boards, exam vendors and third-party services for your convenience. We do not
        control those sites and are not responsible for their content, practices or products. Some links may be
        affiliate links, in which case we may earn a commission at no extra cost to you — see our advertising
        disclosure in the Privacy policy.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-2">No liability</h2>
      <p className="text-slate-600 mb-3">
        To the maximum extent permitted by law, LicenseFig and its operators are not liable for any loss or
        damage arising from use of the site, reliance on its content, or any tool output. Decisions about
        licensing, enrollment, spending or employment are yours alone.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-2">Changes &amp; contact</h2>
      <p className="text-slate-600 mb-3">
        We may update these terms as the site evolves; the latest version is always on this page. Questions?
        Email <a href="mailto:hello@licensefig.com" className="text-[#1b4b8f] underline">hello@licensefig.com</a>.
      </p>
    </main>
  )
}
