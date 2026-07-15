import type { MultiSelectOption } from "@/components/form/MultiSelect.types";

interface MultiSelectOptionsListProps {
  readonly options: readonly MultiSelectOption[];
  readonly selectedOptions: readonly string[];
  readonly onSelect: (optionValue: string) => void;
}

export default function MultiSelectOptionsList({
  options,
  selectedOptions,
  onSelect,
}: MultiSelectOptionsListProps) {
  return (
    <div
      className="absolute left-0 z-40 w-full overflow-y-auto bg-white rounded-lg shadow-sm top-full max-h-select dark:bg-gray-800"
      onClick={(event) => event.stopPropagation()}
    >
      <div className="flex flex-col">
        {options.map((option, index) => (
          <div key={index}>
            <div
              className="hover:bg-primary/5 w-full cursor-pointer rounded-t border-b border-gray-200 dark:border-gray-800"
              onClick={() => onSelect(option.value)}
            >
              <div
                className={`relative flex w-full items-center p-2 pl-2 ${
                  selectedOptions.includes(option.value) ? "bg-primary/10" : ""
                }`}
              >
                <div className="mx-2 leading-6 text-gray-800 dark:text-white/90">
                  {option.text}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
