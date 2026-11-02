export type HomeEvent = {
  id: string
  detailKey?: string
} & (
  | { titleKey: string; titlePartKeys?: never }
  | { titlePartKeys: readonly [string, string]; titleKey?: never }
)

export const featuredHomeEvents: readonly HomeEvent[] = [
  {
    id: 'cursor-meetup',
    titlePartKeys: ['home.meetup.titleLine1', 'home.meetup.titleLine2'],
    detailKey: 'home.meetup.subtitle',
  },
  {
    id: 'cafe-cursor',
    titleKey: 'home.cafeCursor.titleLine1',
  },
  {
    id: 'cursor-solana-hackathon',
    titleKey: 'home.events.solanaHackathon',
  },
  {
    id: 'online-meetups',
    titleKey: 'home.events.onlineMeetups',
  },
]

export const moreHomeEvents: readonly HomeEvent[] = [
  {
    id: 'cafe-cursor-florianopolis',
    titlePartKeys: ['home.cafeCursor.titleLine1', 'home.cafeCursor.titleLine2'],
    detailKey: 'home.cafeCursor.subtitle',
  },
]

export function homeEventTitle(event: HomeEvent, translate: (key: string) => string): string {
  if (event.titlePartKeys) {
    const [first, second] = event.titlePartKeys
    return `${translate(first)} ${translate(second)}`
  }
  return translate(event.titleKey)
}
