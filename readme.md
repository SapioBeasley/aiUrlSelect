## Company Name to URL Selector

Write a web application that given a company name, it will display the domain associated to that company. The web application needs to be API driven. The web application needs to select the most accurate company domain.

#### Requirements:
- [x] Use Express to write the API.
- [x] Use “application/json” as the Content-type in the API response.
- [x] Use the Google Custom Search API to guess the company domain. You can use the following values to query Google Custom Search.

*Custom Experience ID (cx) :* 009637816073108880163:nfsysoqnztc
*API Key (key) :* AIzaSyBXGkVilmqEN0KSDAaQy1BlVVIA8r4nS6w

- [x] Your API should be able to accept up to 25 company names, and its response should be iterable. i.e:

`GET /url?companies[]=nike&companies[]=adidas`

```
Content-type: application/json

{
  data: [{“name”: “nike”, “domain”: “nike.com”}, {“name”: “adidas”: “domain”: “adidas.com”}],
  length: 2
}
```

- [x] Protect your express route using user access tokens stored in Postgres
- [x] Write unit tests for your API and/or UI with code coverage reports
- [x] Add an “events” Postgres table storing metrics about API request durations
- [x] Build a clean/simple UI for your API using React. Style the UI at your discretion. Users should be able to input company names and the UI should query your API and show the results in a user-friendly format (i.e: do not display JSON to end users)

#### Bonus:
- [x] Think outside of the box - feel free to add some “flare” and your own “expertise” that may go above and beyond the requirements above. We are looking for experts to join the business that can develop solutions based on requirements as well as identify factors to incorporate that we may not have included in the requirements.
- [x] Create a UI admin screen using D3 to graph average request duration

#### Notes:
- [x] Please submit your code via FTP (Dropbox, etc..) or zip file to jake@seamlesscontacts.com within 7 business days or beginning this test
- [x] Make sure you include notes on how to run your code.
- [x] Use the smallest amount of dependencies in your code.
- [x] Feel free to use Babel, Webpack and ES6/ES7 features. If you are going to use stage-0 or stage-1 features, justify why.

# API Installation

**<small>*Since this is a test and not publicly hosted, env file is already included</small>**

Install libraries
`$ cd url-selector-api && npm install`

Run API
`$ node server.js`

# Client Installation

Install libraries
`$ cd url-selector-client && npm install`

Run Client
`$ npm start`

Navigate to `http://localhost:3000`. Generate an access token in top right of header. Token will be saved as cookie and admin page will be accessible. Enter company names.

Admin page can be accessed by clicking the "bubbleChart" icon next to the generate token button.

#### Testing

Runs all tests within test directory
`$ npm test`