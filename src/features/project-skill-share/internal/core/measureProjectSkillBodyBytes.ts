/** UTF-8 byte length (isomorphic; used by the server cap and the publish form). */
export const measureProjectSkillBodyBytes = (body: string): number =>
  new TextEncoder().encode(body).byteLength;
