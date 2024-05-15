Feature: Affiliate Portal | Holders List Module
 
    Checking Holders List page functionality

    Background: login affiliate portal and go to Holders List page
        Given login affiliate portal and go to Holders List page

    Scenario: affiliate user can search transfer details from wallet address
        When user type wallet address in search field
        Then Transfer details should be visible

    Scenario: user can apply project filter on transfer tabel
        When user can apply different project filter
        Then project filter should be selected successfully

    Scenario: user can apply role filter on transfer table
        When user can apply different role filter
        Then role filter should be selected successfully

    Scenario: user can apply different toggle 
        When user click on holders toggle
        Then holders toggle should be selected

    Scenario: user can able to sync the account balance
        When user click on sync button
        Then account balance must be synced

    Scenario: user can apply role filter on holders table
        When user click on holders toggle
        Then holders toggle should be selected
        When user can apply different role filter
        Then role filter should be selected successfully

    Scenario: user can search holders details from wallet address
        When user click on holders toggle
        Then holders toggle should be selected
        When user type wallet address in search field on holders tabel
        Then Transfer details should be visible