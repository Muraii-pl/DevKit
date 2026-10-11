import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { breakpoints, buildCss, parseRules, utilityFiles } from '../scripts/build.mjs';

const root = join(import.meta.dirname, '..');
const read = (p) => readFileSync(p, 'utf8');
const rules = utilityFiles().flatMap((f) => parseRules(read(f)));
const { css, min } = buildCss();

test('dist jest aktualny (uruchom npm run build)', () => {
  assert.equal(read(join(root, 'dist/devkit.css')), css);
  assert.equal(read(join(root, 'dist/devkit.min.css')), min);
});

test('pliki utilities są płaskie (bez at-rules)', () => {
  for (const f of utilityFiles()) {
    assert.doesNotMatch(read(f).replace(/\/\*[\s\S]*?\*\//g, ''), /@/, f);
  }
});

test('nazwy klas są unikalne', () => {
  const seen = new Set();
  for (const { selector } of rules) {
    assert.ok(!seen.has(selector), `duplikat: ${selector}`);
    seen.add(selector);
  }
});

test('każda użyta zmienna jest zdefiniowana w tokens.css', () => {
  const tokens = read(join(root, 'src/tokens.css'));
  const defined = new Set([...tokens.matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1]));
  const used = [...(tokens + rules.map((r) => r.body).join('\n')).matchAll(/var\((--[\w-]+)/g)].map((m) => m[1]);
  for (const v of used) assert.ok(defined.has(v), `brak tokenu ${v}`);
});

test('każda klasa ma warianty responsywne w dist (także po minifikacji)', () => {
  for (const { selector } of rules) {
    const name = selector.replace(/^\./, '');
    for (const bp of Object.keys(breakpoints)) {
      assert.ok(css.includes(`.${bp}\\:${name} {`), `brak ${bp}:${name}`);
      assert.ok(min.includes(`.${bp}\\:${name}{`), `brak ${bp}:${name} w min`);
    }
  }
});

test('motywy nadpisują tylko istniejące tokeny i używają zdefiniowanych zmiennych', () => {
  const tokens = read(join(root, 'src/tokens.css'));
  const themes = read(join(root, 'src/themes.css'));
  const defined = new Set([...tokens.matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1]));
  for (const [, name] of themes.matchAll(/(--[\w-]+)\s*:/g))
    assert.ok(defined.has(name), `nowy token w motywie: ${name}`);
  for (const [, name] of themes.matchAll(/var\((--[\w-]+)/g)) assert.ok(defined.has(name), `brak tokenu ${name}`);
});

test('każdy motyw jest w dist', () => {
  for (const sel of ['dark', 'warm', 'ocean']) assert.ok(css.includes(`[data-theme~="${sel}"]`), sel);
});
