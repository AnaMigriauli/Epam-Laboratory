import { test } from "@playwright/test";
const chai = require("chai");
const assert = chai.assert;

import { LoginPage } from "../pages/LoginPage";
import { MyTasksPage } from "../pages/MyTaskPage";
import { ProfilePage } from "../pages/ProfilePage";
import { Helper } from "../core/Utils";

const testdata = Helper.generateTestData();

test.describe("User Actions", () => {
  let loginPage, profilePage, myTasksPage;

  test.beforeEach(async ({ page }) => {
    ({ loginPage, profilePage, myTasksPage } =
      await Helper.initializePagesAndLogin(page));
  });

  test("If user edits profile, username should update correctly", async () => {
    await profilePage.openProfile();
    await profilePage.editUsername(testdata);

    const updatedUsername = await profilePage.getUsername();
    assert.equal(
      updatedUsername,
      testdata,
      "Username should be updated correctly"
    );
  });

  test("If user clicks on 'add sublist' on the task page, it should create a sublist", async () => {
    await myTasksPage.addSublist(testdata);
    const isSublistVisible = await myTasksPage.isVisible(
      ".tab-item.s-item.active"
    );
    assert.isTrue(isSublistVisible, "Sublist should be visible");
  });

  test("If user clicks on 'add document' on the task page, it should create a document", async () => {
    await myTasksPage.addDocument(testdata);
    const isDocumentVisible = await myTasksPage.isVisible(
      `.document-list .document-item:text("${testdata}")`
    );
    assert.isTrue(isDocumentVisible, "Document should be visible");
  });

  test("If user clicks on 'add smart folder', it should create smart folder", async () => {
    await myTasksPage.addSmartFolder(testdata);
    const isFolderVisible = await myTasksPage.isVisible(
      ".cx-project-name.name"
    );
    assert.isTrue(isFolderVisible, "Smart folder should be visible");
  });
});
