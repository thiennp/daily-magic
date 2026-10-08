"use client";

import { Modal } from "@/components/ui/modal";
import type { ConnectFlowState } from "@/features/projects/settings/connections/useProjectConnectionConnectFlow";
import { PROJECT_CONNECTION_PROVIDER_LABEL } from "@/features/projects/settings/connections/projectConnectionProviders.constant";
import {
  formatProjectConnectionsCopy as fmt,
  PROJECT_CONNECTIONS_COPY as C,
} from "@/features/projects/settings/connections/projectConnectionsCopy.constant";
import {
  CONNECTION_BTN,
  CONNECTION_BTN_PRIMARY,
} from "@/features/projects/settings/connections/projectConnectionClasses.constant";

interface AwcProjectConnectionConnectDialogProps {
  readonly state: ConnectFlowState;
  readonly projectName: string;
  readonly onCancel: () => void;
  readonly onRetry: () => void;
}

/** Connect / Reconnect handshake dialog (waiting → failed). */
export default function AwcProjectConnectionConnectDialog({
  state,
  projectName,
  onCancel,
  onRetry,
}: AwcProjectConnectionConnectDialogProps) {
  const service =
    state === null ? "" : PROJECT_CONNECTION_PROVIDER_LABEL[state.provider];
  const failed = state?.phase === "failed";
  const title = failed
    ? fmt(C.connectFailedTitle, { service })
    : fmt(state?.reconnect ? C.reconnectTitle : C.connectTitle, { service });

  return (
    <Modal
      isOpen={state !== null}
      onClose={onCancel}
      showCloseButton={false}
      className="max-w-md p-6"
    >
      <div role="dialog" aria-modal="true" aria-labelledby="p-conn-dlg-h">
        <h2
          id="p-conn-dlg-h"
          className="text-lg font-semibold text-awc-fg dark:text-white/90"
        >
          {title}
        </h2>
        {failed ? (
          <p role="alert" className="mt-3 text-sm font-semibold text-awc-bad">
            {C.connectFailedBody}
          </p>
        ) : (
          <>
            <p className="mt-3 text-sm text-awc-fg-muted dark:text-gray-300">
              {fmt(C.connectBody, { service, project: projectName })}
            </p>
            <p className="mt-3 rounded-lg bg-awc-tile px-3 py-2.5 text-[13px] text-awc-fg-muted dark:bg-white/5">
              {C.connectScope}
            </p>
            <p
              role="status"
              className="mt-3 text-sm font-semibold text-awc-blue-700 dark:text-brand-300"
            >
              {fmt(C.connectWaiting, { service })}
            </p>
          </>
        )}
        <div className="mt-5 flex flex-wrap justify-end gap-2">
          <button type="button" className={CONNECTION_BTN} onClick={onCancel}>
            {C.connectCancel}
          </button>
          <button
            type="button"
            className={failed ? CONNECTION_BTN_PRIMARY : CONNECTION_BTN}
            onClick={onRetry}
          >
            {failed ? C.connectTryAgain : C.connectReopen}
          </button>
        </div>
      </div>
    </Modal>
  );
}
