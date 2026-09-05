export default function robots() {
  const baseUrl = 'https://connect.techotraders.com.lk'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/checkout/',
          '/orders/',
          '/api/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}