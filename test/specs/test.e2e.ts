import { expect } from '@wdio/globals'
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
    try {
      await browser.url('https://www.securian.com/retirement-calculator/');
      // Fill in all the form fields
      await browser.setValue('#currentAge', 40);
      await browser.setValue('#retirementAge', 68);
      await browser.setValue('#currentAnnualIncome', 100000);
      await browser.setValue('#spouseAnnualIncome', 75000);
      await browser.setValue('#currentRetirementSavings', 500000);
      await browser.setValue('#currentRetirementContribution', 10);
      await browser.setValue('#annualRetirementContributionIncrease', 0.25);
      await browser.click('#socialSecurityBenefits');
      await browser.setValue('#socialSecurityOverride', 4000);
      await browser.setValue('#additionalIncome', 500);
      await browser.setValue('#numberRetirementYears', 20);
      await browser.click('#postRetirementIncomeIncreaseWithInflation');
      await browser.setValue('#percentFinalAnnualIncomeDesired', 75);
      await browser.setValue('#preRetirementInvestmentReturn', 8);
      await browser.setValue('#postRetirementInvestmentReturn', 5);
      await browser.click('#calculate',10);

      // Add an assertion based on the success message or expected behavior
      const successMessage = await browser.getText('.success-message');
      expect(successMessage).to.equal('Your retirement plan has been successfully calculated.');
    } catch (error) {
      // Handle any errors or exceptions
      console.error('Test failed:', error);
    } finally {
      await browser.deleteSession(); // Close the browser session
    }
  });
});