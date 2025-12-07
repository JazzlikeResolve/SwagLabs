import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Add ONLY methods you actually use
  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
  }
}
