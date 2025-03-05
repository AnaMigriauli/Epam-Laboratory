import { BasePage } from "../core/BasePage";
const chai = require("chai");
const assert = chai.assert;

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.loginBtn = "li.item.login a";
    this.userNameField = "#s_username";
    this.continueBtn = "button.cont-button.b.green.full-btn";
    this.passwordField = "#s_password";
    this.submitBtn = "button:has-text('Log in')";
    this.errorMessage = ".error-header.hasError";
  }

  async login(userName, password) {
    await this.navigateTo("https://quire.io/");
    await this.click(this.loginBtn);
    await this.type(this.userNameField, userName);
    await this.click(this.continueBtn);
    await this.type(this.passwordField, password);
    await this.click(this.submitBtn);
  }

  async isLoginSuccessful() {
    return this.page.url().includes("view=MyTasks");
  }

  async getErrorMessage() {
    return this.getText(this.errorMessage);
  }
}
