import { When, Then, And, Given } from "cypress-cucumber-preprocessor/steps";
import { transactionPage } from "../pages/transactionPage";
import { TESTDATA, affiliatePage } from "../constant/Affiliate";
import { expect } from "chai";
let transID = "";
let name = "";
let email = "";
let phone = "";
let cnic = "";
let investorId = "";
const note = "This is test note! We are testing";
const updatedNote = "Note is updated!";
Given("login affiliate portal and go to transactions page", () => {
  affiliatePage.login();
  cy.xpath(transactionPage.transactionTab).click();
  affiliatePage.verifyPageTitle("Transactions");
});

When("user click on pending tab", () => {
  cy.get(transactionPage.transactionTabs).first().click();
});

Then("corresponding Transactions should be visible", () => {
  cy.get(transactionPage.tableRow).waitForElement();
  cy.get(transactionPage.tableRow).should("be.visible");
  cy.get('[class="mat-tab-labels"]').then(($tabLabels) => {
    const selectedTab = $tabLabels.find('[role="tab"][aria-selected="true"]');
    const selectedTabText = selectedTab.find("span").text();
    const length = parseInt(selectedTabText);
    cy.log("Selected tab is: " + length);
    cy.get(transactionPage.tableRow).its("length").should("equal", length);
  });
});

When("user visit users page", () => {
  cy.xpath(transactionPage.usersTab).click();
  affiliatePage.verifyPageTitle("Users");
});

Then("user should create new investor", () => {
  name = affiliatePage.generateUsername();
  email = affiliatePage.generateEmail();
  phone = affiliatePage.generatePhoneNo();
  cnic = affiliatePage.generateCnic();
  affiliatePage.createInvestor(name, email, phone, cnic).then((investor) => {
    cy.log("Investor ID:", investor);
    investorId = investor;
    cy.wrap(investor).as("investorId");
  });
});

When("user click on verified tab", () => {
  cy.get(transactionPage.transactionTabs).eq(1).click();
});

When("user click on approved tab", () => {
  cy.get(transactionPage.transactionTabs).eq(2).click();
});

When("user click on locked tab", () => {
  cy.get(transactionPage.transactionTabs).eq(3).click();
});

When("user click on discarded tab", () => {
  cy.get(transactionPage.transactionTabs).last().click();
});

When("user click on create transaction button", () => {
  cy.xpath(transactionPage.createTransactionBtn).click();
});

Then("transaction menu should be visible", () => {
  cy.get(transactionPage.transactionMenu).should("be.visible");
});

When("user click on {string} transaction", (type) => {
  if (type === "partner plan") {
    cy.xpath(transactionPage.ppTransactionBtn).click();
  } else if (type === "peer to peer") {
    cy.xpath(transactionPage.ptpTransactionBtn).click();
  } else {
    throw new Error(`Unknown button: ${type}`);
  }
});

And("add project information", () => {
  cy.xpath(transactionPage.projectinput).click();
  cy.get(transactionPage.projectOption).find("span").last().click();
  cy.get(transactionPage.transactionType).click({ force: true });
  cy.get(transactionPage.transactionOption).first().click();
  cy.get(transactionPage.searchPeer).first().clearAndType("DAO-1094");
  cy.get(transactionPage.investorsList).first().click();
  cy.log(investorId);
  cy.get(transactionPage.searchPeer).last().click();
  cy.get(transactionPage.searchPeer).last().type(investorId);
  cy.get(transactionPage.investorsList).first().click();
  const randomNumber = Math.floor(Math.random() * 50) + 1;
  cy.get(transactionPage.peerAreaInput).clearAndType(randomNumber);
  cy.get(transactionPage.dropdown).last().click({ force: true });
  cy.get(transactionPage.listBox)
    .eq(Math.floor(Math.random() * 2))
    .click();
  cy.get(transactionPage.radioButton).last().children().eq(1).click();
  cy.get(transactionPage.radioButton)
    .last()
    .children()
    .eq(Math.floor(Math.random() * 2))
    .click();
});

Then("proceed button should be enabled", () => {
  cy.xpath(transactionPage.proceed).should("not.have.attr", "disabled");
});

