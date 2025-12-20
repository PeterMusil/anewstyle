import { copyFile } from "node:fs/promises";
import { resolve } from "node:path";

const distDir = resolve(process.cwd(), "dist");
const source = resolve(distDir, "sitemap-index.xml");
const target = resolve(distDir, "sitemap.xml");

await copyFile(source, target);

