import AccountHeader from "@/features/account/AccountHeader";
import { ACCOUNT_COPY } from "@/features/account/accountCopy.constant";
import { APP_PAGE_STACK_CLASS } from "@/features/shell/appPageLayout.constant";

export default function AccountLoadingSkeleton() {
  return (
    <div className={APP_PAGE_STACK_CLASS}>
      <AccountHeader />
      <p role="status" className="sr-only">
        {ACCOUNT_COPY.loading}
      </p>
      <div aria-hidden="true" className="space-y-4">
        {[60, 40, 70].map((width) => (
          <div
            key={width}
            className="h-24 animate-pulse rounded-xl bg-awc-fill"
            style={{ width: `${width + 30}%` }}
          />
        ))}
      </div>
    </div>
  );
}
