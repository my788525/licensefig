import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Methodology',
  description:
    'How LicenseFig collects, verifies and updates license requirement data — sources, verification workflow, annual refresh cycle and field coverage.',
  alternates: { canonical: '/methodology/' },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Where does LicenseFig license data come from?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'LicenseFig data is compiled from official state licensing boards, exam vendors (PSI, Pearson VUE, Credentia), CMS (NATCEP) for nurse aide programs, FSMTB and state Secretary of State offices. Every figure carries a retrieval date of 2026-08-20 (dataset version 2026.1).',
      },
    },
    {
      '@type': 'Question',
      name: 'How often is the data updated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Datasets are refreshed on an annual cycle and versioned (current version: 2026.1, retrieved 2026-08-20). Changes are logged in the open dataset changelog at https://licensefig.com/data/CHANGELOG.md.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are all fields present for every state?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Fields are filled only when an official source publishes the value. Where a state board does not release a figure (for example first-attempt pass rates), the field is left null or marked pending rather than estimated. Always verify the current rules with your state board before acting.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is LicenseFig legal or professional advice?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. LicenseFig is informational only and is not legal, financial, medical or professional advice. Requirements, fees and pass rates change frequently; confirm the current rules with your state board, exam vendor or a qualified professional before enrolling, paying or acting.',
      },
    },
  ],
}

const SOURCES: [string, string][] = [
  ['State licensing boards', 'Primary source for licensure rules, education requirements, fees, reciprocity and retake rules for all 15 careers.'],
  ['PSI', 'Licensing exam vendor; exam structure, scoring and scheduling details for real estate and trade licenses.'],
  ['Pearson VUE', 'Exam vendor; exam format, delivery and score report details for insurance and professional licenses.'],
  ['Credentia', 'Nurse aide (CNA) competency exam vendor; test structure and retake rules.'],
  ['CMS (NATCEP)', 'Federal Nurse Aide Training and Competency Evaluation Program registry rules and state approval data.'],
  ['FSMTB', 'Federation of State Massage Therapy Boards; MBLEx structure and state adoption status.'],
  ['State Secretary of State offices', 'Notary public commissions, appointment fees, bond requirements and renewal rules.'],
]

export default function MethodologyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl font-bold mb-4">Methodology</h1>
        <p className="text-slate-600 mb-8 leading-relaxed">
          LicenseFig builds its state-by-state license data exclusively from official sources —
          state licensing boards, exam vendors (PSI, Pearson VUE, Credentia), CMS (NATCEP), FSMTB
          and state Secretary of State offices. Data is retrieved, cross-checked and versioned;
          anything an official source does not publish is marked pending or omitted rather than
          estimated. Current dataset version: <strong>2026.1</strong> (retrieved 2026-08-20).
        </p>

        <h2 className="section-title mb-4">Data sources</h2>
        <div className="space-y-3 mb-8">
          {SOURCES.map(([name, desc]) => (
            <div key={name} className="card-rule p-4">
              <h3 className="font-semibold text-slate-900">{name}</h3>
              <p className="text-sm text-slate-500 mt-1">{desc}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-400 mb-8">
          Retrieval date for the current cycle: 2026-08-20. Per-page retrieval dates appear on every
          occupation and licensing-guide page.
        </p>

        <h2 className="section-title mb-4">How data is verified</h2>
        <div className="card-rule p-5 mb-8">
          <ol className="list-decimal list-inside space-y-2 text-slate-600 text-sm">
            <li><strong>Official source first.</strong> Every figure traces to a state board, vendor or federal registry page — never to third-party summary sites.</li>
            <li><strong>Cross-check across sources.</strong> High-stakes fields (fees, education hours, retake rules) are confirmed against at least two independent official sources where available.</li>
            <li><strong>Omit rather than invent.</strong> When an official source does not publish a value, the field is left null or marked pending. We never estimate, interpolate or fabricate figures.</li>
            <li><strong>Change log.</strong> Every dataset update is recorded in the open changelog with the version number and date.</li>
          </ol>
        </div>

        <h2 className="section-title mb-4">Update cycle</h2>
        <div className="card-rule p-5 mb-8">
          <p className="text-slate-600 text-sm leading-relaxed">
            Datasets are refreshed on an <strong>annual cycle</strong> and versioned by year
            (current: <strong>2026.1</strong>). Between cycles, corrections are applied when a state
            board changes a rule and the change is verified. Full history is in the{' '}
            <a href="/data/CHANGELOG.md" className="text-[#1b4b8f] underline">dataset changelog</a>{' '}
            — always fetch the latest dataset version rather than caching an old one.
          </p>
        </div>

        <h2 className="section-title mb-4">Field coverage</h2>
        <div className="card-rule p-5 mb-8">
          <p className="text-slate-600 text-sm leading-relaxed mb-3">
            Coverage varies by field and state:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-600 text-sm">
            <li><strong>Usually complete:</strong> exam vendor, education hours, exam fee, application fee, retake wait periods and reciprocity rules.</li>
            <li><strong>Sometimes missing:</strong> first-attempt pass rates (only a minority of states publish official figures), license renewal fees and CE hours.</li>
            <li><strong>Never fabricated:</strong> any unpublished figure is null or pending, never estimated.</li>
          </ul>
          <p className="text-sm text-slate-500 mt-3 border-t border-slate-100 pt-3">
            Principle: <em>verify with your state board</em> before enrolling, paying or scheduling an
            exam. Requirements change more often than annual data cycles can capture.
          </p>
        </div>

        <h2 className="section-title mb-4">Disclaimer</h2>
        <div className="card-rule p-5 mb-8">
          <p className="text-slate-600 text-sm leading-relaxed">
            LicenseFig is <strong>informational only</strong> and is <strong>not</strong> legal,
            financial, medical or professional advice. Figures, fees, pass rates and rules change
            frequently; we list only what state boards and official sources publish, with retrieval
            dates, and mark anything unverified as pending. Always confirm the current rules with your
            state board, exam vendor or a qualified professional before enrolling, paying or acting.
          </p>
        </div>

        <h2 className="section-title mb-4">FAQ</h2>
        <div className="space-y-3 mb-4">
          {[
            ['Where does LicenseFig license data come from?', 'Official state licensing boards, exam vendors (PSI, Pearson VUE, Credentia), CMS (NATCEP), FSMTB and state Secretary of State offices — with a retrieval date of 2026-08-20 (version 2026.1).'],
            ['How often is the data updated?', 'Annually, on a versioned cycle. Current version is 2026.1; changes are logged in the dataset changelog.'],
            ['Are all fields present for every state?', 'No — fields are filled only when an official source publishes the value; otherwise they are null or marked pending, never estimated.'],
            ['Is LicenseFig legal or professional advice?', 'No. It is informational only. Verify current rules with your state board before acting.'],
          ].map(([q, a]) => (
            <div key={q} className="card-rule p-4">
              <h3 className="font-semibold text-slate-900 text-sm">{q}</h3>
              <p className="text-sm text-slate-500 mt-1">{a}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
