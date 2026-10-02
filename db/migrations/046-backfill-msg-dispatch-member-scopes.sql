-- Softvale / AgentWitch: older access requests stored requested_scopes without
-- msg:dispatch. Approve preferred those frozen scopes over DEFAULT, so active
-- member memberships can lack messaging. Append msg:dispatch where missing.

UPDATE project_memberships
SET scopes = array_append(scopes, 'msg:dispatch')
WHERE status = 'active'
  AND role = 'member'
  AND NOT ('msg:dispatch' = ANY (scopes));