When("user click on proceed button", () => {
  cy.xpath(transactionPage.proceed).click();
});

Then("user should be on otp modal", () => {
  affiliatePage.verifyPageTitle("OTP Verification");
});

Then("{string} transaction should created successfully", (type) => {
  if (type === "partner plan") {
    cy.get(transactionPage.toastMessage).should("be.visible");
    cy.get(transactionPage.transactionSuccess)
      .first()
      .should("be.visible")
      .and("have.text", " Your Transaction has been created Successfully! ");
    cy.get(transactionPage.transactionId)
      .first()
      .invoke("text")
      .then((tid) => {
        cy.wrap(tid).as("tid");
        transID = tid; // use transaction id as global
      });
  } else if (type === "peer to peer") {
    cy.get(transactionPage.toastMessage).should("be.visible");
  } else {
    throw new Error(`Unknown button: ${type}`);
  }
});

Then("user should be able to search investor for transaction", () => {
  cy.xpath(transactionPage.searchinvestor).should("be.visible");
});

When("user search investor id and agent name to create transaction", () => {
  cy.xpath(transactionPage.searchinvestor).clearAndType(investorId);
  cy.get(transactionPage.investorsList).first().click();
  cy.xpath(transactionPage.searchAgent).clearAndType(TESTDATA.agentName);
  cy.get(transactionPage.agentList).last().click();
});

And("click on proceed next button", () => {
  cy.get(transactionPage.procedNextBtn).should("not.have.attr", "disabled");

  cy.get(transactionPage.procedNextBtn).click();
});

Then("user should be able to add project information", () => {
  cy.xpath(transactionPage.projectinput)
    .invoke("css", "opacity", "1")
    .should("be.visible");
});

When("user add project information and discounted ammount", () => {
  cy.xpath(transactionPage.projectinput).click();
  cy.get(transactionPage.projectOption).find("span").last().click();
  cy.get(transactionPage.transactionType).click({ force: true });
  cy.get(transactionPage.transactionOption).first().click();
  cy.get(transactionPage.selectRound).last().click({ force: true });
  cy.get(transactionPage.roundoption).eq(1).click();
  // check amount before selecting area
  cy.get(transactionPage.amount).eq(3).getValueAndCompare(0);
  cy.get(transactionPage.amount).eq(4).getValueAndCompare(0);
  cy.get(transactionPage.amount).eq(5).getValueAndCompare(0);
  cy.xpath(transactionPage.areaInput).clearAndType("100");
  cy.xpath(transactionPage.rateAdjustInput)
    .invoke("val")
    .then((rate) => {
      const amount = rate * 100;
      cy.wrap(amount).as("totalAmount");
      // check amount after selecting area
      cy.get(transactionPage.amount).eq(3).getValueAndCompare(amount);
      cy.get(transactionPage.amount).eq(4).getValueAndCompare(0);
      cy.get(transactionPage.amount).eq(5).getValueAndCompare(amount);

      cy.get(transactionPage.duedate).setDateInFuture();
      cy.get(transactionPage.percentageBtn).first().click();
      cy.get(transactionPage.percentageBtn).eq(1).click();
      const randomNumber = Math.floor(Math.random() * 10) + 1;
      cy.xpath(transactionPage.discountAmmount).clearAndType(randomNumber);
      // check amount after selecting discount
      cy.get(transactionPage.amount).eq(3).getValueAndCompare(amount);
      cy.get(transactionPage.amount).eq(4).verifyDiscount(amount, randomNumber);
      cy.get(transactionPage.amount)
        .eq(5)
        .verifyDiscountedAmount(amount, randomNumber);
    });
});

