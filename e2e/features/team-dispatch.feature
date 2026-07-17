@dispatch @multi-user @requires-mac
Feature: Team dispatch
  Delegate tasks to self, a colleague, or through approval.
  Multiple accounts on the same Mac count as a team — each account is a
  separate user; the executor account owns the paired agent-witch profile.

  Background:
    Given the app is running at "http://localhost:3000"
    And agent-witch is running with the executor profile on this Mac
    And admin, executor, and requester are distinct test*@agentwitch.com accounts

  Scenario: Delegate task to own Mac
    Given I am signed in as "test-team-executor-1@agentwitch.com"
    And my Mac is paired and online under my account
    And I have a library playbook or freeform prompt
    When I open the send-task composer
    And I choose to run on my Mac
    And I submit the task
    Then the run should start on my Mac
    And I should see progress in job history

  Scenario: Delegate task to colleague with Open policy
    Given company "E2E Same-Mac Team" has dispatch policy "Open"
    And "test-team-requester-1@agentwitch.com" is a member
    And "test-team-executor-1@agentwitch.com" is a member with Mac online on this computer
    And the executor published a team-visible playbook
    When I sign in as "test-team-requester-1@agentwitch.com"
    And I open the send-task composer
    And I select team dispatch
    And I choose executor "test-team-executor-1@agentwitch.com"
    And I select their playbook
    And I submit the task
    Then the run should execute on the executor's Mac profile without approval

  Scenario: Request sensitive work with Approval policy
    Given company "E2E Approval Team" has dispatch policy "Approval"
    And requester "test-team-requester-2@agentwitch.com" is a member
    And executor "test-team-executor-2@agentwitch.com" is a member with Mac online
    When I sign in as "test-team-requester-2@agentwitch.com"
    And I submit a team dispatch to the executor
    Then the run should wait in pending approval state

  Scenario: Manager approves pending dispatch
    Given a pending approval exists for requester "test-team-requester-2@agentwitch.com"
    When I sign in as company admin "test-team-admin-2@agentwitch.com"
    And I open approvals or the pending request notification
    And I approve the request
    Then the run should start on the executor's Mac

  Scenario: Manager declines pending dispatch
    Given a pending approval exists
    When the approver declines the request
    Then the run should not execute
    And the requester should see declined status

  Scenario: Cannot dispatch when executor Mac offline
    Given executor Mac is offline
    When I attempt team dispatch to that executor
    Then send should be blocked or show offline guidance

  Scenario: Composer blocks incomplete team dispatch
    When I select team dispatch but leave executor or playbook unset
    Then the send button should be disabled
    And I should see guidance to complete team dispatch fields
