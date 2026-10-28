const { until } = require('selenium-webdriver');
const config = require('../../config/config');

class BasePage {
  constructor(driver) {
    this.driver = driver;
  }

  async open(path = '/') {
    await this.driver.get(`${config.baseUrl}${path}`);
  }

  async waitForElement(locator, timeout = config.explicitWaitMs) {
    return this.driver.wait(until.elementLocated(locator), timeout);
  }

  async click(locator) {
    const element = await this.waitForElement(locator);
    await this.driver.wait(until.elementIsVisible(element), config.explicitWaitMs);
    await element.click();
  }

  async type(locator, text) {
    const element = await this.waitForElement(locator);
    await element.clear();
    await element.sendKeys(text);
  }

  async getText(locator) {
    const element = await this.waitForElement(locator);
    return element.getText();
  }

  async isDisplayed(locator, timeout = 2000) {
    try {
      const element = await this.waitForElement(locator, timeout);
      return await element.isDisplayed();
    } catch {
      return false;
    }
  }

  async getTitle() {
    return this.driver.getTitle();
  }
}

module.exports = BasePage;
