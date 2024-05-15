export const activityPage = {
  ActivityLogTab: '//span[text()="Activity Log"]',
  filterDropdown: '[class*="ngb-filters-content"]',
  categoryFilter: '[class="ng-arrow-wrapper"]',
  categoryoptions: '[role="listbox"] [role="option"]',
  applyBtn: '//button[text()=" Apply "]',
  resetBtn: '//button[text()=" Reset "]',
  activityTable: 'tbody[role="rowgroup"]',
  dateInput: 'input[type="date"]',
  clearFilterBtn: '//button[text()="Clear Filters"]',
  appliedFilter: '[class="applied-filters"]',
  projectFilter: 'button[class*="dropdown-toggle"]',
  projectDropdown: '[class*="dropdown-menu"]',
  projectFilterMenu: '[class="checkbox-column"] mat-checkbox',
  projectFilterApplyBtn: '//button[text()="Apply"]',
  verifyTransactionBtn: '//button[text()=" Verify Transaction "]',
  updateStatusBtn: '//button[text()=" Update Status "]',
  addPaymentsBtn: '//button[text()="Add Payment "]',
  expandAllBtn: '//button[text()=" Expand All "]',
  dropdownOption: '[role="option"]',
  amountRecievedInput: '[formcontrolname="amountReceived"]',
  fileUploadBtn: '//label[text()="Browse"]',
  dueAmount: '[class="right-sidebar"] [class="text"]',
  fileUpload: 'input[id="fileDropRef"]',
  fileUploaded: '[class="right-sidebar"] [class="file-info"]',
  daysFilterBtn: "#transaction-details .dropdown-toggle",
  daysFilterMenu: '[id="transaction-details"] [container="body"]',
  transactioIdIndex: "//tbody//tr[1]//td[1]//div[2]",
  actionDropdown: "//tbody//tr[1]//td//button",
  actionDropdownMenu: '[class="ngb-menu-body dropdown-menu show"]',
  addNote: '[class="input form-group"] textarea',
  discardTransactionBtm: '//button[text()=" Discard Transaction "]',
  addAgentInput: '[class="trans-status"] input',
  agentOption: ".users-list",
  addAgentBtn: '//button[text()=" Add Agent "]',
  notesinput: '[role="tabpanel"] textarea',
  notesBtn: '[role="tabpanel"] button',
  noteText: '[role="tabpanel"] p',
  transactionDetailBtns: '[class="trans-detail"] button',
  documentTypedropdown: '[class="ng-arrow-wrapper"]',
  documentTypemenu: '[role="listbox"] span',
  uploadDocumentinput: 'input[id="uploaddocuments"]',
  documentUploaded: ".attachments .heading",
  deleteFileBtn: '[class="file-upload-actions"] button',
  updateAttachment: '//button[text()="Update Attachments "]',
  updateTransactionBtn: '//button[text()=" Update Transaction "]',
  sidebarMenu: '[class="right-sidebar"]',
  inputGroup: '[class="input form-group"]',
  filterBtn: '//button[text()="Filters "]',
  navigationDrawer: '[class*="btn_IconOnly"]',
  heading: '[class*="heading"]',
  searchInput: '[class="app-content"] [type="search"]',
  tableRow: '[class*="mat-row"]',
};

class activityPageObject {
  selectFilterOption(filter) {
    cy.get(activityPage.categoryFilter).click();
    cy.get(activityPage.categoryoptions)
      .contains(filter).find("input")
      .click();
  }

  verifyAppliedFilter(filter) {
    cy.xpath('//tbody//tr//td[3]').each(($element) => {
      const text = $element.text();
      expect(text).to.equal(filter);
    });
  }

  selectDateRange(sDate, eDate) {
    cy.get(activityPage.dateInput).first().type(sDate);
    cy.get(activityPage.dateInput).last().type(eDate);
  }

  verifySearchedUser(username) {
    cy.get(activityPage.tableRow).should("be.visible");
    cy.get(activityPage.tableRow).find("td").each(($element) => {
      const text = $element.text();
      expect(text).to.equal(username);
    });
  }

  selectProject(project) {
    cy.get(activityPage.projectFilterMenu).contains("All").click();
    cy.get(activityPage.projectFilterMenu).contains(project).click();
  }
}

export const activityPageObj = new activityPageObject();
