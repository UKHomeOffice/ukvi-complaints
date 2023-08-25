@feature @validations
Feature: Validations
  A user should be see the appropriate validation error messages for each page

  Scenario: Reference number validations
    Given I start the 'reason' application journey
    Then I should see 'What is the complaint about?' on the page
    Then I check 'reason-staff-behaviour'
    Then I select 'Continue'
    Then I should be on the 'staff-behaviour' page showing 'Where did you experience poor behaviour?'
    Then I check 'staff-behaviour-face-to-face'
    Then I select 'Continue'
    Then I should be on the 'face-to-face' page showing 'Where did the incident take place?'
    Then I check 'which-centre-vac'
    Then I select 'Continue'
    Then I should be on the 'vac' page showing 'Where is the visa application centre?'
    Then I fill 'vac-country' with 'United Kingdom' option
    Then I fill 'vac-city' with 'London'
    Then I select 'Continue'
    Then I should be on the 'application-ref-numbers' page showing 'Which, if any, of the following reference numbers do you have?'
    Then I check 'reference-numbers-gwf'
    Then I select 'Continue'
    Then I should see the 'Enter the GWF number' error
    Then I fill 'gwf-reference' with ' 8GWF01234567'
    Then I select 'Continue'
    Then I should see the 'Invalid GWF number. Please ensure the number starts with GWF followed by 9 digits' error
    Then I check 'reference-numbers-ho'
    Then I select 'Continue'
    Then I should see the 'Enter the Home Office reference number' error
    Then I fill 'ho-reference' with '12345678S'
    Then I select 'Continue'
    Then I should see the 'Number must only contain digits' error
    Then I check 'reference-numbers-ihs'
    Then I select 'Continue'
    Then I should see the 'Enter the IHS number' error
    Then I fill 'ihs-reference' with 'IHS1234567'
    Then I select 'Continue'
    Then I should see the 'Invalid IHS number. Please ensure the number starts with IHS followed by 9 digits' error
    Then I check 'reference-numbers-uan'
    Then I select 'Continue'
    Then I should see the 'Enter the Unique Application Number' error
    Then I fill 'uan-reference' with '2092-122-1212'
    Then I select 'Continue'
    Then I should see the 'Invalid UAN number. Please ensure your number follows the format: xxxx-xxxx-xxxx-xxxx' error
    Then I check 'reference-numbers-gwf'
    Then I fill 'gwf-reference' with ' GWF012345678'
    Then I select 'Continue'
    Then I should be on the 'acting-as-agent' page

