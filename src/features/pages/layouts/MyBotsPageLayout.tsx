import AppPageHeader from "@/components/surfaces/AppPageHeader";
import MyBotsPanel from "@/features/my-bots/MyBotsPanel";
import { MY_BOTS_COPY } from "@/features/my-bots/myBotsCopy.constant";
import { APP_PAGE_STACK_CLASS } from "@/features/shell/appPageLayout.constant";

export default function MyBotsPageLayout() {
  return (
    <div className={APP_PAGE_STACK_CLASS}>
      <AppPageHeader
        title={MY_BOTS_COPY.title}
        description={MY_BOTS_COPY.description}
      />
      <MyBotsPanel />
    </div>
  );
}
