# 001. Czysty CSS dystrybuowany jako pakiet z GitHuba

- Status: przyjęta, uzupełniona przez 003 (build dla wariantów responsywnych)
- Data: 2026-10-11

## Kontekst

DevKit ma być uproszczoną biblioteką klas narzędziowych w stylu Tailwinda. Ma być prosty w utrzymaniu i łatwy do dołączenia w innych projektach.

## Decyzja

- Źródła piszemy w czystym CSS, bez SCSS, PostCSS i generatora klas.
- Bibliotekę dystrybuujemy jako pakiet w repozytorium na GitHubie.

## Konsekwencje

- Nie ma kroku generowania: to, co w repo, jest tym, co trafia do konsumenta (ewentualnie po minifikacji).
- Każdą klasę i wartość ze skali piszemy ręcznie, więc spójność nazw pilnujemy konwencjami (docs/conventions.md) i review.
- Wersje udostępniamy przez tagi lub releases na GitHubie.

## Rozważane alternatywy

- SCSS lub generator klas z konfiguracji: mniej powtórzeń, ale dodatkowe narzędzia i krok budowania.
- Publikacja w rejestrze npm: TODO, jeśli kiedyś będzie potrzebna.
