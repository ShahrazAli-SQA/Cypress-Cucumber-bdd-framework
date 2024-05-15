import { When, Then, And, Given } from "cypress-cucumber-preprocessor/steps";
import { TESTDATA, affiliatePage } from "../constant/Affiliate";
import { usersPage } from "../pages/usersPage";

let investorId = "";
let transID = "";
let investorName = "";
let email = "";
let phoneNo = "";
let cnic = "";
const accountTitle = "Test Tittle";

Given("user visit the affiliate portal and login", () => {
  affiliatePage.login();
  affiliatePage.verifyPageTitle("Users");
});

When("user create new investor", () => {
  investorName = affiliatePage.generateUsername();
  email = affiliatePage.generateEmail();
  phoneNo = affiliatePage.generatePhoneNo();
  cnic = affiliatePage.generateCnic();
  cy.wrap(investorName).as("investorName");
  affiliatePage
    .createInvestor(investorName, email, phoneNo, cnic)
    .then((investor) => {
      cy.log("Investor ID:", investor);
      investorId = investor;
      cy.wrap(investor).as("investorId");
    });
});

Then("created user should be visible under {string} tab", (tabs) => {
  cy.xpath(usersPage.usersTab).click();
  cy.get(usersPage.searchInput).click();
  const uid = parseInt(investorId.replace(/[^0-9]/g, ""), 10);
  cy.get(usersPage.searchInput).type(uid);
  cy.wait(2000);
  cy.get(usersPage.searchResult)
    .find(".pill.pill-sm")
    .first()
    .should("contain.text", uid);
  cy.get(usersPage.searchResult)
    .find(".pill.pill-sm")
    .last()
    .should("contain.text", tabs);
});

When("user create a transaction for that investor", () => {
  cy.xpath(usersPage.transactionTab).click();

  affiliatePage.createTransaction(investorId).then((tid) => {
    transID = tid;
  });
});

Then("created transaction should be visible under {string} tab", (tabs) => {
  if (tabs === "pending") {
    cy.xpath(usersPage.backToTransaction).click();
    cy.get(usersPage.tabList).find("div").contains(" Pending").click();
  } else if (tabs === "verified") {
    cy.get(usersPage.tabList).find("div").contains(" Verified").click();
  } else if (tabs === "approved") {
    cy.get(usersPage.tabList).find("div").contains(" Approved").click();
  } else if (tabs === "locked") {
    cy.get(usersPage.tabList).find("div").contains(" Locked").click();
  }

  cy.get(usersPage.tableRow).waitForElement();
  cy.log(transID);
  const tid = parseInt(transID.replace(/[^0-9]/g, ""), 10);
  cy.get(usersPage.transactionSearchinput).clearAndType(tid);
  cy.get(usersPage.transactionInstance).first().click();
  cy.get(usersPage.transactionDetail).first().waitForElement();
  cy.get(usersPage.transactionDetail).first().should("be.visible");
  cy.get(usersPage.transactionDetail)
    .eq(1)
    .invoke("text")
    .then((text) => {
      text = text.trim();
      expect(text).to.equal(transID);
    });
});

When("user verify the created transaction", () => {
  cy.xpath(usersPage.transactionTab).click();
  cy.get(usersPage.tableRow).waitForElement();
  const tid = parseInt(transID.replace(/[^0-9]/g, ""), 10);
  cy.get(usersPage.transactionSearchinput).clearAndType(tid);
  cy.get(usersPage.transactionInstance).first().click();
  cy.get(usersPage.transactionDetail).first().waitForElement();
  cy.get(usersPage.transactionDetail).first().should("be.visible");
  cy.get(usersPage.transactionDetail)
    .eq(1)
    .invoke("text")
    .then((text) => {
      text = text.trim();
      expect(text).to.equal(transID);
    });
  cy.xpath(usersPage.verifyTransactionBtn).click();
  cy.get(usersPage.heading).contains(" Update status ").scrollIntoView();
  affiliatePage.verifyPageTitle("Update status");
  cy.xpath(usersPage.updateStatusBtn).click();
  cy.get(usersPage.toastMessage).should("be.visible");
});

When("user add payment for created transaction", () => {
  cy.xpath(usersPage.addPaymentBtn).click();
  affiliatePage.verifyPageTitle("Add Payment Entry");
  cy.get(usersPage.dropdown).click();
  cy.get(usersPage.listBox).should("be.visible");
  cy.get(usersPage.menuOption).eq(1).click();
  cy.get(usersPage.heading).contains("Add Payment Entry").waitForElement();
  cy.get(usersPage.heading).contains("Add Payment Entry").click();
  cy.get(usersPage.amountRecievedInput).type("1");
  cy.get(usersPage.totalAmount)
    .eq(1)
    .invoke("text")
    .then((text) => {
      const totalAmount = parseInt(text.replace(/[^0-9]/g, ""), 10);
      cy.get(usersPage.amountRecievedInput).clearAndType(totalAmount);
    });
  cy.get(usersPage.dueDate).setDateInFuture();
  cy.get(usersPage.dropdown).eq(1).click();
  cy.get(usersPage.menuOption).eq(1).click();
  const filePath = "sample.jpg";
  cy.get(usersPage.uploadFile).attachFile(filePath);
  cy.get('[class*="attachments"] [class*="file-upload "]').waitForElement();
  cy.get(usersPage.noteInput).clearAndType("This is test note");
  cy.xpath(usersPage.addEntryBtn).click();
});

