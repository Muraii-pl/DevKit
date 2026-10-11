# Konfiguracja tokenów w projekcie

Każda klasa DevKit bierze wartości ze zmiennych CSS (tokenów) zdefiniowanych w
[`src/tokens.css`](../src/tokens.css). Żeby dopasować bibliotekę do projektu, nie musisz
niczego budować. Wystarczy nadpisać te zmienne we własnym CSS.

## 1. Instalacja

### Z GitHub Packages (zalecane)

GitHub Packages wymaga logowania nawet przy publicznych pakietach. Jednorazowo:

1. Utwórz token GitHub (classic) z uprawnieniem `read:packages`:
   <https://github.com/settings/tokens>.
2. Dodaj do `.npmrc` w projekcie (ten plik można commitować, bo token jest w zmiennej):

   ```ini
   @muraii-pl:registry=https://npm.pkg.github.com
   //npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
   ```

3. Ustaw zmienną `GITHUB_TOKEN` w środowisku (lokalnie w profilu powłoki, w CI jako sekret).

Potem:

```bash
npm install @muraii-pl/devkit
npm install @muraii-pl/devkit@0.1.0   # konkretna wersja
```

### Bezpośrednio z repozytorium (bez tokenu)

```bash
npm install github:Muraii-pl/DevKit          # gałąź domyślna
npm install github:Muraii-pl/DevKit#v0.1.0   # konkretna wersja (tag)
```

## 2. Dołączenie stylów

Bundler (Vite, webpack, Angular CLI) w pliku stylów projektu:

```css
@import '@muraii-pl/devkit'; /* dist/devkit.css */
/* albo wersja zminifikowana: */
@import '@muraii-pl/devkit/min';
```

Angular, alternatywnie w `angular.json` → `architect.build.options.styles`:

```json
"styles": ["node_modules/@muraii-pl/devkit/dist/devkit.min.css", "src/styles.css"]
```

Zwykły HTML:

```html
<link rel="stylesheet" href="node_modules/@muraii-pl/devkit/dist/devkit.min.css" />
```

## 3. Plik konfiguracyjny projektu

Utwórz w projekcie jeden plik, np. `src/styles/devkit.config.css`, i dołącz go razem z DevKit.
Wpisz w nim tylko te tokeny, które zmieniasz:

```css
:root {
  /* marka */
  --color-primary: #7c3aed;
  --color-secondary: #0f766e;

  /* gęstość interfejsu: p-4 = 4 × 0.3rem */
  --spacing: 0.3rem;

  /* typografia */
  --font-sans: 'Inter', system-ui, sans-serif;
  --text-base: 0.9375rem;

  /* zaokrąglenia */
  --radius-md: 0.25rem;
}
```

Kolejność dołączenia plików nie ma znaczenia. DevKit definiuje tokeny w `:where(:root)`, który
ma specyficzność 0, więc Twój `:root` zawsze wygrywa.

## 4. Lista tokenów

| Grupa                | Tokeny                                                                                         | Używane przez klasy                                  |
| -------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| Kolory stałe         | `--color-white`, `--color-black`                                                               | `text-*`, `bg-*`, `border-*`                         |
| Paleta               | `--color-{gray,red,yellow,green,blue}-{100…900}`                                               | `text-red-500`, `bg-gray-100`, …                     |
| Role                 | `--color-primary`, `--color-secondary`, `--color-success`, `--color-warning`, `--color-danger` | `text-primary`, `bg-danger`, …                       |
| Domyślne obramowanie | `--color-border`                                                                               | `border`, `border-2`, `border-t`, …                  |
| Odstępy              | `--spacing` (jednostka skali)                                                                  | `p-*`, `m-*`, `gap-*` (wartość = N × `--spacing`)    |
| Fonty                | `--font-sans`, `--font-serif`, `--font-mono`                                                   | `font-sans`, …                                       |
| Rozmiary tekstu      | `--text-{xs,sm,base,lg,xl,2xl,3xl,4xl}`                                                        | `text-xs`, …                                         |
| Grubości             | `--font-weight-{normal,medium,semibold,bold}`                                                  | `font-bold`, …                                       |
| Interlinia           | `--leading-{none,tight,normal,relaxed}`                                                        | `leading-tight`, …                                   |
| Obramowania          | `--border-width`, `--radius-{sm,md,lg,xl,full}`                                                | `border`, `rounded-*` (`rounded` = `--radius-md`)    |
| Cienie               | `--shadow-{sm,md,lg}`                                                                          | `shadow-sm`, `shadow` (= `--shadow-md`), `shadow-lg` |

Domyślne wartości znajdziesz w [`src/tokens.css`](../src/tokens.css).

## 5. Motywy

DevKit ma trzy motywy, każdy w wersji jasnej i ciemnej. Podgląd wszystkich jest na stronie
<https://muraii-pl.github.io/DevKit/#motywy>.

