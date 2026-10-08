import { useId } from "react";

interface InfoTipProps {
  readonly text: string;
  readonly label?: string;
}

/** Small "i" button; the tip text is read by assistive tech and shown on hover or focus. */
export default function InfoTip({ text, label = "More info" }: InfoTipProps) {
  const id = useId();
  return (
    <span className="group relative inline-flex align-middle">
      <button
        type="button"
        aria-label={label}
        aria-describedby={id}
        className="inline-grid size-[18px] place-items-center rounded-full border-[1.5px] border-awc-fg-subtle bg-transparent p-0 text-[11px] font-bold leading-none text-awc-fg-muted hover:border-awc-blue-600 hover:bg-awc-blue-50 hover:text-awc-blue-700 focus-visible:border-awc-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-awc-blue-600"
      >
        i
      </button>
      <span
        id={id}
        role="tooltip"
        className="pointer-events-none absolute left-1/2 top-full z-30 mt-2 hidden w-max max-w-[min(300px,calc(100vw-24px))] -translate-x-1/2 rounded-md bg-awc-fg px-3 py-2 text-left text-[13px] font-normal normal-case leading-snug tracking-normal text-white shadow-lg group-focus-within:block group-hover:block"
      >
        {text}
      </span>
    </span>
  );
}
