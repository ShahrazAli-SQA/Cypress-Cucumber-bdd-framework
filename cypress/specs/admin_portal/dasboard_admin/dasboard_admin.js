import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import { adminPage } from "../constant/admin";
import { dasboardPageObj, dashboardPage } from "../pages/dasboardPage";

Given("User login to admin portal and visit dashboard", () => {
  adminPage.login();
});

When("user click on notification bell icon", () => {
  cy.get(dashboardPage.notificationBtn).click();
});

Then("notification modal should be appear", () => {
  cy.get(dashboardPage.notificationModal).should("be.visible");
});

And("user can see notification", () => {
  cy.get(dashboardPage.notifications)
  .should("be.visible")
  .and('have.length.greaterThan', 0);
});

When("user clicks on project dropdown button", () => {
  cy.get(dashboardPage.dropdownBtn).waitForElement();
  cy.get(dashboardPage.dropdownBtn).first().click();
});

Then("filter options should appear", () => {
  cy.get(dashboardPage.projectDropdown).should("be.visible");
});

When("user clicks on {string} option", (project) => {
  cy.get(dashboardPage.projectOption).contains(project).click();
});

Then("stats of selected {string} should appear", (project) => {
  cy.get(dashboardPage.heading).contains("Project Overview").waitForElement();
  adminPage.verifyPageTitle("Project Overview");
  cy.get(dashboardPage.projectTitle).contains(project).should("be.visible");
});

When("user click on days dropdown button", () => {
  cy.get(dashboardPage.dropdownBtn).eq(1).click({ force: true });
});

Then("days dropdown should be visible", () => {
  cy.get(dashboardPage.daysDropdown).should("be.visible");
});

When("user select {string} option", (days) => {
  cy.get(dashboardPage.daysOption).contains(days).click();
});

Then("stats for {string} should be visible", (days) => {
  adminPage.verifyPageTitle("Project Stats");
  cy.get(dashboardPage.dropdownBtn).eq(1).should("contain", days);
});

When("user go to the round stats section", () => {
  cy.get(dashboardPage.cardBodyHeading).eq(2).should("be.visible");
});

Then("user can see {string} round stats", (round) => {
  cy.get(dashboardPage.cardBodyHeading).eq(2).should("contain.text", round);
});

When("click on {string} arrow button", (button) => {
  dasboardPageObj.viewRoundStatus(button);
});

When("user go to recent transaction section", () => {
  cy.get(dashboardPage.cardBodyHeading)
    .contains("Recent Transactions")
    .scrollIntoView();
});

And("click on transaction filter dropdown button", () => {
  cy.get(dashboardPage.dropdownBtn).last().click();
});

When("user select {string} transaction option", (filter) => {
  cy.get(dashboardPage.projectOption).contains(filter).click();
});

Then("related transaction should be visible", () => {
  cy.xpath(dashboardPage.trasactionTable).should("be.visible");
});

And("click on see more button to see transaction", () => {
  cy.xpath(dashboardPage.seeMoreTransaction).click();
});

Then("user should redirect to transaction module", () => {
  adminPage.verifyPageTitle("Transactions");
});

When("user go to recent activity section", () => {
  cy.get(dashboardPage.navigationMenu).contains("Dashboard").click();
  cy.get(dashboardPage.cardBodyHeading)
    .contains("Recent Activity")
    .scrollIntoView();
});

And("click on see more button to see activity login", () => {
  cy.xpath(dashboardPage.seeMoreRecentActivity).click();
});

Then("user should redirect to activity logs module", () => {
  adminPage.verifyPageTitle("Activity Log");
});

When(
  "user click on days dropdown button from transaction status section",
  () => {
    cy.get(dashboardPage.cardBodyHeading)
      .contains("Transaction Status")
      .scrollIntoView();
    cy.get(dashboardPage.dropdownBtn).eq(2).click();
  },
);

Then("transaction stats for {string} should be visible", (days) => {
  cy.get(dashboardPage.transactionStats).should("be.visible");
  cy.get(dashboardPage.dropdownBtn).eq(2).should("contain", days);
});
