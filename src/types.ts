import { EmitusListener as Listener } from 'emitus'

// Events
export type Event = 'filter' | 'sort'

export interface Options {
  container: HTMLElement | string
  selector: string
  gutter?: number
  resetFilterValue?: string
  hiddenClass?: string
  matchedClass?: string
}

export interface Sortboard {
  // Methods
  filter (pattern: string): void
  sort (): void
  reset (): void

  // Events
  on (eventName: Event, listener: Listener): void
  off (eventName: Event, listener?: Listener): void
}

export interface Elements {
  container: HTMLElement
  blocks: HTMLElement[]
}
