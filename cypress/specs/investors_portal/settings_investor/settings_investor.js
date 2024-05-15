import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import { settingsPage } from "../pages/settingsPage";
import { investorPage } from "../constant/Investor";

let phoneNo = null;
const accountTitle = "Test Tittle";
Given("login investor portal and click on settings tab", () => {
  investorPage.login();
  cy.xpath(settingsPage.settingsTab).click();
  cy.xpath(settingsPage.settingHeading)
    .should("be.visible")
    .and("have.text", "Settings");
});

When("user click on {string} tab", (tab) => {
  cy.get(settingsPage.tabsList).contains(tab).click();
});

Then("user should be on {string} page", (page) => {
  investorPage.verifyPageTitle(page);
});

When("user click on edit button", () => {
  cy.xpath(settingsPage.editBtn).click();
});

Then("input fields gets enabled", () => {
  cy.get(settingsPage.nameInput).should("be.enabled");
});

When("user type new details", () => {
  cy.get(settingsPage.nameInput).clearAndType("Name Updated");
  cy.get(settingsPage.dobInput).type("2000-02-13");
  cy.get(settingsPage.nickNameInput).clearAndType("nick name updated");
});

And("click on update button", () => {
  cy.get(settingsPage.updateBtn).click();
});

Then("details should be updated successfully", () => {
  cy.get(settingsPage.successMsg).should("be.visible");
});

And("revert changes", () => {
  cy.xpath(settingsPage.editBtn).click();
  cy.get(settingsPage.nameInput).should("be.enabled");
  cy.get(settingsPage.nameInput).clearAndType("Waqas");
  cy.get(settingsPage.dobInput).type("2007-03-14");
  cy.get(settingsPage.nickNameInput).clearAndType("Waqas");
  cy.get(settingsPage.updateBtn).click();
  cy.get(settingsPage.successMsg).should("be.visible");
});

And("upload new profile photo", () => {
  const filePath = "testing.jpg";
  cy.get(settingsPage.changeImg).attachFile(filePath);
});

Then("profile photo should be uploaded", () => {
  cy.get(settingsPage.successMsg).should("be.visible");
});

Then("profile photo should be updated", () => {
  cy.get(settingsPage.successMsg).should("be.visible");
});

When("user type new phone number", () => {
  phoneNo = investorPage.generatePhoneNo();
  cy.log(phoneNo);
  cy.get(settingsPage.phoneNumberInput).clearAndType(phoneNo);
});

And("click on verify button", () => {
  cy.get(settingsPage.verifyBtn).should("be.visible").and("be.enabled");
  cy.get(settingsPage.verifyBtn).click();
});

Then("Otp popup should be visible", () => {});

Then("phone number should be updated", () => {
  cy.get(settingsPage.updateBtn).click();
});

And("revert phone number", () => {});

When("user click on add new address lable", () => {
  cy.xpath(settingsPage.addNewAddress).click();
});

Then("my address popup should be visible", () => {
  cy.get(settingsPage.popupContainer).should("be.visible");
  cy.get(settingsPage.popupContainer)
    .find("h3")
    .contains("My Address")
    .should("be.visible");
});

When("user type address information", () => {
  cy.get(settingsPage.addressLine1).clearAndType("Test address");
  cy.get(settingsPage.addressLine2).clearAndType("T");
  cy.get(settingsPage.cityInput).clearAndType("LHR");
  cy.get(settingsPage.countryInput).clearAndType("Pakistan");
});

And("user click on update button", () => {
  cy.get(settingsPage.popupContainer).find("button").last().click();
});

And("click on add button", () => {
  cy.xpath(settingsPage.addBtn).click();
});

Then("new address should be added successfully", () => {
  cy.get(settingsPage.successMsg).should("be.visible");
});

When("user click on edit icon", () => {
  cy.get(settingsPage.editIcon).last().invoke("css", "visibility", "visible");
  cy.get(settingsPage.editIcon).last().click();
});

Then("new address should be updated successfully", () => {
  cy.get(settingsPage.successMsg).should("be.visible");
});

When("user click on delete icon", () => {
  cy.get(settingsPage.deleteIcon).last().invoke("css", "visibility", "visible");
  cy.get(settingsPage.deleteIcon).last().click();
});

