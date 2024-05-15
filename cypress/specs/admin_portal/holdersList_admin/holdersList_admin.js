import { When, Then, Given, And } from "cypress-cucumber-preprocessor/steps";
import { adminPage } from "../constant/admin";
import { holdersListPage } from "../pages/holdersListPage";

Given("login admin portal and visit Holders List page", () => {
  adminPage.login();
  cy.xpath(holdersListPage.holdersListTab).click();
  cy.xpath(holdersListPage.holdersBtn).should("be.visible").and('contain.text', "Holders");
});

When("user click on holders toggle button", () => {
  cy.xpath(holdersListPage.holdersBtn).click();
});

Then("holders toggle should be selected", () => {
  cy.xpath(holdersListPage.holdersBtn).should(
    "have.attr",
    "aria-selected",
    "true",
  );
});

And("holders list should be visible", () => {
  cy.get(holdersListPage.tablerow).should("be.visible");
});

When("user click on sync button", () => {
  cy.get(holdersListPage.syncTime).should("be.visible");
  cy.get(holdersListPage.syncTime)
    .invoke("text")
    .then((text) => {
      cy.log(text);
      const beforeSync = text;
      cy.wrap(beforeSync).as("beforeSync");
    });
  cy.get(holdersListPage.syncNowBtn).click();
});

Then("account balance must be synced", () => {
  cy.get(holdersListPage.toastMessage)
    .should("be.visible")
    .and("have.class", "bg-success")
    .and("have.text", "Synced");
  cy.get(holdersListPage.syncTime).should("be.visible");
  cy.get(holdersListPage.syncTime)
    .invoke("text")
    .then((text) => {
      cy.log(text);
      cy.get("@beforeSync").then((beforeSync) => {
        expect(beforeSync).to.not.equal(text);
      });
    });
});

When("user type wallet address in search field on holders table", () => {
  cy.get(holdersListPage.searchInput).type(
    "0xe6e404393bcb6f1908e49280bbe0e29e7064932e",
  );
});

When("user click on project filter dropdown", () => {
  cy.xpath(holdersListPage.projectFilterdropdown).click();
});

Then("project filter options should be visible", () => {
  cy.get(holdersListPage.filterItems).should("be.visible");
});

When("user select {string} project", (projectFilter) => {
  cy.get(holdersListPage.filterItems).contains(projectFilter).click();
});

Then("{string} project filter should be selected", (projectFilter) => {
  cy.xpath(holdersListPage.projectFilterdropdown).should(
    "contain.text",
    projectFilter,
  );
});

And("transaction should be visible", () => {
  cy.get(holdersListPage.transferDetail).should("be.visible");
});

When("user copy {string} wallet address from transfer table", (transaction) => {
  if (transaction === "sender") {
    cy.xpath(holdersListPage.senderWalletID)
      .first()
      .invoke("text")
      .then((text) => {
        cy.wrap(text).as("walletId");
      });
  } else if (transaction === "reciever") {
    cy.xpath(holdersListPage.recieverWalletID)
      .first()
      .invoke("text")
      .then((text) => {
        cy.wrap(text).as("walletId");
      });
  }
});

And("type wallet address into search field", () => {
  cy.get("@walletId").then((walletId) => {
    cy.get(holdersListPage.searchInput).type(walletId);
  });
});

Then("only searched transaction should be visible", (transaction) => {
  if (transaction === "sender") {
    cy.xpath(holdersListPage.senderWalletID)
      .its("length")
      .then((length) => {
        cy.get("@walleId").then((walletId) => {
          for (let index = 0; index < length; index++) {
            cy.xpath(holdersListPage.senderWalletID)
              .eq(index)
              .should("have.text", walletId);
          }
        });
      });
  } else if (transaction === "reciever") {
    cy.xpath(holdersListPage.recieverWalletID)
      .its("length")
      .then((length) => {
        cy.get("@walleId").then((walletId) => {
          for (let index = 0; index < length; index++) {
            cy.xpath(holdersListPage.recieverWalletID)
              .eq(index)
              .should("have.text", walletId);
          }
        });
      });
  }
});

When("user click on role filter dropdown", () => {
  cy.xpath(holdersListPage.roleFilterDropDown).click();
});

Then("role filter option should be visible", () => {
  cy.get(holdersListPage.filterItems).should("be.visible");
});

When("user select {string} role option", (role) => {
  cy.get(holdersListPage.filterItems).contains(role).click();
});

Then("{string} role should be selected", (role) => {
  cy.xpath(holdersListPage.roleFilterDropDown).should("contain.text", role);
});

When("user copy holders wallet address", () => {
  cy.xpath(holdersListPage.holderWalletId)
    .first()
    .invoke("text")
    .then((text) => {
      cy.wrap(text).as("walletId");
    });
});

Then("only searcher holder id should be visible", () => {
  cy.get(holdersListPage.tablerow).should("have.length", 1);
  cy.get("@walletId").then((walletId) => {
    cy.get(holdersListPage.holderWalletId).should("have.text", walletId);
  });
});

When("user click on users toggle button", () => {
  cy.get(holdersListPage.usersToggleBtn).click();
  cy.get(holdersListPage.usersToggleBtn)
    .find("button")
    .should("have.attr", "aria-pressed", "true");
});

And("click on {string} investor name instance", (person) => {
  if (person === "1st") {
    cy.xpath(holdersListPage.senderName).first().click();
  } else if (person === "2nd") {
    cy.xpath(holdersListPage.recieverName).first().click();
  }
});

Then("user should be directed to investor details", () => {
  cy.get(holdersListPage.investorDetailHeader)
    .contains("Investor Detail")
    .should("be.visible");
});

And("user click on back button", () => {
  cy.xpath(holdersListPage.backBtn).click();
});

And("click on holders username instance", () => {
  cy.xpath(holdersListPage.holdersName).first().click();
});