And("click proceed next button", () => {
  cy.get(transactionPage.inputGroup)
    .eq(2)
    .find("input")
    .last()
    .invoke("val")
    .then((rate) => {
      rate = parseInt(rate.split(".")[0], 10);
      cy.wrap(rate).as("rate");
    });
  cy.get(transactionPage.amount)
    .eq(3)
    .invoke("text")
    .then((actualAmount) => {
      actualAmount = parseInt(actualAmount.replace(/[^0-9]/g, ""), 10);
      cy.wrap(actualAmount).as("actualAmount");
    });
  cy.get(transactionPage.amount)
    .eq(4)
    .invoke("text")
    .then((totalDiscount) => {
      cy.log(totalDiscount);
      totalDiscount = parseInt(totalDiscount.replace(/[^0-9]/g, ""), 10);
      cy.wrap(totalDiscount).as("totalDiscount");
    });
  cy.get(transactionPage.amount)
    .eq(5)
    .invoke("text")
    .then((amountToBePaid) => {
      amountToBePaid = parseInt(amountToBePaid.replace(/[^0-9]/g, ""), 10);
      cy.wrap(amountToBePaid).as("amountToBePaid");
    });
  cy.xpath(transactionPage.proceedBtn).last().click();
});

Then("user should be able to see transaction summary", () => {
  affiliatePage.verifyPageTitle("Transaction Summary");
  cy.get(transactionPage.rate)
    .invoke("text")
    .then((text) => {
      text = parseInt(text.replace(/[^0-9]/g, ""), 10);
      cy.log(text);
      cy.get("@rate").then((rate) => {
        expect(text).to.equal(rate);
      });
    });

  cy.get(transactionPage.amount)
    .eq(8)
    .invoke("text")
    .then((text) => {
      text = parseInt(text.replace(/[^0-9]/g, ""), 10);
      cy.get("@actualAmount").then((actualAmount) => {
        expect(actualAmount).to.equal(text);
      });
    });

  cy.get(transactionPage.amount)
    .eq(9)
    .invoke("text")
    .then((text) => {
      text = parseInt(text.replace(/[^0-9]/g, ""), 10);
      cy.get("@totalDiscount").then((totalDiscount) => {
        expect(totalDiscount).to.equal(text);
      });
    });

  cy.get(transactionPage.amount)
    .eq(10)
    .invoke("text")
    .then((text) => {
      text = parseInt(text.replace(/[^0-9]/g, ""), 10);
      cy.get("@amountToBePaid").then((amountToBePaid) => {
        expect(amountToBePaid).to.equal(text);
      });
    });
});

When("user click on create transaction now button", () => {
  cy.xpath(transactionPage.createTransactionNow).click();
});

When("user search transaction id in search field", () => {
  cy.get(transactionPage.tableRow).waitForElement();
  cy.log(transID);
  const tid = parseInt(transID.replace(/[^0-9]/g, ""), 10);
  cy.get(transactionPage.searchInput).clear();
  cy.wait(2000);
  cy.get(transactionPage.searchInput).type(tid);
  cy.get(transactionPage.tableRow).waitForElement();
});

And("click on first instance", () => {
  cy.get(transactionPage.tableRow).waitForElement();
  // cy.get(transactionPage.transactionInstance).should('have.length', '1');
  cy.get(transactionPage.transactionInstance).first().click();
});

Then("user can verify the created transaction", () => {
  cy.get(transactionPage.transactionDetail).first().should("be.visible");
  cy.get(transactionPage.transactionDetail)
    .eq(1)
    .invoke("text")
    .then((text) => {
      text = text.trim();
      expect(text).to.equal(transID);
    });
});

Then("edit transaction page should be visible", () => {
  affiliatePage.verifyPageTitle("Edit Transaction");
});

When("user edit transaction information", () => {
  cy.get(transactionPage.transactionType).click({ force: true });
  cy.get(transactionPage.transactionOption).first().click();
  cy.get(transactionPage.selectRound).last().click({ force: true });
  cy.get(transactionPage.roundoption).eq(1).click();

  cy.get(transactionPage.inputGroup)
    .eq(2)
    .find("input")
    .last()
    .invoke("val")
    .then((rate) => {
      const amount = rate * 100;
      cy.log(amount);
      cy.wrap(amount).as("totalAmount");
      cy.get(transactionPage.inputGroup)
        .eq(2)
        .find("input")
        .first()
        .clearAndType("100");
      cy.get(transactionPage.duedate).setDateInFuture();
      cy.get(transactionPage.percentageBtn).first().click();
      cy.get(transactionPage.percentageBtn).eq(1).click();
      const randomNumber = Math.floor(Math.random() * 10) + 1;
      cy.xpath(transactionPage.discountAmmount).clearAndType(randomNumber);
      // check amount after selecting discount
      cy.get(transactionPage.amount).eq(3).getValueAndCompare(amount);
      cy.get(transactionPage.amount).eq(4).verifyDiscount(amount, randomNumber);
      cy.get(transactionPage.amount)
        .eq(5)
        .verifyDiscountedAmount(amount, randomNumber);
    });
});

