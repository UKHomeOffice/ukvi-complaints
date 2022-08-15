@feature @refund-one

Feature: Refunds

  Scenario: I am on the Refunds (refunds) journey, I am acting on behalf of myself and want to complain
  in the uk that I have requested a refund more than 6 weeks ago.
  On the confirm page I want to change the complaint type and reference number.
    Given I start the 'reason' application journey
    Then I should see 'What is the complaint about?' on the page
    Then I check 'reason-refund'
    Then I select 'Continue'
    Then I should be on the 'refund' page showing 'Have you requested a refund?'
    Then I check 'refund-yes'
    Then I select 'Continue'
    Then I should be on the 'refund-when' page showing 'When did you request a refund?'
    Then I check 'refund-when-more-than'
    Then I select 'Continue'
    Then I should be on the 'application-ref-numbers' page showing 'Which, if any, of the following reference numbers do you have?'
    Then I check 'reference-numbers-gwf'
    Then I fill 'gwf-reference' with ' GWF012345678'
    Then I select 'Continue'
    Then I should be on the 'acting-as-agent' page showing 'Are you making this complaint on behalf of someone else?'
    Then I check 'acting-as-agent-no'
    Then I select 'Continue'
    Then I should be on the 'applicant-name' page showing 'What is your full name?'
    Then I fill 'applicant-name' with 'Person A'
    Then I select 'Continue'
    Then I should be on the 'applicant-dob' page showing 'What is your date of birth?'
    Then I fill 'applicant-dob-day' with '1'
    Then I fill 'applicant-dob-month' with '1'
    Then I fill 'applicant-dob-year' with '1981'
    Then I select 'Continue'
    Then I should be on the 'applicant-nationality' page showing 'What is your country of nationality?'
    Then I fill 'applicant-nationality' with 'British Overseas Citizen' option
    Then I select 'Continue'
    Then I should be on the 'applicant-contact-details' page showing 'What are your contact details?'
    Then I fill 'applicant-email' with 'test@test.com'
    Then I fill 'applicant-phone' with '02079462345'
    Then I select 'Continue'
    Then I should be on the 'complaint-details' page showing 'What are the details of your complaint?'
    Then I fill 'complaint-details' text area with 'Details of a complaint'
    Then I select 'Continue'
    Then I should be on the 'confirm' page showing 'Check your answers'
    Then I should see 'The reason for the complaint' and 'Refunds' on the page
    Then I should see 'GWF number' and 'GWF012345678' on the page
    Then I should see 'Complaint details' and 'Details of a complaint' on the page
    Then I should see 'Full name' and 'Person A' on the page
    Then I should see 'Country of nationality' and 'British Overseas Citizen' on the page
    Then I should see 'Date of birth' and '1981-01-01' on the page
    Then I should see 'Email address' and '	test@test.com' on the page
    Then I should see 'Phone number (optional)' and '(optional)	02079462345' on the page

    # Change Complaint Reason
    Then I select change link 'reason-change-'
    Then I should see 'What is the complaint about?' on the page
    Then I check 'reason-refund'
    Then I select 'Continue'
    Then I should be on the 'confirm' page showing 'Check your answers'
    Then I should see 'The reason for the complaint' and 'Refunds' on the page
    Then I should see 'GWF number' and 'GWF012345678' on the page
    Then I should see 'Complaint details' and 'Details of a complaint' on the page
    Then I should see 'Full name' and 'Person A' on the page
    Then I should see 'Country of nationality' and 'British Overseas Citizen' on the page
    Then I should see 'Date of birth' and '1981-01-01' on the page
    Then I should see 'Email address' and '	test@test.com' on the page
    Then I should see 'Phone number (optional)' and '(optional)	02079462345' on the page

    # Change the Reference Number
    Then I select change link 'gwf-reference-change'
    Then I should see 'Which, if any, of the following reference numbers do you have?' on the page
    Then I check 'reference-numbers-gwf'
    Then I fill 'gwf-reference' with 'GWF012345679'
    Then I select 'Continue'
    Then I should be on the 'confirm' page showing 'Check your answers'
    Then I should see 'The reason for the complaint' and 'Refunds' on the page
    Then I should see 'GWF number' and 'GWF012345679' on the page
    Then I should see 'Complaint details' and 'Details of a complaint' on the page
    Then I should see 'Full name' and 'Person A' on the page
    Then I should see 'Country of nationality' and 'British Overseas Citizen' on the page
    Then I should see 'Date of birth' and '1981-01-01' on the page
    Then I should see 'Email address' and '	test@test.com' on the page
    Then I should see 'Phone number (optional)' and '(optional)	02079462345' on the page
