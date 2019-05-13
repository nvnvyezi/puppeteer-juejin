### 功能

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
