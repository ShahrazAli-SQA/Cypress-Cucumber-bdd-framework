import { When, Then, And, Given } from "cypress-cucumber-preprocessor/steps";
import { affiliatePage } from "../constant/Affiliate";
import { activityPage } from "../pages/activitylogPage";

Given("user login affiliate portal and visit activity log page", () => {
  affiliatePage.login();
  cy.xpath(activityPage.ActivityLogTab).click();
  affiliatePage.verifyPageTitle("Activity Log");
});

When("user type username in search field", () => {
  cy.get(activityPage.searchInput).first().type("Waqas Qa");
});

Then("activities related to searched username should be visible", () => {
  cy.get(activityPage.tableRow).should("be.visible");
  cy.get(activityPage.tableRow)
    .find("td")
    .first()
    .find("span")
    .contains("Waqas Qa");
});

When("user click on filter button", () => {
  cy.xpath(activityPage.filterBtn).click();
});

Then("filter option should be visible", () => {
  cy.get(activityPage.filterDropdown).first().should("be.visible");
});

When("user select action category filter", () => {
  cy.get(activityPage.categoryFilter).click();
  cy.get(activityPage.categoryoptions)
    .eq(Math.floor(Math.random() * 5))
    .click();
});

And("click apply button", () => {
  cy.xpath(activityPage.applyBtn).click();
  cy.wait(1000);
});

Then("related activity should be visible", () => {
  cy.get(activityPage.table).should("be.visible");
});

When("user select stard date and end date", () => {
  cy.get(activityPage.dateInput).first().type("2023-02-22");
  cy.get(activityPage.dateInput).last().type("2023-07-25");
});

When("user select filter options", () => {
  cy.get(activityPage.categoryFilter).click();
  cy.get(activityPage.categoryoptions)
    .eq(Math.floor(Math.random() * 5))
    .click();
  cy.get(activityPage.categoryFilter).click();
  cy.get(activityPage.dateInput).first().type("2023-02-22");
  cy.get(activityPage.dateInput).last().type("2023-07-25");
});

Then("clear filter button should be visible", () => {
  cy.xpath(activityPage.clearFilterBtn).should("be.visible");
  cy.get(activityPage.appliedFilter).should("be.visible");
});

When("user click clear filter button", () => {
  cy.xpath(activityPage.clearFilterBtn).click();
});

Then("applied filters and clear filter button should be disappear", () => {
  cy.get(activityPage.appliedFilter).should("not.be.visible");
});

And("click on reset button", () => {
  cy.xpath(activityPage.resetBtn).click();
});

Then("all filters should be reset", () => {
  cy.get(activityPage.appliedFilter).should("not.be.visible");
  cy.get(activityPage.filterDropdown).first().should("not.be.visible");
});

When("user click on project filter button", () => {
  cy.get(activityPage.projectFilter).last().click();
});

Then("project filter option should be visible", () => {
  cy.get(activityPage.projectDropdown).should("be.visible");
});

When("user select any project from project filter", () => {
  cy.get(activityPage.projectFilterMenu).last().click();
  cy.get(activityPage.projectFilterMenu).last().click();
});

And("click on apply button", () => {
  cy.xpath(activityPage.projectFilterApplyBtn).click();
});

When("user click all filter button", () => {
  cy.get(activityPage.projectFilterMenu).first().click();
});
