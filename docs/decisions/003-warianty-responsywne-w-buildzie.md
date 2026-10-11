# 003. Warianty responsywne generowane w buildzie, `dist/` w repo

- Status: przyjęta
- Data: 2026-10-11

## Kontekst

Klasy mają mieć warianty `sm:`, `md:`, `lg:`, `xl:`. Ręczne przepisywanie każdej klasy 4 razy w czystym CSS
oznaczałoby kilka tysięcy powielonych linii i łatwo byłoby o rozjazd.

## Decyzja

- Źródła (`src/`) zostają w czystym CSS, a klasy piszemy raz.
- `scripts/build.mjs` (lightningcss) łączy importy, kopiuje każdą regułę z `src/utilities/` do `@media (min-width)`
  z prefiksem breakpointu i tworzy wersję zminifikowaną.
- `dist/` jest commitowany, bo instalacja z GitHuba nie uruchamia builda. Test sprawdza, czy jest aktualny.

## Konsekwencje

- Pliki w `src/utilities/` muszą być płaskie (bez at-rules), co sprawdza test.
- Każda zmiana w `src/` wymaga `npm run build` przed commitem.
- Rozmiar: ok. 110 KiB po minifikacji (ok. 13 KiB gzip).

## Rozważane alternatywy

- Ręczne warianty: brak builda, ale duplikacja i błędy.
- Skrypt `prepare` budujący przy instalacji z gita: `dist/` poza repo, ale instalacja wolniejsza i zależna od menedżera pakietów.
