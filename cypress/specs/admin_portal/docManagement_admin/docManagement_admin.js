import { When, Then, And, Given } from "cypress-cucumber-preprocessor/steps";
import { adminPage } from "../constant/admin";
import { docManagementPage, docManagementPageObj } from "../pages/docManagementPage";
import "cypress-real-events/support";
import { UsersPage } from "../pages/usersPage";

let username = "";
let email = "";
let phoneNo = "";
let cnic = "";

const testComment = "This is test comment, we are testing.";
const testNote = "This is test note, we are testing.";

Given("user login Admin portal and visit doc management page", () => {
  adminPage.login();
  cy.xpath(docManagementPage.docManagementTab).click();
  adminPage.verifyPageTitle("Document Management");
});

When("user click on Create investment plan button", () => {
  cy.xpath(docManagementPage.createInvestmentPlanBtn).click();
});

Then("payment plan details page should be visible", () => {
  adminPage.verifyPageTitle("Payment Plan Details");
});

When("user select {string} currency from the currency dropdown", (currency) => {
  docManagementPageObj.selectCurrency(currency);
});

Then("search for investor name", () => {
  cy.get(docManagementPage.searchinvestorInput).type(username);
  cy.get(docManagementPage.investorList).waitForElement();
  cy.get(docManagementPage.investorList).first().click();
});

When("user select {string} investment plan", (plan) => {
  cy.xpath(docManagementPage.investmentPlanDropdown).click();
  cy.get(docManagementPage.dropdownOption).contains(plan).click();
});

And("add required details for {string} investment plan", (plan) => {
  docManagementPageObj.inputPlanDetails(plan);
});

Then("user should be see investment plan and summary", () => {
  adminPage.verifyPageTitle("Summary");
});

When("user click on Request for approval button", () => {
  cy.xpath(docManagementPage.requestApprovalBtn).click();
  cy.get("body").then(($body) => {
    if ($body.find('[class*="mat-dialog-container"]').length > 0) {
      cy.wait(1000);
      cy.get(UsersPage.popupContainer).find("button").last().click();
    }
  });
});

And("click on proceed request button", () => {
  cy.wait(1000);
  cy.get(docManagementPage.popupContainer).should("be.visible");
  cy.xpath(docManagementPage.proceedRequestBtn).click();
});

Then("investment plan should be created", () => {
  cy.get(docManagementPage.toastMessage).should("be.visible");
});

When("user click on create user button", () => {
  cy.xpath(docManagementPage.createUserBtn).click();
});

Then("the user creation form should be visible", () => {
  adminPage.verifyPageTitle("Create User");
});

When("user inputs all the required fields in the user creation form", () => {
  username = adminPage.generateUsername();
  email = adminPage.generateEmail();
  phoneNo = adminPage.generatePhoneNo();
  cnic = adminPage.generateCnic();
  docManagementPageObj.inputUserDetails(username, email, phoneNo, cnic);
});

And("click on submit button", () => {
  cy.xpath(docManagementPage.submitBtn).should("be.enabled");
  cy.xpath(docManagementPage.submitBtn).click();
});

Then("success message should be visible", () => {
  cy.get(docManagementPage.toastMessage)
    .should("be.visible")
    .and("have.class", "bg-success");
});

When("user type usecase in the search field", () => {
  docManagementPageObj.searchUsecase("Buy to Own");
});

Then("all searched instances should be related to that usecase", () => {
  docManagementPageObj.verifySearchedUsecase("Buy  to  Own")
});

When("user click on approved tab", () => {
  cy.get(docManagementPage.tabList).find('[role="tab"]').eq(1).click();
  cy.get(docManagementPage.tableRow).should("be.visible");
});

When("move to the attachement column", () => {
  cy.get(docManagementPage.infiniteScroll).scrollTo("right");
});

Then("user should be able to see .pdf attachement", () => {
  cy.xpath(docManagementPage.pdfFile).should("be.visible");
});

When("user click on view and approve button", () => {
  cy.get('[class="fas fa-angle-left"]').click({ force: true });
  cy.wait(1000);
  cy.xpath(docManagementPage.viewAndApproveBtn).click();
});

Then("payemnt plan should be visible", () => {
  adminPage.verifyPageTitle("Payment plan approval");
});

When("user type plan validity days and comments", () => {
  cy.get(docManagementPage.sidebarMenu).first().find("input").type("5");
  cy.get(docManagementPage.sidebarMenu)
    .first()
    .find("textarea")
    .type(testComment);
});

