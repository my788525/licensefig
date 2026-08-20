import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { OCCUPATIONS, STATES } from '@/data/types'
import { getRequirements } from '@/data/requirements'
import PrintButton from '@/components/PrintButton'

// ============================================================================
// L3 sub-dimension: license reciprocity by state for one occupation.
// States with a published reciprocity note are shown verbatim; states without
// one render "check both state boards" instead of guessing. Each row links to
// the state's licensing board so candidates can verify directly.
// ============================================================================

interface Props {
  params: { occupationSlug: string }
}

export function generateStaticParams() {
  return OCCUPATIONS.map((o) => ({ occupationSlug: o.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { occupationSlug } = await params
  const occ = OCCUPATIONS.find((o) => o.slug === occupationSlug)
  if (!occ) return {}
  return {
    title: `${occ.name} License Reciprocity by State (2026)`,
    description: `Does your ${occ.shortName} license transfer? Reciprocity notes for all 50 states, with official state board links. Data retrieved 2026-08-20.`,
    alternates: { canonical: `/reciprocity/${occ.slug}/` },
  }
}

const stName = (code: string) => STATES.find((s) => s.code === code)?.name ?? code

export default async function ReciprocityPage({ params }: Props) {
  const { occupationSlug } = await params
  const occ = OCCUPATIONS.find((o) => o.slug === occupationSlug)
  if (!occ) notFound()

  const data = getRequirements(occ.id)
  const byState = new Map(data.map((d) => [d.stateCode, d]))
  const withNotes = STATES.filter((s) => byState.get(s.code)?.reciprocity)
  const withoutNotes = STATES.filter((s) => !byState.get(s.code)?.reciprocity)

  const faq = [
    {
      q: `Can I transfer my ${occ.shortName} license to another state?`,
      a:
        withNotes.length > 0
          ? `In our dataset, ${withNotes.length} states have a published reciprocity note (see the table). For every other state the rule is not published here — check both state boards before moving.`
          : `Reciprocity for ${occ.shortName} licenses is decided state-by-state and no state notes are published in our dataset yet. Contact both state boards — your current one and your destination — to confirm whether your license transfers, requires an exam, or needs extra education.`,
    },
    {
      q: 'What does reciprocity mean for a license?',
      a: 'Reciprocity lets an already-licensed professional from one state qualify for a license in another state without repeating the full education and exam process. Some states have formal agreements; others require a state-specific exam or extra coursework even when they accept your license.',
    },
    {
      q: 'Why do some states say "check both state boards"?',
      a: 'State reciprocity tables are not consistently published in machine-readable form. When a state has not published an official note in our verified sources, we point you to both boards rather than guess. That is the safest answer for a decision that can affect your eligibility to work.',
    },
    {
      q: 'Does holding a license in one state guarantee a license in another?',
      a: 'No. Every state sets its own licensing law. Even in states with reciprocity, you typically still file an application, pay a fee, pass a background check and sometimes pass a state-specific exam. Always confirm directly with the destination state board.',
    },
  ]

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="text-sm text-slate-500 mb-4">
          <Link href="/" className="hover:text-[#1b4b8f]">Home</Link> /{' '}
          <Link href="/reciprocity/" className="hover:text-[#1b4b8f]">Reciprocity</Link> /{' '}
          <span className="text-slate-800">{occ.shortName}</span>
        </nav>

        <span className="source-badge mb-4">Official sources · retrieved 2026-08-20</span>
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
          {occ.name} License Reciprocity by State ({new Date().getFullYear()})
        </h1>
        <p className="text-lg text-slate-700 leading-relaxed mb-2">
          {withNotes.length > 0
            ? `${withNotes.length} of ${STATES.length} states have a published reciprocity note in our dataset. For the remaining states, the note is not published — check both state boards before you move.`
            : `No state reciprocity notes for ${occ.shortName} are published in our dataset yet. For every state below, the honest answer is "check both state boards" — reciprocity rules are set state-by-state and change often.`}
        </p>
        <p className="text-sm text-slate-500 mb-6">
          {occ.description} A reciprocity note means a license from a listed state is accepted, usually still with an
          application, fee and background check. When no note exists, verify directly.
        </p>

        <div className="flex items-center gap-3 mb-6">
          <PrintButton />
          <Link href={`/occupations/${occ.slug}/`} className="text-sm text-[#1b4b8f] font-semibold hover:underline">
            Requirements by state →
          </Link>
        </div>

        <div className="overflow-x-auto card-rule mb-8">
          <table className="data-table w-full text-sm">
            <thead>
              <tr>
                <th className="px-4 py-2.5 text-left">State</th>
                <th className="px-4 py-2.5 text-left">Reciprocity note</th>
                <th className="px-4 py-2.5 text-left">Verify with</th>
              </tr>
            </thead>
            <tbody>
              {[...withNotes, ...withoutNotes].map((s) => {
                const d = byState.get(s.code)
                return (
                  <tr key={s.code}>
                    <td className="px-4 py-2.5 font-medium">
                      <Link href={`/licensing-guides/${occ.slug}/${s.code}/`} className="hover:text-[#1b4b8f]">
                        {stName(s.code)}
                      </Link>
                    </td>
                    <td className="px-4 py-2.5 text-slate-700">
                      {d?.reciprocity ?? <span className="italic text-slate-400">check both state boards</span>}
                    </td>
                    <td className="px-4 py-2.5">
                      {d?.officialUrl ? (
                        <a href={d.officialUrl} target="_blank" rel="noopener noreferrer" className="text-[#1b4b8f] font-semibold hover:underline text-xs">
                          {d.officialName ?? 'State board'} ↗
                        </a>
                      ) : (
                        <span className="text-xs text-slate-400">board site pending</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
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
          <h2 className="font-display text-lg font-bold mb-3">Plan your move with {occ.shortName} data</h2>
          <div className="flex flex-wrap gap-2">
            <Link href={`/pass-rates/${occ.slug}/`} className="btn-ghost">Pass rates by state</Link>
            <Link href={`/exam-costs/${occ.slug}/`} className="btn-ghost">Exam costs by state</Link>
            <Link href={`/guides/${occ.slug}/`} className="btn-ghost">Full license guide</Link>
            <Link href="/tools/reciprocity-checker/" className="btn-ghost">Reciprocity checker tool</Link>
            <Link href="/tools/state-board-directory/" className="btn-cta">State board directory</Link>
          </div>
        </div>

        <p className="text-xs text-slate-400 border-t border-slate-200 pt-4">
          Reciprocity rules change frequently and are set by each state legislature and board. &ldquo;Check both state
          boards&rdquo; means the note is not published in our dataset — it is not a negative answer. Always verify with
          both boards before relocating (data retrieved 2026-08-20).
        </p>
      </main>
    </>
  )
}
