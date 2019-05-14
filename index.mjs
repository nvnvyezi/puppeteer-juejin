import puppeteer from "puppeteer";
import chalk from "chalk";

import collection from "./collection";
import login from "./login";

(async () => {
  const browser = await puppeteer.launch({
    // headless: false,
    ignoreHTTPSErrors: true,
    slowMo: 100,
    defaultViewport: {
      width: 1200,
      height: 800
    }
  });
  console.log(chalk.green("服务正常启动"));
  const page = await browser.newPage();
  await page.goto("https://juejin.im");
  console.log(chalk.yellow("页面初次加载完毕"));
  await page.waitFor(1000);
  if (page.$(".login")) {
    console.log(chalk.blue("开始登录"));
    await login(page, browser);
  } else {
    console.log(chalk.blueBright("已经登录过了，直接搜索"));
    await collection(page, browser);
  }
  await page.waitFor(4000);
  await browser.close();
})();
