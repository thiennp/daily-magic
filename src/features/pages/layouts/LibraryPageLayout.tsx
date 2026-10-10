import { GuestAwarePageStack } from "@/features/empty-states/public-api/presentation";
import {
  LibraryPageClient,
  LibraryPageHeader,
} from "@/features/library/public-api/presentation";

export default function LibraryPageLayout() {
  return (
    <GuestAwarePageStack>
      <LibraryPageHeader />
      <LibraryPageClient />
    </GuestAwarePageStack>
  );
}
