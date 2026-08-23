'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

interface Tool {
  slug: string;
  emoji: string;
  name: string;
  desc: string;
}

export default function ToolFilter({ tools }: { tools: Tool[] }) {
  const [q, setQ] = useState('');

  // Pre-fill from ?tool= (SearchAction sitelink landing).
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get('tool');
    if (p) setQ(p);
  }, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return null;
    return tools.filter(
      (t) =>
        t.name.toLowerCase().includes(s) ||
        t.desc.toLowerCase().includes(s)
    );
  }, [q, tools]);

  if (!filtered) return null;

  if (filtered.length === 0) {
    return (
      <div className="mb-8">
        <input
          type="search"
          placeholder="Find a tool by name (e.g. requirements, flashcards, renewal)…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Find a tool"
          className="w-full max-w-md rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-indigo-500"
        />
        <p className="mt-2 text-sm text-slate-500">
          No tool matches “{q}”. Try a broader term, or browse all tools below.
        </p>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <input
        type="search"
        placeholder="Find a tool by name (e.g. requirements, flashcards, renewal)…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="Find a tool"
        className="w-full max-w-md rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-indigo-500"
      />
      <p className="mt-2 text-sm text-slate-500">
        {filtered.length} tool{filtered.length === 1 ? '' : 's'} match “{q}”.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filtered.map((t) => (
          <Link
            key={t.slug}
            href={t.slug}
            className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-indigo-300 hover:shadow-sm transition"
          >
            <div className="text-2xl mb-2">{t.emoji}</div>
            <div className="font-semibold text-slate-900 text-sm">{t.name}</div>
            <div className="text-xs text-slate-500 mt-1 leading-relaxed">{t.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
