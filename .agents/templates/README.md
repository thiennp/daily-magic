# Templates

Scaffold and file templates for generators. See **`.agents/scaffold/README.md`**.

**Note:** Some `*.mdc` template inventories still describe EnergyCenter `app/` layout. Map paths to this repo as:

| Legacy (EnergyCenter) | daily-magic                          |
| --------------------- | ------------------------------------ |
| `app/pages/`          | `src/app/` routes + `src/features/`  |
| `app/features/`       | `src/features/`                      |
| `app/components/`     | `src/components/`                    |
| `app/utils/`          | `src/lib/` or feature-local `utils/` |

After generating files, open a **GitHub PR** with `gh pr create` when ready.
