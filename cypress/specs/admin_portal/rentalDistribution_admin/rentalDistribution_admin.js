import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import { adminPage } from "../constant/admin";
import { rentalPage } from "../pages/rentalDistributionPage";

Given("login admin portal and visit rental distribution module", () => {
  adminPage.login();
  cy.xpath(rentalPage.rentalDistributionTab).click();
  adminPage.verifyPageTitle("Rental Distribution");
});

When("user click on project filter", () => {
  cy.xpath(rentalPage.projectFilterBtn).click();
});

Then("filter options should be visible", () => {
  cy.get(rentalPage.dropDownMenu).should("be.visible");
});

When("uncheck all cehckbox and select {string} project", (filter) => {
  cy.get(rentalPage.projectFilterItems).contains("All").click();
  cy.get(rentalPage.projectFilterItems).contains(filter).click();
});

And("click on apply button", () => {
  cy.xpath(rentalPage.applyBtn).click();
});

Then("filter should be applied", () => {
  cy.get(rentalPage.tableRow).waitForElement();
  cy.xpath(rentalPage.projectFilterBtn).should("contain.text", "DKV");
});

And("filterd project should be displayed in the table", () => {
  cy.xpath(rentalPage.projectNameindex).should("have.text", "DKV");
});

When("user unckeck all cehckboxes", () => {
  cy.get(rentalPage.projectFilterItems).contains("All").click();
});

Then("{string} should be visible", (filter) => {
  cy.get(rentalPage.noRentalDisbursments).contains(filter).should("be.visible");
});

When("user click on filtered project", () => {
  cy.get(rentalPage.tableRow).first().click();
});

Then("user should navigate to {string} project details", (project) => {
  cy.wait(2000);
  adminPage.verifyPageTitle(project);
});

When("user click on generate batch report button", () => {
  cy.xpath(rentalPage.generatebatchReportBtn).click();
});

And("click on batch report item", () => {
  cy.xpath(rentalPage.batchReportItem).first().click();
});

Then("batch report should be generated", () => {
  cy.get(rentalPage.toastMessage)
    .should("be.visible")
    .and("contain.text", "We are generating batch report");
});

When("user select the project", () => {
  cy.xpath(rentalPage.generateInvoiceBtn).should("be.disabled");
  cy.xpath(rentalPage.checkInvoice).eq(2).click();
});

And("click on generate invoice button", () => {
  cy.xpath(rentalPage.generateInvoiceBtn)
    .should("be.visible")
    .and("be.enabled")
    .click();
});

And("click on modal generate invoice button", () => {
  cy.xpath(rentalPage.generateInvoiceModalBtn)
    .should("be.visible")
    .and("be.enabled")
    .click();
});

Then("generate invoice modal window should be visible", () => {
  cy.xpath(rentalPage.generateInvoiceModal).should("be.visible");
});

Then("invoice should be generated and moved to {string}", (tab) => {
  cy.get(rentalPage.doneScreen)
    .should("be.visible")
    .find("p")
    .contains(tab)
    .should("be.visible");
  cy.get(rentalPage.doneScreen).should("be.visible").find("button").click();
});

And("click on {string} action button", (button) => {
  cy.get(rentalPage.generateInvoiceAction)
    .contains(button)
    .should("be.visible")
    .click();
});

When("user selct one payout", () => {
  cy.get(rentalPage.payoutCheckBox).first().click();
  cy.get(rentalPage.payoutCheckBox)
    .first()
    .should("have.class", "mat-checkbox-checked");
});

And("click on clear selection button", () => {
  cy.xpath(rentalPage.clearSelectionBtn).should("be.visible").click();
});

Then("selcted payout should be unselect", () => {
  cy.get(rentalPage.payoutCheckBox)
    .first()
    .should("not.have.class", "mat-checkbox-checked");
});

Then("user select all payout", () => {
  cy.xpath(rentalPage.checkAllpayouts).click();
  cy.xpath(rentalPage.checkAllpayouts).should(
    "have.class",
    "mat-checkbox-checked",
  );
  cy.get(rentalPage.payoutCheckBox).each(($element) => {
    cy.wrap($element).should("have.class", "mat-checkbox-checked");
  });
});

Then("selcted all payouts should be unselect", () => {
  cy.xpath(rentalPage.checkAllpayouts).should(
    "not.have.class",
    "mat-checkbox-checked",
  );
  cy.get(rentalPage.payoutCheckBox).each(($element) => {
    cy.wrap($element).should("not.have.class", "mat-checkbox-checked");
  });
});

When("user click on filter button", () => {
  cy.xpath(rentalPage.filterBtn).click({ force: true });
});

