### 功能

- 实现掘金的几种登录方式

### 运行

```javaScript
// 测试运行
nodemon --experimental-modules index.mjs
// 直接运行
node --experimental-modules index.mjs
```

### 踩坑

- page.\$('') 里面可以写选择器
- UnhandledPromiseRejectionWarning: Error: Protocol error (Runtime.callFunctionOn): Target closed.
  - 检查一下是否在异步函数中
- 在打开新页面怎么追踪新的页面

```javaScript
// 一定要延迟几秒，不然在页面没打开的时候获取不到页面
await page.waitFor(3000);
const page2 = (await browser.pages())[2];
```

- 怎么判断 ajax 是否成功了

```javaScript
page.waitForRequest
page.waitForResponse
```

- 生成 pdf 只能在 headless 为 true 的时候使用
