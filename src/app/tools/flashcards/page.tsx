import type { Metadata } from 'next'
import FlashcardGenerator from '@/components/tools/FlashcardGenerator'

export const metadata: Metadata = {
  title: 'Free Licensing Flashcards — 15 Careers, Flip-to-Study & Printable',
  description:
    'Flip-to-study flashcards with real industry terms and original definitions for real estate, CNA, insurance, beauty and trade licensing exams. Printable decks for 15 careers.',
  alternates: { canonical: '/tools/flashcards/' },
  openGraph: {
    title: 'Free Licensing Flashcards by Career',
    description: 'Flip-to-study flashcards with real industry terms and original definitions. Free and printable.',
    type: 'website',
    url: 'https://licensefig.com/tools/flashcards/',
  },
}

const faq = [
  {
    q: 'What terms are in the real estate flashcard deck?',
    a: 'The real estate deck covers the vocabulary you’ll actually meet: agency, fiduciary duty, proration, loan-to-value, earnest money, contingency, escrow, dual agency, disclosure, amortization and more — 16 original cards with plain-language definitions.',
  },
  {
    q: 'What is in the CNA flashcard deck?',
    a: 'The CNA deck covers standard precautions, HIPAA, ADLs, vital signs, PPE, pressure injuries, body mechanics and the nurse aide registry — the terminology used in nurse aide training and exams.',
  },
  {
    q: 'How do the flashcards work?',
    a: 'Click a card to flip between the term and its definition. Use “Flip all” and “Reset all” for quick review sessions. Print renders every card as term + definition, so a printed deck works offline too.',
  },
  {
    q: 'Are the definitions official?',
    a: 'The terms are real industry terminology and the definitions are original, written in plain English for study. Exam wording and definitions vary by state and vendor — cross-check with your prep materials and state board.',
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

export default function FlashcardGeneratorPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <nav className="text-xs text-slate-500 mb-6" aria-label="Breadcrumb">
        <a href="/" className="text-indigo-600 hover:underline">Home</a> {' / '}
        <a href="/tools/" className="text-indigo-600 hover:underline">Tools</a> {' / '}
        <span className="text-slate-800">Flashcards</span>
      </nav>

      <h1 className="text-3xl font-bold text-slate-900 mb-3">Licensing Flashcards</h1>
      <p className="text-slate-600 mb-6 leading-relaxed">
        Pick a career and flip through original flashcards built from the real vocabulary of the job — terms like
        agency, fiduciary, proration, standard precautions and ADL — then print a deck to study anywhere.
      </p>

      <div className="mb-10">
        <FlashcardGenerator />
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
        Vocabulary is real industry terminology with original definitions for study. Exam wording varies by state and
        vendor — verify with your prep materials and state board.
      </p>
    </main>
  )
}
