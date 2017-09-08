const { appendFile, writeFile } = require('fs');
const { promisify } = require('util');
const puppeteer = require('puppeteer');

const search = async (page, postcode, distance) => {
    const formPrefix = '#ctl00_ContentPlaceHolder1_Wizard1';
    await page.click(`${formPrefix}_ctl01__rpc1tb`);
    await page.type(postcode);
    await page.click(`${formPrefix}_ctl01__rr1tb`);
    await page.type(distance);
    await page.click(`${formPrefix}_StartNavigationTemplateContainerID_StartNextLinkButton`);
}

const scrape = async (page) => {
   return page.evaluate(() => document.querySelector('tbody').innerHTML);
}

async function run(postcode, radius) {
  const browser = await puppeteer.launch({
    // headless: false,
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  await promisify(writeFile)('results.html', '<table>', 'utf-8');

  await page.goto(
    'https://familyservices.barnet.gov.uk/PublicEnquiry/Search.aspx?searchID=4'
  );
  await search(page, postcode, radius);

  await page.waitForNavigation();
  const pages = await page.evaluate(() => {
    const results =
      parseInt($('.pager-text')[0].textContent.replace(/\D/g, ''));
    return Math.ceil(results / 5);
  });

  await promisify(appendFile)('results.html', await scrape(page), 'utf-8');
  console.log(`scraped page 1/${pages}`);

  for (let i = 2; i <= pages; i++) {
    await page.evaluate(
      (i) => __doPostBack(`ctl00$ContentPlaceHolder1$topPager$${i}`,''),
      i
    );
    await page.waitForNavigation();
    await promisify(appendFile)(`results.html`, await scrape(page), 'utf-8');
    console.log(`scraped page ${i}/${pages}`);
  }

  browser.close();
}

const [,,...args] = process.argv;
run(...args);
