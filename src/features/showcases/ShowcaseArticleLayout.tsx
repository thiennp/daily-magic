import Link from "next/link";

import ShowcaseArticleBody from "@/features/showcases/ShowcaseArticleBody";
import ShowcaseWhatYouNeedBox from "@/features/showcases/ShowcaseWhatYouNeedBox";
import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

interface ShowcaseArticleLayoutProps {
  readonly article: ShowcaseArticle;
}

export default function ShowcaseArticleLayout({
  article,
}: ShowcaseArticleLayoutProps) {
  return (
    <article className="mx-auto max-w-3xl">
      <Link
        href="/showcases"
        className="text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
      >
        ← All examples
      </Link>
      <header className="mt-8 border-b border-gray-200 pb-8 dark:border-gray-800">
        <p className="text-sm font-medium text-brand-600 dark:text-brand-400">
          {article.category} · {article.readMinutes} min read
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-white/90">
          {article.title}
        </h1>
        <p className="mt-4 text-xl leading-relaxed text-gray-600 dark:text-gray-400">
          {article.subtitle}
        </p>
      </header>
      <div className="mt-8">
        <ShowcaseWhatYouNeedBox
          items={article.whatYouNeed}
          supportLevel={article.supportLevel}
        />
      </div>
      <div className="mt-10">
        <ShowcaseArticleBody sections={article.sections} />
      </div>
      <footer className="mt-12 rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
          Try this next
        </p>
        <Link
          href={article.tryNext.href}
          className="mt-2 inline-flex h-11 items-center rounded-lg bg-brand-500 px-5 text-sm font-medium text-white transition hover:bg-brand-600"
        >
          {article.tryNext.label}
        </Link>
      </footer>
    </article>
  );
}
