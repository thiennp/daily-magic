import { USER_META_SOCIAL_LINKS } from "@/components/user-profile/userMetaSocialLinks.constant";

const SOCIAL_LINK_BUTTON_CLASS =
  "flex h-11 w-11 items-center justify-center gap-2 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200";

export default function UserMetaSocialLinks() {
  return (
    <div className="flex items-center order-2 gap-2 grow xl:order-3 xl:justify-end">
      {USER_META_SOCIAL_LINKS.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          className={SOCIAL_LINK_BUTTON_CLASS}
        >
          <svg
            className="fill-current"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d={link.path} fill="" />
          </svg>
        </a>
      ))}
    </div>
  );
}
