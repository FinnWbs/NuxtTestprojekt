import type { TourStep } from '~/types/showcase'

export const routingTourSteps: TourStep[] = [
  {
    key: 'route-nav',
    target: 'route-nav',
    eyebrow: 'NuxtLink',
    title: 'Navigation ohne Page Reload',
    copy: 'NuxtLink verbindet Seiten innerhalb der App. So bleibt Navigation schnell, barrierearm und kompatibel mit Nuxts Routing-System.',
    presentationTitle: 'NuxtLink verbindet deine Routen',
    presentationSummary: 'Die Navigation oben zeigt echte Links zur Startseite, zur Routing-Demo und zur Nitro-API. Interne Links laufen über NuxtLink.',
    whyItMatters: 'NuxtLink nutzt Vue Router im Hintergrund. Dadurch navigiert die App clientseitig, kann aber trotzdem servergerendert ausgeliefert werden.',
    takeaways: [
      'NuxtLink ist für interne App-Routen gedacht.',
      'Aktive Links bekommen automatisch Router-Klassen.',
      'Normale a-Tags bleiben sinnvoll für API- oder externe Ziele.'
    ],
    codeFocus: 'Achte auf NuxtLink für interne Routen und a für den API-Endpunkt.',
    codeTitle: 'app/pages/routing.vue - Navigation',
    codeLanguage: 'vue',
    code: `<nav class="route-nav">
  <NuxtLink to="/">Aufgaben-Spotlight</NuxtLink>
  <NuxtLink to="/routing">Routing-Demo</NuxtLink>
  <a href="/api/features">API JSON</a>
</nav>`
  },
  {
    key: 'page-route',
    target: 'route-hero',
    eyebrow: 'Pages',
    title: 'Datei wird Route',
    copy: 'Diese Seite existiert, weil Nuxt aus app/pages/routing.vue automatisch die Browser-Route /routing erzeugt.',
    presentationTitle: 'Pages erzeugen automatisch Routen',
    presentationSummary: 'Nuxt liest die app/pages-Struktur und erzeugt daraus Vue-Router-Routen. Diese Datei ist deshalb direkt unter /routing erreichbar.',
    whyItMatters: 'Du musst keinen Router manuell konfigurieren. Die Dateistruktur beschreibt die Navigationsstruktur der Anwendung.',
    takeaways: [
      'app/pages/index.vue wird zu /.',
      'app/pages/routing.vue wird zu /routing.',
      'app.vue rendert Pages über NuxtPage.'
    ],
    codeFocus: 'Die Datei selbst ist die Routing-Konfiguration.',
    codeTitle: 'app/pages/routing.vue',
    codeLanguage: 'vue',
    code: `// Datei: app/pages/routing.vue

useSeoMeta({
  title: 'Routing & Data Fetching'
})

<template>
  <main>Routing-Demo</main>
</template>`
  },
  {
    key: 'fetch',
    target: 'feature-demo',
    eyebrow: 'useFetch',
    title: 'Serverdaten in der Page',
    copy: 'Die Feature-Karten werden mit useFetch aus einer Nitro-API geladen und können serverseitig vorgerendert werden.',
    presentationTitle: 'useFetch verbindet Page und Server-API',
    presentationSummary: 'Die Routing-Seite lädt Feature-Daten aus /api/features. Nuxt kann diese Daten beim SSR holen und beim Client-Wechsel wiederverwenden.',
    whyItMatters: 'useFetch ist Nuxt-bewusst: Es passt zu SSR, Payload-Hydration und Client-Navigation, ohne dass du separate Datenpfade bauen musst.',
    takeaways: [
      'await useFetch lädt Daten für die Page.',
      'pending und error bilden Lade- und Fehlerzustand ab.',
      'Der Endpunkt kommt aus server/api/features.get.ts.'
    ],
    codeFocus: 'Beachte den typisierten Fetch und die drei UI-Zustände.',
    codeTitle: 'app/pages/routing.vue - useFetch',
    codeLanguage: 'ts',
    code: `type Feature = {
  slug: string
  title: string
  summary: string
}

const { data: features, pending, error } =
  await useFetch<Feature[]>('/api/features')`
  },
  {
    key: 'dynamic',
    target: 'feature-grid',
    eyebrow: 'Dynamische Routes',
    title: 'Links zu /features/:slug',
    copy: 'Jede Karte zeigt auf eine dynamische Detailroute. Der Slug wird später von app/pages/features/[slug].vue gelesen.',
    presentationTitle: 'Dynamische Dateien werden Parameter-Routen',
    presentationSummary: 'Die Feature-Karten verlinken zu /features/routing, /features/data-fetching und weiteren Slugs. Nuxt rendert alle mit derselben [slug]-Datei.',
    whyItMatters: 'So kannst du viele Detailseiten mit einer Datei bauen. Der Slug entscheidet, welche Daten angezeigt werden.',
    takeaways: [
      '[slug].vue steht für einen dynamischen Parameter.',
      'NuxtLink baut typisches Card-Navigation-Markup.',
      'useRoute liest den Parameter auf der Detailseite.'
    ],
    codeFocus: 'Die Karte erzeugt den Pfad, die Detailseite liest den Slug.',
    codeTitle: 'app/pages/routing.vue - Feature-Karten',
    codeLanguage: 'vue',
    code: `<NuxtLink
  v-for="feature in features"
  :key="feature.slug"
  :to="\`/features/\${feature.slug}\`"
>
  {{ feature.title }}
</NuxtLink>`
  }
]

