import { loginPage } from "../pages/loginPage";
import { transactionPage } from "../pages/transactionsPage";
import { transferArea } from "../pages/transferAreaPage";

class investor {

 login() {
  cy.visit(Cypress.env("investorURL"));
  cy.get(loginPage.emailInput).type(Cypress.env("investorUSERNAME"));
  cy.get(loginPage.passwordInput).type(Cypress.env("investorPASSWORD"));
  cy.get(loginPage.loginBtn).click();
  cy.get(loginPage.pageLabel).should("have.text", "Dashboard");
}

 Logout() {
  cy.get(loginPage.avatarIcon).click();
  cy.get(loginPage.logOutBtn).waitForElement();
  cy.get(loginPage.logOutBtn).click();
}

 checkFilter(textArray, filter) {
  let match = "";
  for (let i = 0; i < textArray.length; i++) {
    if (textArray[i] !== filter) {
      match = "false";
      break;
    }
    match = "true";
  }
  expect(match).to.be.equal("true");
}

 crteateTransaction() {
  let transactionId = "";
  cy.xpath(transactionPage.purchaseNowBtn).first().click();
  cy.get(transactionPage.pageLabel).contains("Projects").should("be.visible");
  cy.xpath(transactionPage.purchaseNowBtn).first().click();
  cy.xpath(transactionPage.proceedNowBtn).click();
  cy.get(transactionPage.heading).contains(" Select Area").should("be.visible");
  cy.get(transactionPage.areaInput).clearAndType("100");
  cy.xpath(transactionPage.purchaseNowBtn).first().click();
  cy.get(transactionPage.heading)
    .contains("Instalment Plan")
    .should("be.visible");
  cy.xpath(transactionPage.purchaseBtn).click();
  cy.get(transactionPage.orderSummary)
    .should("be.visible")
    .and("have.text", "Order Summary");
  cy.get(transactionPage.checkbox).click();
  cy.xpath(transactionPage.purchaseNowBtn).first().click();
  cy.xpath(transactionPage.requestSuccessIcon).should("be.visible");
  cy.xpath(transactionPage.transactionId)
    .invoke("text")
    .then((text) => {
      transactionId = text;
    });
  cy.xpath(transactionPage.seeTransactionBtn).first().click();
  cy.get(transactionPage.heading).should("be.visible");
  cy.xpath(transactionPage.firstTransId)
    .invoke("text")
    .then((text) => {
      expect(text).to.be.equal(transactionId);
    });
}

 generatePhoneNo() {
  let randomNum = "3";
  randomNum += Math.floor(Math.random() * 5);
  for (let i = 0; i < 8; i++) {
    randomNum += Math.floor(Math.random() * 10); // Generate a random digit between 0 and 9
  }

  return randomNum;
}

 generateString(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

 generateCnic() {
  let randomNum = "";

  for (let i = 0; i < 13; i++) {
    randomNum += Math.floor(Math.random() * 10); // Generate a random digit between 0 and 9
  }
  return randomNum;
}

 generateEmail() {
  const randomString = Math.random().toString(36).substring(2, 8);
  const randomEmail = `user_${randomString}@gmail.com`;
  return randomEmail;
}

 generateUsername() {
  const adjectives = [
    "Great",
    "Awesome",
    "Fantastic",
    "Amazing",
    "Brilliant",
    "Creative",
    "Genius",
  ];
  const nouns = [
    "Coder",
    "Developer",
    "Programmer",
    "Hacker",
    "Engineer",
    "Guru",
    "Wizard",
  ];

  const randomAdjectiveIndex = Math.floor(Math.random() * adjectives.length);
  const randomNounIndex = Math.floor(Math.random() * nouns.length);

  const adjective = adjectives[randomAdjectiveIndex];
  const noun = nouns[randomNounIndex];

  const username = `${adjective} ${noun}`;
  return username;
}

 addNewRecepient(walletId) {
  cy.xpath(transferArea.newrecipientBtn).click();
  cy.get(transferArea.popupContainer).should("be.visible");
  cy.get(transferArea.popupContainer).find("input").type(walletId);
  cy.get(transferArea.walletStatus).should("be.visible");
  cy.get(transferArea.walletStatus)
    .find("span")
    .should("have.text", "Verified");
  cy.xpath(transferArea.cancelBtn).should("be.visible");
  cy.xpath(transferArea.saveBtn).should("be.visible");
  cy.get(transferArea.recipientNameInput).type("Waqas");
  cy.xpath(transferArea.saveBtn).should("be.enabled");
  cy.xpath(transferArea.saveBtn).click();
  cy.get(transferArea.successMessage).should("be.visible");
}

verifyPageTitle(title) {
  cy.get(transferArea.heading).contains(title).should("be.visible");
}
}

export const investorPage = new investor();
