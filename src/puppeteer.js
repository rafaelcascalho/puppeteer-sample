const puppeteer = require('puppeteer');

let browser = null;

async function startBrowser() {
  browser = await puppeteer.launch();
}

startBrowser();

exports.getPageImagesSrcs = async (url) => {
  try {
    const page = await browser.newPage();
    await page.goto('url');
    const content = page.content();
    const srcs = await page.$$eval('img[src]', imgs => imgs.map(img => img.getAttribute('src')));
    await page.close();
    return srcs
  } catch (error) {
    console.log(error)
  }
}
