const { expect } = require('chai');
const webdriverio = require('webdriverio');

describe('Retirement Savings Calculator', () => {
  it('should allow users to submit the form with all required fields filled in', async () => {
    const browser = await webdriverio.remote({
      capabilities: {
        browserName: 'chrome', // or 'firefox', etc.
      },
      logLevel: 'error', // Adjust logging level as needed
      path: '/wd/hub',
      port: 4444, // Change to your Selenium/W3C WebDriver server port
      hostname: 'localhost', // Change to your WebDriver server hostname
      waitforTimeout: 10000, // Maximum time to wait for elements (in milliseconds)
    });

  it('should calculate retirement savings with valid input', async () => {
    await browser.url('https://www.securian.com/insights-tools/retirement-calculator.html');

    // Fill out the retirement calculator form with valid input
    await browser.setValue('#current-age', 40);
    await browser.setValue('#retirement-age', 68);
    await browser.setValue('#current-income', 100000);
    await browser.setValue('#currentRetirementSavings', 500000);
    await browser.setValue('#currentRetirementContribution', 10);
    await browser.setValue('#socialSecurityOverride', 4000);
    await browser.setValue('#additionalIncome', 500);
    await browser.setValue('#numberRetirementYears', 20);

    // Toggle Social Security Income
    await browser.click('#social-security-income-yes');
    await browser.click('#postRetirementIncomeIncreaseWithInflation');

    // Calculate retirement savings
    await browser.click('#calculate-button');
    
    // Assert the calculated retirement savings value
    const result = await browser.getText('#result-value');
    assert.equal(result, '$1,234,567.89'); // Adjust with the expected result
  });

  it('should display error message with invalid input', async () => {
    await browser.url('https://www.securian.com/insights-tools/retirement-calculator.html');

    // Fill out the retirement calculator form with invalid input
    await browser.setValue('#current-age', 30); // Invalid current age
    await browser.setValue('#retirement-age', 20); // Invalid retirement age
    await browser.setValue('#current-income', -50000); // Invalid current income
    await browser.setValue('#currentRetirementSavings', 500);
    await browser.setValue('#currentRetirementContribution', 10000);
    await browser.setValue('#socialSecurityOverride', 4);
    await browser.setValue('#additionalIncome', -500);
    await browser.setValue('#numberRetirementYears', -20);
  
    // Toggle Social Security Income
    await browser.click('#social-security-income-yes');
    await browser.click('#postRetirementIncomeIncreaseWithInflation-No');

    // Calculate retirement savings
    await browser.click('#calculate-button');
  
    // Assert the presence of an error message
    const errorMessage = await browser.isExisting('#error-message');
    assert(errorMessage, 'Expected error message to be displayed');
  });

  after(async () => {
    await browser.deleteSession();
  });
});