When("user click on update transaction button", () => {
  cy.xpath(transactionPage.updateTransactionBtn).click();
});

Then("transaction should be updated successfully", () => {
  cy.get(transactionPage.toastMessage).should("be.visible");
});

When("user click on verify transaction button", () => {
  cy.xpath(transactionPage.verifyTransactionBtn).click();
});

Then("update transaction status screen should be visible", () => {
  cy.viewport(640, 480);
  cy.get(transactionPage.heading).contains(" Update status ").scrollIntoView();
  affiliatePage.verifyPageTitle("Update status");
});

When("user click on update status button", () => {
  cy.xpath(transactionPage.updateStatusBtn).click();
});

Then("transaction should updated and moved to verified tab", () => {
  cy.get(transactionPage.toastMessage).should("be.visible");
  cy.get(transactionPage.transactionTabs).eq(1).click();
  cy.get(transactionPage.tableRow).waitForElement();
  cy.log(transID);
  const tid = parseInt(transID.replace(/[^0-9]/g, ""), 10);
  cy.get(transactionPage.searchInput).clearAndType(tid);
});

When("user click on days filter button", () => {
  cy.get(transactionPage.daysFilterBtn).click();
  cy.get(transactionPage.daysFilterMenu).should("be.visible");
});

And("select Last {string} days filter option", (days) => {
  if (days === "15") {
    cy.get(transactionPage.daysFilterMenu)
      .find("button")
      .contains("Last 15 Days")
      .click();
  } else if (days === "7") {
    cy.get(transactionPage.daysFilterMenu)
      .find("button")
      .contains("Last 7 Days")
      .click();
  } else if (days === "30") {
    cy.get(transactionPage.daysFilterMenu)
      .find("button")
      .contains("Last 30 Days")
      .click();
  }
});

Then("Last {string} days should be selected", (days) => {
  if (days === "15") {
    cy.get(transactionPage.daysFilterBtn)
      // .find("button")
      // .first()
      .invoke("text")
      .then((text) => {
        expect(text).to.equal(" Last 15 Days");
      });
  } else if (days === "7") {
    cy.get(transactionPage.daysFilterBtn)
      // .find("button")
      // .first()
      .invoke("text")
      .then((text) => {
        expect(text).to.equal(" Last 7 Days");
      });
  } else if (days === "30") {
    cy.get(transactionPage.daysFilterBtn)
      // .find("button")
      // .first()
      .invoke("text")
      .then((text) => {
        expect(text).to.equal(" Last 30 Days");
      });
  }
});

When("user search transaction id", () => {
  cy.xpath(transactionPage.transactioIdIndex)
    .invoke("text")
    .then((text) => {
      const transID = text.replace(/\s/g, "");
      cy.get(transactionPage.searchInput).clearAndType(transID);
      cy.wrap(transID).as("transID");
    });
});

And("click on action dropdown button", () => {
  cy.xpath(transactionPage.actionDropdown)
    .first()
    .scrollIntoView({ behaviour: "smooth", block: "end", inline: "end" });
  cy.xpath(transactionPage.actionDropdown).first().click({ force: true });
});

Then("dropdown should be visible", () => {
  cy.get(transactionPage.actionDropdownMenu).should("be.visible");
});

When("user select {string} option", (option) => {
  if (option === "discard") {
    cy.get(transactionPage.actionDropdownMenu)
      .find("button")
      .contains(" Discard ")
      .click();
  } else if (option === "add agent") {
    cy.get(transactionPage.actionDropdownMenu)
      .find("button")
      .contains(" Add Agent ")
      .click();
  } else if (option === "add/view notes") {
    cy.get(transactionPage.actionDropdownMenu)
      .find("button")
      .contains(" Add / View Notes ")
      .click();
  } else if (option === "Add/Modify Documents") {
    cy.get(transactionPage.actionDropdownMenu)
      .find("button")
      .contains(" Add/Modify Documents ")
      .click();
  } else if (option === "Edit Transaction") {
    cy.get(transactionPage.actionDropdownMenu)
      .find("button")
      .contains(" Edit Transaction ")
      .click();
  }
});

