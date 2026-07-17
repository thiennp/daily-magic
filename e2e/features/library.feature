@library @requires-mac
Feature: Library
  Personal playbooks — create, edit, publish, and run.

  Background:
    Given the app is running at "http://localhost:3000"
    And I am signed in as "test-library-1@agentwitch.com"
    And my Mac is paired

  Scenario: Empty library shows guidance
    Given I have no saved playbooks
    When I open "/library"
    Then I should see "No playbooks yet"
    And I should see guidance to save from Marketplace or publish my own

  Scenario: Create a new playbook
    When I open "/library"
    And I create a new playbook with a title and prompt
    Then the playbook should appear in my library list

  Scenario: Open playbook actions menu
    Given I have a playbook in my library
    When I open the playbook card actions
    Then I should see run, edit, and publish options as applicable

  Scenario: Publish playbook to company group
    Given I belong to a company group
    And I have a draft playbook
    When I publish the playbook with group visibility
    Then teammates should see it in marketplace or team offerings

  Scenario: Run playbook from library
    Given I have a playbook in my library
    When I choose to run the playbook
    Then I should be taken to the send-task composer with the playbook loaded

  Scenario: Sample workflow onboarding template
    Given I am on the onboarding workflow step
    When I save the sample workflow template
    Then it should appear in my library
