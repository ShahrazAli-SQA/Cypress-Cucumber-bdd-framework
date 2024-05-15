Feature: Admin Portal | Login Module

    Checking login functionality

    Background: user visit the admin portal
        Given Visit admin portal

    Scenario: user should not login with empty fields
        When user click input fields
        Then Empty fields message should be displayed
        And login button should be disabled

    Scenario: user should not be able to login with invalid email
        When user type invalid email and valid password
        And click on login button
        Then error message should displayed

    Scenario: user should not be able to login with invalid password
        When user type valid email and invalid password
        And click on login button
        Then invalid username or password message should displayed

    Scenario: user should not login with invalid credentials
        When user input Email and password
        And click on login button
        Then error message should displayed

    Scenario: user login with valid credentials
        When user input valid credentials
        And click on login button
        Then user should login successfully

    Scenario: user can logout successfully
        When user input valid credentials
        And click on login button
        Then user should login successfully
        When user click on avatar icon
        And click on logout button
        Then user should logout successfully

    Scenario: user should be able to edit his own personal information
        When user visit settings tab
        Then user should navigate to settings page
        When user click on edit button
        Then user should be able to edit the input fields
        When user type updated name
        And click on save changes button
        Then information should be updated
        Then revert the changes

    Scenario: user should be able change his password
        When user visit settings tab
        And click on change password tab
        Then user should be on change password screen
        When user click on edit button
        Then password input fields should be enable
        When user type current password and new password
        And click on save changes button
        Then password should be changed successfully
        Then reset the changed password

    Scenario: user can change notification settings
        When user visit settings tab
        And click on notification tab
        Then user should be on notification screen
        When user click on notification toggle
        Then notification should turn "off"
        When user click on notification toggle
        Then notification should turn "on"