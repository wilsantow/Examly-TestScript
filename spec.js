let emailPage = require("./pages/emailPage");
let passwordPage = require("./pages/pwdPage");

let { urls, inputs } = require("./constants");
const localStorage = require("./localStorage");

var EC = protractor.ExpectedConditions;
describe("Entering Email Input", function () {
  beforeEach(() => {
    emailPage.doInitialWork();
  });

  afterEach(() => {
    browser.sleep(2000);
  });
  it("should fail for unregistered user", async function () {
    emailPage.enterEmail(inputs.unregisteredMail);
    emailPage.logIn();
    const errorMessage = await emailPage.checkUnknownUser();
    expect(errorMessage).toContain("Your Account not found");
  });

  it("should do client side validation for wrong format", async function () {
    await emailPage.enterEmail(inputs.inValidMail);
    await emailPage.logIn();
    const errorMessage = await emailPage.checkErrorMessage();
    expect(errorMessage).toEqual("Enter valid email");
  });

  it("should do client side validation for empty input", async function () {
    emailPage.enterEmail("");
    await emailPage.logIn();
    const errorMessage = await emailPage.checkErrorMessage();
    expect(errorMessage).toEqual("Email required");
  });

  it("should  move to next Page for correct input", async function () {
    emailPage.enterEmail(inputs.validMail);
    emailPage.logIn();
    const route = await emailPage.CheckRouteChange();
    expect(route).toEqual(urls.passwordPage);
  });
});

describe("Entering password input", function () {
  beforeEach(async () => {
    emailPage.doInitialWork();
    emailPage.enterEmail(inputs.validMail);
    await emailPage.logIn();
    passwordPage.doInitialWork();
  });

  afterEach(() => {
    browser.sleep(2000);
  });

  afterAll(async () => {
    passwordPage.logOut();
  });
  it("should display error message for empty input", async function () {
    passwordPage.enterPassword("");
    passwordPage.login();
    const errorMessage = passwordPage.checkErrorMessage();
    expect(errorMessage).toEqual("Password required");
  });

  it("should display error message for wrong input", async function () {
    passwordPage.enterPassword(inputs.inValidPassword);
    passwordPage.login();
    const errorMessage = passwordPage.checkErrorMessage();
    expect(errorMessage).toEqual("Incorrect Password");
  });

  it("should move to dashboard for correct password", async function () {
    const userNameInPwd = await passwordPage.getUserName();
    passwordPage.enterPassword(inputs.validPassword);
    passwordPage.login();
    route = await passwordPage.checkRouteChange();
    const userNameinDashboard = await passwordPage.getUserNameinDashBoard();
    expect([route, userNameInPwd]).toEqual([
      urls.dashboardPage,
      userNameinDashboard,
    ]);
  });
});

describe("In a complete login flow ", function () {
  beforeEach(async () => {
    emailPage.doInitialWork();
    emailPage.enterEmail(inputs.validMail);
    await emailPage.logIn();
    passwordPage.doInitialWork();
  });

  it("user should able to go back to email page from  password page", async function () {
    const route = passwordPage.goBack();
    expect(route).toEqual(urls.emailPage);
  });

  it("user should be redirected to email page from password page on page refresh ", async function () {
    browser.refresh(6000, "took too long to refresh");
    const route = await browser.getCurrentUrl();
    expect(route).toEqual(urls.emailPage);
  });
});

describe("In terms of accessibility, ", function () {
  beforeAll(async () => {
    emailPage.doInitialWork();
  });

  afterEach(async () => {
    browser.sleep(1000);
  });

  it("user should be able to use TAB and ENTER  for input in email page", async function () {
    emailPage.pressTab();
    emailPage.enterEmail(inputs.validMail);
    emailPage.pressEnter();
    const route = await emailPage.CheckRouteChange();
    expect(route).toEqual(urls.passwordPage);
  });

  it("user should be able to use TAB and ENTER  for input in password page", async function () {
    passwordPage.pressTab();
    passwordPage.enterPassword(inputs.validPassword);
    passwordPage.pressEnter();
    const route = await passwordPage.checkRouteChange();
    expect(route).toEqual(urls.dashboardPage);
  });
});

describe("In terms of security", function () {
  it("clearing cookies should log the user out", async function () {
    await browser.driver.manage().deleteAllCookies();
    await browser.refresh(6000);
    browser.sleep(3000);
    const route = await browser.getCurrentUrl();
    expect(route).toEqual(urls.emailPage);
  });

  it("if login state is maintained in local storage,clearing it should log the user out", async function () {
    await localStorage.clear();
    browser.refresh(5000);
    browser.wait(EC.urlContains("login"), 5000);
    const route = await browser.getCurrentUrl();
    expect(route).toEqual(urls.emailPage);
  });
});

describe("when Login state is maintained in localStorage,", function () {
  beforeEach(async () => {
    emailPage.doInitialWork();
    browser.sleep(500);
    emailPage.enterEmail(inputs.validMail);
    browser.sleep(500);
    await emailPage.logIn();
    passwordPage.doInitialWork();
    browser.sleep(500);
    passwordPage.enterPassword(inputs.validPassword);
    browser.sleep(500);
    await passwordPage.login();
    await passwordPage.checkRouteChange();
  });
  it("the token should deny authorization", async function () {
    browser.sleep(3000);
    const token = await localStorage.getValue("token");
    console.log(token);
    await localStorage.clear();
    browser.refresh(5000);
    browser.sleep(3000);
    const parsedData = await JSON.stringify(token);
    await localStorage.setValue("token", parsedData);
    browser.sleep(3000);
    browser.refresh(5000);
    const route = await browser.getCurrentUrl();
    browser.sleep(5000);
    expect(route).not.toEqual(urls.dashboardPage);
  });
});
