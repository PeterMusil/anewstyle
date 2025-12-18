import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  allowImportingTsExtensions: true,
  site: "https://anewstyle.cz/",
  base: "/",
  i18n: {
    locales: ["cs", "en"],
    defaultLocale: "cs",
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [sitemap()],
});
