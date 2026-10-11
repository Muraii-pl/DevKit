#!/usr/bin/env bash
# Formatuje plik edytowany przez agenta. Czyta JSON zdarzenia ze stdin.
# Źródła CSS (src/) poprawia stylelint --fix, pozostałe pliki prettier.
set -euo pipefail
file=$(jq -r '.tool_input.file_path // .file_path // empty')
[ -z "$file" ] && exit 0
case "$file" in
  */src/*.css) npx --no-install stylelint --fix "$file" >/dev/null 2>&1 || true ;;
  *) npx --no-install prettier --write --ignore-unknown "$file" >/dev/null 2>&1 || true ;;
esac
