var LocalStorage = function () {
  this.getValue = function (key) {
    return browser.executeScript(
      "return window.localStorage.getItem('" + key + "');"
    );
  };

  this.setValue = function (key, value) {
    return browser.executeScript(
      "return window.localStorage.setItem('" + key + "'," + value + ");"
    );
  };
  this.clear = function () {
    browser.executeScript("return window.localStorage.clear();");
  };
};

module.exports = new LocalStorage();
