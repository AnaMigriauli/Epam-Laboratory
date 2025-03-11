import { BasePage } from "../core/BasePage";
import { Helper } from "../core/Utils";

const testdata = Helper.generateTestData();

export class ProfilePage extends BasePage {
  constructor(page) {
    super(page);
    this.profileBtn = "'div.img-icon.x30.circle.bg.iconc-30'";
    this.usernameField = "div.ql-editor.t-title-block";
    this.saveBtn = "button.save-btn.b.green";
  }

  async openProfile() {
    await this.click(this.profileBtn);
  }

  async editUsername() {
    await this.type(this.usernameField, testdata);
    await this.click(this.saveBtn);
  }

  async getUsername() {
    return this.getText(this.usernameField);
  }
}
