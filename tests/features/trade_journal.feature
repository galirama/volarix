Feature: Trade Journal Statistics

  Scenario: Win rate updates when trades are recorded
    Given the user has 1 winning trade and 1 losing trade
    When they navigate to the Trade Journal
    Then the Win Rate statistic should display "50%"
