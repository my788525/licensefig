import type { Metadata } from 'next'
import Link from 'next/link'

// ============================================================================
// CNA employer-funded / free training guide — a static long-tail guide page.
// Describes only real, general free-training paths (employer-sponsored programs
// with a work commitment, state workforce grants, Medicaid-subsidized training).
// No specific employers or state-program details are fabricated — the page
// directs readers to official channels (state nurse aide registry, Medicare.gov,
// CareerOneStop). Sources: BLS, CMS/Medicare, U.S. DOL. Retrieved 2026-08-20.
// ============================================================================

export const metadata: Metadata = {
  title: 'Free CNA Training: How to Get Certified Without Paying (2026)',
  description:
    'The 3 real ways to get free CNA training: employer-sponsored nursing home and hospital programs with a 6–12 month work commitment, state workforce grants, and Medicaid-subsidized training. Plus the official channels to verify each one.',
  alternates: { canonical: '/guides/cna-free-training/' },
  openGraph: {
    title: 'Free CNA Training — 3 Real Paths to a Paid-For Certification',
    description:
      'Employer-sponsored CNA training, state workforce grants and Medicaid-subsidized programs — and exactly how to verify them with official sources.',
    type: 'website',
    url: 'https://licensefig.com/guides/cna-free-training/',
  },
}

