# Project skill share — known issues

| ID        | Issue                                                                                                                            | Status / plan                                                    |
| --------- | -------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| SKILL-001 | History port is a stub (History OFF). No repo-wide History flag exists yet; `isHistoryEnabled` comes from the injected port.     | AW History implements the port; wire it where AWC can reach AWL. |
| SKILL-002 | `shared_skill_body` is still listed in `PROJECT_ACL_COWORK_FORBIDDEN_WRITE_KINDS` and agent guidance says "AWC stores ACL only". | Arch to amend policy/guidance for this Lead-approved exception.  |
| SKILL-003 | Mirror runs where the port runs. On AWC the default port never mirrors; AWC→AWL transport for the mirror is not defined yet.     | Pending History/Arch.                                            |
