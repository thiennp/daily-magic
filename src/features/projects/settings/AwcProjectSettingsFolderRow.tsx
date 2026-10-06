import AwcProjectPathDisplay from "@/features/projects/AwcProjectPathDisplay";
import { PROJECT_PAGE_LAYOUT_V2_COPY as C } from "@/features/projects/projectPageLayoutV2Copy.constant";

/**
 * Project path + Copy — moved here from the project header in V5-3 (I27:
 * header keeps one action; Copy path lives in Settings). Every role sees it,
 * as in the header before. V5-11 restyles (middle-ellipsis tooltip, #17).
 */
export default function AwcProjectSettingsFolderRow({
  folderPath,
}: {
  readonly folderPath: string;
}) {
  return (
    <section className="flex min-w-0 flex-col gap-2" aria-labelledby="p-set-folder-h">
      <h3
        id="p-set-folder-h"
        className="text-[13px] font-semibold text-gray-500 dark:text-gray-400"
      >
        {C.pathLabel}
      </h3>
      <div className="min-w-0 max-w-full overflow-hidden px-1">
        <AwcProjectPathDisplay folderPath={folderPath} />
      </div>
    </section>
  );
}
