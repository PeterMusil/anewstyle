import cs from './cs.json';
import en from './en.json';

export const languages = {
  cs: 'Česky',
  en: 'English',
} as const;

export const defaultLang = 'cs' as const;

export type Lang = keyof typeof languages;

export const ui = {
  cs,
  en,
} as const;

export type TranslationKey = keyof typeof cs;
