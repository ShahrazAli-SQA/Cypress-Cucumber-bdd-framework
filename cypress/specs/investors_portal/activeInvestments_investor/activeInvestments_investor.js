import { When, Then, Given, And } from "cypress-cucumber-preprocessor/steps";
import { activeInvestmentPage } from "../pages/activeInvestmentPage";
import { investorPage } from "../constant/Investor";

Given("login investors portal and click active investment tab", () => {
  investorPage.login();
  cy.get(activeInvestmentPage.dashboardDropDown).click();
  cy.xpath(activeInvestmentPage.activeInvestmentTab).click();
  cy.xpath(activeInvestmentPage.activeInvestmentHeading)
    .should("exist")
    .and("be.visible");
});

When("user click on investments report button", () => {
  cy.xpath(activeInvestmentPage.investmentReportBtn).click();
});

Then("user should redirect to reports page", () => {
  cy.get(activeInvestmentPage.reportsPage)
    .should("be.visible")
    .and("have.text", "Reports");
});

When("user click on statement logs tab", () => {
  cy.xpath(activeInvestmentPage.statementLogs).click();
});

Then("generated statements should be visible", () => {
  cy.get(activeInvestmentPage.logsTable).should("exist").and("be.visible");
});

And("user can view any report", () => {
  cy.xpath(activeInvestmentPage.viewReportBtn).invoke("removeAttr", "target");
  cy.xpath(activeInvestmentPage.viewReportBtn).should("have.attr", "href");
});

Then("close the window", () => {
  cy.go("back");
});
//
When("user click on investment summary card", () => {
  cy.get(activeInvestmentPage.reportCard).first().click();
});

Then("generate report popup should be visible", () => {
  cy.get(activeInvestmentPage.popupContainer).should("be.visible");
});

When("user select start date and end date", () => {
  cy.get(activeInvestmentPage.startDate).type("2023-02-13");
  cy.get(activeInvestmentPage.endDate).type("2023-04-28");
});

And("click on generate report button", () => {
  cy.xpath(activeInvestmentPage.generateResultBtn).click();
});

Then("report should be generated", () => {
  cy.get(activeInvestmentPage.reportsTable).should("be.visible");
  cy.xpath(activeInvestmentPage.cancelBtn).click();
});
//
When("user click on transaction report card", () => {
  cy.get(activeInvestmentPage.reportCard).eq(1).click();
});

When("user click on investment certificate card", () => {
  cy.get(activeInvestmentPage.reportCard).last().click();
});

Then("investment certificate popup should be visible", () => {
  cy.get(activeInvestmentPage.popupContainer).should("be.visible");
  cy.xpath(activeInvestmentPage.downloadCertificateBtn).should("be.visible");
});

When("user click on income stream tab", () => {
  cy.xpath(activeInvestmentPage.incomeStreamTab).click();
});

Then("user should redirect to income stream page", () => {
  cy.get(activeInvestmentPage.incomeStreamHeading).should("be.visible");
});

When("user click on generate rental report button", () => {
  cy.xpath(activeInvestmentPage.generateRentalReport).click();
});
