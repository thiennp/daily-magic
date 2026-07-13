import type { ReactNode } from "react";

import AppIcon from "@/components/ui/icon/AppIcon";
import { CheckLineIcon, CopyIcon } from "@/icons";

const renderCopyableBashCommandCopyIcon = (
  copied: boolean,
  iconOnly: boolean,
): ReactNode => {
  if (copied) {
    return iconOnly ? (
      <AppIcon icon={CheckLineIcon} size="md" />
    ) : (
      <>
        <AppIcon icon={CheckLineIcon} size="xs" />
        Copied
      </>
    );
  }

  return iconOnly ? (
    <AppIcon icon={CopyIcon} size="md" />
  ) : (
    <>
      <AppIcon icon={CopyIcon} size="xs" />
      Copy
    </>
  );
};

export default renderCopyableBashCommandCopyIcon;
