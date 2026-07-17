@onboarding @requires-mac @smoke
Feature: Onboarding checklist
  New users complete setup: connect Mac, create workflow, send task, optional automation.

  Background:
    Given the app is running at "http://localhost:3000"
    And agent-witch is connected for the signed-in test account

  Scenario: Fresh user sees connect-Mac gate before dashboard
    Given I am signed in as a fresh test account "test-onboard-1@agentwitch.com"
    When I open "/"
    Then I should see the connect-your-Mac setup guide
    And the onboarding checklist should show "Connect your Mac" as incomplete

  Scenario: Pairing Mac completes the first checklist step
    Given I am signed in as "test-onboard-2@agentwitch.com"
    And agent-witch is running with profile "test-onboard-2@agentwitch.com"
    When I complete Mac pairing from the home connect guide
    Then the checklist step "Connect your Mac" should be marked done
    And the home dashboard content should become visible

  Scenario: Create first workflow from library
    Given I am signed in as "test-onboard-3@agentwitch.com"
    And my Mac is paired
    When I open "/library"
    And I create or save a sample playbook
    Then the checklist step "Create your first workflow or agent" should be marked done

  Scenario: Send first task from composer
    Given I am signed in as "test-onboard-4@agentwitch.com"
    And my Mac is paired
    And I have at least one library playbook
    When I open the send-task composer
    And I submit a short task to my Mac
    Then the task should appear in job history
    And the checklist step "Send your first task" should be marked done

  Scenario: Schedule optional automation
    Given I am signed in as "test-onboard-5@agentwitch.com"
    And my Mac is paired
    And I have a library playbook
    When I open "/automations"
    And I create a scheduled automation for that playbook
    Then the optional checklist step "Schedule a workflow" should be marked done

  Scenario: Dismiss setup-complete panel
    Given I am signed in as "test-onboard-6@agentwitch.com"
    And all required onboarding steps are complete
    When I acknowledge the setup-complete panel
    Then the panel should not reappear on refresh
