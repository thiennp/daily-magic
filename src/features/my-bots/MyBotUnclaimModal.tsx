"use client";

import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import { MY_BOTS_COPY } from "@/features/my-bots/myBotsCopy.constant";

interface MyBotUnclaimModalProps {
  readonly botName: string | null;
  readonly onConfirm: () => void;
  readonly onCancel: () => void;
}

/** Confirm before unclaiming (design: "Unclaim NAME?"). */
export default function MyBotUnclaimModal({
  botName,
  onConfirm,
  onCancel,
}: MyBotUnclaimModalProps) {
  return (
    <Modal
      isOpen={botName !== null}
      onClose={onCancel}
      showCloseButton={false}
      className="max-w-lg p-6"
    >
      <div role="dialog" aria-modal="true" aria-labelledby="unclaim-h">
        <h2 id="unclaim-h" className="text-lg font-semibold text-awc-fg">
          {MY_BOTS_COPY.unclaimTitle(botName ?? "")}
        </h2>
        <p className="mt-2 text-sm text-awc-fg-muted">
          {MY_BOTS_COPY.unclaimBody}
        </p>
        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <Button variant="outline" onClick={onCancel}>
            {MY_BOTS_COPY.unclaimCancel}
          </Button>
          <Button className="!bg-red-700 hover:!bg-red-800" onClick={onConfirm}>
            {MY_BOTS_COPY.unclaim}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
