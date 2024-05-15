import { When, Then, Given, And } from "cypress-cucumber-preprocessor/steps";
import { projectPage } from "../pages/projectsPage";
import { investorPage } from "../constant/Investor";

Given("Login investors portal and click Projects tab", () => {
  investorPage.login();
  cy.xpath(projectPage.projectsTab).click();
  cy.xpath(projectPage.projectsPage)
    .should("be.visible")
    .and("have.text", "Explore Projects");
});

When("user click on explore button", () => {
  cy.xpath(projectPage.exploreProject).click();
});

Then("user see project details", () => {
  cy.xpath(projectPage.projectDetail).should("be.visible");
});

When("user click on download handbook button", () => {
  cy.xpath(projectPage.downloadHandbookBtn).invoke("removeAttr", "target");
  // .click();
});

Then("handbook should be download", () => {
  // cy.go('back');
  cy.window().then((win) => {
    win.close();
  });
});

And("project status and development status", () => {
  cy.xpath(projectPage.projectStatus).should("be.visible");
  cy.xpath(projectPage.developmentStatus).scrollIntoView();
  cy.xpath(projectPage.developmentStatus).should("be.visible");
});

When("user click on purchase now button", () => {
  cy.xpath(projectPage.purchaseAreaBtn).click();
});

Then("select ownership plan and click proceed button", () => {
  cy.get(projectPage.projectPlan).first().find("button").click();
});

Then("ownership status should be visible", () => {
  cy.get(projectPage.popupContainer).should("be.visible");
  cy.get(projectPage.ownershipHeading)
    .should("be.visible")
    .and("have.text", "Your Ownership Stats");
});

When("user click on purchase button", () => {
  cy.get(projectPage.popupContainer).find("button").last().click();
});

Then("user can see document summary", () => {
  cy.get(projectPage.orderSummary).first().should("be.visible");
  cy.get(projectPage.orderSummary)
    .first()
    .find("h3")
    .should("have.text", "Documents & Summary");
});

When("user accept terms and click purchase now button", () => {
  cy.get(projectPage.acceptCheckbox).click();
  cy.xpath(projectPage.purchaseBtn).click();
});

Then("pledge request should be submitted", () => {
  cy.get(projectPage.pledgeRequestSubmitted)
    .should("be.visible")
    .and("have.text", " Pledge Request Submitted");
});

When("user click on developmental projects button", () => {
  cy.get(projectPage.developmentalPrjectBtn).click();
});

Then("user can only see developmental projects", () => {
  cy.get(projectPage.developmentalPrjectBtn)
    .find("span")
    .invoke("text")
    .then((text) => {
      cy.log(text);
      cy.get(projectPage.projectsName).should("have.length", text);
    });
});

When("user click on mature projects button", () => {
  cy.get(projectPage.MatureProjectsBtn).click();
});

Then("user can only explore mature projects", () => {
  cy.get(projectPage.MatureProjectsBtn)
    .find("span")
    .invoke("text")
    .then((text) => {
      cy.log(text);
      cy.get(projectPage.projectsName).should("have.length", text);
    });
});

When("user click on reminder button", () => {
  cy.get(projectPage.remindMeBtn).click();
});

Then("success message should be displayed", () => {
  cy.get(projectPage.toastMessage).should("be.visible");
});

And("scroll down and click on back to top button", () => {
  cy.get(projectPage.backToTopBtn).scrollIntoView();
  cy.get(projectPage.backToTopBtn).click();
});

When("investor click on purchase now button", () => {
  cy.get(projectPage.developmentalPrjectBtn).click();
  cy.xpath(projectPage.purchaseNowBtn).scrollIntoView();
  cy.xpath(projectPage.purchaseNowBtn).click();
  investorPage.verifyPageTitle("Start your asset ownership journey");
});

When("user clear area field", () => {
  cy.get(projectPage.pledgeAreaInput).clear();
});

Then("area warning message should be visible", () => {
  cy.get(projectPage.areaWarning).should("be.visible");
});

When("user enter area to pledge and click on purchase now button", () => {
  cy.get(projectPage.pledgeAreaInput).clear();
  cy.get(projectPage.pledgeAreaInput).type("5");
  cy.xpath(projectPage.purchaseAreaBtn).click();
});
