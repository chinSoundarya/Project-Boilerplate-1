import { $ } from '@wdio/globals'
import { Element } from '@wdio/sync';
class CheckboxPage {
  get checkboxElement(): Element {
    return $('.your-checkbox-selector'); // Replace with the actual selector for the checkbox
  }

  get resultElement(): Element {
    return $('.result-element-selector'); // Replace with the selector for the element displaying results
  }

  checkCheckbox(): void {
    this.checkboxElement.click();
  }

  getResultText(): string {
    return this.resultElement.getText();
  }
}

export default new CheckboxPage();
