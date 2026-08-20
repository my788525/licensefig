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
      <p className="text-slate-600 mb-3">
        COPPA: this site is not directed at children under 13; planning content is for adults pursuing a
        license.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-2">Contact</h2>
      <p className="text-slate-600 mb-3">
        Questions about this policy, the site or its data? Email{' '}
        <a href="mailto:hello@licensefig.com" className="text-[#1b4b8f] underline">hello@licensefig.com</a>.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-2">Third-party disclosure</h2>
      <p className="text-slate-600 mb-3">
        We do not sell, trade, rent or transfer personal information to third parties. Because we collect no
        personal data, there is nothing to share. We may use privacy-friendly analytics (e.g. Cloudflare Web
        Analytics) that count page views without tracking individuals.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-2">Advertising &amp; affiliate disclosure</h2>
      <p className="text-slate-600 mb-3">
        Some pages may link to exam prep providers, state boards or other services that help with the licensing
        road. If LicenseFig ever runs advertising or affiliate links, those links may be affiliate links — if you
        purchase through them, we may earn a commission at no extra cost to you. Affiliate or advertising
        relationships never influence our data, content or recommendations, and we will always disclose them
        here and on the page itself.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-2">Copyright &amp; DMCA</h2>
      <p className="text-slate-600 mb-3">
        All content on LicenseFig — text, tables, tools and sample questions — is original and protected by
        copyright. We do not host user-generated content, so DMCA takedowns are uncommon. If you believe any
        material on this site infringes your copyright, email{' '}
        <a href="mailto:hello@licensefig.com" className="text-[#1b4b8f] underline">hello@licensefig.com</a>{' '}
        with the page URL and a description, and we will review it promptly.
      </p>
    </main>
  )
}
