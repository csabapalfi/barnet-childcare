# Barnet childcare by location

Finding a nursery in London is tricky. Also I wanted to play around with [puppeteer](https://github.com/GoogleChrome/puppeteer) from the Google Chrome team.

This is a script to scrape [London Borough of Barnet - Childcare by location search](https://familyservices.barnet.gov.uk/PublicEnquiry/Search.aspx?searchID=4) as it's really slow and returns 5 results per page.

## usage

* install node.js >= 8
* clone repo
* `npm install`
* `node index.js "<postcode>" <miles radius>`
* paste `results.html` into a Google Spreadsheet for your own filtering
