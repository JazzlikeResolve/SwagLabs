import { test, expect, Page } from '@playwright/test';
import { BasePage } from './base-page';
import { InventoryPage } from './inventory-page';
import { info } from 'console';
import { userInfo } from 'os';

export class CheckoutPageStepTwo extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private get cancelButton() {
    return this.page.getByRole('button', { name: 'cancel' });
  }

  private get finishButton() {
    return this.page.getByRole('button', { name: 'finish' });
  }

  async cancelButtonClick(): Promise<void> {
    await this.cancelButton.click;
  }

  async clickFinishButton(): Promise<void> {
    await this.finishButton.click();
  }
}