And("type note and click on discard transaction button", () => {
  cy.get(transactionPage.addNote).clearAndType("Test note, we are testing");
  cy.xpath(transactionPage.discardTransactionBtm).should(
    "not.have.attr",
    "disabled",
  );
  cy.get(".right-sidebar .font-sb")
    .invoke("text")
    .then((text) => {
      const transID = text;
      cy.wrap(transID).as("transID");
    });
  cy.xpath(transactionPage.discardTransactionBtm).click();
});

Then("transaction should be discarded successfully", () => {
  cy.get(transactionPage.toastMessage).should("be.visible");
  cy.get(transactionPage.transactionTabs).last().click();
  cy.get("@transID").then((transID) => {
    cy.get(transactionPage.searchInput).clearAndType(transID);
  });
  // cy.get(transactionPage.tableRow).its('length').should('equal', 1);
});

And("search for agent and click on add agent button", () => {
  cy.get(transactionPage.addAgentInput).waitForElement();
  cy.get(transactionPage.addAgentInput).type("{selectall}{backspace}");
  cy.get(transactionPage.addAgentInput).type(TESTDATA.agentName);
  cy.get(transactionPage.agentOption).click();
  cy.xpath(transactionPage.addAgentBtn).click();
});

Then("agent should be added", () => {
  cy.get(transactionPage.toastMessage).should("be.visible");
});

And("type note and click on add button", () => {
  cy.get(transactionPage.dropdownBtn).contains("Conversation ").click();
  cy.get(transactionPage.notesinput).type(note);
  cy.get(transactionPage.notesBtn).contains(" Add ").click();
});

Then("note should be {string} successfully", (state) => {
  if (state === "added") {
    cy.get(transactionPage.toastMessage).should("be.visible");
  } else if (state === "edit") {
    cy.get(transactionPage.toastMessage).should("be.visible");
  } else if (state === "deleted") {
    cy.get(transactionPage.toastMessage).should("be.visible");
  }
});

When("user click on edit button", () => {
  cy.get(transactionPage.notesBtn).contains(" Edit ").click();
});

And("retype note and click on update button", () => {
  cy.get(transactionPage.notesinput).last().type("{selectall}{backspace}");
  cy.get(transactionPage.notesinput).last().type(updatedNote);
  cy.get(transactionPage.notesBtn).contains(" Update ").click();
});

When("user click on delete button", () => {
  cy.get(transactionPage.notesBtn).contains(" Delete ").click();
  cy.get(transactionPage.popupContainer).should("be.visible");
});

And("confirm delete note", () => {
  cy.get(transactionPage.popupContainer)
    .find("button")
    .contains("Delete")
    .click();
});

When("user click on transaction instance", () => {
  cy.get(transactionPage.tableRow).first().click();
});

Then("transaction details should be visible", () => {
  affiliatePage.verifyPageTitle("Transaction Details");
});

When("user click on transaction dropdown button", () => {
  cy.get(transactionPage.transactionDetailBtns).first().click();
});

Then("update document page should be visible", () => {
  affiliatePage.verifyPageTitle("Update Documents");
});

When("user select document type and upload document", () => {
  cy.get(transactionPage.documentTypedropdown).click();
  cy.get(transactionPage.documentTypemenu)
    .eq(Math.floor(Math.random() * 10))
    .click();
  const filePath = "abc.PNG";
  cy.get(transactionPage.uploadDocumentinput).attachFile(filePath);
});

Then("selected document should be visible", () => {
  cy.get(transactionPage.documentUploaded)
    .contains(" abc.PNG ")
    .should("be.visible");
});

And("click on update attachment button", () => {
  cy.wait(1000);
  cy.xpath(transactionPage.updateAttachment).click({ force: true });
});

Then("document should updated successfully", () => {
  cy.get(transactionPage.toastMessage).should("be.visible");
});

