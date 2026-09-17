/**
 * AWI slice `device-identity` — device keypair and WS hello auth fields.
 */
export {
  buildDeviceAuthHelloFields,
  loadOrCreateAgentWitchDeviceKeypair,
  verifyServerAttestationLocally,
  type AgentWitchDeviceKeypair,
} from "../internal/core/agentWitchDeviceKeypair";

export {
  buildDeviceAuthChallengePayload,
  createDeviceAuthNonce,
  decodeEd25519PublicKeyRaw,
  encodeEd25519PublicKeyRaw,
  generateAgentWitchEd25519KeyPair,
  loadEd25519PrivateKeyPem,
  signAgentWitchChallenge,
  verifyAgentWitchChallenge,
} from "../internal/core/agentWitchEd25519";
