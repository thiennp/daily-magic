-- Expand project_access_audit actions for G1 activity feed (membership/status only).
-- New events: allow-claim and membership-check outcomes (no payload bodies).

ALTER TABLE project_access_audit
  DROP CONSTRAINT IF EXISTS project_access_audit_action_check;

ALTER TABLE project_access_audit
  ADD CONSTRAINT project_access_audit_action_check
  CHECK (action IN (
    'request',
    'approve',
    'deny',
    'revoke',
    'add_folder_ref',
    'remove_folder_ref',
    'allow_claim_ok',
    'allow_claim_deny',
    'membership_check_ok',
    'membership_check_deny'
  ));
