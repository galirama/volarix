Feature: Authentication & Shell

  Scenario: Private login has no demo or registration path
    Given I navigate to the VolariX login page
    Then I should see private access sign-in
    And the demo login path should be absent

  Scenario: Successful sign-in with an authorized account
    Given I navigate to the VolariX login page
    When I sign in with an authorized email and password
    Then I should be redirected to the main app dashboard
    And the sidebar should contain a "Fundamental Screener" navigation item
