const express = require('express');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const app = express();
const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
    const email = req.query.email ? req.query.email : 'example@gmail.com';
    
    (async () => {
      const browser = await puppeteer.launch({ headless: true})
      const page = await browser.newPage()
    
      const navigationPromise = page.waitForNavigation()
    
      await page.goto('https://accounts.google.com/')
    
      await navigationPromise
    
      await page.waitForSelector('input[type="email"]')
      await page.click('input[type="email"]')
    
      await navigationPromise
    
      //TODO : change to your email 
      await page.type('input[type="email"]', email)
    
      await page.waitForSelector('#identifierNext')
      await page.click('#identifierNext')
    
      await page.waitForTimeout(500);
    
      await page.waitForSelector('input[type="password"]')
      await page.click('input[type="email"]')
      await page.waitForTimeout(500);
    
      await navigationPromise
    
      await page.waitForTimeout(5000);
    
      console.log(page.url());    
      
      res.send('Response: ' + page.url());

      await browser.close();
    })()
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})