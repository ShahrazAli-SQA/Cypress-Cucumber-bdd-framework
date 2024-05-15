Feature: Admin Portal | Rental Distribution Module

    Checking Rental Distribution Module functionality

    Background: login admin portal and visit rental distribution module
        Given login admin portal and visit rental distribution module

    Scenario: user can apply project filter
        When user click on project filter
        Then filter options should be visible
        When uncheck all cehckbox and select "Akron" project
        And click on apply button
        Then filter should be applied
        And filterd project should be displayed in the table

    Scenario: verify no project should be visible when user clear project filter
        When user click on project filter
        Then filter options should be visible
        When user unckeck all cehckboxes
        And click on apply button
        Then "No Rental Disbursments" should be visible

    Scenario: user can apply project filter and can see project rental details
        When user click on project filter
        Then filter options should be visible
        When uncheck all cehckbox and select "Akron" project
        And click on apply button
        Then filter should be applied
        When user click on filtered project
        Then user should navigate to "Akron" project details

    Scenario: user can generate batch report
        When user click on project filter
        Then filter options should be visible
        When uncheck all cehckbox and select "Akron" project
        And click on apply button
        Then filter should be applied
        When user click on filtered project
        Then user should navigate to "Akron" project details
        When user click on generate batch report button
        And click on batch report item
        Then batch report should be generated

    Scenario: user can generate invoice from due list by selecting check box
        When user click on project filter
        Then filter options should be visible
        When uncheck all cehckbox and select "Akron" project
        And click on apply button
        Then filter should be applied
        When user click on filtered project
        Then user should navigate to "Akron" project details
        When user select the project
        And click on generate invoice button
        Then generate invoice modal window should be visible
        And click on modal generate invoice button
        Then invoice should be generated and moved to "To be Processed"

    Scenario: user can generate invoice from due list by clicking meatball button
        When user click on project filter
        Then filter options should be visible
        When uncheck all cehckbox and select "Akron" project
        And click on apply button
        Then filter should be applied
        When user click on filtered project
        Then user should navigate to "Akron" project details
        When user click on meatball action button
        And click on "Generate Invoice" action button
        Then generate invoice modal window should be visible
        And click on modal generate invoice button
        Then invoice should be generated and moved to "To be Processed"

    Scenario: user can select one payout and all payout and clear selection from due payouts
        When user click on project filter
        Then filter options should be visible
        When uncheck all cehckbox and select "Akron" project
        And click on apply button
        Then filter should be applied
        When user click on filtered project
        Then user should navigate to "Akron" project details
        When user selct one payout
        And click on clear selection button
        Then selcted payout should be unselect
        When user select all payout
        And click on clear selection button
        Then selcted all payouts should be unselect

    Scenario: user can apply bank filter and reset filter on due payout
        When user click on project filter
        Then filter options should be visible
        When uncheck all cehckbox and select "Akron" project
        And click on apply button
        Then filter should be applied
        When user click on filtered project
        Then user should navigate to "Akron" project details
        When user click on filter button
        And select "United Bank Limited" bank filter
        And click apply button
        Then bank filter should be applied
        When user click on reset filter button
        Then applied filters should be reset

    Scenario: user can select one item or all items and clear selection from to be processed payouts
        When user click on project filter
        Then filter options should be visible
        When uncheck all cehckbox and select "Akron" project
        And click on apply button
        Then filter should be applied
        When user click on filtered project
        Then user should navigate to "Akron" project details
        And click on "To be Processed" status tab
        When user selct one payout
        And click on clear selection button
        Then selcted payout should be unselect
        When user select all payout
        And click on clear selection button
        Then selcted all payouts should be unselect

    Scenario: user can apply batch filter and bank filter on to be processed payouts
        When user click on project filter
        Then filter options should be visible
        When uncheck all cehckbox and select "Akron" project
        And click on apply button
        Then filter should be applied
        When user click on filtered project
        Then user should navigate to "Akron" project details
        And click on "To be Processed" status tab
        When user click on filter button
        And select bank and batch filter
        And click apply button
        Then bank and batch filter should be applied
        When user click on reset filter button
        Then batch filter and bank filters should be reset

    Scenario: apply batch filter and bank filter and download batch report
        When user click on project filter
        Then filter options should be visible
        When uncheck all cehckbox and select "Akron" project
        And click on apply button
        Then filter should be applied
        When user click on filtered project
        Then user should navigate to "Akron" project details
        And click on "To be Processed" status tab
        When user click on filter button
        And select bank and batch filter
        And click apply button
        Then bank and batch filter should be applied
        When user click on download button
        And select "Batch 7" from the dropdown
        Then batch report should be download

    Scenario: user can revert a payout from to be processed to due
        When user click on project filter
        Then filter options should be visible
        When uncheck all cehckbox and select "Akron" project
        And click on apply button
        Then filter should be applied
        When user click on filtered project
        Then user should navigate to "Akron" project details
        And click on "To be Processed" status tab
        When user click on meatball action button
        And click on revert to due button
        Then modal window should be appear
        When user selct "Other" reason for revert
        And add a comment
        And click on inform holder button
        Then payout should be revert and holder should be informed

    Scenario: pay single payout upon clicking mark paid button
        When user click on project filter
        Then filter options should be visible
        When uncheck all cehckbox and select "Akron" project
        And click on apply button
        Then filter should be applied
        When user click on filtered project
        Then user should navigate to "Akron" project details
        And click on "To be Processed" status tab
        When user click on specific mark paid button
        Then mark paid modal should be visible
        When user add attachment for the payout
        And click on proceed button
        Then payout should be paid successfully

    Scenario: pay multiple payouts upon clicking mark paid button
        When user click on project filter
        Then filter options should be visible
        When uncheck all cehckbox and select "Akron" project
        And click on apply button
        Then filter should be applied
        When user click on filtered project
        Then user should navigate to "Akron" project details
        And click on "To be Processed" status tab
        When user select multiple payouts
        And click on multiple mark paid button
        Then mark paid modal should be visible
        When user add attachment for all payout
        And click on proceed button
        Then payout should be paid successfully

    Scenario: user can not generate invoice for the payout having no banking details
        When user click on project filter
        Then filter options should be visible
        When uncheck all cehckbox and select "Akron" project
        And click on apply button
        Then filter should be applied
        When user click on filtered project
        Then user should navigate to "Akron" project details
        When user click on the meatball action button, having no banking details
        Then generate invoice button should be disabled

    Scenario: user can edit tax for to be processed payout
        When user click on project filter
        Then filter options should be visible
        When uncheck all cehckbox and select "Akron" project
        And click on apply button
        Then filter should be applied
        When user click on filtered project
        Then user should navigate to "Akron" project details
        And click on "To be Processed" status tab
        When user click on meatball action button
        And click on edit tax button
        Then edit tax modal should be visible
        When user click on modal meatball action button
        And click on edit tax button
        And edit the tax click on click on green tick icon
        Then tax should be updated

    Scenario: user can see the holder's hidden payouts
        When user click on project filter
        Then filter options should be visible
        When uncheck all cehckbox and select "Akron" project
        And click on apply button
        Then filter should be applied
        When user click on filtered project
        Then user should navigate to "Akron" project details
        When user click on skipped holders tab
        Then skipped payouts should eb visible
