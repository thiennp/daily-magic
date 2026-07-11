---
name: skill-architecture-performance-examples
description: >-
  Supplementary patterns for performance and architecture; MUST-level rules stay in rules-performance-architecture.mdc.
---

# Performance and architecture examples

Keep MUST-level guidance in **`rules-performance-architecture.mdc`**. UI styling in this repo favors **SCSS modules** and design tokens—treat CSS size discipline as **bundle budgets + unused rule pruning**, not framework-specific slogans.

## Code splitting (feature-level)

```typescript
import type { ReactElement } from "react";
import { lazy, Suspense } from "react";

const TariffsOverview = lazy(async () => import("./features/TariffsOverview/TariffsOverview"));

function TariffsGate(): ReactElement {
  return (
    <Suspense fallback={<TariffsOverviewSkeleton />}>
      <TariffsOverview />
    </Suspense>
  );
}
```

## Virtualized lists

When lists exceed the thresholds in **`rules-performance-architecture.mdc`**, window rows with a virtualization library (for example **`react-window`**) rather than rendering unbounded DOM:

```tsx
import type { CSSProperties, ReactElement } from "react";
import { FixedSizeList as List } from "react-window";

function VirtualRows(props: {
  readonly items: readonly string[];
}): ReactElement {
  return (
    <List
      height={800}
      itemCount={props.items.length}
      itemSize={150}
      width="100%"
    >
      {({
        index,
        style,
      }: {
        index: number;
        style: CSSProperties;
      }): ReactElement => <div style={style}>{props.items[index]}</div>}
    </List>
  );
}
```

Adapt imports to the virtualization package actually used in the feature.

## Data fetching (React Router)

Prefer **loaders + `useFetcher`** per **`rules-bundle-api.mdc`** instead of ad-hoc **`fetch`** helpers inside arbitrary modules. Wrap retry/backoff in small pure utilities only where product rules demand it.

## Store hydration (Zustand)

Store **serializable data only**; export standalone setters. Example shape:

```typescript
interface TariffState {
  readonly tariffs: readonly Tariff[];
}

export const useTariffStore = create<TariffState>(() => ({ tariffs: [] }));

export const setTariffsInStore = (tariffs: readonly Tariff[]): void => {
  useTariffStore.setState({ tariffs });
};
```

For loader-provided snapshots, expose **`setInitialTariffs(result)`**-style pure functions that call **`setState`** once—see **`rules-state-zustand.mdc`**.

## Composition helpers

Small pure transforms compose without classes—extract **`pipe`**/helpers only when repetition proves the need (**YAGNI**).

## Accessibility snippet

Interactive controls need labels, keyboard support, and state hints (**`aria-expanded`**, etc.) per **`rules-bundle-react.mdc`** / **`rules-performance-architecture.mdc`**.

## Vite tuning (illustrative)

```typescript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
        },
      },
    },
  },
  cacheDir: ".vite-cache",
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
});
```

Match **`vite.config.ts`** decisions to repo conventions—do not copy wholesale without reviewing existing chunk strategy.
