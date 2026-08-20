import Link from 'next/link'

/**
 * E-E-A-T author byline. Every article and occupation page is credited to the
 * LicenseFig Editorial Team, linking to /about/ where the responsible party,
 * methodology and contact details are documented.
 */
export default function AuthorByline({ date }: { date?: string }) {
  return (
    <p className="text-sm text-slate-500 mb-6">
      By{' '}
      <Link href="/about/" className="text-[#1b4b8f] underline">
        The LicenseFig Editorial Team
      </Link>
      {date ? (
        <>
          {' '}
          · {date} · reviewed against official state board sources
        </>
      ) : (
        ' · independent editorial research project'
      )}
    </p>
  )
}
