import { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class CheckoutOverview extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private get cancelButton() {
    return this.page.getByTestId('cancel');
  }

  private get finishButton() {
    return this.page.locator('[data-test="finish"]'); // ✅ Quotes added
  }

  async clickCancelbutton(): Promise<void> {
    await this.page.locator('[data-test="cancel"]');
  }

  async clickfinishButton(): Promise<void> {
    await this.finishButton.click();
  }
}
