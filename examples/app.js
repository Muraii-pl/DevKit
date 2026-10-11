// Strona dokumentacji DevKit: generuje bloki kodu z przykładów, paletę, skalę odstępów,
// tabelę tokenów i listę klas z załadowanego devkit.css.

const root = document.documentElement;
const el = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};

// --- Kopiowanie --------------------------------------------------------------

function copy(text, button) {
  const done = () => {
    if (!button) return;
    const label = button.textContent;
    button.textContent = 'Skopiowano';
    setTimeout(() => (button.textContent = label), 1200);
  };
  const fallback = () => {
    const area = el('textarea');
    area.value = text;
    document.body.append(area);
    area.select();
    document.execCommand('copy');
    area.remove();
    done();
  };
  if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, fallback);
  else fallback();
}

function addCopyButton(pre) {
  const wrap = el('div', 'relative');
  pre.replaceWith(wrap);
  wrap.append(pre);
  const button = el(
    'button',
    'absolute px-2 py-1 text-xs bg-gray-700 text-white rounded border-0 cursor-pointer',
    'Kopiuj',
  );
  button.type = 'button';
  button.style.top = '0.5rem';
  button.style.right = '0.5rem';
  button.addEventListener('click', () => copy(pre.textContent, button));
  wrap.append(button);
}

// --- Przykłady: demo + kod z tego samego HTML --------------------------------

function dedent(html) {
  const lines = html.replace(/^\s*\n|\n\s*$/g, '').split('\n');
  const indent = Math.min(...lines.filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length));
  return lines.map((l) => l.slice(indent)).join('\n');
}

// Kod przykładów domyślnie rozwinięty od md (48rem), na telefonie zwinięty.
const wide = matchMedia('(min-width: 48rem)').matches;

function renderExamples() {
  for (const example of document.querySelectorAll('.example')) {
    const code = dedent(example.innerHTML);
    const demo = el('div', 'p-4');
    demo.append(...example.childNodes);

    const pre = el('pre', 'bg-gray-900 text-gray-100 p-3 text-sm overflow-x-auto');
    pre.classList.toggle('hidden', !wide);
    pre.append(el('code', '', code));

    const button = 'px-2 py-1 text-xs bg-white border rounded cursor-pointer shrink-0';
    const toggle = el('button', button, wide ? 'Ukryj kod' : 'Kod');
    toggle.type = 'button';
    toggle.addEventListener('click', () => {
      const hidden = pre.classList.toggle('hidden');
      toggle.textContent = hidden ? 'Kod' : 'Ukryj kod';
    });
    const copyButton = el('button', button, 'Kopiuj');
    copyButton.type = 'button';
    copyButton.addEventListener('click', () => copy(code, copyButton));

    const header = el('div', 'flex items-center gap-2 px-4 py-2 border-b bg-gray-100');
    header.append(el('h3', 'flex-1 font-semibold', example.dataset.title), toggle, copyButton);

    example.className = 'example bg-white rounded-lg shadow-sm mb-4 overflow-hidden';
    example.append(header, demo, pre);
  }
  document.querySelectorAll('pre[data-copy]').forEach(addCopyButton);
}

// --- Dane z arkusza devkit.css -----------------------------------------------

function readSheet() {
  try {
    const rules = [...document.getElementById('devkit').sheet.cssRules];
    const tokenRule = rules.find((r) => r.selectorText.startsWith(':where(:root'));
    const tokens = tokenRule ? [...tokenRule.style].filter((p) => p.startsWith('--')) : [];
    const classes = rules
      .filter((r) => r instanceof CSSStyleRule && r.selectorText.startsWith('.'))
      .map((r) => ({ name: r.selectorText.slice(1).replace(/\\/g, ''), css: r.style.cssText }));
    return { tokens, classes };
  } catch {
    // Chrome blokuje cssRules dla plików otwartych z dysku (file://).
    document.getElementById('file-warning').classList.remove('hidden');
    return { tokens: [], classes: [] };
  }
}

const tokenValue = (name) => getComputedStyle(root).getPropertyValue(name).trim();

function renderPalette(tokens) {
  const palette = {};
  for (const t of tokens) {
    const m = t.match(/^--color-([a-z]+)-(\d+)$/);
    if (m) (palette[m[1]] ??= []).push(m[2]);
  }
  const box = document.getElementById('palette');
  for (const [color, steps] of Object.entries(palette)) {
    const row = el('div', 'flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2');
    const label = el('div', 'text-sm font-medium shrink-0', color);
    label.style.minWidth = '4rem';
    row.append(label);
    const swatches = el('div', 'grid flex-1 gap-1');
    swatches.style.gridTemplateColumns = `repeat(${steps.length}, minmax(0, 1fr))`;
    for (const step of steps) {
      const swatch = el('div', `swatch flex items-end p-1 rounded text-xs bg-${color}-${step}`, step);
      swatch.classList.add(Number(step) >= 500 ? 'text-white' : 'text-black');
      swatch.title = `bg-${color}-${step} · --color-${color}-${step}`;
      swatches.append(swatch);
    }
    row.append(swatches);
    box.append(row);
  }
}

