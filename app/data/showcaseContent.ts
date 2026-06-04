import type { Filter, ShowcaseRouteLink, Todo, TourStep } from '~/types/showcase'

export const initialTodos: Todo[] = [
  {
    id: 1,
    title: 'Eine Nuxt-Seite mit Vue-State verdrahten',
    done: true,
    nuxtFeature: 'Single-File-App-Shell'
  },
  {
    id: 2,
    title: 'Eine Aufgabe hinzufügen und berechnete Daten beobachten',
    done: false,
    nuxtFeature: 'Automatisch importierte Reaktivität'
  },
  {
    id: 3,
    title: 'Die geführte Feature-Tour ausprobieren',
    done: false,
    nuxtFeature: 'Interaktives Nuxt-Showcase'
  }
]

export const featureTags = [
  'SSR-fähige Shell',
  'Vue 3 Composition',
  'Auto-Imports',
  'Berechneter State',
  'Client-Persistenz',
  'Nuxt DevTools'
]

export const routeLinks: ShowcaseRouteLink[] = [
  {
    label: 'Routing-Demo',
    to: '/routing',
    eyebrow: 'Page Route',
    description: 'app/pages/routing.vue wird automatisch zu /routing.'
  },
  {
    label: 'Feature: Routing',
    to: '/features/routing',
    eyebrow: 'Dynamische Route',
    description: 'app/pages/features/[slug].vue rendert den Slug routing.'
  },
  {
    label: 'Feature: Data Fetching',
    to: '/features/data-fetching',
    eyebrow: 'useFetch Detail',
    description: 'Eine zweite Detailseite nutzt dieselbe dynamische Route.'
  },
  {
    label: 'API JSON',
    to: '/api/features',
    eyebrow: 'Nitro API',
    description: 'server/api/features.get.ts liefert direkt JSON.',
    external: true
  }
]

export const filters: Filter[] = ['all', 'active', 'done']

export const filterLabels: Record<Filter, string> = {
  all: 'Alle',
  active: 'Aktiv',
  done: 'Erledigt'
}

