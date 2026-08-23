'use client';

import { usePathname } from 'next/navigation';

// 动态面包屑：基于当前 pathname 生成 BreadcrumbList JSON-LD（供 Google/AIO 引用）。
// 仅输出 schema，不渲染可见导航，避免与各站原有 nav 样式冲突。
export default function Breadcrumbs({ domain }: { domain: string }) {
  const pathname = usePathname() || '/';
  const segs = pathname.split('/').filter(Boolean);
  const crumbs = [{ name: 'Home', url: '/' }];
  let acc = '';
  for (const s of segs) {
    acc += '/' + s;
    const label = s
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
    crumbs.push({ name: label, url: acc });
  }
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `https://${domain}${c.url}`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
