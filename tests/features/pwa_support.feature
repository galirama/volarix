Feature: PWA Verification

  Scenario: Service worker registers successfully
    Given the user opens the VolariX app
    Then the active service worker should be successfully registered
