const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generateScreenshots() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // High DPI for print quality
  await page.setViewport({ 
    width: 302, 
    height: 189,
    deviceScaleFactor: 4  // 4x = ~384 DPI equivalent
  });

  const screenshotsDir = path.join(__dirname, 'screenshots');
  if (fs.existsSync(screenshotsDir)) {
    fs.rmSync(screenshotsDir, { recursive: true });
  }
  fs.mkdirSync(screenshotsDir);

  // Load the local file so screenshots always reflect the latest unpushed edits.
  console.log('Loading local badge page...');
  const url = `file://${path.join(__dirname, 'index.html')}`;
  await page.goto(url, { waitUntil: 'networkidle0' });
  
  // Wait for fonts to fully load
  await page.evaluateHandle('document.fonts.ready');
  console.log('Fonts loaded, waiting extra time...');
  await new Promise(r => setTimeout(r, 5000)); // 5 seconds for fonts

  // Get named badges (not empty ones)
  const namedBadges = await page.$$('.badge:not(.badge-empty)');
  console.log(`Found ${namedBadges.length} named badges, taking screenshots...`);

  for (let i = 0; i < namedBadges.length; i++) {
    const badge = namedBadges[i];
    const filename = path.join(screenshotsDir, `badge-${String(i + 1).padStart(3, '0')}.png`);
    await badge.screenshot({ path: filename, type: 'png' });
    
    if ((i + 1) % 20 === 0) {
      console.log(`  ${i + 1}/${namedBadges.length}`);
    }
  }
  console.log(`  ${namedBadges.length}/${namedBadges.length}`);

  // Get one empty badge
  console.log('Processing empty badge...');
  const emptyBadges = await page.$$('.badge.badge-empty');
  if (emptyBadges.length > 0) {
    await emptyBadges[0].screenshot({ path: path.join(screenshotsDir, 'badge-empty.png'), type: 'png' });
    console.log('  Empty badge captured');
  }

  await browser.close();
  console.log(`\n✓ Screenshots saved to: ${screenshotsDir}`);
}

generateScreenshots().catch(console.error);
