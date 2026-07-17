@marketplace @requires-mac
Feature: Marketplace
  Browse company-published agents and save to personal library.

  Background:
    Given the app is running at "http://localhost:3000"
    And I am signed in as "test-marketplace-1@agentwitch.com"
    And my Mac is paired

  Scenario: Browse marketplace listings
    When I open "/marketplace"
    Then I should see marketplace listing sections
    And I should be able to open a listing detail or preview

  Scenario: Preview a marketplace listing
    Given a marketplace listing exists
    When I open the listing preview
    Then I should see the playbook title and description

  Scenario: Save marketplace listing to library
    Given a marketplace listing I do not own
    When I choose to save or install the listing to my library
    And I confirm the install action
    Then I should see success feedback "Saved to your library"
    And the playbook should appear on "/library"

  Scenario: Cannot install without live Mac when required
    Given I am signed in as "test-marketplace-2@agentwitch.com"
    And I have no paired Mac
    When I open "/marketplace"
    And I attempt to save a listing that requires a live connection
    Then install should be blocked with guidance to connect my Mac

  Scenario: Marketplace promo from home
    Given my Mac is paired
    When I open "/"
    And I follow the marketplace promo link
    Then I should land on "/marketplace"
