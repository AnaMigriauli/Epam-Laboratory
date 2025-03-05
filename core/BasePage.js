export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigateToPage(url) {
    await this.page.goto(url);
  }

  async clickOnBtn(selector) {
    await this.page.locator(selector).click();
  }

  async type(selector, text) {
    await this.page.locator(selector).fill(text);
  }

  async getText(selector) {
    return await this.page.locator(selector).innerText();
  }

  async isVisible(selector) {
    return await this.page.locator(selector).isVisible();
  }
}
