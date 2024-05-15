Feature: Affiliate Portal | Transactions Module

    Checking Transactions page functionality

    Background: login affiliate portal and go to transactions page
        Given login affiliate portal and go to transactions page

    Scenario: user should be able to explore pending, verified, approved, locked and discarded transactions
        When user click on pending tab
        Then corresponding Transactions should be visible
        When user click on verified tab
        Then corresponding Transactions should be visible
        When user click on approved tab
        Then corresponding Transactions should be visible
        When user click on locked tab
        Then corresponding Transactions should be visible
        When user click on discarded tab
        Then corresponding Transactions should be visible

    Scenario: user should be able to create new investor for transactions
        When user visit users page
        Then user should create new investor
        
    Scenario: user should be able to create peer to peer transaction for investor
        When user click on create transaction button
        Then transaction menu should be visible
        When user click on "peer to peer" transaction
        And add project information
        Then proceed button should be enabled
        When user click on proceed button
        Then user should be on otp modal
        # Then "peer to peer" transaction should created successfully

    Scenario: user should be able create partner plan transaction
        When user click on create transaction button
        Then transaction menu should be visible
        When user click on "partner plan" transaction
        Then user should be able to search investor for transaction
        When user search investor id and agent name to create transaction
        And click on proceed next button
        Then user should be able to add project information
        When user add project information and discounted ammount
        And click proceed next button
        Then user should be able to see transaction summary
        When user click on create transaction now button
        Then "partner plan" transaction should created successfully
    
    Scenario: user should be able to search recently created transaction id
        When user search transaction id in search field
        And click on first instance
        Then user can verify the created transaction

    Scenario: user should be able to edit created transaction
        When user search transaction id in search field
        And click on first instance
        Then user can verify the created transaction
        When user click on transaction dropdown button
        Then dropdown should be visible
        When user select "Edit Transaction" option
        Then edit transaction page should be visible
        When user edit transaction information
        And click proceed next button
        Then user should be able to see transaction summary
        When user click on update transaction button
        Then transaction should be updated successfully

    Scenario: user should be able to update status for created transaction
        When user search transaction id in search field
        And click on first instance
        Then user can verify the created transaction
        When user click on verify transaction button
        Then update transaction status screen should be visible
        When user click on update status button
        Then transaction should updated and moved to verified tab

    Scenario: user should be able to filter transaction for last 30, 15 and 7 days
        When user click on days filter button
        And select Last "15" days filter option
        Then Last "15" days should be selected
        When user click on days filter button
        And select Last "7" days filter option
        Then Last "7" days should be selected
        When user click on days filter button
        And select Last "30" days filter option
        Then Last "30" days should be selected
    
    Scenario: user should be able to discard transaction
        When user search transaction id
        And click on action dropdown button
        Then dropdown should be visible
        When user select "discard" option
        And type note and click on discard transaction button
        Then transaction should be discarded successfully

    Scenario: user should be able to add an agent to transaction
        When user search transaction id
        And click on action dropdown button
        Then dropdown should be visible
        When user select "add agent" option
        And search for agent and click on add agent button
        Then agent should be added

    Scenario: user should be able to add, edit and delete notes
        When user search transaction id
        And click on action dropdown button
        Then dropdown should be visible
        When user select "add/view notes" option
        And type note and click on add button
        Then note should be "added" successfully
        When user click on edit button
        And retype note and click on update button
        Then note should be "edit" successfully
        When user click on delete button
        And confirm delete note
        Then note should be "deleted" successfully

    Scenario: user should be able to add/ update document
        When user click on transaction instance
        Then transaction details should be visible
        When user click on transaction dropdown button
        Then dropdown should be visible
        When user select "Add/Modify Documents" option
        Then update document page should be visible
        When user select document type and upload document 
        Then selected document should be visible
        And click on update attachment button
        Then document should updated successfully
        When user open transaction instance and click on delete icon
        And click on update attachment button

    Scenario: user should be able to discard verified transaction
        When user click on verified tab
        And click on action dropdown button
        Then dropdown should be visible
        When user select "discard" option
        And type note and click on discard transaction button
        Then transaction should discarded
        
    Scenario: user should be able to discard approved transaction
        When user click on approved tab
        And click on action dropdown button
        Then dropdown should be visible
        When user select "discard" option
        And type note and click on discard transaction button
        Then transaction should be discarded successfully

    Scenario: transaction table should be sorted ascending and descending upon clicking Txt ID header
        When user click on table header " TXN ID "
        Then table data should be sorted in ascending order
        When user click on table header " TXN ID "
        Then table data should be sorted in descending order

    Scenario: transaction table should be sorted ascending and descending upon clicking USER ID header
        When user click on table header " USER ID "
        Then User ID table data should be sorted in ascending order
        When user click on table header " USER ID "
        Then User ID table data should be sorted in descending order

    Scenario: user can not create transaction for suspended user
        When user click on user tab
        Then user should be on user page
        When user suspend the user
        And click on transaction tab
        Then user should be transaction page
        When user click on create transaction button
        Then transaction menu should be visible
        When user click on "partner plan" transaction
        And search investor for transaction
        Then user is suspended error should be visible

    Scenario: transaction details modal's collaps and expand buttons should be functional
        When user click on transaction instance
        Then transaction details should be visible
        When user click on "collapse" all button
        Then all dropdown should be "collapsed"
        When user click on "expand" all button
        Then all dropdown should be "expanded"

    Scenario: user can see transaction logs from transaction details modal
        When user click on transaction instance
        Then transaction details should be visible
        When user click on transaction log button
        Then transaction logs should be visible

    Scenario: user can see seller details upon clicking transaction
        When user click on transaction instance
        Then transaction details should be visible
        When user click on "collapse" all button
        And click on "Seller Details" dropdown button
        Then "Seller Details" dropdown should be expanded
        And Seller details should be visible
        
    Scenario: user can see agent details upon clicking transaction
        When user click on transaction instance
        Then transaction details should be visible
        When user click on "collapse" all button
        And click on "Agent Details" dropdown button
        Then "Agent Details" dropdown should be expanded
        And agent details should be visible

    Scenario: user can see attachments from transaction details modal
        When user click on transaction instance
        Then transaction details should be visible
        When user click on "collapse" all button
        And click on "Attachments" dropdown button
        Then "Attachments" dropdown should be expanded
        And attachment should be visible
 
    Scenario: user can cancel transaction upon clicking X button
        When user click on create transaction button
        Then transaction menu should be visible
        When user click on "partner plan" transaction
        Then user should be able to search investor for transaction
        When user search investor id and agent name to create transaction
        And click on proceed next button
        Then user should be able to add project information
        When user add project information and discounted ammount
        And click proceed next button
        Then user should be able to see transaction summary
        When user click on x button
        Then create transaction modal should be close

    Scenario: check back button is functional on create transaction modal
        When user click on create transaction button
        Then transaction menu should be visible
        When user click on "partner plan" transaction
        Then user should be able to search investor for transaction
        When user search investor id and agent name to create transaction
        And click on proceed next button
        Then user should be able to add project information
        When user add project information and discounted ammount
        And click proceed next button
        Then user should be able to see transaction summary
        When user click on back button
        Then user should move back on transaction modal
