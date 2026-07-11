interface MultiSelectChevronButtonProps {
  readonly isOpen: boolean;
  readonly onToggle: () => void;
}

export default function MultiSelectChevronButton({
  isOpen,
  onToggle,
}: MultiSelectChevronButtonProps) {
  return (
    <div className="flex items-center py-1 pl-1 pr-1 w-7">
      <button
        type="button"
        onClick={onToggle}
        className="w-5 h-5 text-gray-700 outline-hidden cursor-pointer focus:outline-hidden dark:text-gray-400"
      >
        <svg
          className={`stroke-current ${isOpen ? "rotate-180" : ""}`}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.79175 7.39551L10.0001 12.6038L15.2084 7.39551"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
