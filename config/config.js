require('dotenv').config();

module.exports = {
  browser: process.env.BROWSER || 'chrome',
  headless: (process.env.HEADLESS || 'false').toLowerCase() === 'true',
  baseUrl: process.env.BASE_URL || 'https://www.selenium.dev',
  implicitWaitMs: Number(process.env.IMPLICIT_WAIT_MS || 0),
  explicitWaitMs: Number(process.env.EXPLICIT_WAIT_MS || 10000),
};
