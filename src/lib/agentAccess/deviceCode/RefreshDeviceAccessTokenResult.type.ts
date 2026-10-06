export type RefreshDeviceAccessTokenResult =
  | {
      readonly ok: true;
      readonly status: 200;
      readonly body: {
        readonly access_token: string;
        readonly token_type: "Bearer";
        readonly expires_in: number;
        readonly refresh_token: string;
      };
    }
  | {
      readonly ok: false;
      readonly status: number;
      readonly body: {
        readonly error: string;
        readonly error_description?: string;
      };
    };
