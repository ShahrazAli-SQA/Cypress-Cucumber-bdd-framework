export const docManagementPage = {
  docManagementTab: '//span[text()="Doc Management"]',
  createInvestmentPlanBtn: '//button[text()="Create Investment Plan"]',
  documentTabs: '[class="mat-tab-labels"] [role="tab"]',
  searchInputDropdown: '[class="search-dropdown"] input',
  formInput: 'form [class="ng-arrow"]',
  viewAndApproveBtn: '(//tbody[@role="rowgroup"]//tr[@role="row"])[4]//button',
  documentDetailBtn: '[class="right-panel"] button',
  documentDetail: '[class="right-panel"]',
  ppAprovalbtns: '[class="text-right btns-group"] button',
  discardBtn: '//div[@class="sidebar-content-body"]//button[text()="Discard"]',
  discardPlan: '//button[text()="Discard Plan"]',
  searchinvestorInput: '[formcontrolname="investor"]',
  currencyDropdown: ".d-flex .ng-arrow-wrapper",
  investmentPlanDropdown: '(//span[@class="ng-arrow-wrapper"])[2]',
  unitInput: 'input[formcontrolname="unit"]',
  unitItems: ".user-item",
  commentBox: '[formcontrolname="comment"]',
  requestApprovalBtn: '//button[text()="Request for Approval"]',
  proceedRequestBtn: '//button[text()="Proceed Request"]',
  investorList: ".search-dropdown .users-list .user-item",
  investmentAmountInput: '[formcontrolname="investmentAmount"]',
  usecaseIndex: "//tbody//tr//td[4]//span",
  attachmentIndex:
    "(//tbody[@role='rowgroup']//tr[@role='row']//td[@role='cell'])[11]",
  createUserBtn: '//button[text()="Create New User"]',
  textError: '[class*="text-error"]',
  navigationDrawer: '[class*="btn_IconOnly"]',
  heading: '[class*="heading"]',
  listBox: '[role="listbox"] [role="option"]',
  dropdownOption: '[role="option"]',
  dropdown: '[class="ng-arrow-wrapper"]',
  popupContainer: '[class*="mat-dialog-container"]',
  toastMessage: '[class*="mat-snack-bar-container"]',
  userNameInput: '[formcontrolname="legalName"]',
  emailInput: '[formcontrolname="email"]',
  phoneNoInput: '[formcontrolname="phoneNumber"]',
  cnicInput: '[formcontrolname="cnic"]',
  genderInput: '[formcontrolname="gender"]',
  investorsForm: '[class*="form-container"]',
  submitBtn: '//button[text()="Submit"]',
  searchInput: '[class="app-content"] input[type="search"]',
  tabList: '[class="mat-tab-labels"]',
  sidebarMenu: '[class="right-sidebar"]',
  infiniteScroll: '[class*="search-results "]',
  yearlyReturnInput: '[formcontrolname="yearlyReturn"]',
  monthlySavingInput: '[formcontrolname="savingPerMonth"]',
  meetballBtn: '[class="right-panel"] button[class*="dropdown-toggle"]',
  meetballMenu: '[class*=" dropdown-menu "] button',
  tableRow: 'tbody[role="rowgroup"] tr',
  nextDocBtn: '//button[contains(text(), "Next Doc")]',
  docInvestorId: '[class="sidebar-content-body"] [class*="pill "]',
  tooltip: '[role="tooltip"]',
  pdfFile: '//td[@role="cell"]//a//span[text()="Plan.pdf"]',
};

class docManagementPageObject {
  selectCurrency(currency) {
    cy.get(docManagementPage.currencyDropdown).click();
    cy.get(docManagementPage.listBox).should("be.visible");
    if (currency === "PKR") {
      cy.get(docManagementPage.dropdownOption).contains("PKR ").click();
    } else if (currency === "USD") {
      cy.get(docManagementPage.dropdownOption).contains("USD ").click();
    } else if (currency === "AED") {
      cy.get(docManagementPage.dropdownOption).contains("AED ").click();
    }
  }

  inputPlanDetails(plan) {
    if (plan === "Buy to Own") {
      cy.get(docManagementPage.dropdown).eq(2).click();
      cy.get(docManagementPage.dropdownOption).eq(1).click();
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
      cy.get(docManagementPage.investmentAmountInput).clearAndType("50000");
      cy.get(docManagementPage.monthlySavingInput).clearAndType("2000000");
      cy.get(docManagementPage.dropdown).last().click();
      cy.get(docManagementPage.listBox)
        .its("length")
        .then((length) => {
          const randomIndex = Math.floor(Math.random() * length);
          cy.get(docManagementPage.listBox).eq(randomIndex).click();
        });
    }
  }

  inputUserDetails(username, email, phoneNo, cnic) {
    cy.get(docManagementPage.userNameInput).click();
    cy.get(docManagementPage.userNameInput).type(username);
    cy.wait(1000);
    cy.get(docManagementPage.emailInput).type(email);
    cy.get(docManagementPage.phoneNoInput).type(phoneNo);
    cy.get(docManagementPage.cnicInput).type(cnic);
    cy.get(docManagementPage.genderInput).select("male");
    cy.wait(1000);
    cy.get(docManagementPage.investorsForm)
      .find("input")
      .eq(4)
      .clearAndType("Test@1234");
  }

  searchUsecase(usecase) {
    cy.wait(3000);
    cy.get(docManagementPage.searchInput).type(usecase);
    cy.wait(3000);
  }

  verifySearchedUsecase(usecase) {
    cy.get(docManagementPage.tableRow).waitForElement();
    cy.xpath(docManagementPage.usecaseIndex).each(($element) => {
      cy.wrap($element).invoke("text").should("eq", usecase);
    });
  }
}

export const docManagementPageObj = new docManagementPageObject();