Then("payment should created", () => {
  affiliatePage.verifyPageTitle("New payment record has been");
});

When("user visit admin portal", () => {
  cy.visit(Cypress.env("adminURL"));
  cy.get(usersPage.emailInput).type(Cypress.env("adminUSERNAME"));
  cy.get(usersPage.passwordInput).type(Cypress.env("adminPASSWORD"));
  cy.get(usersPage.loginBtn).first().click();
});

And("approved the verified transaction", () => {
  cy.xpath(usersPage.transactionTab).click();
  affiliatePage.verifyPageTitle("Transactions");
  cy.get(usersPage.tabList).find("div").contains("Verified").click();
  cy.get(usersPage.tableRow).waitForElement();
  const tid = parseInt(transID.replace(/[^0-9]/g, ""), 10);
  cy.get(usersPage.transactionSearchinput).clearAndType(tid);
  cy.get(usersPage.transactionInstance).first().click();
  cy.get(usersPage.transactionDetail).first().waitForElement();
  cy.get(usersPage.transactionDetail).first().should("be.visible");
  cy.get(usersPage.transactionDetail).eq(1).waitForElement();
  cy.get(usersPage.transactionDetail)
    .eq(1)
    .invoke("text")
    .then((text) => {
      text = text.trim();
      expect(text).to.equal(transID);
    });
  cy.xpath(usersPage.approveBtn).click();
  cy.xpath(usersPage.updateStatusBtn).click();
  cy.get(usersPage.toastMessage).should("be.visible");
});

When("user post the approved transaction on blockchain", () => {
  cy.xpath(usersPage.postblockchainBtn).click();
  cy.xpath(usersPage.proceedBtn).click();
  cy.get(usersPage.locktransactoionInput).type("Test@1234");
  cy.xpath(usersPage.proceedBtn).click();
  cy.get('[class*=" check-circle"]').should("be.visible");
  cy.xpath(usersPage.doneBtn).click();
});

When("user click on create investor button", () => {
  cy.xpath(usersPage.createInvestorBtn).click();
});

Then("investor form should be visible", () => {
  cy.get(usersPage.investorsForm).should("be.visible");
  cy.xpath(usersPage.submitBtn).should("have.attr", "disabled");
});

When("user input all the fields", () => {
  investorName = affiliatePage.generateUsername();
  cy.get(usersPage.userNameInput).type(investorName);
  email = affiliatePage.generateEmail();
  cy.get(usersPage.emailInput).type(email);
  cy.wait(1000);
  cy.get(usersPage.userNameInput).clearAndType(investorName);
  cy.wait(1000);
  cy.get(usersPage.emailInput).clearAndType(email);
  phoneNo = affiliatePage.generatePhoneNo();
  cy.get(usersPage.phoneNoInput).type(phoneNo);
  cnic = affiliatePage.generateCnic();
  cy.get(usersPage.cnicInput).type(cnic);
  cy.get(usersPage.genderInput).select("Male");
  cy.get(usersPage.investorsForm).find("input").eq(4).type("Test@1234");
});

And("click on submit button", () => {
  cy.xpath(usersPage.submitBtn)
    .should("be.enabled")
    .and("not.have.attr", "disabled");
  cy.wait(2000);
  cy.xpath(usersPage.submitBtn).click();
});

Then("transaction created success message should be visible", () => {
  cy.get(usersPage.toastMessage)
    .should("be.visible")
    .and("have.class", "bg-success");
  cy.get(usersPage.toastMessage)
    .first()
    .invoke("text")
    .then((text) => {
      const match = text.match(/DAO-(\d+)/);
      investorId = match && match[0];
    });
});

When("affiliate user click on {string} users tab", (user) => {
  cy.get(usersPage.tabList).last().find("div").contains(user).click();
  cy.wait(3000);
  cy.get("body").then(($body) => {
    if ($body.find('[class*="skeleton-loader "] button').length > 0) {
      cy.get('[class*="skeleton-loader "]').find("button").click();
    }
  });
});

When("click on first user instance", () => {
  cy.get(usersPage.tableRow).waitForElement();
  cy.get(usersPage.tableRow).first().click();
});

Then("user should be directed to investor personal information", () => {
  affiliatePage.verifyPageTitle("Personal Information");
});

