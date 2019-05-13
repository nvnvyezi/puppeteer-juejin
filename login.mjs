import {
  loginMode,
  userName,
  password,
  gitName,
  gitPw,
  blogName,
  blogPw
} from "./config";
export default async (page, browser) => {
  await page.click(".login", { delay: 100 });
  switch (loginMode) {
    case 0:
      await normalLogin(page);
      break;
    case 1:
      await blogLogin(page, browser);
      break;
    case 2:
      await wechatLogin(page, browser);
      break;
    case 3:
      await gitLogin(page, browser);
      break;
    default:
      break;
  }
};

// 账号密码登录
const normalLogin = async page => {
  await page.waitForSelector(".auth-form");
  await page.type('input[name="loginPhoneOrEmail"]', userName, { delay: 1 });
  await page.type('input[name="loginPassword"]', password, { delay: 5 });
  await page.click(".auth-form .btn", { delay: 50 });
  await page.waitFor(3000);
};

// 微博登录
const blogLogin = async (page, browser) => {
  await page.click("img[title=微博]", { delay: 50 });
  await page.waitFor(3000);
  const page2 = (await browser.pages())[2];
  await page2.setViewport({ width: 800, height: 769 });
  await page2.waitForSelector(".oauth_content");
  await page2.type("input[name=userId]", blogName, { delay: 1 });
  await page2.type("input[name=passwd]", blogPw, { delay: 1 });
  await page2.click(".WB_btn_login", { delay: 50 });

  // await page.waitFor(5000);
};

//微信登录
const wechatLogin = async (page, browser) => {
  await page.click("img[title=微信]", { delay: 50 });
  await page.waitFor(3000);
  const page2 = (await browser.pages())[2];
  await page2.setViewport({ width: 800, height: 769 });
  await page2.waitForSelector(".qrcode");
  await page2.waitForSelector(".status_icon icon38_msg succ");
};

// git登录
const gitLogin = async (page, browser) => {
  await page.click("img[title=GitHub]", { delay: 50 });
  await page.waitFor(3000);
  const page2 = (await browser.pages())[2];
  await page2.setViewport({ width: 800, height: 769 });
  await page2.waitForSelector(".auth-form-body");
  await page2.type("input[name=login]", gitName, { delay: 1 });
  await page2.type("input[name=password]", gitPw, { delay: 1 });
  await page2.click("input[name=commit]", { delay: 50 });

  // await page.waitFor(5000);
};
