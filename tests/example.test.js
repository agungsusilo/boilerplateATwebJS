const { expect } = require('chai');
const { createDriver } = require('../src/drivers/driverFactory');
const WebFormPage = require('../src/pages/WebFormPage');
const { takeScreenshot } = require('../src/utils/screenshot');

describe('Selenium Web Form', function () {
  let driver;
  let webFormPage;

  before(async function () {
    driver = await createDriver();
    webFormPage = new WebFormPage(driver);
  });

  after(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  afterEach(async function () {
    if (this.currentTest.state === 'failed' && driver) {
      await takeScreenshot(driver, this.currentTest.title);
    }
  });

  it('should load the web form page with the correct title', async function () {
    await webFormPage.open();
    const title = await webFormPage.getTitle();
    expect(title).to.equal('Web form');
  });

  it('should submit the text input and show a confirmation message', async function () {
    await webFormPage.open();
    await webFormPage.fillTextInput('Selenium boilerplate');
    await webFormPage.submit();
    const result = await webFormPage.getResultText();
    expect(result).to.equal('Received!');
  });
});
