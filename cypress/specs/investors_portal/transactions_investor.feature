Feature: Investor Portal | Transactions Module

    Transactions Module functionality

    Background: Login investors portal and click transactions tab
        Given Login investors portal and click transactions tab

    Scenario: user should be able to purchase area and create transaction
        When user click on purchase now button
        Then user should be on projects page
        When user click on purchase now button
        And select ownership plan
        Then user should be able to select area
        When user select arae to pledge
        And click on purchase now button
        Then user can see installment plan
        When user click on purchase button
        Then user can see order summary
        When user check the order summary
        And accept terms and condition
        And click on purchase now button
        Then transaction should created successfully
        When user click on see transactions button
        Then user should be on transactions module
        And can see the created transaction

    Scenario: user should be able to confirm the created transaction
        When user click on created transaction
        Then confirm transaction popup window should be visible
        When user select banking details
        And upload transaction reciept
        And click on submit for verification button
        Then transaction should confirmed

    Scenario: user should be able to see his discarded transactions
        When user click on discarded transaction toggle
        Then user toggle should turn on
        And discarded trasnaction should be visible

    Scenario: user should be able see global transactions for interested projects
        When user click on global transactions tab
        Then user can see global transactions
        When user click on filter dropdown button
        And select "DKV" filter
        Then all transactions should be related to "DKV"
        When user click on filter dropdown button
        And select "UD" filter
        Then all transactions should be related to "UD"
        When user click on filter dropdown button
        And select "ER" filter
        Then all transactions should be related to "ER"

    Scenario: user should be able to see transaction for selected project upon clicking show my transaction toggle button
        When user click on global transactions tab
        Then user can see global transactions
        When user click on on toggle button
        Then toggle should turn on
        When user click on filter dropdown button
        And select "DKV" filter
        Then all transactions should be related to "DKV"
        When user click on filter dropdown button
        And select "UD" filter
        Then all transactions should be related to "UD"
        When user click on filter dropdown button
        And select "ER" filter
        Then all transactions should be related to "ER"

    Scenario: transaction should not discarded upon clicking no thanks button
        When user create transaction
        And user click on meatball action button
        Then action menu should be visible
        When user click on discard transaction button
        Then password require popup should be visible
        When user type required value in input field
        And click on no thanks button
        Then password require popup should disappear

    Scenario: user should be able to discard trasnaction
        When user create transaction
        And user click on meatball action button
        Then action menu should be visible
        When user click on discard transaction button
        Then password require popup should be visible
        When user type required value in input field
        And click on submit button
        Then transaction should be discarded

    Scenario: confirm transfer popup window should appear upon clicking confirm treansfer button
        When user open any panding transaction
        Then confirm transaction popup window should be visible
        When user close the popup window
        And click on confirm transaction button
        Then confirm transaction popup window should be visible

    Scenario: user can see transaction details upon clicking submit receipts
        When user click on submit reciepts
        Then confirm transaction popup window should be visible
        When user close the popup window
        Then user should be able to see transaction details

    Scenario: user can redirect to reports module upon clicking transaction summary button
        When user click on transaction summary button
        Then user should be on reports page
        And different reports options should be available

    Scenario: user should be able to view statement logs
        When user click on transaction summary button
        Then user should be on reports page
        When user click on statement logs tab
        Then user can see statement logs

    Scenario: verify that the pagination should work properly
        When user click on next button
        Then user should be on page "2"
        When user click on previous button
        Then user should be on page "1"
        When user click on page "2" button
        Then user should be on page "2"
        When user click on page "1" button
        Then user should be on page "1"