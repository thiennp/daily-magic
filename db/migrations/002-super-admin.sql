ALTER TABLE users DROP CONSTRAINT IF EXISTS users_global_role_check;

ALTER TABLE users
  ADD CONSTRAINT users_global_role_check
  CHECK (global_role IN ('super_admin', 'admin', 'user'));

UPDATE users
SET global_role = 'super_admin'
WHERE email = 'nguyenphongthien@gmail.com';

CREATE UNIQUE INDEX IF NOT EXISTS users_one_super_admin
  ON users (global_role)
  WHERE global_role = 'super_admin';
