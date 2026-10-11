# DevKit

Uproszczona biblioteka klas narzędziowych CSS w stylu Tailwinda. Czysty CSS bez kroku
budowania u konsumenta, klasy z wariantami responsywnymi, a wszystkie wartości
konfigurowalne zmiennymi CSS.

## Instalacja

```bash
npm install github:Muraii-pl/DevKit
```

```css
@import '@muraii-pl/devkit';
```

## Użycie

```html
<div class="flex flex-col md:flex-row gap-4 p-6 bg-gray-100 rounded-lg">
  <button class="px-4 py-2 bg-primary text-white font-medium rounded">Zapisz</button>
  <p class="text-sm text-gray-700">Klasy z prefiksem <code>md:</code> działają od 48rem.</p>
</div>
```

Breakpointy (mobile-first): `sm:` 40rem, `md:` 48rem, `lg:` 64rem, `xl:` 80rem.

## Konfiguracja

Nadpisz tokeny we własnym `:root`:

```css
:root {
  --color-primary: #7c3aed;
  --spacing: 0.3rem;
  --font-sans: 'Inter', system-ui, sans-serif;
}
```

Pełna instrukcja (lista tokenów, tryb ciemny, motywy per sekcja, ograniczenia):
[docs/configuration.md](docs/configuration.md).

## Dostępne klasy

| Plik                                           | Zakres                                                         |
| ---------------------------------------------- | -------------------------------------------------------------- |
| [layout.css](src/utilities/layout.css)         | display, szerokość/wysokość, overflow, position                |
| [flex.css](src/utilities/flex.css)             | kierunek, wrap, grow/shrink, items-_, justify-_, self-*        |
| [grid.css](src/utilities/grid.css)             | grid-cols-_, col-span-_                                        |
| [spacing.css](src/utilities/spacing.css)       | p*, m*, gap* – skala 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16        |
| [typography.css](src/utilities/typography.css) | font-_, text-{rozmiar}, leading-_, text-{wyrównanie}, truncate |
| [borders.css](src/utilities/borders.css)       | border*, rounded-*                                             |
| [colors.css](src/utilities/colors.css)         | text-_, bg-_, border-* dla palety i ról                        |
| [effects.css](src/utilities/effects.css)       | shadow-_, opacity-_, cursor-*                                  |

Podgląd: otwórz [examples/index.html](examples/index.html) w przeglądarce.

## Rozwój

```bash
npm install
npm run build    # src/ → dist/ (dist jest commitowany)
npm run check    # lint + format + testy
```

Zasady pracy: [docs/conventions.md](docs/conventions.md).
