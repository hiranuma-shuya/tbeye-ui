const { chromium } = require('playwright');
const path = require('path');

const pages = [
  { name: 'index', url: 'http://127.0.0.1:8080/index.html' },
  { name: 'call-logs', url: 'http://127.0.0.1:8080/call-logs.html' },
  { name: 'sip-groups', url: 'http://127.0.0.1:8080/sip-groups.html' },
  { name: 'staff', url: 'http://127.0.0.1:8080/staff.html' },
  { name: 'dictionary', url: 'http://127.0.0.1:8080/dictionary.html' },
  { name: 'realtime', url: 'http://127.0.0.1:8080/realtime.html' },
  { name: 'ai-minutes', url: 'http://127.0.0.1:8080/ai-minutes.html' },
  { name: 'group-call', url: 'http://127.0.0.1:8080/group-call.html' },
];

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });

  for (const page of pages) {
    const tab = await context.newPage();
    console.log(`Capturing: ${page.name}`);
    await tab.goto(page.url, { waitUntil: 'networkidle' });
    await tab.waitForTimeout(1000);
    await tab.screenshot({
      path: path.join(__dirname, 'docs', `${page.name}.png`),
      fullPage: true
    });
    await tab.close();
  }

  await browser.close();
  console.log('All screenshots saved to docs/');
})();
