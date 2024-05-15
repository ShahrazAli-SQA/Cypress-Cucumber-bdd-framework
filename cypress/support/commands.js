// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// -- Custom command to login to the application
import "cypress-file-upload";
import "cypress-mailosaur";

Cypress.Commands.add("login", (email, password) => {
  cy.get('input[formcontrolname="email"]').type(email);
  cy.get('input[formcontrolname="password"]').type(password);
  cy.get('[class*="btn"]').first().click();
});

// -- Custom command to check element visibility and and having text
Cypress.Commands.add(
  "checkElementVisibilityAndText",
  (selector, expectedText) => {
    cy.get(selector).should("be.visible").and("contain", expectedText);
  },
);

// -- Custom command to check if an element is visible
Cypress.Commands.add("isVisible", (selector) => {
  cy.get(selector).should("be.visible");
});

// --Custom command to check if an element contains a certain text
Cypress.Commands.add("containsText", (selector, text) => {
  cy.get(selector).should("contain", text);
});

// -- Custom command to clicks on a link by its text
Cypress.Commands.add("clickLinkByText", (linkText) => {
  cy.contains("a", linkText).click();
});

// --Custom command to selects an option from a dropdown
Cypress.Commands.add("selectOption", (selector, optionText) => {
  cy.get(selector).select(optionText);
});

// -- Custom command to submits a form
Cypress.Commands.add("submitForm", (selector) => {
  cy.get(selector).submit();
});

// -- Cusrom command to checks a checkbox
Cypress.Commands.add("checkCheckbox", (selector) => {
  cy.get(selector).check();
});

// -- Custom command to unchecks a checkbox
Cypress.Commands.add("uncheckCheckbox", (selector) => {
  cy.get(selector).uncheck();
});

// -- Custom command to waits for a specific request to complete
Cypress.Commands.add("waitForRequest", (url) => {
  cy.server();
  cy.route(url).as("request");
  cy.wait("@request");
});

// -- Custom command to sets a value in local storage
Cypress.Commands.add("setLocalStorage", (key, value) => {
  cy.window().then((win) => {
    win.localStorage.setItem(key, value);
  });
});

// -- Custom command that gets a value from local storage
Cypress.Commands.add("getLocalStorage", (key) => {
  cy.window().then((win) => {
    win.localStorage.getItem(key);
  });
});

// -- Custom command to deletes a value from local storage
Cypress.Commands.add("deleteLocalStorage", (key) => {
  cy.window().then((win) => {
    win.localStorage.removeItem(key);
  });
});

// -- Custom command to wait for element to be displayed
Cypress.Commands.add(
  "waitForElement",
  { prevSubject: "element" },
  (subject, timeout = 5000) => {
    cy.wrap(subject, { timeout })
      .should("be.visible")
      .should(($el) => {
        const height = $el.height();
        const width = $el.width();
        expect(height, "height").to.be.greaterThan(0);
        expect(width, "width").to.be.greaterThan(0);
      });
  },
);

// -- Custom command to clear and type in input
Cypress.Commands.add("clearAndType", { prevSubject: true }, (element, text) => {
  cy.wrap(element).clear();
  cy.wrap(element).type(text);
});

Cypress.Commands.add("clickRandomOption", { prevSubject: true }, (subject) => {
  cy.wrap(subject).then((options) => {
    const randomIndex = Math.floor(Math.random() * options.length);
    cy.wrap(options[randomIndex]).click();
  });
});

// --Custom command to set date in future
Cypress.Commands.add("setDateInFuture", { prevSubject: true }, (subject) => {
  const date = new Date();
  date.setDate(date.getDate() + 5);
  const formattedDate = date.toISOString().substring(0, 10);
  cy.wrap(subject).clear();
  cy.wrap(subject).type(formattedDate);
});

// -- get text and compare
Cypress.Commands.add(
  "getValueAndCompare",
  { prevSubject: true },
  (subject, expectedText) => {
    cy.wrap(subject)
      .invoke("text")
      .then((text) => {
        text = parseInt(text.replace(/[^0-9]/g, ""), 10);
        expect(text).to.equal(expectedText);
      });
  },
);

Cypress.Commands.add(
  "verifyDiscountedAmount",
  { prevSubject: true },
  (subject, originalAmount, discountPercentage) => {
    cy.wrap(subject)
      .invoke("text")
      .then((discountedAmount) => {
        cy.log(discountedAmount);
        discountedAmount = parseInt(
          discountedAmount.replace(/[^0-9]/g, ""),
          10,
        );
        const calculatedDiscount = originalAmount * (discountPercentage / 100);
        let expectedDiscountedAmount = originalAmount - calculatedDiscount;
        expectedDiscountedAmount = parseInt(expectedDiscountedAmount);
        expect(discountedAmount).to.eq(expectedDiscountedAmount);
      });
  },
);

Cypress.Commands.add(
  "verifyDiscount",
  { prevSubject: true },
  (subject, originalAmount, discountPercentage) => {
    cy.wrap(subject)
      .invoke("text")
      .then((discount) => {
        cy.log(discount);
        discount = parseInt(discount.replace(/[^0-9]/g, ""), 10);
        let calculatedDiscount = originalAmount * (discountPercentage / 100);
        calculatedDiscount = parseInt(calculatedDiscount);
        expect(calculatedDiscount).to.eq(discount);
      });
  },
);

Cypress.Commands.add(
  "verifyBgcolor",
  { prevSubject: true },
  (subject, expectedColor) => {
    // Get the background color of the element
    let hexColor;
    cy.wrap(subject)
      .invoke("css", "background-color")
      .then((bgColor) => {
        if (bgColor.includes("rgb")) {
          // If the background color is in RGB format, convert it to hex
          const rgbArray = bgColor.match(/\d+/g).map(Number);
          hexColor = `#${rgbArray
            .map((c) => c.toString(16).padStart(2, "0"))
            .join("")}`;
        }
        expect(hexColor).to.equal(expectedColor);
      });
  },
);
