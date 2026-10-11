# Architektura

## Przegląd

DevKit to uproszczona biblioteka klas narzędziowych CSS w stylu Tailwinda. Źródła są w czystym CSS, a wszystkie wartości
pochodzą z tokenów (zmiennych CSS), które konsument nadpisuje u siebie. Build dokleja warianty responsywne i minifikuje.
Wynik (`dist/`) jest commitowany, a pakiet instaluje się bezpośrednio z GitHuba.

## Moduły

| Katalog / plik                  | Odpowiedzialność                                                   |
| ------------------------------- | ------------------------------------------------------------------ |
| `src/tokens.css`                | Tokeny w `:where(:root, [data-theme])` (specyficzność 0)           |
| `src/themes.css`                | Motywy default/warm/ocean × jasny/ciemny przez `data-theme`        |
| `src/utilities/*.css`           | Płaskie reguły klas, wartości tylko przez `var()`                  |
| `src/index.css`                 | Kolejność importów = kolejność kaskady                             |
| `scripts/build.mjs`             | Bundle (lightningcss), warianty `sm/md/lg/xl`, minifikacja         |
| `dist/`                         | `devkit.css`, `devkit.min.css`, generowane i commitowane           |
| `test/`                         | Testy spójności źródeł i aktualności `dist/`                       |
| `examples/`                     | Strona dokumentacji (HTML + `app.js`), publikowana na GitHub Pages |
| `.github/workflows/pages.yml`   | CI (`npm run check`) i deploy podglądu na Pages                    |
| `.github/workflows/publish.yml` | Publikacja w GitHub Packages po tagu `vX.Y.Z`                      |
| `scripts/serve.mjs`             | Serwer podglądu (`npm run preview`)                                |
| `scripts/hooks/`                | Hook Claude Code formatujący edytowane pliki                       |

## Przepływ danych

`src/index.css` (tokeny + utilities) → `scripts/build.mjs` → `dist/devkit(.min).css` → commit/tag → GitHub Packages →
`npm install @muraii-pl/devkit` → konsument importuje CSS i nadpisuje tokeny w swoim `:root`.

## Integracje zewnętrzne

- GitHub Packages (`npm.pkg.github.com`) jako rejestr pakietu, publikacja z tagów `vX.Y.Z`. Alternatywnie instalacja bezpośrednio z repo (docs/decisions/001-czysty-css-pakiet-github.md).
- lightningcss: tylko w devDependencies, używany w buildzie.
- GitHub Pages: <https://muraii-pl.github.io/DevKit/>, budowane z `examples/index.html` i `dist/` przez workflow.

## Miejsca wrażliwe

- `dist/` jest generowany: zmieniaj `src/` i uruchamiaj build. Test pilnuje, czy `dist/` jest aktualny.
- Nazwy klas i tokenów to publiczne API.
- Breakpointy są w `scripts/build.mjs` (nie mogą być tokenami).
