## Examly Login Test Script

## Instructions to run tests

### Dependencies

Make sure the following are installed

- node.js
- protractor - `npm install -g protractor`(installs both protractor and webdriver-manager)
- webdriver-manager

Then,

1. `git clone https://github.com/wilsantow/Examly-TestScript.git`

1. `cd Examly-TestScript/conf`

1. run `protractor conf.js`

---

## Additionally to view test results in browser

### Dependencies

Make sure the following are installed

- jasmine-allure-reporter - `npm i jasmine-allure-reporter`
- allure-commandline - `npm i allure-commandline` **(requires java8 or higher)**

Then ,

1. run `allure serve ../test-results`

---

### Troubleshooting

- For Timeout errors modify the duration accordingly to the network speed.
