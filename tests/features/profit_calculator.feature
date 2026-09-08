Feature: Options Profit Calculator

  Scenario: Interactive slider adjusts expected P&L
    Given the user is on the Paper Trading dashboard
    When they open the Options Calculator for "NVDA"
    And they slide the underlying price to $950
    Then the calculated P&L should update to reflect the profit for a Long Call
