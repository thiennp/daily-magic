import Link from "next/link";

import WsTestPanel from "@/features/wsTest/WsTestPanel";

export default function WsTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-gray-900 sm:px-6">
      <div className="mb-6">
        <Link
          href="/"
          className="text-sm text-brand-600 transition hover:text-brand-700 dark:text-brand-400"
        >
          ← Back home
        </Link>
      </div>
      <WsTestPanel />
    </div>
  );
}
