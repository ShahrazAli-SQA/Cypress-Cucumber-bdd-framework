import { When, Then, Given } from "cypress-cucumber-preprocessor/steps";
import { affiliatePage } from "../constant/Affiliate";
import { holdersListPage } from "../pages/holdersListPage";

Given("login affiliate portal and go to Holders List page", () => {
  affiliatePage.login();
  cy.xpath(holdersListPage.holdersListTab).click();
  cy.xpath(holdersListPage.holdersBtn).should("be.visible");
  cy.xpath(holdersListPage.holdersBtn).contains(" Holders");
});

When("user type wallet address in search field", () => {
  cy.get(holdersListPage.searchInput).type(
    "0xbb699026ead917838d4c151704ca1880e0605925",
  );
});

Then("Transfer details should be visible", () => {
  cy.get(holdersListPage.transferDetail).first().should("be.visible");
});

When("user click on holders toggle", () => {
  cy.xpath(holdersListPage.holdersBtn).click();
});

Then("holders toggle should be selected", () => {
  cy.xpath(holdersListPage.holdersBtn).should(
    "have.attr",
    "aria-selected",
    "true",
  );
});

When("user can apply different role filter", () => {
  cy.xpath(holdersListPage.roleFilterDropDown).should("be.visible");
  cy.xpath(holdersListPage.roleFilterDropDown).click();
  cy.get(holdersListPage.filtersList)
    .its("length")
    .then((length) => {
      const randomIndex = Math.floor(Math.random() * length);
      cy.get(holdersListPage.filtersList)
        .eq(randomIndex)
        .invoke("text")
        .then((text) => {
          const filterText = text;
          cy.log(filterText);
          cy.wrap(filterText).as("roleFilterText");
        });
      cy.get(holdersListPage.filtersList).eq(randomIndex).click();
    });
});

Then("role filter should be selected successfully", () => {
  cy.get(holdersListPage.roleFilterText)
    .last()
    .invoke("text")
    .then((text) => {
      cy.log(text);
      const Text = text;
      cy.get("@roleFilterText").then((roleFilterText) => {
        expect(roleFilterText).to.equal(Text);
      });
    });
});

When("user can apply different project filter", () => {
  cy.get(holdersListPage.projectFilter).first().should("be.visible");
  cy.get(holdersListPage.projectFilter).first().click({ force: true });
  cy.get(holdersListPage.filtersList)
    .its("length")
    .then((length) => {
      const randomIndex = Math.floor(Math.random() * length);
      cy.get(holdersListPage.filtersList)
        .eq(randomIndex)
        .invoke("text")
        .then((text) => {
          const filterText = text;
          cy.log(filterText);
          cy.wrap(filterText).as("roleFilterText");
        });
      cy.get(holdersListPage.filtersList).eq(randomIndex).click();
    });
});

Then("project filter should be selected successfully", () => {
  cy.get(holdersListPage.projectFilter)
    .first()
    .invoke("text")
    .then((text) => {
      cy.log(text);
      const Text = text;
      cy.get("@roleFilterText").then((roleFilterText) => {
        expect(roleFilterText).to.equal(Text);
      });
    });
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
  cy.wait(3000);
  cy.get(holdersListPage.syncBtn).click();
  cy.xpath(holdersListPage.syncToast).should("be.visible");
});

Then("account balance must be synced", () => {
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

When("user type wallet address in search field on holders tabel", () => {
  cy.get(holdersListPage.searchInput).type(
    "0xe6e404393bcb6f1908e49280bbe0e29e7064932e",
  );
});
