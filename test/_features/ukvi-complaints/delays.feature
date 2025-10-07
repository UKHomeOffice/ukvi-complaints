@feature @delays
Feature: Waiting for a decision or documents

  Scenario: I am on the waiting for decision (delays) journey, I am acting on behalf of myself and want to complain
            about a delay on an application in the uk. On the confirm page I want to change the complaint type and
            Month application was submitted.
    Given I start the 'reason' application journey
    Then I should see 'What is the complaint about?' on the page
    Then I check 'reason-delays'
    Then I select 'Continue'
    Then I should be on the 'delays' page showing 'What are you waiting for?'
    Then I check 'delay-type-application-delay'
    Then I select 'Continue'
    Then I should be on the 'request-upgrade' page showing 'Where did you make your application?'
    Then I check 'where-applied-from-inside-uk'
    Then I select 'Continue'
    Then I should be on the 'upgrade-inside-uk' page showing 'If you are waiting for a decision on an application'
    Then I select 'Continue making your complaint' link
    Then I should be on the 'when-applied' page showing 'When did you submit your application?'
    Then I fill 'when-applied' with 'June'
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
    Then I should be on the 'upload-complaint-document' page
    Then I select 'Continue'
    Then I should be on the 'confirm' page showing 'Check your answers'
    Then I should see 'The reason for the complaint' and 'Waiting for a decision or documents' on the page
    Then I should see 'When did you submit your application' and 'June' on the page
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
    Then I check 'reason-delays'
    Then I select 'Continue'
    Then I should be on the 'confirm' page showing 'Check your answers'
    Then I should see 'The reason for the complaint' and 'Waiting for a decision or documents' on the page
    Then I should see 'When did you submit your application' and 'June' on the page
    Then I should see 'GWF number' and 'GWF012345678' on the page
    Then I should see 'Complaint details' and 'Details of a complaint' on the page
    Then I should see 'Full name' and 'Person A' on the page
    Then I should see 'Country of nationality' and 'British Overseas Citizen' on the page
    Then I should see 'Date of birth' and '1981-01-01' on the page
    Then I should see 'Email address' and '	test@test.com' on the page
    Then I should see 'Phone number (optional)' and '(optional)	02079462345' on the page

    # Change Application Month
    Then I select change link 'when-applied-change'
    Then I should see 'When did you submit your application?' on the page
    Then I fill 'when-applied' with 'June'
    Then I select 'Continue'
    Then I should be on the 'confirm' page showing 'Check your answers'
    Then I should see 'The reason for the complaint' and 'Waiting for a decision or documents' on the page
    Then I should see 'When did you submit your application' and 'June' on the page
    Then I should see 'GWF number' and 'GWF012345678' on the page
    Then I should see 'Complaint details' and 'Details of a complaint' on the page
    Then I should see 'Full name' and 'Person A' on the page
    Then I should see 'Country of nationality' and 'British Overseas Citizen' on the page
    Then I should see 'Date of birth' and '1981-01-01' on the page
    Then I should see 'Email address' and '	test@test.com' on the page
    Then I should see 'Phone number (optional)' and '(optional)	02079462345' on the page

  Scenario: I am on the waiting for decision (delays) journey, I am acting on behalf of myself and want to complain
            about a delay on the return of some documents in the uk. I have asked for the documents back via an online form.
            On the confirm page I want to change the complaint reason and reference number.
    Given I start the 'reason' application journey
    Then I should see 'What is the complaint about?' on the page
    Then I check 'reason-delays'
    Then I select 'Continue'
    Then I should be on the 'delays' page showing 'What are you waiting for?'
    Then I check 'delay-type-return-of-documents'
    Then I select 'Continue'
    Then I should be on the 'return-of-documents' page showing 'Have you asked for the documents back?'
    Then I check 'return-of-documents-yes-docs-service'
    Then I select 'Continue'
    Then I should be on the 'report-lost-docs-service' page showing 'If you are waiting for documents to be returned'
    Then I select 'Continue making your complaint' link
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
    Then I should be on the 'upload-complaint-document' page
    Then I select 'Continue'
    Then I should be on the 'confirm' page showing 'Check your answers'
    Then I should see 'The reason for the complaint' and 'Waiting for a decision or documents' on the page
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
    Then I check 'reason-delays'
    Then I select 'Continue'
    Then I should be on the 'confirm' page showing 'Check your answers'
    Then I should see 'The reason for the complaint' and 'Waiting for a decision or documents' on the page
    Then I should see 'GWF number' and 'GWF012345678' on the page
    Then I should see 'Complaint details' and 'Details of a complaint' on the page
    Then I should see 'Full name' and 'Person A' on the page
    Then I should see 'Country of nationality' and 'British Overseas Citizen' on the page
    Then I should see 'Date of birth' and '1981-01-01' on the page
    Then I should see 'Email address' and '	test@test.com' on the page
    Then I should see 'Phone number (optional)' and '(optional)	02079462345' on the page
    Then I select change link 'gwf-reference-change'
    Then I should see 'Which, if any, of the following reference numbers do you have?' on the page

    # Change the Reference Number
    Then I check 'reference-numbers-gwf'
    Then I fill 'gwf-reference' with ' GWF012345678'
    Then I select 'Continue'
    Then I should be on the 'confirm' page showing 'Check your answers'
    Then I should see 'The reason for the complaint' and 'Waiting for a decision or documents' on the page
    Then I should see 'GWF number' and 'GWF012345678' on the page
    Then I should see 'Complaint details' and 'Details of a complaint' on the page
    Then I should see 'Full name' and 'Person A' on the page
    Then I should see 'Country of nationality' and 'British Overseas Citizen' on the page
    Then I should see 'Date of birth' and '1981-01-01' on the page
    Then I should see 'Email address' and '	test@test.com' on the page
    Then I should see 'Phone number (optional)' and '(optional)	02079462345' on the page

  Scenario: I am on the waiting for decision (delays) journey, I am a legal representative and want to complain
  about a delay on the return of some documents in the uk. I have asked for the documents back via phone.
  On the confirm page I want to change the complaint reason and complaint details.
    Given I start the 'reason' application journey
    Then I should see 'What is the complaint about?' on the page
    Then I check 'reason-delays'
    Then I select 'Continue'
    Then I should be on the 'delays' page showing 'What are you waiting for?'
    Then I check 'delay-type-return-of-documents'
    Then I select 'Continue'
    Then I should be on the 'return-of-documents' page showing 'Have you asked for the documents back?'
    Then I check 'return-of-documents-yes-other'
    Then I select 'Continue'
    Then I should be on the 'request-docs-service' page showing 'If you have not used the online service to request your documents'
    Then I select 'Continue making your complaint' link
    Then I should be on the 'application-ref-numbers' page showing 'Which, if any, of the following reference numbers do you have?'
    Then I check 'reference-numbers-gwf'
    Then I fill 'gwf-reference' with ' GWF012345678'
    Then I select 'Continue'
    Then I should be on the 'acting-as-agent' page showing 'Are you making this complaint on behalf of someone else?'
    Then I check 'acting-as-agent-yes'
    Then I select 'Continue'
    Then I should be on the 'who-representing' page showing 'What is your relation to the applicant?'
    Then I check 'who-representing-legal-rep'
    Then I select 'Continue'
    Then I should be on the 'agent-name' page showing 'What is your name?'
    Then I fill 'agent-name' with 'Legal Representative A'
    Then I select 'Continue'
    Then I should be on the 'agent-contact-details' page showing 'Where should we send our response?'
    Then I fill 'agent-email' with 'test@test.com'
    Then I fill 'agent-phone' with '02079462345'
    Then I select 'Continue'
    Then I should be on the 'agent-representative-name' page showing 'What is the applicant’s full name?'
    Then I fill 'agent-representative-name' with 'Applicant B'
    Then I select 'Continue'
    Then I should be on the 'agent-representative-dob' page showing 'What is the applicant’s date of birth?'
    Then I fill 'agent-representative-dob-day' with '1'
    Then I fill 'agent-representative-dob-month' with '1'
    Then I fill 'agent-representative-dob-year' with '1981'
    Then I select 'Continue'
    Then I should be on the 'agent-representative-nationality' page showing 'What is the applicant’s country of nationality?'
    Then I fill 'agent-representative-nationality' with 'British Overseas Citizen' option
    Then I select 'Continue'
    Then I should be on the 'complaint-details' page showing 'What are the details of your complaint?'
    Then I fill 'complaint-details' text area with 'Details of a complaint'
    Then I select 'Continue'
    Then I should be on the 'upload-complaint-document' page
    Then I select 'Continue'
    Then I should be on the 'confirm' page showing 'Check your answers'
    Then I should see 'The reason for the complaint' and 'Waiting for a decision or documents' on the page
    Then I should see 'GWF number' and 'GWF012345678' on the page
    Then I should see 'Complaint details' and 'Details of a complaint' on the page
    Then I should see 'Full name' and 'Legal Representative A' on the page
    Then I should see 'Relation to applicant' and 'I am a legal representative' on the page
    Then I should see 'Applicant’s full name' and 'Applicant B' on the page
    Then I should see 'Applicant’s country of nationality' and 'British Overseas Citizen' on the page
    Then I should see 'Applicant’s date of birth' and '1981-01-01' on the page
    Then I should see 'Email address' and 'test@test.com' on the page
    Then I should see 'Phone number (optional)' and '02079462345' on the page

    # Change Complaint Reason
    Then I select change link 'reason-change-'
    Then I should see 'What is the complaint about?' on the page
    Then I check 'reason-delays'
    Then I select 'Continue'
    Then I should be on the 'confirm' page showing 'Check your answers'
    Then I should see 'The reason for the complaint' and 'Waiting for a decision or documents' on the page
    Then I should see 'GWF number' and 'GWF012345678' on the page
    Then I should see 'Complaint details' and 'Details of a complaint' on the page
    Then I should see 'Full name' and 'Legal Representative A' on the page
    Then I should see 'Relation to applicant' and 'I am a legal representative' on the page
    Then I should see 'Applicant’s full name' and 'Applicant B' on the page
    Then I should see 'Applicant’s country of nationality' and 'British Overseas Citizen' on the page
    Then I should see 'Applicant’s date of birth' and '1981-01-01' on the page
    Then I should see 'Email address' and 'test@test.com' on the page
    Then I should see 'Phone number (optional)' and '02079462345' on the page

    # Change Complaint Details
    Then I select change link 'complaint-details-change'
    Then I should see 'What are the details of your complaint?' on the page
    Then I fill 'complaint-details' text area with 'More details of a complaint'
    Then I select 'Continue'
    Then I should be on the 'confirm' page showing 'Check your answers'
    Then I should see 'The reason for the complaint' and 'Waiting for a decision or documents' on the page
    Then I should see 'GWF number' and 'GWF012345678' on the page
    Then I should see 'Complaint details' and 'More details of a complaint' on the page
    Then I should see 'Full name' and 'Legal Representative A' on the page
    Then I should see 'Relation to applicant' and 'I am a legal representative' on the page
    Then I should see 'Applicant’s full name' and 'Applicant B' on the page
    Then I should see 'Applicant’s country of nationality' and 'British Overseas Citizen' on the page
    Then I should see 'Applicant’s date of birth' and '1981-01-01' on the page
    Then I should see 'Email address' and 'test@test.com' on the page
    Then I should see 'Phone number (optional)' and '02079462345' on the page

  Scenario: I am on the waiting for decision (delays) journey, I am a legal representative and want to complain
  about a delay on the return of some documents in the uk. I have asked for the documents back via phone.
  On the confirm page I want to change the legal representative to I am a sponsor, and my representatives contact details.
    Given I start the 'reason' application journey
    Then I should see 'What is the complaint about?' on the page
    Then I check 'reason-delays'
    Then I select 'Continue'
    Then I should be on the 'delays' page showing 'What are you waiting for?'
    Then I check 'delay-type-return-of-documents'
    Then I select 'Continue'
    Then I should be on the 'return-of-documents' page showing 'Have you asked for the documents back?'
    Then I check 'return-of-documents-yes-other'
    Then I select 'Continue'
    Then I should be on the 'request-docs-service' page showing 'If you have not used the online service to request your documents'
    Then I select 'Continue making your complaint' link
    Then I should be on the 'application-ref-numbers' page showing 'Which, if any, of the following reference numbers do you have?'
    Then I check 'reference-numbers-gwf'
    Then I fill 'gwf-reference' with ' GWF012345678'
    Then I select 'Continue'
    Then I should be on the 'acting-as-agent' page showing 'Are you making this complaint on behalf of someone else?'
    Then I check 'acting-as-agent-yes'
    Then I select 'Continue'
    Then I should be on the 'who-representing' page showing 'What is your relation to the applicant?'
    Then I check 'who-representing-legal-rep'
    Then I select 'Continue'
    Then I should be on the 'agent-name' page showing 'What is your name?'
    Then I fill 'agent-name' with 'Legal Representative A'
    Then I select 'Continue'
    Then I should be on the 'agent-contact-details' page showing 'Where should we send our response?'
    Then I fill 'agent-email' with 'test@test.com'
    Then I fill 'agent-phone' with '02079462345'
    Then I select 'Continue'
    Then I should be on the 'agent-representative-name' page showing 'What is the applicant’s full name?'
    Then I fill 'agent-representative-name' with 'Applicant B'
    Then I select 'Continue'
    Then I should be on the 'agent-representative-dob' page showing 'What is the applicant’s date of birth?'
    Then I fill 'agent-representative-dob-day' with '1'
    Then I fill 'agent-representative-dob-month' with '1'
    Then I fill 'agent-representative-dob-year' with '1981'
    Then I select 'Continue'
    Then I should be on the 'agent-representative-nationality' page showing 'What is the applicant’s country of nationality?'
    Then I fill 'agent-representative-nationality' with 'British Overseas Citizen' option
    Then I select 'Continue'
    Then I should be on the 'complaint-details' page showing 'What are the details of your complaint?'
    Then I fill 'complaint-details' text area with 'Details of a complaint'
    Then I select 'Continue'
    Then I should be on the 'upload-complaint-document' page
    Then I select 'Continue'
    Then I should be on the 'confirm' page showing 'Check your answers'
    Then I should see 'The reason for the complaint' and 'Waiting for a decision or documents' on the page
    Then I should see 'GWF number' and 'GWF012345678' on the page
    Then I should see 'Complaint details' and 'Details of a complaint' on the page
    Then I should see 'Full name' and 'Legal Representative A' on the page
    Then I should see 'Relation to applicant' and 'I am a legal representative' on the page
    Then I should see 'Applicant’s full name' and 'Applicant B' on the page
    Then I should see 'Applicant’s country of nationality' and 'British Overseas Citizen' on the page
    Then I should see 'Applicant’s date of birth' and '1981-01-01' on the page
    Then I should see 'Email address' and 'test@test.com' on the page
    Then I should see 'Phone number (optional)' and '02079462345' on the page

    # Change the Legal Representative to Sponsor
    Then I select change link 'who-representing-change-'
    Then I should see 'What is your relation to the applicant?' on the page
    Then I check 'who-representing-sponsor'
    Then I select 'Continue'
    Then I should be on the 'confirm' page showing 'Check your answers'
    Then I should see 'The reason for the complaint' and 'Waiting for a decision or documents' on the page
    Then I should see 'GWF number' and 'GWF012345678' on the page
    Then I should see 'Complaint details' and 'Details of a complaint' on the page
    Then I should see 'Full name' and 'Legal Representative A' on the page
    Then I should see 'Relation to applicant' and 'I am a sponsor' on the page
    Then I should see 'Applicant’s full name' and 'Applicant B' on the page
    Then I should see 'Applicant’s country of nationality' and 'British Overseas Citizen' on the page
    Then I should see 'Applicant’s date of birth' and '1981-01-01' on the page
    Then I should see 'Email address' and 'test@test.com' on the page
    Then I should see 'Phone number (optional)' and '02079462345' on the page

    # Change the Sponsors Email and Telephone Details
    Then I select change link 'agent-email-change'
    Then I should see 'Where should we send our response?' on the page
    Then I fill 'agent-email' with 'test@test.com'
    Then I fill 'agent-phone' with '02079462346'
    Then I select 'Continue'
    Then I should be on the 'confirm' page showing 'Check your answers'
    Then I should see 'The reason for the complaint' and 'Waiting for a decision or documents' on the page
    Then I should see 'GWF number' and 'GWF012345678' on the page
    Then I should see 'Complaint details' and 'Details of a complaint' on the page
    Then I should see 'Full name' and 'Legal Representative A' on the page
    Then I should see 'Relation to applicant' and 'I am a sponsor' on the page
    Then I should see 'Applicant’s full name' and 'Applicant B' on the page
    Then I should see 'Applicant’s country of nationality' and 'British Overseas Citizen' on the page
    Then I should see 'Applicant’s date of birth' and '1981-01-01' on the page
    Then I should see 'Email address' and 'test@test.com' on the page
    Then I should see 'Phone number (optional)' and '02079462346' on the page

    # Change the Sponsors Name
    Then I select change link 'agent-name-change'
    Then I should see 'What is your name?' on the page
    Then I fill 'agent-name' with 'Sponsor C'
    Then I select 'Continue'
    Then I should be on the 'confirm' page showing 'Check your answers'
    Then I should see 'The reason for the complaint' and 'Waiting for a decision or documents' on the page
    Then I should see 'GWF number' and 'GWF012345678' on the page
    Then I should see 'Complaint details' and 'Details of a complaint' on the page
    Then I should see 'Full name' and 'Sponsor C' on the page
    Then I should see 'Relation to applicant' and 'I am a sponsor' on the page
    Then I should see 'Applicant’s full name' and 'Applicant B' on the page
    Then I should see 'Applicant’s country of nationality' and 'British Overseas Citizen' on the page
    Then I should see 'Applicant’s date of birth' and '1981-01-01' on the page
    Then I should see 'Email address' and 'test@test.com' on the page
    Then I should see 'Phone number (optional)' and '02079462346' on the page

  Scenario: I am on the waiting for decision (delays) journey, I am a relative or friend of applicant and want to complain
  about a delay on the return of some documents in the uk. I have not asked for the documents to be returned.
  On the confirm page I want to change the applicants name, nationality and date of birth.
    Given I start the 'reason' application journey
    Then I should see 'What is the complaint about?' on the page
    Then I check 'reason-delays'
    Then I select 'Continue'
    Then I should be on the 'delays' page showing 'What are you waiting for?'
    Then I check 'delay-type-return-of-documents'
    Then I select 'Continue'
    Then I should be on the 'return-of-documents' page showing 'Have you asked for the documents back?'
    Then I check 'return-of-documents-no'
    Then I select 'Continue'
    Then I should be on the 'request-docs-service' page showing 'If you have not used the online service to request your documents'
    Then I select 'Continue making your complaint' link
    Then I should be on the 'application-ref-numbers' page showing 'Which, if any, of the following reference numbers do you have?'
    Then I check 'reference-numbers-gwf'
    Then I fill 'gwf-reference' with ' GWF012345678'
    Then I select 'Continue'
    Then I should be on the 'acting-as-agent' page showing 'Are you making this complaint on behalf of someone else?'
    Then I check 'acting-as-agent-yes'
    Then I select 'Continue'
    Then I should be on the 'who-representing' page showing 'What is your relation to the applicant?'
    Then I check 'who-representing-relative'
    Then I select 'Continue'
    Then I should be on the 'agent-name' page showing 'What is your name?'
    Then I fill 'agent-name' with 'Relative or Friend D'
    Then I select 'Continue'
    Then I should be on the 'agent-contact-details' page showing 'Where should we send our response?'
    Then I fill 'agent-email' with 'test@test.com'
    Then I fill 'agent-phone' with '02079462345'
    Then I select 'Continue'
    Then I should be on the 'agent-representative-name' page showing 'What is the applicant’s full name?'
    Then I fill 'agent-representative-name' with 'Applicant B'
    Then I select 'Continue'
    Then I should be on the 'agent-representative-dob' page showing 'What is the applicant’s date of birth?'
    Then I fill 'agent-representative-dob-day' with '1'
    Then I fill 'agent-representative-dob-month' with '1'
    Then I fill 'agent-representative-dob-year' with '1981'
    Then I select 'Continue'
    Then I should be on the 'agent-representative-nationality' page showing 'What is the applicant’s country of nationality?'
    Then I fill 'agent-representative-nationality' with 'British Overseas Citizen' option
    Then I select 'Continue'
    Then I should be on the 'complaint-details' page showing 'What are the details of your complaint?'
    Then I fill 'complaint-details' text area with 'Details of a complaint'
    Then I select 'Continue'
    Then I should be on the 'upload-complaint-document' page
    Then I select 'Continue'
    Then I should be on the 'confirm' page showing 'Check your answers'
    Then I should see 'The reason for the complaint' and 'Waiting for a decision or documents' on the page
    Then I should see 'GWF number' and 'GWF012345678' on the page
    Then I should see 'Complaint details' and 'Details of a complaint' on the page
    Then I should see 'Full name' and 'Relative or Friend D' on the page
    Then I should see 'Relation to applicant' and 'I am a relative or friend' on the page
    Then I should see 'Applicant’s full name' and 'Applicant B' on the page
    Then I should see 'Applicant’s country of nationality' and 'British Overseas Citizen' on the page
    Then I should see 'Applicant’s date of birth' and '1981-01-01' on the page
    Then I should see 'Email address' and 'test@test.com' on the page
    Then I should see 'Phone number (optional)' and '02079462345' on the page

    # Change the Applicants Name
    Then I select change link 'agent-representative-name-change'
    Then I should see 'What is the applicant’s full name?' on the page
    Then I fill 'agent-representative-name' with 'Applicant B Changed'
    Then I select 'Continue'
    Then I should be on the 'confirm' page showing 'Check your answers'
    Then I should see 'The reason for the complaint' and 'Waiting for a decision or documents' on the page
    Then I should see 'GWF number' and 'GWF012345678' on the page
    Then I should see 'Complaint details' and 'Details of a complaint' on the page
    Then I should see 'Full name' and 'Relative or Friend D' on the page
    Then I should see 'Relation to applicant' and 'I am a relative or friend' on the page
    Then I should see 'Applicant’s full name' and 'Applicant B Changed' on the page
    Then I should see 'Applicant’s country of nationality' and 'British Overseas Citizen' on the page
    Then I should see 'Applicant’s date of birth' and '1981-01-01' on the page
    Then I should see 'Email address' and 'test@test.com' on the page
    Then I should see 'Phone number (optional)' and '02079462345' on the page
    Then I select change link 'agent-representative-nationality-change'

    # Change the Applicants Nationality
    Then I should see 'What is the applicant’s country of nationality?' on the page
    Then I fill 'agent-representative-nationality' with 'British Overseas Territory Citizen' option
    Then I select 'Continue'
    Then I should be on the 'confirm' page showing 'Check your answers'
    Then I should see 'The reason for the complaint' and 'Waiting for a decision or documents' on the page
    Then I should see 'GWF number' and 'GWF012345678' on the page
    Then I should see 'Complaint details' and 'Details of a complaint' on the page
    Then I should see 'Full name' and 'Relative or Friend D' on the page
    Then I should see 'Relation to applicant' and 'I am a relative or friend' on the page
    Then I should see 'Applicant’s full name' and 'Applicant B Changed' on the page
    Then I should see 'Applicant’s country of nationality' and 'British Overseas Territory Citizen' on the page
    Then I should see 'Applicant’s date of birth' and '1981-01-01' on the page
    Then I should see 'Email address' and 'test@test.com' on the page
    Then I should see 'Phone number (optional)' and '02079462345' on the page

    # Change the Applicants Date of Birth
    Then I select change link 'agent-representative-dob-change'
    Then I should see 'What is the applicant’s date of birth?' on the page
    Then I fill 'agent-representative-dob-day' with '2'
    Then I fill 'agent-representative-dob-month' with '2'
    Then I fill 'agent-representative-dob-year' with '1982'
    Then I select 'Continue'
    Then I should be on the 'confirm' page showing 'Check your answers'
    Then I should see 'The reason for the complaint' and 'Waiting for a decision or documents' on the page
    Then I should see 'GWF number' and 'GWF012345678' on the page
    Then I should see 'Complaint details' and 'Details of a complaint' on the page
    Then I should see 'Full name' and 'Relative or Friend D' on the page
    Then I should see 'Relation to applicant' and 'I am a relative or friend' on the page
    Then I should see 'Applicant’s full name' and 'Applicant B' on the page
    Then I should see 'Applicant’s country of nationality' and 'British Overseas Territory Citizen' on the page
    Then I should see 'Applicant’s date of birth' and '1982-02-02' on the page
    Then I should see 'Email address' and 'test@test.com' on the page
    Then I should see 'Phone number (optional)' and '02079462345' on the page
