import { transactionPage } from "../pages/transactionPage";
import { usersPage } from "../pages/usersPage";

export const TESTDATA = {
  testUsername: "Automation Engineer",
  testId: "DAO-2166",
  testPhoneNo: "3015555555",
  testEmail: "automation.engineer@gmail.com",
  testPassword: "Test@1234",
  updateName: "Updated",
  updatePhone: "3011111111",
  resetPassword: "11223344",
  agentName: "Test ",
};
class Affiliate {
  login() {
    cy.visit(Cypress.env("affiliateURL"));
    cy.get(usersPage.emailInput).type(Cypress.env("affiliateUSERNAME"));
    cy.get(usersPage.passwordInput).type(Cypress.env("affiliatePASSWORD"));
    cy.get(usersPage.loginBtn).first().click();
    cy.get(usersPage.toastMessage).should("be.visible");
    cy.get(usersPage.heading)
      .first()
      .should("be.visible")
      .and("have.text", "Users");
  }

  Logout() {
    cy.get(usersPage.avatarIcon).click();
    cy.get(usersPage.logOutBtn).waitForElement();
    cy.get(usersPage.logOutBtn).click();
  }

  generateCnic() {
    let randomNum = "";

    for (let i = 0; i < 13; i++) {
      randomNum += Math.floor(Math.random() * 10); // Generate a random digit between 0 and 9
    }
    return randomNum;
  }

  generatePhoneNo() {
    let randomNum = "3";
    randomNum += Math.floor(Math.random() * 5);
    for (let i = 0; i < 8; i++) {
      randomNum += Math.floor(Math.random() * 10); // Generate a random digit between 0 and 9
    }

    return randomNum;
  }

  generateEmail() {
    const randomString = Math.random().toString(36).substring(2, 8);
    const randomEmail = `user_${randomString}@gmail.com`;
    return randomEmail;
  }

  generateUsername() {
    const adjectives = [
      "Great",
      "Awesome",
      "Fantastic",
      "Amazing",
      "Brilliant",
      "Creative",
      "Genius",
    ];
    const nouns = [
      "Coder",
      "Developer",
      "Programmer",
      "Hacker",
      "Engineer",
      "Guru",
      "Wizard",
    ];

    const randomAdjectiveIndex = Math.floor(Math.random() * adjectives.length);
    const randomNounIndex = Math.floor(Math.random() * nouns.length);

    const adjective = adjectives[randomAdjectiveIndex];
    const noun = nouns[randomNounIndex];

    const username = `${adjective} ${noun}`;
    return username;
  }

