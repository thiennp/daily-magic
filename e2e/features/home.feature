@home @requires-mac
Feature: Home dashboard
  Authenticated hub after Mac is connected.

  Background:
    Given the app is running at "http://localhost:3000"

  Scenario: Connected user sees dashboard hero and team offerings
    Given I am signed in as "test-home-1@agentwitch.com"
    And my Mac is paired
    When I open "/"
    Then I should see the home dashboard
    And I should see primary navigation for Marketplace, Library, Automations, and Job history

  Scenario: User with no Mac only sees connect guide
    Given I am signed in as a fresh test account "test-home-2@agentwitch.com"
    When I open "/"
    Then I should see the connect-your-Mac guide
    And I should not see marketplace shortcuts in the main dashboard area

  Scenario: Copy install command opens paste modal
    Given I am signed in as "test-home-3@agentwitch.com"
    And my Mac is not paired
    When I click the Copy button on the install command
    Then the install paste modal should open

  Scenario: Home deep link to setup section
    Given I am signed in as "test-home-4@agentwitch.com"
    When I open "/#your-setup"
    Then I should see the your-setup section
