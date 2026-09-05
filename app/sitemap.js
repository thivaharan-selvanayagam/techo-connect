import { mainProducts } from '../lib/data'

export default async function sitemap() {
  const baseUrl = 'https://connect.techotraders.com.lk'

  // Static site routes
  const staticRoutes = [
    '',
    '/products',
    '/about',
    '/contact',
    '/careers',
    '/track',
    '/analyzer',
    '/installation-guide',
    '/returns',
    '/terms',
    '/privacy',
    '/shipping',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === '' || route === '/products' ? 'daily' : 'monthly',
    priority: route === '' ? 1.0 : route === '/products' ? 0.9 : 0.6,
  }))

  // Dynamic Product Pages
  const productRoutes = mainProducts.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...productRoutes]
}