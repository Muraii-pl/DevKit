# 004. Motywy przez `data-theme`, tryb ciemny przez odwrócenie skal

- Status: przyjęta
- Data: 2026-10-11

## Kontekst

Biblioteka ma mieć gotowe motywy (default, warm, ocean), każdy w wersji jasnej i ciemnej. Ma przy tym zostać
czystym CSS bez wariantów klas `dark:`, które podwoiłyby rozmiar `dist/`.

## Decyzja

- Motywy są w `src/themes.css` jako bloki `:where([data-theme~="..."])`, które nadpisują tylko istniejące tokeny.
- Jeden atrybut łączy motyw i tryb: `data-theme="ocean dark"`. Selektor `~=` dopasowuje pojedyncze słowa,
  a kombinacje mają osobne bloki (`[data-theme~="warm"][data-theme~="dark"]`).
- Tokeny bazowe obowiązują dla `:where(:root, [data-theme])`, więc każdy element z motywem zaczyna od czystych tokenów.
  Dzięki temu jasny fragment działa na ciemnej stronie, a `data-theme="light"` resetuje do domyślnego.
- Każdy blok motywu deklaruje role (`--color-primary` itd.) ponownie, żeby `var()` rozwiązał się na elemencie z motywem.
- Tryb ciemny odwraca skale palety (100 ↔ 900) oraz `white`/`black`, dzięki czemu istniejący markup ciemnieje sam.

## Konsekwencje

- Brak klas `dark:` i mały przyrost rozmiaru (ok. 5 KiB).
- `white`/`black` w trybie ciemnym znaczą „powierzchnię”/„tekst”, a nie dosłowne kolory (opisane w docs/configuration.md).
- Element z `data-theme` musi sam ustawić kolor tekstu, bo `color` dziedziczy się jako gotowa wartość.
- Specyficzność 0 (`:where`) pozwala projektowi nadpisać motyw zwykłym selektorem `[data-theme~="dark"]`.

## Rozważane alternatywy

- Warianty `dark:` generowane w buildzie: precyzyjne, ale podwajają `dist/` i wymagają klas w markupie.
- Osobne pliki motywów: prostsze, ale bez przełączania w runtime i bez motywów na fragmentach.
- Osobny atrybut na tryb (`data-mode`): czytelny, ale dwa atrybuty zamiast jednego.
