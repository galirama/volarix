Feature: Real-Time Market Data Fetching

  Scenario: Market data syncs successfully and updates the global banner
    Given the user is signed into VolariX
    When the market data synchronizes
    Then the Fear & Greed banner should display a numeric value between 0 and 100
    And the live stock quotes should reflect current market prices
