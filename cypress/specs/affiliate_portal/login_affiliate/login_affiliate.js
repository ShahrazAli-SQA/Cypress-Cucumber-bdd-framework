import { When, Then, And, Given } from "cypress-cucumber-preprocessor/steps";
import { affiliatePage } from "../constant/Affiliate";
import { loginPage } from "../pages/loginPage";

let fullname = "";
let phone = "";

Given("user visit the affiliate portal", () => {
  cy.visit(Cypress.env("affiliateURL"));
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
  cy.get(loginPage.toastMessage)
    .find("span")
    .first()
    .should("be.visible")
    .and("have.text", "Invaild User");
});

When("user input valid credentials", () => {
  cy.get(loginPage.emailInput).type(Cypress.env("affiliateUSERNAME"));
  cy.get(loginPage.passwordInput).type(Cypress.env("affiliatePASSWORD"));
});

Then("user should login successfully", () => {
  affiliatePage.verifyPageTitle("Users");
});

When("user click on avatar icon", () => {
  cy.get(loginPage.avatarIcon).click();
  cy.xpath(loginPage.logOutBtn).should("be.visible");
});

And("click on logout button", () => {
  cy.xpath(loginPage.logOutBtn).click();
});

Then("user should logout successfully", () => {
  affiliatePage.verifyPageTitle("Login with");
});

When("user click on phone number tab", () => {
  cy.get(loginPage.phoneNoTab).click();
});

And("input phone number and password", () => {
  cy.get(loginPage.phoneNoInput).type(Cypress.env("phoneNumber"));
  cy.get(loginPage.loginform).find("input").eq(1).type(Cypress.env("password"));
});

When("user type invalid email and valid password", () => {
  cy.get(loginPage.emailInput).type("example@gmail.com");
  cy.get(loginPage.passwordInput).type(Cypress.env("affiliatePASSWORD"));
});

When("user type valid email and invalid password", () => {
  cy.get(loginPage.emailInput).type(Cypress.env("affiliateUSERNAME"));
  cy.get(loginPage.passwordInput).type("12345678");
});

Then("invalis username or password message should displayed", () => {
  cy.get(loginPage.toastMessage)
    .find("span")
    .first()
    .should("be.visible")
    .and("have.text", "Invalid user name or password");
});

When("user click avatar icon", () => {
  affiliatePage.login();
  cy.get(loginPage.avatarIcon).click();
});
Then("drop down menu should be visible", () => {
  cy.get(loginPage.avatarMenu).should("be.visible");
});

When("user click on switch account button", () => {
  cy.get(loginPage.switchAccount).click();
});

Then("user should redirect to investor portal", () => {
  cy.get(loginPage.investorLogo).should("be.visible");
});

When("user click on investor avatar icon", () => {
  cy.get(loginPage.investorAvatarIcon).click();
});

Then("investor dropdown menu should be visible", () => {
  cy.get(loginPage.investerDropdown).should("be.visible");
});

Then("user should redirect to affiliate portal", () => {
  affiliatePage.verifyPageTitle("Users");
});

When("user visit settings tab", () => {
  affiliatePage.login();
  cy.xpath(loginPage.settingsTab).click();
});

Then("user should navigate to settings page", () => {
  affiliatePage.verifyPageTitle("Settings");
});

When("user click on edit button", () => {
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
      cy.log(fullname);
    });
  cy.get(loginPage.fullNameinput).click();
  cy.get(loginPage.fullNameinput).clearAndType("Waqas QA changed");
  cy.get(loginPage.phoneNoInput)
    .invoke("val")
    .then((text) => {
      cy.log(text);
      phone = text;
    });
  cy.get(loginPage.phoneNoInput).clearAndType("(92) 310 4385821");
  cy.get(loginPage.dateInput).type("2004-01-01");
});

And("click on save changes button", () => {
  cy.wait(1000);
  cy.xpath(loginPage.saveChangesBtn).click({ force: true });
});

Then("information should be updated", () => {
  cy.xpath(loginPage.editButton).click();
  cy.get(loginPage.fullNameinput).should("be.enabled");
  cy.get(loginPage.fullNameinput)
    .invoke("text")
    .then((text) => {
      expect(text).to.not.equal(fullname);
    });
  cy.get(loginPage.phoneNoInput).should("be.enabled");
  cy.get(loginPage.phoneNoInput)
    .invoke("val")
    .then((text) => {
      expect(text).to.not.equal(phone);
    });
});

Then("revert the changes", () => {
  cy.get(loginPage.fullNameinput).clearAndType(fullname);
  cy.get(loginPage.phoneNoInput).clearAndType(Cypress.env("phoneNumber"));
  cy.get(loginPage.dateInput).type("2005-07-05");
  cy.xpath(loginPage.saveChangesBtn).click();
});

And("click on change password tab", () => {
  cy.get(loginPage.matTab).contains("CHANGE PASSWORD").click();
});

Then("user should be on change password screen", () => {
  affiliatePage.verifyPageTitle("Change Your Current Password");
});

Then("password input fields should be enable", () => {
  cy.get(loginPage.currentPassword).should("not.have.attr", "disabled");
});

When("user type current password and new password", () => {
  cy.get(loginPage.currentPassword).click();
  cy.get(loginPage.currentPassword).type(Cypress.env("affiliatePASSWORD"));
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
  cy.get(loginPage.newPassword).type(Cypress.env("affiliatePASSWORD"));
  cy.get(loginPage.confirmPassword).type(Cypress.env("affiliatePASSWORD"));
  cy.xpath(loginPage.saveChangesBtn).click();
  cy.xpath(loginPage.editButton).waitForElement();
});

And("click on notification tab", () => {
  cy.get(loginPage.matTab).contains("NOTIFICATIONS").click();
});

Then("user should be on notification screen", () => {
  affiliatePage.verifyPageTitle("Manage Your Notifications");
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

When("user click on contact us lable", () => {
  cy.get(loginPage.contactUsLable).invoke("removeAttr", "target");
  cy.get(loginPage.contactUsLable).click();
});

Then("user should be on website home page", () => {
  cy.get(loginPage.daoLogo).should("be.visible");
});

When("user click on contact us tab", () => {
  cy.get(loginPage.navMenu).contains("Contact Us").click();
});

Then("user can see contact information", () => {
  cy.get("h1").contains("Contact Us").should("be.visible");
  cy.get("h4").contains("Email").should("be.visible");
  cy.get("h4").contains("Support").should("be.visible");
  cy.get("h4").contains("Phone").should("be.visible");
  cy.get("h4").contains("Address").should("be.visible");
});

And("upload new photo", () => {
  const file = "testing.jpg";
  cy.get(loginPage.imgImput).attachFile(file);
});

Then("photo should be uploaded successfully", () => {
  cy.get(loginPage.toastMessage).should("be.visible");
});
