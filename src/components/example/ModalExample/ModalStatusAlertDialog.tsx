import { Modal } from "@/components/ui/modal";
import {
  MODAL_STATUS_HALO_PATH,
  type ModalStatusAlertConfig,
} from "@/components/example/ModalExample/modalStatusAlertConfig.constant";

interface ModalStatusAlertDialogProps {
  readonly config: ModalStatusAlertConfig;
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export default function ModalStatusAlertDialog({
  config,
  isOpen,
  onClose,
}: ModalStatusAlertDialogProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[600px] p-5 lg:p-10"
    >
      <div className="text-center">
        <div className="relative flex items-center justify-center z-1 mb-7">
          <svg
            className={config.haloClassName}
            width="90"
            height="90"
            viewBox="0 0 90 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d={MODAL_STATUS_HALO_PATH} fill="" fillOpacity="" />
          </svg>

          <span className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
            <svg
              className={config.iconClassName}
              width="38"
              height="38"
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d={config.iconPath}
                fill=""
              />
            </svg>
          </span>
        </div>
        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90 sm:text-title-sm">
          {config.title}
        </h4>
        <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
          {config.message}
        </p>

        <div className="flex items-center justify-center w-full gap-3 mt-7">
          <button type="button" className={config.buttonClassName}>
            Okay, Got It
          </button>
        </div>
      </div>
    </Modal>
  );
}
