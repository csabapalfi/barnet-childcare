# Barnet childcare by location

[![Greenkeeper badge](https://badges.greenkeeper.io/csabapalfi/barnet-childcare.svg)](https://greenkeeper.io/)

Finding a nursery in London is tricky.

This is a script to scrape [London Borough of Barnet - Childcare by location search](https://familyservices.barnet.gov.uk/PublicEnquiry/Search.aspx?searchID=4) as it's really slow and returns 5 results per page.

## usage

* install node.js >= 8
* clone repo
* `npm install`
* `node index.js "<postcode>" <miles radius>`
* paste `results.html` into a Google Spreadsheet for your own filtering

## how

Uses headless chromium via [puppeteer](https://github.com/GoogleChrome/puppeteer) from the Google Chrome team.
