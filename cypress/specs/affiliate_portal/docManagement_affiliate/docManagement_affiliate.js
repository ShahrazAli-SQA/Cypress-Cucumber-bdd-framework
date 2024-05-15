import { When, Then, And, Given } from "cypress-cucumber-preprocessor/steps";
import { affiliatePage } from "../constant/Affiliate";
import { docManagementPage } from "../pages/docManagementPage";
import "cypress-real-events/support";
import { UsersPage } from "../pages/usersPage";

let username = "";
let email = "";
let phoneNo = "";
let cnic = "";

const testComment = "This is test comment, we are testing.";
const testNote = "This is test note, we are testing.";

Given("user login to affiliate portal and visit doc management page", () => {
  affiliatePage.login();
  cy.xpath(docManagementPage.docManagementTab).click();
  affiliatePage.verifyPageTitle("Document Management");
});

When("user click on Create investment plan button", () => {
  cy.xpath(docManagementPage.createInvestmentPlanBtn).click();
});

Then("payment plan details page should be visible", () => {
  affiliatePage.verifyPageTitle("Payment Plan Details");
});

When("user select {string} currency from the currency dropdown", (currency) => {
  cy.get(docManagementPage.currencyDropdown).click();
  cy.get(docManagementPage.listBox).should("be.visible");
  if (currency === "PKR") {
    cy.get(docManagementPage.dropdownOption).contains("PKR ").click();
  } else if (currency === "USD") {
    cy.get(docManagementPage.dropdownOption).contains("USD ").click();
  } else if (currency === "AED") {
    cy.get(docManagementPage.dropdownOption).contains("AED ").click();
  }
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
  if (plan === "Buy to Own") {
    cy.get(docManagementPage.dropdown).eq(2).click();
    cy.get(docManagementPage.unitInput).click();
    cy.get(docManagementPage.unitInput).clearAndType("UD");
    cy.get(docManagementPage.unitItems).waitForElement();
    cy.get(docManagementPage.unitItems)
      .its("length")
      .then((length) => {
        const randomIndex = Math.floor(Math.random() * length);
        cy.get(docManagementPage.unitItems)
          .eq(randomIndex)
          .find("p")
          .first()
          .invoke("text")
          .then((text) => {
            const unit = text;
            cy.wrap(unit).as("unit");
          });
        cy.get(docManagementPage.unitItems)
          .eq(randomIndex)
          .find(".pill")
          .invoke("text")
          .then((text) => {
            const unitid = text;
            cy.wrap(unitid).as("unitid");
          });
        cy.get(docManagementPage.unitItems).eq(randomIndex).click();
      });
  } else if (plan === "Buy to Sell") {
    cy.get(docManagementPage.investmentAmountInput).click();
    cy.get(docManagementPage.investmentAmountInput).type("10000000");
    cy.wait(1000);
    cy.get(docManagementPage.investmentAmountInput).clearAndType("10000000");
  } else if (plan === "Buy to Earn") {
    cy.get(docManagementPage.investmentAmountInput).click();
    cy.get(docManagementPage.investmentAmountInput).type("10000000");
    cy.wait(1000);
    cy.get(docManagementPage.investmentAmountInput).clearAndType("10000000");
    cy.get(docManagementPage.yearlyReturnInput).clearAndType("5");
  } else if (plan === "Buy to Save") {
    cy.get(docManagementPage.investmentAmountInput).click();
    cy.get(docManagementPage.investmentAmountInput).type("40000");
    cy.wait(1000);
    cy.get(docManagementPage.investmentAmountInput).clearAndType("40000");
    cy.get(docManagementPage.monthlySavingInput).clearAndType("200000");
    cy.get(docManagementPage.dropdown).last().click();
    cy.get(docManagementPage.listBox)
      .its("length")
      .then((length) => {
        const randomIndex = Math.floor(Math.random() * length);
        cy.get(docManagementPage.listBox).eq(randomIndex).click();
      });
  }
});

Then("user should be see investment plan and summary", () => {
  affiliatePage.verifyPageTitle("Summary");
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

Then("user form should be visible", () => {
  affiliatePage.verifyPageTitle("Create User");
});

When("user input all the fields", () => {
  username = affiliatePage.generateUsername();
  cy.get(docManagementPage.userNameInput).click();
  cy.get(docManagementPage.userNameInput).type(username);
  cy.wait(1000);
  email = affiliatePage.generateEmail();
  cy.get(docManagementPage.emailInput).type(email);
  phoneNo = affiliatePage.generatePhoneNo();
  cy.get(docManagementPage.phoneNoInput).type(phoneNo);
  cnic = affiliatePage.generateCnic();
  cy.get(docManagementPage.cnicInput).type(cnic);
  cy.get(docManagementPage.genderInput).select("male");
  cy.wait(1000);
  cy.get(docManagementPage.investorsForm)
    .find("input")
    .eq(4)
    .clearAndType("Test@1234");
});

And("click on submit button", () => {
  cy.xpath(docManagementPage.submitBtn).should("be.enabled");
  cy.xpath(docManagementPage.submitBtn).click();
});

Then("success message should be visible", () => {
  cy.get(docManagementPage.toastMessage).should("be.visible");
});

When("user type usecase in the search field", () => {
  cy.wait(3000);
  cy.get(docManagementPage.searchInput).type("Buy to Own");
  cy.wait(3000);
});

Then("all searched instances should be related to that usecase", () => {
  cy.get(docManagementPage.tableRow).waitForElement();
  cy.xpath(docManagementPage.usecaseIndex)
    .its("length")
    .then((length) => {
      for (let index = 0; index < length; index++) {
        cy.xpath(docManagementPage.usecaseIndex)
          .eq(index)
          .invoke("text")
          .then((text) => {
            assert.equal(text, "Buy  to  Own");
          });
      }
    });
});

When("user click on approved tab", () => {
  cy.get(docManagementPage.tabList).find('[role="tab"]').eq(1).click();
  cy.get(docManagementPage.tableRow).should("be.visible");
});

When("move to the attachement column", () => {
  cy.get(docManagementPage.infiniteScroll).scrollTo("right");
});

Then("user should be able to see .pdf attachement", () => {
  cy.xpath('//td[@role="cell"]//a//span[text()="Plan.pdf"]').should(
    "be.visible",
  );
});

When("user click on view and approve button", () => {
  cy.get('[class="fas fa-angle-left"]').click({ force: true });
  cy.wait(1000);
  cy.xpath(docManagementPage.viewAndApproveBtn).click();
});

Then("payemnt plan should be visible", () => {
  affiliatePage.verifyPageTitle("Payment plan approval");
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
  affiliatePage.verifyPageTitle("Document Details");
});

When("user click on meetball button", () => {
  cy.get(docManagementPage.meetballBtn).click();
});

And("click on discard button", () => {
  cy.xpath(docManagementPage.meetballMenu).contains("Discard").click();
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
  affiliatePage.verifyPageTitle("Document Details");
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
