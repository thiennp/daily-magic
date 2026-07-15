ALTER TABLE agent_automations
  ADD COLUMN IF NOT EXISTS local_prompt TEXT;
