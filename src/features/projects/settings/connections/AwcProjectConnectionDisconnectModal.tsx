"use client";

import ConfirmDestructiveModal from "@/features/shell/ConfirmDestructiveModal";
import type { ProjectConnectionItem } from "@/features/projects/settings/connections/projectConnection.types";
import { PROJECT_CONNECTION_PROVIDER_LABEL } from "@/features/projects/settings/connections/projectConnectionProviders.constant";
import {
  formatProjectConnectionsCopy,
  PROJECT_CONNECTIONS_COPY as C,
} from "@/features/projects/settings/connections/projectConnectionsCopy.constant";

interface AwcProjectConnectionDisconnectModalProps {
  readonly item: ProjectConnectionItem | null;
  readonly isConfirming: boolean;
  readonly onClose: () => void;
  readonly onConfirm: () => void;
}

/** Disconnect confirm (Invite destructive pattern) — DELETE …/connections/{provider}. */
export default function AwcProjectConnectionDisconnectModal({
  item,
  isConfirming,
  onClose,
  onConfirm,
}: AwcProjectConnectionDisconnectModalProps) {
  const name =
    item === null ? "" : PROJECT_CONNECTION_PROVIDER_LABEL[item.provider];
  return (
    <ConfirmDestructiveModal
      isOpen={item !== null}
      title={formatProjectConnectionsCopy(C.disconnectTitle, {
        service: name,
      })}
      description={formatProjectConnectionsCopy(C.disconnectBody, {
        service: name,
        accountLabel: item?.accountLabel ?? name,
      })}
      confirmLabel={C.disconnectConfirm}
      cancelLabel={C.disconnectCancel}
      isConfirming={isConfirming}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}
