"use client";

import { useEffect, useState } from "react";
import { getLocale, subscribe, t, type Locale } from "./i18n";

/**
 * React hook that returns the current locale and re-renders on locale changes.
 *
 * @returns Current locale
 */
export function useLocale(): Locale {
  const [locale, setStateLocale] = useState<Locale>(getLocale());

  useEffect(() => {
    return subscribe(setStateLocale);
  }, []);

  return locale;
}

/**
 * React hook that returns a translation function bound to the current locale.
 *
 * @returns Translation function
 */
export function useT(): (key: string) => string {
  const locale = useLocale();
  return (key: string) => t(key, locale);
}