##############-----Incomplete----#################
    Scenario: user can reschedule skipped payouts
        When user click on project filter
        Then filter options should be visible
        When uncheck all cehckbox and select "Akron" project
        And click on apply button
        Then filter should be applied
        When user click on filtered project
        Then user should navigate to "Akron" project details
        When user click on skipped holders tab
        Then skipped payouts should eb visible
        When user click on skipped payout meatball button
        And click on "Reschedule Payouts" action button
        Then payout schedule modal window should be visible
        And click on schedule button

    Scenario: user can move skipped payouts to due
#################-------------------#####################
    Scenario: user can add and remove attachment for the payout while mark as paid
        When user click on project filter
        Then filter options should be visible
        When uncheck all cehckbox and select "Akron" project
        And click on apply button
        Then filter should be applied
        When user click on filtered project
        Then user should navigate to "Akron" project details
        And click on "To be Processed" status tab
        When user click on specific mark paid button
        Then mark paid modal should be visible
        And user add attachment for the payout
        And remove the attachment

    Scenario: user can see the project holders
        When user click on project filter
        Then filter options should be visible
        When uncheck all cehckbox and select "Akron" project
        And click on apply button
        Then filter should be applied
        When user click on filtered project
        Then user should navigate to "Akron" project details
        When user click on  "HOLDER" tab
        Then holders table should be visible

    Scenario: user can search holders by username
        When user click on project filter
        Then filter options should be visible
        When uncheck all cehckbox and select "Akron" project
        And click on apply button
        Then filter should be applied
        When user click on filtered project
        Then user should navigate to "Akron" project details
        When user click on  "HOLDER" tab
        Then holders table should be visible
        When When user search holders user "username"
        Then shearched holder should be visible

    Scenario: user can search holders by dao Id
        When user click on project filter
        Then filter options should be visible
        When uncheck all cehckbox and select "Akron" project
        And click on apply button
        Then filter should be applied
        When user click on filtered project
        Then user should navigate to "Akron" project details
        When user click on  "HOLDER" tab
        Then holders table should be visible
        When When user search holders user "id"
        Then shearched holder should be visible

    Scenario: user can search holder and see his payout history
        When user click on project filter
        Then filter options should be visible
        When uncheck all cehckbox and select "Akron" project
        And click on apply button
        Then filter should be applied
        When user click on filtered project
        Then user should navigate to "Akron" project details
        When user click on  "HOLDER" tab
        Then holders table should be visible
        When When user search holders user "id"
        Then shearched holder should be visible
        When user click on search payout
        Then user can see payout history for the searched holder

    Scenario: user can view payout history
        When user click on project filter
        Then filter options should be visible
        When uncheck all cehckbox and select "Akron" project
        And click on apply button
        Then filter should be applied
        When user click on filtered project
        Then user should navigate to "Akron" project details
        When user click on  "PAYOUT HISTORY" tab
        Then payout history table should be visible

    Scenario: user can search specific payout history
        When user click on project filter
        Then filter options should be visible
        When uncheck all cehckbox and select "Akron" project
        And click on apply button
        Then filter should be applied
        When user click on filtered project
        Then user should navigate to "Akron" project details
        When user click on  "PAYOUT HISTORY" tab
        Then payout history table should be visible
        When user search payout
        Then searched payout should be visible

    Scenario: user can see payout attachments
        When user click on project filter
        Then filter options should be visible
        When uncheck all cehckbox and select "Akron" project
        And click on apply button
        Then filter should be applied
        When user click on filtered project
        Then user should navigate to "Akron" project details
        When user click on  "PAYOUT HISTORY" tab
        Then payout history table should be visible
        When user click on payout history instance
        Then user can see attachnemts
        
    Scenario Outline: user can generate <report> from payout history
        When user click on project filter
        Then filter options should be visible
        When uncheck all cehckbox and select "Akron" project
        And click on apply button
        Then filter should be applied
        When user click on filtered project
        Then user should navigate to "Akron" project details
        When user click on  "PAYOUT HISTORY" tab
        Then payout history table should be visible
        When user click on payout history instance
        And user click on generate rental report button
        Then "<report>" should be visible
        Examples:
            | report                |
            | Paid Rental Report    |
            | Unpaid Rental Report  |