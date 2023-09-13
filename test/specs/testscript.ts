import { remote } from 'webdriverio';

async function main() {
  const browser = await remote({
    capabilities: {
      browserName: 'chrome', // You can change this to 'firefox' or other browsers
    },
  });

  await browser.url('https://www.securian.com/insights-tools/retirement-calculator.html');

  // Perform actions and assertions here
  // Example:
  // const title = await browser.getTitle();
  // expect(title).toBe('Expected Page Title');

  await browser.deleteSession();
}

main();