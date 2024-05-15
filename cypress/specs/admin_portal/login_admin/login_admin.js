import { When, Then, And, Given } from "cypress-cucumber-preprocessor/steps";
import { loginPage } from "../pages/loginPage";
import { adminPage } from "../constant/admin";

let fullname;
let phone;

Given("Visit admin portal", () => {
  cy.visit(Cypress.env("adminURL"));
});

When("user click input fields", () => {
  cy.get(loginPage.emailInput).click();
  cy.get(loginPage.passwordInput).click();
});

And("login button should be disabled", () => {
  cy.xpath(loginPage.loginBtn).should("have.attr", "disabled");
});

And("click on login button", () => {
  cy.xpath(loginPage.loginBtn).click();
});

Then("Empty fields message should be displayed", () => {
  cy.xpath(loginPage.emailEmptyField).should("be.visible");
});

When("user input Email and password", () => {
  cy.get(loginPage.emailInput).type("example@gmail.com");
  cy.get(loginPage.passwordInput).type("12345678");
});

Then("error message should displayed", () => {
  cy.get(loginPage.toastMessage).waitForElement();
  cy.get(loginPage.toastMessage)
    .find("span")
    .first()
    .should("be.visible")
    .and("have.text", "Invaild User");
});

When("user input valid credentials", () => {
  cy.get(loginPage.emailInput).type(Cypress.env("adminUSERNAME"));
  cy.get(loginPage.passwordInput).type(Cypress.env("adminPASSWORD"));
});

Then("user should login successfully", () => {
  cy.get(loginPage.heading)
    .contains("Hi, DAO Master Admin!")
    .should("be.visible");
});

When("user click on avatar icon", () => {
  cy.get(loginPage.avatarIcon).click();
  cy.xpath(loginPage.logOutBtn).should("be.visible");
});

And("click on logout button", () => {
  cy.xpath(loginPage.logOutBtn).click();
});

Then("user should logout successfully", () => {
  cy.get(loginPage.heading).should("be.visible").and("have.text", "Login with");
});

When("user type invalid email and valid password", () => {
  cy.get(loginPage.emailInput).type("example@gmail.com");
  cy.get(loginPage.passwordInput).type(Cypress.env("adminPASSWORD"));
});

When("user type valid email and invalid password", () => {
  cy.get(loginPage.emailInput).type(Cypress.env("adminUSERNAME"));
  cy.get(loginPage.passwordInput).type("12345678");
});

Then("invalid username or password message should displayed", () => {
  cy.get(loginPage.toastMessage)
    .find("span")
    .first()
    .should("be.visible")
    .and("have.text", "Invalid user name or password");
});

When("user visit settings tab", () => {
  adminPage.login();
  cy.xpath(loginPage.settingsTab).click();
});

Then("user should navigate to settings page", () => {
  cy.get(loginPage.heading).contains("Settings").should("be.visible");
});

When("user click on edit button", () => {
  cy.xpath(loginPage.editButton).waitForElement();
  cy.xpath(loginPage.editButton).click();
});

Then("user should be able to edit the input fields", () => {
  cy.get(loginPage.fullNameinput).should("not.have.attr", "disabled");
});

When("user type updated name", () => {
  cy.get(loginPage.fullNameinput)
    .invoke("val")
    .then((text) => {
      cy.log(text);
      fullname = text;
    });
  cy.get(loginPage.fullNameinput).clearAndType("admin name changed");
  cy.get(loginPage.phoneNoInput)
    .invoke("val")
    .then((text) => {
      cy.log(text);
      phone = text;
    });
  cy.get(loginPage.phoneNoInput).clearAndType("(92) 315 5397470");
  cy.get(loginPage.dateInput).type("2004-01-01");
});

And("click on save changes button", () => {
  cy.xpath(loginPage.saveChangesBtn).click();
});

Then("information should be updated", () => {
  cy.xpath(loginPage.editButton).click();
  cy.get(loginPage.fullNameinput)
    .invoke("val")
    .then((text) => {
      expect(text).to.not.equal(fullname);
    });
  cy.get(loginPage.phoneNoInput)
    .invoke("val")
    .then((text) => {
      expect(text).to.not.equal(phone);
    });
});

Then("revert the changes", () => {
  cy.get(loginPage.fullNameinput).clearAndType(fullname);
  cy.get(loginPage.phoneNoInput).clearAndType(phone);
  cy.get(loginPage.dateInput).type("1992-03-13");
  cy.xpath(loginPage.saveChangesBtn).click();
});

And("click on change password tab", () => {
  cy.get(loginPage.matTab).contains("CHANGE PASSWORD").click();
});

Then("user should be on change password screen", () => {
  cy.get(loginPage.heading)
    .contains("Change Your Current Password")
    .should("be.visible");
});

Then("password input fields should be enable", () => {
  cy.get(loginPage.currentPassword).should("not.have.attr", "disabled");
});

When("user type current password and new password", () => {
  cy.get(loginPage.currentPassword).click();
  cy.get(loginPage.currentPassword).type(Cypress.env("adminPASSWORD"));
  cy.get(loginPage.newPassword).type("Password123*");
  cy.get(loginPage.confirmPassword).type("Password123*");
});

Then("password should be changed successfully", () => {
  cy.get(loginPage.toastMessage).should("be.visible");
});

Then("reset the changed password", () => {
  cy.xpath(loginPage.editButton).waitForElement();
  cy.xpath(loginPage.editButton).click();
  cy.get(loginPage.currentPassword).type("Password123*");
  cy.get(loginPage.newPassword).type(Cypress.env("adminPASSWORD"));
  cy.get(loginPage.confirmPassword).type(Cypress.env("adminPASSWORD"));
  cy.xpath(loginPage.saveChangesBtn).click();
  cy.xpath(loginPage.editButton).waitForElement();
});

And("click on notification tab", () => {
  cy.get(loginPage.matTab).contains("NOTIFICATIONS").click();
});

Then("user should be on notification screen", () => {
  cy.get(loginPage.heading)
    .contains("Manage Your Notifications")
    .should("be.visible");
});

When("user click on notification toggle", () => {
  cy.get(loginPage.notificationToggle)
    .first()
    .find("input")
    .should(($element) => {
      const attributeValue = $element.attr("aria-checked");
      return attributeValue === "true";
    });
  cy.get(loginPage.notificationToggle).first().click();
  cy.get(loginPage.toastMessage).should("be.visible");
  cy.get(loginPage.notificationToggle).last().click();
  cy.get(loginPage.toastMessage).should("be.visible");
});

Then("notification should turn {string}", (toogle) => {
  if (toogle === "off") {
    cy.get(loginPage.notificationToggle)
      .first()
      .find("input")
      .should("have.attr", "aria-checked", "false");
    cy.get(loginPage.notificationToggle)
      .last()
      .find("input")
      .should("have.attr", "aria-checked", "false");
  } else if (toogle === "on") {
    cy.get(loginPage.notificationToggle)
      .first()
      .find("input")
      .should("have.attr", "aria-checked", "true");
    cy.get(loginPage.notificationToggle)
      .last()
      .find("input")
      .should("have.attr", "aria-checked", "true");
  }
});
