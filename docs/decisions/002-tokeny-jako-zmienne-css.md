# 002. Konfiguracja przez zmienne CSS bez prefiksu, w `:where(:root)`

- Status: przyjęta
- Data: 2026-10-11

## Kontekst

DevKit ma być konfigurowalny per projekt (kolory, odstępy, typografia), ale bez kroku budowania u konsumenta.

## Decyzja

- Każda wartość używana przez klasy jest tokenem w `src/tokens.css`, a klasy odwołują się do nich przez `var()`.
- Tokeny nie mają prefiksu (`--color-primary`, `--spacing`), tak jak w Tailwind v4.
- Tokeny definiujemy w `:where(:root)`. Specyficzność 0 sprawia, że konsument nadpisuje je zwykłym `:root`
  niezależnie od kolejności plików.
- Odstępy wynikają z jednego tokenu: `p-N` = `calc(var(--spacing) * N)`.
- Oprócz palety są role (`primary`, `secondary`, `success`, `warning`, `danger`), które projekt przestawia na swoją markę.

## Konsekwencje

- Konfiguracja działa w runtime: motywy, tryb ciemny i nadpisanie na fragmencie strony.
- Tokeny bez prefiksu mogą kolidować ze zmiennymi projektu o tej samej nazwie (opisane w docs/configuration.md).
- Breakpointy nie mogą być tokenami (zmienne nie działają w media queries).
- Nowych klas nie da się dodać samą konfiguracją.

## Rozważane alternatywy

- Prefiks `--dk-*`: bez kolizji, ale dłuższe nazwy. Odrzucone na prośbę właściciela.
- Konfiguracja w JS i generowanie CSS: pozwala dodawać klasy, ale wymaga builda u konsumenta.
