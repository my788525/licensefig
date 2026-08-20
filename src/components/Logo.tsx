/**
 * LicenseFig logo — official-seal style brand mark.
 * Navy shield + gold check = "licensed & verified". Renders as inline SVG
 * so it scales everywhere (header, footer, print, social).
 */

export default function Logo({ size = 32, withWordmark = true }: { size?: number; withWordmark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2">
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" style={{ display: 'block' }}>
        {/* Shield */}
        <defs>
          <linearGradient id="lf-shield" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1B4B8F" />
            <stop offset="1" stopColor="#0B2545" />
          </linearGradient>
        </defs>
        <path
          d="M32 3 55 11v20c0 14.5-9.9 25.1-23 30C18.9 56.1 9 45.5 9 31V11L32 3Z"
          fill="url(#lf-shield)"
          stroke="#C9A227"
          strokeWidth="2.5"
        />
        {/* Inner border */}
        <path
          d="M32 8 50.5 14.5V31c0 11.7-7.9 20.3-18.5 24.6C21.4 51.3 13.5 42.7 13.5 31V14.5L32 8Z"
          fill="none"
          stroke="#C9A227"
          strokeWidth="1"
          opacity="0.55"
        />
        {/* Document */}
        <rect x="21" y="18" width="22" height="28" rx="2.5" fill="#FFFFFF" />
        <rect x="25" y="24" width="14" height="2.2" rx="1.1" fill="#0B2545" opacity="0.85" />
        <rect x="25" y="29" width="14" height="2.2" rx="1.1" fill="#0B2545" opacity="0.85" />
        <rect x="25" y="34" width="14" height="2.2" rx="1.1" fill="#0B2545" opacity="0.85" />
        <rect x="25" y="39" width="8" height="2.2" rx="1.1" fill="#0B2545" opacity="0.6" />
        {/* Gold check */}
        <path
          d="m27.5 23.5 3.4 3.4 6.6-7"
          stroke="#C9A227"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      {withWordmark && (
        <span className="font-serif font-bold tracking-tight text-slate-900 leading-none" style={{ fontSize: size * 0.72 }}>
          License<span className="text-[#C9A227]">Fig</span>
        </span>
      )}
    </span>
  )
}