export const featureDetailTourSteps: TourStep[] = [
  {
    key: 'detail-nav',
    target: 'route-nav',
    eyebrow: 'Route Context',
    title: 'Zurück durch die Demo',
    copy: 'Die Detailseite bleibt Teil der Demo-Navigation: zurück zur Startseite, zur Routing-Übersicht oder direkt zum API-JSON.',
    presentationTitle: 'Detailseiten bleiben verbunden',
    presentationSummary: 'Auch eine dynamische Detailseite nutzt NuxtLink und normale Links, damit der Präsentationsfluss nicht abreisst.',
    whyItMatters: 'Gute Routen-Demos zeigen nicht nur einzelne Seiten, sondern den Wechsel zwischen ihnen. NuxtLink hält diese Übergänge in der App.',
    takeaways: [
      'NuxtLink navigiert zurück zur Routing-Demo.',
      'Die API bleibt direkt prüfbar.',
      'Aktive Route und Page bleiben synchron.'
    ],
    codeFocus: 'Die Detailseite benutzt dieselbe Navigationsstruktur wie die Routing-Übersicht.',
    codeTitle: 'app/pages/features/[slug].vue - Navigation',
    codeLanguage: 'vue',
    code: `<nav class="route-nav">
  <NuxtLink to="/">Aufgaben-Spotlight</NuxtLink>
  <NuxtLink to="/routing">Routing-Demo</NuxtLink>
  <a href="/api/features">API JSON</a>
</nav>`
  },
  {
    key: 'slug',
    target: 'route-hero',
    eyebrow: 'useRoute',
    title: 'Slug aus der URL lesen',
    copy: 'Diese Detailseite liest den dynamischen Parameter aus der URL und sucht damit den passenden Feature-Datensatz.',
    presentationTitle: 'useRoute macht Parameter nutzbar',
    presentationSummary: 'Die Datei app/pages/features/[slug].vue rendert viele URLs. useRoute liest, welcher Slug gerade aktiv ist.',
    whyItMatters: 'Dynamische Routen brauchen keine eigene Datei pro Inhalt. Der Parameter verbindet URL, Daten und gerendertes Template.',
    takeaways: [
      'route.params.slug kommt aus [slug].vue.',
      'computed hält den Slug reaktiv.',
      'feature sucht den Datensatz passend zur URL.'
    ],
    codeFocus: 'Achte darauf, wie der URL-Parameter in ein Feature-Objekt übersetzt wird.',
    codeTitle: 'app/pages/features/[slug].vue - Dynamic Route',
    codeLanguage: 'ts',
    code: `const route = useRoute()
const slug = computed(() => String(route.params.slug))

const feature = computed(() =>
  features.value?.find((item) => item.slug === slug.value)
)`
  },
  {
    key: 'detail-fetch',
    target: 'detail-data',
    eyebrow: 'Shared Data',
    title: 'Dieselbe API, andere Route',
    copy: 'Die Detailseite nutzt denselben API-Endpunkt wie die Übersicht. Nur die Auswahl des passenden Datensatzes ist anders.',
    presentationTitle: 'Routen können Datenquellen teilen',
    presentationSummary: 'Routing-Übersicht und Detailseite lesen /api/features. Dadurch bleibt die Demo klein, aber zeigt Page, Dynamic Route und Server API zusammen.',
    whyItMatters: 'Nuxt erlaubt konsistente Datenpfade über mehrere Pages hinweg. Das macht SSR, Hydration und Navigation leichter nachvollziehbar.',
    takeaways: [
      'useFetch lädt denselben Endpunkt.',
      'Die Detailseite filtert client- und serverfreundlich.',
      'Fehler- und Nicht-gefunden-Zustände bleiben im Template.'
    ],
    codeFocus: 'Die Page teilt den Fetch, aber rendert einen einzelnen Eintrag.',
    codeTitle: 'app/pages/features/[slug].vue - Shared Fetch',
    codeLanguage: 'ts',
    code: `const { data: features, pending, error } =
  await useFetch<Feature[]>('/api/features')

useSeoMeta({
  title: () => feature.value
    ? feature.value.title
    : 'Feature nicht gefunden'
})`
  }
]
