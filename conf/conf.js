exports.config = {
  directConnect: true,

  capabilities: {
    browserName: "chrome",
  },

  framework: "jasmine",

  specs: ["../spec.js"],

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000,
  },
  onPrepare: function () {
    var AllureReporter = require("jasmine-allure-reporter");
    jasmine.getEnv().addReporter(
      new AllureReporter({
        resultsDir: "../test-results",
      })
    );
  },
};
