import Link from "next/link";

import { COMPANIES_ENTITY_LABEL } from "@/lib/admin/companyGroupCopy.constant";
import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";

const FOOTER_PRODUCT_LINKS = [
  { label: "Send a task", href: "/agent" },
  { label: "Reports", href: "/reports" },
  { label: "Styleguide", href: "/styleguide" },
] as const;

const FOOTER_ADMIN_LINKS = [
  { label: COMPANIES_ENTITY_LABEL, href: "/admin/groups" },
  { label: "Users", href: "/admin/users" },
] as const;

export default function MarketingFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="text-sm font-semibold text-gray-900">
            {AGENT_WITCH_PRODUCT_NAME}
          </p>
          <p className="mt-2 max-w-xs text-sm text-gray-600">
            Send AI tasks to your team&apos;s Macs with approval rules and a
            clear history of every job.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Product
          </p>
          <ul className="mt-3 space-y-2">
            {FOOTER_PRODUCT_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-gray-600 transition hover:text-brand-600"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Admin
          </p>
          <ul className="mt-3 space-y-2">
            {FOOTER_ADMIN_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-gray-600 transition hover:text-brand-600"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-200 py-4 text-center text-xs text-gray-500">
        AI tasks for teams — with approval when you need it.
      </div>
    </footer>
  );
}
