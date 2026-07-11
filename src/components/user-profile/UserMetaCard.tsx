"use client";

import { useModal } from "@/hooks/useModal";
import UserMetaCardProfile from "@/components/user-profile/UserMetaCardProfile";
import UserProfileEditIcon from "@/components/user-profile/UserProfileEditIcon";
import UserProfileEditModal from "@/components/user-profile/UserProfileEditModal";

export default function UserMetaCard() {
  const { isOpen, openModal, closeModal } = useModal();

  const handleSave = () => {
    console.log("Saving changes...");
    closeModal();
  };

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <UserMetaCardProfile />
          <button
            onClick={openModal}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
          >
            <UserProfileEditIcon />
            Edit
          </button>
        </div>
      </div>
      <UserProfileEditModal
        isOpen={isOpen}
        onClose={closeModal}
        onSave={handleSave}
      />
    </>
  );
}
