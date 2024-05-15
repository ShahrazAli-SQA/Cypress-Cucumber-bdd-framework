Feature: Investor Portal | Transafer Area Module

    Transafer Area Module functionality

    Background: login investor portal and click on transfer area tab
        Given login investor portal and click on transfer area tab

    Scenario: user should be able add new recipient
        When user click on new recipient button
        Then add new recipient modal should be appear
        When user add wallet address
        Then wallet address should be verified
        And save and cancel button should be visible
        When user type recipient name
        Then save button should be enabled
        When user click on save button
        Then recipient should be added

    Scenario: user should be able to see reacent area transfers
        When user click on "recent transfer" tab
        Then area transfer should be visible
        When user click on transfer instance
        Then transfer details should be visible

    Scenario: user should be able to see frequent recipients
        When user click on "frequent recipients" tab
        Then area recipients should be visible

    Scenario: user should be bale to search recent transfer with project name
        When user type project name in search field
        Then only search project should be display

    Scenario: user should be to delete recipient
        When user click on "frequent recipients" tab
        Then area recipients should be visible
        When user click on meatball action button
        Then action dropdown should be visible
        When user click on delete button
        And click on yes button
        Then recipient should deleted successfully

    Scenario: user should be able to transfer area
        When user click on transfer are button
        And click checkbox
        And click on get started button
        Then transfer area popup should be visible
        When user select project
        And type area and select person to transfer
        And type the recipient wallet id
        When user click on transfer now button
        And type otp

    Scenario: user should be able to add new recipient and transfer area to the recipient
        When user click on new recipient button
        And add new recipient
        Then new recipient should be added successfully
        When user click on "frequent recipients" tab
        And user click on meatball action button
        Then action dropdown should be visible
        When user click on transfer button
        Then transfer area popup should be visible
        When user select project
        And type area and select person to transfer
        And click checkbox
        When user click on transfer now button
        And type otp
        # And click on verify button

    Scenario: user should be able to transfer area upon clicking make your first transfer button
        When user click on "frequent recipients" tab
        And click on make your first transfer button
        And click checkbox
        And click on get started button
        Then transfer area popup should be visible
        When user select project
        And type area and select person to transfer
        And type the recipient wallet id
        When user click on transfer now button
        # And type otp
        # And click on verify button

    Scenario: while transfer area to friend or family area transfer summary should be visible
        When user click on "frequent recipients" tab
        And click on make your first transfer button
        And click checkbox
        And click on get started button
        Then transfer area popup should be visible
        When user select project
        And type area and select person to transfer
        And type the recipient wallet id
        Then area transfer summary should be visible

    Scenario: user should be able to edit added recipient
        When user add new recipient
        Then new recipient should be added successfully
        When user click on "frequent recipients" tab
        And user click on meatball action button
        Then action dropdown should be visible
        When user click on edit button
        Then edit recipient popup should be visible
        When user type updated name
        And user click on save button
        Then recipient should be edit
        


        