When("user click on edit button", () => {
  cy.get(usersPage.userNameInput).should("have.attr", "disabled");
  cy.xpath(usersPage.editBtn).first().click();
});

Then("update button and cencel button should be visible", () => {
  cy.xpath(usersPage.updateBtn).should("be.visible");
  cy.xpath(usersPage.cancelBtn).should("be.visible").click();
});

Then("user form input fields should be enable", () => {
  cy.xpath(usersPage.updateBtn).should("be.visible");
  cy.get(usersPage.userNameInput).should("not.have.attr", "disabled");
});

When("user update all the input fields", () => {
  const updateName = affiliatePage.generateUsername();
  cy.get(usersPage.userNameInput).clearAndType(updateName);
  const updatePhome = affiliatePage.generatePhoneNo();
  cy.get(usersPage.phoneNoInput).clearAndType(updatePhome);
  cy.get(usersPage.nicknameInput).type("Nick name");
  cy.get(usersPage.genderInput).select("Male");
  cy.get(usersPage.dobInput).click();
  cy.get(usersPage.dobInput).type("2023-02-13");
});

And("click on update button", () => {
  cy.xpath(usersPage.updateBtn).click();
});

Then("information updated success message should be visible", () => {
  cy.get(usersPage.toastMessage).should("be.visible");
});

When("user clear filter and click on meetball action button", () => {
  cy.wait(1000);
  cy.get("body").then(($body) => {
    if ($body.find('[class*="skeleton-loader "] button').length > 0) {
      cy.get('[class*="skeleton-loader "]').find("button").click();
    }
  });
  cy.get(usersPage.tableRow).waitForElement();
  cy.get(usersPage.userDropDownMenu).first().click();
});

And("click on reset password button", () => {
  cy.xpath(usersPage.resetPasswordBtn).click();
});

Then("password reset menu should be visible", () => {
  cy.get(usersPage.passworResetMenu).should("be.visible");
});

When("user click on email password link button", () => {
  cy.get(usersPage.passworResetMenu).find("button").eq(1).click();
});

And("click on send button", () => {
  cy.xpath(usersPage.sendBtn).click();
});

Then("email successfully sent with password reset link", () => {
  cy.get(usersPage.toastMessage).should("be.visible");
  cy.get(usersPage.toastMessage)
    .find("span")
    .first()
    .should(
      "have.text",
      "Email has been successfully sent with password reset link",
    );
});

When("user click on meetball action button", () => {
  cy.get(usersPage.userDropDownMenu).first().click();
});

When("user clear the applied filter", () => {
  cy.wait(1000);
  cy.get("body").then(($body) => {
    if ($body.find('[class*="skeleton-loader "] button').length > 0) {
      cy.get('[class*="skeleton-loader "]').find("button").click();
    }
  });
});

When("user click on generate password", () => {
  cy.get(usersPage.passworResetMenu).find("button").last().click();
});

And("type new password and confirm new password", () => {
  cy.xpath(usersPage.generatePasswordBtn).should("have.attr", "disabled");
  cy.get(usersPage.newPasswordInput).clearAndType(TESTDATA.resetPassword);
  cy.get(usersPage.confirmPasswordInput).clearAndType(TESTDATA.resetPassword);
  cy.xpath(usersPage.generatePasswordBtn).should("not.have.attr", "disabled");
});

And("click on generate password button", () => {
  cy.xpath(usersPage.generatePasswordBtn).click();
  cy.xpath(usersPage.sendBtn).waitForElement();
  cy.xpath(usersPage.sendBtn).click();
});

Then("Email successfully sent with new password", () => {
  cy.get(usersPage.toastMessage).should("be.visible");
  cy.get(usersPage.toastMessage)
    .find("span")
    .first()
    .should("have.text", "Email has been successfully sent with new password");
});

And("click on suspend user button", () => {
  cy.get(usersPage.meetballMenu)
    .find("button")
    .last()
    .invoke("text")
    .then((text) => {
      if (text === "Unsuspend User") {
        cy.get(usersPage.meetballMenu).find("button").last().click();
        cy.xpath(usersPage.unsuspendBtn).click();
        cy.get(usersPage.userDropDownMenu).first().click();
      }
    });
  cy.xpath(usersPage.suspendUserBtn).click();
});

Then("confirmation popup should be visible", () => {
  cy.get(usersPage.popupContainer).should("be.visible");
});

When("user click on suspend button", () => {
  cy.xpath(usersPage.suspendBtn).click();
});

Then("suspend success message should be visible", () => {
  cy.get(usersPage.toastMessage)
    .find("span")
    .first()
    .should("have.text", "User suspended Successfully.");
});

And("click on unsuspend user button", () => {
  cy.get(usersPage.meetballMenu).find("button").last().click();
});

When("user click on unsuspend button", () => {
  cy.xpath(usersPage.unsuspendBtn).click();
});

