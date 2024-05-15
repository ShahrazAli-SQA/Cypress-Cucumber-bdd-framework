import { When, Then, Given, And } from "cypress-cucumber-preprocessor/steps";
import { transactionPage } from "../pages/transactionsPage";
import { investorPage } from "../constant/Investor";

let roundPrice = "";
let totalPrice = "";
let transactionId = "";

Given("Login investors portal and click transactions tab", () => {
  investorPage.login();
  cy.xpath(transactionPage.transactionTab).click();
  cy.get(transactionPage.pageLabel).should("have.text", "Transcation Listing");
});

When("user click on purchase now button", () => {
  cy.xpath(transactionPage.purchaseNowBtn).first().click();
});

Then("user should be on projects page", () => {
  cy.get(transactionPage.pageLabel).contains("Projects").should("be.visible");
});

And("select ownership plan", () => {
  cy.xpath(transactionPage.proceedNowBtn).click();
});

Then("user should be able to select area", () => {
  investorPage.verifyPageTitle("Select Area");
});

When("user select arae to pledge", () => {
  cy.xpath(transactionPage.roundPrice)
    .invoke("text")
    .then((text) => {
      roundPrice = parseInt(text.replace(/[^0-9]/g, ""), 10);
      cy.get(transactionPage.areaInput).clearAndType("100");
      totalPrice = roundPrice * 100;
      cy.get(transactionPage.totalPrice)
        .invoke("val")
        .then((price) => {
          price = parseInt(price.replace(/[^\d]/g, ""));
          expect(totalPrice).to.be.equal(price);
        });
    });
});

And("click on purchase now button", () => {
  cy.xpath(transactionPage.purchaseNowBtn).first().click();
  cy.log(roundPrice);
  cy.log(totalPrice);
});

Then("user can see installment plan", () => {
  investorPage.verifyPageTitle("Instalment Plan");
});

When("user click on purchase button", () => {
  cy.xpath(transactionPage.purchaseBtn).click();
});

Then("user can see order summary", () => {
  cy.get(transactionPage.orderSummary)
    .should("be.visible")
    .and("have.text", "Order Summary");
});

When("user check the order summary", () => {
  cy.get(transactionPage.transactionSummary)
    .first()
    .find("p")
    .last()
    .invoke("text")
    .then((text) => {
      cy.log(text);
      text = parseInt(text.replace(/[^0-9]/g, ""), 10);
      cy.log(text);
      expect(text).to.be.equal(100);
    });
  cy.get(transactionPage.transactionSummary)
    .eq(2)
    .find("p")
    .last()
    .invoke("text")
    .then((text) => {
      cy.log(text);
      text = parseInt(text.replace(/[^0-9]/g, ""), 10);
      cy.log(text);
      expect(text).to.be.equal(roundPrice);
    });
  cy.get(transactionPage.transactionSummary)
    .last()
    .find("p")
    .last()
    .invoke("text")
    .then((text) => {
      cy.log(text);
      text = parseInt(text.replace(/[^0-9]/g, ""), 10);
      cy.log(text);
      expect(text).to.be.equal(totalPrice);
    });
});

And("accept terms and condition", () => {
  cy.get(transactionPage.checkbox).click();
});

Then("transaction should created successfully", () => {
  cy.xpath(transactionPage.requestSuccessIcon).should("be.visible");
  cy.xpath(transactionPage.transactionId)
    .invoke("text")
    .then((text) => {
      transactionId = text;
    });
});

When("user click on see transactions button", () => {
  cy.xpath(transactionPage.seeTransactionBtn).first().click();
});

Then("user should be on transactions module", () => {
  investorPage.verifyPageTitle("Transactions");
});

And("can see the created transaction", () => {
  cy.xpath(transactionPage.firstTransId)
    .invoke("text")
    .then((text) => {
      expect(text).to.be.equal(transactionId);
    });
});

When("user click on created transaction", () => {
  cy.xpath(transactionPage.firstTransId)
    .invoke("text")
    .then((text) => {
      expect(text).to.be.equal(transactionId);
    });
  cy.xpath(transactionPage.firstTransId).click();
});

When("user select banking details", () => {
  cy.xpath(transactionPage.yesBtn).click();
  cy.get(transactionPage.bankDetails).first().click();
  cy.xpath(transactionPage.continueBtn).click();
});

And("upload transaction reciept", () => {
  const filePath = "testing.jpg";
  cy.get(transactionPage.imageInput).attachFile(filePath);
});

And("click on submit for verification button", () => {
  cy.xpath(transactionPage.submitForVerificationBtn).click();
});

Then("transaction should confirmed", () => {
  cy.get(transactionPage.successMessage).should("be.visible");
});

When("user click on discarded transaction toggle", () => {
  cy.get(transactionPage.toggleBtn).click();
});

Then("user toggle should turn on", () => {
  cy.get(transactionPage.toggleBtn).should("have.attr", "aria-checked", "true");
});

And("discarded trasnaction should be visible", () => {
  cy.get(transactionPage.transactionTable).should("be.visible");
});

