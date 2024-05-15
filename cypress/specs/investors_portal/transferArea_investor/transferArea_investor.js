import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import { transferArea } from "../pages/transferAreaPage";
import { investorPage } from "../constant/Investor";

const walletId = "0xfd95cd87cf37ada1c73b9f47622ea3e00c1f2632";
const serverId = "aunfnaki";
// const serverDomain = "aunfnaki.mailosaur.net";
// const emailAddress = 'password-reset@' + serverDomain
Given("login investor portal and click on transfer area tab", () => {
  investorPage.login();
  cy.xpath(transferArea.transferArea).click();
  cy.get(transferArea.heading).contains("Transfer Area").should("be.visible");
});

When("user click on {string} tab", (tab) => {
  if (tab === "recent transfer") {
    cy.get(transferArea.tbasList)
      .find("div")
      .contains("RECENT TRANSFERS")
      .click();
  } else if (tab === "frequent recipients") {
    cy.get(transferArea.tbasList)
      .find("div")
      .contains("FREQUENT RECEPIENTS")
      .click();
  }
});

Then("area transfer should be visible", () => {
  cy.get(transferArea.table).should("be.visible");
  cy.get(transferArea.tableBody).should("be.visible");
});

When("user click on transfer instance", () => {
  cy.xpath(transferArea.tableRow).click();
});

Then("transfer details should be visible", () => {
  cy.get(transferArea.popupContainer).should("be.visible");
  cy.get(transferArea.heading)
    .contains("Transfer Details")
    .should("be.visible");
});

Then("area recipients should be visible", () => {
  cy.get(transferArea.table).should("be.visible");
  cy.get(transferArea.tableBody).should("be.visible");
});

When("user click on new recipient button", () => {
  cy.xpath(transferArea.newrecipientBtn).click();
});

Then("add new recipient modal should be appear", () => {
  cy.get(transferArea.popupContainer).should("be.visible");
});

When("user add wallet address", () => {
  cy.get(transferArea.popupContainer).find("input").type(walletId);
});

Then("wallet address should be verified", () => {
  cy.get(transferArea.walletStatus).should("be.visible");
  cy.get(transferArea.walletStatus)
    .find("span")
    .should("have.text", "Verified");
});

And("save and cancel button should be visible", () => {
  cy.xpath(transferArea.cancelBtn).should("be.visible");
  cy.xpath(transferArea.saveBtn).should("be.visible");
});

When("user type recipient name", () => {
  cy.get(transferArea.recipientNameInput).type("Waqas");
});

Then("save button should be enabled", () => {
  cy.xpath(transferArea.saveBtn).should("be.enabled");
});

When("user click on save button", () => {
  cy.xpath(transferArea.saveBtn).click();
});

Then("recipient should be added", () => {
  cy.get(transferArea.successMessage).should("be.visible");
});

When("user type project name in search field", () => {
  cy.get(transferArea.searchInput).clearAndType("ER");
});

Then("only search project should be display", () => {
  cy.xpath(transferArea.tableRow).should("be.visible");
});

When("user click on meatball action button", () => {
  cy.get(transferArea.meatballBtn).click();
});

Then("action dropdown should be visible", () => {
  cy.get(transferArea.dropdownMenu).should("be.visible");
});

When("user click on delete button", () => {
  cy.get(transferArea.actionBtns).contains("Delete").click();
});

And("click on yes button", () => {
  cy.xpath(transferArea.yesBtn).click();
});

Then("recipient should deleted successfully", () => {
  cy.get(transferArea.successMessage).should("be.visible");
});

When("user click on transfer are button", () => {
  cy.xpath(transferArea.transferAreaBtn).click();
});

And("click checkbox", () => {
  cy.get(transferArea.checkbox).click();
});

And("click on get started button", () => {
  cy.xpath(transferArea.getStartedBtn).should("be.enabled");
  cy.xpath(transferArea.getStartedBtn).click();
});

Then("transfer area popup should be visible", () => {
  cy.get(transferArea.popupContainer).should("be.visible");
  cy.get(transferArea.popupContainer)
    .find("p")
    .contains("Transfer Area")
    .should("be.visible");
});

When("user select project", () => {
  cy.get(transferArea.dropdownBtn).first().click();
  cy.get(transferArea.dropdownItems).first().click();
});

And("type area and select person to transfer", () => {
  cy.get(transferArea.areaInput).type("10");
});

And("type the recipient wallet id", () => {
  cy.get(transferArea.walletAddressInput).type(walletId);
  cy.get(transferArea.walletAddressInput).clearAndType(walletId);
  cy.get(transferArea.walletStatus).should("be.visible");
  cy.get(transferArea.walletStatus)
    .find("span")
    .should("have.text", "Verified ");
});

When("user click on transfer now button", () => {
  cy.get(transferArea.popupContainer).find("mat-radio-button").last().click();
  cy.xpath(transferArea.transferNowBtn).should("be.enabled");
  cy.xpath(transferArea.transferNowBtn).click();
});

And("type otp", () => {
  cy.mailosaurGetMessage(serverId, {
    sentTo: "+17312485585",
  }).then((sms) => {
    cy.log(sms.text.body);
    expect(sms.text.body).contains("Your BLOC verification code is:");
  });
});

And("add new recipient", () => {
  cy.get(transferArea.popupContainer).find("input").type(walletId);
  cy.get(transferArea.walletStatus).should("be.visible");
  cy.get(transferArea.walletStatus)
    .find("span")
    .should("have.text", "Verified");
  cy.xpath(transferArea.saveBtn).should("be.visible");
  cy.get(transferArea.recipientNameInput).type("Waqas");
  cy.xpath(transferArea.saveBtn).click();
});

Then("new recipient should be added successfully", () => {
  cy.get(transferArea.successMessage).should("be.visible");
});

When("user click on transfer button", () => {
  cy.get(transferArea.actionBtns).contains("Transfer").click();
});

And("click on make your first transfer button", () => {
  cy.xpath(transferArea.firstTransferBtn).click();
});

Then("area transfer summary should be visible", () => {
  cy.xpath(transferArea.summaryHeading).should("be.visible");
});

When("user add new recipient", () => {
  investorPage.addNewRecepient(walletId);
});

When("user click on edit button", () => {
  cy.get(transferArea.actionBtns).contains("Edit").click();
});

Then("edit recipient popup should be visible", () => {
  cy.get(transferArea.popupContainer).should("be.visible");
  cy.get(transferArea.popupContainer)
    .contains("Edit Recipient")
    .should("be.visible");
});

When("user type updated name", () => {
  cy.get(transferArea.recipientNameInput).type("Waqas Updated");
});

Then("recipient should be edit", () => {
  cy.get(transferArea.successMessage).should("be.visible");
});
