Feature: Admin Portal | Holders List Module
 
    Checking Holders List page functionality

    Background: login admin portal and visit Holders List page
        Given login admin portal and visit Holders List page

    Scenario: user can sync the account balance
        When user click on sync button
        Then account balance must be synced

    Scenario: user can apply project filter on transfer table
        When user click on project filter dropdown
        Then project filter options should be visible
        When user select "Elements Residencia" project
        Then "Elements Residencia" project filter should be selected
        And transaction should be visible

    Scenario Outline: user can search transfer details from <Transaction> wallet address
        When user copy "<Transaction>" wallet address from transfer table
        And type wallet address into search field
        Then only searched transaction should be visible
        Examples:
            | Transaction  |
            | sender       |
            | reciever     |

    Scenario: user can apply role filter on transfer table
        When user click on role filter dropdown
        Then role filter option should be visible
        When user select "EPIC" role option
        Then "EPIC" role should be selected

    Scenario: user can apply role filter on holders table
        When user click on holders toggle button
        Then holders toggle should be selected
        When user click on role filter dropdown
        Then role filter option should be visible
        When user select "EPIC" role option
        Then "EPIC" role should be selected

    Scenario: user can view holders list
        When user click on holders toggle button
        Then holders toggle should be selected
        And holders list should be visible

    Scenario: user can search holders using wallet address
        When user click on holders toggle button
        Then holders toggle should be selected
        When user copy holders wallet address
        And type wallet address into search field
        Then only searcher holder id should be visible

    Scenario: user can view investor details from transfer table
        When user click on users toggle button
        And click on "1st" investor name instance
        Then user should be directed to investor details
        And user click on back button
        When user click on users toggle button
        And click on "2nd" investor name instance
        Then user should be directed to investor details

    Scenario: user can view investor details from holders table
        When user click on holders toggle button
        When user click on users toggle button
        And click on holders username instance
        Then user should be directed to investor details