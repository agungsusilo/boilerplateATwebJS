const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const edge = require('selenium-webdriver/edge');
const config = require('../../config/config');

function buildChromeOptions() {
  const options = new chrome.Options();
  if (config.headless) {
    options.addArguments('--headless=new');
  }
  options.addArguments('--window-size=1920,1080', '--disable-notifications', '--disable-gpu');
  return options;
}

function buildFirefoxOptions() {
  const options = new firefox.Options();
  if (config.headless) {
    options.addArguments('-headless');
  }
  options.windowSize({ width: 1920, height: 1080 });
  return options;
}

function buildEdgeOptions() {
  const options = new edge.Options();
  if (config.headless) {
    options.addArguments('--headless=new');
  }
  options.addArguments('--window-size=1920,1080');
  return options;
}

/**
 * Membuat instance WebDriver sesuai browser yang dikonfigurasi.
 * Driver binary (chromedriver/geckodriver/msedgedriver) di-resolve otomatis
 * oleh Selenium Manager bawaan selenium-webdriver v4.6+, tidak perlu install manual.
 */
async function createDriver(browserName = config.browser) {
  const builder = new Builder();

  switch (browserName.toLowerCase()) {
    case 'firefox':
      builder.forBrowser('firefox').setFirefoxOptions(buildFirefoxOptions());
      break;
    case 'edge':
      builder.forBrowser('MicrosoftEdge').setEdgeOptions(buildEdgeOptions());
      break;
    case 'chrome':
    default:
      builder.forBrowser('chrome').setChromeOptions(buildChromeOptions());
      break;
  }

  const driver = await builder.build();
  await driver.manage().setTimeouts({ implicit: config.implicitWaitMs });
  return driver;
}

module.exports = { createDriver };
