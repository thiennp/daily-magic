export interface BasicTableOrder {
  readonly id: number;
  readonly user: {
    readonly image: string;
    readonly name: string;
    readonly role: string;
  };
  readonly projectName: string;
  readonly team: {
    readonly images: readonly string[];
  };
  readonly status: string;
  readonly budget: string;
}
