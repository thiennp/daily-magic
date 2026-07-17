@admin @multi-user
Feature: Companies and rules
  Create a company, invite members, and configure dispatch policy.

  Background:
    Given the app is running at "http://localhost:3000"

  Scenario: Admin creates a company from scratch
    Given I am signed in as a fresh test account "test-admin-1@agentwitch.com"
    When I open "/admin/groups"
    Then I should see "Companies"
    And I should see guidance to create my company
    When I enter company name "E2E Acme 1"
    And I click "Create company"
    Then a company group should be created
    And I should be the group super admin

  Scenario: Admin cannot create a second company
    Given I am signed in as "test-admin-2@agentwitch.com"
    And I already manage a company
    When I attempt to create another company
    Then I should see an error that I already manage a company

  Scenario: Invite member by email
    Given I am signed in as "test-admin-3@agentwitch.com"
    And I manage company "E2E Team 3"
    When I add member email "test-member-a-3@agentwitch.com" with role "User"
    Then the member should appear in the members list

  Scenario: Member joins existing company via invite
    Given "test-member-b-3@agentwitch.com" was invited to "E2E Team 3"
    When I sign in as "test-member-b-3@agentwitch.com"
    And I open "/admin/groups"
    Then I should see company "E2E Team 3" as a member

  Scenario: Set dispatch policy to Open
    Given I am signed in as company admin "test-admin-4@agentwitch.com"
    And I manage a company
    When I open company settings
    And I set dispatch policy to "Open"
    And I save the policy
    Then I should see "Company dispatch policy saved"

  Scenario: Set dispatch policy to Approval
    Given I am signed in as company admin "test-admin-5@agentwitch.com"
    When I set dispatch policy to "Approval"
    And I save the policy
    Then teammate tasks requiring approval should wait for manager confirmation

  Scenario: Change member role
    Given I manage a company with a member
    When I change the member role to "Group admin"
    Then the member should have elevated permissions

  Scenario: Remove member from company
    Given I manage a company with member "test-member-c-1@agentwitch.com"
    When I remove that member
    Then they should no longer appear in the members list

  Scenario: Delete company
    Given I am company super admin "test-admin-delete-1@agentwitch.com"
    When I delete the company
    Then the company should be removed from my list
