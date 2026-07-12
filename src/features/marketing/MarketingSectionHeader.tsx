interface MarketingSectionHeaderProps {
  readonly eyebrow?: string;
  readonly title: string;
  readonly description?: string;
  readonly align?: "left" | "center";
  readonly headingId?: string;
}

export default function MarketingSectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  headingId,
}: MarketingSectionHeaderProps) {
  const alignment =
    align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl";

  return (
    <header className={alignment}>
      {eyebrow !== undefined && eyebrow.length > 0 ? (
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={headingId}
        className="mt-2 text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl"
      >
        {title}
      </h2>
      {description !== undefined && description.length > 0 ? (
        <p className="mt-3 text-base leading-relaxed text-gray-600">
          {description}
        </p>
      ) : null}
    </header>
  );
}
