import { test } from "@playwright/test";
const chai = require("chai");
const assert = chai.assert;

import { LoginPage } from "../pages/LoginPage";
import { MyTasksPage } from "../pages/MyTasksPage";
import { ProfilePage } from "../pages/ProfilePage";

const testdata = `test${Math.floor(Math.random() * 1000)}`;

test.describe("User Actions", () => {
  let loginPage, profilePage, myTasksPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    profilePage = new ProfilePage(page);
    myTasksPage = new MyTasksPage(page);

    await loginPage.login("anamigriauli1994@gmail.com", "!1$23Ana");
    assert.isTrue(
      await loginPage.isLoginSuccessful(),
      "User should be logged in successfully"
    );
  });

  test("Edit user profile", async () => {
    await profilePage.openProfile();
    await profilePage.editUsername(testdata);

    const updatedUsername = await profilePage.getUsername();
    assert.equal(
      updatedUsername,
      testdata,
      "Username should be updated correctly"
    );
  });

  test("Add sublist", async () => {
    await myTasksPage.addSublist(testdata);
    const isSublistVisible = await myTasksPage.isVisible(`text=${testdata}`);
    assert.isTrue(isSublistVisible, "Sublist should be visible");
  });

  test("Add document", async () => {
    await myTasksPage.addDocument(testdata);
    const isDocumentVisible = await myTasksPage.isVisible(`text=${testdata}`);
    assert.isTrue(isDocumentVisible, "Document should be visible");
  });

  test("Add smart folder", async () => {
    await myTasksPage.addSmartFolder(testdata);
    const isFolderVisible = await myTasksPage.isVisible(`text=${testdata}`);
    assert.isTrue(isFolderVisible, "Smart folder should be visible");
  });
});
