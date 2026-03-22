"use client";

import React from "react";
import { useLocale } from "@/lib/i18n-client";
import { setLocale, type Locale } from "@/lib/i18n";

export default function LanguageSwitcher() {
  const locale = useLocale();

  const options: { value: Locale; label: string }[] = [
    { value: "en", label: "English" },
    { value: "es", label: "Español" },
  ];

  return (
    <select
      aria-label="Language"
      value={locale}
      onChange={(e) => setLocale(e.target.value as Locale)}
      className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm px-3 py-2"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
