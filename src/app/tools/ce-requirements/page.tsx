import type { Metadata } from 'next'
import CERequirementsLookup from '@/components/tools/CERequirementsLookup'

export const metadata: Metadata = {
  title: 'CE Requirements Lookup — Continuing Education Hours by State',
  description:
    'Look up continuing education hour requirements for 15 licensed careers by state, with where-to-verify guidance and printable CE planning cards.',
  alternates: { canonical: '/tools/ce-requirements/' },
  openGraph: {
    title: 'CE Requirements Lookup by Career & State',
    description: 'Continuing education hours required for licensing renewals, by career and state. Free and printable.',
    type: 'website',
    url: 'https://licensefig.com/tools/ce-requirements/',
  },
}

const faq = [
  {
    q: 'How many CE hours do I need?',
    a: 'It depends on your career and state — there is no national number. Our lookup shows the published requirement when we have the data; otherwise it tells you to check with your state board. Typical real estate renewals run 12–30 hours per cycle, but always confirm yours.',
  },
  {
    q: 'Does online continuing education count?',
    a: 'Most states allow a portion (or all) of CE to be completed online, but many cap the online share or require live/classroom hours. Course providers must often be state-approved. Check your state board’s rules before paying for a course.',
  },
  {
    q: 'What is the difference between this and the Renewal Calculator?',
    a: 'The Renewal Calculator focuses on the renewal cycle and the next renewal date. This tool focuses on the CE requirement itself — how many hours, per what period, and how to verify and plan them. They use the same data.',
  },
  {
    q: 'Do I need to keep my CE certificates?',
    a: 'Yes — keep completion certificates for every course until the board confirms your renewal, and in most states until the next cycle ends. Some boards audit randomly and can fine or suspend licensees who can’t document their hours.',
  },
]

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function CERequirementsLookupPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <nav className="text-xs text-slate-500 mb-6" aria-label="Breadcrumb">
        <a href="/" className="text-indigo-600 hover:underline">Home</a> {' / '}
        <a href="/tools/" className="text-indigo-600 hover:underline">Tools</a> {' / '}
        <span className="text-slate-800">CE Requirements</span>
      </nav>

      <h1 className="text-3xl font-bold text-slate-900 mb-3">CE Requirements Lookup</h1>
      <p className="text-slate-600 mb-6 leading-relaxed">
        Look up the continuing education hours required to renew your license — by career and state — and get clear
        where-to-verify guidance so you don’t rely on an outdated number.
      </p>

      <div className="mb-10">
        <CERequirementsLookup />
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">FAQ</h2>
        <div className="space-y-3">
          {faq.map((f) => (
            <details key={f.q} className="bg-white border border-slate-200 rounded-lg p-4 text-sm">
              <summary className="font-semibold text-slate-900 cursor-pointer">{f.q}</summary>
              <p className="mt-2 text-slate-600 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <p className="text-xs text-slate-500 border-t border-slate-100 pt-4">
        Continuing education requirements vary widely by state and occupation and change. Always confirm the current
        CE total, course rules and deadlines with your state board.
      </p>
    </main>
  )
}
