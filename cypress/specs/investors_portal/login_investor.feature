Feature: Investor Portal | Login Module

    Checking login functionality

    Background: user visit the investor portal
        Given user visit the investor portal

    Scenario: user should not login with empty fields
        When user click on login button
        Then Empty fields message should be displayed

    Scenario: user should not be able to login with invalid email
        When user type invalid email and valid password
        And click on login button
        Then error message should displayed

    Scenario: user should not be able to login with invalid password
        When user type valid email and invalid password
        And click on login button
        Then invalis username or password message should displayed

    Scenario: User should not login with invalid credentials
        When user input Email and password
        And click login button
        Then error message should displayed

    Scenario: user login with valid credentials
        When user input valid credentials
        And click login button
        Then user should login successfully

    Scenario: user can logout successfully
        When user input valid credentials
        And click login button
        Then user should login successfully
        When user click on avatar icon
        And click on logout button
        Then user should logout successfully
        