Then("delete popup should be visible", () => {
  cy.get(settingsPage.deletePopup).should("be.visible");
});

When("user click on yes button to confirm delete address", () => {
  cy.xpath(settingsPage.yesBtn).click();
});

Then("address should be deleted successfully", () => {
  cy.get(settingsPage.successMsg).should("be.visible");
});

When("user click on add new bank account lable", () => {
  cy.xpath(settingsPage.addBankBtn).click();
});

Then("add bank account details should be visible", () => {
  cy.get(settingsPage.popupContainer).should("be.visible");
});

When("user add new banking details", () => {
  let accountNo = "";
  let iban = "";
  cy.get(settingsPage.popupContainer).find("button").eq(1).click();
  cy.get("div._Popover ul li")
    .its("length")
    .then((listLength) => {
      const randomIndex = Math.floor(Math.random() * listLength);

      cy.get("div._Popover ul li").eq(randomIndex).click();
    });

  for (let index = 0; index < 13; index++) {
    accountNo += Math.floor(Math.random() * 10);
  }
  cy.get(settingsPage.accountNoInput).clearAndType(accountNo);
  cy.get(settingsPage.accountTitleInput).clearAndType(accountTitle);
  iban = investorPage.generateString(25);
  cy.get(settingsPage.ibanInput).clearAndType(iban);
});

And("click on checkbox", () => {
  cy.get(settingsPage.checkBox).click();
});

And("click on save button", () => {
  cy.xpath(settingsPage.saveBtn).click();
});

Then("new banking details should be added", () => {
  cy.get(settingsPage.successMsg).should("be.visible");
});

Then("update bank details popup should be visible", () => {
  cy.get(settingsPage.popupContainer).should("be.visible");
});

When("user update banking details", () => {
  let accountNo = "";
  let iban = "";
  for (let index = 0; index < 13; index++) {
    accountNo += Math.floor(Math.random() * 10);
  }
  cy.get(settingsPage.accountNoInput).clearAndType(accountNo);
  cy.get(settingsPage.accountTitleInput).clearAndType("Title Updated");
  iban = investorPage.generateString(25);
  cy.get(settingsPage.ibanInput).clearAndType(iban);
  cy.get(settingsPage.checkBox).click();
  cy.get(settingsPage.updateBtn).click();
});

Then("bank details should be updated", () => {
  cy.get(settingsPage.successMsg).should("be.visible");
});

When("user click on bank delete icon", () => {
  cy.get(settingsPage.bankDeleteIcon)
    .last()
    .invoke("css", "visibility", "visible");
  cy.get(settingsPage.bankDeleteIcon).last().click();
});

When("user click on yes button to confirm delete bank", () => {
  cy.xpath(settingsPage.yesBtn).click();
});

Then("bank should be deleted successfully", () => {
  cy.get(settingsPage.successMsg).should("be.visible");
});

Then("cnic input field should be enabled", () => {
  cy.get(settingsPage.cnicInput).should("be.enabled");
});

When("user type updated cnic", () => {
  const cnic = investorPage.generateCnic();
  cy.get(settingsPage.cnicInput).clearAndType(cnic);
});

Then("cnic should updated successfully", () => {
  cy.get(settingsPage.successMsg).should("be.visible");
});

Then("upload photo fied should be enabled", () => {
  cy.get(settingsPage.frontCnic).should("be.enabled");
  cy.get(settingsPage.backCnic).should("be.enabled");
});

When("user upload front and back photo of cnic", () => {
  const filePath = "sample.jpg";
  cy.get(settingsPage.frontCnic).attachFile(filePath);
  cy.get(settingsPage.backCnic).attachFile(filePath);
});

Then("photos should updated successfully", () => {
  cy.get(settingsPage.successMsg).should("be.visible");
});

And("select FBR tax filter", () => {
  const filter = Math.floor(Math.random() * 3);
  cy.get(settingsPage.fbrFilter).eq(filter).click();
});

Then("legal information should updated successfully", () => {
  cy.get(settingsPage.successMsg).should("be.visible");
});

When("user click on add new next of kin button", () => {
  cy.xpath(settingsPage.addNewKinBtn).click();
});

Then("next of kin popup should be visible", () => {
  cy.get(settingsPage.popupContainer).should("be.visible");
});