When("user open transaction instance and click on delete icon", () => {
  cy.get(transactionPage.tableRow).first().click();
  cy.get(transactionPage.transactionDetailBtns).first().click();
  cy.get(transactionPage.actionDropdownMenu)
    .find("button")
    .contains(" Add/Modify Documents ")
    .click();
  cy.get(transactionPage.deleteFileBtn).last().click();
});

Then("transaction should discarded", () => {
  cy.get(transactionPage.toastMessage).should("be.visible");
});

When("user click on user tab", () => {
  cy.xpath(transactionPage.usersTab).click();
});

Then("user should be on user page", () => {
  affiliatePage.verifyPageTitle("Users");
  cy.get("body").then(($body) => {
    if ($body.find('[class*="skeleton-loader "] button').length > 0) {
      cy.get('[class*="skeleton-loader "]').find("button").click();
    }
  });
  cy.get(transactionPage.tableRow).waitForElement();
});

When("user suspend the user", () => {
  cy.get("tbody td.cdk-column-DAO-ID")
    .first()
    .invoke("text")
    .then((text) => {
      text = text.trim();
      cy.log(text);
      cy.wrap(text).as("suspended");
    });
  cy.wait(2000);
  cy.xpath(transactionPage.actionDropdown).first().click();
  cy.wait(2000);
  cy.get(transactionPage.actionDropdownMenu)
    .should("be.visible")
    .find("button")
    .last()
    .invoke("text")
    .then((text) => {
      cy.get(transactionPage.actionDropdownMenu)
        .should("be.visible")
        .find("button")
        .last()
        .click();

      const actionToClick = text === "Suspend User" ? "Suspend" : "Unsuspend";

      cy.get(transactionPage.popupContainer)
        .should("be.visible")
        .find("button")
        .contains(actionToClick)
        .click();

      cy.get(transactionPage.toastMessage).should("be.visible");

      if (text === "Unsuspend User") {
        cy.wait(2000);
        cy.xpath(transactionPage.actionDropdown).first().click();
        cy.get(transactionPage.actionDropdownMenu)
          .should("be.visible")
          .find("button")
          .last()
          .click();
        cy.get(transactionPage.popupContainer)
          .should("be.visible")
          .find("button")
          .contains("Suspend")
          .click();
        cy.get(transactionPage.toastMessage).should("be.visible");
      }
    });
});

And("click on transaction tab", () => {
  cy.xpath(transactionPage.transactionTab).click();
});

Then("user should be transaction page", () => {
  affiliatePage.verifyPageTitle("Transactions");
});

And("search investor for transaction", () => {
  cy.get("@suspended").then((suspended) => {
    cy.xpath(transactionPage.searchinvestor).clearAndType(suspended);
  });
});

Then("user is suspended error should be visible", () => {
  cy.xpath(transactionPage.suspendedUserError).should("be.visible");
});

When("user click on table header {string}", (theader) => {
  cy.get(transactionPage.tableRow).waitForElement();
  cy.get(transactionPage.tableHeader).contains(theader).click();
  cy.wait(2000);
  cy.get(transactionPage.tableRow).waitForElement();
});

Then("table data should be sorted in ascending order", () => {
  cy.get(transactionPage.tableHeader)
    .first()
    .should("have.attr", "aria-sort", "ascending");
  const textArray = [];
  cy.xpath(transactionPage.txnIDColumn)
    .each(($element) => {
      const text = $element.text().trim();
      textArray.push(text);
    })
    .then(() => {
      affiliatePage.verifyAscendingSorting(textArray);
    });
});

Then("table data should be sorted in descending order", () => {
  cy.get(transactionPage.tableHeader)
    .first()
    .should("have.attr", "aria-sort", "descending");
  const textArray = [];
  cy.xpath(transactionPage.txnIDColumn)
    .each(($element) => {
      const text = $element.text().trim();
      textArray.push(text);
    })
    .then(() => {
      affiliatePage.verifyDescendinSorting(textArray);
    });
});

When("user click on {string} all button", (button) => {
  cy.get(transactionPage.dropdownPanel).waitForElement();
  if (button === "collapse") {
    cy.xpath(transactionPage.collapsBtn).click();
  } else if (button === "expand") {
    cy.xpath(transactionPage.expandBtn).click();
  }
});

