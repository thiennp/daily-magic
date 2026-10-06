"use client";

import { PROJECT_ASK_BOX_COPY } from "@/features/projects/askBox/projectAskBoxCopy.constant";
import type { MessengerTaskRefsDraft } from "@/features/projects/messenger/AwcMessengerTaskRefsPanel";

const FIELD =
  "w-full rounded-[10px] border-0 bg-gray-100 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400/40 dark:bg-white/10 dark:text-white dark:placeholder:text-gray-400";

type RefKey = keyof MessengerTaskRefsDraft;

const REF_FIELDS: readonly { readonly key: RefKey; readonly label: string; readonly mono: boolean }[] = [
  { key: "prUrl", label: PROJECT_ASK_BOX_COPY.prUrl, mono: false },
  { key: "commitSha", label: PROJECT_ASK_BOX_COPY.commitSha, mono: true },
  { key: "localPath", label: PROJECT_ASK_BOX_COPY.localPath, mono: true },
  { key: "allowClaimId", label: PROJECT_ASK_BOX_COPY.allowClaimId, mono: true },
];

interface AwcProjectAskBoxTaskFieldsProps {
  readonly disabled: boolean;
  readonly kind: string;
  readonly refs: MessengerTaskRefsDraft;
  readonly onKind: (kind: string) => void;
  readonly onRefs: (refs: MessengerTaskRefsDraft) => void;
}

/** Assign-as-task fields: kind + allowlisted dispatch refs (inbox/dispatch). */
export default function AwcProjectAskBoxTaskFields({
  disabled,
  kind,
  refs,
  onKind,
  onRefs,
}: AwcProjectAskBoxTaskFieldsProps) {
  const copy = PROJECT_ASK_BOX_COPY;
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(10.625rem,1fr))] gap-2">
      <input
        className={FIELD}
        value={kind}
        disabled={disabled}
        placeholder={copy.kindPlaceholder}
        aria-label={copy.kindAria}
        onChange={(event) => {
          onKind(event.target.value);
        }}
      />
      {REF_FIELDS.map((field) => (
        <input
          key={field.key}
          className={`${FIELD}${field.mono ? " font-mono" : ""}`}
          value={refs[field.key]}
          disabled={disabled}
          placeholder={field.label}
          aria-label={field.label}
          onChange={(event) => {
            onRefs({ ...refs, [field.key]: event.target.value });
          }}
        />
      ))}
    </div>
  );
}
