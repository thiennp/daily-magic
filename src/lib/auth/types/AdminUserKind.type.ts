/** Admin users API `kind`: bot = agent synthetic email; test = test*@agentwitch.com; else real. */
export const ADMIN_USER_KINDS = ["real", "bot", "test"] as const;

type AdminUserKind = (typeof ADMIN_USER_KINDS)[number];

export default AdminUserKind;
