# Selenium WebDriver + JavaScript Boilerplate

Boilerplate automation testing/web scraping menggunakan [selenium-webdriver](https://www.npmjs.com/package/selenium-webdriver) (Node.js), dengan pola **Page Object Model (POM)** dan test runner **Mocha + Chai**.

## Fitur

- Dukungan multi-browser: Chrome, Firefox, Edge (via `.env`)
- Mode headless
- Page Object Model yang mudah dikembangkan
- Auto screenshot saat test gagal (folder `screenshots/`)
- Report HTML test via `mochawesome` (folder `reports/`)
- Driver binary (chromedriver/geckodriver/msedgedriver) di-resolve otomatis oleh Selenium Manager — **tidak perlu install driver manual**

## Prasyarat

- Node.js >= 16
- Browser yang mau dipakai (Chrome/Firefox/Edge) sudah terinstall di komputer

## Instalasi

```bash
npm install
cp .env.example .env
```

Sesuaikan isi `.env` sesuai kebutuhan:

```
BROWSER=chrome          # chrome | firefox | edge
HEADLESS=false          # true untuk jalan tanpa UI browser
BASE_URL=https://www.selenium.dev
IMPLICIT_WAIT_MS=0
EXPLICIT_WAIT_MS=10000
```

## Menjalankan Test

```bash
npm test                # pakai BROWSER dari .env (default chrome)
npm run test:chrome
npm run test:firefox
npm run test:edge
npm run test:headless   # mode headless, browser tetap dari .env
```

Report HTML akan dibuat di `reports/report.html` setelah test selesai.

## Struktur Folder

```
config/
  config.js            # baca environment variable (.env)
src/
  drivers/
    driverFactory.js   # factory pembuat WebDriver per browser
  pages/
    BasePage.js        # method dasar: open, click, type, waitForElement, dll
    WebFormPage.js      # contoh Page Object
  utils/
    screenshot.js       # helper screenshot otomatis
tests/
  example.test.js       # contoh test case
screenshots/             # hasil screenshot saat test gagal
reports/                 # hasil report mochawesome (auto-generated)
```

## Menambah Page Object Baru

1. Buat file baru di `src/pages/`, extend `BasePage`.
2. Definisikan `locators` dan method khusus halaman tersebut.

```js
const { By } = require('selenium-webdriver');
const BasePage = require('./BasePage');

class LoginPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.locators = {
      username: By.id('username'),
      password: By.id('password'),
      submit: By.css('button[type="submit"]'),
    };
  }

  async open() {
    await super.open('/login');
  }

  async login(username, password) {
    await this.type(this.locators.username, username);
    await this.type(this.locators.password, password);
    await this.click(this.locators.submit);
  }
}

module.exports = LoginPage;
```

3. Pakai di file test baru dalam folder `tests/` dengan pola sama seperti `example.test.js` (buat driver di `before`, `driver.quit()` di `after`).

## Catatan

- Contoh test memakai halaman resmi Selenium (`https://www.selenium.dev/selenium/web/web-form.html`) yang memang disediakan untuk latihan automation, jadi aman dan stabil dipakai sebagai referensi.
- Ganti `BASE_URL` di `.env` dan sesuaikan Page Object sesuai target web yang ingin diotomasi.
