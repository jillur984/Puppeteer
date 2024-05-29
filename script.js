const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const searchTerm = 'your_search_term'; 

    await page.goto('https://www.google.com/'); 
    await page.waitForSelector('input[type="text"]');
    await page.type('input[type="text"]', searchTerm); 
    await page.waitForSelector('input[type="submit"]');
    await page.click('input[type="submit"]'); 
    await page.waitForSelector('.result a');

    const results = await page.evaluate(() => {
      const elements = document.querySelectorAll('.result a'); 
      return Array.from(elements).map(element => element.textContent);
    });

    console.log(`Search results for "${searchTerm}":`);
    results.forEach(result => console.log(result));

    await browser.close();
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
