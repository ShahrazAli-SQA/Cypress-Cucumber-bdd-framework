import { When, Then, And, Given } from "cypress-cucumber-preprocessor/steps";
import { adminPage } from "../constant/admin";
import { activityPage } from "../pages/activityLogPage";
import { activityPageObj } from "../pages/activityLogPage";

Given("user login to admin portal and visit activity log page", () => {
  adminPage.login();
  cy.xpath(activityPage.ActivityLogTab).click();
  adminPage.verifyPageTitle("Activity Log");
});

When("user type username in search field", () => {
  cy.get(activityPage.searchInput).first().type("Dao Master Admin");
});

Then("activities related to searched username should be visible", () => {
  activityPageObj.verifySearchedUser("Dao Master Admin");
});

When("user click on filter button", () => {
  cy.xpath(activityPage.filterBtn).click();
});

Then("filter option should be visible", () => {
  cy.get(activityPage.filterDropdown).first().should("be.visible");
});

When("user select action category filter", () => {
  activityPageObj.selectFilterOption("Marketplace");
});

And("click apply button", () => {
  cy.xpath(activityPage.applyBtn).click();
});

Then("related activity should be visible", () => {
  activityPageObj.verifyAppliedFilter("Marketplace");
  cy.get(activityPage.activityTable).should("be.visible");
});

When("user select stard date and end date", () => {
  activityPageObj.selectDateRange("2023-02-13", "2023-04-28");
});

When("user select filter options", () => {
  activityPageObj.selectDateRange("2023-02-13", "2023-04-28");
  activityPageObj.selectFilterOption("Marketplace")
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
  activityPageObj.selectProject("Elements Residencia");
});

And("click on apply button", () => {
  cy.xpath(activityPage.projectFilterApplyBtn).click();
});

When("user click all filter button", () => {
  cy.get(activityPage.projectFilterMenu).first().click();
});