| `data-theme`   | Motyw                                                                            |
| -------------- | -------------------------------------------------------------------------------- |
| brak / `light` | domyślny jasny                                                                   |
| `dark`         | domyślny ciemny                                                                  |
| `warm`         | ciepły: kremowe tło, ciepłe szarości, pomarańczowy primary, większe zaokrąglenia |
| `warm dark`    | ciepły ciemny                                                                    |
| `ocean`        | chłodny: chłodne szarości, morski primary, mniejsze zaokrąglenia                 |
| `ocean dark`   | chłodny ciemny                                                                   |

Motyw włączasz atrybutem na `<html>` (cała strona) albo na dowolnym elemencie (fragment):

```html
<html data-theme="ocean dark">
  ...
  <aside data-theme="light" class="bg-white text-gray-900">jasny panel na ciemnej stronie</aside>
</html>
```

Przełącznik w JS:

```js
document.documentElement.dataset.theme = 'warm dark';
```

Ciemny według ustawień systemu:

```js
if (matchMedia('(prefers-color-scheme: dark)').matches) document.documentElement.dataset.theme = 'dark';
```

Jak to działa:

- **Tryb ciemny odwraca skale** (100 ↔ 900), a `white` i `black` zamieniają się rolami. `--color-white` to w nim ciemna
  „powierzchnia”, a `--color-black` jasny tekst. Dzięki temu istniejący markup (`bg-white text-gray-900`,
  `bg-blue-100 text-blue-900`) sam staje się ciemny i nie potrzebujesz klas `dark:`.
- Konsekwencja: `text-white` na `bg-primary` w trybie ciemnym daje ciemny tekst na jaśniejszym primary. Kontrast
  zostaje zachowany.
- **Element z `data-theme` ustawia własny kolor tekstu i tła** (np. `bg-white text-gray-900`). Kolor tekstu dziedziczy
  się z rodzica jako gotowa wartość, więc bez tej klasy fragment przejąłby kolor tekstu z reszty strony.
- Motywy tylko nadpisują tokeny z `src/tokens.css` i nie dodają nowych.

## 6. Przepisy

### Kolory marki

Zmieniaj przede wszystkim **role** (`--color-primary` itd.), nie paletę. Wtedy `bg-blue-600`
dalej oznacza niebieski, a `bg-primary` oznacza kolor marki.

### Własne kolory w motywie

Motyw to zwykłe nadpisanie tokenów, więc możesz go dostroić selektorem atrybutu.
Ma on wyższą specyficzność niż motywy DevKit, więc zawsze wygrywa:

```css
[data-theme~='dark'] {
  --color-primary: #a78bfa;
}

[data-theme~='warm'][data-theme~='dark'] {
  --color-primary: #fbbf24;
}
```

### Inny motyw dla fragmentu strony

Zmienne CSS się dziedziczą, więc można je nadpisać na dowolnym elemencie:

```css
.admin-panel {
  --color-primary: var(--color-red-600);
  --spacing: 0.2rem;
}
```

Wszystkie `bg-primary`, `p-4` itd. wewnątrz `.admin-panel` użyją tych wartości.

> **Pułapka:** w takim zakresie nadpisuj **role**, nie paletę. `--color-primary` jest
> wyliczane na `:root` jako `var(--color-blue-600)`, a do dzieci dziedziczy się już gotowa
> wartość. Samo `.admin-panel { --color-blue-600: red; }` zmieni więc `bg-blue-600`,
> ale nie zmieni `bg-primary`. Na `:root` ten problem nie występuje.

### Własna klasa oparta na tokenach

Tokeny nie tworzą nowych klas: dopisanie `--color-brand` nie da Ci `bg-brand`. Jeśli
potrzebujesz czegoś spoza zestawu, napisz klasę we własnym CSS i użyj tokenów:

```css
.card {
  padding: calc(var(--spacing) * 6);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}
```

## 7. Ograniczenia

- **Motywy nie mają wariantów klas** (`dark:bg-...`). Zamiast nich tryb ciemny odwraca skale kolorów.
- **Breakpointy nie są konfigurowalne.** Zmienne CSS nie działają w media queries, więc
  `sm` = 40rem, `md` = 48rem, `lg` = 64rem i `xl` = 80rem są wpisane w build
  ([`scripts/build.mjs`](../scripts/build.mjs)). Zmiana wymaga zmiany w bibliotece.
- **Skale są stałe.** Zmieniasz wartości (np. `--spacing`, `--text-lg`), ale nie dodasz w ten
  sposób nowych stopni (np. `p-7` albo `--color-blue-950`).
- **Tokeny nie mają prefiksu.** Jeśli projekt ma już własną zmienną o tej samej nazwie
  (np. `--spacing`), nadpisze ona token DevKit. Przed wdrożeniem przejrzyj nazwy z tabeli wyżej.
