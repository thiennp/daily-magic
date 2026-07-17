@reports @requires-mac
Feature: Job history
  View past agent runs and run details.

  Background:
    Given the app is running at "http://localhost:3000"
    And I am signed in as "test-reports-1@agentwitch.com"
    And my Mac is paired

  Scenario: Empty job history
    Given I have no agent runs
    When I open "/reports"
    Then I should see an empty or loading job history state

  Scenario: List shows run after task sent
    Given I sent a task from the composer
    When I open "/reports"
    Then I should see at least one run in the list
    And the run should show status and timestamp

  Scenario: Open run detail page
    Given I have a completed run with id "run-id"
    When I open "/reports/run-id"
    Then I should see run details including prompt and outcome summary

  Scenario: Filter or scope runs
    When I open "/reports"
    Then I should see my own runs in the default view

  Scenario: Navigate to reports from primary nav
    When I click "Job history" in the primary navigation
    Then I should be on "/reports"
