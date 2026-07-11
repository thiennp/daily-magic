import MultiSelectRemoveIcon from "@/components/form/MultiSelectRemoveIcon";

interface MultiSelectSelectedTagsProps {
  readonly selectedValuesText: readonly string[];
  readonly selectedOptions: readonly string[];
  readonly onRemoveOption: (index: number, value: string) => void;
}

export default function MultiSelectSelectedTags({
  selectedValuesText,
  selectedOptions,
  onRemoveOption,
}: MultiSelectSelectedTagsProps) {
  if (selectedValuesText.length > 0) {
    return (
      <>
        {selectedValuesText.map((text, index) => (
          <div
            key={index}
            className="group flex items-center justify-center rounded-full border-[0.7px] border-transparent bg-gray-100 py-1 pl-2.5 pr-2 text-sm text-gray-800 hover:border-gray-200 dark:bg-gray-800 dark:text-white/90 dark:hover:border-gray-800"
          >
            <span className="flex-initial max-w-full">{text}</span>
            <div className="flex flex-row-reverse flex-auto">
              <div
                onClick={() => onRemoveOption(index, selectedOptions[index])}
                className="pl-2 text-gray-500 cursor-pointer group-hover:text-gray-400 dark:text-gray-400"
              >
                <MultiSelectRemoveIcon />
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }

  return (
    <input
      placeholder="Select option"
      className="w-full h-full p-1 pr-2 text-sm bg-transparent border-0 outline-hidden appearance-none placeholder:text-gray-800 focus:border-0 focus:outline-hidden focus:ring-0 dark:placeholder:text-white/90"
      readOnly
      value="Select option"
    />
  );
}