Then("unsuspend success message should be visible", () => {
  cy.get(usersPage.toastMessage)
    .find("span")
    .first()
    .should("have.text", "User unsuspended Successfully.");
});

When("user click on table header {string}", (theader) => {
  cy.wait(1000);
  cy.get("body").then(($body) => {
    if ($body.find('[class*="skeleton-loader "] button').length > 0) {
      cy.get('[class*="skeleton-loader "]').find("button").click();
    }
  });
  cy.get(usersPage.tableRow).waitForElement();
  cy.get(usersPage.tableHeader).contains(theader).click();
  cy.wait(5000);
  cy.get(usersPage.tableRow).waitForElement();
});

Then("user id column data should be sorted in ascending order", () => {
  cy.get(usersPage.tableHeader)
    .first()
    .should("have.attr", "aria-sort", "ascending");
  const textArray = [];
  cy.xpath(usersPage.userIDColumn)
    .each(($element) => {
      const text = $element.text().trim();
      textArray.push(text);
    })
    .then(() => {
      affiliatePage.verifyAscendingSorting(textArray);
    });
});

Then("user id column data should be sorted in descending order", () => {
  cy.get(usersPage.tableHeader)
    .first()
    .should("have.attr", "aria-sort", "descending");
  const textArray = [];
  cy.xpath(usersPage.userIDColumn)
    .each(($element) => {
      const text = $element.text().trim();
      textArray.push(text);
    })
    .then(() => {
      affiliatePage.verifyDescendinSorting(textArray);
    });
});

Then("user name column data should be sorted in ascending order", () => {
  cy.get(usersPage.tableHeader)
    .eq(1)
    .should("have.attr", "aria-sort", "ascending");
  const userName = [];
  cy.xpath(usersPage.userNameColumn)
    .each(($element) => {
      const text = $element.text().toLowerCase();
      userName.push(text);
    })
    .then(() => {
      affiliatePage.verifyAscendingSorting(userName);
    });
});

Then("user name column data should be sorted in descending order", () => {
  cy.get(usersPage.tableHeader)
    .eq(1)
    .should("have.attr", "aria-sort", "descending");
  const userName = [];
  cy.xpath(usersPage.userNameColumn)
    .each(($element) => {
      const text = $element.text().toLowerCase();
      userName.push(text);
    })
    .then(() => {
      affiliatePage.verifyDescendinSorting(userName);
    });
});

Then("user created column data should be sorted in ascending order", () => {
  cy.get(usersPage.tableHeader)
    .eq(2)
    .should("have.attr", "aria-sort", "ascending");
  const userCreatedDates = [];
  cy.xpath(usersPage.userCreatedColumn)
    .each(($element) => {
      const text = $element.text().toLowerCase();
      userCreatedDates.push(text);
    })
    .then(() => {
      affiliatePage.createdTimeAscending(userCreatedDates);
    });
});

Then("user created column data should be sorted in descending order", () => {
  cy.get(usersPage.tableHeader)
    .eq(2)
    .should("have.attr", "aria-sort", "descending");
  const userCreatedDates = [];
  cy.xpath(usersPage.userCreatedColumn)
    .each(($element) => {
      const text = $element.text().toLowerCase();
      userCreatedDates.push(text);
    })
    .then(() => {
      affiliatePage.createdTimeDescending(userCreatedDates);
    });
});

When("user click on {string} tab from user info", (tab) => {
  cy.get(usersPage.tabList).find("div").contains(tab).click();
});

Then(
  "user should be able to view banking details for {string} user",
  (user) => {
    affiliatePage.verifyPageTitle("Bank Details");
  },
);

Then("user can see legal info for {string} user", (user) => {
  affiliatePage.verifyPageTitle("Legal Information");
});

When("user click on add bank account button", () => {
  cy.xpath(usersPage.addBankAccountBtn).click();
});

Then("{string} modal should be visible", (action) => {
  affiliatePage.verifyPageTitle(action);
});

When("user {string} bank details for investor", (action) => {
  let accountNo = "";
  let iban = "";
  if (action === "add") {
    cy.get(usersPage.dropdown).click();
    cy.get(usersPage.menuOption)
      .its("length")
      .then((length) => {
        const randomIndex = Math.floor(Math.random() * length);
        cy.get(usersPage.menuOption).eq(randomIndex).click();
      });
  }
  cy.get(usersPage.accountTitleInput).clearAndType(accountTitle);

  for (let index = 0; index < 13; index++) {
    accountNo += Math.floor(Math.random() * 10);
  }
  cy.get(usersPage.accountNumberinput).clearAndType(accountNo);
  iban = affiliatePage.generateString(25);
  cy.get(usersPage.ibanInput).clearAndType(iban);
  cy.get(usersPage.checkbox).click();
});

And("click on add bank button", () => {
  cy.xpath(usersPage.addBankBtn).click();
});

