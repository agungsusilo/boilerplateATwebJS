const fs = require('fs');
const path = require('path');

async function takeScreenshot(driver, name) {
  const dir = path.join(__dirname, '..', '..', 'screenshots');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const image = await driver.takeScreenshot();
  const safeName = name.replace(/[^a-z0-9_-]/gi, '_');
  const filePath = path.join(dir, `${safeName}-${Date.now()}.png`);
  fs.writeFileSync(filePath, image, 'base64');
  return filePath;
}

module.exports = { takeScreenshot };
