import escapeHtmlText from "@/lib/email/escapeHtmlText";

export default function escapeHtmlAttribute(value: string): string {
  return escapeHtmlText(value);
}
