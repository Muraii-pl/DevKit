# Lessons learned

Zasady wpisu: jedna reguła = 1–2 zdania, forma "rób / nie rób X, bo Y", data na końcu.
Co jakiś czas przeglądaj: stałe reguły przenoś do docs/conventions.md lub CLAUDE.md;
krytyczne zamieniaj w hook/test/regułę lintera; nieaktualne usuwaj.

## Testy

## Architektura / API klas

## Narzędzia i środowisko

- Nie generuj `package-lock.json` przez lokalny Nexus (192.168.1.23), bo CI go nie widzi i `npm ci` wisi. Repo ma własny `.npmrc` z registry.npmjs.org, nie usuwaj go. (2026-10-11)

## Workflow
