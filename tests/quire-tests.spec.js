import { test, expect } from "@playwright/test";

async function login(page) {
  await page.goto("https://quire.io/");

  await page.locator("li.item.login a").click();

  await page.locator("#s_username").type("anamigriauli1994@gmail.com");
  await page.locator("button.cont-button.b.green.full-btn").click();

  await page.locator("#s_password").type("!1$23Ana");
  await page.locator("button:has-text('Log in')").click();

  await expect(page).toHaveURL(/.*view=MyTasks.*/);
}

const testdata = `test${Math.floor(Math.random() * 1000)}`;

test.describe("User Actions", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("Edit user profile", async ({ page }) => {
    await page.locator("a.i-btn.user-icon-wrapper.dropdown-toggle").click();
    await page.locator('a:has-text("My Profile")').click();

    const usernameInput = page.locator("div.ql-editor.t-title-block");
    await usernameInput.click();
    await usernameInput.fill("");
    await page.keyboard.type(testdata);

    await page.locator("button.save-btn.b.green").click();
    await expect(usernameInput).toHaveText(testdata);
  });

  test("Add task", async ({ page }) => {
    await page.click("a.i-btn.x32.icon-plus");
    await page.click('div:has-text("Add task")');
    await page.keyboard.type(testdata);
    await page.keyboard.press("Enter");
  });

  test("add sublist", async ({ page }) => {
    await page.waitForSelector('//li[contains(@class, "add-btn")]');
    await page.locator("li.add-btn.dropdown.open a").click();
    await page.locator('//a[contains(text(), "Add sublist")]').click();
    await page.keyboard.type(testdata);
    await page.locator("button.b.save-btn.green").click();
  });

  test("add document", async ({ page }) => {
    await page.locator("li.add-btn.dropdown.open a").click();
    await page.locator('//a[contains(text(), "Add document")]').click();
    await page.keyboard.type(testdata);
    await page.locator('.b.save-btn.green[data-hotkey="enter"]').click();
  });

  test("add smart folder", async ({ page }) => {
    await page.click("a.i-btn.x32.icon-plus");
    await page.click('div:has-text("Add smart folder")');
    await page.keyboard.type(testdata);
    await page
      .locator('.b.submit-btn.green-outline[data-hotkey="enter"]')
      .click();
  });
});

test("Login with an empty email field", async ({ page }) => {
  await page.goto("https://quire.io/");
  await page.click("li.item.login a");

  await page.fill("#s_username", "");
  await page.click("button.cont-button.b.green.full-btn");

  const errorMessage = page.locator(".error-header.hasError");
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText("Invalid Email.");
});
