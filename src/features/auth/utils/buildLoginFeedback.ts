import type { AlertVariant } from "@/components/ui/alert/Alert.types";

interface LoginFeedback {
  readonly variant: AlertVariant;
  readonly title: string;
  readonly message: string;
}

export type { LoginFeedback };

export const buildLoginFeedback = (message: string): LoginFeedback => {
  if (message.includes("Check your inbox")) {
    return {
      variant: "success",
      title: "Sign-in link sent",
      message,
    };
  }

  return {
    variant: "error",
    title: "Sign-in failed",
    message,
  };
};
