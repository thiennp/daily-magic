"use client";

import { useMemo, useState } from "react";

import AwcMessengerEmptyState from "@/features/projects/messenger/AwcMessengerEmptyState";
import AwcMessengerThreadListPanel from "@/features/projects/messenger/AwcMessengerThreadList";
import AwcMessengerThreadPane from "@/features/projects/messenger/AwcMessengerThreadPane";
import { AWC_PROJECT_MESSENGER_COPY } from "@/features/projects/messenger/awcProjectMessengerCopy.constant";
import { useAwcProjectMessengerThread } from "@/features/projects/messenger/hooks/useAwcProjectMessengerThread";
import { useAwcProjectMessengerThreads } from "@/features/projects/messenger/hooks/useAwcProjectMessengerThreads";

interface AwcProjectMessengerSectionProps {
  readonly projectId: string;
}

const WHOLE_KEY = "whole";

export default function AwcProjectMessengerSection({
  projectId,
}: AwcProjectMessengerSectionProps) {
  const copy = AWC_PROJECT_MESSENGER_COPY;
  const list = useAwcProjectMessengerThreads(projectId);
  const [selectedKey, setSelectedKey] = useState<string | null>(WHOLE_KEY);
  const [mobileShowThread, setMobileShowThread] = useState(false);
  const open = useAwcProjectMessengerThread({
    projectId,
    threadKey: selectedKey,
  });

  const selectedMeta = useMemo(() => {
    if (selectedKey === WHOLE_KEY || selectedKey === null) {
      return {
        title: copy.wholeName,
        kindLabel: copy.wholeSub,
        status: undefined,
      };
    }
    const bot = list.threads?.bots.find((row) => row.membershipId === selectedKey);
    return {
      title: bot?.displayName?.trim() || copy.kindBot,
      kindLabel: copy.kindBot,
      status: bot?.status,
    };
  }, [copy, list.threads, selectedKey]);

  if (list.isLoading) {
    return <p className="text-xs text-gray-400">{copy.loading}</p>;
  }
  if (list.unavailable || list.forbidden) {
    return (
      <p className="rounded-md border border-amber-200/80 bg-amber-50/80 px-3 py-2 text-xs text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-100">
        {list.message ?? copy.unavailable}
      </p>
    );
  }
  if (list.threads === null) return null;
  if (list.threads.bots.length === 0) {
    return <AwcMessengerEmptyState />;
  }

  const canSend = list.threads.canSend && (open.thread?.canSend ?? true);

  return (
    <div className="space-y-3">
      <h2 className="text-base font-semibold text-gray-900 dark:text-white">
        {copy.tab}
      </h2>
      {open.message !== null ? (
        <p className="text-xs text-amber-800 dark:text-amber-200">{open.message}</p>
      ) : null}
      <div className="grid min-h-[28rem] overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950 md:grid-cols-[17.5rem_minmax(0,1fr)]">
        <div
          className={`${
            mobileShowThread ? "hidden md:flex" : "flex"
          } min-h-0 flex-col`}
        >
          <AwcMessengerThreadListPanel
            threads={list.threads}
            selectedKey={selectedKey}
            onSelect={(key) => {
              setSelectedKey(key);
              setMobileShowThread(true);
              void list.reload();
            }}
          />
        </div>
        <div
          className={`${
            mobileShowThread ? "flex" : "hidden md:flex"
          } min-h-0 min-w-0 flex-col`}
        >
          <AwcMessengerThreadPane
            title={selectedMeta.title}
            kindLabel={selectedMeta.kindLabel}
            status={selectedMeta.status}
            thread={open.thread}
            isLoading={open.isLoading}
            canSend={canSend}
            sending={open.sending}
            showBack={mobileShowThread}
            onBack={() => {
              setMobileShowThread(false);
            }}
            onSend={async (text, needsReply) => {
              const ok = await open.send(text, needsReply);
              if (ok) void list.reload();
              return ok;
            }}
          />
        </div>
      </div>
    </div>
  );
}
