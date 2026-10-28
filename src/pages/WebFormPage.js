const { By } = require('selenium-webdriver');
const BasePage = require('./BasePage');

class WebFormPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.locators = {
      textInput: By.name('my-text'),
      submitButton: By.css('button'),
      result: By.id('message'),
    };
  }

  async open() {
    await super.open('/selenium/web/web-form.html');
  }

  async fillTextInput(value) {
    await this.type(this.locators.textInput, value);
  }

  async submit() {
    await this.click(this.locators.submitButton);
  }

  async getResultText() {
    return this.getText(this.locators.result);
  }
}

module.exports = WebFormPage;
