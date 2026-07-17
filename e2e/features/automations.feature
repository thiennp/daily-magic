@automations @requires-mac
Feature: Automations
  Schedule library playbooks to run on the user's Mac.

  Background:
    Given the app is running at "http://localhost:3000"
    And I am signed in as "test-automation-1@agentwitch.com"
    And my Mac is paired
    And I have at least one library playbook

  Scenario: Empty automations page
    Given I have no automations
    When I open "/automations"
    Then I should see the empty automations message

  Scenario: Create scheduled automation
    When I open "/automations"
    And I select a library playbook
    And I set a schedule (e.g. daily or cron)
    And I submit the create automation form
    Then the automation should appear in the list
    And automations should sync to my local Mac

  Scenario: Create automation from library deep link
    Given a playbook with id "capability-id"
    When I open "/automations?capabilityId=capability-id"
    Then the create form should preselect that playbook

  Scenario: Toggle or delete automation
    Given I have an existing automation
    When I disable or delete it from the automation card
    Then the list should update accordingly

  Scenario: Sync warning when local Mac unreachable
    Given my local agent-witch wake server is offline
    When I create or change an automation
    Then I may see a sync warning on the automations page
