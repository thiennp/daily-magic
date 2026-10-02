-- leave_project audits action 'leave' after membership is revoked.
-- Without this CHECK expansion, INSERT fails → HTTP 500 empty body while leave already succeeded.
ALTER TABLE project_access_audit
  DROP CONSTRAINT IF EXISTS project_access_audit_action_check;

ALTER TABLE project_access_audit
  ADD CONSTRAINT project_access_audit_action_check
  CHECK (action IN (
    'request',
    'approve',
    'deny',
    'revoke',
    'leave',
    'add_folder_ref',
    'remove_folder_ref',
    'allow_claim_ok',
    'allow_claim_deny',
    'membership_check_ok',
    'membership_check_deny',
    'invite.create',
    'invite.revoke',
    'invite.redeem',
    'key.mint',
    'key.rotate',
    'key.revoke',
    'webhook.register',
    'webhook.update',
    'webhook.disable',
    'msg.dispatch',
    'msg.ack',
    'membership.set_display_name',
    'membership.rename_display'
  ));
