import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.nnpoultrypalace.co.ke';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio', '/sanity', '/api/'],
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'ClaudeBot', 'PerplexityBot', 'OAI-SearchBot', 'Google-Extended'],
        allow: '/',
        disallow: ['/studio', '/sanity', '/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

