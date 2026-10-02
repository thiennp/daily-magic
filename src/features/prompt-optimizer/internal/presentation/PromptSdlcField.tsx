import type { ReactElement, ReactNode } from "react";

import AwcFormField, {
  AWC_FORM_CONTROL_CLASS,
} from "@/components/form/AwcFormField";

export const PROMPT_SDLC_FIELD_CLASS = AWC_FORM_CONTROL_CLASS;

interface PromptSdlcFieldProps {
  readonly id: string;
  readonly label: string;
  readonly children: ReactNode;
}

export default function PromptSdlcField({
  id,
  label,
  children,
}: PromptSdlcFieldProps): ReactElement {
  return (
    <AwcFormField id={id} label={label}>
      {children}
    </AwcFormField>
  );
}
