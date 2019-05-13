// const puppeteer = require("puppeteer");
// const login = require("./login");
import puppeteer from "puppeteer";
import login from "./login";

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    ignoreHTTPSErrors: true,
    slowMo: 250,
    args: ["--disable-dev-shm-usage"]
  });
  const page = await browser.newPage();
  await page.goto("https://juejin.im");
  // await page.screenshot({ path: "example.png" });
  if (page.$(".login")) {
    await login(page, browser);
  }
  // await page.click(".login", { delay: 200 });
  // await page.type(".search-input", "头条面试", {
  //   delay: 100
  // });
  // await page.waitFor(500);
  // await page.click(".search-icon", { delay: 200 });
  await page.waitFor(4000);
  await browser.close();
})();
