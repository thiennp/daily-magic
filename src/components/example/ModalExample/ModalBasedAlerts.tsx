"use client";

import ComponentCard from "@/components/common/ComponentCard";
import ModalStatusAlertDialog from "@/components/example/ModalExample/ModalStatusAlertDialog";
import { MODAL_STATUS_ALERT_CONFIGS } from "@/components/example/ModalExample/modalStatusAlertConfig.constant";
import { useModal } from "@/hooks/useModal";

export default function ModalBasedAlerts() {
  const successModal = useModal();
  const infoModal = useModal();
  const warningModal = useModal();
  const errorModal = useModal();

  const modalStateByVariant = {
    success: successModal,
    info: infoModal,
    warning: warningModal,
    error: errorModal,
  } as const;

  return (
    <ComponentCard title="Modal Based Alerts">
      <div className="flex flex-wrap items-center gap-3">
        {MODAL_STATUS_ALERT_CONFIGS.map((config) => (
          <button
            key={config.variant}
            onClick={modalStateByVariant[config.variant].openModal}
            className={config.triggerClassName}
          >
            {config.triggerLabel}
          </button>
        ))}
      </div>

      {MODAL_STATUS_ALERT_CONFIGS.map((config) => (
        <ModalStatusAlertDialog
          key={config.variant}
          config={config}
          isOpen={modalStateByVariant[config.variant].isOpen}
          onClose={modalStateByVariant[config.variant].closeModal}
        />
      ))}
    </ComponentCard>
  );
}
