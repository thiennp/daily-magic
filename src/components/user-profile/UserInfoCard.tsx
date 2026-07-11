"use client";

import { useModal } from "@/hooks/useModal";
import UserInfoCardDetails from "@/components/user-profile/UserInfoCardDetails";
import UserProfileEditIcon from "@/components/user-profile/UserProfileEditIcon";
import UserProfileEditModal from "@/components/user-profile/UserProfileEditModal";
import { USER_INFO_CARD_FIELDS } from "@/components/user-profile/userInfoCardFields.constant";

export default function UserInfoCard() {
  const { isOpen, openModal, closeModal } = useModal();

  const handleSave = () => {
    console.log("Saving changes...");
    closeModal();
  };

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Personal Information
          </h4>

          <UserInfoCardDetails fields={USER_INFO_CARD_FIELDS} />
        </div>

        <button
          onClick={openModal}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
        >
          <UserProfileEditIcon />
          Edit
        </button>
      </div>

      <UserProfileEditModal
        isOpen={isOpen}
        onClose={closeModal}
        onSave={handleSave}
      />
    </div>
  );
}
