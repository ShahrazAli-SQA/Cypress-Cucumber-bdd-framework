export const loginPage = {
  pageLabel: '[class="wrapper"] label',
  signin: '[class="sign-in-page background"]',
  emailInput: '[formcontrolname="email"]',
  passwordInput: '[formcontrolname="password"]',
  loginBtn: '[class*="btn-primary login"]',
  dashboard: '[routerlink="/dashboard"]',
  emailEmptyField:
    '(//form[@class="ng-pristine ng-invalid ng-touched"]//small)[1]',
  toastMessage: '[id="toastr-container"]',
  loginPage: '//h4[text()="Log in to your account"]',
  drawerMenuBtn: '[class="menuBtnMobile"]',
  dashboardDropDown: '[class="--cursor-pointer"]',
  portfolioTab: '[routerlink="/portfolio"]',
  actriveInvestmentTab: '//span[text()="Active Investments"]',
  incomeStreamTab: '//span[text()="Income Streams"]',
  projectsTab: '//span[text()="Projects"]',
  transactionTab: '//span[text()="Transactions"]',
  daoListingTab: '//span[text()="DAO Listings"]',
  TransferArea: '//span[text()="Transfer Area"]',
  eReportsTab: '//span[text()="E-Reports"]',
  exploreLearnTab: '//span[text()="Explore & Learn"]',
  settingsTab: '//span[text()="Settings"]',
  backToTopBtn: ".btn_blue_outline",
  avatarIcon: '[class="menuDv"]',
  logOutBtn: '//button[text()="Logout "]',
};