And("click on approve document", () => {
  cy.get(docManagementPage.ppAprovalbtns).contains("Approve Document").click();
});

Then("document should be approved", () => {
  cy.get(docManagementPage.toastMessage).should("be.visible");
});

When("user click on document instance", () => {
  cy.get(docManagementPage.tableRow).first().click();
});

Then("document details should appear", () => {
  adminPage.verifyPageTitle("Document Details");
});

When("user click on meetball button", () => {
  cy.get(docManagementPage.meetballBtn).click();
});

And("click on discard button", () => {
  cy.get(docManagementPage.meetballMenu).contains("Discard").click();
});

And("type comment and click on discard plan button", () => {
  cy.get(docManagementPage.sidebarMenu)
    .last()
    .find("textarea")
    .type(testComment);
  cy.xpath(docManagementPage.discardPlan).click();
});

Then("investmant plan should be discarded", () => {
  cy.get(docManagementPage.toastMessage).should("be.visible");
});

When("user type note in comment box", () => {
  cy.get(docManagementPage.documentDetail).find("textarea").type(testNote);
});

And("click on add button", () => {
  cy.get(docManagementPage.documentDetail)
    .find("button")
    .contains("Add")
    .click();
});

Then("new note should added", () => {
  cy.get(docManagementPage.toastMessage).should("be.visible");
});

When("user click on delete button", () => {
  cy.get(docManagementPage.documentDetail)
    .find("button")
    .contains("Delete")
    .first()
    .click();
});

And("confirm delete note", () => {
  cy.get(docManagementPage.popupContainer)
    .find("button")
    .contains("Delete")
    .click();
});

Then("note should be deleted", () => {
  cy.get(docManagementPage.toastMessage).should("be.visible");
});

Then("document details should be visible", () => {
  adminPage.verifyPageTitle("Document Details");
});

And("click on view & and approve button", () => {
  cy.get(docManagementPage.meetballMenu).contains("View & Approve").click();
});

When("user click on apprved tab", () => {
  cy.get(docManagementPage.documentTabs).contains("Approved").click();
});

When("user click on {string} tab", (tab) => {
  cy.get(docManagementPage.documentTabs).contains(tab).click();
});

When("user type investment plan document id in search field", () => {
  cy.get(docManagementPage.tableRow)
    .first()
    .find("td")
    .first()
    .invoke("text")
    .then((text) => {
      cy.get(docManagementPage.searchInput).type(text);
      cy.wrap(text).as("docId");
    });
});

Then("only searched document should be visible", () => {
  cy.get(docManagementPage.tableRow).should("have.length", 1);
  cy.get("@docId").then((docId) => {
    cy.get(docManagementPage.tableRow)
      .first()
      .find("td")
      .first()
      .should("contain.text", docId);
  });
});

And("click on cancel button", () => {
  cy.get(docManagementPage.documentDetail)
    .find("button")
    .contains("Cancel")
    .click();
});

Then("note should be clear", () => {
  cy.get(docManagementPage.documentDetail)
    .find("textarea")
    .should("have.text", "");
});

When("user click on next doc button", () => {
  cy.get(docManagementPage.docInvestorId)
    .invoke("text")
    .then((text) => {
      cy.wrap(text).as("docInvestorId");
    });
  cy.xpath(docManagementPage.nextDocBtn).click();
});

Then("next document should be visible", () => {
  cy.get("@docInvestorId").then((docInvestorId) => {
    cy.get(docManagementPage.docInvestorId).should(
      "not.have.text",
      docInvestorId,
    );
  });
});

When("user click on previous arrow button", () => {
  cy.get('[class="form-container"] button').first().click();
});

Then("previous document should be visible", () => {
  cy.get("@docInvestorId").then((docInvestorId) => {
    cy.get(docManagementPage.docInvestorId).should("have.text", docInvestorId);
  });
});

When("user click on discard button", () => {
  cy.xpath(docManagementPage.discardBtn).click();
});

When("user hover on amount", () => {
  cy.wait(5000);
  cy.xpath('//tbody/tr/td[6]//span[@container="body"]')
    .last()
    .realHover("mouse");
  cy.wait(3000);
});

Then("tooltip should be visible", () => {
  cy.get(docManagementPage.tooltip).should("be.visible");
});
