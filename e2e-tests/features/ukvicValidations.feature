@UkvicRegression

Feature: UKVIC - Uk Visas and Immigration Complaints

  Scenario: UKVIC - Page field validation check - Submit an application
    Given I visit the Ukvic page
    When I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select the reason for your complaint" error message displayed for ukvi
    When I select "Submitting an application" to start my application and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select the problem you had with the application process" error message displayed for ukvi
    When I select the problem "Technical issues with the website or payments" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select if your application was made inside or outside of the UK" error message displayed for ukvi
    When I select where applicant applied "In the UK" and click continue
    And I select 'Continue making your complaint' link for ukvic
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select whether or not you have a reference number" error message displayed for ukvi
    When I select "GWF" with a reference number and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select if you are completing this form on behalf of an applicant" error message displayed for ukvi
    When I select complaint on behalf "Yes" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select your relation to the applicant" error message displayed for ukvi
    When I select relation to applicant "I am a legal representative" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Enter your full name" error message displayed for ukvi
    When I enter my name and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Enter an email address" error message displayed for ukvi
    When I enter email address "valid@email.com" and click continue for ukvic
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Enter the applicant's full name" error message displayed for ukvi
    When I enter applicant's full name and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Enter the applicant's date of birth" error message displayed for ukvi
    When I enter applicant's date of birth "31/12/1899" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "The applicant's date of birth must be after 01 01 1900" error message displayed for ukvi
    When I enter applicant's date of birth "21/03/2029" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "The applicant's date of birth must be in the past" error message displayed for ukvi
    When I enter applicant's date of birth "02/10/1982" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select the applicant's country of nationality" error message displayed for ukvi
    When I select applicant's country of nationality and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Enter more details about why you are making a complaint" error message displayed for ukvi
    When I enter details of complaint and click continue
    And I upload a document and click continue
    Then I am on the Check your answers page

  Scenario: UKVIC - Page field validation check - Making an appointment
    Given I visit the Ukvic page
    When I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select the reason for your complaint" error message displayed for ukvi
    When I select "Making an appointment" to start my application and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select the problem you had with making an appointment" error message displayed for ukvi
    When I select the problem "Difficulty getting an appointment" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select if your application was made inside or outside of the UK" error message displayed for ukvi
    When I select where applicant applied "Outside of the UK" and click continue
    And I select 'Continue making your complaint' link for ukvic
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select whether or not you have a reference number" error message displayed for ukvi
    When I select "GWF" with a reference number and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select if you are completing this form on behalf of an applicant" error message displayed for ukvi
    When I select complaint on behalf "Yes" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select your relation to the applicant" error message displayed for ukvi
    When I select relation to applicant "I am a legal representative" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Enter your full name" error message displayed for ukvi
    When I enter my name and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Enter an email address" error message displayed for ukvi
    When I enter email address "valid@email.com" and click continue for ukvic
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Enter the applicant's full name" error message displayed for ukvi
    When I enter applicant's full name and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Enter the applicant's date of birth" error message displayed for ukvi
    When I enter applicant's date of birth "02/10/1982" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select the applicant's country of nationality" error message displayed for ukvi
    When I select applicant's country of nationality and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Enter more details about why you are making a complaint" error message displayed for ukvi
    When I enter details of complaint and click continue
    And I upload a document and click continue
    Then I am on the Check your answers page

  Scenario: UKVIC - Page field validation check - Waiting for a decision
    Given I visit the Ukvic page
    When I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select the reason for your complaint" error message displayed for ukvi
    When I select "Waiting for a decision" to start my application and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select if you are waiting for a decision or the return of some documents" error message displayed for ukvi
    When I select what I am waiting for "A decision on an application" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select if your application was made inside or outside of the UK" error message displayed for ukvi
    When I select where applicant applied "Outside of the UK" and click continue
    And I select 'Continue making your complaint' link for ukvic
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    #And I see "MESSAGE IS MISSING - A BUG" error message displayed for ukvi - Bug: UKVIC-254
    When I enter date "August" application was submitted and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select whether or not you have a reference number" error message displayed for ukvi
    When I select "GWF" with a reference number and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select if you are completing this form on behalf of an applicant" error message displayed for ukvi
    When I select complaint on behalf "Yes" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select your relation to the applicant" error message displayed for ukvi
    When I select relation to applicant "I am a legal representative" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Enter your full name" error message displayed for ukvi
    When I enter my name and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Enter an email address" error message displayed for ukvi
    When I enter email address "valid@email.com" and click continue for ukvic
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Enter the applicant's full name" error message displayed for ukvi
    When I enter applicant's full name and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Enter the applicant's date of birth" error message displayed for ukvi
    When I enter applicant's date of birth "02/10/1982" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select the applicant's country of nationality" error message displayed for ukvi
    When I select applicant's country of nationality and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Enter more details about why you are making a complaint" error message displayed for ukvi
    When I enter details of complaint and click continue
    And I upload a document and click continue
    Then I am on the Check your answers page

  Scenario: UKVIC - Page field validation check - A negative or positive decision
    Given I visit the Ukvic page
    When I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select the reason for your complaint" error message displayed for ukvi
    When I select "A negative or positive decision" to start my application and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select if the decision you received was negative or positive" error message displayed for ukvi
    When I select type of decision "Negative" and click continue
    And I select the 'Back' button
    And I select type of decision "Positive" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select if your application was made inside or outside of the UK" error message displayed for ukvi
    When I select where applicant applied "Outside of the UK" and click continue
    And I select 'Continue making your complaint' link for ukvic
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select whether or not you have a reference number" error message displayed for ukvi
    When I select "GWF" with a reference number and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select if you are completing this form on behalf of an applicant" error message displayed for ukvi
    When I select complaint on behalf "Yes" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select your relation to the applicant" error message displayed for ukvi
    When I select relation to applicant "I am a legal representative" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Enter your full name" error message displayed for ukvi
    When I enter my name and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Enter an email address" error message displayed for ukvi
    When I enter email address "valid@email.com" and click continue for ukvic
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Enter the applicant's full name" error message displayed for ukvi
    When I enter applicant's full name and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Enter the applicant's date of birth" error message displayed for ukvi
    When I enter applicant's date of birth "02/10/1982" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select the applicant's country of nationality" error message displayed for ukvi
    When I select applicant's country of nationality and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Enter more details about why you are making a complaint" error message displayed for ukvi
    When I enter details of complaint and click continue
    And I upload a document and click continue
    Then I am on the Check your answers page

  Scenario: UKVIC - Page field validation check - Biometric residence permits (BRPs)
    Given I visit the Ukvic page
    When I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select the reason for your complaint" error message displayed for ukvi
    When I select "Biometric residence permits (BRPs)" to start my application and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select the problem with your BRP card" error message displayed for ukvi
    When I select the BRP problem "It is incorrect" and click continue
    And I select 'Continue making your complaint' link for ukvic
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select whether or not you have a reference number" error message displayed for ukvi
    When I select "GWF" with a reference number and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select if you are completing this form on behalf of an applicant" error message displayed for ukvi
    When I select complaint on behalf "Yes" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select your relation to the applicant" error message displayed for ukvi
    When I select relation to applicant "I am a legal representative" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Enter your full name" error message displayed for ukvi
    When I enter my name and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Enter an email address" error message displayed for ukvi
    When I enter email address "valid@email.com" and click continue for ukvic
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Enter the applicant's full name" error message displayed for ukvi
    When I enter applicant's full name and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Enter the applicant's date of birth" error message displayed for ukvi
    When I enter applicant's date of birth "02/10/1982" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select the applicant's country of nationality" error message displayed for ukvi
    When I select applicant's country of nationality and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Enter more details about why you are making a complaint" error message displayed for ukvi
    When I enter details of complaint and click continue
    And I upload a document and click continue
    Then I am on the Check your answers page

  Scenario: UKVIC - Page field validation check - Refunds
    Given I visit the Ukvic page
    When I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select the reason for your complaint" error message displayed for ukvi
    When I select "Refunds" to start my application and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select if you have already requested a refund" error message displayed for ukvi
    When I answer have you requested a refund "No" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select the fee you want to be refunded" error message displayed for ukvi
    When I select the 'Back' button
    And I answer have you requested a refund "Not yet" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select the fee you are waiting to be refunded" error message displayed for ukvi
    When I select the 'Back' button
    And I answer have you requested a refund "Yes" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select the length of time you've been waiting for a refund" error message displayed for ukvi
    When I answer when did you request a refund "More than 6 weeks ago" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select whether or not you have a reference number" error message displayed for ukvi
    When I select "GWF" with a reference number and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select if you are completing this form on behalf of an applicant" error message displayed for ukvi
    When I select complaint on behalf "Yes" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select your relation to the applicant" error message displayed for ukvi
    When I select relation to applicant "I am a legal representative" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Enter your full name" error message displayed for ukvi
    When I enter my name and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Enter an email address" error message displayed for ukvi
    When I enter email address "valid@email.com" and click continue for ukvic
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Enter the applicant's full name" error message displayed for ukvi
    When I enter applicant's full name and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Enter the applicant's date of birth" error message displayed for ukvi
    When I enter applicant's date of birth "02/10/1982" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select the applicant's country of nationality" error message displayed for ukvi
    When I select applicant's country of nationality and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Enter more details about why you are making a complaint" error message displayed for ukvi
    When I enter details of complaint and click continue
    And I upload a document and click continue
    Then I am on the Check your answers page

  Scenario: UKVIC - Page field validation check - Staff Behaviour (e.g. rudeness, discrimination)
    Given I visit the Ukvic page
    When I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select the reason for your complaint" error message displayed for ukvi
    When I select "Staff Behaviour (e.g. rudeness, discrimination)" to start my application and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select where you experienced poor behaviour" error message displayed for ukvi
    When I answer where did you experience poor behaviour "In person" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select where the incident took place" error message displayed for ukvi
    When I select where incident took place "In the UK, at a service support centre" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Enter the city the service support centre is in" error message displayed for ukvi
    When I select the 'Back' button
    And I select where incident took place "In the UK, at a visa and citizenship application service point" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Enter the city the service point is in" error message displayed for ukvi
    When I select the 'Back' button
    And I select where incident took place "Outside the UK, at a visa application centre" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see error message displayed for ukvi
          """
          Enter the country the visa application centre is in
          Enter the city the visa application centre is in
          """
    When I enter country of nationality and city and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select whether or not you have a reference number" error message displayed for ukvi
    When I select "GWF" with a reference number and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select if you are completing this form on behalf of an applicant" error message displayed for ukvi
    When I select complaint on behalf "Yes" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select your relation to the applicant" error message displayed for ukvi
    When I select relation to applicant "I am a legal representative" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Enter your full name" error message displayed for ukvi
    When I enter my name and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Enter an email address" error message displayed for ukvi
    When I enter email address "valid@email.com" and click continue for ukvic
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Enter the applicant's full name" error message displayed for ukvi
    When I enter applicant's full name and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Enter the applicant's date of birth" error message displayed for ukvi
    When I enter applicant's date of birth "02/10/1982" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select the applicant's country of nationality" error message displayed for ukvi
    When I select applicant's country of nationality and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Enter more details about why you are making a complaint" error message displayed for ukvi
    When I enter details of complaint and click continue
    And I upload a document and click continue
    Then I am on the Check your answers page

  Scenario: UKVIC - Page field validation check - An existing complaint
    Given I visit the Ukvic page
    When I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select the reason for your complaint" error message displayed for ukvi
    When I select "An existing complaint" to start my application and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select if you have a reference number for the existing complaint" error message displayed for ukvi
    When I answer do you have ref number for the complaint "Yes" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Please enter a reference number for your complaint" error message displayed for ukvi
    When I enter complaint reference number and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    #And I see "ERROR MESSAGE IS MISSING - A BUG" error message displayed for ukvi - Bug: UKVIC-254
    When I select original complaint "Submitting an application" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select if you are completing this form on behalf of an applicant" error message displayed for ukvi
    When I select complaint on behalf "Yes" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select your relation to the applicant" error message displayed for ukvi
    When I select relation to applicant "I provide expert support or technical assistance" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Enter your full name" error message displayed for ukvi
    When I enter my name and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Enter an email address" error message displayed for ukvi
    When I enter email address "apply@email.com" and click continue for ukvic
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Enter the applicant's full name" error message displayed for ukvi
    When I enter applicant's full name and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Enter the applicant's date of birth" error message displayed for ukvi
    When I enter applicant's date of birth "02/10/1982" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select the applicant's country of nationality" error message displayed for ukvi
    When I select applicant's country of nationality and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Enter more details about why you are making a complaint" error message displayed for ukvi
    When I enter details of complaint and click continue
    And I upload a document and click continue
    Then I am on the Check your answers page

  Scenario: UKVIC - Page field validation check - Something else
    Given I visit the Ukvic page
    When I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select the reason for your complaint" error message displayed for ukvi
    When I select "Something else" to start my application and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select whether or not you have a reference number" error message displayed for ukvi
    When I select "GWF" with a reference number and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select if you are completing this form on behalf of an applicant" error message displayed for ukvi
    When I select complaint on behalf "Yes" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select your relation to the applicant" error message displayed for ukvi
    When I select relation to applicant "I am a legal representative" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Enter your full name" error message displayed for ukvi
    When I enter my name and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Enter an email address" error message displayed for ukvi
    When I enter email address "valid@email.com" and click continue for ukvic
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Enter the applicant's full name" error message displayed for ukvi
    When I enter applicant's full name and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Enter the applicant's date of birth" error message displayed for ukvi
    When I enter applicant's date of birth "02/10/1982" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Select the applicant's country of nationality" error message displayed for ukvi
    When I select applicant's country of nationality and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ukvi
    And I see "Enter more details about why you are making a complaint" error message displayed for ukvi
    When I enter details of complaint and click continue
    And I upload a document and click continue
    Then I am on the Check your answers page