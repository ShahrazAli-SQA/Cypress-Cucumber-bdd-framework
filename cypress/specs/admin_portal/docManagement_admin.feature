Feature: Admin Portal | Doc Management Module

    Checking Doc management page functionality

    Background: user login Admin portal and visit doc management page
        Given user login Admin portal and visit doc management page

    Scenario: user can create new user from payment plan screen
        When user click on Create investment plan button
        Then payment plan details page should be visible
        When user click on create user button
        Then the user creation form should be visible
        When user inputs all the required fields in the user creation form
        And click on submit button
        Then success message should be visible

    Scenario: user can create Buy to Own investment plan
        When user click on Create investment plan button
        Then payment plan details page should be visible
        When user select "PKR" currency from the currency dropdown
        Then search for investor name
        When user select "Buy to Own" investment plan
        And add required details for "Buy to Own" investment plan
        Then user should be see investment plan and summary
        When user click on Request for approval button
        Then investment plan should be created

    Scenario: user can create a transaction in USD currency
        When user click on Create investment plan button
        Then payment plan details page should be visible
        When user select "USD" currency from the currency dropdown
        Then search for investor name
        When user select "Buy to Own" investment plan
        And add required details for "Buy to Own" investment plan
        Then user should be see investment plan and summary
        When user click on Request for approval button
        Then investment plan should be created

    Scenario: user can create a transaction in AED currency
        When user click on Create investment plan button
        Then payment plan details page should be visible
        When user select "AED" currency from the currency dropdown
        Then search for investor name
        When user select "Buy to Own" investment plan
        And add required details for "Buy to Own" investment plan
        Then user should be see investment plan and summary
        When user click on Request for approval button
        Then investment plan should be created

    Scenario: user can create Buy to Sell investment plan
        When user click on Create investment plan button
        Then payment plan details page should be visible
        When user select "PKR" currency from the currency dropdown
        Then search for investor name
        When user select "Buy to Sell" investment plan
        And add required details for "Buy to Sell" investment plan
        Then user should be see investment plan and summary
        When user click on Request for approval button
        Then investment plan should be created

    Scenario: user can create Buy to Earn investment plan
        When user click on Create investment plan button
        Then payment plan details page should be visible
        When user select "PKR" currency from the currency dropdown
        Then search for investor name
        When user select "Buy to Earn" investment plan
        And add required details for "Buy to Earn" investment plan
        Then user should be see investment plan and summary
        When user click on Request for approval button
        Then investment plan should be created

    Scenario: user can create Buy to Save investment plan
        When user click on Create investment plan button
        Then payment plan details page should be visible
        When user select "PKR" currency from the currency dropdown
        Then search for investor name
        When user select "Buy to Save" investment plan
        And add required details for "Buy to Save" investment plan
        Then user should be see investment plan and summary
        When user click on Request for approval button
        Then investment plan should be created

    Scenario: user can approve investment plan
        When user click on view and approve button
        Then payemnt plan should be visible
        When user type plan validity days and comments
        And click on approve document
        Then document should be approved

    Scenario: user can approve investment plan from meatball action button
        When user click on document instance
        Then document details should be visible
        When user click on meetball button
        And click on view & and approve button
        Then payemnt plan should be visible
        When user type plan validity days and comments
        And click on approve document
        Then document should be approved

    Scenario: user can view attachments from approved tab
        When user click on approved tab
        And move to the attachement column
        Then user should be able to see .pdf attachement

    Scenario: user can search investment plan with usecase
        When user type usecase in the search field
        Then all searched instances should be related to that usecase

    Scenario: user can search investment plan document with id
        When user type investment plan document id in search field
        Then only searched document should be visible

    Scenario: user can discard investment plan
        When user click on document instance
        Then document details should appear
        When user click on meetball button
        And click on discard button
        And type comment and click on discard plan button
        Then investmant plan should be discarded

    Scenario: user can discard approved investment plan
        When user click on apprved tab
        And user click on document instance
        Then document details should appear
        When user click on meetball button
        And click on discard button
        And type comment and click on discard plan button
        Then investmant plan should be discarded

    Scenario Outline: user can add and delete note for the <tab> document
        When user click on "<tab>" tab
        And user click on document instance
        Then document details should appear
        When user type note in comment box
        And click on add button
        Then new note should added
        When user click on delete button
        And confirm delete note
        Then note should be deleted
        Examples:
            | tab       |
            | Pending   |
            | Approved  |
            | Discarded |

    Scenario Outline: user can clear note when click on cancel button for the <tab> document
        When user click on "<tab>" tab
        And user click on document instance
        Then document details should appear
        When user type note in comment box
        And click on cancel button
        Then note should be clear
        Examples:
            | tab       |
            | Pending   |
            | Approved  |
            | Discarded |

    Scenario: user can view next and previous document upon clicking arrow button
        When user click on view and approve button
        Then payemnt plan should be visible
        When user click on next doc button
        Then next document should be visible
        When user click on previous arrow button
        Then previous document should be visible

    Scenario: user can discard payment plan from payment plan approval modal
        When user click on view and approve button
        Then payemnt plan should be visible
        When user click on discard button
        And type comment and click on discard plan button
        Then investmant plan should be discarded

    Scenario: tooltip should be visible when user hover on amount
        When user hover on amount
        Then tooltip should be visible