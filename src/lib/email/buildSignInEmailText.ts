export interface BuildSignInEmailTextParams {
  readonly url: string;
  readonly host: string;
}

export default function buildSignInEmailText(
  params: BuildSignInEmailTextParams,
): string {
  return `Sign in to ${params.host}\n${params.url}\n\n`;
}