When("user click on global transactions tab", () => {
  cy.get(transactionPage.matTabs).contains("Global Transactions").click();
});

Then("user can see global transactions", () => {
  cy.xpath(transactionPage.transactionTab).should("be.visible");
});

When("user click on filter dropdown button", () => {
  cy.get(transactionPage.dropdownArrow).click();
});

And("select {string} filter", (filter) => {
  if (filter === "DKV") {
    cy.get(transactionPage.dropdownoption).contains(" DKV ").click();
  } else if (filter === "UD") {
    cy.get(transactionPage.dropdownoption).contains(" UD ").click();
  } else if (filter === "ER") {
    cy.get(transactionPage.dropdownoption).contains(" ER ").click();
  }
});

Then("all transactions should be related to {string}", (filter) => {
  const textArray = [];
  cy.xpath(transactionPage.projectsColumn)
    .each(($element) => {
      const text = $element.text();
      textArray.push(text);
    })
    .then(() => {
      investorPage.checkFilter(textArray, filter);
    });
});

When("user click on on toggle button", () => {
  cy.get(transactionPage.toggleBtn)
    .first()
    .should("have.attr", "aria-checked", "false");
  cy.get(transactionPage.toggleBtn).first().click();
});

Then("toggle should turn on", () => {
  cy.get(transactionPage.toggleBtn)
    .first()
    .should("have.attr", "aria-checked", "true");
});

When("user create transaction", () => {
  investorPage.crteateTransaction();
});

And("user click on meatball action button", () => {
  cy.get(transactionPage.meatballBtn).first().click();
});

Then("action menu should be visible", () => {
  cy.get(transactionPage.actionMenu).should("be.visible");
});

When("user click on discard transaction button", () => {
  cy.get(transactionPage.actionMenu)
    .find("button")
    .contains(" Discard Transaction ")
    .click();
});

Then("password require popup should be visible", () => {
  cy.get(transactionPage.popup).should("be.visible");
});

When("user type required value in input field", () => {
  cy.get(transactionPage.passwordInput).type("DELETE ME");
});

And("click on submit button", () => {
  cy.xpath(transactionPage.submitBtn).click();
});

Then("transaction should be discarded", () => {
  cy.get('[id="toastr-container"]').should("be.visible");
});

And("click on no thanks button", () => {
  cy.xpath(transactionPage.noThanksBtn).click();
});

Then("password require popup should disappear", () => {
  cy.get(transactionPage.popup).should("not.exist");
});

When("user open any panding transaction", () => {
  cy.xpath(transactionPage.pendingTransaction).first().click();
});

Then("confirm transaction popup window should be visible", () => {
  cy.get(transactionPage.transferPopup).should("be.visible");
  cy.get(transactionPage.transferPopup)
    .find("h4")
    .contains("Confirm Transfer")
    .should("be.visible");
});

When("user close the popup window", () => {
  cy.get(transactionPage.transferPopup).find("button").first().click();
});

And("click on confirm transaction button", () => {
  cy.xpath(transactionPage.confirmTransferBtn).click();
});

When("user click on submit reciepts", () => {
  cy.xpath(transactionPage.submitRecieptBtn).first().click();
});

Then("user should be able to see transaction details", () => {
  cy.get(transactionPage.transactionDetails)
    .find("h3")
    .contains("Transaction Details")
    .should("be.visible");
});

When("user click on transaction summary button", () => {
  cy.xpath(transactionPage.transactionSummaryBtn).click();
});

Then("user should be on reports page", () => {
  investorPage.verifyPageTitle("Reports");
});

And("different reports options should be available", () => {
  cy.get(transactionPage.reportItems).its("length").should("equal", 3);
  cy.get(transactionPage.reportItems)
    .find(".heading")
    .contains("Investment Summary")
    .should("be.visible");
  cy.get(transactionPage.reportItems)
    .find(".heading")
    .contains("Transaction Report")
    .should("be.visible");
  cy.get(transactionPage.reportItems)
    .find(".heading")
    .contains("Investment Certificate")
    .should("be.visible");
});

When("user click on statement logs tab", () => {
  cy.get(transactionPage.matTabs).contains("STATEMENT LOGS").click();
});

Then("user can see statement logs", () => {
  cy.get(transactionPage.logTable).should("be.visible");
});

When("user click on next button", () => {
  cy.get(transactionPage.nextPageBtn).first().click();
});

Then("user should be on page {string}", (page) => {
  if (page === "2") {
    cy.get(transactionPage.pagination)
      .first()
      .find("li")
      .eq(3)
      .find("span")
      .contains("You're on page ");
  } else if (page === "1") {
    cy.get(transactionPage.pagination)
      .first()
      .find("li")
      .eq(2)
      .find("span")
      .contains("You're on page ");
  }
});

When("user click on previous button", () => {
  cy.get(transactionPage.previousPageBtn).first().click();
});

When("user click on page {string} button", (page) => {
  if (page === "2") {
    cy.get(transactionPage.pagination).first().find("li").eq(3).click();
  } else if (page === "1") {
    cy.get(transactionPage.pagination).first().find("li").eq(2).click();
  }
});
