Feature: Admin Portal | Activity Log Module

    Activity log Page functionality

    Background: user login to admin portal and visit activity log page
        Given user login to admin portal and visit activity log page

    Scenario: user should be able to search activity with username
        When user type username in search field
        Then activities related to searched username should be visible

    Scenario: user should be able to apply filter from action category
        When user click on filter button
        Then filter option should be visible
        When user select action category filter
        And click apply button
        Then related activity should be visible

    Scenario: user should be able to explore activity log according to date
        When user click on filter button
        Then filter option should be visible
        When user select stard date and end date
        And click apply button
        Then related activity should be visible
        
    Scenario: user should be able to clear all activity log filters
        When user click on filter button
        Then filter option should be visible
        When user select filter options
        And click apply button
        Then clear filter button should be visible
        When user click clear filter button
        Then applied filters and clear filter button should be disappear

    Scenario: user should be able to reset all the filters
        When user click on filter button
        Then filter option should be visible
        When user select filter options
        And click on reset button
        Then all filters should be reset

    Scenario: user should be able to select project from project filter
        When user click on project filter button
        Then project filter option should be visible
        When user select any project from project filter
        And click on apply button
        Then related activity should be visible

    Scenario: user should be able to select all projects from project filter
        When user click on project filter button
        Then project filter option should be visible
        When user click all filter button
        And click on apply button
        Then related activity should be visible