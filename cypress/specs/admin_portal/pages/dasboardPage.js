export const dashboardPage = {
  navigationMenu: '[class="menu-items"] li',
  heading: '[class*="heading"]',
  dropdownBtn: 'mat-select[role="combobox"]',
  projectDropdown: '[role="listbox"]',
  projectOption: 'mat-option[role="option"]',
  projectTitle: '[class="title fs-14"]',
  notificationBtn: 'button[class*=" notifications"]',
  notificationModal: 'div[class*=" notifications"]',
  notifications: '[class="notification-inner"]',
  daysDropdown: '[role="listbox"]',
  daysOption: 'mat-option[role="option"]',
  cardBodyHeading: '[class="card-body"] [class*="heading"]',
  previousRoundBtn: '(//div[@class="btns-group"]//button)[1]',
  nextRoundBtn: '(//div[@class="btns-group"]//button)[2]',
  cardBody: '[class="card-body"]',
  trasactionTable: '(//table[@role="table"])[1]',
  seeMoreTransaction: '(//button[text()=" See More"])[1]',
  seeMoreRecentActivity: '(//button[text()=" See More"])[2]',
  transactionStats: '[class*="transaction-status"]',
};

class dasboardPageObject {
  viewRoundStatus(button) {
    if (button === "next") {
      cy.xpath(dashboardPage.nextRoundBtn).click({ force: true });
    } else if (button === "previous") {
      cy.xpath(dashboardPage.previousRoundBtn).click({ force: true });
      cy.wait(2000);
      cy.xpath(dashboardPage.previousRoundBtn).click({ force: true });
    }
  }
}

export const dasboardPageObj = new dasboardPageObject();
