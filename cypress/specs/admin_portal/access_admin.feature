Feature: Admin Portal | Access Module

    Checking access module functionality

    Background: user login to admin portal and visit access page
        Given user login to admin portal and visit access page

    Scenario: user can create new user and assign roles to that user
        When user click on add user button
        Then create user form should be visible
        When user type username, mobile no and email
        And assign role to the user
        And click on save role button
        Then role should be assign to new user
        When user click on save user button
        Then new user should created
    
    Scenario: user can search and view created user details
        When user type username in search field
        Then only searched user should be visible
        When user click on first instance
        Then user can see user details
        And permissions assigned to the user

    Scenario: user can edit existing user information
        When user type username in search field
        Then only searched user should be visible
        When user click on meetball action button
        And click on "Edit User" button
        Then user should be on edit user details screen
        When user type username, mobile no and email
        And click on update user button
        Then user information should be updated

    Scenario: user can suspend and unsuspend any user
        When user click on meetball action button
        And click on "Suspend User" button
        And click on "Suspend" button to confirm the action
        Then user should be "suspended"
        When user click on meetball action button
        And click on "Unsuspend User" button
        And click on "Unsuspend" button to confirm the action
        Then user should be "unsuspended"

    Scenario: user can send reset password link to the user's email
         When user type username in search field
        Then only searched user should be visible
        When user click on meetball action button
        And click on "Reset Password" button
        Then "Reset User Password" modal should be visible
        When user click on email password link
        And verify user email is correct
        And click on send button
        Then password reset link should be sent successfully

    Scenario: user can generate a new password directly for any investor
        When user type username in search field
        Then only searched user should be visible
        When user click on meetball action button
        And click on "Reset Password" button
        Then "Reset User Password" modal should be visible
        When user click on generate password button
        Then "Generate User Password" modal should be visible
        When user type new password and confirm password
        And click on generate password button
        And click on send button
        Then password should be generated successfully

    Scenario: user can see admin users
        When user click on admin users tab
        Then admin user should be visible

    Scenario: user can change profile picture
        When user type username in search field
        Then only searched user should be visible
        When user click on meetball action button
        And click on "Edit User" button
        Then user should be on edit user details screen
        When user upload new photo
        And click on update user button
        Then user profile photo should be updated

    Scenario: user can unassign role to any user
        When user click on meetball action button
        And click on "Edit User" button
        Then user should be on edit user details screen
        When user click on meetball action button
        And click on " Unassign Project " button
        Then unassign modal window should be visible
        When user click on unassign button
        And click on role cancel button
        Then no role should be displayed to the user

    Scenario: user can assign new role to the user
        When user click on meetball action button
        And click on "Edit User" button
        Then user should be on edit user details screen
        When user click on meetball action button
        And click on " Unassign Project " button
        Then unassign modal window should be visible
        When user click on unassign button
        And click on role cancel button
        Then no role should be displayed to the user
        When user click on assign new project button
        And assign role to the user
        And click on save role button
        Then role should be assigned
        And click on update user button
        Then user information should be updated

    Scenario: user can edit role for standers user
        When user click on meetball action button
        And click on "Edit User" button
        Then user should be on edit user details screen
        When user click on meetball action button
        And click on " Edit Role " button
        And click on save role button
        And click on update user button
        Then user information should be updated