And("select {string} bank filter", (bank) => {
  cy.xpath(rentalPage.payoutFilters).contains("Bank").click();
  cy.xpath(rentalPage.payoutFilters)
    .contains("Bank")
    .parent()
    .should("have.attr", "aria-expanded", "true");
  cy.get(rentalPage.filterCheckItems).contains("All").click();
  cy.get(rentalPage.filterCheckItems).contains(bank).click();
  cy.get(rentalPage.filterCheckItems)
    .contains(bank)
    .should("not.have.class", "mat-checkbox-checked");
});

And("click apply button", () => {
  cy.xpath(rentalPage.applyBtn).click();
});

Then("bank filter should be applied", () => {
  cy.xpath(rentalPage.resetFilterBtn).should("be.visible");
  cy.xpath(rentalPage.bankNameIndex).each(($element) => {
    cy.wrap($element).should("contain.text", "UBL");
  });
});

When("user click on reset filter button", () => {
  cy.xpath(rentalPage.resetFilterBtn).click();
});

Then("applied filters should be reset", () => {
  cy.xpath(rentalPage.resetFilterBtn).should("not.exist");
  cy.xpath(rentalPage.payoutFilters)
    .contains("Banks")
    .should("contain.text", "All Banks");
});

And("click on {string} status tab", (roleTab) => {
  cy.get(rentalPage.payoutStatusTabs).contains(roleTab).click();
  cy.get(rentalPage.payoutStatusTabs)
    .contains(roleTab)
    .parent()
    .should("have.attr", "aria-selected", "true");
});

And("select bank and batch filter", () => {
  cy.xpath(rentalPage.payoutFilters).contains("Bank").click();
  cy.xpath(rentalPage.payoutFilters)
    .contains("Bank")
    .parent()
    .should("have.attr", "aria-expanded", "true");
  cy.get(rentalPage.filterCheckItems).contains("All").click();
  cy.get(rentalPage.filterCheckItems).last().click();
  cy.xpath(rentalPage.payoutFilters).contains("Select Batch").click();
  cy.get(rentalPage.batchFiulterItems).contains("Batch 7").click();
});

Then("batch filter and bank filters should be reset", () => {
  cy.xpath(rentalPage.resetFilterBtn).should("not.exist");
  cy.xpath(rentalPage.payoutFilters)
    .contains("Banks")
    .should("contain.text", "All Banks");
  cy.xpath(rentalPage.payoutFilters)
    .contains("Batch")
    .should("contain.text", "Select Batch");
});

When("user click on meatball action button", () => {
  cy.xpath(rentalPage.meatballBtn).first().click();
});

And("click on revert to due button", () => {
  cy.xpath(rentalPage.revertToDUeBtn).should("be.visible").click();
});

Then("modal window should be appear", () => {
  cy.xpath(rentalPage.revrtModal).should("be.visible");
});

And("user selct {string} reason for revert", (option) => {
  cy.get(rentalPage.reasonDropdown).click();
  cy.get(rentalPage.reasonsOption).contains(option).click();
  cy.get(rentalPage.reasonDropdown).should("contain.text", option);
});

And("add a comment", () => {
  cy.get(rentalPage.commentBox).type("We are testing");
});

And("click on inform holder button", () => {
  cy.xpath(rentalPage.informHolderBtn).should("be.enabled").click();
});

Then("payout should be revert and holder should be informed", () => {
  cy.xpath(rentalPage.successsfulyInformed)
    .should("be.visible")
    .and("have.text", "Successfully Informed! ");
});

When("user click on specific mark paid button", () => {
  cy.xpath(rentalPage.markPaidBtn).first().click();
});

Then("mark paid modal should be visible", () => {
  cy.xpath(rentalPage.markPaidModal).should("be.visible");
});

When("user add attachment for the payout", () => {
  const filePath = "testing.jpg";
  cy.get(rentalPage.addAttachment).attachFile(filePath);
  cy.xpath(rentalPage.addAttachmentColumn)
    .find("p")
    .contains(filePath)
    .should("be.visible");
});

And("click on proceed button", () => {
  cy.xpath(rentalPage.proceedBtn).should("be.enabled").click();
});

Then("payout should be paid successfully", () => {
  cy.get(rentalPage.toastMessage)
    .should("be.visible")
    .and("contain.text", "Users invoices has been marked as paid successful.");
});

When("user select multiple payouts", () => {
  cy.get(rentalPage.payoutCheckBox).eq(0).click();
  cy.get(rentalPage.payoutCheckBox).eq(1).click();
});

And("click on multiple mark paid button", () => {
  cy.xpath(rentalPage.multipleMarkPaidBtn).should("be.enabled").click();
});

When("user add attachment for all payout", () => {
  const filePath = "testing.jpg";
  cy.get(rentalPage.addAttachment).each(($element) => {
    cy.wrap($element).attachFile(filePath);
  });
  cy.xpath(rentalPage.addAttachmentColumn).each(($element) => {
    cy.wrap($element).find("p").contains(filePath).should("be.visible");
  });
});

