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
The `utils` unit exposes its helpers through `utils/public-api/presentation` and its constants/types through `utils/public-api/types`.
The `components` unit exposes its UI through `components/public-api/presentation` and its shared types through `components/public-api/types`.
The `admin` root exposes AdminShell and the management panels through `public-api/presentation` and `ADMIN_COPY` through `public-api/types`.
