// run-sum.js
const { chromium } = require('playwright');

(async () => {
  // generate URLs for seed=51…60
  const seedUrls = Array.from({ length: 10 }, (_, i) =>
    `https://sanand0.github.io/tdsdata/js_table/?seed=${51 + i}`
  );

  const browser = await chromium.launch();
  const page = await browser.newPage();
  let grandTotal = 0;

  for (const url of seedUrls) {
    await page.goto(url);
    const numbers = await page.$$eval(
      '#table td',
      tds => tds.map(td => parseInt(td.textContent, 10) || 0)
    );
    const sum = numbers.reduce((a, b) => a + b, 0);
    console.log(`Sum for ${url.split('=').pop()}: ${sum}`);
    grandTotal += sum;
  }

  console.log('🏁 Grand total of all seeds 51–60:', grandTotal);
  await browser.close();
})();
