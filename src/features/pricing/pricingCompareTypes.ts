export type CompareCell = boolean | string | null;

export interface PricingCompareRow {
  readonly feature: string;
  readonly trial: CompareCell;
  readonly pro: CompareCell;
  readonly team: CompareCell;
  readonly tip?: string;
}

export interface PricingCompareSection {
  readonly heading: string;
  readonly rows: readonly PricingCompareRow[];
}
