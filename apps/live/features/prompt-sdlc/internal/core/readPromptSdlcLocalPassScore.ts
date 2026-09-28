export const readPromptSdlcLocalPassScore = (
  raw: string,
):
  | { readonly ok: true; readonly passScore: number }
  | { readonly ok: false; readonly errorMessage: string } => {
  const text = raw.trim();
  const passScore = Number(text);
  if (!/^\d{1,3}$/.test(text) || passScore < 1 || passScore > 100) {
    return {
      ok: false,
      errorMessage: "Pass score must be a whole number from 1 to 100.",
    };
  }
  return { ok: true, passScore };
};