Then("all dropdown should be {string}", (button) => {
  cy.get(transactionPage.dropdownBtn)
    .its("length")
    .then((length) => {
      if (button === "collapsed") {
        for (let index = 0; index < length; index++) {
          cy.get(transactionPage.dropdownBtn).should(
            "have.attr",
            "aria-expanded",
            "false",
          );
        }
      } else if (button === "expanded") {
        for (let index = 0; index < length; index++) {
          cy.get(transactionPage.dropdownBtn).should(
            "have.attr",
            "aria-expanded",
            "true",
          );
        }
      }
    });
});

When("user click on transaction log button", () => {
  cy.xpath(transactionPage.transactioLogBtn).scrollIntoView().click();
});

Then("transaction logs should be visible", () => {
  cy.get(transactionPage.transactionLogs).should("be.visible");
});

And("click on {string} dropdown button", (dropdown) => {
  cy.get(transactionPage.dropdownBtn).contains(dropdown).click();
});

Then("{string} dropdown should be expanded", (dropdown) => {
  cy.get(transactionPage.dropdownBtn)
    .contains(dropdown)
    .should("have.attr", "aria-expanded", "true");
});

And("Seller details should be visible", () => {
  cy.get(transactionPage.dropdownPanel).should("be.visible");
  cy.get(transactionPage.dropdownPanel)
    .find("div")
    .contains("WALLET")
    .should("be.visible");
  cy.get(transactionPage.dropdownPanel)
    .find("div")
    .contains("SELLER")
    .should("be.visible");
  cy.get(transactionPage.dropdownPanel)
    .find("div")
    .contains("ONBOARDED SINCE")
    .should("be.visible");
  cy.get(transactionPage.dropdownPanel)
    .find("div")
    .contains("MOBILE")
    .should("be.visible");
});

And("agent details should be visible", () => {
  cy.get(transactionPage.dropdownPanel).should("be.visible");
  cy.get(transactionPage.dropdownPanel)
    .find("div")
    .contains("NAME")
    .should("be.visible");
  cy.get(transactionPage.dropdownPanel)
    .find("div")
    .contains("EMAIL")
    .should("be.visible");
  cy.get(transactionPage.dropdownPanel)
    .find("div")
    .contains("PHONE NUMBER")
    .should("be.visible");
  cy.get(transactionPage.dropdownPanel)
    .find("div")
    .contains("COMMISSION")
    .should("be.visible");
});

And("attachment should be visible", () => {
  cy.get(transactionPage.dropdownPanel)
    .should("be.visible")
    .find("a")
    .should("have.attr", "target", "_blank");
});

When("user click on x button", () => {
  cy.get(transactionPage.crossBtn).click();
});

Then("create transaction modal should be close", () => {
  cy.get(transactionPage.transactionMenu)
    .its("length")
    .then((length) => {
      expect(length).to.be.equal(1);
    });
});

When("user click on back button", () => {
  cy.xpath(transactionPage.backBtn).click();
  cy.xpath(transactionPage.backBtn).waitForElement();
  cy.xpath(transactionPage.backBtn).click();
});

Then("user should move back on transaction modal", () => {
  cy.get(transactionPage.transactionMenu)
    .find("label")
    .contains("Search Investor")
    .should("be.visible");
});

Then("User ID table data should be sorted in ascending order", () => {
  cy.xpath(transactionPage.userIDTableHeader).should(
    "have.attr",
    "aria-sort",
    "ascending",
  );
  const textArray = [];
  cy.xpath(transactionPage.txnIDColumn)
    .each(($element) => {
      const text = $element.text().trim();
      textArray.push(text);
    })
    .then(() => {
      affiliatePage.verifyAscendingSorting(textArray);
    });
});

Then("User ID table data should be sorted in descending order", () => {
  cy.xpath(transactionPage.userIDTableHeader).should(
    "have.attr",
    "aria-sort",
    "descending",
  );
  const textArray = [];
  cy.xpath(transactionPage.txnIDColumn)
    .each(($element) => {
      const text = $element.text().trim();
      textArray.push(text);
    })
    .then(() => {
      affiliatePage.verifyDescendinSorting(textArray);
    });
});
