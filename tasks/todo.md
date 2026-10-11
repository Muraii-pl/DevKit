# Bieżące zadanie

## Cel

Szkielet pakietu DevKit: czysty CSS, instalowalny z GitHuba (`npm install github:Muraii-pl/DevKit`),
konfigurowalny tokenami, z lintem, formatowaniem i testami.

## Plan

- [x] Ustalić odpowiedzi na pytania (nazwy jak Tailwind, tokeny bez prefiksu, responsywność, minifikacja)
- [x] `package.json` (`@muraii-pl/devkit`, exports, files, skrypty)
- [x] `src/tokens.css` + `src/index.css` + `src/utilities/*.css` (layout, flex, grid, spacing, typography, borders, colors, effects)
- [x] Build `scripts/build.mjs`: warianty sm/md/lg/xl + `dist/devkit.min.css`
- [x] Testy `test/build.test.mjs`
- [x] stylelint, prettier, `.gitignore`, `.editorconfig`
- [x] Hook PostToolUse + `allow` w `.claude/settings.json`
- [x] CLAUDE.md, docs/conventions.md, docs/architecture.md, ADR 002 i 003
- [x] docs/configuration.md (konfiguracja tokenów per projekt), README, examples/index.html

## Weryfikacja

- [x] `npm run check` (lint + format + testy) przechodzi
- [x] `npm pack --dry-run`: tylko README, package.json, src/, dist/
- [ ] Wizualny przegląd `examples/index.html` w przeglądarce (do zrobienia przez właściciela)

## Notatki / review

- Zrobione: licencja MIT, GitHub Pages z CI, tag `v0.1.0`.
- Otwarte: konwencja commitów.
- Paleta oklch jest autorska i wyliczona ze wzoru, więc warto ją obejrzeć i ewentualnie dostroić wartości w `src/tokens.css`.
