Feature: Application Stability

  Scenario: Page loads successfully before login
    Given I navigate to the VolariX login page
    Then the page should be loaded with no console errors

  Scenario: Page loads successfully after login
    Given I navigate to the VolariX login page
    When I sign in with an authorized email and password
    Then I should be redirected to the main app dashboard
    And the page should be loaded with no console errors
    And I should see the dashboard title
