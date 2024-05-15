Feature: Investor Portal | Projects Module

    Projects tab functionality

    Background: Login investors portal and click Projects tab
        Given Login investors portal and click Projects tab

    Scenario: user can download project handbook
        When user click on explore button
        Then user see project details
        When user click on download handbook button
        Then handbook should be download

    Scenario: user can see project details and purchase area
        When user click on explore button
        Then user see project details
        And project status and development status
        When user click on purchase now button
        Then select ownership plan and click proceed button
        When user click on purchase now button
        Then ownership status should be visible
        When user click on purchase button
        Then user can see document summary
        When user accept terms and click purchase now button
        Then pledge request should be submitted

    Scenario: user can explore developmental projects and can pledge area
        When user click on developmental projects button
        Then user can only see developmental projects
        When user click on explore button
        Then user see project details
        And project status and development status
        When user click on purchase now button
        Then select ownership plan and click proceed button
        When user click on purchase now button
        Then ownership status should be visible
        When user click on purchase button
        Then user can see document summary
        When user accept terms and click purchase now button
        Then pledge request should be submitted

    Scenario: user can explore mature projects and set reminder
        When user click on mature projects button
        Then user can only explore mature projects
        When user click on explore button
        Then user see project details
        When user click on reminder button
        Then success message should be displayed
        And scroll down and click on back to top button

    Scenario: user can select area to pledge
        When investor click on purchase now button
        Then select ownership plan and click proceed button
        When user clear area field
        Then area warning message should be visible
        When user enter area to pledge and click on purchase now button
        Then ownership status should be visible

