import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/structuredData'

export const dynamic = 'force-static'

// AI / answer-engine crawlers, called out explicitly so our intent to be
// indexed and cited by generative search (GEO) is unambiguous. Covers training,
// live-retrieval, and answer-engine agents from the major providers.
const AI_CRAWLERS = [
  'GPTBot',            // OpenAI (training)
  'OAI-SearchBot',     // OpenAI (search index)
  'ChatGPT-User',      // ChatGPT live browsing
  'ClaudeBot',         // Anthropic (crawl)
  'anthropic-ai',      // Anthropic
  'Claude-Web',        // Anthropic live browsing
  'PerplexityBot',     // Perplexity (index)
  'Perplexity-User',   // Perplexity live retrieval
  'Google-Extended',   // Google Gemini / Vertex training + AI Overviews
  'Applebot-Extended', // Apple Intelligence
  'CCBot',             // Common Crawl (feeds many LLMs)
  'Amazonbot',         // Amazon
  'Bytespider',        // ByteDance
  'cohere-ai',         // Cohere
]

export default function robots(): MetadataRoute.Robots {
  const base = { allow: '/', disallow: ['/admin/', '/preview/'] }
  return {
    rules: [
      { userAgent: '*', ...base },
      // Explicit allow for AI/answer engines (same access as everyone else).
      { userAgent: AI_CRAWLERS, ...base },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
