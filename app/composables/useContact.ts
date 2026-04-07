export const siteContact = {
  email: 'marcelo.barella27@gmail.com',
  linkedin: 'https://www.linkedin.com/in/marcelo-barella-29ba63234/',
  github: 'https://github.com/Marcelo-Barella',
  twitter: 'https://x.com/bergamota_mb',
} as const

export function useContact() {
  return {
    ...siteContact,
    mailtoHref: `mailto:${siteContact.email}`,
  } as const
}
