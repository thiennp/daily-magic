import { AWC_TERMS_LINKS_COPY } from "@/features/agent-access/terms/awcTermsLinksCopy.constant";
import {
  AWC_PRIVACY_URL,
  AWC_TERMS_URL,
} from "@/lib/agentAccess/awcTermsVersion.constant";

type AwcTermsLinksSentenceProps = {
  readonly prefix: string;
  readonly suffix: string;
};

const linkClassName = "underline underline-offset-2";

/** `{prefix}Terms and Privacy Policy{suffix}` with both names linked (new tab). */
export default function AwcTermsLinksSentence({
  prefix,
  suffix,
}: AwcTermsLinksSentenceProps) {
  return (
    <span>
      {prefix}
      <a
        href={AWC_TERMS_URL}
        target="_blank"
        rel="noopener"
        className={linkClassName}
      >
        {AWC_TERMS_LINKS_COPY.terms}
      </a>
      {AWC_TERMS_LINKS_COPY.and}
      <a
        href={AWC_PRIVACY_URL}
        target="_blank"
        rel="noopener"
        className={linkClassName}
      >
        {AWC_TERMS_LINKS_COPY.privacy}
      </a>
      {suffix}
    </span>
  );
}
