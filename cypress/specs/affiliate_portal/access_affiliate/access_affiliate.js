import { When, Then, And, Given } from "cypress-cucumber-preprocessor/steps";
import { affiliatePage } from "../constant/Affiliate";
import { accessPage } from "../pages/accessPage";

let phoneNo;
let username;
let email;

Given("user login to affiliate portal and visit access page", () => {
  affiliatePage.login();
  cy.xpath(accessPage.accessTab).click();
  affiliatePage.verifyPageTitle("USERS & ROLES");
});

When("user click on add user button", () => {
  cy.xpath(accessPage.addUserBtn).click();
});

Then("create user form shoould be visible", () => {
  affiliatePage.verifyPageTitle("User Details");
});

When("user type username, mobile no and email", () => {
  username = affiliatePage.generateUsername();
  cy.xpath(accessPage.userDetailForm)
    .find("input")
    .first()
    .should("be.enabled");
  cy.xpath(accessPage.userDetailForm)
    .find("input")
    .first()
    .clearAndType(username);
  phoneNo = affiliatePage.generatePhoneNo();
  cy.xpath(accessPage.userDetailForm)
    .find("input")
    .eq(1)
    .clearAndType("92" + phoneNo);
  email = affiliatePage.generateEmail();
  cy.xpath(accessPage.userDetailForm).find("input").eq(2).clearAndType(email);
  const filePath = "sample.jpg";
  cy.get(accessPage.imgupload).attachFile(filePath);
});

And("assign role to the user", () => {
  cy.get(accessPage.projectRoleForm).first().click();
  cy.get(accessPage.userRoleOptions).last().click();
  cy.get(accessPage.projectRoleForm).eq(1).click();
  cy.get(accessPage.userRoleOptions).last().click();
  cy.get(accessPage.projectRoleForm).eq(2).click();
  cy.get(accessPage.userRoleOptions).last().click();
  cy.get(accessPage.projectRoleForm).last().click();
  cy.get(accessPage.userRoleOptions).last().click();
});

And("click on save role button", () => {
  cy.wait(1000);
  cy.get(accessPage.userFormBtns).contains("Save Role").click({ force: true });
});

Then("role should be assign to new user", () => {
  cy.get(accessPage.tableRow).should("be.visible");
});

When("user click on save user button", () => {
  cy.get(accessPage.userFormBtns).contains(" Save User ").click();
});

Then("new uswr should created", () => {
  cy.get(accessPage.toastMessage).should("be.visible");
});

When("user type user name in search field", () => {
  cy.get(accessPage.tableRow).waitForElement();
  cy.get(accessPage.searchInput).type(username);
});

Then("only searched user should be visible", () => {
  cy.get(accessPage.tableRow).should("be.visible");
});

When("user click on first instance", () => {
  cy.get(accessPage.tableRow).first().click();
});

Then("user can see user details", () => {
  cy.get(accessPage.rolesCard).waitForElement();
  affiliatePage.verifyPageTitle("User Details")
  cy.get(accessPage.detailsTitle)
    .first()
    .invoke("text")
    .then((text) => {
      expect(text).to.equal("User Name");
    });

  cy.get(accessPage.detailsValue)
    .first()
    .invoke("text")
    .then((text) => {
      expect(text).to.equal(username);
    });
});

And("permissions assigned to the user", () => {
  cy.get(accessPage.rolesCard).should("be.visible");
});

When("user click on meetball action button", () => {
  cy.get(accessPage.meetballActionBtn).first().click();
});

And("click on {string} button", (button) => {
  cy.get(accessPage.actionBtn).contains(button).click();
});

Then("user should be on edit user details screen", () => {
  affiliatePage.verifyPageTitle("Update Existing User");
});

And("click on update user button", () => {
  cy.xpath(accessPage.updateUserBtn).click({ force: true });
});

Then("user information should be updated", () => {
  cy.get(accessPage.toastMessage).should("be.visible");
});

And("click on {string} button to confirm the action", (button) => {
  cy.get(accessPage.popcontainer).find("button").contains(button).click();
});

Then("user should be {string}", () => {
  cy.get(accessPage.toastMessage).should("be.visible");
});

Then("{string} modal should be visible", (modal) => {
  affiliatePage.verifyPageTitle(modal);
});

When("user click on email password link", () => {
  cy.get(accessPage.resetOption).contains("Email Password Link ").click();
});

And("verify user email is correct", () => {
  cy.get('input[type="password"]')
    .invoke("attr", "placeholder")
    .then((placeholderValue) => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      expect(placeholderValue).to.match(emailRegex);
    });
});

And("click on send button", () => {
  cy.xpath(accessPage.sendBtn).click();
});

Then("password reset link should be send successfully", () => {
  cy.get(accessPage.toastMessage).should("be.visible");
});

When("user click on generate password button", () => {
  cy.get(accessPage.resetOption).contains("Generate password").click();
});

When("user type new password and confirm password", () => {
  cy.get(accessPage.newPasswordInput).clearAndType("Test@123");
  cy.get(accessPage.confirmPasswordInput).clearAndType("Test@123");
});

And("click on generate password button", () => {
  cy.xpath(accessPage.generatePasswordBtn).should("be.enabled");
  cy.xpath(accessPage.generatePasswordBtn).click();
});

Then("password should be generated successfully", () => {
  cy.get(accessPage.toastMessage).should("be.visible");
});

When("user click on admin users tab", () => {
  cy.get(accessPage.tablist).contains(" Admin Users ").click();
});

Then("admin user should be visible", () => {
  cy.get(accessPage.tableRow)
    .should("be.visible")
    .and("have.length.at.least", 2);
});

When("user upload new photo", () => {
  const filePath = "sample.jpg";
  cy.get(accessPage.imgupload).attachFile(filePath);
});

Then("user profile photo should be updated", () => {
  cy.get(accessPage.toastMessage).should("be.visible");
});

Then("unassign modal window should be visible", () => {
  cy.get(accessPage.rightsideModal).should("be.visible");
});

When("user click on unassign button", () => {
  cy.xpath(accessPage.unassignBtn)
    .should("be.visible")
    .and("be.enabled")
    .click();
});

And("click on role cancel button", () => {
  cy.xpath(accessPage.cancelBtn).last().click();
});

Then("no role should be displayed to the user", () => {
  cy.get(accessPage.accessTable).should("not.exist");
});

When("user click on assign new project button", () => {
  cy.xpath(accessPage.assignRoleBtn).should("be.enabled").click();
});

Then("role should be assign", () => {
  cy.get(accessPage.accessTable).should("be.visible");
});
