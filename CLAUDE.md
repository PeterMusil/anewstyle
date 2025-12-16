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

### Styling Pipeline (Hybrid)

Two SCSS processing methods are used:

**1. Global styles** - External SCSS pipeline outputs to `public/css/style.css`:
- `src/styles/style.scss` → Sass CLI → PostCSS (autoprefixer, cssnano, postcss-preset-env) → `public/css/style.css`
- Linked from `Layout.astro` via `<link rel="stylesheet" href="./css/style.css">`
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

### Page Structure

- `/` (index.astro) - Landing page with sections: Showcase, Products, Technologies, Features, BeforeAfter, PriceList, Contact
- `/gallery` (gallery.astro) - Dedicated gallery page with Showroom section

Shared layout (`Layout.astro`) includes Nav and Footer on all pages.

### Content

Product data lives in `src/content/products/` as Markdown files. Price data is in `src/data/prices.json`.

### Static Assets

- `public/3d/products/` - GLB 3D models for AR viewer
- `public/images/` - Backgrounds, gallery, product images (WebP format, multiple sizes)
- `public/downloads/` - PDF manuals and DAE 3D model downloads

### Key Dependencies

- `@google/model-viewer` and `three` - 3D/AR product visualization
- `@fancyapps/ui` - Image lightbox gallery
- `locale-essentials` - Internationalization (CS/EN)