function renderSpacing(classes) {
  const steps = classes.map((c) => c.name.match(/^p-(\d+)$/)?.[1]).filter(Boolean);
  const box = document.getElementById('spacing-scale');
  for (const n of steps) {
    const row = el('div', 'flex items-center gap-2 text-sm');
    const label = el('code', 'shrink-0', `p-${n}`);
    label.style.width = '3rem';
    const bar = el('div', 'bg-primary rounded-sm');
    bar.style.width = `calc(var(--spacing) * ${n})`;
    bar.style.height = '1rem';
    row.append(label, bar, el('span', 'text-gray-600', `${n} × --spacing`));
    box.append(row);
  }
}

function renderTokens(tokens) {
  const body = document.getElementById('tokens-body');
  body.replaceChildren();
  for (const name of tokens) {
    const row = el('tr', 'border-t');
    const preview = el('td', 'p-2');
    if (name.startsWith('--color-') || name.startsWith('--radius-') || name.startsWith('--shadow-')) {
      const sample = el('div', 'border');
      sample.style.width = '2.5rem';
      sample.style.height = '1.5rem';
      if (name.startsWith('--color-')) sample.style.background = `var(${name})`;
      if (name.startsWith('--radius-')) sample.style.borderRadius = `var(${name})`;
      if (name.startsWith('--shadow-')) sample.style.boxShadow = `var(${name})`;
      preview.append(sample);
    }
    row.append(el('td', 'p-2 font-mono', name), el('td', 'p-2 font-mono text-gray-700', tokenValue(name)), preview);
    body.append(row);
  }
}

function renderClasses(classes) {
  const body = document.getElementById('classes-body');
  const count = document.getElementById('class-count');
  const search = document.getElementById('class-search');
  const rows = classes.map((c) => {
    const row = el('tr', 'border-t');
    const name = el('td', 'p-2 font-mono text-primary cursor-pointer', c.name);
    name.title = 'Kliknij, aby skopiować';
    name.addEventListener('click', () => copy(c.name, name));
    row.append(name, el('td', 'p-2 font-mono text-gray-700', c.css));
    body.append(row);
    return { row, text: `${c.name} ${c.css}`.toLowerCase() };
  });
  const filter = () => {
    const q = search.value.trim().toLowerCase();
    let visible = 0;
    for (const { row, text } of rows) {
      const show = !q || text.includes(q);
      row.classList.toggle('hidden', !show);
      if (show) visible++;
    }
    count.textContent = `${visible} z ${rows.length} klas`;
  };
  search.addEventListener('input', filter);
  filter();
}

// --- Motywy -----------------------------------------------------------------

const themes = ['light', 'dark', 'warm', 'warm dark', 'ocean', 'ocean dark'];

function renderThemePreviews() {
  const template = document.getElementById('theme-card');
  const box = document.getElementById('theme-previews');
  for (const theme of themes) {
    const card = template.content.firstElementChild.cloneNode(true);
    card.dataset.theme = theme;
    card.querySelector('[data-label]').textContent = `data-theme="${theme}"`;
    box.append(card);
  }
}

function setupThemeSwitcher(tokens) {
  const select = document.getElementById('theme-select');
  const dark = document.getElementById('theme-dark');
  const apply = () => {
    const value = [select.value, dark.checked && 'dark'].filter(Boolean).join(' ');
    if (value) root.dataset.theme = value;
    else delete root.dataset.theme;
    try {
      localStorage.setItem('devkit-theme', value);
    } catch {}
    renderTokens(tokens);
  };
  let saved = null;
  try {
    saved = localStorage.getItem('devkit-theme');
  } catch {}
  const initial = (saved ?? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : '')).split(' ');
  select.value = initial.find((t) => t === 'warm' || t === 'ocean') ?? '';
  dark.checked = initial.includes('dark');
  select.addEventListener('change', apply);
  dark.addEventListener('change', apply);
  apply();
}

// --- Start -------------------------------------------------------------------

function init() {
  const { tokens, classes } = readSheet();
  renderExamples();
  renderPalette(tokens);
  renderSpacing(classes);
  renderClasses(classes);
  renderThemePreviews();
  setupThemeSwitcher(tokens);
}

const link = document.getElementById('devkit');
if (link.sheet) init();
else link.addEventListener('load', init);
