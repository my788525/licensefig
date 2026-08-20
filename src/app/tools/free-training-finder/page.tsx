import type { Metadata } from 'next'
import FreeTrainingFinder from '@/components/tools/FreeTrainingFinder'

export const metadata: Metadata = {
  title: 'Free CNA Training Finder — Employer & Workforce Programs by State',
  description:
    'Find real free CNA training paths in your state: employer-sponsored nursing home and hospital programs, state workforce grants and official channels to verify them. Free printable guide.',
  alternates: { canonical: '/tools/free-training-finder/' },
  openGraph: {
    title: 'Free CNA Training Finder — by State',
    description: 'Real paths to free CNA training: employer-sponsored programs, workforce grants and official state channels. Free, printable.',
    type: 'website',
    url: 'https://licensefig.com/tools/free-training-finder/',
  },
}

const faq = [
  {
    q: 'Is CNA training ever really free?',
    a: 'Yes. Two common real paths exist: (1) employer-sponsored programs, where a nursing home or hospital pays for your training and exam in exchange for a 6–12 month work commitment, and (2) state workforce or Medicaid-funded programs that pay tuition when the area has a nurse-aide shortage. No specific employers are listed here — you verify current openings with the facilities and official sources in the guide.',
  },
  {
    q: 'How does the nursing home free CNA training deal usually work?',
    a: 'The facility pays your tuition and exam fee, you complete the state-approved course, and you agree to work there for a set period (commonly 6–12 months) once certified. Some programs pay a training wage while you study. Terms vary by employer and state, so ask about the commitment in writing before you enroll.',
  },
  {
    q: 'Which state agency can help me pay for CNA training?',
    a: 'Start with your state workforce development agency and the local American Job Center — ask about Individual Training Accounts (ITAs) or similar tuition help. Also check your state nurse aide registry, which confirms approved training programs and exam procedures. Funding comes and goes, so ask about the current program year.',
  },
  {
    q: 'Why don’t you list specific employers that offer free training?',
    a: 'Employer offers change constantly and are local. Instead, the guide teaches you exactly how to find them: ask Medicare-certified nursing homes and hospitals directly (their contact info is public on Medicare.gov), check CareerOneStop for workforce funding, and verify with your state nurse aide registry.',
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

export default function FreeTrainingFinderPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <nav className="text-xs text-slate-500 mb-6" aria-label="Breadcrumb">
        <a href="/" className="text-indigo-600 hover:underline">Home</a> {' / '}
        <a href="/tools/" className="text-indigo-600 hover:underline">Tools</a> {' / '}
        <span className="text-slate-800">Free CNA Training Finder</span>
      </nav>

      <h1 className="text-3xl font-bold text-slate-900 mb-3">Free CNA Training Finder</h1>
      <p className="text-slate-600 mb-6 leading-relaxed">
        You can become a CNA without paying for the course: pick your state and see the three real free-training
        paths — employer-sponsored nursing home and hospital programs with a work commitment, state workforce grants,
        and Medicaid-subsidized training — plus the official channels where you verify current openings.
      </p>

      <div className="mb-10">
        <FreeTrainingFinder />
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
        Program availability, funding and employer offers change. This guide describes real public paths but lists no
        specific employers — always confirm current details with the official sources and your state nurse aide
        registry before enrolling.
      </p>
    </main>
  )
}
