# Konwencje

## Styl kodu

- Źródła w czystym CSS. Reguły w `src/utilities/` piszemy w jednej linii: `.klasa { właściwość: wartość; }`.
- Lint: stylelint (`stylelint-config-standard`, konfiguracja w `.stylelintrc.json`). Źródeł CSS nie formatuje prettier,
  bo rozbiłby reguły jednoliniowe. Prettier formatuje resztę repo (JS, MD, JSON, HTML).

## Nazewnictwo

- Klasy jak w Tailwindzie: `<skrót>-<wartość>`, np. `p-4`, `text-sm`, `bg-red-500`, `justify-between`.
- Warianty responsywne: `<bp>:<klasa>` (`md:flex`). W CSS selektor jest escapowany: `.md\:flex`.
- Tokeny bez prefiksu, w grupach: `--color-*`, `--spacing`, `--font-*`, `--text-*`, `--font-weight-*`,
  `--leading-*`, `--radius-*`, `--shadow-*`, `--border-width`.
- Nazwy klas i tokenów to publiczne API. Zmiana lub usunięcie istniejącej nazwy oznacza nową wersję główną.

## Skale

- Odstępy: 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16 (× `--spacing`).
- Paleta: `gray`, `red`, `yellow`, `green`, `blue` w stopniach 100–900 (oklch).
- Role: `primary`, `secondary`, `success`, `warning`, `danger`. Klasy kolorów dla ról używają ról, nie palety.

## Struktura plików

- `src/tokens.css`: wszystkie tokeny w `:where(:root)`, każda wartość używana przez klasy musi tu być.
- `src/utilities/<obszar>.css`: płaskie reguły, bez at-rules (`@media`, `@layer`) i bez zagnieżdżeń, bo build kopiuje
  je do wariantów responsywnych.
- `src/themes.css`: motywy (`:where([data-theme~="..."])`), które nadpisują tylko tokeny z `tokens.css`. Każdy blok
  deklaruje role ponownie. Nowy motyw = jasny blok + blok `[data-theme~="x"][data-theme~="dark"]` (ADR 004).
- `src/index.css`: importy w ustalonej kolejności. Pliki, które mają wygrywać (np. `colors.css` nad `borders.css`),
  są importowane później.
- `dist/`: generowany przez `npm run build`, commitowany (instalacja z GitHuba nie uruchamia builda). Nie edytuj ręcznie.

## Dodawanie klasy

1. Jeśli wartość jest nowa, dodaj token w `src/tokens.css`.
2. Dodaj regułę do właściwego pliku w `src/utilities/` i użyj w niej `var(--token)`.
3. `npm run build`, potem `npm run check`.
4. Dopisz klasę do opisu w README lub docs/configuration.md, jeśli zmienia zakres albo dochodzi token.

## Testy

- `test/*.test.mjs`, uruchamiane przez `node --test`, bez dodatkowych zależności.
- Sprawdzają: aktualność `dist/`, płaskość utilities, unikalność klas, istnienie każdego użytego tokenu
  i warianty responsywne każdej klasy.
- Wizualnie: `npm run preview`. Przykład w `examples/index.html` to element `.example` z `data-title`;
  `app.js` sam dokleja do niego kod HTML i przycisk kopiowania, więc nie przepisuj kodu ręcznie.

## Commity i branche

- Wersje zgodnie z semver. Wydanie: `npm version patch|minor|major` (zmienia `package.json`, robi commit i tag `vX.Y.Z`),
  potem `git push --follow-tags`. Tag uruchamia `.github/workflows/publish.yml`, który publikuje pakiet w GitHub Packages.
- Workflow przerywa publikację, jeśli tag nie zgadza się z `version` w `package.json`.
- TODO: konwencja wiadomości commitów i nazw branchy.
