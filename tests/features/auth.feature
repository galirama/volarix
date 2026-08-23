Feature: Authentication & Shell

  Scenario: Successful Login with basic credentials
    Given I navigate to the VolariX login page
    When I click the "Try Live Demo (Instant Access)" button
    Then I should be redirected to the main app dashboard
    And the sidebar should contain a "Fundamental Screener" navigation item
