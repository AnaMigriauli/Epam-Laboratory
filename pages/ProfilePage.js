import { test } from "@playwright/test";
const chai = require("chai");
const assert = chai.assert;

import { ProfilePage } from "../pages/ProfilePage";

const testdata = `test${Math.floor(Math.random() * 1000)}`;

test("Edit user profile", async ({ page }) => {
  const profilePage = new ProfilePage(page);

  await profilePage.openProfile();
  await profilePage.editUsername(testdata);

  const updatedUsername = await profilePage.getUsername();
  assert.equal(
    updatedUsername,
    testdata,
    "Username should be updated correctly"
  );
});
