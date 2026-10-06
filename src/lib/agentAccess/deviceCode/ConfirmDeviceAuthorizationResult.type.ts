export type ConfirmDeviceAuthorizationResult =
  | {
      readonly ok: true;
      readonly tokenId: string;
      readonly botUserId: string;
      readonly clientName: string | null;
      readonly userCodeDisplay: string;
    }
  | {
      readonly ok: false;
      readonly status: number;
      readonly code: string;
      readonly error: string;
    };
