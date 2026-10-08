"use client";

import { useEffect, useRef, useState } from "react";

import { AWC_PROJECT_INVITE_ADD_ASSISTANT_COPY as C } from "@/features/projects/access/invites/awcProjectInviteAddAssistantCopy.constant";
import AwcSupportedAssistantsList from "@/features/projects/access/invites/AwcSupportedAssistantsList";
import { filterSupportedAssistants } from "@/features/projects/access/invites/awcSupportedAssistants";

interface Props {
  readonly value: string;
  readonly onSelect: (id: string) => void;
  readonly onClose: () => void;
}

/** Modal list of supported assistants: click a row = select + close. Esc closes, Tab is trapped. */
export default function AwcSupportedAssistantsDialog({
  value,
  onSelect,
  onClose,
}: Props) {
  const [query, setQuery] = useState("");
  const panel = useRef<HTMLDivElement>(null);
  const items = filterSupportedAssistants(query);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    panel.current?.querySelector<HTMLElement>("input")?.focus();
    return () => previous?.focus();
  }, []);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      onClose();
      return;
    }
    if (event.key !== "Tab") return;
    const nodes = panel.current?.querySelectorAll<HTMLElement>("button, input");
    if (!nodes || nodes.length === 0) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    const edge = event.shiftKey ? first : last;
    if (document.activeElement === edge) {
      event.preventDefault();
      (event.shiftKey ? last : first).focus();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={C.dialogTitle}
      onKeyDown={onKeyDown}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(16,24,40,0.35)] p-4"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={panel}
        className="w-full max-w-2xl overflow-hidden rounded-xl border border-awc-border-strong bg-awc-surface shadow-[0_12px_32px_rgba(16,24,40,0.18)]"
      >
        <div className="flex items-center gap-2 border-b border-awc-border px-4 py-3.5">
          <h3 className="m-0 flex-1 text-[16px] font-semibold text-awc-fg">
            {C.dialogTitle}
          </h3>
          <button type="button" aria-label={C.dialogClose} onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="grid gap-3 px-4 py-4">
          <input
            type="search"
            value={query}
            placeholder={C.dialogSearch}
            aria-label={C.dialogSearch}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border border-awc-control-border bg-awc-surface px-2.5 py-2 text-sm text-awc-fg"
          />
          <AwcSupportedAssistantsList
            items={items}
            value={value}
            onSelect={onSelect}
          />
        </div>
      </div>
    </div>
  );
}
