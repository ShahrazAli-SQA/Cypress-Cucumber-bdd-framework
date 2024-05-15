import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import { adminPage, TESTDATA } from "../constant/admin";
import { usersPage } from "../pages/usersPage";

let investorId = "";
const transID = "";
let investorName = " WaqasQAUsertwo ";
let email = "";
let phoneNo = "";
let cnic = "";
const accountTitle = "Test Tittle";
Given("user login admin portal and visit users module", () => {
  adminPage.login();
  cy.get(usersPage.navigationMenu).contains("Users").click();
  adminPage.verifyPageTitle("Users");
});

When("user click on create investor button", () => {
  cy.xpath(usersPage.createInvestorBtn).click();
});

Then("investor form should be visible", () => {
  cy.get(usersPage.investorsForm).should("be.visible");
  cy.xpath(usersPage.submitBtn).should("have.attr", "disabled");
});

When("user input all the fields", () => {
  investorName = adminPage.generateUsername();
  cy.get(usersPage.userNameInput).type(investorName);
  email = adminPage.generateEmail();
  cy.get(usersPage.emailInput).type(email);
  phoneNo = adminPage.generatePhoneNo();
  cy.get(usersPage.phoneNoInput).type(phoneNo);
  cnic = adminPage.generateCnic();
  cy.get(usersPage.cnicInput).type(cnic);
  cy.get(usersPage.genderInput).select("Male");
  cy.get(usersPage.investorsForm).find("input").eq(4).type("Sandbox1@");
});

And("click on submit button", () => {
  cy.xpath(usersPage.submitBtn).should("not.have.attr", "disabled");
  cy.xpath(usersPage.submitBtn).click();
});

