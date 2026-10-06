export type CreateOauthAuthorizationPendingResult =
  | {
      readonly ok: true;
      readonly consentPath: string;
      readonly pendingId: string;
    }
  | {
      readonly ok: false;
      readonly status: number;
      readonly error: string;
      readonly error_description: string;
    };
