# Ringkasan Command Terminal (Step by Step)

Catatan langkah-langkah menjalankan boilerplate Selenium + JavaScript ini dari nol.

## 1. Masuk ke folder project

```bash
cd /Users/triagungsusilo/AT/boilerplateATwebJS
```

## 2. Install dependencies

```bash
npm install
```

Ini akan menginstall `selenium-webdriver`, `mocha`, `chai`, `dotenv`, `cross-env`, dan `mochawesome`.

## 3. Buat file `.env` dari contoh

```bash
cp .env.example .env
```

Lalu isi/sesuaikan `.env` kalau perlu (browser, headless, base url, dll).

## 4. Jalankan test (default: Chrome, dari `.env`)

```bash
npm test
```

## 5. Jalankan test dengan browser tertentu

```bash
npm run test:chrome
npm run test:firefox
npm run test:edge
```

## 6. Jalankan test dalam mode headless (tanpa UI browser)

```bash
npm run test:headless
```

Bisa juga dikombinasikan manual, contoh jalankan Chrome + headless langsung lewat env var:

```bash
HEADLESS=true npm run test:chrome
```

## 7. Lihat hasil report

Report HTML otomatis dibuat setelah test selesai di:

```
reports/report.html
```

Buka file itu langsung di browser, misalnya:

```bash
open reports/report.html
```

## 8. Lihat screenshot kalau ada test yang gagal

Screenshot otomatis tersimpan di folder:

```
screenshots/
```

## 9. (Opsional) Update dependency

```bash
npm outdated       # cek versi yang bisa diupdate
npm update          # update sesuai semver di package.json
```

## 10. (Opsional) Inisialisasi git

Project ini belum berupa git repository. Kalau mau mulai versioning:

```bash
git init
git add .
git commit -m "Initial commit: Selenium WebDriver JS boilerplate"
```
