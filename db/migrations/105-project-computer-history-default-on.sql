-- Project computer history: default ON for new rows (on_configuring).
-- No-row / unset already reads as on_configuring in parseProjectComputerHistoryState.
-- Explicit state='off' rows are unchanged (owner opted out).
-- 104 = project connections on main.

ALTER TABLE project_computer_history_settings
  ALTER COLUMN state SET DEFAULT 'on_configuring';