When("user add new kin information", () => {
  const name = investorPage.generateUsername();
  const number = investorPage.generatePhoneNo();
  let cnic = investorPage.generateCnic();
  cnic = `${cnic.slice(0, 5)}-${cnic.slice(5, 12)}-${cnic.slice(12)}`;
  const email = investorPage.generateEmail();
  cy.get(settingsPage.popupContainer).find('input[name="fullName"]').type(name);
  cy.get(settingsPage.popupContainer)
    .find('input[name="phoneNumber"]')
    .type(number);
  cy.get(settingsPage.popupContainer).find('input[name="cnic"]').type(cnic);
  cy.get(settingsPage.popupContainer).find('input[name="email"]').type(email);
  cy.get(settingsPage.popupContainer)
    .find('input[name="address"]')
    .type("Test address Lahore");
});

Then("new next of kin should be added", () => {
  cy.get(settingsPage.successMsg).should("be.visible");
});

When("user click on kin delete icon", () => {
  cy.get(".next-of-kins .next")
    .its("length")
    .then((length) => {
      cy.log(length);
      cy.wrap(length).as("preLength");
    });
  cy.get(settingsPage.kinDeleteIcon)
    .last()
    .invoke("css", "visibility", "visible");
  cy.get(settingsPage.kinDeleteIcon).last().click();
});

When("user click on yes button to confirm delete kin", () => {
  cy.xpath(settingsPage.yesBtn).click();
  cy.wait(2000);
});

Then("existing kin should be deleted successfully", () => {
  cy.get(".next-of-kins .next")
    .its("length")
    .then((length) => {
      cy.log(length);
      cy.get("@preLength").then((preLength) => {
        expect(preLength).to.be.greaterThan(length);
      });
    });
});

Then("password input fields should be enable", () => {
  cy.get(settingsPage.currentPasswordInput).should("be.enabled");
});

When("user type current password and new password", () => {
  cy.get(settingsPage.currentPasswordInput).type(
    Cypress.env("investorPASSWORD"),
  );
  cy.get(settingsPage.newPasswordInput).type("Test@123");
  cy.get(settingsPage.confirmPasswordInput).type("Test@123");
});

Then("password should be changed successfully", () => {
  cy.get(settingsPage.successMsg).should("be.visible");
});

And("reset the changed password", () => {
  cy.xpath(settingsPage.editBtn).click();
  cy.get(settingsPage.currentPasswordInput).should("be.enabled");
  cy.get(settingsPage.currentPasswordInput).type("Test@123");
  cy.get(settingsPage.newPasswordInput).type(Cypress.env("investorPASSWORD"));
  cy.get(settingsPage.confirmPasswordInput).type(
    Cypress.env("investorPASSWORD"),
  );
  cy.get(settingsPage.updateBtn).click();
  cy.get(settingsPage.successMsg).should("be.visible");
});

When("user click on notification toogle", () => {
  cy.wait(2000);
  cy.get(settingsPage.notificationToggle).first().click();
  cy.get(settingsPage.notificationToggle).last().click();
});

Then("notification should be turn {string}", (notifcation) => {
  if (notifcation === "off") {
    cy.get(settingsPage.notificationToggle)
      .first()
      .find("input")
      .should("have.attr", "aria-checked", "false");
    cy.get(settingsPage.notificationToggle)
      .last()
      .find("input")
      .should("have.attr", "aria-checked", "false");
  } else if (notifcation === "on") {
    cy.get(settingsPage.notificationToggle)
      .first()
      .find("input")
      .should("have.attr", "aria-checked", "true");
    cy.get(settingsPage.notificationToggle)
      .last()
      .find("input")
      .should("have.attr", "aria-checked", "true");
  }
});

And("two wallet card should be visible", () => {
  cy.get(settingsPage.walletCard).should("be.visible");
  cy.get(settingsPage.walletCard)
    .its("length")
    .then((length) => {
      expect(length).to.equal(2);
    });
});

When("user click on copy icon", () => {
  cy.get(settingsPage.copyIcon).first().click();
});

Then("wallet id should copied", () => {
  cy.get(settingsPage.copiedTooltip)
    .should("be.visible")
    .and("have.text", "Copied");
});
