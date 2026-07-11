import { GlobalRole, type GlobalRoleValue } from "@/lib/auth/roles";
import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      globalRole: GlobalRoleValue;
    };
  }

  interface User {
    globalRole?: GlobalRoleValue;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    globalRole?: GlobalRoleValue;
  }
}

export { GlobalRole };
