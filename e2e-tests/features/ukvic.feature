@UkvicRegressionAll
Feature: UKVIC - Uk Visas and Immigration Complaints

  Scenario Outline: UKVI Complaints - Submitting an application
    Given I visit the Ukvic page
    When I fill out my answers for the Ukvic form pertaining to "<Description>"
    Then I should see check my answers page
    And I am able to submit the Ukvic form
    Examples:
      | Description                                                                                                     |
      | S1-Submitting an application - Tech Issues - In Uk - GWF number -Complaint on Behalf - Yes - Legal rep          |
      | S2-Submitting an application - Tech Issues - Outside Uk - GWF number -Complaint on Behalf - No                  |
      | S3-Submitting an application - Tech Issues - In Uk - GWF number -Complaint on Behalf - No                       |
      | S4-Submitting an application - Tech Issues - Outside Uk - GWF number -Complaint on Behalf - Yes - friend        |
      | S5-Submitting an application - Tech Issues - In Uk - HO number -Complaint on Behalf - Yes - sponsor             |
      | S6-Submitting an application - Tech Issues - Outside Uk -HO number -Complaint on Behalf - No                    |
      | S7-Submitting an application - Tech Issues - In Uk HO number -Complaint on Behalf - No                          |
      | S8-Submitting an application - Tech Issues - Outside Uk - HO number -Complaint on Behalf - Yes - expert support |
      | S9-Submitting an application - Tech Issues - In Uk - IHS number -Complaint on Behalf - Yes- expert support      |
      | S10-Submitting an application - Tech Issues - Outside Uk -IHS number -Complaint on Behalf - No                  |
      | S11-Submitting an application - Tech Issues - In Uk - IHS number - Complaint on Behalf - No                     |
      | S12-Submitting an application - Tech Issues - Outside Uk- IHS number - Complaint on Behalf - Yes - sponsor      |
      | S13-Submitting an application - Tech Issues - In Uk - Unique number -Complaint on Behalf - Yes - legal rep      |
      | S14-Submitting an application - Tech Issues - Outside Uk - Unique number -Complaint on Behalf - No              |
      | S15-Submitting an application - Tech Issues - In Uk - Unique number -Complaint on Behalf - No                   |
      | S16-Submitting an application - Tech Issues - Outside Uk - Unique number -Complaint on Behalf - Yes - friend    |
      | S17-Submitting an application - Tech Issues - In Uk - Don't have -Complaint on Behalf - Yes - sponsor           |
      | S18-Submitting an application - Tech Issues - Outside Uk - Don't have -Complaint on Behalf - No                 |
      | S19-Submitting an application - Tech Issues - In Uk - Don't have -Complaint on Behalf - No                      |
      | S20-Submitting an application - Tech Issues - Outside Uk - Don't have -Complaint on Behalf - Yes - legal rep    |
      | S21-Submitting an application - Something else - HO number - Complaint on Behalf - Yes                          |
      | S23-Submitting an application - Something else - IHS number -Complaint on Behalf - Yes                          |
      | S24-Submitting an application - Something else - GWF number -Complaint on Behalf - No                           |
      | S25-Submitting an application - Something else - Unique number -Complaint on Behalf - Yes - sponsor             |
      | S26-Submitting an application - Something else - Unique number -Complaint on Behalf - No                        |
      | S27-Submitting an application - Something else - Don't have -Complaint on Behalf - Yes - expert support         |
      | S28-Submitting an application - Something else - Don't have -Complaint on Behalf - No                           |
      | S29-Submitting an application - Something else - GWF -Complaint on Behalf - Yes - expert support                |

  Scenario Outline: UKVI Complaints - Making an Appointment
    Given I visit the Ukvic page
    When I fill out my answers for the Ukvic form pertaining to "<Description>"
    Then I should see check my answers page
    And I am able to submit the Ukvic form
    Examples:
      | Description                                                                                                                       |
      | S30-Making an appointment - Difficult Getting Appointment - In Uk -GWF number -Complaint on Behalf - Yes - legal rep              |
      | S31-Making an appointment - Difficult Getting Appointment - Outside Uk -GWF number -Complaint on Behalf - No                      |
      | S32-Making an appointment - Difficult Getting Appointment - In Uk -GWF number - Complaint on Behalf - No                          |
      | S33-Making an appointment - Difficult Getting Appointment - Outside Uk -GWF number - Complaint on Behalf - Yes - legal rep        |
      | S34-Making an appointment - Difficult changing Appointment - In Uk - Unique number - Complaint on Behalf - Yes - legal rep        |
      | S35-Making an appointment - Difficult changing Appointment - Outside -Unique number - Complaint on Behalf - No                    |
      | S36-Making an appointment - Difficult changing Appointment - In Uk -Unique number - Complaint on Behalf - No                      |
      | S38-Making an appointment - Difficult Getting Appointment - In Uk -HO number - Complaint on Behalf - Yes - sponsor                |
      | S37-Making an appointment - Difficult changing Appointment - Outside Uk -Unique number -Complaint on Behalf - Yes - friend        |
      | S39-Making an appointment - Difficult Getting Appointment - Outside Uk -HO number - Complaint on Behalf - No                      |
      | S40-Making an appointment - Difficult Getting Appointment - In Uk -HO number - Complaint on Behalf - No                           |
      | S41-Making an appointment - Difficult Getting Appointment - Outside Uk -HO number - Complaint on Behalf - Yes - expert support    |
      | S42-Making an appointment - Difficult Getting Appointment - In Uk -IHS number - Complaint on Behalf - Yes - expert support        |
      | S43-Making an appointment - Difficult Getting Appointment - Outside Uk -IHS number - Complaint on Behalf - No                     |
      | S44-Making an appointment - Difficult Getting Appointment - In Uk -IHS number - Complaint on Behalf - No                          |
      | S45-Making an appointment - Difficult Getting Appointment - Outside Uk -IHS number - Complaint on Behalf - Yes - friend           |
      | S46-Making an appointment - Difficult Getting Appointment - In Uk -Don't have number - Complaint on Behalf - Yes - sponsor        |
      | S47-Making an appointment - Difficult changing Appointment - Outside Uk -Don't have number - Complaint on Behalf - No             |
      | S48-Making an appointment - Difficult Getting Appointment - In Uk -Don't have number - Complaint on Behalf - No                   |
      | S49-Making an appointment - Difficult Getting Appointment - Outside Uk -Don't have number - Complaint on Behalf - Yes - legal rep |

  Scenario Outline: UKVI Complaints - Waiting for a Decision
    Given I visit the Ukvic page
    When I fill out my answers for the Ukvic form pertaining to "<Description>"
    Then I should see check my answers page
    And I am able to submit the Ukvic form
    Examples:
      | Description                                                                                                                |
      | S50-Waiting for a decision - Decision on application - In Uk -GWF number -Complaint on Behalf - Yes - expert support       |
      | S51-Waiting for a decision - Decision on application - Outside Uk -GWF number -Complaint on Behalf - Yes - legal rep       |
      | S52-Waiting for a decision - Decision on application - In Uk -GWF number - Complaint on Behalf - No                        |
      | S53-Waiting for a decision - Decision on application - Outside Uk -GWF number - Complaint on Behalf - No                   |
      | S54-Waiting for a decision - Decision on application - In Uk -GWF number - Complaint on Behalf - Yes - legal rep           |
      | S55-Waiting for a decision - Decision on application - Outside Uk -Unique number - Complaint on Behalf - Yes - legal rep   |
      | S56-Waiting for a decision - Decision on application - In Uk -Unique number - Complaint on Behalf - No                     |
      | S57-Waiting for a decision - Decision on application - Outside Uk -Unique number - Complaint on Behalf -No                 |
      | S58-Waiting for a decision - Decision on application - In Uk -Unique number - Complaint on Behalf - Yes - friend           |
      | S59-Waiting for a decision - Decision on application - Outside Uk -HO number - Complaint on Behalf - Yes - sponsor         |
      | S60-Waiting for a decision - Decision on application - In Uk -HO number - Complaint on Behalf - No                         |
      | S61-Waiting for a decision - Decision on application - Outside Uk -HO number - Complaint on Behalf - No                    |
      | S62-Waiting for a decision - Decision on application - In Uk -HO number - Complaint on Behalf - Yes - expert support       |
      | S63-Waiting for a decision - Decision on application - Outside Uk -IHS number - Complaint on Behalf - Yes - legal rep      |
      | S64-Waiting for a decision - Decision on application - In Uk -IHS number - Complaint on Behalf -No                         |
      | S65-Waiting for a decision - Decision on application - Outside Uk -IHS number - Complaint on Behalf -No                    |
      | S66-Waiting for a decision - Decision on application - In Uk -IHS number - Complaint on Behalf - Yes - friend              |
      | S67-Waiting for a decision - Decision on application - Outside Uk -Don't have number - Complaint on Behalf - Yes - Sponsor |
      | S68-Waiting for a decision - Decision on application - In Uk -Don't have number - Complaint on Behalf - No                 |
      | S69-Waiting for a decision - Decision on application - Outside Uk -Don't have number - Complaint on Behalf - No            |
      | S70-Waiting for a decision - Decision on application - In Uk -Don't have number - Complaint on Behalf - Yes - legal rep    |
      | S71-Waiting for a decision - Return some docs - Online form -GWF number - Complaint on Behalf - Yes - legal rep            |
      | S72-Waiting for a decision - Return some docs - Online form -GWF number - Complaint on Behalf - No                         |
      | S73-Waiting for a decision - Return some docs - Online form -Unique number - Complaint on Behalf - Yes - legal rep         |
      | S74-Waiting for a decision - Return some docs - Online form -Unique number - Complaint on Behalf - No                      |
      | S75-Waiting for a decision - Return some docs - Online form -Unique number - Complaint on Behalf - Yes - friend            |
      | S76-Waiting for a decision - Return some docs - Online form -HO number - Complaint on Behalf - Yes - sponsor               |
      | S77-Waiting for a decision - Return some docs - Online form -HO number - Complaint on Behalf - No                          |
      | S78-Waiting for a decision - Return some docs - Online form -HO number - Complaint on Behalf - Yes - expert support        |
      | S79-Waiting for a decision - Return some docs - Online form -IHS number - Complaint on Behalf - Yes - expert support       |
      | S80-Waiting for a decision - Return some docs - Online form -IHS number -Complaint on Behalf - No                          |
      | S81-Waiting for a decision - Return some docs - Online form -IHS number - Complaint on Behalf - Yes -friend                |
      | S82-Waiting for a decision - Return some docs - Online form -Don't have number - Complaint on Behalf - Yes - sponsor       |
      | S83-Waiting for a decision - Return some docs - Online form -Don't have number - Complaint on Behalf - No                  |
      | S84-Waiting for a decision - Return some docs - Online form -Don't have number - Complaint on Behalf - Yes - legal rep     |
      | S85-Waiting for a decision - Return some docs - another way -GWF number - Complaint on Behalf - Yes - legal rep            |
      | S86-Waiting for a decision - Return some docs - another way -GWF number - Complaint on Behalf - No                         |
      | S87-Waiting for a decision - Return some docs - another way -HO number - Complaint on Behalf - No                          |
      | S88-Waiting for a decision - Return some docs - another way -HO number - Complaint on Behalf - Yes - legal rep             |
      | S89-Waiting for a decision - Return some docs - No -IHS number - Complaint on Behalf - Yes - legal rep                     |
      | S90-Waiting for a decision - Return some docs - No -IHS number - Complaint on Behalf - No                                  |
      | S91-Waiting for a decision - Return some docs - No -GWF number - Complaint on Behalf -No                                   |
      | S92-Waiting for a decision - Return some docs - No -GWF number - Complaint on Behalf - Yes - friend                        |

  Scenario Outline: UKVI Complaints - Negative or Positive Decision
    Given I visit the Ukvic page
    When I fill out my answers for the Ukvic form pertaining to "<Description>"
    Then I should see check my answers page
    And I am able to submit the Ukvic form
    Examples:
      | Description                                                                                                            |
      | S93-A negative or positive decision - Negative - GWF number - Complaint on Behalf - No                                 |
      | S94-A negative or positive decision - Negative -GWF number - Complaint on Behalf - Yes - legal rep                     |
      | S95-A negative or positive decision - Negative -Unique number -Complaint on Behalf - Yes - expert support              |
      | S96-A negative or positive decision - Negative -Unique number -Complaint on Behalf - No                                |
      | S97-A negative or positive decision - Negative - HO number - Complaint on Behalf - Yes - sponsor                       |
      | S98-A negative or positive decision - Negative -HO number - Complaint on Behalf - No                                   |
      | S99-A negative or positive decision - Negative - IHS number - Complaint on Behalf - Yes - expert support               |
      | S100-A negative or positive decision - Negative -IHS number - Complaint on Behalf - No                                 |
      | S101-A negative or positive decision - Negative - Don't have number - Complaint on Behalf - Yes - expert support       |
      | S102-A negative or positive decision - Negative - Don't have number - Complaint on Behalf - No                         |
      | S103-A negative or positive decision - Positive - In Uk - GWF number -Complaint on Behalf - Yes - expert support       |
      | S104-A negative or positive decision - Positive - Outside Uk - GWF number -Complaint on Behalf - Yes - legal rep       |
      | S105-A negative or positive decision - Positive - In Uk - GWF number - Complaint on Behalf - No                        |
      | S106-A negative or positive decision - Positive - Outside Uk - GWF number - Complaint on Behalf - No                   |
      | S107-A negative or positive decision - Positive - In Uk - GWF number - Complaint on Behalf - Yes - legal rep           |
      | S108-A negative or positive decision - Positive - Outside Uk - Unique number - Complaint on Behalf - Yes - legal rep   |
      | S109-A negative or positive decision - Positive - In Uk - Unique number - Complaint on Behalf - No                     |
      | S110-A negative or positive decision - Positive - Outside Uk - Unique number - Complaint on Behalf - No                |
      | S111-A negative or positive decision - Positive - In Uk - Unique number - Complaint on Behalf - Yes - friend           |
      | S112-A negative or positive decision - Positive - Outside Uk - HO number - Complaint on Behalf - Yes - sponsor         |
      | S113-A negative or positive decision - Positive - In Uk - HO number - Complaint on Behalf - No                         |
      | S114-A negative or positive decision - Positive - Outside Uk - HO number - Complaint on Behalf - No                    |
      | S115-A negative or positive decision - Positive - In Uk - HO number - Complaint on Behalf - Yes - expert support       |
      | S116-A negative or positive decision - Positive - Outside Uk - IHS number - Complaint on Behalf - Yes - expert support |
      | S117-A negative or positive decision - Positive - In Uk - IHS number - Complaint on Behalf - No                        |
      | S118-A negative or positive decision - Positive - Outside Uk - IHS number - Complaint on Behalf - No                   |
      | S119-A negative or positive decision - Positive - In Uk - IHS number - Complaint on Behalf - Yes - friend              |
      | S120-A negative or positive decision - Positive - Outside Uk - Don't have number - Complaint on Behalf - Yes - sponsor |
      | S121-A negative or positive decision - Positive - In Uk - Don't have number - Complaint on Behalf - No                 |
      | S122-A negative or positive decision - Positive - Outside Uk - GWF number - Complaint on Behalf - No                   |
      | S123-A negative or positive decision - Positive - In Uk - Don't have number - Complaint on Behalf - Yes - legal rep    |

  Scenario Outline: UKVI Complaints - BRP Not Arrived or Incorrect
    Given I visit the Ukvic page
    When I fill out my answers for the Ukvic form pertaining to "<Description>"
    Then I should see check my answers page
    And I am able to submit the Ukvic form
    Examples:
      | Description                                                                         |
      | S124-BRP - Not arrived - GWF number - Complaint on Behalf - Yes - legal rep         |
      | S125-BRP - Not arrived - GWF number - Complaint on Behalf - No                      |
      | S126-BRP - Not arrived - Unique number - Complaint on Behalf - Yes - legal rep      |
      | S127-BRP - Not arrived - Unique number - Complaint on Behalf - No                   |
      | S128-BRP - Not arrived - HO number - Complaint on Behalf - Yes - sponsor            |
      | S129-BRP - Not arrived - HO number - Complaint on Behalf - No                       |
      | S130-BRP - Not arrived - IHS number - Complaint on Behalf - Yes - expert support    |
      | S131-BRP - Not arrived - IHS number - Complaint on Behalf - No                      |
      | S132-BRP - Not arrived - IHS number - Complaint on Behalf - Yes -friend             |
      | S133-BRP - Incorrect - GWF number -Complaint on Behalf - Yes - legal rep            |
      | S135-BRP - Incorrect - Unique number - Complaint on Behalf - Yes - legal rep        |
      | S136-BRP - Incorrect - Unique number - Complaint on Behalf - No                     |
      | S137-BRP - Incorrect - HO number - Complaint on Behalf - Yes - sponsor              |
      | S138-BRP - Incorrect - HO number - Complaint on Behalf - No                         |
      | S139-BRP - Incorrect - IHS number - Complaint on Behalf - Yes - expert support      |
      | S140-BRP - Incorrect - IHS number - Complaint on Behalf - No                        |
      | S141-BRP - Incorrect - IHS number - Complaint on Behalf - Yes - friend              |
      | S142-BRP - Something else - GWF number - Complaint on Behalf - Yes - legal rep      |
      | S143-BRP - Something else - GWF number - Complaint on Behalf - No                   |
      | S144-BRP - Something else - Unique number -Complaint on Behalf - Yes - legal rep    |
      | S145-BRP - Something else - Unique number - Complaint on Behalf - No                |
      | S146-BRP - Something else - HO number - Complaint on Behalf - Yes - sponsor         |
      | S147-BRP - Something else - HO number - Complaint on Behalf - No                    |
      | S148-BRP - Something else - IHS number - Complaint on Behalf - Yes - expert support |
      | S149-BRP - Something else - IHS number - Complaint on Behalf - No                   |
      | S150-BRP - Something else - IHS number - Complaint on Behalf - Yes - friend         |

  Scenario Outline: UKVI Complaints - Refunds
    Given I visit the Ukvic page
    When I fill out my answers for the Ukvic form pertaining to "<Description>"
    Then I should see check my answers page
    And I am able to submit the Ukvic form
    Examples:
      | Description                                                                                                                 |
      | S152-Refunds - Yes- More than 6wks - HO number -Complaint on Behalf - Yes - legal rep                                       |
      | S153-Requested Refunds - Yes- More than 6wks - HO number - Complaint on Behalf - No                                         |
      | S154-Requested Refunds - Yes- More than 6wks - IHS number - Complaint on Behalf - Yes - friend                              |
      | S155-Requested Refunds - Yes- More than 6wks - IHS number - Complaint on Behalf - No                                        |
      | S156-Requested Refunds - Yes- More than 6wks - GWF number - Complaint on Behalf - Yes - sponsor                             |
      | S157-Requested Refunds - Yes- More than 6wks - Unique number - Complaint on Behalf - No                                     |
      | S158-Requested Refunds - Yes- More than 6wks - Don't have number - Complaint on Behalf - Yes -expert support                |
      | S159-Requested Refunds - Yes- More than 6wks - Don't have number - Complaint on Behalf - No                                 |
      | S160-Refunds - No- Standard fee                                                                                             |
      | S161-Refunds - No- Priority service - In the Uk - GWF number -Complaint on Behalf - Yes - legal rep                         |
      | S163-Requested Refunds - No- Priority service - In the Uk - Unique number - Complaint on Behalf - Yes - legal rep           |
      | S162-Refunds - No- Priority service - Outside the Uk - GWF number -Complaint on Behalf - No                                 |
      | S164-Requested Refunds - No- Priority service - Outside the Uk - Unique number - Complaint on Behalf - No                   |
      | S165-Requested Refunds - No- Priority service - In the Uk - HO number - Complaint on Behalf - Yes - sponsor                 |
      | S166-Requested Refunds - No- Priority service - Outside the Uk - HO number - Complaint on Behalf - No                       |
      | S167-Requested Refunds - No- Priority service - In the Uk - Don't have number - Complaint on Behalf - Yes - expert support  |
      | S168-Requested Refunds - No- Priority service - Outside the Uk - IHS number - Complaint on Behalf - No                      |
      | S169-Requested Refunds - No- Super Priority service - In the Uk - Don't have number - Complaint on Behalf - Yes - legal rep |
      | S170-Requested Refunds - No- Super Priority service - Outside the Uk - Don't have number - Complaint on Behalf - No         |
      | S171-Requested Refunds - No- Super Priority service - In the Uk - Unique number - Complaint on Behalf - Yes - legal rep     |
      | S172-Requested Refunds - No- Super Priority service - Outside the Uk - Unique number - Complaint on Behalf - No             |
      | S173-Requested Refunds - No- Super Priority service - In the Uk - HO number - Complaint on Behalf - Yes - sponsor           |
      | S174-Requested Refunds - No- Super Priority service - Outside the Uk - HO number - Complaint on Behalf - No                 |
      | S175-Requested Refunds - No- Super Priority service - In the Uk - IHS number - Complaint on Behalf - Yes - expert support   |
      | S176-Requested Refunds - No- Super Priority service - Outside the Uk - IHS number - Complaint on Behalf - No                |
      | S177-Requested Refunds - No- Super Priority service - In the Uk - GWF number - Complaint on Behalf - Yes - legal rep        |
      | S178-Requested Refunds - No- Super Priority service - Outside the Uk - GWF number - Complaint on Behalf - No                |
      | S179-Requested Refunds - No- Added value service - GWF number - Complaint on Behalf - Yes - legal rep                       |
      | S180-Requested Refunds - No- Added value service - Don't have number - Complaint on Behalf - No                             |
      | S181-Requested Refunds - No- Added value service - Unique number - Complaint on Behalf - Yes - legal rep                    |
      | S182-Requested Refunds - No- Added value service - Unique number - Complaint on Behalf - No                                 |
      | S183-Requested Refunds - No- Added value service - HO number - Complaint on Behalf - Yes - sponsor                          |
      | S184-Requested Refunds - No- Added value service - HO number - Complaint on Behalf - No                                     |
      | S185-Requested Refunds - No- Added value service - IHS number - Complaint on Behalf - Yes - expert support                  |
      | S186-Requested Refunds - No- Added value service - IHS number - Complaint on Behalf - No                                    |
      | S187-Requested Refunds - No- Added value service - GWF number - Complaint on Behalf - Yes - friend                          |
      | S188-Requested Refunds - No- Added value service - GWF number - Complaint on Behalf - No                                    |
      | S189-Requested Refunds - No -IHS service - In the Uk - GWF number - Complaint on Behalf - Yes - legal rep                   |
      | S190-Requested Refunds - No - IHS service - Outside the Uk - Don't have number - Complaint on Behalf - No                   |
      | S193-Requested Refunds - No - IHS service - In the Uk - HO number - Complaint on Behalf - Yes - sponsor                     |
      | S191-Refunds - No - IHS service - In the Uk - Unique number -Complaint on Behalf - Yes - legal rep                          |
      | S192-Refunds - No-  IHS service - Outside the Uk - Unique number -Complaint on Behalf - No                                  |
      | S194-Requested Refunds - No - IHS service - Outside the Uk - HO number - Complaint on Behalf - No                           |
      | S195-Requested Refunds - No - IHS service - In the Uk - IHS number - Complaint on Behalf - Yes - expert support             |
      | S196-Requested Refunds - No - IHS service - Outside the Uk - IHS number - Complaint on Behalf - No                          |
      | S197-Requested Refunds - No - IHS service - In the Uk - GWF number - Complaint on Behalf - Yes - friend                     |
      | S198-Requested Refunds - No - IHS service - Outside the Uk - GWF number - Complaint on Behalf - No                          |
      | S199-Requested Refunds - No - EU Scheme service - GWF number - Complaint on Behalf - Yes - legal rep                        |
      | S200-Requested Refunds - No -  EU Scheme service - Don't have number - Complaint on Behalf - No                             |
      | S201-Requested Refunds - No - EU Scheme service - Unique number - Complaint on Behalf - Yes - legal rep                     |
      | S202-Requested Refunds - No - EU Scheme service - Unique number - Complaint on Behalf - No                                  |
      | S203-Requested Refunds - No - EU Scheme service - HO number - Complaint on Behalf - Yes - sponsor                           |
      | S204-Requested Refunds - No - EU Scheme service - HO number - Complaint on Behalf - No                                      |
      | S205-Requested Refunds - No - EU Scheme service - IHS number - Complaint on Behalf - Yes - expert support                   |
      | S206-Requested Refunds - No - EU Scheme service - IHS number - Complaint on Behalf - No                                     |
      | S207-Requested Refunds - No - EU Scheme service - GWF number - Complaint on Behalf - Yes - friend                           |
      | S208-Requested Refunds - No - EU Scheme service - GWF number - Complaint on Behalf - No                                     |
      | S209-Requested Refunds - Not yet - HIS service - In the Uk - GWF number - Complaint on Behalf - Yes -legal rep              |
      | S210-Requested Refunds - Not yet - HIS service - Outside Uk - Don't have number - Complaint on Behalf -No                   |
      | S211-Requested Refunds - Not yet - HIS service - In the Uk - Unique number - Complaint on Behalf - Yes -legal rep           |
      | S212-Requested Refunds - Not yet - HIS service - Outside Uk - Unique number - Complaint on Behalf -No                       |
      | S213-Requested Refunds - Not yet - HIS service - In the Uk - HO number - Complaint on Behalf - Yes -sponsor                 |
      | S214-Requested Refunds - Not yet - HIS service - Outside Uk - HO number - Complaint on Behalf -No                           |
      | S215-Requested Refunds - Not yet - HIS service - In the Uk - IHS number - Complaint on Behalf - Yes -expert support         |
      | S216-Requested Refunds - Not yet - HIS service - Outside Uk - IHS number - Complaint on Behalf -No                          |
      | S217-Requested Refunds - Not yet - HIS service - In the Uk - GWF number - Complaint on Behalf - Yes  friend                 |
      | S218-Requested Refunds - Not yet - HIS service - Outside Uk - GWF number - Complaint on Behalf -No                          |
      | S219-Requested Refunds - Not yet - EU scheme - GWF number - Complaint on Behalf - Yes - legal rep                           |
      | S220-Requested Refunds - Not yet - EU scheme - Don't have number - Complaint on Behalf - No                                 |
      | S221-Requested Refunds - Not yet - EU scheme - Unique number - Complaint on Behalf - Yes - legal rep                        |
      | S222-Requested Refunds - Not yet - EU scheme - Unique number - Complaint on Behalf - No                                     |
      | S223-Requested Refunds - Not yet - EU scheme - HO number - Complaint on Behalf - Yes - sponsor                              |
      | S224-Requested Refunds - Not yet - EU scheme - HO number - Complaint on Behalf - No                                         |
      | S225-Refunds - Not yet - EU scheme - IHS number -Complaint on Behalf - Yes - expert support                                 |
      | S226-Refunds - Not yet - EU scheme - IHS number -Complaint on Behalf - No                                                   |

  Scenario Outline: UKVI Complaints - Staff Behaviour
    Given I visit the Ukvic page
    When I fill out my answers for the Ukvic form pertaining to "<Description>"
    Then I should see check my answers page
    And I am able to submit the Ukvic form
    Examples:
      | Description                                                                                            |
      | S227-Staff Behaviour - In person - Outside Uk - GWF number - Complaint on Behalf - Yes - legal rep     |
      | S228-Staff Behaviour - In person - Outside Uk - Don't have number - Complaint on Behalf - No           |
      | S229-Staff Behaviour - In person - Outside Uk - Unique number - Complaint on Behalf - Yes - legal rep  |
      | S230-Staff Behaviour - In person - Outside Uk - Unique number - Complaint on Behalf - No               |
      | S231-Staff Behaviour - In person - Outside Uk - HO number - Complaint on Behalf - Yes - sponsor        |
      | S232-Staff Behaviour - In person - Outside Uk - HO number - Complaint on Behalf - No                   |
      | S233-Staff Behaviour - In person - Outside Uk - IHS number -Complaint on Behalf - Yes - expert support |
      | S234-Staff Behaviour - In person - Outside Uk - IHS number -Complaint on Behalf - No                   |
      | S235-Staff Behaviour - In person - In the Uk - GWF number - Complaint on Behalf - Yes - friend         |
      | S236-Staff Behaviour - In person - In the Uk - GWF number - Complaint on Behalf - No                   |
      | S237-Staff Behaviour - In person - In the Uk - GWF number - Complaint on Behalf - Yes - legal rep      |
      | S238-Staff Behaviour - In person - In the Uk - Don't have number - Complaint on Behalf - No            |
      | S239-Staff Behaviour - In person - In the Uk - Unique number - Complaint on Behalf - Yes - legal rep   |
      | S240-Staff Behaviour - In person - In the Uk - Unique number - Complaint on Behalf - No                |
      | S241-Staff Behaviour - In person - In the Uk - HO number - Complaint on Behalf - Yes - sponsor         |
      | S242-Staff Behaviour - In person - In the Uk - HO number - Complaint on Behalf - No                    |
      | S243-Staff Behaviour - In person - In the Uk - IHS number - Complaint on Behalf - Yes -expert support  |
      | S244-Staff Behaviour - In person - In the Uk - GWF number - Complaint on Behalf - No                   |
      | S245-Staff Behaviour -On the phone - GWF number - Complaint on Behalf - Yes - legal rep                |
      | S246-Staff Behaviour - On the phone - Don't have number - Complaint on Behalf - No                     |
      | S247-Staff Behaviour -On the phone -Unique number - Complaint on Behalf - Yes - legal rep              |
      | S248-Staff Behaviour - On the phone - Unique number - Complaint on Behalf - No                         |
      | S249-Staff Behaviour -On the phone - HO number - Complaint on Behalf - Yes - sponsor                   |
      | S250-Staff Behaviour - On the phone - HO number - Complaint on Behalf - No                             |
      | S251-Staff Behaviour - In a letter or email - Unique number - Complaint on Behalf - Yes - legal rep    |
      | S252-Staff Behaviour - In a letter or email - Unique number - Complaint on Behalf - No                 |
      | S253-Staff Behaviour - In a letter or email - HO number -Complaint on Behalf - Yes - sponsor           |
      | S254-Staff Behaviour - In a letter or email - HO number - Complaint on Behalf - No                     |
      | S255-Staff Behaviour - In a letter or email - IHS number - Complaint on Behalf - Yes - expert support  |
      | S256-Staff Behaviour - In a letter or email - IHS number - Complaint on Behalf - No                    |

  Scenario Outline: UKVI Complaints - Existing complaint
    Given I visit the Ukvic page
    When I fill out my answers for the Ukvic form pertaining to "<Description>"
    Then I should see check my answers page
    And I am able to submit the Ukvic form
    Examples:
      | Description                                                                                                      |
      | S257-Existing complaint -Have ref numb -Complaint on Behalf -No                                                  |
      | S258-Existing complaint -No ref Numb - Submit application - complaint on Behalf - Yes - legal rep                |
      | S259-Existing complaint -No ref Numb - Submit application- complaint on Behalf - No                              |
      | S260-Existing complaint -No ref Numb - making apptmt - Complaint on Behalf - Yes - friend                        |
      | S261-Existing complaint -No ref Numb - making appmt - complaint on Behalf - No                                   |
      | S262-Existing complaint -No ref Numb - waiting for decision- Complaint on Behalf - Yes -sponsor                  |
      | S263-Existing complaint -No ref Numb - waiting for decision- complaint on Behalf - No                            |
      | S264-Existing complaint -No ref Numb - negative or positive decision- complaint on Behalf - Yes - expert support |
      | S265-Existing complaint -No ref Numb - negative or positive decision- complaint on Behalf - No                   |
      | S266-Existing complaint -No ref Numb - Immigration status change- complaint on Behalf - Yes - legal rep          |
      | S267-Existing complaint -No ref Numb - Immigration status change- complaint on Behalf - No                       |
      | S268-Existing complaint -No ref Numb - BRP - Complaint on Behalf - Yes - friend                                  |
      | S269-Existing complaint -No ref Numb - BRP - Complaint on Behalf -No                                             |
      | S270-Existing complaint -No ref Numb -refunds - Complaint on Behalf - Yes - sponsor                              |
      | S271-Existing complaint -No ref Numb -refunds - Complaint on Behalf - No                                         |
      | S272-Existing complaint -No ref Numb - Staff behaviour- Complaint on Behalf - Yes - expert support               |
      | S273-Existing complaint -No ref Numb - Staff behaviour- Complaint on Behalf - No                                 |
      | S274-Existing complaint -No ref Numb - something else - Complaint on Behalf - Yes - legal rep                    |
      | S275-Existing complaint -No ref Numb - something else - Complaint on Behalf - No                                 |

  Scenario Outline: UKVI Complaints - Something else
    Given I visit the Ukvic page
    When I fill out my answers for the Ukvic form pertaining to "<Description>"
    Then I should see check my answers page
    And I am able to submit the Ukvic form
    Examples:
      | Description                                                            |
      | S276-Something else -GWF number -Complaint on Behalf - Yes - legal rep |
      | S277-Something else -HO number -Complaint on Behalf - No               |
      | S278-Something else -IHS number -Complaint on Behalf - Yes - legal rep |
      | S279-Something else -IHS number -Complaint on Behalf - No              |
      | S280-Something else -GWF number -Complaint on Behalf - Yes - sponsor   |
      # | S281-Something else -Unique number -Complaint on Behalf - No                       |
      # | S282-Something else -Don't have number -Complaint on Behalf - Yes - expert support |
      # | S283-Something else -Don't have number -Complaint on Behalf - No                   |

  @UKVIC-E2E
  Scenario: UKVI Complaints Refunds - Wait for refund if Less than 6wks
    Given I visit the Ukvic page
    When I fill out my answers for the Ukvic form pertaining to "Refunds - Yes- Less than 6wks"
    Then I see wait to receive fund "Please wait to receive your refund" message
