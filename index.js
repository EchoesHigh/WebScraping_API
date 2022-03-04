const puppeteer = require("puppeteer");
const fs = require("fs/promises");
const urls = require("./ImgsURLs");

async function start() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const scrapedData = [];
  console.log(urls[0]);
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    await page.goto(`${url}`);
    const data = await page.evaluate(() => {
      return document.querySelector("body > pre").textContent;
    });
    scrapedData.push(data);
  }
  await fs.writeFile(
    "ScrapedData.js",
    "export const ScrapedData = [ " + scrapedData + " ]"
  );
  await browser.close();
}

start();
