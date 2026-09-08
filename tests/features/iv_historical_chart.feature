Feature: IV Rank Historical Chart

  Scenario: Opening a ticker details shows a 52-week historical line chart
    Given the user is on the Mega-Cap Screener
    When they click on "TSLA" to open its scorecard
    Then a 52-week historical IV chart should be visible
