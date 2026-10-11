# DevKit

Uproszczona biblioteka klas narzędziowych CSS (css-utils) w stylu Tailwinda: gotowe klasy do szybkiego stylowania bez pisania własnego CSS.

## Stack

- Czysty CSS w `src/`, build w Node 24 + lightningcss (`scripts/build.mjs`) → `dist/` (commitowany)
- Konfiguracja przez tokeny (zmienne CSS bez prefiksu) w `src/tokens.css`, motywy w `src/themes.css` (`data-theme`)
- Dystrybucja: `npm install github:Muraii-pl/DevKit`, pakiet `@muraii-pl/devkit`
- npm, stylelint, prettier, testy na `node --test`

## Komendy

- Instalacja: `npm install`
- Build (`src/` → `dist/`): `npm run build`
- Testy (wszystkie): `npm test`
- Test pojedynczego pliku: `node --test test/<plik>.test.mjs`
- Lint CSS: `npm run lint`
- Format: `npm run format` (sprawdzenie: `npm run format:check`)
- Wszystko naraz: `npm run check`
- Podgląd strony z przykładami: `npm run preview` → http://localhost:4173/examples/

## Workflow

1. Zadanie dłuższe niż ~3 kroki → najpierw plan w `tasks/todo.md`, czekaj na akceptację.
2. Implementuj małymi krokami i odhaczaj postęp w `tasks/todo.md`.
3. Zadanie jest skończone dopiero, gdy `npm run build` i `npm run check` przechodzą. Pokaż wynik.
4. Po każdej korekcie użytkownika dopisz regułę do `tasks/lessons.md`.
5. Na początku sesji przeczytaj `tasks/lessons.md`.

## Zasady

- Nowa klasa / nowa logika generatora = nowy lub zaktualizowany test.
- Nie wyłączaj ani nie usuwaj testów, żeby przeszły.
- Nie zmieniaj nazw istniejących klas ani tokenów (to publiczne API biblioteki) bez pytania.
- Nie edytuj `dist/` ręcznie. Po zmianie w `src/` uruchom `npm run build` (test sprawdza aktualność).
- Wartości w klasach tylko przez `var(--token)` z `src/tokens.css`. Pliki `src/utilities/` są płaskie, bez `@media`.
- Nowy token lub klasa → zaktualizuj docs/configuration.md lub README i dodaj przykład w `examples/index.html` (lista klas i tokenów generuje się sama).
- Nie commituj i nie pushuj bez wyraźnej prośby.
- Prostota przed kompletnością: nie dodawaj wariantów i funkcji „na zapas”.

## Kontekst

- Architektura: docs/architecture.md
- Konwencje (nazewnictwo klas, skale, dodawanie klasy): docs/conventions.md
- Konfiguracja tokenów dla konsumentów: docs/configuration.md
- Decyzje (dlaczego tak): docs/decisions/
- Pułapki z poprzednich sesji: tasks/lessons.md
