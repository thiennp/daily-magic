@auth @smoke
Feature: Authentication
  Real users sign in with email magic link or test-account bypass.

  Background:
    Given the app is running at "http://localhost:3000"
    And the database is reachable

  Scenario: Guest sees marketing home
    When I open "/"
    Then I should see sign-in or marketing content
    And I should not see the authenticated onboarding checklist

  Scenario: Test account signs in without email
    Given I use a fresh test account "test-member-a-1@agentwitch.com"
    When I open "/login"
    And I enter email "test-member-a-1@agentwitch.com"
    And I submit the email sign-in form
    Then I should be redirected away from "/login"
    And I should have an authenticated session

  Scenario: Non-test email requests magic link
    When I open "/login"
    And I enter email "real.user@example.com"
    And I submit the email sign-in form
    Then I should see feedback that a sign-in email was sent
    And no session should be created without the link

  Scenario: Protected route redirects to login
    Given I am signed out
    When I open "/library"
    Then I should be redirected to "/login"

  Scenario: Sign out clears session
    Given I am signed in as "test-member-a-2@agentwitch.com"
    When I sign out from the user menu
    Then I should be signed out
    And opening "/library" should redirect to "/login"
