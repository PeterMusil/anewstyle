# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ANEW STYLE is a Czech product showcase website for illuminated stone panels (Rockfoil). Built with Astro 5, it features internationalization support (CS/EN) and 3D product visualization.

## Commands

```bash
# Development - runs Astro dev server, stylelint, and SCSS watcher concurrently
bun start

# Production build - runs type checking then builds
bun run build

# Preview production build
bun run preview

# SCSS compilation (manual)
bun run scss:build

# Lint SCSS files
bun run stylelint
```

## Architecture

### Internationalization (i18n)

Uses Astro's built-in i18n with URL-based routing:

**Configuration** (`astro.config.mjs`):
- Default locale: `cs` (Czech) - no URL prefix
- Secondary locale: `en` (English) - uses `/en/` prefix
- Example: `/` (Czech), `/en/` (English), `/gallery` (Czech), `/en/gallery` (English)

**Translation System** (`src/i18n/`):
- `ui.ts` - All translations as TypeScript objects with dotted keys (e.g., `nav.home`, `cookie.accept`)
- `utils.ts` - Helper functions:
  - `getLangFromUrl(url)` - Extract language from URL
  - `useTranslations(lang)` - Returns `t()` function for translations
  - `getLanguageSwitchPath(url, targetLang)` - Get path for language switcher
  - `getAlternateLinks(url)` - Generate hreflang links

**Usage in Components**:
```astro
---
import { useTranslations, type Lang } from "../i18n/utils";
interface Props { lang?: Lang; }
const { lang = 'cs' } = Astro.props;
const t = useTranslations(lang);
---
<h1>{t('nav.home')}</h1>
```

**Page Structure**:
- `/src/pages/index.astro` - Czech homepage
- `/src/pages/gallery.astro` - Czech gallery
- `/src/pages/en/index.astro` - English homepage
- `/src/pages/en/gallery.astro` - English gallery

**hreflang Tags**: Automatically generated in `Layout.astro` for SEO.

**Components Using i18n** (migrated to `t()` function):
- Layout, Nav, NavItem, LangSwitch, Footer, CookieBar, CookieDialog

**Components Still Using `data-localize`** (need migration):
- Header, Showcase, Products, Technologies, Features, BeforeAfter, Showroom, Contact, PriceList, Card, DetailDialog, Palette, PriceItem, PriceListFeatures

To migrate a component: Accept `lang` prop, import `useTranslations`, replace `data-localize="key"` with `{t('key')}`.

### Styling Pipeline (Hybrid)

Two SCSS processing methods are used:

**1. Global styles** - External SCSS pipeline outputs to `public/css/style.css`:
- `src/styles/style.scss` → Sass CLI → PostCSS (autoprefixer, cssnano, postcss-preset-env) → `public/css/style.css`
- Linked from `Layout.astro` via `<link rel="stylesheet" href="/css/style.css">`
- The `bun start` command runs Astro, stylelint, and SCSS watch concurrently

**2. Component-scoped styles** - Astro processes `<style lang="scss">` in components:
- Used in `Technologies.astro` for component-specific styles
- Imports from `src/styles/Base/global` for access to variables and mixins

### SCSS Organization

`src/styles/style.scss` is the main entry point, importing:
- **Base/**: Variables, mixins, typography, global defaults, layout utilities
- **Components/**: Reusable UI elements (buttons, cards, dialogs, icons)
- **Modules/**: Page-specific sections (header, nav, footer, gallery, price-list)

### Stylelint

Uses `stylelint-order` plugin with comprehensive CSS property ordering. Run `bun run stylelint` to auto-fix.

### Content

Product data lives in `src/content/products/` as Markdown files. Price data is in `src/data/prices.json`.

### Static Assets

- `public/3d/products/` - GLB 3D models for AR viewer
- `public/images/` - Backgrounds, gallery, product images (WebP format, multiple sizes)
- `public/downloads/` - PDF manuals and DAE 3D model downloads

### Key Dependencies

- `@google/model-viewer` and `three` - 3D/AR product visualization
- `@fancyapps/ui` - Image lightbox gallery
