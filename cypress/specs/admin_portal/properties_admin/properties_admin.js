import { And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";
import { propPage } from "../pages/propertiesPage";
import { adminPage } from "../constant/admin";

Given("login admin portal and visit properties module", () => {
  adminPage.login();
  cy.xpath(propPage.propertiesTab).click();
  cy.get(propPage.projectHeading)
    .should("be.visible")
    .and("have.text", "Project Stats");
});

When("user click on projects dropdown", () => {
  cy.get(propPage.projectDropdownBtn).click();
});

And("select {string} project", (project) => {
  cy.get(propPage.dropdownPanl).should("be.visible");
  cy.get(propPage.projectsList).contains(project).click();
});

Then("{string} project should be selected", (project) => {
  cy.get(propPage.propertyName).should("exist").and("have.text", project);
});

And("project stats should be visible", () => {
  cy.get(propPage.statusContent).eq(1).should("contain.text", "CURRENT ROUND");
  cy.get(propPage.statusContent)
    .eq(2)
    .should("contain.text", "ESTIMATED DURATION");
  cy.get(propPage.statusContent).eq(3).should("contain.text", "Started on");
  cy.get(propPage.statusContent)
    .eq(4)
    .should("contain.text", "Estimated End Date");
  cy.get(propPage.statusContent).eq(5).should("contain.text", "TOTAL AREA");
});

And("user click on {string} toogle button", (toogle) => {
  cy.get(propPage.toogleBtn).contains(toogle).click();
  cy.get(propPage.toogleBtn)
    .contains(toogle)
    .should("have.attr", "aria-pressed", "true");
});

Then("then current round stats should be visible", () => {
  cy.get(propPage.roundstatusBar).should("be.visible");
});

When("user click on project stats meetball button", () => {
  cy.get(propPage.statusMeetball).click();
  cy.get(propPage.statusMeetball).should("have.attr", "aria-expanded", "false");
});

And("select {string} option", (option) => {
  cy.get(propPage.meeballBallMenu).contains(option).click();
});

Then("user should directed to {string} screen", (heading) => {
  adminPage.verifyPageTitle(heading);
});

When("user click on edit icon", () => {
  cy.get(propPage.editDetailIcon).first().click();
});

And("update the project details", () => {
  cy.get(propPage.endDateInput).type("2024-02-13");
});

And("click on green tick icon", () => {
  cy.get(propPage.tickIcon).click();
});

And("click on apply only on this button from popup", () => {
  cy.xpath(propPage.applyOnlyBtn).should("be.visible").click();
});

Then("project details should be updated", () => {});

And("user can see project activity log", () => {
  cy.get(propPage.activityLog).should("be.visible");
});

When("user click on activity", () => {
  cy.get(propPage.activityLog).first().click();
});

Then("activity details should be visible", () => {
  cy.get(propPage.activityDetails).should("be.visible");
});

When("user click on stats expand button", () => {
  cy.get(propPage.expandIcon).click();
});

Then("stats popup window should be visible", () => {
  cy.get(propPage.statsPopup).should("be.visible");
});

Then("progression chart should be visible", () => {
  cy.get(propPage.progressionChart).should("be.visible");
});

Then("round progress chart should be visible", () => {
  cy.get(propPage.roundStatsChart).should("be.visible");
});

When("user click on {string} tab", (info) => {
  cy.get(propPage.projectTabs).contains(info).click();
});

Then("{string} should be visible", (info) => {
  if (info === "DEVELOPMENT ROUNDS" || info === "DOCUMENTS") {
    cy.get(propPage.tableRow).should("be.visible");
  } else if (info === "DESCRIPTION") {
    cy.get(propPage.aboutContainer).should("be.visible");
  } else if (info === "GALLERY") {
    cy.get(propPage.gallaryImages).should("be.visible");
  }
});

When("user click on round instance", () => {
  cy.get(propPage.tableRow).first().click();
});

Then("user should directed to Round Details page", () => {
  adminPage.verifyPageTitle("Round Details");
});

And("round stats and milstones should be visible", () => {
  cy.xpath(propPage.roundStatsHeading).should("be.visble");
  adminPage.verifyPageTitle("Milestones");
});

When("user click on {string} button", (button) => {
  cy.get(propPage.heading)
    .first()
    .invoke("text")
    .then((text) => {
      const round = text;
      cy.wrap(round).as("round");
    });
  if (button === "Next Round") {
    cy.xpath(propPage.nextRoundBtn).click();
  } else {
    cy.get(propPage.previousRoundBtn).click();
  }
});

Then("user can see next round details", () => {
  cy.get("@round").then((round) => {
    cy.get(propPage.heading)
      .first()
      .invoke("text")
      .then((text) => {
        expect(text).not.to.equal(round);
      });
  });
});

Then("user can see previous round details", () => {
  cy.get("@round").then((round) => {
    cy.get(propPage.heading)
      .first()
      .invoke("text")
      .then((text) => {
        expect(text).not.to.equal(round);
      });
  });
});

When("user click on milestone", () => {
  cy.get(propPage.tableRow).first().click();
});

Then("milestone detail should be visible", () => {
  cy.get(propPage.milestoneDetail).should("be.visible");
  cy.get(propPage.milestoneDetail)
    .find("p")
    .contains("Milestone ID ")
    .should("be.visible");
});

When("user click on progress round", () => {
  cy.xpath(propPage.progressRound).click();
});

When("user click on progress milestone action button", () => {
  cy.xpath(propPage.progressMilestone).find("button").first().click();
});

Then("update milstone modal should be visible", () => {
  cy.get(propPage.rightsideModal).should("be.visible");
  cy.get(propPage.rightsideModal)
    .find("p")
    .contains("Update Milestone")
    .should("be.visible");
});

When("user slide the progress bar", () => {
  cy.get(propPage.progressInput).type(50);
});

And("click on update now button", () => {
  cy.xpath(propPage.updateNowBtn).click();
});

Then("progress should be updated", () => {
  cy.get(propPage.toastMessage)
    .should("be.visible")
    .and("have.class", "bg-success");
});

When("user select click on status dropdown", () => {
  cy.get(propPage.milestoneStausDropdown).click();
});

And("select {string} status", (status) => {
  cy.get(propPage.milestoneStatusOption).contains(status).click();
  cy.get(propPage.statusTitle).should("have.text", status);
});

When("user click schedule milestone action button", () => {
  cy.xpath(propPage.scheduleMilestone).find("button").first().click();
});

And("add milestone progress", () => {
  cy.get(propPage.progressInput).type(50);
});

When("user click on create milestone button", () => {
  cy.xpath(propPage.creatMilestoneBtn).click();
});

Then("create milestone modal should be visible", () => {
  cy.get(propPage.rightsideModal).should("be.visible");
  cy.get(propPage.rightsideModal)
    .find("p")
    .contains("Create Milestone")
    .should("be.visible");
});

When("user type milestone detail", () => {
  cy.get(propPage.titleInput).type("Test Milestone");
  cy.get(propPage.descriptionInput).type(
    "This is test milestone, We are testing",
  );
  cy.get(propPage.weightageInput).type("1");
  cy.get(propPage.startDate).type("2024-02-13");
  cy.get(propPage.completionDate).type("2024-02-15");
  cy.get(propPage.milestoneStausDropdown).click();
  cy.get(propPage.milestoneStatusOption).contains("Active").click();
  cy.get(propPage.statusTitle).should("have.text", "Active");
});

And("click on create now button", () => {
  cy.xpath(propPage.createNowBtn).click();
});

Then("milestone should be created", () => {
  cy.get(propPage.toastMessage)
    .should("be.visible")
    .and("have.class", "bg-success");
});

And("user reschedule the milestone", () => {
  cy.xpath(propPage.progressMilestone).find("button").first().click();
  cy.get(propPage.meeballBallMenu).contains("Update Progress").click();
  cy.get(propPage.milestoneStausDropdown).click();
  cy.get(propPage.milestoneStatusOption).contains("Scheduled").click();
  cy.get(propPage.statusTitle).should("have.text", "Scheduled");
  cy.xpath(propPage.updateNowBtn).click();
});

And("click on delete button", () => {
  cy.xpath(propPage.deleteBtn).click();
});

Then("milestone should be delted", () => {
  cy.get(propPage.toastMessage)
    .should("be.visible")
    .and("have.class", "bg-success");
});

When("user click on completed milestone action button", () => {
  cy.xpath(propPage.completedMilestone).first().click();
});

When("user edit milestone details", () => {
  cy.get(propPage.titleInput).type("Title Update");
  cy.get(propPage.descriptionInput).type("Test title is updated");
});

And("click on save button", () => {
  cy.xpath(propPage.saveBtn).click();
});

Then("milestone details should be updated", () => {
  cy.get(propPage.toastMessage)
    .should("be.visible")
    .and("have.class", "bg-success");
});

When("user click on completed round", () => {
  cy.xpath(propPage.completedRound).first().click();
});

And("create milestone button should be disabled", () => {
  cy.xpath(propPage.creatMilestoneBtn).should("be.disabled");
});

When("user click on complete round meetball button", () => {
  cy.xpath(propPage.completedRound).first().find("button").first().click();
});

Then("{string} option should be visible", (button) => {
  cy.get(propPage.meeballBallMenu).contains(button).should("be.visible");
});

When("user click on locked round", () => {
  cy.xpath(propPage.lockedRound).first().click();
});

When("user click on unlock round button", () => {
  cy.xpath(propPage.unlockRoundBtn).click();
});

And("type password", () => {
  cy.get(propPage.passwordInput).type(Cypress.env("adminPASSWORD"));
});

Then("round should unlocked successfully", () => {
  cy.get(propPage.toastMessage)
    .should("be.visible")
    .and("have.class", "bg-success");
});

Given("user should be on approval request page", () => {
  cy.xpath(propPage.approvalRequestTab).click();
  adminPage.verifyPageTitle("Property Details Request");
})

When("user click on days filter dropdown", () => {
  cy.xpath(propPage.daysDropdown).click();
})

Then("Table data should be visible", () => {
  cy.get(propPage.tableRow).should('be.visible');
})

When("user click on {string} request tab", (tab) => {
  ct.get(propPage.requestStatusTabs).contains(tab).click();
})

Then("{string} should be visible", () => {
  cy.get(propPage.tableRow).should('be.visible');
})

Then("approval request table should be visible", () => {
  cy.get(propPage.requestTable).should('be.visible');
})

When("user click on project filter", () => {
  cy.xpath(propPage.projectsFilter).click();
})

And("select {string} project option", (project) => {
  cy.get(propPage.projectFilterOption).contains(project).click();
})

And("click on apply button", () => {
  cy.xpath(propPage.applyBtn).click();
})

Then("project filter should be applied", () => {
  cy.get(propPage.projectNameIndex)
  .each(($element) => {
    const text = $element.text().trim();
    expect(text).to.equal("DKV");
  })
})

When("user search username", () => {
  cy.get(propPage.usernameIndex).first().invoke('text').then((text) => {
    cy.wrap(test).as('searchedFor');
    cy.get(propPage.searchInput).type(text);
  })
})

When("user search id", () => {
  cy.get(propPage.userIdindex).first().invoke('text').then((text) => {
    text = text.trim().parseInt(text);
    cy.wrap(test).as('searchedFor');
    cy.get(propPage.searchInput).type(text);
  })
})

When("user search phone", () => {
  cy.get(propPage.phoneNumIndex).first().invoke('text').then((text) => {
    text = text.trim().replace(/[^0-9]/g, "");
    cy.wrap(test).as('searchedFor');
    cy.get(propPage.searchInput).type(text);
  })
})

Then("searched user should be visible", () => {
  cy.get(propPage.tableRow).should('be.visible').and('have.length.at.least', 1);
})

When("user click on investor name", () => {
  cy.get(propPage.usernameIndex).invoke('text').then(text => {
    cy.wrap(text).as('username');
  })
  cy.get(propPage.usernameIndex).parent().invoke("removeAttr", "target").click();
})

Then("user investor details should be visible", () => {
  cy.get("@username").then(username => {
    cy.get(propPage.heading).should('contain.text', username).and('be.visible');
  })
})

When("user click on approve button", () => {
  cy.get(propPage.usernameIndex).first().invoke('text').then(text => {
    cy.wrap(text).as("username")
  })
  cy.get(propPage.userIdindex).first().invoke('text').then(text => {
    cy.wrap(text).as("userID");
  })
  cy.xpath(propPage.approveBtn).first().click();
})

And("click on proceed button", () => {
  cy.get(propPage.rightsideModal).should('be.visible');
  cy.xpath(propPage.proceedBtn).click();
})

Then("request should be approved", () => {
  cy.get(propPage.rightsideModal).find('p').first().should('have.text', 'The request has been approved successfully!');
})

And("click on done button", () => {
  cy.xpath(propPage.doneBtn).click();
})

When("user click on meetball button", () => {
  cy.xpath(propPage.requestMeetball).first().click();
})

And("click on {string} button", (button) => {
  cy.xpath(propPage.requestMenuBtn).first().contains(button).click();
})

And ("add note and clikc on discard request button", () => {
  cy.get(propPage.noteInput).type("we are testing");
  cy.xpath(propPage.discardRequestBtn).click();
})

Then("approval request should be discarded", () => {
  cy.get(propPage.toastMessage).should('be.visible').and('have.class', "bg-success");
})

Then("request status should be updated", () => {
  cy.get(propPage.tableRow).first().first('td').eq(5).should('contain.text', "On Hold")
})

When("user click on allow access button", () => {
  cy.xpath(propPage.allowAccessBtn).click()
})

Then("allow access modal should be visible", () => {
  cy.get(propPage.rightsideModal).should(".visble");
})

When("user click on {string} option", (option) => {
  cy.get(propPage.accessOptionBtn).contains(option).click();
})

And("search existing user and select project", () => {
  cy.get(propPage.searchInvetor).type("test");
  cy.get(propPage.searchInput).first().click();
})

Then("asscess should be allowed", () => {
  cy.get(propPage.toastMessage).should('be.visible').and('have.class', "bg-sucess");
})