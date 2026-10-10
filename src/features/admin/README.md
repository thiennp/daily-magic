# Admin

Users, groups, company dispatch rules.

## Registry

- **Slug:** `admin`
- **Feature path:** `src/features/admin`
- **Lib path:** `src/lib/admin`
- **Migration:** migrated

## Routes

- `/admin/groups`
- `/admin/users`

## APIs

- `/api/admin`

## Dependencies

- `auth`
- `dispatch`

Query: `npm run feature-knowledge:query -- "..." --feature=admin`

The `hooks` unit exposes its client hooks only through `hooks/public-api/presentation`.
The `types` unit exposes its shared types only through `types/public-api/types`.
