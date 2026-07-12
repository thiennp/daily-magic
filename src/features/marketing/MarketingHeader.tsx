import Link from "next/link";

interface MarketingHeaderProps {
  readonly showSignIn?: boolean;
}

export default function MarketingHeader({
  showSignIn = true,
}: MarketingHeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-gray-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-gray-900"
        >
          Daily Magic
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link
            href="/styleguide"
            className="text-gray-600 transition hover:text-brand-600"
          >
            Styleguide
          </Link>
          {showSignIn ? (
            <Link
              href="/login"
              className="text-gray-600 transition hover:text-brand-600"
            >
              Sign in
            </Link>
          ) : null}
          <Link
            href="/#get-started"
            className="inline-flex h-10 items-center rounded-lg bg-brand-500 px-4 font-medium text-white transition hover:bg-brand-600"
          >
            Get started
          </Link>
        </nav>
      </div>
    </header>
  );
}
