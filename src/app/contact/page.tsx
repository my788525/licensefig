'use client'

import { useState } from 'react'
import { WEB3FORMS_ACCESS_KEY, CONTACT_EMAIL } from '@/lib/web3forms'

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const form = e.currentTarget
    const data = new FormData(form)
    const payload: Record<string, string> = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: data.get('subject') as string,
      from_name: data.get('name') as string,
      email: data.get('email') as string,
      message: data.get('message') as string,
      // Honeypot — hidden field; bots that fill it are silently dropped.
      botcheck: (data.get('botcheck') as string) || '',
    }
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (json.success) {
        setStatus('sent')
        form.reset()
      } else {
        setStatus('error')
        setErrorMsg(json.message || 'Submission failed. Please email us directly instead.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Network error. Please email us directly instead.')
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold mb-4">Contact LicenseFig</h1>
      <p className="text-slate-600 mb-6">
        Corrections, source suggestions, licensing-requirement questions or feedback on our tools? Send a
        message below — we respond to every legitimate inquiry. You can also email us directly at{' '}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#1b4b8f] underline">{CONTACT_EMAIL}</a>.
      </p>

      {status === 'sent' ? (
        <div className="rounded-xl border border-green-300 bg-green-50 p-4 mb-6 text-green-800">
          <strong>Thanks for reaching out.</strong> Your message was sent — we typically reply within a few
          business days. For time-sensitive licensing questions, always confirm with your state board.
        </div>
      ) : null}

      {status === 'error' ? (
        <div className="rounded-xl border border-red-300 bg-red-50 p-4 mb-6 text-red-800">
          <strong>Something went wrong.</strong> {errorMsg}
        </div>
      ) : null}

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold mb-1">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={80}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold mb-1">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={120}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-semibold mb-1">Subject</label>
          <input
            id="subject"
            name="subject"
            type="text"
            required
            maxLength={150}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            placeholder="What is this about?"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-semibold mb-1">Message</label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            maxLength={3000}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            placeholder="Please include the page URL if your message relates to a specific page or figure."
          />
        </div>
        <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

        <button
          type="submit"
          disabled={status === 'sending'}
          className="px-5 py-2.5 rounded-lg bg-[#1b4b8f] text-white text-sm font-semibold hover:bg-[#163d73] disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>
      </form>

      <p className="text-xs text-slate-400 mt-8">
        Messages are processed by Web3Forms and used only to respond to your inquiry — never for marketing,
        and never shared or sold. See our <a href="/privacy/" className="text-[#1b4b8f] underline">Privacy</a>{' '}
        policy for details.
      </p>
    </main>
  )
}
