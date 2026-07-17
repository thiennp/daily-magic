@composer @requires-mac @smoke
Feature: Send a task (agent composer)
  Compose and dispatch agent work from the browser.

  Background:
    Given the app is running at "http://localhost:3000"
    And I am signed in as "test-composer-1@agentwitch.com"
    And my Mac is paired

  Scenario: Open composer from home
    When I open "/?sendTask=1"
    Then I should see the send-task composer modal or page

  Scenario: Open composer from library playbook
    Given I have a library playbook
    When I run the playbook from library
    Then the composer should load the playbook prompt

  Scenario: Send freeform prompt to my Mac
    When I open the send-task composer
    And I enter prompt "Summarize today's git log"
    And I select my Mac as the executor device
    And I click send
    Then a run should be created
    And I should see live terminal or status feedback

  Scenario: Multi-Mac user picks device
    Given I have two paired Macs
    When I open the send-task composer
    Then I should see a Mac picker step
    When I select the second Mac
    And I send the task
    Then the run should target the selected device

  Scenario: Composer shows blocked state without dispatch-ready Mac
    Given I have a paired Mac that is not dispatch-ready
    When I open the send-task composer
    Then I should see blocked-action guidance

  Scenario: Deep link with device and library id
    When I open the composer with libraryCapabilityId and deviceId query params
    Then those fields should be pre-filled
