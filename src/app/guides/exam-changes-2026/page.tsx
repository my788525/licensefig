import type { Metadata } from 'next'
import Link from 'next/link'
import AuthorByline from '@/components/AuthorByline'

// ============================================================================
// L3 — 2026 exam changes. Content verified online 2026-08-20 against state
// commission / vendor / registry sources (see source links). Only changes that
// could be confirmed by at least one primary or two secondary sources are
// included; unconfirmed items are intentionally omitted.
// ============================================================================

export const metadata: Metadata = {
  title: 'Licensing Exam Changes in 2026 — What Candidates Need to Know',
  description:
    'Verified 2026 licensing exam changes: Arizona real estate exam split, new Texas state-law outline, New York buyer-agreement questions, NAR settlement testing points, and CNA vendor updates (Credentia, Headmaster).',
  alternates: { canonical: '/guides/exam-changes-2026/' },
}

const faq = [
  {
    q: 'Is the 2026 real estate exam harder than before?',
    a: 'In most states the exam is not longer and passing scores have not changed, but the question style is shifting from definition recall to scenario-based fact patterns — especially around buyer representation agreements. Candidates who only memorize definitions struggle more than candidates who practice applying rules to situations.',
  },
  {
    q: 'Did the NAR settlement change the real estate exam?',
    a: 'Yes, indirectly. The settlement practice changes (effective August 17, 2024) bind MLS participants — they are a settlement, not a federal law — but state exam content outlines updated for 2025–2026 now test them in all 50 states: written buyer agreements before touring, specific and objectively ascertainable compensation terms, a conspicuous negotiability disclosure, a compensation cap, and no compensation offers on the MLS.',
  },
  {
    q: 'When does the Arizona real estate exam change?',
    a: 'Effective January 1, 2026, the Arizona salesperson exam splits into two separately scored exams: a General (national) exam with 80 scored questions in 150 minutes and a State exam with 60 scored questions in 90 minutes. Each part has 5 unscored pretest items and requires a 75% score to pass. Both are administered by Pearson VUE.',
  },
  {
    q: 'What changed on the Texas real estate exam for 2026?',
    a: 'Effective January 1, 2026, the Texas state-law portion uses a new Pearson VUE content outline organized into 6 content areas with 40 scored items (plus 10 pretest). Texas SB 1968 also took effect January 1, 2026, requiring a written agreement with a residential buyer before showing property. The TREC fee schedule was updated December 15, 2025.',
  },
  {
    q: 'Which company runs the CNA exam in most states?',
    a: 'Credentia is the largest nurse aide testing vendor — it administers the National Nurse Aide Assessment Program (NNAAP) in more states than any other vendor. Headmaster (D&S Diversified) is the contracted vendor for the Texas nurse aide competency exam per the Texas Health and Human Services registry data.',
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}

const SRC = 'https://www.trec.texas.gov'
const SRC_AZ = 'https://www.azre.gov'
const SRC_PV = 'https://www.pearsonvue.com'
const SRC_CRED = 'https://www.credentia.com'
const SRC_HD = 'https://www.hdmaster.com'

export default function ExamChanges2026Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="text-sm text-slate-500 mb-4">
          <Link href="/" className="hover:text-[#1b4b8f]">Home</Link> /{' '}
          <Link href="/occupations/" className="hover:text-[#1b4b8f]">Careers</Link> /{' '}
          <span className="text-slate-800">2026 Exam Changes</span>
        </nav>

        <span className="source-badge mb-4">Verified online · retrieved 2026-08-20</span>
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
          Licensing Exam Changes in 2026 — What Candidates Need to Know
        </h1>
        <p className="text-lg text-slate-700 leading-relaxed mb-3">
          The biggest 2026 changes hit real estate candidates: Arizona splits its salesperson exam into two parts on
          January 1, Texas adopts a new state-law outline, New York adds buyer-representation scenario questions, and
          NAR settlement rules are now tested in all 50 states. For CNAs, Credentia remains the largest testing vendor,
          while Headmaster runs the Texas exam.
        </p>
        <AuthorByline />
        <p className="text-sm text-slate-500 mb-10">
          Every item below was checked against official commission, vendor or registry sources on 2026-08-20. Items we
          could not verify are not listed.
        </p>

        {/* Real estate */}
        <h2 className="section-title mb-4">Real estate — 2026 exam changes</h2>
        <div className="space-y-4 mb-10">
          <div className="card-rule p-5">
            <h3 className="font-semibold text-slate-900 mb-1">Arizona — salesperson exam split into two parts (Jan 1, 2026)</h3>
            <p className="text-sm text-slate-600 mb-2">
              Effective January 1, 2026, the Arizona salesperson exam is two separately scored exams administered by
              Pearson VUE on behalf of the Arizona Department of Real Estate (ADRE):
            </p>
            <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
              <li><strong>General (national) exam:</strong> 80 scored questions + 5 unscored pretest · 150 minutes · 75% to pass.</li>
              <li><strong>State exam:</strong> 60 scored questions + 5 unscored pretest · 90 minutes · 75% to pass.</li>
              <li>Passing is scored independently — if you fail one part you only retake that part.</li>
              <li>Same-day back-to-back booking is available at a combined price.</li>
            </ul>
            <p className="text-xs text-slate-400 mt-2">
              Source: <a href={SRC_PV} target="_blank" rel="noopener noreferrer" className="text-[#1b4b8f] hover:underline">Pearson VUE Arizona candidate handbook</a> ·{' '}
              <a href={SRC_AZ} target="_blank" rel="noopener noreferrer" className="text-[#1b4b8f] hover:underline">ADRE ↗</a>
            </p>
          </div>

          <div className="card-rule p-5">
            <h3 className="font-semibold text-slate-900 mb-1">Texas — new state-law content outline (Jan 1, 2026)</h3>
            <p className="text-sm text-slate-600 mb-2">
              The Texas state-law portion of the sales agent exam uses a new Pearson VUE content outline effective
              January 1, 2026, organized into <strong>6 content areas with 40 scored items</strong> (plus 10 unscored
              pretest items). Expect heavier weighting on agency, TREC rules and contract forms.
            </p>
            <p className="text-sm text-slate-600 mb-2">
              Texas <strong>SB 1968</strong> also took effect January 1, 2026: a license holder must have a written
              agreement with a residential buyer before showing property (or before presenting an offer if no property
              is shown). The TREC fee schedule was updated December 15, 2025.
            </p>
            <p className="text-xs text-slate-400 mt-2">
              Source: <a href={SRC} target="_blank" rel="noopener noreferrer" className="text-[#1b4b8f] hover:underline">Texas Real Estate Commission ↗</a> ·{' '}
              <a href={SRC_PV} target="_blank" rel="noopener noreferrer" className="text-[#1b4b8f] hover:underline">Pearson VUE Texas content outline ↗</a>
            </p>
          </div>

          <div className="card-rule p-5">
            <h3 className="font-semibold text-slate-900 mb-1">New York — buyer representation agreement questions</h3>
            <p className="text-sm text-slate-600 mb-2">
              The 2026 New York salesperson exam blueprint allocates a larger share of agency and contract questions to
              exclusive buyer representation agreements — required disclosures, timing, compensation terms and the
              fiduciary duties that activate on signing. Questions are scenario-based fact patterns rather than
              definitions.
            </p>
            <p className="text-xs text-slate-400 mt-2">
              Source: NY Department of State licensing materials and 2026 exam-prep blueprints reviewed 2026-08-20.
            </p>
          </div>

          <div className="card-rule p-5">
            <h3 className="font-semibold text-slate-900 mb-1">NAR settlement practice changes — now tested in all 50 states</h3>
            <p className="text-sm text-slate-600 mb-2">
              The practice changes from the NAR settlement (effective August 17, 2024) bind MLS participants — they are
              a settlement, not a federal law — and state exam outlines updated for 2025–2026 now test them nationwide:
            </p>
            <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
              <li>MLS participants must have a signed <strong>written buyer agreement</strong> before touring a home with a buyer — a live virtual tour counts as touring.</li>
              <li>Compensation must be <strong>specific and objectively ascertainable</strong> (e.g. "2% of purchase price").</li>
              <li>Buyer agreements must include a conspicuous statement that <strong>compensation is negotiable and not set by law</strong>.</li>
              <li>A broker may not receive <strong>more compensation than the amount agreed</strong> in the buyer agreement.</li>
              <li>Compensation offers can no longer be displayed on the <strong>MLS</strong>; they can still be negotiated off-MLS.</li>
              <li>Agents may not <strong>steer</strong> buyers toward or away from listings based on compensation.</li>
            </ul>
          </div>
        </div>

        {/* CNA */}
        <h2 className="section-title mb-4">CNA — vendor landscape in 2026</h2>
        <div className="space-y-4 mb-10">
          <div className="card-rule p-5">
            <h3 className="font-semibold text-slate-900 mb-1">Credentia is the largest nurse aide testing vendor</h3>
            <p className="text-sm text-slate-600 mb-2">
              Credentia administers the National Nurse Aide Assessment Program (NNAAP) in more states than any other
              vendor, making it the largest CNA exam provider in the country. It took over the role Pearson VUE
              previously played in many states. The NNAAP has two parts: a written/oral knowledge exam (60 scored +
              10 pretest items) and a 5-skill clinical evaluation.
            </p>
            <p className="text-xs text-slate-400 mt-2">
              Source: <a href={SRC_CRED} target="_blank" rel="noopener noreferrer" className="text-[#1b4b8f] hover:underline">Credentia — NNAAP ↗</a>
            </p>
          </div>

          <div className="card-rule p-5">
            <h3 className="font-semibold text-slate-900 mb-1">Headmaster runs the Texas CNA exam</h3>
            <p className="text-sm text-slate-600 mb-2">
              Headmaster (D&amp;S Diversified, hdmaster.com) is the contracted testing vendor for the Texas nurse aide
              competency exam, per the Texas Health and Human Services registry data retrieved 2026-08-20. The Texas
              exam has a written/oral knowledge section plus a clinical skills demonstration.
            </p>
            <p className="text-xs text-slate-400 mt-2">
              Source: <a href={SRC_HD} target="_blank" rel="noopener noreferrer" className="text-[#1b4b8f] hover:underline">Headmaster / D&amp;S Diversified ↗</a> · Texas Health and Human Services registry
            </p>
          </div>
        </div>

        {/* FAQ */}
        <h2 className="section-title mb-4">Frequently asked questions</h2>
        <div className="space-y-3 mb-10">
          {faq.map((f, i) => (
            <div key={i} className="card-rule p-5">
              <h3 className="font-semibold text-slate-900 mb-1">{f.q}</h3>
              <p className="text-sm text-slate-600">{f.a}</p>
            </div>
          ))}
        </div>

        {/* Related */}
        <div className="rounded-2xl p-6 mb-10" style={{ background: 'linear-gradient(135deg,#eef2f9,#f7f3e6)' }}>
          <h2 className="font-display text-lg font-bold mb-3">See the changes per career</h2>
          <div className="flex flex-wrap gap-2">
            <Link href="/guides/real-estate-salesperson/" className="btn-cta">Real estate license guide</Link>
            <Link href="/guides/cna/" className="btn-ghost">CNA license guide</Link>
            <Link href="/licensing-guides/real-estate-salesperson/AZ/" className="btn-ghost">Arizona long-tail guide</Link>
            <Link href="/licensing-guides/real-estate-salesperson/TX/" className="btn-ghost">Texas long-tail guide</Link>
            <Link href="/licensing-guides/real-estate-salesperson/NY/" className="btn-ghost">New York long-tail guide</Link>
          </div>
        </div>

        <p className="text-xs text-slate-400 border-t border-slate-200 pt-4">
          Exam content and vendor contracts change frequently and differ by state. This page was verified against
          official sources on 2026-08-20 — always confirm details with your state board before registering.
        </p>
      </main>
    </>
  )
}
