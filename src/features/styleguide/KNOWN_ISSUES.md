# Styleguide — known issues

| ID                       | Status | Summary                                                                                                                                                                                                     |
| ------------------------ | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| STYLEGUIDE-001 (BUG-008) | Fixed  | `/styleguide` horizontal overflow at 1280px from grid `min-width: auto` + table/chart `min-w-*`; shell uses `minmax(0,…)` columns and `min-w-0` on `<main>`. Regression: `e2e/styleguide-overflow.spec.ts`. |
