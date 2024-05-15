import { When, Then, And, Given, } from "cypress-cucumber-preprocessor/steps";
import { loginPage } from "../pages/loginPage";

Given("user visit the investor portal", () => {
  cy.visit(Cypress.env("investorURL"));
});

When("user click on login button", () => {
  cy.get(loginPage.loginBtn).click();
});

Then("Empty fields message should be displayed", () => {
  cy.xpath(loginPage.emailEmptyField).should("be.visible");
});

When("user type invalid email and valid password", () => {
  cy.get(loginPage.emailInput).type("example@gmail.com");
  cy.get(loginPage.passwordInput).type(Cypress.env("investorPASSWORD"));
});

When("user type valid email and invalid password", () => {
  cy.get(loginPage.emailInput).type(Cypress.env("investorUSERNAME"));
  cy.get(loginPage.passwordInput).type("12345678");
});

And("click on login button", () => {
  cy.get(loginPage.loginBtn).click();
});

Then("invalis username or password message should displayed", () => {
  cy.get(loginPage.toastMessage)
    .find("span")
    .should("be.visible")
    .and("have.text", "Incorrect email address or password, please try again.");
});

When("user input Email and password", () => {
  cy.get(loginPage.emailInput).type("example@gmail.com");
  cy.get(loginPage.passwordInput).type("12345678");
});

And("click login button", () => {
  cy.get(loginPage.loginBtn).click();
});

Then("error message should displayed", () => {
  cy.get(loginPage.toastMessage).waitForElement();
  cy.get(loginPage.toastMessage).should("be.visible");
});

When("user input valid credentials", () => {
  cy.get(loginPage.emailInput).type(Cypress.env("investorUSERNAME"));
  cy.get(loginPage.passwordInput).type(Cypress.env("investorPASSWORD"));
});

Then("user should login successfully", () => {
  cy.get(loginPage.dashboard).should("be.visible");
});

When("user click on avatar icon", () => {
  cy.get(loginPage.avatarIcon).click();
  cy.xpath(loginPage.logOutBtn).should("be.visible");
});

And("click on logout button", () => {
  cy.xpath(loginPage.logOutBtn).click();
});

Then("user should logout successfully", () => {
  cy.xpath(loginPage.loginPage).should("be.visible");
});
