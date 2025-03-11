import { LoginPage } from "../pages/LoginPage";
import { ProfilePage } from "../pages/ProfilePage";
import { MyTasksPage } from "../pages/MyTasksPage";

export class Helper {
  static generateTestData() {
    return `test ${Math.floor(Math.random() * 1000)}`;
  }

  static async typeAndEnter(page, selector, text) {
    await page.waitForSelector(selector);
    await page.locator(selector).fill(text);
    await page.keyboard.press("Enter");
  }

  static async initializePagesAndLogin(page) {
    const loginPage = new LoginPage(page);
    const profilePage = new ProfilePage(page);
    const myTasksPage = new MyTasksPage(page);

    await loginPage.login("anamigriauli1994@gmail.com", "!1$23Ana");
    expect(await loginPage.isLoginSuccessful()).toBeTruthy();

    return { loginPage, profilePage, myTasksPage };
  }
}
