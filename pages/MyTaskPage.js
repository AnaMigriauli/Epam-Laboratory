import { BasePage } from "../core/BasePage";
import { Helper } from "../core/Utils";

export class MyTasksPage extends BasePage {
  constructor(page) {
    super(page);
    this.addTaskBtn = "a.i-btn.x32.icon-plus";
    this.addTaskOption = 'div:has-text("Add task")';
    this.sublistBtn = '//a[contains(text(), "Add sublist")]';
    this.documentBtn = '//a[contains(text(), "Add document")]';
    this.smartFolderBtn = 'div:has-text("Add smart folder")';
    this.saveBtn = "button.b.save-btn.green";
    this.submitBtn = '.b.submit-btn.green-outline[data-hotkey="enter"]';
    this.dropdownBtn = "li.add-btn.dropdown.open a";
  }

  async addTask(taskName) {
    await this.click(this.addTaskBtn);
    await this.click(this.addTaskOption);
    await Helper.typeAndEnter(this.page, selector, taskName);
  }

  async addSublist(sublistName) {
    await this.click(this.dropdownBtn);
    await this.click(this.sublistBtn);
    await this.page.keyboard.type(sublistName);
    await this.click(this.saveBtn);
  }

  async addDocument(documentName) {
    await this.click(this.dropdownBtn);
    await this.click(this.documentBtn);
    await this.page.keyboard.type(documentName);
    await this.click(this.saveBtn);
  }

  async addSmartFolder(folderName) {
    await this.click(this.addTaskBtn);
    await this.click(this.smartFolderBtn);
    await this.page.keyboard.type(folderName);
    await this.click(this.submitBtn);
  }
}