Then("success message should be visible", () => {
  cy.get(usersPage.toastMessage)
    .should("be.visible")
    .and("have.class", "bg-success");
  cy.get(usersPage.toastMessage)
    .first()
    .invoke("text")
    .then((text) => {
      const match = text.match(/DAO-(\d+)/);
      investorId = match && match[0];
      cy.log(investorId);
    });
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
      .invoke("val")
      .then((val) => {
        cy.log(val);
        val = parseInt(val.replace(/[^0-9]/g, ""), 10);
        cy.log(val);
        val = val.toString();
        cnic = cnic.toString();
        expect(val).to.be.equal(cnic);
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
  cy.wait(3000);
  cy.get(usersPage.tableRow).should("be.visible");
  cy.get(usersPage.filterLabel).should("have.length", 1);
});

When("user click filter button", () => {
  cy.get(usersPage.filterBtn).click();
});

Then("filter menu should be appear", () => {
  cy.get(usersPage.filterMenu).should("be.visible");
});

When("user click on clear filter button from filter menu", () => {
  cy.xpath(usersPage.clearFilterLabel).click();
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

When("click on project filter droopdown", () => {
  cy.get(usersPage.filtersdropdownBtn).contains("All Project").click();
});

And("type area range", () => {
  cy.get(usersPage.areaInput).first().type("50");
  cy.get(usersPage.areaInput).last().type("100");
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
    .first()
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
  investorName = adminPage.generateUsername();
  cy.get(usersPage.userNameInput).type(investorName);
});

Then("submit buttom should be disabled", () => {
  cy.xpath(usersPage.submitBtn).should("have.attr", "disabled");
});

When("user type email", () => {
  email = adminPage.generateEmail();
  cy.get(usersPage.emailInput).type(email);
});

When("user type mobile number", () => {
  phoneNo = adminPage.generatePhoneNo();
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
  cy.xpath(usersPage.closeBtn).click();
});

When("user input username in search field", () => {
  cy.get(usersPage.tableRow).waitForElement();
  cy.get(usersPage.searchInput).first().type(investorName);
});

And("click on first instance", () => {
  cy.get(usersPage.tableRow).waitForElement();
  cy.get(usersPage.tableRow).first().should("be.visible").click();
});

Then("investor username should match with searched username", () => {
  cy.get(usersPage.heading).first().should("have.text", investorName);
  cy.get(usersPage.profileBackBtn).click();
});

When("user input id in search field", () => {
  cy.get(usersPage.tableRow).waitForElement();
  cy.get(usersPage.searchInput).first().type(investorId);
});

Then("investor id should match with searched id", () => {
  cy.get(usersPage.investorId).should("have.text", investorId);
  cy.get(usersPage.profileBackBtn).click();
});

When("user input phone No in search field", () => {
  cy.get(usersPage.tableRow).waitForElement();
  cy.get(usersPage.searchInput).first().type(phoneNo);
});

Then("investor phone NO should match with searched phone No", () => {
  cy.xpath(usersPage.editBtn).click();
  cy.get(usersPage.phoneNoInput)
    .invoke("val")
    .then((value) => {
      cy.log(value);
      value = value.replace(/\s+/g, "");
      cy.log(value);
      expect(value).to.equal(phoneNo);
    });
  cy.get(usersPage.profileBackBtn).click();
});

When("user click on investor instance", () => {
  cy.get(usersPage.tableRow).waitForElement();
  cy.get(usersPage.tableRow).first().click();
});

Then("user should be directed to investor personal information", () => {
  cy.get(usersPage.heading).first().should("be.visible");
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
  cy.get(usersPage.userNameInput).type(" " + TESTDATA.updateName);
  cy.get(usersPage.phoneNoInput).clearAndType(adminPage.generatePhoneNo());
  cy.get(usersPage.nicknameInput).type("Nick name");
  cy.get(usersPage.genderInput).select("Male");
  cy.get(usersPage.dobInput).click();
  cy.get(usersPage.dobInput).type("2023-02-13");
});

And("click on update button", () => {
  cy.xpath(usersPage.updateBtn).click();
});

Then("information success message should be visible", () => {
  cy.get(usersPage.toastMessage).should("be.visible");
});

When("user click on three dot menu", () => {
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
  cy.xpath(usersPage.unsuspendUserBtn).click();
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
      adminPage.verifyAscendingSorting(textArray);
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
      adminPage.verifyDescendinSorting(textArray);
    });
});

Then("user name column data should be sorted in ascending order", () => {
  cy.get(usersPage.tableHeader)
    .eq(1)
    .should("have.attr", "aria-sort", "ascending");
  const userName = [];
  cy.xpath(usersPage.userNameColumn)
    .each(($element) => {
      const text = $element.text().toLowerCase().trim();
      if (text !== "n/a") {
        userName.push(text);
      }
    })
    .then(() => {
      adminPage.verifyAscendingSorting(userName);
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
      adminPage.verifyDescendinSorting(userName);
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
      adminPage.createdTimeAscending(userCreatedDates);
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
      adminPage.createdTimeDescending(userCreatedDates);
    });
});

When("user {string} tab", (tabs) => {
  if (tabs === "Bank details") {
    cy.get(usersPage.tabList).find("div").contains("Bank Details").click();
  } else if (tabs === "Legal info") {
    cy.get(usersPage.tabList).find("div").contains("Legal Info").click();
  }
});

Then("user should be to view investor bank details", () => {
  adminPage.verifyPageTitle("Bank Details");
});

When("user click on add bank account button", () => {
  cy.xpath(usersPage.addBankAccountBtn).click();
});

Then("add bank account modal should be visible", () => {
  adminPage.verifyPageTitle("Add Bank Account");
});

When("user add bank details for investor", () => {
  let accountNo = "";
  let iban = "";
  cy.get(usersPage.dropdown).click();
  cy.get(usersPage.menuOption)
    .its("length")
    .then((length) => {
      const randomIndex = Math.floor(Math.random() * length);
      cy.get(usersPage.menuOption).eq(randomIndex).click();
    });
  cy.get(usersPage.accountTitleInput).clearAndType(accountTitle);

  for (let index = 0; index < 13; index++) {
    accountNo += Math.floor(Math.random() * 10);
  }
  cy.get(usersPage.accountNumberinput).clearAndType(accountNo);
  iban = adminPage.generateString(25);
  cy.get(usersPage.ibanInput).clearAndType(iban);
  cy.get(usersPage.checkbox).click();
});

And("click on add bank button", () => {
  cy.xpath(usersPage.addBankBtn).click();
});

Then("banking details should be added", () => {
  cy.get(usersPage.toastMessage).should("be.visible");
  // cy.get(usersPage.toastMessage)
  //   .find("sapn").first()
  //   .should("have.text", "Bank added successfully");
});

When("user clear the applied filter", () => {
  cy.wait(1000);
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

When("user click on {string} tab", (user) => {
  cy.get(usersPage.tabList).last().find("div").contains(user).click();
  cy.wait(5000);
  cy.get("body").then(($body) => {
    if ($body.find('[class*="skeleton-loader "] button').length > 0) {
      cy.get('[class*="skeleton-loader "]').find("button").click();
    }
  });
});

Then("user can see investor's legal information", () => {
  adminPage.verifyPageTitle("Legal Information");
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
  cy.get(usersPage.nameInput).clearAndType(adminPage.generateUsername());
  cy.get(usersPage.relattioInput).clearAndType("Brother");
  cy.get(usersPage.emailInput).clearAndType(adminPage.generateEmail());
  cy.get(usersPage.mobileInput).clearAndType(adminPage.generatePhoneNo());
  cy.get(usersPage.kinCnic).clearAndType(adminPage.generateCnic());
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

Then("user can see investor", () => {
  cy.get(usersPage.tableRow).should("be.visible");
});

When("user click on first investor instance", () => {
  cy.get(usersPage.tableRow).first().click();
});

And("click on {string} tab", (tab) => {
  cy.get(usersPage.investordetailTabs).contains(tab).click();
});

Then("investor activity should be visible", () => {
  cy.xpath(usersPage.investorActivity).should("be.visible");
});

When("user click on new address button", () => {
  cy.get(usersPage.addressCard)
    .its("length")
    .then((length) => {
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
