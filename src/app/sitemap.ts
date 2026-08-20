import type { MetadataRoute } from 'next'
import { OCCUPATIONS, STATES } from '@/data/types'

const baseUrl = 'https://licensefig.com'

// All 50 states + DC
const TOP_STATES = STATES.map((x) => x.code)

const TOOL_SLUGS = [
  'requirements-lookup', 'study-plan-generator', 'prep-budget', 'retake-interval',
  'pass-rate-index', 'reciprocity-checker', 'exam-cost-compare', 'test-center-finder',
  'license-progress-tracker', 'free-training-finder', 'exam-structure', 'sample-questions',
  'formula-cheat-sheet', 'flashcards', 'exam-countdown', 'license-renewal',
  'ce-requirements', 'career-roi', 'state-board-directory', 'exam-day-checklist',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const staticUrls: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/occupations/`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/tools/`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/pass-rates/`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/exam-costs/`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/reciprocity/`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/data/`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/about/`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${baseUrl}/privacy/`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const occupationUrls: MetadataRoute.Sitemap = OCCUPATIONS.map((o) => ({
    url: `${baseUrl}/occupations/${o.slug}/`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }))

  const toolUrls: MetadataRoute.Sitemap = TOOL_SLUGS.map((slug) => ({
    url: `${baseUrl}/tools/${slug}/`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const guideUrls: MetadataRoute.Sitemap = []
  const variantUrls: MetadataRoute.Sitemap = []
  const VARIANT_VIEWS = ['cost', 'difficulty', 'retake']
  for (const occ of OCCUPATIONS) {
    for (const sc of TOP_STATES) {
      guideUrls.push({
        url: `${baseUrl}/licensing-guides/${occ.slug}/${sc}/`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.75,
      })
      for (const view of VARIANT_VIEWS) {
        variantUrls.push({
          url: `${baseUrl}/licensing-guides/${occ.slug}/${sc}/${view}/`,
          lastModified: now,
          changeFrequency: 'monthly',
          priority: 0.7,
        })
      }
    }
  }

  // L3 content wave — deep guides + sub-dimension data pages (2026-08-20)
  const deepUrls: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/guides/cna-free-training/`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/guides/exam-changes-2026/`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ]
  for (const occ of OCCUPATIONS) {
    deepUrls.push({
      url: `${baseUrl}/guides/${occ.slug}/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    })
    deepUrls.push({
      url: `${baseUrl}/pass-rates/${occ.slug}/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    })
    deepUrls.push({
      url: `${baseUrl}/exam-costs/${occ.slug}/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    })
    deepUrls.push({
      url: `${baseUrl}/reciprocity/${occ.slug}/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  }

  return [...staticUrls, ...occupationUrls, ...toolUrls, ...guideUrls, ...variantUrls, ...deepUrls]
}
