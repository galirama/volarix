Feature: Watchlist Persistence

  Scenario: Watchlist items persist after reloading the browser
    Given the user is logged into the VolariX dashboard
    When they add "AAPL" to their watchlist
    And they reload the browser page
    Then "AAPL" should still be visible in their watchlist
