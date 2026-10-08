export type MarketingLegalSection = {
  readonly heading: string;
  readonly body?: string;
  readonly items?: readonly string[];
  readonly mailto?: string;
};

export type MarketingLegalDoc = {
  readonly key: "privacy" | "terms";
  readonly path: string;
  readonly title: string;
  readonly lead: string;
  readonly sections: readonly MarketingLegalSection[];
};