const faq = [
  {
    q: 'Is CNA training ever really free?',
    a: 'Yes. Two common real paths exist: (1) employer-sponsored programs, where a nursing home or hospital pays for your training and exam in exchange for a work commitment, and (2) state workforce or Medicaid-funded programs that pay tuition when the area has a nurse-aide shortage. No specific employers are listed on this page — you verify current openings with facilities and the official sources below.',
  },
  {
    q: 'How does the nursing home free CNA training deal usually work?',
    a: 'The facility pays your tuition and exam fee, you complete the state-approved course, and you agree to work there for a set period once certified — commonly 6–12 months. Some programs pay a training wage while you study. Terms vary by employer and state, so ask for the commitment in writing before you enroll.',
  },
  {
    q: 'Do hospitals offer free CNA training too?',
    a: 'Some do, usually for the same reason nursing homes do: they need nurse aides and prefer to train people who commit to staying. Hospital programs may be more selective and can include a longer or more flexible commitment. Ask the HR department directly about "sponsored nurse aide training" — the same question you would ask a nursing home.',
  },
  {
    q: 'Which state agency can help me pay for CNA training?',
    a: 'Start with your state workforce development agency and the local American Job Center — ask about Individual Training Accounts (ITAs) or similar tuition assistance. Also check your state nurse aide registry, which confirms which training programs are state-approved. Funding comes and goes, so ask about the current program year.',
  },
  {
    q: 'Does the American Red Cross still offer CNA training?',
    a: 'No. The American Red Cross discontinued its nurse assistant training program effective December 31, 2023 and is not a current option. Do not trust older pages that still advertise it — use the state-approved programs and official channels listed here instead.',
  },
  {
    q: 'Why don’t you list specific employers that offer free training?',
    a: 'Employer offers change constantly and are local, so a fixed list would be out of date quickly. Instead, this guide teaches you exactly how to find them: ask Medicare-certified nursing homes and hospitals directly (contact info is public on Medicare.gov), check CareerOneStop for workforce funding, and verify with your state nurse aide registry.',
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

const SOURCES = [
  {
    name: 'U.S. Bureau of Labor Statistics (bls.gov/oes)',
    note: 'Median annual wage and occupational outlook for nursing assistants — $35,740 median annual wage cited from OES data retrieved 2026-08-20.',
  },
  {
    name: 'CMS / Medicare.gov',
    note: 'Federal nurse-aide training standards (OBRA 1987: minimum 75 training hours including 16 clinical hours) and the public search tool that lists Medicare-certified nursing homes and their contact information.',
  },
  {
    name: 'CareerOneStop (U.S. Department of Labor)',
    note: 'Workforce-training search, WIOA funding and the locator for American Job Centers by state.',
  },
  {
    name: 'American Health Care Association (ahcancal.org)',
    note: 'National trade group for skilled nursing and assisted living centers — many members sponsor paid nurse-aide training.',
  },
]

export default function CnaFreeTrainingGuidePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="text-sm text-slate-500 mb-4">
          <Link href="/" className="hover:text-[#1b4b8f]">Home</Link> /{' '}
          <Link href="/occupations/" className="hover:text-[#1b4b8f]">Careers</Link> /{' '}
          <Link href="/occupations/cna/" className="hover:text-[#1b4b8f]">CNA</Link> /{' '}
          <span className="text-slate-800">Free CNA training</span>
        </nav>

        <span className="source-badge mb-4">Official sources · BLS, CMS &amp; state registries · retrieved 2026-08-20</span>
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
          Free CNA Training: How to Get Certified Without Paying
        </h1>
        <p className="text-lg text-slate-700 leading-relaxed mb-3">
          Yes — CNA training can be free. The three real paths are employer-sponsored programs, where a nursing home
          or hospital pays for your training and exam in exchange for a 6–12 month work commitment; state workforce
          development programs that fund tuition through American Job Centers and Individual Training Accounts; and
          Medicaid or community-college subsidies aimed at long-term-care staffing shortages.
        </p>
        <p className="text-sm text-slate-500 mb-8">
          This page describes the general models only — it does not list specific employers or state-program details,
          because those change constantly. The official channels at the end of this guide show you exactly how to find
          what is available where you live right now.
        </p>

        {/* Path 1 */}
        <h2 className="section-title mb-4">1 · Employer-sponsored training (the most common free path)</h2>
        <div className="card-rule p-5 mb-8">
          <p className="text-sm text-slate-700 leading-relaxed">
            Many skilled-nursing facilities (nursing homes) and some hospitals offer free CNA training as a recruiting
            tool. The usual deal: the employer pays your tuition and your exam fee, and you agree to work for them
            <strong> 6–12 months</strong> as a certified nurse aide after you finish. Some programs pay you a training
            wage while you study. Under federal rules, facilities that accept Medicare must use nurse aides who have
            completed an approved training program, which is why employers are willing to invest in you.
          </p>
          <p className="text-sm text-slate-700 leading-relaxed mt-3">
            How to find one: call or visit the HR department of 3–5 Medicare-certified nursing homes or hospitals in
            your area and ask directly, <em>&ldquo;Do you sponsor paid nurse aide training with a work commitment?&rdquo;</em>{' '}
            Facility contact information is public on Medicare.gov.
          </p>
        </div>

        {/* Path 2 */}
        <h2 className="section-title mb-4">2 · State workforce development programs</h2>
        <div className="card-rule p-5 mb-8">
          <p className="text-sm text-slate-700 leading-relaxed">
            Every state has a workforce development agency, and many fund CNA training when the area has a nurse-aide
            shortage. The typical mechanism is an <strong>Individual Training Account (ITA)</strong> — a grant that
            pays a training provider on your behalf — funded through the federal WIOA program and administered by local
            American Job Centers.
          </p>
          <p className="text-sm text-slate-700 leading-relaxed mt-3">
            How to find one: use the CareerOneStop search on careeronestop.org to locate the American Job Center nearest
            you, then ask about ITA or tuition assistance for the current program year. Funding comes and goes, so ask
            specifically about <em>this year&rsquo;s</em> budget.
          </p>
        </div>

        {/* Path 3 */}
        <h2 className="section-title mb-4">3 · Medicaid and community-college subsidies</h2>
        <div className="card-rule p-5 mb-8">
          <p className="text-sm text-slate-700 leading-relaxed">
            A number of states fund nurse-aide training through Medicaid workforce initiatives, especially for
            long-term-care jobs, and community colleges frequently run scholarship or low-cost CNA cohorts with
            employer partners. These programs vary by state and by year.
          </p>
          <p className="text-sm text-slate-700 leading-relaxed mt-3">
            How to find one: contact your <strong>state nurse aide registry</strong> and the state community-college
            system, and search terms like &ldquo;[your state] nurse aide training grant&rdquo; or &ldquo;[your state]
            CNA scholarship.&rdquo;
          </p>
        </div>

        {/* Red Cross */}
        <h2 className="section-title mb-4">What about the American Red Cross?</h2>
        <div className="card-rule p-5 mb-8">
          <p className="text-sm text-slate-700 leading-relaxed">
            The American Red Cross <strong>discontinued its nurse assistant training program</strong> effective
            December 31, 2023. If you find a page still advertising Red Cross CNA classes, it is outdated. Do not pay
            for it — the training is no longer scheduled. The Red Cross still offers CPR and first aid courses, which
            some CNA employers require separately, but it is not a current path to CNA certification.
          </p>
        </div>

        {/* What to ask */}
        <h2 className="section-title mb-4">What to ask before you sign anything</h2>
        <div className="card-rule p-5 mb-8">
          <ul className="text-sm text-slate-700 space-y-2 leading-relaxed">
            <li><strong>Is the work commitment in writing?</strong> Get the required months and the exact repayment terms if you leave early.</li>
            <li><strong>Who pays for the exam and the retake?</strong> Confirm whether tuition, the first exam fee and a retake are covered.</li>
            <li><strong>What happens if I fail?</strong> Ask about retake policy, training-wage continuation and any cost you would owe.</li>
            <li><strong>Is the program state-approved?</strong> Your certification only counts if the training is on the state&rsquo;s approved list and you pass the state competency exam.</li>
            <li><strong>Is the training program quality-rated?</strong> On Medicare.gov you can review the facility&rsquo;s staffing and quality ratings before you commit to a year there.</li>
          </ul>
        </div>

        {/* Official channels */}
        <h2 className="section-title mb-4">Verify with the official channels</h2>
        <div className="card-rule p-5 mb-8">
          <ul className="text-sm text-slate-700 space-y-3 leading-relaxed">
            <li>
              <strong>Your state nurse aide registry</strong> — the authoritative source for approved training
              programs, the certification exam and your eventual listing. Search &ldquo;[your state] nurse aide
              registry&rdquo; or use the <Link href="/tools/state-board-directory/" className="text-[#1b4b8f] font-semibold hover:underline">state board directory</Link>.
            </li>
            <li>
              <strong>Medicare.gov</strong> — find Medicare-certified nursing homes near you, see their contact
              information, and check staffing and quality ratings before you approach them about sponsored training.
            </li>
            <li>
              <strong>CareerOneStop / American Job Center</strong> — locate workforce-funding help and ITA tuition
              assistance in your state.
            </li>
            <li>
              <strong>Your state workforce development agency</strong> — the state office that administers WIOA funding
              and training grants.
            </li>
          </ul>
        </div>

        {/* Tools */}
        <div className="rounded-2xl p-6 mb-10" style={{ background: 'linear-gradient(135deg,#eef2f9,#f7f3e6)' }}>
          <h2 className="font-display text-lg font-bold mb-3">Plan your CNA path</h2>
          <div className="flex flex-wrap gap-2">
            <Link href="/tools/free-training-finder/" className="btn-cta">Free training finder by state</Link>
            <Link href="/licensing-guides/cna/CA/" className="btn-ghost">CNA requirements guide</Link>
            <Link href="/tools/prep-budget/" className="btn-ghost">Prep budget</Link>
            <Link href="/tools/retake-interval/" className="btn-ghost">Retake calculator</Link>
          </div>
        </div>

        {/* FAQ */}
        <h2 className="section-title mb-4">Frequently asked questions</h2>
        <div className="space-y-3 mb-10">
          {faq.map((f) => (
            <div key={f.q} className="card-rule p-5">
              <h3 className="font-semibold text-slate-900 mb-1">{f.q}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>

        {/* Sources */}
        <h2 className="section-title mb-4">Sources</h2>
        <div className="space-y-3 mb-10">
          {SOURCES.map((s) => (
            <div key={s.name} className="text-sm border-l-2 border-[#c9a227] pl-3">
              <div className="font-semibold text-slate-800">{s.name}</div>
              <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">{s.note}</p>
            </div>
          ))}
        </div>

        <p className="text-xs text-slate-400 border-t border-slate-200 pt-4">
          This guide is informational and not legal, financial or career advice. Program availability, funding and
          employer offers change constantly, and requirements vary by state. This page lists no specific employers —
          always confirm the current details with the official sources above and your state nurse aide registry before
          you enroll or sign a work commitment (retrieved 2026-08-20).
        </p>
      </main>
    </>
  )
}
