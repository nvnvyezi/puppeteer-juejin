import chalk from "chalk";

import { searchText, collectionName } from "./config";

export default async (page, browser) => {
  console.log(chalk.green("登录成功，开始搜索文章"));
  await page.waitFor(2000);
  await page.type("input[type=search]", searchText, { delay: 100 });
  await page.waitFor(500);
  await page.click(".search-icon", { delay: 200 });
  try {
    await page.waitForRequest(
      req => {
        return (
          req
            .url()
            .indexOf(
              "https://api.growingio.com/v2/89669d96c88aefbc/web/action"
            ) !== -1 && req.method() === "POST"
        );
      },
      { timeout: 5000 }
    );
    await page.waitForResponse(
      res => {
        return (
          res
            .request()
            .url()
            .indexOf(
              "https://api.growingio.com/v2/89669d96c88aefbc/web/action"
            ) !== -1 && res.ok()
        );
      },
      { timeout: 5000 }
    );
  } catch (error) {
    console.log(chalk.red(`搜索失败: ${error}`));
    await browser.close();
    process.exit(0);
  }
  console.log(chalk.yellow("搜索成功"));
  await getStar(page, browser);
};

// 获取点赞数最高的3篇文章
const getStar = async (page, browser) => {
  const list = await page.$$eval(".like .count", articleList => {
    const maxList = [0, 0, 0];
    const indexList = [0, 0, 0];
    for (let i = 0; i < articleList.length; i++) {
      const number = Number(articleList[i].innerText);
      let n = 0;
      while (n < 3) {
        if (number > maxList[n]) {
          maxList[n] = number;
          indexList[n] = i;
          break;
        }
        n++;
      }
    }
    return indexList;
  });

  console.log(list);
  try {
    await page.click(`.main-list > .item:nth-child(2)`, { delay: 200 });
  } catch (error) {
    await page.click(`.entry-list > .item:nth-child(2)`, { delay: 200 });
  }
  await page.waitFor(3000);
  const page2 = (await browser.pages())[2];
  const a = await page2.$eval(".collect-btn", el => el.className);
  if (!/active/.test(a)) {
    await page2.click(".collect-btn", { delay: 100 });
    await page2.waitFor(1000);
    const haveNote = await page2.$$eval(
      ".collection-list > .item .title",
      (list, name) => {
        for (let i = 0; i < list.length; i++) {
          const ele = list[i];
          if (ele.innerText == name) {
            ele.click();
            return true;
          }
        }
        return false;
      },
      collectionName
    );
    if (!haveNote) {
      await page2.click(".new-btn", { delay: 100 });
      await page2.waitFor(1000);
      await page2.type(".title-input", collectionName, { delay: 1 });
      await page2.click(".new-form .submit-btn", { delay: 100 });
    }
    await page2.waitFor(500000);
  } else {
    const title = await page2.title();
    const date = await page2.$eval(".time", el => el.innerText);
    const url = await page2.url();
    await page2.pdf({
      path: `${title}.pdf`,
      displayHeaderFooter: true,
      format: "A4"
    });
  }
  // await page.waitFor(500000);
};
