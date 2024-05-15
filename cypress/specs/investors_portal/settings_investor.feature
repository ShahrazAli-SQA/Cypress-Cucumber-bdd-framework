Feature: Investors Portal | Settings Module

    Settings module functionality 

    Background: login investor portal and click on settings tab
        Given login investor portal and click on settings tab

    Scenario: user should be able to edit own personal information
        When user click on "Personal Details" tab
        Then user should be on "Personal Details" page
        When user click on edit button
        Then input fields gets enabled
        When user type new details
        And click on update button
        Then details should be updated successfully
        And revert changes

    Scenario: user should be able change his profile photo 
        When user click on "Personal Details" tab
        Then user should be on "Personal Details" page
        When user click on edit button
        Then input fields gets enabled
        And upload new profile photo
        Then profile photo should be uploaded
        When click on update button
        Then profile photo should be updated

## to be completed
    # Scenario: user should be a able to change mobile number 
    #     When user click on "personal details" tab
    #     Then user should be on "personal details" page
    #     When user click on edit button
    #     Then input fields gets enabled
    #     When user type new phone number
    #     And click on verify button
    #     Then added number should be verified
    #     When click on update update button
    #     Then phone number should be updated
    #     And revert phone number

    Scenario: user should be able to add new address information
        When user click on "Address" tab
        Then user should be on "My Address" page
        When user click on add new address lable
        Then my address popup should be visible
        When user type address information
        And click on add button
        Then new address should be added successfully


    Scenario: user should be able to edit his address information
        When user click on "Address" tab
        Then user should be on "My Address" page
        When user click on edit icon
        Then my address popup should be visible
        When user type address information
        And user click on update button
        Then new address should be updated successfully

    Scenario: user should be able to delete his address
        When user click on "Address" tab
        Then user should be on "My Address" page
        When user click on delete icon
        Then delete popup should be visible
        When user click on yes button to confirm delete address
        Then address should be deleted successfully

    Scenario: user should be able to add new banking details
        When user click on "Bank Details" tab
        Then user should be on "Bank Details" page
        When user click on add new bank account lable
        Then add bank account details should be visible
        When user add new banking details
        And click on checkbox
        And click on save button
        Then new banking details should be added

    Scenario: user should be able to edit banking details
        When user click on "Bank Details" tab
        Then user should be on "Bank Details" page
        When user click on edit icon
        Then update bank details popup should be visible
        When user update banking details
        And click on checkbox
        And click on update button
        Then bank details should be updated

    Scenario: user should be able to delete banking details
        When user click on "Bank Details" tab
        Then user should be on "Bank Details" page
        When user click on bank delete icon
        Then delete popup should be visible
        When user click on yes button to confirm delete bank
        Then bank should be deleted successfully

    Scenario: user should be able to edit CNIC
        When user click on "Legal Information" tab
        Then user should be on "Legal Information" page
        When user click on edit button
        Then cnic input field should be enabled
        When user type updated cnic
        And click on update button
        Then cnic should updated successfully

    Scenario: user should be able to upload cnic photos
        When user click on "Legal Information" tab
        Then user should be on "Legal Information" page
        When user click on edit button
        Then upload photo fied should be enabled
        When user upload front and back photo of cnic
        And click on update button
        Then photos should updated successfully

    Scenario: user should be able to edit legal information
        When user click on "Legal Information" tab
        Then user should be on "Legal Information" page
        When user click on edit button
        Then cnic input field should be enabled
        When user type updated cnic
        And select FBR tax filter
        And user upload front and back photo of cnic
        And click on update button
        Then legal information should updated successfully

    Scenario: user should be able to add new next of kin
        When user click on "Legal Information" tab
        Then user should be on "Legal Information" page
        When user click on add new next of kin button
        Then next of kin popup should be visible
        When user add new kin information
        And click on save button
        Then new next of kin should be added

    Scenario: user should be able to delete existing kin
        When user click on "Legal Information" tab
        Then user should be on "Legal Information" page
        When user click on kin delete icon
        Then delete popup should be visible
        When user click on yes button to confirm delete kin
        Then existing kin should be deleted successfully

    Scenario: user should be able change his password
        When user click on "Change Password" tab
        Then user should be on "Change Password" page
        When user click on edit button
        Then password input fields should be enable
        When user type current password and new password
        And click on update button
        Then password should be changed successfully
        And reset the changed password

    Scenario: user can change notification settings
        When user click on "Notification" tab
        Then user should be on "Notification" page
        When user click on notification toogle
        Then notification should be turn "off"
        When user click on notification toogle
        Then notification should be turn "on"

    Scenario: user can see wallet info
        When user click on "Wallet info" tab
        Then user should be on "Wallet info" page
        And two wallet card should be visible

    Scenario: user can copy the wallet id
        When user click on "Wallet info" tab
        Then user should be on "Wallet info" page
        And two wallet card should be visible
        When user click on copy icon
        Then wallet id should copied

