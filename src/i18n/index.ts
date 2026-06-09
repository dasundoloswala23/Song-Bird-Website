import en, { type MessageKey } from './messages/en'
import hi from './messages/hi'
import fr from './messages/fr'
import ru from './messages/ru'
import ta from './messages/ta'
import si from './messages/si'
import tl from './messages/tl'

export type LocaleCode = 'en' | 'hi' | 'fr' | 'ru' | 'ta' | 'si' | 'tl'

export const DEFAULT_LOCALE: LocaleCode = 'en'

// Display order matches the client brief (English first).
export const LOCALES: { code: LocaleCode; label: string; native: string }[] = [
  { code: 'en', label: 'English',  native: 'English' },
  { code: 'hi', label: 'Hindi',    native: 'हिन्दी' },
  { code: 'fr', label: 'French',   native: 'Français' },
  { code: 'ru', label: 'Russian',  native: 'Русский' },
  { code: 'ta', label: 'Tamil',    native: 'தமிழ்' },
  { code: 'si', label: 'Sinhala',  native: 'සිංහල' },
  { code: 'tl', label: 'Tagalog',  native: 'Tagalog' },
]

export const MESSAGES: Record<LocaleCode, Partial<Record<MessageKey, string>>> = {
  en, hi, fr, ru, ta, si, tl,
}

/** Look up a key in the given locale, falling back to English, then the key itself. */
export function translate(locale: LocaleCode, key: MessageKey): string {
  return MESSAGES[locale]?.[key] ?? en[key] ?? key
}

export type { MessageKey }