Then("banking details should be added", () => {
  cy.get(usersPage.toastMessage).should("be.visible");
  cy.get(usersPage.toastMessage)
    .find("sapn").first()
    .should("have.text", "Bank added successfully");
});

Then("user can see investor's legal information", () => {
  affiliatePage.verifyPageTitle("Legal Information");
});

When("user click on edit button to edit information", () => {
  cy.xpath(usersPage.editBtn).first().click();
});

Then("input field should be enabled", () => {
  cy.get(usersPage.legalInformationInput).first().should("be.enabled");
});

And("user type cnic", () => {
  cnic = affiliatePage.generateCnic();
  cy.get(usersPage.legalInformationInput).first().clearAndType(cnic);
});

And("upload cnic photos", () => {
  cy.window().then((win) => {
    cy.log("Injecting jQuery into the window object");
    const script = win.document.createElement("script");
    script.src = "https://code.jquery.com/jquery-3.6.0.min.js";
    win.document.head.appendChild(script);

    // Wait for jQuery to load (if it's not already available on the page)
    return new Cypress.Promise((resolve) => {
      script.onload = resolve;
    }).then(() => {
      const $element = win.jQuery(
        '[class*="file-upload-actions"] [class*="dropdown-toggle"]',
      );
      const elementFound = $element.length;
      if (elementFound > 0) {
        cy.log("found");
        cy.get(usersPage.fileDropdownAction)
          .its("length")
          .then((length) => {
            for (let index = 0; index < length; index++) {
              cy.get(usersPage.fileDropdownAction).first().click();
              cy.xpath(usersPage.deleteBtn).last().click();
            }
          });
      }
      cy.log("not found");
      const filePath = "testing.jpg";
      cy.get(usersPage.uploadFile).first().attachFile(filePath);
      cy.wait(5000);
      cy.xpath(usersPage.uploadFile2).attachFile("testing.jpg");
      cy.wait(5000);
    });
  });
});

And("select filing status type national tax number", () => {
  const radioBtn = Math.floor(Math.random() * 3);
  cy.get(usersPage.filingRadioBtn).eq(radioBtn).click();
  if (radioBtn === 1) {
    cy.xpath(usersPage.taxNumberInput).clearAndType("12121212");
  }
});

And("click on info update button", () => {
  cy.xpath(usersPage.updaqteInfoBtn).click();
});

Then("information should be updated", () => {
  cy.get(usersPage.toastMessage).should("be.visible");
});

When("user click on add next of kin button", () => {
  cy.xpath(usersPage.addNewKinBtn).click();
});

Then("kin form should be visible", () => {
  cy.get(usersPage.nextOfKinForm).should("be.visible");
});

When("user upload photo of the kin", () => {
  const filePath = "testing.jpg";
  cy.get(usersPage.uploadFile).attachFile(filePath);
});

And("fill the form", () => {
  cy.get(usersPage.nameInput).clearAndType(affiliatePage.generateUsername());
  cy.get(usersPage.relattioInput).clearAndType("Brother");
  cy.get(usersPage.emailInput).clearAndType(affiliatePage.generateEmail());
  cy.get(usersPage.mobileInput).clearAndType(affiliatePage.generatePhoneNo());
  cy.get(usersPage.kinCnic).clearAndType(affiliatePage.generateCnic());
  cy.get(usersPage.addressInput).clearAndType("This is automated test address");
  cy.get(usersPage.distributionInput).clearAndType("50");
});

And("click on add next of kin button", () => {
  cy.xpath(usersPage.addKinBtn).should("be.enabled");
  cy.xpath(usersPage.addKinBtn).click();
});

Then("new kin should be added", () => {
  cy.get(usersPage.toastMessage).should("be.visible");
});

When("user click on kin action button", () => {
  cy.get(usersPage.meetballActionBtn).last().click();
});

And("click on {string} button", (button) => {
  if (button === "edit") {
    cy.xpath(usersPage.editBtn).last().click();
  } else if (button === "delete") {
    cy.xpath(usersPage.deleteBtn).last().click();
  }
});

And("click on update kin button", () => {
  cy.xpath(usersPage.updateKinBtn).click();
});

Then("kin information should be updated successfully", () => {
  cy.get(usersPage.toastMessage).should("be.visible");
});

Then("delete popup should be visible", () => {
  cy.get(usersPage.popupContainer).should("be.visible");
});

When("user confirm the delete kin", () => {
  cy.get(usersPage.popupContainer).find("button").contains("Delete").click();
});

Then("kin should be deleted", () => {
  cy.get(usersPage.toastMessage).should("be.visible");
});

When("user click on {string} tab", (user) => {
  cy.get(usersPage.tabList).last().find("div").contains(user).click();
  cy.wait(5000);
  cy.get("body").then(($body) => {
    if ($body.find('[class*="skeleton-loader "] button').length > 0) {
      cy.get('[class*="skeleton-loader "]').find("button").click();
    }
  });
});

Then("user can see investor", () => {
  cy.get(usersPage.tableRow).should("be.visible");
});

