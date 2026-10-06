export type RegisterOauthClientResult =
  | {
      readonly ok: true;
      readonly body: {
        readonly client_id: string;
        readonly client_secret?: string;
        readonly client_name: string | null;
        readonly redirect_uris: readonly string[];
        readonly token_endpoint_auth_method: string;
        readonly grant_types: readonly string[];
        readonly response_types: readonly string[];
        readonly code_challenge_methods: readonly string[];
      };
    }
  | {
      readonly ok: false;
      readonly status: number;
      readonly error: string;
      readonly error_description: string;
    };
