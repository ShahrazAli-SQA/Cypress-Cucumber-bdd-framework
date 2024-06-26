export const transactionPage = {
  heading: '[class*="heading"]',
  pageLabel: '[class="wrapper"] label',
  transactionTab: '//a//span[text()="Transactions"]',
  requestSuccessIcon: '//div[@class="whiteBox"]//mat-icon[text()="done"]',
  seeTransactionBtn: '//button[text()=" See Transactions "]',
  purchaseNowBtn: '//button[contains(normalize-space(), "Purchase Now")]',
  proceedNowBtn: '//button[contains(normalize-space(), "Proceed Now")]',
  areaInput: 'input[formcontrolname="pledgeArea"]',
  roundPrice: '//div[@class="mpd-item"][2]//div[@class="value"]',
  totalPrice: 'input[formcontrolname="propAmount"]',
  purchaseBtn: '//button//span[text()="Purchase "]',
  checkbox: '[class="mat-checkbox-inner-container"]',
  toastMessage: '[class*="mat-snack-bar-container"]',
  transactionSummary: '[class="detTable --flex-column-small"]',
  transactionId: '(//div[@class="infos"]//strong)[1]',
  firstTransId: "(//tbody)[2]//tr[1]//td[1]//div",
  orderSummary: '[class="orderSummaryDv"] h3',
  toggleBtn: 'button[role="switch"]',
  transactionTable: '[class*="table table_simple',
  matTabs: '[class="mat-tab-label-content"]',
  dropdownArrow: '[class*="mat-select-arrow-wrapp"]',
  dropdownoption: 'mat-option[role="option"]',
  projectsColumn: "(//tbody)[2]//tr//td[1]//strong",
  meatballBtn: '[class*="dropdown-toggle "]',
  actionMenu: '[class="dropdown-menu show"]',
  popup: '[class*="mat-dialog-container"]',
  passwordInput: '[formcontrolname="password"]',
  noThanksBtn: '//button[text()=" No Thanks "]',
  submitBtn: '//button[text()=" Submit "]',
  transactionStatus: "(//tbody)[2]//tr//td[3]",
  transferPopup: '[class="modal-dialog"] [class="modal-content"]',
  confirmTransferBtn: '//button[text()=" Confirm Transfer "]',
  pendingTransaction: '(//tbody)[2]//tr//td[3]//span[text()="Pending"]',
  yesBtn: '//button[text()=" Yes "]',
  bankDetails: '[class="row"] [class="col-md-6 ng-star-inserted"]',
  continueBtn: '//button[text()=" Continue "]',
  imageInput: 'input[id="fileDropRef"]',
  submitForVerificationBtn: '//button[text()=" Submit for Verification "]',
  successMessage: ".toastr.toastr-success",
  submitRecieptBtn: '//button[text()=" Submit receipts "]',
  transactionDetails: '[class="transaction-details-box"]',
  helpBtn: '[class="btns-group"] a',
  transactionSummaryBtn: '//button[text()="Transaction Summary"]',
  reportItems: '[class="report-item text-container"]',
  logTable: '[class="card-body"] table',
  viewbtn: '[class="card-body"] table a',
  nextPageBtn: '[aria-label="Next page"]',
  previousPageBtn: '[aria-label="Previous page"]',
  pagination: 'ul[aria-label="Pagination"]',
};
