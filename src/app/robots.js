export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/create-profile',
          '/contact',
          '/about',
          '/faqs',
          '/terms',
          '/privacy',
          '/premium',
        ],
        disallow: '/home/'
      }
    ],
    // sitemap: 'https://www.jodi4ever.com/sitemap.xml',
  }
}