When("user click on download button", () => {
  cy.xpath(rentalPage.downloadBtn).click();
});

And("select {string} from the dropdown", (batch) => {
  cy.get(rentalPage.downloadBatchItem).contains(batch).click();
});

Then("batch report should be download", () => {
  cy.wait(2000);
  cy.readFile("C:/Users/Shery/Downloads/*", "utf-8").then((fileContents) => {
    expect(fileContents).to.include("-68f1-11ee-8bc1-5f414c316020.csv");
  });
});

Then("bank and batch filter should be applied", () => {
  cy.xpath(rentalPage.resetFilterBtn).should("be.visible");
});

When(
  "user click on the meatball action button, having no banking details",
  () => {
    cy.xpath(rentalPage.noBankinDetail)
      .first()
      .parent()
      .find("button")
      .first()
      .click();
  },
);

Then("generate invoice button should be disabled", () => {
  cy.get(rentalPage.generateInvoiceAction).find("button").should("be.visible");
});

And("click on edit tax button", () => {
  cy.get(rentalPage.dropdownOptions).contains("Edit Tax").click();
});

Then("edit tax modal should be visible", () => {
  cy.xpath(rentalPage.editTaxModal).should("be.visible");
});

When("user click on modal meatball action button", () => {
  cy.xpath(rentalPage.modalMeatballBtn).click();
});

And("edit the tax click on click on green tick icon", () => {
  cy.get(rentalPage.taxInput).clearAndType("10");
  cy.get(rentalPage.tickIcon).click();
});

Then("tax should be updated", () => {
  cy.get(rentalPage.taxValue).should("contain.text", "- 10");
});

When("user click on skipped holders tab", () => {
  cy.get(rentalPage.skippedTab).click();
});

Then("skipped payouts should eb visible", () => {
  cy.xpath(rentalPage.skippedPayoutTable).should("be.visible");
});

And("remove the attachment", () => {
  cy.xpath(rentalPage.markPaidModal).find("tr").first().find("button").click();
  cy.get(rentalPage.generateInvoiceAction)
    .contains("Remove Attachment")
    .should("be.visible")
    .click();
  cy.xpath(rentalPage.addAttachmentColumn).should(
    "contains.text",
    " Add Attachment ",
  );
});

When("user click on  {string} tab", (tab) => {
  cy.get(rentalPage.payoutTabs).contains(tab).click();
  cy.get(rentalPage.payoutTabs).contains(tab).should("have.class", "active");
});

Then("holders table should be visible", () => {
  cy.get(rentalPage.holdersTable).should("be.visible");
});

When("When user search holders user {string}", (search) => {
  if (search === "username") {
    cy.xpath(rentalPage.holdersName)
      .first()
      .find("p")
      .invoke("text")
      .then((text) => {
        cy.xpath(rentalPage.searchHolder).type(text);
        cy.wrap(text).as("searched");
      });
  } else if (search === "id") {
    cy.xpath(rentalPage.holdersId)
      .first()
      .find("span")
      .invoke("text")
      .then((text) => {
        cy.xpath(rentalPage.searchHolder).type(text);
        cy.wrap(text).as("searched");
      });
  }
});

Then("shearched holder should be visible", () => {
  cy.get("@searched").then((searched) => {
    cy.xpath(rentalPage.holdersTable)
      .first()
      .find("td")
      .contains(searched)
      .should("be.visible");
  });
});

When("user click on search payout", () => {
  cy.xpath(rentalPage.holdersTable).find("tr").first().click();
});

Then("user can see payout history for the searched holder", () => {
  cy.xpath(rentalPage.holderPayoutHistory).should("be.visible");
});

Then("payout history table should be visible", () => {
  cy.xpath(rentalPage.historyTable).should("be.visible");
});

When("user search payout", () => {
  cy.xpath(rentalPage.searchHolder).type("1");
});

Then("searched payout should be visible", () => {
  cy.xpath(rentalPage.historyTable).find("tr").should("be.visible");
});

When("user click on payout history instance", () => {
  cy.xpath(rentalPage.historyTable).find("tr").first().click();
});

Then("user can see attachnemts", () => {
  cy.xpath(rentalPage.modalWindow).should("be.visible");
  cy.xpath(rentalPage.modalWindow)
    .find("tr")
    .first()
    .find("td")
    .contains("Attachments")
    .should("be.visible");
});

And("user click on generate rental report button", () => {
  cy.xpath(rentalPage.generateRenatalReportBtn).click();
});

Then("{string} should be visible", (report) => {
  cy.get(rentalPage.rentalReportOption).contains(report).should("be.visible");
});
