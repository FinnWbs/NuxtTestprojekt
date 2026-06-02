export type Filter = 'all' | 'active' | 'done'

export type Todo = {
  id: number
  title: string
  done: boolean
  nuxtFeature: string
}

export type TourStep = {
  key: string
  target: string
  eyebrow: string
  title: string
  copy: string
  presentationTitle: string
  presentationSummary: string
  whyItMatters: string
  takeaways: string[]
  codeFocus: string
  codeTitle: string
  codeLanguage: string
  code: string
}

export type ShowcaseRouteLink = {
  label: string
  to: string
  eyebrow: string
  description: string
  external?: boolean
}
