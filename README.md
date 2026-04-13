# FAIL Bootcamp — Jmenovky

Generátor jmenovek pro FAIL Bootcamp akce. Vytváří PDF připravené pro tisk na samolepky 80×50mm.

## Rychlý návod

### 1. Uprav jména v `index.html`

Najdi sekci s badge elementy a uprav jména:

```html
<div class="badge">
  <div class="badge-gold-stripe"></div>
  <div class="badge-inner">
    <div class="badge-top">
      <span class="badge-brand">Future AI Leader</span>
      <span class="badge-hashtag">#FutureAILeader</span>
    </div>
    <div class="badge-name-block">
      <div class="badge-firstname">Jméno</div>
      <div class="badge-lastname">Příjmení</div>
    </div>
    <div class="badge-footer">
      <span class="gold">FAIL Bootcamp</span>
      <span>Praha 15. 4. 2026</span>
    </div>
  </div>
</div>
```

### 2. Změň datum v patičce

Najdi a nahraď `Praha 15. 4. 2026` novým datem.

### 3. Pushni na GitHub

```bash
git add -A && git commit -m "Update badges" && git push
```

Počkej 1-2 minuty než se GitHub Pages aktualizují.

### 4. Vygeneruj PDF pro tisk

```bash
npm install           # pouze poprvé
node generate-screenshots.js
python3 create-pdf-from-screenshots.py
```

PDF soubory se uloží do `~/Downloads/`:
- `FAIL-jmenovky-79ks-FINAL.pdf` — jmenovky se jmény
- `FAIL-jmenovka-prazdna-FINAL.pdf` — prázdná jmenovka

## Struktura projektu

```
index.html                    # Hlavní stránka (uprav zde jména)
generate-screenshots.js       # Generuje screenshoty z webu
create-pdf-from-screenshots.py # Vytvoří PDF ze screenshotů
package.json                  # Node.js závislosti
```

## Požadavky

- Node.js
- Python 3 s PyMuPDF (`pip3 install pymupdf`)

## Poznámky pro tisk

- PDF obsahuje pouze obrázky (žádné fonty)
- Rozměr stránky: 80×50mm
- Rozlišení: ~384 DPI