When("user click on first investor instance", () => {
  cy.get(usersPage.tableRow).first().click();
});

And("click on {string} tab", (tab) => {
  cy.get(usersPage.investordetailTabs).contains(tab).click();
});

Then("porfolio balance details should not available", () => {
  cy.get('[class="portfolio-balance"] p')
    .first()
    .should("have.text", "No balance available.");
});

Then("transaction should not be visible", () => {
  affiliatePage.verifyPageTitle("No transactions yet");
});

Then("user can see investor portfolio", () => {
  cy.get(usersPage.tableRow).should("be.visible");
});

Then("user can see investor's transaction", () => {
  cy.get(usersPage.tableRow).should("be.visible");
});

Then("investor activity should be visible", () => {
  cy.get(usersPage.tableRow).should("be.visible");
});

When("user click on new address button", () => {
  cy.get(usersPage.addressCard)
    .its("length")
    .then((length) => {
      // let addressLength = length
      cy.wrap(length).as("addressLength");
    });
  cy.xpath(usersPage.newAddressBtn).click();
});

Then("add new address modal should appear", () => {
  cy.get(usersPage.rightModalWindow).should("be.visible");
});

When("user type new address information", () => {
  cy.get(usersPage.addressLine1).clearAndType("Test Address 1");
  cy.get(usersPage.addressLine2).clearAndType("Test Address 2");
  cy.get(usersPage.cityInput).clearAndType("Test City");
  cy.get(usersPage.countryInput).clearAndType("Test Country");
});

And("click on add address button", () => {
  cy.xpath(usersPage.addAddressBtn).click();
});

Then("new address should be added", () => {
  cy.get(usersPage.toastMessage).should("be.visible");
  cy.wait(1000);
  cy.get(usersPage.addressCard)
    .its("length")
    .then((length) => {
      cy.get("@addressLength").then((addressLength) => {
        expect(length).to.be.greaterThan(addressLength);
      });
    });
});

When("user click on address action button", () => {
  cy.get(usersPage.meetballActionBtn).last().click();
});

And("click on update address button", () => {
  cy.xpath(usersPage.updateaddressBtn).click();
});

Then("address should be updated", () => {
  cy.get(usersPage.toastMessage).should("be.visible");
});

When("user confirm the delete address", () => {
  cy.get(usersPage.popupContainer).find("button").contains("Delete").click();
});

Then("address should be deleted", () => {
  cy.get(usersPage.toastMessage).should("be.visible");
});

When("user click on bank action button", () => {
  cy.wait(3000);
  cy.get(usersPage.bankActionBtn).last().click();
});

And("click on update bank button", () => {
  cy.xpath(usersPage.updateBankBtn).click();
});

Then("banking details should be updated", () => {
  cy.get(usersPage.toastMessage).should("be.visible");
});

When("user confirm the delete banking details", () => {
  cy.get(usersPage.popupContainer).find("button").contains("Delete").click();
});

Then("banking details should be deleted", () => {
  cy.get(usersPage.toastMessage).should("be.visible");
});

When("user click on {string} icon", (menu) => {
  if (menu === "collaps") {
    cy.get('[class*="sidebar-menu "]').then(($element) => {
      const expand = $element.width();
      cy.wrap(expand).as("expand");
    });
  } else if (menu === "expand") {
    cy.get('[class*="sidebar-menu "]').then(($element) => {
      const collaps = $element.width();
      cy.wrap(collaps).as("collaps");
    });
  }
  cy.get('[class="sidebar-slim-toggle"]').invoke(
    "css",
    "visibility",
    "visible",
  );
  cy.get('[class="sidebar-slim-toggle"]').invoke("css", "opacity", "1");
  cy.get('[class="sidebar-slim-toggle"]').click();
  cy.wait(1000);
});

Then("navigation menu should be {string}", (menu) => {
  if (menu === "collaps") {
    cy.get("@expand").then((expand) => {
      cy.get('[class*="sidebar-menu "]').then(($element) => {
        const collaps = $element.width();
        expect(collaps).to.be.lessThan(expand);
      });
    });
  } else if (menu === "expand") {
    cy.get("@collaps").then((collaps) => {
      cy.get('[class*="sidebar-menu "]').then(($element) => {
        const expand = $element.width();
        expect(collaps).to.be.lessThan(expand);
      });
    });
  }
});

When("user click on clear filter button", () => {
  cy.wait(5000);
  cy.get("body").then(($body) => {
    if ($body.find('[class*="skeleton-loader "] button').length > 0) {
      cy.xpath(usersPage.clearFilterBtn).click({ force: true });
    }
  });
});

Then("applied filter should be clear", () => {
  cy.get(usersPage.filterLabel).should("have.length", 1);
});

When("user click filter button", () => {
  cy.get(usersPage.filterBtn).click();
});

