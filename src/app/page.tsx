import { getAuthActor } from "@/lib/auth/auth";
import HomeAuthenticatedView from "@/features/home/HomeAuthenticatedView";
import HomeLoginView from "@/features/home/HomeLoginView";
import AppShell from "@/features/shell/AppShell";

export const dynamic = "force-dynamic";

export default async function Home() {
  const actor = await getAuthActor();

  if (actor) {
    return (
      <AppShell>
        <HomeAuthenticatedView
          user={{
            email: actor.email,
            name: actor.name,
            globalRole: actor.globalRole,
          }}
        />
      </AppShell>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-10 dark:bg-gray-900">
      <main className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-theme-sm dark:border-gray-800 dark:bg-white/[0.03] sm:p-10">
        <HomeLoginView />
      </main>
    </div>
  );
}
