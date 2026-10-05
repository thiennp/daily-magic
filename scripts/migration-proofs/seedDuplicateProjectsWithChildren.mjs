// Prod-like seed: an owner with two NULL-device "Default" projects (Macs
// removed → device_id SET NULL) and two NULL-device "Personal" projects, each
// with children. Plus an owner with no project and orphan rows.
const SEED = `
INSERT INTO users (id, email) VALUES
  ('u_dup', 'dup@example.test'), ('u_mate', 'mate@example.test'),
  ('u_none', 'none@example.test');
INSERT INTO user_projects (id, owner_user_id, device_id, name, folder_path, created_at) VALUES
  ('p_def1', 'u_dup', NULL, 'Default', NULL, '2026-01-01'),
  ('p_def2', 'u_dup', NULL, 'Default', NULL, '2026-02-01'),
  ('p_per1', 'u_dup', NULL, 'Personal', NULL, '2026-03-01'),
  ('p_per2', 'u_dup', NULL, 'Personal', NULL, '2026-04-01');
INSERT INTO project_memberships (id, project_id, user_id, role, status) VALUES
  ('m1', 'p_def1', 'u_dup', 'owner', 'active'),
  ('m2', 'p_def2', 'u_dup', 'owner', 'active'),
  ('m3', 'p_def2', 'u_mate', 'member', 'active'),
  ('m4', 'p_per1', 'u_dup', 'owner', 'active'),
  ('m5', 'p_per2', 'u_dup', 'owner', 'active');
INSERT INTO published_capabilities (id, owner_user_id, type, name) VALUES
  ('cap_def2', 'u_dup', 'agent', 'on second Default'),
  ('cap_per2', 'u_dup', 'workflow', 'on second Personal'),
  ('cap_orphan', 'u_dup', 'agent', 'orphan'),
  ('cap_none', 'u_none', 'agent', 'owner without project');
INSERT INTO agent_runs (id, requester_user_id, executor_user_id, prompt, status, dispatch_policy, project_id) VALUES
  ('run_def2', 'u_dup', 'u_dup', 'p', 'completed', 'open', 'p_def2'),
  ('run_per1', 'u_dup', 'u_dup', 'p', 'completed', 'open', 'p_per1'),
  ('run_per2', 'u_dup', 'u_dup', 'p', 'failed', 'open', 'p_per2'),
  ('run_orphan', 'u_dup', 'u_dup', 'p', 'completed', 'open', NULL),
  ('run_none', 'u_none', 'u_none', 'p', 'completed', 'open', NULL);
INSERT INTO project_messages (id, project_id, sender_user_id, kind, summary) VALUES
  ('msg_def1', 'p_def1', 'u_dup', 'note', 'a'),
  ('msg_def2', 'p_def2', 'u_mate', 'note', 'b'),
  ('msg_per2', 'p_per2', 'u_dup', 'note', 'c');
INSERT INTO project_computer_history_settings (project_id) VALUES ('p_def2'), ('p_per2');
INSERT INTO project_knowledge_items (id, project_id, kind) VALUES
  ('k_def2', 'p_def2', 'fact'), ('k_per1', 'p_per1', 'lesson');
INSERT INTO project_messenger_thread_reads (user_id, project_id, thread_key, last_read_at) VALUES
  ('u_dup', 'p_def2', 'main', NOW()), ('u_mate', 'p_def2', 'main', NOW());
`;

// Library rows that already carry a project (e.g. a half-applied 069 or a
// caller that set it) must keep it. Requires the 069 column to exist.
export const PRE_ASSIGNED_CAPABILITIES = `
ALTER TABLE published_capabilities ADD COLUMN IF NOT EXISTS project_id TEXT;
UPDATE published_capabilities SET project_id = 'p_def2' WHERE id = 'cap_def2';
UPDATE published_capabilities SET project_id = 'p_per2' WHERE id = 'cap_per2';
`;

// Schema drift: owner columns nullable on agent_runs. Exercises the run owner
// fallback (requester -> executor -> capability owner) and an ownerless run
// that must stay NULL without inserting an ownerless Default/Personal.
export const DRIFT_RUN_OWNERS = `
ALTER TABLE agent_runs ALTER COLUMN requester_user_id DROP NOT NULL;
ALTER TABLE agent_runs ALTER COLUMN executor_user_id DROP NOT NULL;
INSERT INTO users (id, email) VALUES ('u_exec', 'exec@example.test');
INSERT INTO agent_runs (id, requester_user_id, executor_user_id, prompt, status, dispatch_policy, capability_id) VALUES
  ('run_exec_only', NULL, 'u_exec', 'p', 'completed', 'open', NULL),
  ('run_cap_owner', NULL, NULL, 'p', 'completed', 'open', 'cap_none'),
  ('run_ownerless', NULL, NULL, 'p', 'completed', 'open', NULL);
`;

export const DUPLICATE_PROJECT_IDS = ["p_def1", "p_def2", "p_per1", "p_per2"];

export const seedDuplicateProjectsWithChildren = async (db) => {
  await db.exec(SEED);
};