Then("filter menu should be appear", () => {
  cy.get(usersPage.filterMenu).should("be.visible");
});

When("user click on add filter button", () => {
  cy.xpath(usersPage.addFilterBtn).click();
});

Then("filter droopdown should be visible", () => {
  cy.get(usersPage.filterDropDown).should("be.visible");
});

And("select filter options", () => {
  cy.get(usersPage.filterCheck)
    .its("length")
    .then((length) => {
      for (let index = 0; index < length; index++) {
        cy.get(usersPage.filterCheck).eq(index).click();
      }
    });
});

When("click on duration filter", () => {
  cy.get(usersPage.filterCategory).contains(" Select Duration ").click();
});

And("select start and end date", () => {
  cy.get(usersPage.dateInput).first().type("2023-02-13");
  cy.get(usersPage.dateInput).last().type("2023-04-28");
});

And("click on apply button", () => {
  cy.xpath(usersPage.applyBtn).should("be.enabled").click();
});

Then("filter should be applied", () => {
  cy.get(usersPage.filterLabel).should("have.length", 2);
});

When("click on save filter button", () => {
  cy.xpath(usersPage.saveFilterBtn).click();
});

And("type filter name", () => {
  const filterName = "testfilter" + Math.floor(Math.random() * 100);
  cy.get(usersPage.filterNameInput).first().clearAndType(filterName);
  cy.wrap(filterName).as("filterName");
});

And("select default filter", () => {
  cy.get(usersPage.defaultFilter).click();
  cy.get(usersPage.filterOption).contains("1 month").click();
});

And("click on save button", () => {
  cy.xpath(usersPage.saveBtn).click();
});

Then("created filter should be saved", () => {
  cy.wait(1000);
  cy.get("@filterName").then((filterName) => {
    cy.get(usersPage.filtersdropdownBtn)
      .first()
      .should("contain.text", filterName);
  });
});

When("user click on saved filter button", () => {
  cy.xpath(usersPage.savedFilterBtn).click();
});

Then("saved filter should be visible", () => {
  cy.get(usersPage.savedFilterItems).should("be.visible");
});

When("user select saved filter", () => {
  cy.get(usersPage.savedFilterItems)
    .its("length")
    .then((length) => {
      const randomIndex = Math.floor(Math.random() * length);

      cy.get(usersPage.savedFilterItems)
        .eq(randomIndex)
        .invoke("text")
        .then((text) => {
          const savedFilter = text;
          cy.wrap(savedFilter).as("savedFilter");
        });

      cy.get(usersPage.savedFilterItems).eq(randomIndex).click();
    });
});

Then("saved filter should be applied", () => {
  cy.get(1000);
  cy.get("@savedFilter").then((savedFilter) => {
    cy.get(usersPage.filtersdropdownBtn)
      .first()
      .should("contain.text", savedFilter);
  });
});

When("user click on users filter", () => {
  cy.get(usersPage.filtersdropdownBtn).contains("Category").click();
});

And("select {string} filter", (user) => {
  cy.get(usersPage.savedFilterItems).contains(user).click();
});

And("select the checkboxes", () => {
  cy.get(usersPage.filterCheck)
    .its("length")
    .then((length) => {
      for (let index = 0; index < length; index++) {
        cy.get(usersPage.filterCheck).eq(index).click();
      }
      cy.wrap(length).as("appliedFilter");
    });
});

Then("selected filter should be visible", () => {
  cy.get(usersPage.filtersdropdownBtn)
    .its("length")
    .then((length) => {
      cy.get("@appliedFilter").then((appliedFilter) => {
        expect(length).to.be.equal(appliedFilter + 4);
      });
    });
});

And("click on {string} filter checkbox", (checkbox) => {
  cy.get(usersPage.filterCheck).contains(checkbox).click();
});

When("click on {string} filter droopdown", (filterDropdown) => {
  cy.get(usersPage.filtersdropdownBtn).contains(filterDropdown).click();
});

And("select start and end date", () => {
  cy.get(usersPage.dateInput).first().type("2023-04-28");
  const currentDate = new Date();
  cy.log(currentDate);
  const formattedDate = currentDate.toISOString().split("T")[0];
  cy.log(formattedDate);
  cy.get(usersPage.dateInput).last().type(formattedDate);
});

When("click on project filter droopdown", () => {
  cy.get(usersPage.filtersdropdownBtn).contains("All Project").click();
});

And("type area range", () => {
  cy.get(usersPage.areaInput).first().type("50");
  cy.get(usersPage.areaInput).last().type("100");
});

When("user click on search field", () => {
  cy.get(usersPage.searchInput).click();
});

And("click on {string} tag", (filterTab) => {
  if (filterTab === "User ID") {
    cy.log("User ID Selected");
  } else {
    cy.get(usersPage.filterTabs).contains(filterTab).click();
  }
});

