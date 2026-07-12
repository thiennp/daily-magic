import HomeAuthenticatedView from "@/features/home/HomeAuthenticatedView";
import type { GlobalRoleValue } from "@/lib/auth/roles";

interface HomePageLayoutProps {
  readonly user: {
    readonly email: string;
    readonly name: string | null;
    readonly globalRole: GlobalRoleValue;
  };
}

export default function HomePageLayout({ user }: HomePageLayoutProps) {
  return <HomeAuthenticatedView user={user} />;
}
