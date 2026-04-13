const puppeteer = require('puppeteer');
const path = require('path');

async function generatePDF() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport to match badge dimensions
  await page.setViewport({ width: 302, height: 189 });

  // Generate named badges PDF
  const namesHtml = path.join(__dirname, 'print-names.html');
  await page.goto(`file://${namesHtml}`, { waitUntil: 'networkidle0' });
  
  // Wait for fonts to load
  await page.evaluateHandle('document.fonts.ready');
  
  // Extra wait to ensure fonts are rendered
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  await page.pdf({
    path: path.join(process.env.HOME, 'Downloads', 'FAIL-jmenovky-79ks.pdf'),
    width: '302px',
    height: '189px',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    pageRanges: ''
  });
  
  console.log('Generated: FAIL-jmenovky-79ks.pdf (79 pages)');

  // Generate empty badge PDF
  const emptyHtml = path.join(__dirname, 'print-empty.html');
  await page.goto(`file://${emptyHtml}`, { waitUntil: 'networkidle0' });
  
  // Wait for fonts to load
  await page.evaluateHandle('document.fonts.ready');
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  await page.pdf({
    path: path.join(process.env.HOME, 'Downloads', 'FAIL-jmenovka-prazdna.pdf'),
    width: '302px',
    height: '189px',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });
  
  console.log('Generated: FAIL-jmenovka-prazdna.pdf (1 page)');

  await browser.close();
}

generatePDF().catch(console.error);
