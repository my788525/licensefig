import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'LicenseFig privacy policy — zero data collection.',
  alternates: { canonical: '/privacy/' },
}

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold mb-4">Privacy</h1>
      <p className="text-slate-600 mb-3">
        LicenseFig is a static website. All calculators run in your browser; we operate no accounts and
        collect no personal data. Optional email subscriptions open your own mail client with a pre-filled
        message — nothing is stored on our servers.
      </p>
      <p className="text-slate-600 mb-3">
        We use standard analytics (e.g. Cloudflare Web Analytics) that do not track individuals. We never
        sell data.
      </p>
      <p className="text-slate-600">
        COPPA: this site is not directed at children under 13; planning content is for adults pursuing a
        license.
      </p>
    </main>
  )
}
