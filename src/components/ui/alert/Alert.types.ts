export type AlertVariant = "success" | "error" | "warning" | "info";

export interface AlertProps {
  readonly variant: AlertVariant;
  readonly title: string;
  readonly message: string;
  readonly showLink?: boolean;
  readonly linkHref?: string;
  readonly linkText?: string;
}
