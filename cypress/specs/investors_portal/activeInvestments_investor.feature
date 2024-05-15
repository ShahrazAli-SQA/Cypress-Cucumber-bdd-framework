Feature: Investor Portal | Active Investments Module

    Active Investments functionality

    Background: Login investors portal and click active investment tab
        Given login investors portal and click active investment tab


    Scenario: User can view statement logs
        When user click on investments report button
        Then user should redirect to reports page
        When user click on statement logs tab
        Then generated statements should be visible
        And user can view any report

    Scenario: user can generate and download investment summary
        When user click on investments report button
        Then user should redirect to reports page
        When user click on investment summary card
        Then generate report popup should be visible
        When user select start date and end date
        And click on generate report button
        Then report should be generated

    Scenario: user can generate and download transaction report
        When user click on investments report button
        Then user should redirect to reports page
        When user click on transaction report card
        Then generate report popup should be visible
        When user select start date and end date
        And click on generate report button
        Then report should be generated

    Scenario: user can download investment certificate
        When user click on investments report button
        Then user should redirect to reports page
        When user click on investment certificate card
        Then investment certificate popup should be visible

    Scenario: user can generate rental report
        When user click on income stream tab
        Then user should redirect to income stream page
        When user click on generate rental report button
        Then generate report popup should be visible
        When user select start date and end date
        And click on generate report button

    
        
        
        

