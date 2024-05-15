Feature: Admin Portal | Properties Module

    Checking Properties Module Functionality

    Background: login admin portal and visit properties module
        Given login admin portal and visit properties module

                ### Manage Properties ###

    Scenario Outline: user can see <project> projects stats
        When user click on projects dropdown
        And select "<project>" project
        Then "<project>" project should be selected
        And project stats should be visible
        |Project            |
        |Elements Residencia|
        |Urban Dwellings    |
        |Broad Peak Realty  |

    Scenario: user can see project's current round stats
        When user click on projects dropdown
        And select "Urban Dwellings" project
        Then "Urban Dwellings" project should be selected
        And user click on "Current Round" toogle button
        Then then current round stats should be visible

    Scenario: user can switch between round stats and progression chart
        When user click on projects dropdown
        And select "Urban Dwellings" project
        Then "Urban Dwellings" project should be selected
        When user click on stats expand button
        Then stats popup window should be visible
        When user click on "Progression" toogle button
        Then progression chart should be visible
        When user click on "Round Stats" toogle button
        Then round progress chart should be visible

    Scenario: user can and update specific project details
        When user click on projects dropdown
        And select "Urban Dwellings" project
        Then "Urban Dwellings" project should be selected
        When user click on project stats meetball button
        And select "Update Project Details" option
        Then user should directed to "Edit Project Details" screen
        When user click on edit icon
        And update the project details
        And click on green tick icon
        And click on apply only on this button from popup
        Then project details should be updated

    Scenario: user can see specific project activity log
        When user click on projects dropdown
        And select "Urban Dwellings" project
        Then "Urban Dwellings" project should be selected
        When user click on project stats meetball button
        And select "View Activity Log" option
        Then user should directed to "Project Activity Log" page
        And user can see project activity log

    Scenario: user can project activity details
        When user click on projects dropdown
        And select "Urban Dwellings" project
        Then "Urban Dwellings" project should be selected
        When user click on project stats meetball button
        And select "View Activity Log" option
        Then user should directed to "Project Activity Log" page
        And user can see project activity log
        When user click on activity
        Then activity details should be visible
        
    Scenario Outline: user can see project's <info>
        When user click on "<info>" tab
        Then "<info>" should be visible
        |info|
        |DEVELOPMENT ROUNDS|
        |DOCUMENTS|
        |DESCRIPTION|
        |GALLERY|

    Scenario: user can see round detail, stats and milestones of sepecific project
        When user click on projects dropdown
        And select "Urban Dwellings" project
        Then "Urban Dwellings" project should be selected
        When user click on round instance
        Then user should directed to Round Details page
        And round stats and milestones should be visible

    Scenario: user can next and previous round details
        When user click on round instance
        Then user should directed to Round Details page
        When user click on "Next Round" button
        Then user can see next round details
        When user click on "previous round" button
        Then user can see previous round details

    Scenario: user can see milestone details
        When user click on round instance
        Then user should directed to Round Details page
        And round stats and milestones should be visible
        When user click on milestone
        Then milestone detail should be visible

    Scenario: user can create a new milestone
        When user click on progress round
        Then user should directed to Round Details page
        When user click on create milestone button
        Then create milestone modal should be visible
        When user type milestone detail
        And click on create now button
        Then milestone should be created
    
    Scenario: user can update milestone progress
        When user click on progress round
        Then user should directed to Round Details page
        When user click on progress milestone action button
        And select " Update Progress" option
        Then update milstone modal should be visible
        When user slide the progress bar
        And click on update now button
        Then progress should be updated

    Scenario: user can reschedule the milestone
        When user click on progress round
        Then user should directed to Round Details page
        When user click on progress milestone action button
        And select " Update Progress" option
        Then update milstone modal should be visible
        When user select click on status dropdown
        And select "Scheduled" status
        And click on update now button
        Then progress should be updated
        
    Scenario: user can add progress to the scheduled milestone
        When user click on progress round
        Then user should directed to Round Details page
        When user click schedule milestone action button
        And select " Add Progress" option
        Then update milstone modal should be visible
        When user select click on status dropdown
        And select "Active" status
        And add milestone progress
        And click on update now button
        Then progress should be updated

    Scenario: user can complete the milestone
        When user click on progress round
        Then user should directed to Round Details page
        When user click on progress milestone action button
        And select " Update Progress" option
        Then update milstone modal should be visible
        When user select click on status dropdown
        And select "Complete" status
        And click on update now button
        Then progress should be updated

    Scenario: user can edit completed milestone
        When user click on progress round
        Then user should directed to Round Details page
        When user click on completed milestone action button
        And select "Edit" option
        When user edit milestone details
        And click on save button
        Then milestone details should be updated

    Scenario: user can edit progress milestone
        When user click on progress round
        Then user should directed to Round Details page
        When user click on progress milestone action button
        And select "Edit" option
        When user edit milestone details
        And click on save button
        Then milestone details should be updated

    Scenario: user can delete scheduled milestone
        When user click on progress round
        Then user should directed to Round Details page
        And user reschedule the milestone
        When user click schedule milestone action button
        And select "Delete" option
        And click on delete button
        Then milestone should be delted

    Scenario: user can't create a milestone for completed round
        When user click on completed round
        Then user should directed to Round Details page
        And create milestone button should be disabled

    Scenario: user can unlock proof of completed round
        When user click on complete round meetball button
        Then "Unlock Proof" option should be visible
    
    Scenario: user can lock proof of completed round
        When user click on complete round meetball button
        Then "Unlock Proof" option should be visible

                ### Locked Round ###
                
    Scenario: user can unlock upcoming round
        When user click on locked round
        Then user should directed to Round Details page
        When user click on unlock round button
        And type password
        And user click on unlock round button
        Then round should unlocked successfully

    Scenario: user can create milestone in locked round
        When user click on locked round
        Then user should directed to Round Details page
        When user click on create milestone button
        Then create milestone modal should be visible
        When user type milestone detail
        And click on create now button
        Then milestone should be created

    Scenario: user can edit milestone from locked round
        When user click on locked round
        Then user should directed to Round Details page
        When user click on progress milestone action button
        And select "Edit" option
        When user edit milestone details
        And click on save button
        Then milestone details should be updated

    Scenario: user can delete milestone from locked round
        When user click on locked round
        Then user should directed to Round Details page
        And user reschedule the milestone
        When user click schedule milestone action button
        And select "Delete" option
        And click on delete button
        Then milestone should be delted

            ### Aproval Request ###

    Scenario Outline: user can see <request> request
        Given user should be on approval request page
        When user click on days filter dropdown
        And select "All Time" option
        Then Table data should be visible
        When user click on "<request>" request tab
        Then "<request>" should be visible
        | request   |
        | Pending   |
        | Approved  |
        | Discarded |

    Scenario Outline: user can see <days> approval request
        Given user should be on approval request page
        When user click on days filter dropdown
        And select "<days>" option
        Then approval request table should be visible
        |days         |
        |Last 30 Days |
        |Last 15 Days |
        |Last 7 Days  |
        |All Time     |

    Scenario: user can apply project filter
        Given user should be on approval request page
        When user click on project filter
        And select "Akron" project option
        And click on apply button
        Then project filter should be applied

    Scenario: user can search approval request by Username
        Given user should be on approval request page
        When user click on days filter dropdown
        And select "All Time" option
        When user search username
        Then searched user should be visible

    Scenario: user can search approval request by ID
        Given user should be on approval request page
        When user click on days filter dropdown
        And select "All Time" option
        When user search id
        Then searched user should be visible

    Scenario: user can search approval request by Phone
        Given user should be on approval request page
        When user click on days filter dropdown
        And select "All Time" option
        When user search phone
        Then searched user should be visible

    Scenario: user redirected to investor profile upon clicking username
        Given user should be on approval request page
        When user click on days filter dropdown
        And select "All Time" option
        When user click on investor name
        Then user investor details should be visible

    Scenario: user can approve pending approval request
        Given user should be on approval request page
        When user click on days filter dropdown
        And select "All Time" option
        When user click on approve button
        And click on proceed button
        Then request should be approved
        And click on done button

    Scenario: user can discard pending approval request
        Given user should be on approval request page
        When user click on days filter dropdown
        And select "All Time" option
        When user click on meetball button
        And click on "Discard Request" button
        And add note and clikc on discard request button
        Then approval request should be discarded

    Scenario: user can put on hold pending approval request
        Given user should be on approval request page
        When user click on days filter dropdown
        And select "All Time" option
        When user click on meetball button
        And click on "Put on hold" button
        Then request status should be updated

    Scenario: user can discard approved request
        Given user should be on approval request page
        When user click on days filter dropdown
        And select "All Time" option
        And user click on "Approved" request tab
        When user click on meetball button
        And click on "Discard Request" button
        And add note and clikc on discard request button
        Then approval request should be discarded

    Scenario: user can allow access to existing user
        Given user should be on approval request page
        When user click on allow access button
        Then allow access modal should be visible
        When user click on "Existing User" option
        And search existing user and select project
        And click on proceed button
        Then asscess should be allowed