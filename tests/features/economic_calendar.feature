Feature: Economic Calendar

  Scenario: User filters high-impact macroeconomic events
    Given the user is on the Economic Calendar tab
    When they select the "High Impact Only" filter
    Then only events marked with a high-impact badge should be displayed