When("user type {string} in search field", (filterTab) => {
  if (filterTab === "User ID") {
    const uid = parseInt(investorId.replace(/[^0-9]/g, ""), 10);
    cy.get(usersPage.searchInput).type(uid);
  } else if (filterTab === "Name") {
    cy.get(usersPage.searchInput).type(investorName);
  } else if (filterTab === "Mobile No.") {
    cy.get(usersPage.searchInput).type(phoneNo);
  } else if (filterTab === "CNIC") {
    cy.get(usersPage.searchInput).type(cnic);
  }
});

And("click on first search result", () => {
  cy.window().then((win) => {
    cy.stub(win, "open")
      .callsFake((url, target) => {
        return win.open.wrappedMethod.call(win, url, "_self");
      })
      .as("open");
  });
  cy.get(usersPage.searchResult).first().click();
});

Then("{string} should match with searched {string}", (filterTab) => {
  if (filterTab === "User ID") {
    cy.get(usersPage.investorId).should("have.text", investorId);
  } else if (filterTab === "Name") {
    cy.wait(1000);
    cy.get(usersPage.heading).first().should("have.text", investorName);
  } else if (filterTab === "Mobile No.") {
    cy.xpath(usersPage.editBtn).first().click();
    cy.wait(2000);
    cy.get(usersPage.phoneNoInput).invoke("removeAttr", "disabled");

    cy.get(usersPage.phoneNoInput)
      .invoke("val")
      .then((value) => {
        cy.log(value);
        value = value.replace(/\s+/g, "");
        cy.log(value);
        expect(value).to.equal(phoneNo);
      });
  } else if (filterTab === "CNIC") {
    cy.get(usersPage.tabList).find("div").contains("Legal Info").click();
    cy.xpath(usersPage.editBtn).first().click();
    cy.wait(2000);
    const cnicInput = 'input[placeholder="00000-0000000-0"]';
    cy.get(cnicInput)
      .invoke("text")
      .then((text) => {
        cy.log(text);
        text = parseInt(text.replace(/[^0-9]/g, ""), 10);
        cy.log(text);
        expect(text).to.be.equal(cnic);
      });
  }
});

When("user click on clear filter button from filter menu", () => {
  cy.xpath(usersPage.clearFilterLabel).click();
});

When("user type invalid {string} in search field", (filterTab) => {
  if (filterTab === "User ID") {
    cy.get(usersPage.searchInput).type("0000");
  } else if (filterTab === "Name") {
    cy.get(usersPage.searchInput).type("invalid");
  } else if (filterTab === "Mobile No.") {
    cy.get(usersPage.searchInput).type("9876543210");
  } else if (filterTab === "CNIC") {
    cy.get(usersPage.searchInput).type("9876543210");
  }
});

Then("No Result Found message should be visible", () => {
  cy.xpath(usersPage.noResultFound).should("be.visible");
});

Then("copy user id from first table instance", () => {
  cy.xpath(usersPage.userIDColumn)
    .invoke("text")
    .then((text) => {
      text = parseInt(text.replace(/[^0-9]/g, ""), 10);
      const copiedId = text;
      cy.wrap(copiedId).as("copiedId");
    });
});

And("type user id in search field", () => {
  cy.get("@copiedId").then((copiedId) => {
    cy.get(usersPage.searchInput).type(copiedId);
  });
});

Then("searched results should be visible", () => {
  cy.get(usersPage.searchResult).should("be.visible");
  cy.get(usersPage.searchResult).should("have.length", 1);
});

When("clear the search field", () => {
  cy.get(usersPage.searchInput).clear();
});

Then("recent searches should be appear", () => {
  cy.get(usersPage.recentSearch)
    .find("p")
    .contains("Recent Searches")
    .should("be.visible");
  cy.get("@copiedId").then((copiedId) => {
    cy.get(usersPage.recentSearch)
      .find("p")
      .contains(copiedId)
      .should("be.visible");
  });
});

When("user click on recent search result", () => {
  cy.get(usersPage.recentSearch).find("i").click();
});

When("user type user name", () => {
  investorName = affiliatePage.generateUsername();
  cy.get(usersPage.userNameInput).type(investorName);
});

Then("submit buttom should be disabled", () => {
  cy.xpath(usersPage.submitBtn).should("have.attr", "disabled");
});

When("user type email", () => {
  email = affiliatePage.generateEmail();
  cy.get(usersPage.emailInput).type(email);
});

When("user type mobile number", () => {
  phoneNo = affiliatePage.generatePhoneNo();
  cy.get(usersPage.phoneNoInput).type(phoneNo);
});

When("user type password", () => {
  cy.get(usersPage.investorsForm).find("input").eq(4).clearAndType("Test@1234");
});

Then("submit button should be enabled", () => {
  cy.xpath(usersPage.submitBtn)
    .should("be.enabled")
    .and("not.have.attr", "disabled");
});

And("close the investor form", () => {
  cy.get(usersPage.closeBtn).click();
});
