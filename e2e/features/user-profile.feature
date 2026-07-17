@profile
Feature: User profile
  View and edit the signed-in user's profile.

  Background:
    Given the app is running at "http://localhost:3000"
    And I am signed in as "test-profile-1@agentwitch.com"

  Scenario: Open profile from user menu
    When I open the user dropdown in the header
    And I choose profile or account settings
    Then I should see my profile details

  Scenario: Edit display name
    Given I open my profile edit modal
    When I change my display name to "E2E Tester"
    And I save the profile
    Then my name should update in the header

  Scenario: Profile shows sign-in email
    When I view my profile
    Then I should see email "test-profile-1@agentwitch.com"
