# Architektura

## Przegląd

DevKit to uproszczona biblioteka klas narzędziowych CSS w stylu Tailwinda. Źródła są w czystym CSS, a wszystkie wartości
pochodzą z tokenów (zmiennych CSS), które konsument nadpisuje u siebie. Build dokleja warianty responsywne i minifikuje.
Wynik (`dist/`) jest commitowany, a pakiet instaluje się bezpośrednio z GitHuba.

## Moduły

| Katalog / plik        | Odpowiedzialność                                           |
| --------------------- | ---------------------------------------------------------- |
| `src/tokens.css`      | Tokeny w `:where(:root)` (specyficzność 0)                 |
| `src/utilities/*.css` | Płaskie reguły klas, wartości tylko przez `var()`          |
| `src/index.css`       | Kolejność importów = kolejność kaskady                     |
| `scripts/build.mjs`   | Bundle (lightningcss), warianty `sm/md/lg/xl`, minifikacja |
| `dist/`               | `devkit.css`, `devkit.min.css`, generowane i commitowane   |
| `test/`               | Testy spójności źródeł i aktualności `dist/`               |
| `examples/`           | Strona do podglądu w przeglądarce                          |
| `scripts/hooks/`      | Hook Claude Code formatujący edytowane pliki               |

## Przepływ danych

`src/index.css` (tokeny + utilities) → `scripts/build.mjs` → `dist/devkit(.min).css` → commit/tag →
`npm install github:Muraii-pl/DevKit` → konsument importuje CSS i nadpisuje tokeny w swoim `:root`.

## Integracje zewnętrzne

- GitHub jako źródło pakietu, wersje przez tagi (docs/decisions/001-czysty-css-pakiet-github.md).
- lightningcss: tylko w devDependencies, używany w buildzie.

## Miejsca wrażliwe

- `dist/` jest generowany: zmieniaj `src/` i uruchamiaj build. Test pilnuje, czy `dist/` jest aktualny.
- Nazwy klas i tokenów to publiczne API.
- Breakpointy są w `scripts/build.mjs` (nie mogą być tokenami).
