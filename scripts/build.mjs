// Buduje dist/devkit.css i dist/devkit.min.css z src/index.css.
// Dokleja warianty responsywne (sm:, md:, lg:, xl:) każdej klasy z src/utilities.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { bundle, transform } from 'lightningcss';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const entry = join(root, 'src/index.css');

// Mobile-first, min-width. Zmienne CSS nie działają w media queries, więc to nie są tokeny.
export const breakpoints = { sm: '40rem', md: '48rem', lg: '64rem', xl: '80rem' };

// Pliki z klasami w kolejności importów z index.css (poza tokenami).
export function utilityFiles() {
  return [...readFileSync(entry, 'utf8').matchAll(/@import url\("\.\/(utilities\/[^"]+)"\)/g)].map((m) =>
    join(root, 'src', m[1]),
  );
}

// Pliki utilities muszą być płaskie: tylko reguły `.klasa { ... }`, bez at-rules i zagnieżdżeń.
export function parseRules(css) {
  const clean = css.replace(/\/\*[\s\S]*?\*\//g, '');
  return [...clean.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map((m) => ({
    selector: m[1].trim(),
    body: m[2].trim(),
  }));
}

const prefixSelector = (selector, bp) =>
  selector
    .split(',')
    .map((s) => s.trim().replace(/^\./, `.${bp}\\:`))
    .join(', ');

export function buildCss() {
  const base = bundle({ filename: entry, minify: false }).code.toString();
  const rules = utilityFiles().flatMap((f) => parseRules(readFileSync(f, 'utf8')));
  const responsive = Object.entries(breakpoints)
    .map(([bp, width]) => {
      const inner = rules.map((r) => `  ${prefixSelector(r.selector, bp)} { ${r.body} }`).join('\n');
      return `@media (min-width: ${width}) {\n${inner}\n}`;
    })
    .join('\n\n');
  const css = `/* DevKit – plik generowany przez scripts/build.mjs, nie edytuj ręcznie. */\n${base}\n${responsive}\n`;
  const min = transform({ filename: 'devkit.css', code: Buffer.from(css), minify: true }).code.toString();
  return { css, min };
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const { css, min } = buildCss();
  mkdirSync(join(root, 'dist'), { recursive: true });
  writeFileSync(join(root, 'dist/devkit.css'), css);
  writeFileSync(join(root, 'dist/devkit.min.css'), min);
  console.log(
    `dist/devkit.css ${(css.length / 1024).toFixed(1)} KiB, dist/devkit.min.css ${(min.length / 1024).toFixed(1)} KiB`,
  );
}