  generateString(length) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }

  createInvestor(name, email, phoneNo, cnic) {
    cy.xpath(usersPage.createInvestorBtn).click();
    cy.get(usersPage.investorsForm).should("be.visible");
    cy.xpath(usersPage.submitBtn).should("have.attr", "disabled");
    cy.get(usersPage.userNameInput).click();
    cy.get(usersPage.userNameInput).type(name);
    cy.get(usersPage.emailInput).type(email);
    cy.wait(1000);
    cy.get(usersPage.userNameInput).clearAndType(name);
    cy.wait(1000);
    cy.get(usersPage.emailInput).clearAndType(email);
    cy.get(usersPage.phoneNoInput).type("0" + phoneNo);
    cy.get(usersPage.cnicInput).type(cnic);
    cy.get(usersPage.genderInput).select("Male");
    cy.get(usersPage.investorsForm).find("input").eq(4).type("Test@1234");
    cy.wait(1000);
    cy.xpath(usersPage.submitBtn).should("be.enabled");
    cy.wait(2000);
    cy.xpath(usersPage.submitBtn).click();
    cy.get(usersPage.toastMessage).should("be.visible");
    return cy
      .get(usersPage.toastMessage)
      .first()
      .invoke("text")
      .then((text) => {
        const match = text.match(/DAO-(\d+)/);
        const investorId = match && match[0];
        return investorId;
      });
  }

  createTransaction(investorId) {
    cy.xpath(transactionPage.transactionTab).click();
    cy.get(transactionPage.heading).contains("Transactions");
    cy.xpath(transactionPage.createTransactionBtn).click();
    cy.get(transactionPage.transactionMenu).should("be.visible");
    cy.xpath(transactionPage.ppTransactionBtn).click();
    cy.xpath(transactionPage.searchinvestor).should("be.visible");
    cy.xpath(transactionPage.searchinvestor).clearAndType(investorId);
    cy.get(transactionPage.investorsList)
      .first()
      .find(".user-item")
      .first()
      .click();
    cy.xpath(transactionPage.searchAgent).clearAndType(TESTDATA.agentName);
    cy.get(transactionPage.agentList).last().click();
    cy.get(transactionPage.procedNextBtn).should("not.have.attr", "disabled");
    cy.get(transactionPage.procedNextBtn).click();
    // add project information
    cy.xpath(transactionPage.projectinput)
      .invoke("css", "opacity", "1")
      .should("be.visible");
    cy.xpath(transactionPage.projectinput).click();
    cy.get(transactionPage.projectOption).find("span").last().click();
    cy.get(transactionPage.transactionType).click({ force: true });
    cy.get(transactionPage.transactionOption).first().click();
    cy.get(transactionPage.selectRound).last().click({ force: true });
    cy.get(transactionPage.roundoption).eq(1).click();
    // check amount before selecting area
    cy.xpath(transactionPage.areaInput).clearAndType("100");
    return cy
      .xpath(transactionPage.rateAdjustInput)
      .invoke("val")
      .then((rate) => {
        const amount = rate * 100;
        cy.wrap(amount).as("totalAmount");
        // check amount after selecting area

        cy.get(transactionPage.duedate).setDateInFuture();
        cy.get(transactionPage.percentageBtn).first().click();
        cy.get(transactionPage.percentageBtn).eq(1).click();
        const randomNumber = Math.floor(Math.random() * 10) + 1;
        cy.xpath(transactionPage.discountAmmount).clearAndType(randomNumber);
        // check amount after selecting discount
        cy.xpath(transactionPage.proceedBtn).last().click();
        cy.get(transactionPage.heading)
          .contains("Transaction Summary")
          .should("be.visible");

        cy.xpath(transactionPage.createTransactionNow).click();

        cy.get(transactionPage.toastMessage).should("be.visible");
        cy.get(transactionPage.transactionSuccess)
          .first()
          .should("be.visible")
          .and(
            "have.text",
            " Your Transaction has been created Successfully! ",
          );
        return cy
          .get(transactionPage.transactionId)
          .first()
          .invoke("text")
          .then((tid) => {
            return tid;
          });
      });
  }

  verifyAscendingSorting(textArray) {
    let sorting = "";
    for (let i = 0; i < textArray.length - 1; i++) {
      if (textArray[i] > textArray[i + 1]) {
        sorting = "false";
        break;
      }
      sorting = "true";
    }
    expect(sorting).to.be.equal("true");
  }

  verifyDescendinSorting(textArray) {
    let sorting = "";
    console.log(textArray);
    for (let i = 0; i < textArray.length - 1; i++) {
      if (textArray[i] < textArray[i + 1]) {
        sorting = "false";
        break;
      }
      sorting = "true";
    }
    expect(sorting).to.be.equal("true");
  }

  createdTimeAscending(userCreatedDates) {
    let sorting = "";
    const sortedDates = userCreatedDates.map((dateString) => {
      if (dateString.includes("ago")) {
        const daysAgo = parseInt(dateString);
        const date = new Date();
        date.setDate(date.getDate() - daysAgo);
        return date;
      } else if (dateString === "Today") {
        return new Date();
      } else {
        return new Date(dateString);
      }
    });

    for (let i = 0; i < sortedDates.length - 1; i++) {
      const current = sortedDates[i];
      const next = sortedDates[i + 1];
      if (current > next) {
        sorting = "false";
        break;
      }
      sorting = "true";
    }
    expect(sorting).to.be.equal("true");
  }

  createdTimeDescending(userCreatedDates) {
    let sorting = "";
    const sortedDates = userCreatedDates.map((dateString) => {
      if (dateString.includes("ago")) {
        const daysAgo = parseInt(dateString);
        const date = new Date();
        date.setDate(date.getDate() - daysAgo);
        return date;
      } else if (dateString === "Today") {
        return new Date();
      } else {
        return new Date(dateString);
      }
    });

    for (let i = 0; i < sortedDates.length - 1; i++) {
      const current = sortedDates[i];
      const next = sortedDates[i + 1];
      if (current < next) {
        sorting = "false";
        break;
      }
      sorting = "true";
    }
    expect(sorting).to.be.equal("true");
  }

  verifyPageTitle(title) {
    cy.get(usersPage.heading).contains(title).should("be.visible");
  }
}

export const affiliatePage = new Affiliate();
