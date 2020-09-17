const { urls, timeouts } = require("../constants");

class pwdPage {
  constructor() {
    const passwordInput = element(by.id("password"));
    const logInButton = element(by.id("lgnLogin0"));
    const inputError = element(by.css(".errorInput"));
    const userNameInPwdPage = element(by.css(".head"));
    const userNameInDashboardPage = element(by.css(".unamemob"));
    const logOutButton = element(by.css(".loglay"));
    const backArrow = element(by.css(".icon-angle-left"));
    var EC = protractor.ExpectedConditions;

    this.waitForInitialLoad = () => {
      browser.wait(EC.presenceOf(passwordInput), 10000, timeouts.fcp);
    };

    this.enterPassword = async (password) => {
      await passwordInput.sendKeys(password);
    };

    this.login = async () => {
      browser.wait(EC.elementToBeClickable(logInButton), 20000, timeouts.tti);
      await logInButton.click();
    };

    this.checkErrorMessage = async () => {
      await browser.wait(EC.presenceOf(inputError), 10000, timeouts.message);
      const errorMessage = await inputError.getText();
      return errorMessage;
    };

    this.getUserName = async () => {
      const userName = await userNameInPwdPage.getText();
      return userName.slice(4);
    };

    this.checkRouteChange = async () => {
      browser.wait(EC.presenceOf(userNameInDashboardPage), 20000, timeouts.fcp);
      const route = await browser.getCurrentUrl();
      return route;
    };

    this.getUserNameinDashBoard = async () => {
      const userName = await userNameInDashboardPage.getText();
      return userName;
    };

    this.doInitialWork = async () => {
      this.waitForInitialLoad();
    };

    this.goBack = async () => {
      browser.wait(EC.presenceOf(backArrow), 7000, timeouts.fcp);
      backArrow.click();
      browser.wait(EC.urlContains("login"), 5000, timeouts.fcp);
      const route = await browser.getCurrentUrl();
      return route;
    };

    this.pressTab = () => {
      browser.actions().sendKeys(protractor.Key.TAB).perform();
    };

    this.pressEnter = async () => {
      browser.actions().sendKeys(protractor.Key.ENTER).perform();
      const route = this.checkRouteChange();
      return route;
    };

    this.logOut = async () => {
      userNameInDashboardPage.click();
      logOutButton.click();
      browser.wait(EC.urlContains("course", 5000, timeouts.fcp));
    };
  }
}

module.exports = new pwdPage();
