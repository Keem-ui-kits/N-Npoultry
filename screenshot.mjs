import puppeteer from 'puppeteer';
import { existsSync, mkdirSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const screenshotsDir = join(__dirname, 'temporary screenshots');

if (!existsSync(screenshotsDir)) mkdirSync(screenshotsDir, { recursive: true });

const url = process.argv[2] ?? 'http://localhost:3000';
const label = process.argv[3] ? `-${process.argv[3]}` : '';

const existing = readdirSync(screenshotsDir).filter(f => f.endsWith('.png'));
const n = existing.length + 1;
const filename = `screenshot-${n}${label}.png`;
const filepath = join(screenshotsDir, filename);

const browser = await puppeteer.launch({
  executablePath: 'C:/Users/fredd/.cache/puppeteer/chrome/win64-146.0.7680.153/chrome-win64/chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
await page.screenshot({ path: filepath, fullPage: false });
await browser.close();
console.log(`Screenshot saved: temporary screenshots/${filename}`);
