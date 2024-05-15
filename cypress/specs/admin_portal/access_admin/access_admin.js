import { When, Then, And, Given } from "cypress-cucumber-preprocessor/steps";
import { adminPage } from "../constant/admin";
import { accessPage } from "../pages/accessPage";
import { accessPageObj } from "../pages/accessPage";

let phoneNo;
let username;
let email;

Given("user login to admin portal and visit access page", () => {
  adminPage.login();
  cy.xpath(accessPage.accessTab).click();
  adminPage.verifyPageTitle("USERS & ROLES");
});

When("user click on add user button", () => {
  cy.xpath(accessPage.addUserBtn).click();
});

Then("create user form should be visible", () => {
  adminPage.verifyPageTitle("User Details");
});

When("user type username, mobile no and email", () => {
  username = adminPage.generateUsername();
  phoneNo = adminPage.generatePhoneNo();
  email = adminPage.generateEmail();
  accessPageObj.inputUserDetails(username, phoneNo, email);
});

And("assign role to the user", () => {
  accessPageObj.assignRole();
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

Then("new user should created", () => {
  cy.get(accessPage.toastMessage).should("be.visible");
});

When("user type username in search field", () => {
  cy.get(accessPage.tableRow).waitForElement();
  cy.get(accessPage.searchInput).type(username);
});

Then("only searched user should be visible", () => {
  cy.get(accessPage.tableRow).should("be.visible").and('have.length.at.least', 1);
});

When("user click on first instance", () => {
  cy.get(accessPage.tableRow).first().click();
});

Then("user can see user details", () => {
  cy.get(accessPage.rolesCard).waitForElement();
  adminPage.verifyPageTitle("User Details");
  accessPageObj.verifyUserDetails(username, phoneNo);
});

And("permissions assigned to the user", () => {
  cy.get(accessPage.rolesCard).should("be.visible");
});

When("user click on meetball action button", () => {
  cy.get(accessPage.meetballActionBtn).first().click({ force: true });
});

And("click on {string} button", (button) => {
  cy.get(accessPage.actionBtn).contains(button).click();
});

Then("user should be on edit user details screen", () => {
  adminPage.verifyPageTitle("Update Existing User");
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
  adminPage.verifyPageTitle(modal);
});

When("user click on email password link", () => {
  cy.get(accessPage.resetOption).contains("Email Password Link ").click();
});

And("verify user email is correct", () => {
  accessPageObj.verifyUserEmail();
});

And("click on send button", () => {
  cy.xpath(accessPage.sendBtn).click();
});

Then("password reset link should be sent successfully", () => {
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
  cy.xpath(accessPage.generatePasswordBtn).should("be.enabled").click();
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
  cy.wait(3000);
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

Then("role should be assigned", () => {
  cy.get(accessPage.accessTable).should("be.visible");
});
