import type { MarketingLegalSection } from "@/features/marketing/marketingLegalDoc.type";

export default function MarketingLegalSectionBody({
  id,
  section,
}: {
  readonly id: string;
  readonly section: MarketingLegalSection;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-h`}
      className="scroll-mt-4 border-t border-awc-border py-4 first-of-type:border-t-0 first-of-type:pt-0"
    >
      <h2
        id={`${id}-h`}
        className="mb-2 text-[1.15rem] font-semibold text-awc-fg"
      >
        {section.heading}
      </h2>
      {section.body !== undefined ? (
        <p className="max-w-[68ch] leading-relaxed text-awc-fg-muted">
          {section.body}
          {section.mailto !== undefined ? (
            <>
              {" "}
              <a
                className="text-awc-blue-700 underline"
                href={`mailto:${section.mailto}`}
              >
                {section.mailto}
              </a>
              .
            </>
          ) : null}
        </p>
      ) : null}
      {section.items !== undefined ? (
        <ul className="my-2 list-disc space-y-1 pl-[1.4em] leading-relaxed text-awc-fg-muted">
          {section.items.map((item) => (
            <li key={item} className="max-w-[68ch]">
              {item}
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
