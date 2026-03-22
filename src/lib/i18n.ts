import en from "../locales/en.json";
import es from "../locales/es.json";

const locales = { en, es } as const;

/**
 * Supported locale codes.
 */
export type Locale = keyof typeof locales;

/**
 * Generic shape for nested translation dictionaries.
 */
type LocaleStrings = Record<string, unknown>;

/**
 * Currently active locale.
 */
let currentLocale: Locale = "en";

const STORAGE_KEY = "transitpulse_locale";

function isValidLocale(l: string): l is Locale {
  return Object.prototype.hasOwnProperty.call(locales, l);
}

// Initialize locale from persisted storage or browser preference (client-only).
if (typeof window !== "undefined") {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && isValidLocale(saved)) {
      currentLocale = saved;
    } else {
      const nav = (navigator.language || "").split("-")[0];
      if (isValidLocale(nav)) currentLocale = nav;
    }
  } catch (e) {
    // ignore storage errors
  }
}

/**
 * Subscribers notified whenever the locale changes.
 */
const subscribers = new Set<(locale: Locale) => void>();

/**
 * Subscribes to locale changes.
 *
 * @param fn - Callback invoked with the new locale
 * @returns Cleanup function that unsubscribes the callback
 */
export function subscribe(fn: (locale: Locale) => void): () => void {
  subscribers.add(fn);
  return () => subscribers.delete(fn);
}

/**
 * Sets the active locale and notifies subscribers.
 *
 * @param locale - Locale to activate
 */
export function setLocale(locale: Locale): void {
  if (currentLocale === locale) return;

  currentLocale = locale;

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch (e) {
      // ignore
    }
  }

  for (const subscriber of subscribers) {
    subscriber(currentLocale);
  }
}

/**
 * Returns the currently active locale.
 *
 * @returns Active locale code
 */
export function getLocale(): Locale {
  return currentLocale;
}

/**
 * Returns the translation dictionary for a locale.
 *
 * @param locale - Locale to read, defaults to the current locale
 * @returns Translation dictionary
 */
export function getLocaleStrings(locale: Locale = currentLocale): LocaleStrings {
  return locales[locale];
}

/**
 * Resolves a translation by dot-notated key.
 *
 * Example:
 * t("nav.home") -> "Home"
 *
 * Returns the key itself when the translation cannot be found.
 *
 * @param key - Dot-notated translation key
 * @param locale - Locale to use, defaults to the current locale
 * @returns Translated string or the original key
 */
export function t(key: string, locale: Locale = currentLocale): string {
  const parts = key.split(".");
  let cur: unknown = getLocaleStrings(locale);

  for (const part of parts) {
    if (
      cur !== null &&
      typeof cur === "object" &&
      part in (cur as Record<string, unknown>)
    ) {
      cur = (cur as Record<string, unknown>)[part];
    } else {
      return key;
    }
  }

  return typeof cur === "string" ? cur : key;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getLocaleStrings,
  getLocale,
  setLocale,
  t,
  subscribe,
};