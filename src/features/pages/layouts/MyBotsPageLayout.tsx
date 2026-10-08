import MyBotsPanel from "@/features/my-bots/MyBotsPanel";
import { APP_PAGE_STACK_CLASS } from "@/features/shell/appPageLayout.constant";

export default function MyBotsPageLayout() {
  return (
    <div className={APP_PAGE_STACK_CLASS}>
      <MyBotsPanel />
    </div>
  );
}
