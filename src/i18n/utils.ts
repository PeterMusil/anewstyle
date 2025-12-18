import {
  ui,
  defaultLang,
  languages,
  type Lang,
  type TranslationKey,
} from "./i18n";

/**
 * Get the language from URL pathname
 */
export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split("/");
  if (lang in languages) {
    return lang as Lang;
  }
  return defaultLang;
}

/**
 * Get translations for a specific language
 */
export function useTranslations(lang: Lang) {
  return function t(key: TranslationKey): string {
    return ui[lang][key] || ui[defaultLang][key] || key;
  };
}

/**
 * Get localized path for a given path and language
 */
export function getLocalizedPath(path: string, lang: Lang): string {
  // Remove leading slash for processing
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  // Remove any existing language prefix
  const pathWithoutLang = cleanPath.replace(/^(cs|en)\//, "");

  // For default language (cs), don't add prefix
  if (lang === defaultLang) {
    return `/${pathWithoutLang}`;
  }

  // For other languages, add prefix
  return `/${lang}/${pathWithoutLang}`;
}

/**
 * Get the path for switching to a different language
 */
export function getLanguageSwitchPath(
  currentUrl: URL,
  targetLang: Lang
): string {
  const pathname = currentUrl.pathname;

  // Remove current language prefix if exists
  const pathWithoutLang = pathname.replace(/^\/(cs|en)(\/|$)/, "/");

  // Add new language prefix (or none for default)
  if (targetLang === defaultLang) {
    return pathWithoutLang || "/";
  }

  return `/${targetLang}${pathWithoutLang}`;
}

/**
 * Get alternate language links for hreflang tags
 */
export function getAlternateLinks(
  currentUrl: URL
): { lang: Lang; href: string }[] {
  const baseUrl = currentUrl.origin;
  const pathname = currentUrl.pathname;

  // Remove current language prefix if exists
  const pathWithoutLang = pathname.replace(/^\/(cs|en)(\/|$)/, "/");

  return (Object.keys(languages) as Lang[]).map((lang) => {
    const localizedPath =
      lang === defaultLang ? pathWithoutLang : `/${lang}${pathWithoutLang}`;

    return {
      lang,
      href: `${baseUrl}${localizedPath}`,
    };
  });
}

/**
 * Check if a language is supported
 */
export function isValidLang(lang: string): lang is Lang {
  return lang in languages;
}

/**
 * Get language from localStorage (client-side only)
 */
export function getStoredLang(): Lang | null {
  if (typeof localStorage === "undefined") return null;
  const stored = localStorage.getItem("lang");
  return isValidLang(stored || "") ? (stored as Lang) : null;
}

/**
 * Store language preference (client-side only)
 */
export function setStoredLang(lang: Lang): void {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem("lang", lang);
}

export const getLangShortLabel = (lang: Lang): string => {
  const labels: Record<Lang, string> = {
    cs: "CZ",
    en: "EN",
  };

  return labels[lang];
};

export { defaultLang, languages, type Lang, type TranslationKey };
