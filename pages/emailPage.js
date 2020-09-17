
const { timeouts, urls } = require("../constants");

class emailPage {
  constructor() {
    const emailInput = element(by.id("email"));
    const loginButton = element(by.id("lgnNext0"));
    const errorText = element(by.css(".errorContents"));
    const inputError = element(by.css(".errorInput"));
    const modalBox = element(by.css(".crisp-client"));
    var EC = protractor.ExpectedConditions;

    this.start = () => {
      browser.get(urls.emailPage);
    };

    this.enterEmail = (mailID) => {
      emailInput.sendKeys(mailID);
    };

    this.logIn = async () => {
      await browser.wait(
        EC.elementToBeClickable(loginButton),
        15000,
        timeouts.tti
      );
      loginButton.click();
      browser.sleep(5000);
    };

    this.waitForInitialLoad = () => {
      browser.wait(EC.titleContains("PS College"), 20000, timeouts.fcp);
      browser.wait(EC.presenceOf(emailInput), 5000, timeouts.fcp);
    };

    this.checkUnknownUser = async () => {
      browser.wait(EC.presenceOf(errorText), 15000, timeouts.message);
      const errorMessage = await errorText.getText();
      return errorMessage;
    };

    this.checkErrorMessage = async () => {
      browser.wait(EC.presenceOf(inputError), 9000, timeouts.message);
      const errorMessage = await inputError.getText();
      return errorMessage;
    };

    this.CheckRouteChange = async () => {
      browser.wait(EC.urlContains("pwd"), 10000, timeouts.fcp);

      const route = await browser.getCurrentUrl();
      return route;
    };

    this.closeModalBox = async () => {
      browser.executeScript(
        'arguments[0].style.display = "none"',
        modalBox.getWebElement()
      );
    };

    this.doInitialWork = async () => {
      browser.waitForAngularEnabled(false);
      this.start();
      this.waitForInitialLoad();
      browser.wait(EC.visibilityOf(modalBox), 5000, timeouts.fcp);
      this.closeModalBox();
      browser.wait(EC.invisibilityOf(modalBox), 3000, timeouts.fcp);
    };

    this.pressTab = () => {
      browser.actions().sendKeys(protractor.Key.TAB).perform();
    };

    this.pressEnter = async () => {
      browser.actions().sendKeys(protractor.Key.ENTER).perform();
      const route = this.CheckRouteChange();
      return route;
    };
  }
}

module.exports = new emailPage();
