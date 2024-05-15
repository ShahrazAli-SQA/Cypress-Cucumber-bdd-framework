Feature: Investor Portal | Dashboard Module

    Dashboard functionality

    Background: visit the investor portal and login
        Given user Visit investor portal and login


    Scenario: User is able to explore all projects
        When User cilck on invest now button
        Then Explore projects page should be visible
        When User click on all projects button
        Then filtered projects should be visible
    
    Scenario: User is able to explore developmental projects
        When User cilck on invest now button
        Then Explore projects page should be visible
        When User click on developmental projects button
        Then filtered projects should be visible

    Scenario: User is able to explore mature projects
        When User cilck on invest now button
        Then Explore projects page should be visible
        When User click on mature projects button
        Then filtered projects should be visible

    Scenario: User should be able to explore listing project
        When User click on sell area button
        Then Dao listing projects should be displayed

    Scenario: user can access wallet info
        When user click on wallet
        Then wallet dropdown should visible
        When user click on receive area button 
        Then wallet info popup should appear
    
    Scenario: user can redirect to transfer area page 
        When user click on wallet
        Then wallet dropdown should visible
        When user click on send area button
        Then user should redirect to transfer area page

    Scenario: user can explore active investments
        When user click on avatar icon
        Then avatar dropdown should be visible
        When user click active purchases button
        Then user should redirect to active investments page

    Scenario: user can see current investment worth and future worth
        When user click on avatar icon
        Then avatar dropdown should be visible
        When user click active purchases button
        Then user should redirect to active investments page
        When user click on slider
        Then project`s current worth should be visible
        When user click on slider
        Then project`s future worth should be visible

    Scenario: user can purchase area from dao NFT`s
        When user move to NFT
        And click on buy now button
        Then NFT information should be visible
        When user close NFT information
        And select first NFT
        Then NFT information should be visible
        When user click on choose Demarcated unit plan button
        Then user should redirect to payment plan page
        When user accept terms and conditions
        And click purchase property button
        Then confirm purchase popup should appear

    Scenario: user can apply different projects filters
        When user move to NFT
        And click on buy now button
        Then NFT information should be visible
        When user close NFT information
        And click on projects filter
        Then project filter dropdown should be visible
        And user select any othe project
        Then filter should apply successfully

    Scenario: user can filter nfts as standard and premium
        When user move to NFT
        And click on buy now button
        Then NFT information should be visible
        When user close NFT information
        Then user can apply standard and prmium filter successfully

    Scenario: user can filter nfts as floor and appartments
        When user move to NFT
        And click on buy now button
        Then NFT information should be visible
        When user close NFT information
        Then user can apply floor and appartments filter successfully
    
    Scenario: user can acess project detail directly from new project section
        When user click on Project
        Then user should redirect to project details

    Scenario: investor can watch customers reviews
        When user move to customers reviews section
        And click on any  video instance
        Then popup video should be appear


    







    
