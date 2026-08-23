Feature: Fundamental Screener

  Background:
    Given I navigate to the VolariX app dashboard
    
  Scenario: Load Fundamental Screener and apply preset filters
    When I click on the "Fundamental Screener" tab
    Then the "📋 Ranked Fundamentals Table" should be visible
    When I click the "🚀 Growth (>15%)" preset button
    Then the screener table should update its rows
    And the results count should reflect the filter applied
