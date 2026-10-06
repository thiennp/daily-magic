export type CompleteOauthConsentResult =
  | {
      readonly ok: true;
      readonly redirectUrl: string;
    }
  | {
      readonly ok: false;
      readonly status: number;
      readonly code: string;
      readonly error: string;
    };
