Feature: Affiliate Portal | Users Module
 
    Checking users page functionality

    Background: user visit the affiliate portal and login
        Given user visit the affiliate portal and login

    Scenario: user should be able to create investor and complete the transaction for that user
        When user create new investor
        Then created user should be visible under "Lead" tab
        When user create a transaction for that investor
        Then created transaction should be visible under "pending" tab
        And created user should be visible under "Pledged" tab
        When user verify the created transaction
        Then created transaction should be visible under "verified" tab
        When user add payment for created transaction
        Then payment should created
        When user visit admin portal
        And approved the verified transaction
        Then created transaction should be visible under "approved" tab
        When user post the approved transaction on blockchain
        Then created transaction should be visible under "locked" tab
        And created user should be visible under "Investors" tab

    Scenario: user should able to create new investor
        When user click on create investor button
        Then investor form should be visible
        When user input all the fields
        And click on submit button
        Then transaction created success message should be visible

    Scenario Outline: affiliate user can search user with <filterTab>
        When user click on search field
        And click on "<filterTab>" tag
        When user type "<filterTab>" in search field
        And click on first search result
        Then "<filterTab>" should match with searched "<filterTab>"
        Examples:
            | filterTab  |
            | User ID    |
            | Name       |
            | Mobile No. |
            | CNIC       |

    Scenario Outline: affiliate user can explore and edit <user> user personal information
        When affiliate user click on "<user>" users tab
        And click on first user instance
        Then user should be directed to investor personal information
        When user click on edit button
        Then update button and cencel button should be visible
        When user click on edit button
        Then user form input fields should be enable
        When user update all the input fields
        And click on update button
        Then information updated success message should be visible
        Examples:
            | user      |
            | Leads     |
            | Pledged   |
            | Investors |

    Scenario Outline: affiliate user can add edit and delete banking details for <user> user
        When affiliate user click on "<user>" users tab
        And click on first user instance
        Then user should be directed to investor personal information
        When user click on "Bank Details" tab from user info
        Then user should be able to view banking details for "<user>" user
        When user click on add bank account button
        Then "Add Bank Account" modal should be visible
        When user "add" bank details for investor
        And click on add bank button
        Then banking details should be added
        When user click on bank action button
        And click on "edit" button
        Then "Edit Bank Account" modal should be visible
        When user "edit" bank details for investor
        And click on update bank button
        Then banking details should be updated
        When user click on bank action button
        And click on "delete" button
        Then delete popup should be visible
        When user confirm the delete banking details
        Then banking details should be deleted
        Examples:
            | user      |
            | Leads     |
            | Pledged   |
            | Investors |

    Scenario Outline: affiliate user can edit personal info for <user> user
        When affiliate user click on "<user>" users tab
        And click on first user instance
        Then user should be directed to investor personal information
        When user click on "Legal Info" tab from user info
        Then user can see legal info for "<user>" user
        When user click on edit button to edit information
        Then input field should be enabled
        When user type cnic
        And upload cnic photos
        And select filing status type national tax number
        And click on info update button
        Then information should be updated
        Examples:
            | user      |
            | Leads     |
            | Pledged   |
            | Investors |

    Scenario: user should be able to generate reset password link and create new password directly
        When user clear filter and click on meetball action button
        And click on reset password button
        Then password reset menu should be visible
        When user click on email password link button
        And click on send button
        Then email successfully sent with password reset link
        When user click on meetball action button
        And click on reset password button
        Then password reset menu should be visible
        When user click on generate password
        And type new password and confirm new password
        And click on generate password button
        Then Email successfully sent with new password

    Scenario: user should be able to suspend and unsuspend any investor
        When user clear filter and click on meetball action button
        And click on suspend user button
        Then confirmation popup should be visible
        When user click on suspend button
        Then suspend success message should be visible
        When user click on meetball action button
        And click on unsuspend user button
        Then confirmation popup should be visible
        When user click on unsuspend button
        Then unsuspend success message should be visible

    Scenario: verify that table data sorted in ascending and descending order upon clicking USER ID
        And user click on table header "USER ID"
        Then user id column data should be sorted in ascending order
        When user click on table header "USER ID"
        Then user id column data should be sorted in descending order
    
    Scenario: verify that table data sorted in ascending and descending order upon clicking USER NAME
        And user click on table header "USER NAME"
        Then user name column data should be sorted in ascending order
        When user click on table header "USER NAME"
        Then user name column data should be sorted in descending order

    Scenario: verify that table data sorted in ascending and descending order upon clicking USER CREATED
        And user click on table header "USER CREATED"
        Then user created column data should be sorted in ascending order
        When user click on table header "USER CREATED"
        Then user created column data should be sorted in descending order

    Scenario: user can add new next of kin of the investor
        When user clear the applied filter
        And click on first user instance
        Then user should be directed to investor personal information
        When user click on "Legal Info" tab
        Then user can see investor's legal information
        When user click on add next of kin button
        Then kin form should be visible
        When user upload photo of the kin
        And fill the form
        And click on add next of kin button
        Then new kin should be added

    Scenario: user can edit existing kin
        When user clear the applied filter
        And click on first user instance
        Then user should be directed to investor personal information
        When user click on "Legal Info" tab
        Then user can see investor's legal information
        When user click on kin action button
        And click on "edit" button
        Then kin form should be visible
        When user upload photo of the kin
        And fill the form
        And click on update kin button
        Then kin information should be updated successfully

    Scenario: user can delete existing kin
        When user clear the applied filter
        And click on first user instance
        Then user should be directed to investor personal information
        When user click on "Legal Info" tab
        Then user can see investor's legal information
        When user click on kin action button
        And click on "delete" button
        Then delete popup should be visible
        When user confirm the delete kin
        Then kin should be deleted

    Scenario: portfolio balance should not be available for leads user
        When user click on "Leads" tab
        Then user can see investor
        When user click on first investor instance
        And click on "PORTFOLIO BALANCE" tab
        Then porfolio balance details should not available

    Scenario: portfolio balance should not be available for pledged user
        When user click on "Pledged" tab
        Then user can see investor
        When user click on first investor instance
        And click on "PORTFOLIO BALANCE" tab
        Then porfolio balance details should not available

    Scenario: user can explore portfolio balance for investor
        When user click on "Investors" tab
        Then user can see investor
        When user click on first investor instance
        And click on "PORTFOLIO BALANCE" tab
        Then user can see investor portfolio

    Scenario: transaction are not available for leads user
        When user click on "Leads" tab
        Then user can see investor
        When user click on first investor instance
        And click on "TRANSACTIONS" tab
        Then transaction should not be visible

    Scenario: user can explore investor's transactions
        When user click on "Investors" tab
        Then user can see investor
        When user click on first investor instance
        And click on "TRANSACTIONS" tab
        Then user can see investor's transaction

    Scenario: user can see investor activity
        When user click on "Investors" tab
        Then user can see investor
        When user click on first investor instance
        And click on "ACTIVITY" tab
        Then investor activity should be visible

    Scenario: user should be able to add new address information for investor
        When user clear the applied filter
        And click on first user instance
        Then user should be directed to investor personal information
        When user click on new address button
        Then add new address modal should appear
        When user type new address information
        And click on add address button
        Then new address should be added

    Scenario: user should be able to edit address
        When user clear the applied filter
        And click on first user instance
        Then user should be directed to investor personal information
        When user click on address action button
        And click on "edit" button
        Then add new address modal should appear
        When user type new address information
        And click on update address button
        Then address should be updated

    Scenario: user should be able to delete address
        When user clear the applied filter
        And click on first user instance
        Then user should be directed to investor personal information
        When user click on address action button
        And click on "delete" button
        Then delete popup should be visible
        When user confirm the delete address
        Then address should be deleted

    Scenario: user can collaps and expand navigation menu
        When user click on "collaps" icon
        Then navigation menu should be "collaps"
        When user click on "expand" icon
        Then navigation menu should be "expand"

    Scenario: user can clear already applied filter from user page
        When user click on clear filter button
        Then applied filter should be clear

    Scenario: user can clear already applied filter from filter menu
        When user click filter button
        Then filter menu should be appear
        When user click on clear filter button from filter menu
        Then applied filter should be clear

    Scenario: user can apply different filter for leads user
        When user click filter button
        Then filter menu should be appear
        When user click on clear filter button from filter menu
        Then applied filter should be clear
        When user click on add filter button
        Then filter droopdown should be visible
        And select filter options
        When click on duration filter
        And select start and end date
        And click on apply button
        Then filter should be applied

    Scenario: user can save different filters
        When user click filter button
        Then filter menu should be appear
        When user click on clear filter button from filter menu
        Then applied filter should be clear
        When user click on add filter button
        Then filter droopdown should be visible
        And select filter options
        When click on duration filter
        And select start and end date
        And click on apply button
        Then filter should be applied
        When click on save filter button
        And type filter name
        And select default filter
        And click on save button
        Then created filter should be saved

    Scenario: user can apply already saved filter
        When user click filter button
        Then filter menu should be appear
        When user click on clear filter button from filter menu
        Then applied filter should be clear
        When user click on saved filter button
        Then saved filter should be visible
        When user select saved filter
        Then saved filter should be applied
    
    Scenario Outline: affiliate user can select filters for <user> user
        When user click filter button
        Then filter menu should be appear
        When user click on clear filter button from filter menu
        Then applied filter should be clear
        When user click on users filter
        And select "<user>" filter
        When user click on add filter button
        And select the checkboxes
        Then selected filter should be visible
        Examples:
            | user      |
            | Leads     |
            | Pledged   |
            | Investors |

    Scenario Outline: user can apply duration filter for <user> user
        When user click filter button
        Then filter menu should be appear
        When user click on clear filter button from filter menu
        Then applied filter should be clear
        When user click on users filter
        And select "<user>" filter
        When user click on add filter button
        And click on "Duration" filter checkbox
        When click on "Duration" filter droopdown
        And select start and end date
        And click on apply button
        Then filter should be applied
        Examples:
            | user      |
            | Leads     |
            | Pledged   |
            | Investors |

    Scenario Outline: user can apply project filter for <user> user
        When user click filter button
        Then filter menu should be appear
        When user click on clear filter button from filter menu
        Then applied filter should be clear
        When user click on users filter
        And select "<user>" filter
        When user click on add filter button
        And click on "Project" filter checkbox
        When click on project filter droopdown
        And click on apply button
        Then filter should be applied
        Examples:
            | user      |
            | Pledged   |
            | Investors |

    Scenario Outline: user can apply area filter for <user> user
        When user click filter button
        Then filter menu should be appear
        When user click on clear filter button from filter menu
        Then applied filter should be clear
        When user click on users filter
        And select "<user>" filter
        When user click on add filter button
        And click on "Area" filter checkbox
        When click on "Select Area" filter droopdown
        And type area range
        And click on apply button
        Then filter should be applied
        Examples:
            | user      |
            | Pledged   |
            | Investors |

    Scenario Outline: "No Result Found message" should be visible when search invalid user with <filterTab>
        When user click on search field
        And click on "<filterTab>" tag
        When user type invalid "<filterTab>" in search field
        Then No Result Found message should be visible
        Examples:
            | filterTab  |
            | User ID    |
            | Name       |
            | Mobile No. |
            | CNIC       |

    Scenario: affiliate user can see recent searches
        When user click on clear filter button
        Then copy user id from first table instance
        When user click on search field
        And type user id in search field
        Then searched results should be visible
        When clear the search field
        Then recent searches should be appear

    Scenario: affiliate user can search user from recent searches
        When user click on clear filter button
        Then copy user id from first table instance
        When user click on search field
        And type user id in search field
        Then searched results should be visible
        When clear the search field
        Then recent searches should be appear
        When user click on recent search result
        Then searched results should be visible

    Scenario: affiliate user can not create new investor without mandatory information
        When user click on create investor button
        Then investor form should be visible
        When user type user name
        Then submit buttom should be disabled
        When user type email
        Then submit buttom should be disabled
        When user type mobile number
        Then submit buttom should be disabled
        When user type password
        Then submit button should be enabled
        And close the investor form
