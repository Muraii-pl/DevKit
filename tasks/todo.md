# Bieżące zadanie

## Cel

Strona podglądu (GitHub Pages) jako pełna dokumentacja z przykładami: każda grupa klas pokazana na żywo,
tabela tokenów i pełna lista klas, która aktualizuje się sama przy zmianach w bibliotece.

## Plan

- [x] Układ strony: nagłówek, boczna nawigacja po sekcjach (na mobile u góry), strona ostylowana samym DevKit
      (plus minimalny własny CSS tylko tam, gdzie DevKit czegoś nie ma)
- [x] Sekcja „Start”: instalacja (GitHub Packages i repo), dołączenie CSS, nadpisanie tokenów
- [x] ~~Konfigurator tokenów~~ – usunięty na prośbę właściciela
- [x] Sekcje z przykładami na żywo i kodem obok:
  - [x] Kolory: paleta (próbki 100–900 z nazwą tokenu), role, text/bg/border
  - [x] Odstępy: wizualna skala p/m/gap
  - [x] Typografia: rodziny, rozmiary, grubości, interlinia, wyrównanie, truncate
  - [x] Layout: display, rozmiary, overflow, position
  - [x] Flex: kierunek, wrap, items, justify, grow/shrink
  - [x] Grid: grid-cols, col-span
  - [x] Obramowania: szerokości, kolory, rounded
  - [x] Efekty: cienie, opacity, cursor
  - [x] Responsywność: wskaźnik aktywnego breakpointu, przykład `md:`/`lg:`
- [x] „Wszystkie klasy”: tabela z wyszukiwarką, generowana w JS z załadowanego `devkit.css`
      (klasa → deklaracje), bez ręcznego przepisywania
- [x] Pliki: `examples/index.html` + `examples/app.js`; workflow kopiuje cały `examples/`
- [x] Przycisk „kopiuj” przy blokach kodu

- [x] Motywy: default/warm/ocean × jasny/ciemny (`src/themes.css`, `data-theme`), przełącznik w nawigacji,
      sekcja „Motywy” z 6 podglądami, testy, ADR 004, docs

## Ryzyka

- Przykłady w HTML mogą się rozjechać z biblioteką, ale lista klas generuje się sama, więc rozjazd byłby widoczny.
- Strona nie może wymagać builda (czysty HTML + JS), żeby dalej działała lokalnie przez otwarcie pliku.

## Weryfikacja

- [x] `npm run check` przechodzi
- [x] Strona działa lokalnie (`npm run preview`)
- [ ] Strona działa na Pages po deployu
- [ ] Przegląd wizualny na szerokości telefonu i desktopu (właściciel)

## Notatki / review

- Poprzednie zadanie (szkielet pakietu, Pages, publikacja w GitHub Packages) zakończone, wydane jako v0.1.2.
- Sprawdzone w headless Chromium (1400px i 390px): brak błędów JS, brak poziomego scrolla, 32 przykłady, 478 klas, 82 tokeny.
- DevKit nie ma resetu stylów (preflight), więc strona ma własny minimalny reset. Do rozważenia jako opcjonalny `src/base.css`.
- Otwarte: konwencja commitów, przegląd palety oklch (yellow 500–600 wygląda oliwkowo).
