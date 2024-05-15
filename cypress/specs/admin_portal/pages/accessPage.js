export const accessPage = {
  accessTab: '//span[text()="Access"]',
  addUserBtn: '//button[text()="Add User"]',
  userDetailForm: '(//div[@class="card app-card"]//form)[1]',
  projectRoleForm: 'form [class="ng-arrow-wrapper"]',
  userFormBtns: '[class="app-content"] button',
  userRoleOptions: '[role="option"]',
  imgupload: '[id="img-upload-preview"]',
  rolesCard: '[class*="app-card-border"]',
  detailsTitle: '[class="title"]',
  detailsValue: '[class="value"]',
  navigationDrawer: '[class*="btn_IconOnly"]',
  heading: '[class*="heading"]',
  tableRow: '[class*="mat-row"]',
  toastMessage: '[class*="mat-snack-bar-container"]',
  searchInput: '[class="app-content"] input[type="search"]',
  meetballActionBtn: '[class="ngb-menu dropdown"] [class*="dropdown-toggle "]',
  actionBtn: '[class*=" dropdown-menu "] button',
  editUSerBtn: '//button[text()="Edit User"]',
  updateUserBtn: '//button[text()="Update User"]',
  popcontainer: '[class*="mat-dialog-container "]',
  tablist: '[class="mat-tab-labels"] [role="tab"]',
  resetOption: '[class="reset-options"] button',
  sendBtn: '//button[text()="Send"]',
  newPasswordInput: 'input[formcontrolname="newPassword"]',
  confirmPasswordInput: 'input[formcontrolname="confirmPassword"]',
  generatePasswordBtn: '//button[text()="Generate password"]',
  cancelBtn: '//button[contains (text() , "Cancel")]',
  unassignBtn: '//button[text()="Unassign Project"]',
  rightsideModal: '[class="right-sidebar"] [class*=" sidebar-content"]',
  accessTable: 'tbody[role="rowgroup"] tr',
  assignRoleBtn: '//button[text()="Assign New Project"]',
};

class accessPageObject {
  inputUserDetails(username, phoneNo, email) {
    cy.xpath(accessPage.userDetailForm)
      .find("input")
      .first()
      .should("be.enabled")
      .clearAndType(username);
    cy.xpath(accessPage.userDetailForm)
      .find("input")
      .eq(1)
      .clearAndType("92" + phoneNo);
    cy.xpath(accessPage.userDetailForm).find("input").eq(2).clearAndType(email);
    const filePath = "sample.jpg";
    cy.get(accessPage.imgupload).attachFile(filePath);
  }

  assignRole() {
    cy.get(accessPage.projectRoleForm).first().click();
    cy.get(accessPage.userRoleOptions).eq(2).click();
    cy.get(accessPage.projectRoleForm).eq(1).click();
    cy.get(accessPage.userRoleOptions).first().click();
    cy.get(accessPage.projectRoleForm).eq(2).click();
    cy.get(accessPage.userRoleOptions).first().click();
    cy.get(accessPage.projectRoleForm).last().click();
    cy.get(accessPage.userRoleOptions).first().click();
  }

  verifyUserDetails(username, phoneNo) {
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
    cy.get(accessPage.detailsValue)
      .eq(1)
      .invoke("text")
      .then((text) => {
        expect(text).to.eql(phoneNo);
      });
  }

  verifyUserEmail() {
    cy.get('input[type="password"]')
      .invoke("attr", "placeholder")
      .then((placeholderValue) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        expect(placeholderValue).to.match(emailRegex);
      });
  }
}

export const accessPageObj = new accessPageObject();
