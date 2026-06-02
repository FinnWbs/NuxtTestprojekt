const features = [
  {
    slug: 'routing',
    title: 'Routing',
    eyebrow: 'Pages & NuxtLink',
    summary: 'Nuxt erzeugt Routen aus Dateien und verbindet Seiten mit NuxtLink.',
    details: 'Diese Route zeigt file-based routing: app/pages/routing.vue wird zu /routing, app/pages/features/[slug].vue zu dynamischen Detailseiten.'
  },
  {
    slug: 'data-fetching',
    title: 'Data Fetching',
    eyebrow: 'useFetch',
    summary: 'Seiten laden Daten serverfreundlich über useFetch.',
    details: 'Die Routing-Seite und diese Detailseite lesen denselben API-Endpunkt über useFetch, damit SSR und Client-Navigation denselben Datenpfad nutzen.'
  },
  {
    slug: 'server-api',
    title: 'Server API',
    eyebrow: 'Nitro API Route',
    summary: 'server/api/features.get.ts liefert JSON aus Nuxts Server-Engine.',
    details: 'Der Endpunkt /api/features wird von Nitro bereitgestellt und kann aus Pages, Komponenten oder direkt im Browser gelesen werden.'
  },
  {
    slug: 'seo',
    title: 'SEO',
    eyebrow: 'useSeoMeta',
    summary: 'Jede Page kann eigene Meta-Daten setzen.',
    details: 'Die Startseite, Routing-Seite und Detailseiten setzen individuelle Titel und Beschreibungen, während app.vue das globale Title-Template definiert.'
  }
]

export default defineEventHandler(() => features)
