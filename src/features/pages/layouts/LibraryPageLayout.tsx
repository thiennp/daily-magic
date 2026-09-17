import GuestAwarePageStack from "@/features/empty-states/GuestAwarePageStack";
import LibraryPageClient from "@/features/library/LibraryPageClient";
import LibraryPageHeader from "@/features/library/LibraryPageHeader";

export default function LibraryPageLayout() {
  return (
    <GuestAwarePageStack>
      <LibraryPageHeader />
      <LibraryPageClient />
    </GuestAwarePageStack>
  );
}