export const tourSteps: TourStep[] = [
  {
    key: 'hero',
    target: 'hero',
    eyebrow: 'Nuxt-Rendering',
    title: 'Nuxt-Seite mit App-Shell',
    copy: 'Dieser Screen wird als Nuxt-App-Shell gerendert. Dadurch leben Seiten-Metadaten, Hydration und Vue-Interaktivität ohne zusätzliche Zeremonie zusammen.',
    presentationTitle: 'Nuxt gibt jeder Seite eine App-Shell',
    presentationSummary: 'Dieser Code zeigt, wie Nuxt die Root-App schlank hält: app.vue setzt Metadaten und übergibt den sichtbaren Hero an eine automatisch importierte Komponente.',
    whyItMatters: 'Nuxt trennt Root-Verantwortung und UI-Komponenten sauber. app.vue bleibt der Einstiegspunkt, während Komponenten unter app/components automatisch verfügbar sind.',
    takeaways: [
      'app.vue bleibt Root-Shell und setzt useSeoMeta.',
      'ShowcaseHero wird durch Nuxt automatisch importiert.',
      'onMounted im Composable markiert die hydratisierte Client-App.'
    ],
    codeFocus: 'Achte auf Root-Shell, Auto-Import-Komponente und Hydration-Status.',
    codeTitle: 'app/app.vue + app/components/ShowcaseHero.vue',
    codeLanguage: 'vue',
    code: `<script setup>
const { startTour } = useTodoShowcase()

useSeoMeta({
  title: 'Aufgaben-Spotlight'
})
</script>

<template>
  <ShowcaseHero @start="startTour" />
</template>`
  },
  {
    key: 'routes',
    target: 'routes',
    eyebrow: 'File-Based Routing',
    title: 'Routen direkt ausprobieren',
    copy: 'Die Route-Karte zeigt echte Nuxt-Ziele: eine Page, dynamische Feature-Detailseiten und eine Nitro-API. Jeder Link fuehrt zu einer Route, die aus einer Datei entsteht.',
    presentationTitle: 'Nuxt erzeugt Routen aus Dateien',
    presentationSummary: 'Dieser Schritt zeigt die eigentliche Routing-Demo: NuxtLink navigiert zu Pages, ein dynamischer Slug rendert Detailseiten, und ein Nitro-Endpunkt liefert JSON.',
    whyItMatters: 'Nuxt macht Routing sichtbar und vorhersehbar. Lege Dateien unter app/pages oder server/api an, und Nuxt stellt daraus automatisch Browser- und API-Routen bereit.',
    takeaways: [
      'app/pages/routing.vue wird zu /routing.',
      'app/pages/features/[slug].vue wird zu /features/:slug.',
      'server/api/features.get.ts wird zu /api/features.'
    ],
    codeFocus: 'Klicke die Route-Karte links: NuxtLink verbindet interne Seiten, der API-Link zeigt Nitro-JSON.',
    codeTitle: 'app/pages/routing.vue + app/pages/features/[slug].vue',
    codeLanguage: 'vue',
    code: `<!-- app/pages/routing.vue wird zu /routing -->
<NuxtLink to="/routing">
  Routing-Demo
</NuxtLink>

<!-- app/pages/features/[slug].vue liest den Slug -->
<NuxtLink to="/features/routing">
  Feature: Routing
</NuxtLink>

const route = useRoute()
const slug = route.params.slug`
  },
  {
    key: 'composer',
    target: 'composer',
    eyebrow: 'Auto-Imports',
    title: 'Reaktiver Aufgaben-Composer',
    copy: 'Die Eingabe nutzt Vue-Refs und Aktionen in script setup. Nuxt importiert typische Composables automatisch, damit die Komponente schlank bleibt und die UI reaktiv ist.',
    presentationTitle: 'Vue-Reaktivität mit Nuxt-Auto-Imports',
    presentationSummary: 'Der Eingabewert lebt im Composable, während TodoComposer nur UI und Events kapselt. Nuxt verbindet beides über automatisch importierte Komponenten und Composables.',
    whyItMatters: 'So bleibt Business-Logik wiederverwendbar und die Komponente leicht testbar. Nuxt auto-importiert useTodoShowcase und TodoComposer ohne manuelle Importlisten.',
    takeaways: [
      'newTodo ist ein ref im Composable.',
      'TodoComposer nutzt v-model und ein submit-Event.',
      'addTodo verändert nur den zentralen Todo-State.'
    ],
    codeFocus: 'Verfolge den Wert von v-model in die addTodo-Aktion.',
    codeTitle: 'app/components/TodoComposer.vue + useTodoShowcase.ts',
    codeLanguage: 'vue',
    code: `const newTodo = ref('')

const addTodo = () => {
  const title = newTodo.value.trim()
  if (!title) return

  todos.value.unshift({
    id: Date.now(),
    title,
    done: false
  })

  newTodo.value = ''
}

<TodoComposer
  v-model="newTodo"
  @submit="addTodo"
/>`
  },
  {
    key: 'stats',
    target: 'stats',
    eyebrow: 'Berechneter State',
    title: 'Abgeleitete Daten aktualisieren sich sofort',
    copy: 'Die Fortschrittskarten werden aus der Aufgabenliste berechnet. Wenn Aufgaben umgeschaltet oder hinzugefügt werden, aktualisiert sich das Dashboard ohne manuelle DOM-Arbeit.',
    presentationTitle: 'Computed State hält die UI korrekt',
    presentationSummary: 'Die Zahlen werden im Composable aus todos abgeleitet und als Props an TodoStats gegeben. Die Komponente muss nicht wissen, wie die Werte berechnet werden.',
    whyItMatters: 'Nuxt-Apps profitieren von derselben Vue-Reaktivität: computed-Werte bleiben synchron mit SSR, Hydration und späteren Client-Interaktionen.',
    takeaways: [
      'computed kapselt abgeleitete Werte.',
      'TodoStats bekommt fertige Zahlen als Props.',
      'Das Template bleibt frei von Berechnungsdetails.'
    ],
    codeFocus: 'Beachte die Trennung zwischen Berechnung im Composable und Darstellung in TodoStats.',
    codeTitle: 'app/composables/useTodoShowcase.ts',
    codeLanguage: 'ts',
    code: `const done = computed(() =>
  todos.value.filter((todo) => todo.done)
)

const open = computed(() =>
  todos.value.filter((todo) => !todo.done)
)

const completionRate = computed(() =>
  todos.value.length
    ? Math.round(done.value.length / todos.value.length * 100)
    : 0
)`
  },
  {
    key: 'filters',
    target: 'filters',
    eyebrow: 'URL-fähige UX',
    title: 'Filtern wie in einer echten App',
    copy: 'Nuxt arbeitet natürlich mit Vue Router zusammen. Solcher State kann später zu Route-Parametern, Query-Strings oder verschachtelten Seiten wachsen.',
    presentationTitle: 'Kleiner UI-State kann zu Routing wachsen',
    presentationSummary: 'Der Filter-State ist typisiert und zentral. TodoFilters rendert nur Controls, während filteredTodos im Composable die sichtbaren Daten berechnet.',
    whyItMatters: 'Wenn der Filter später in die URL soll, kann das Composable useRoute oder navigateTo ergänzen, ohne die UI-Komponente neu zu schreiben.',
    takeaways: [
      'Filter ist eine TypeScript-Union.',
      'filteredTodos bündelt die Anzeige-Logik.',
      'TodoFilters bleibt eine reine Control-Komponente.'
    ],
    codeFocus: 'Vergleiche activeFilter, filteredTodos und das setFilter-Event.',
    codeTitle: 'app/composables/useTodoShowcase.ts + TodoFilters.vue',
    codeLanguage: 'vue',
    code: `type Filter = 'all' | 'active' | 'done'

const activeFilter = ref<Filter>('all')

const filteredTodos = computed(() => {
  if (activeFilter.value === 'active') {
    return todos.value.filter((todo) => !todo.done)
  }

  if (activeFilter.value === 'done') {
    return todos.value.filter((todo) => todo.done)
  }

  return todos.value
})`
  },
  {
    key: 'list',
    target: 'list',
    eyebrow: 'Hydrierte Interaktion',
    title: 'Serverfreundlich, clientaktiv',
    copy: 'Die Aufgaben sind direkt nach dem Rendern nutzbar und werden danach zu einer schnellen Client-Erfahrung mit Toggles, Leerzuständen und Persistenz hydratisiert.',
    presentationTitle: 'SSR-freundlicher State, hydrierte Interaktion',
    presentationSummary: 'useState hält den Nuxt-State, TodoList rendert die Daten, und Browser-only Persistenz bleibt über import.meta.client und onMounted vom Server getrennt.',
    whyItMatters: 'Das ist ein Nuxt-typisches Muster: SSR-fähiger State oben, UI-Komponenten darunter, Browser-APIs sauber im Client-Lebenszyklus.',
    takeaways: [
      'useState gibt dem State einen stabilen Nuxt-Key.',
      'TodoList kommuniziert über toggle/remove-Events.',
      'localStorage läuft nur im Browser.'
    ],
    codeFocus: 'Achte darauf, wie useState, Events und Client-Persistenz zusammenspielen.',
    codeTitle: 'app/composables/useTodoShowcase.ts',
    codeLanguage: 'ts',
    code: `const todos = useState('todos', () => initialTodos)

const toggleTodo = (id: number) => {
  const todo = todos.value.find((item) => item.id === id)
  if (todo) todo.done = !todo.done
}

if (import.meta.client) {
  watch(todos, saveToLocalStorage, { deep: true })
}`
  },
  {
    key: 'tools',
    target: 'tools',
    eyebrow: 'Entwicklererfahrung',
    title: 'Gebaut für Nuxt DevTools',
    copy: 'Nuxt DevTools kann Seiten, Komponenten, Imports und Payloads inspizieren, während diese App läuft. So lassen sich Framework-Details live erkunden.',
    presentationTitle: 'Nuxt macht das Framework zur Laufzeit sichtbar',
    presentationSummary: 'Die Demo folgt der Nuxt-Struktur: Konfiguration in nuxt.config.ts, Daten in app/data, State in app/composables und UI in app/components.',
    whyItMatters: 'Diese Struktur macht die App in DevTools und im Code-Editor leichter nachvollziehbar: Komponenten, Auto-Imports und State-Module sind klar getrennt.',
    takeaways: [
      'nuxt.config.ts aktiviert DevTools und globale CSS.',
      'app/components nutzt Nuxt Auto-Imports.',
      'app/composables bündelt wiederverwendbare Logik.'
    ],
    codeFocus: 'Verbinde Nuxt-Konfiguration, Auto-Imports und typisierte Tour-Metadaten.',
    codeTitle: 'nuxt.config.ts + app/data/showcaseContent.ts',
    codeLanguage: 'ts',
    code: `export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true }
})

// Nuxt findet diese Ordner automatisch:
// app/pages       -> Routen
// app/components  -> Komponenten
// server/api      -> API-Endpunkte`
  }
]
