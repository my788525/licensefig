import type { Metadata } from 'next'
import StateBoardDirectory from '@/components/tools/StateBoardDirectory'

export const metadata: Metadata = {
  title: 'State Board Directory — Official Licensing Agencies by Career & State',
  description:
    'Find the official state licensing authority for 15 licensed careers: official agency name, website and role, plus real exam vendor links. Free, printable directory.',
  alternates: { canonical: '/tools/state-board-directory/' },
  openGraph: {
    title: 'State Board Directory by Career & State',
    description: 'Official licensing authorities and exam vendor links for 15 careers. Free and printable.',
    type: 'website',
    url: 'https://licensefig.com/tools/state-board-directory/',
  },
}

const faq = [
  {
    q: 'Where can I find my official state licensing board?',
    a: 'Pick your career and state in the directory. We show the official agency and its website when we have them, and otherwise give you the exact search to use (e.g., “Texas CNA license board”). Always use the official state or vendor domain — never a third-party renewal service that charges a fee.',
  },
  {
    q: 'What does the state board actually do?',
    a: 'State licensing boards approve education programs, run background checks, issue and renew licenses, set continuing education rules, handle reciprocity, and discipline licensees. They are the only authoritative source for your requirements, fees and deadlines.',
  },
  {
    q: 'Why does some data say “check with your state board”?',
    a: 'We only publish official board details we can source. When a career-and-state row hasn’t been loaded into our data yet, we say so plainly and point you to the search that will find the right agency — rather than guessing at a link.',
  },
  {
    q: 'Are the vendor links on this page official?',
    a: 'Yes. The exam vendor links (PSI, Pearson VUE, Credentia, Prometric, FSMTB) point to each company’s official website. Your state chooses which vendor administers your exam, so confirm the correct one for your state.',
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

export default function StateBoardDirectoryPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <nav className="text-xs text-slate-500 mb-6" aria-label="Breadcrumb">
        <a href="/" className="text-indigo-600 hover:underline">Home</a> {' / '}
        <a href="/tools/" className="text-indigo-600 hover:underline">Tools</a> {' / '}
        <span className="text-slate-800">State Board Directory</span>
      </nav>

      <h1 className="text-3xl font-bold text-slate-900 mb-3">State Board Directory</h1>
      <p className="text-slate-600 mb-6 leading-relaxed">
        Find the official agency that licenses your career — pick a career and state to see the board’s name, website
        and role, plus the real exam vendor links for your field.
      </p>

      <div className="mb-10">
        <StateBoardDirectory />
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
        Links point to official state or vendor websites. Agencies and URLs change — if a link fails, search the
        state’s official portal and never pay a third party that claims to renew your license.
      </p>
    </main>
  )
}
