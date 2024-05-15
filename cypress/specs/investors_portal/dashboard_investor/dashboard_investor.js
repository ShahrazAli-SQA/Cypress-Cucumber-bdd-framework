import { When, Then, Given, And } from "cypress-cucumber-preprocessor/steps";
import { dashboardPage } from "../pages/dashboardPage";
import { investorPage } from "../constant/Investor";
let beforeFilter;
let afterFilter;
Given("user Visit investor portal and login", () => {
  investorPage.login();
});

When("User cilck on invest now button", () => {
  cy.xpath(dashboardPage.investNowBtn).waitForElement();
  cy.xpath(dashboardPage.investNowBtn).should("be.visible").click();
});

Then("Explore projects page should be visible", () => {
  cy.xpath(dashboardPage.projectsPage).should("be.visible");
});

When("User click on all projects button", () => {
  cy.get(dashboardPage.allProjectBtn).should("be.visible").click();
});

Then("filtered projects should be visible", () => {
  cy.xpath(dashboardPage.projectInstance).should("be.visible");
});

When("User click on developmental projects button", () => {
  cy.get(dashboardPage.developmentalPrjectBtn).waitForElement();
  cy.get(dashboardPage.developmentalPrjectBtn).should("be.visible").click();
});

When("User click on mature projects button", () => {
  cy.get(dashboardPage.MatureProjectsBtn).should("be.visible").click();
});

When("User click on sell area button", () => {
  cy.xpath(dashboardPage.sellAreaBtn).should("exist").click();
  cy.get(dashboardPage.closeBtn).waitForElement();
  cy.get(dashboardPage.closeBtn).click();
});

Then("Dao listing projects should be displayed", () => {
  cy.xpath(dashboardPage.daoListing).should("be.visible");
});

When("user click on wallet", () => {
  cy.get(dashboardPage.walletBtn).click();
});

Then("wallet dropdown should visible", () => {
  cy.get(dashboardPage.walletDropdown).should("exist").and("be.visible");
});

When("user click on receive area button", () => {
  cy.get(dashboardPage.receiveAreaBtn).should("be.visible");
  cy.get(dashboardPage.receiveAreaBtn).click();
});

Then("wallet info popup should appear", () => {
  cy.get(dashboardPage.walletInfo)
    .should("be.visible")
    .and("have.attr", "aria-modal");
});

When("user click on send area button", () => {
  cy.get(dashboardPage.sendAreaBtn).click();
});

Then("user should redirect to transfer area page", () => {
  cy.xpath(dashboardPage.transferAreaHeading).should("be.visible");
});

When("user click on avatar icon", () => {
  cy.get(dashboardPage.avatarIcon).click();
});

Then("avatar dropdown should be visible", () => {
  cy.get(dashboardPage.avatarDropdown).should("be.visible");
});

When("user click active purchases button", () => {
  cy.xpath(dashboardPage.activePurchaseBtn).should("have.attr", "role");
  cy.xpath(dashboardPage.activePurchaseBtn).click();
});

Then("user should redirect to active investments page", () => {
  cy.xpath(dashboardPage.activeInvestmentHeading).should("be.visible");
});

When("user click on slider", () => {
  cy.get(dashboardPage.gainTypeSlider).click();
});

Then("project`s current worth should be visible", () => {
  cy.xpath(dashboardPage.currentWorth).should("be.visible");
});

Then("project`s future worth should be visible", () => {
  cy.xpath(dashboardPage.onCompletion).should("be.visible");
});

When("user move to NFT", () => {
  cy.xpath(dashboardPage.buyNowBtn).invoke(
    "attr",
    "style",
    "display: flex!important",
  );
});

And("click on buy now button", () => {
  cy.xpath(dashboardPage.buyNowBtn).click();
});

Then("NFT information should be visible", () => {
  cy.get(dashboardPage.informationSlider).should("be.visible");
});

When("user close NFT information", () => {
  cy.get(dashboardPage.closePropdetails).click();
});

And("select first NFT", () => {
  cy.xpath(dashboardPage.firstNftCard).click();
});

When("user click on choose Demarcated unit plan button", () => {
  cy.get(dashboardPage.chooseUnitPlan).click();
});

Then("user should redirect to payment plan page", () => {
  cy.xpath(dashboardPage.paymentPlanPage).should("be.visible");
});

When("user accept terms and conditions", () => {
  cy.get(dashboardPage.acceptCheckbox).click();
});

And("click purchase property button", () => {
  cy.get(dashboardPage.purchasePropertyBtn).click();
});

Then("confirm purchase popup should appear", () => {
  cy.get(dashboardPage.purchasePopup).should("be.visible");
  cy.xpath(dashboardPage.proceedBtn).should("be.visible");
  cy.xpath(dashboardPage.cancelBtn).click();
  cy.get(dashboardPage.acceptCheckbox).click();
});

And("click on projects filter", () => {
  cy.xpath(dashboardPage.projectFilterText)
    .invoke("text")
    .then((text) => {
      beforeFilter = text;
    });
  cy.get(dashboardPage.projectFilter).click();
});

Then("project filter dropdown should be visible", () => {
  cy.get(dashboardPage.projectFilterDropdown).should("exist");
});

And("user select any othe project", () => {
  cy.xpath(dashboardPage.breadProject).click();
});

Then("filter should apply successfully", () => {
  cy.xpath(dashboardPage.projectFilterText).should("be.visible");
  cy.xpath(dashboardPage.projectFilterText)
    .invoke("text")
    .then((text) => {
      afterFilter = text;
    });
  expect(beforeFilter).not.equal(afterFilter);
});

Then("user can apply standard and prmium filter successfully", () => {
  cy.xpath(dashboardPage.standardFilter).select("Standard");
  cy.xpath(dashboardPage.standardFilter).select("Premium");
});

Then("user can apply floor and appartments filter successfully", () => {
  cy.xpath(dashboardPage.floorFilter).select("1st Floor");
  cy.xpath(dashboardPage.nftsCard).should("be.visible");
  cy.xpath(dashboardPage.appartmentFilter).select("2");
  cy.xpath(dashboardPage.nftsCard).should("be.visible");
});

When("user click on Project", () => {
  cy.xpath(dashboardPage.projectCard).scrollIntoView();
  cy.xpath(dashboardPage.projectCard).should("be.visible");
  cy.xpath(dashboardPage.projectCard).click();
});

Then("user should redirect to project details", () => {
  cy.xpath(dashboardPage.projectDetail)
    .should("be.visible")
    .and("have.text", "Detail");
  cy.xpath(dashboardPage.downloadHandbookBtn).should("exist");
});

When("user move to customers reviews section", () => {
  cy.get(dashboardPage.investorsSection).scrollIntoView();
  cy.get(dashboardPage.investorsSection).should("be.visible");
  cy.get(dashboardPage.investorsSection)
    .find("h2")
    .should("include.text", "Watch what our Customers have to say..");
});

And("click on any  video instance", () => {
  cy.get(dashboardPage.customerVideos).first().click();
});

Then("popup video should be appear", () => {
  cy.get(dashboardPage.popupContainer).should("exist").and("be.visible");
});
