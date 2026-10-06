export type StartDeviceAuthorizationResult =
  | {
      readonly ok: true;
      readonly status: 200;
      readonly body: {
        readonly device_code: string;
        readonly user_code: string;
        readonly verification_uri: string;
        readonly verification_uri_complete: string;
        readonly expires_in: number;
        readonly interval: number;
      };
    }
  | {
      readonly ok: false;
      readonly status: number;
      readonly code: string;
      readonly error: string;
    };
