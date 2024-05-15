Feature: Admin Portal | Dashoard Module

    Checking Dashoard functionality

    Background: User login to admin portal and visit dashboard
        Given User login to admin portal and visit dashboard

    Scenario: user can see notification
        When user click on notification bell icon
        Then notification modal should be appear
        And user can see notification

    Scenario Outline: user can see project stats for <project>
        When user clicks on project dropdown button
        Then filter options should appear
        When user clicks on "<project>" option
        Then stats of selected "<project>" should appear
        Examples:
            | project             |
            | Elements Residencia |
            | Urban Dwellings     |
            | Broad Peak Realty   |
            | Akron               |
            | Amna Homes          |
            | Qubed, NathiaGali   |

    Scenario Outline: user can see project stats for <days>
        When user click on days dropdown button
        Then days dropdown should be visible
        When user select "<days>" option
        Then stats for "<days>" should be visible
        Examples:
            | days         |
            | Last 7 Days  |
            | Last 15 Days |
            | Last 30 Days |

    Scenario: user can see project statts for current, next and previous round
        When user go to the round stats section
        Then user can see "Current" round stats
        When click on "next" arrow button
        Then user can see "Future" round stats
        When click on "previous" arrow button
        Then user can see "Completed" round stats

    Scenario Outline: user can see recent transaction for <filter>
        When user go to recent transaction section
        And click on transaction filter dropdown button
        Then filter options should appear
        When user select "<filter>" transaction option
        Then related transaction should be visible
        Examples:
            | filter        |
            | Partner Plan  |
            | Listing       |
            | P2P           |
            | Demarcation   |

    Scenario: user can redirect to relevant module upon clicking see more button
        When user go to recent transaction section
        And click on see more button to see transaction
        Then user should redirect to transaction module
        When user go to recent activity section
        And click on see more button to see activity login
        Then user should redirect to activity logs module

    Scenario Outline: user can see transaction status for <days>
        When user click on days dropdown button from transaction status section
        Then days dropdown should be visible
        When user select "<days>" option
        Then transaction stats for "<days>" should be visible
        Examples:
            | days         |
            | Last 7 Days  |
            | Last 15 Days |
            | Last 30 Days |