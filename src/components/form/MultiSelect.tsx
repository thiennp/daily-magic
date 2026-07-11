"use client";

import { useState } from "react";
import MultiSelectChevronButton from "@/components/form/MultiSelectChevronButton";
import MultiSelectOptionsList from "@/components/form/MultiSelectOptionsList";
import MultiSelectSelectedTags from "@/components/form/MultiSelectSelectedTags";
import type { MultiSelectProps } from "@/components/form/MultiSelect.types";

export default function MultiSelect({
  label,
  options,
  defaultSelected = [],
  onChange,
  disabled = false,
}: MultiSelectProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([
    ...defaultSelected,
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen((previous) => !previous);
    }
  };

  const handleSelect = (optionValue: string) => {
    const newSelectedOptions = selectedOptions.includes(optionValue)
      ? selectedOptions.filter((value) => value !== optionValue)
      : [...selectedOptions, optionValue];

    setSelectedOptions(newSelectedOptions);
    onChange?.(newSelectedOptions);
  };

  const removeOption = (_index: number, value: string) => {
    const newSelectedOptions = selectedOptions.filter(
      (option) => option !== value,
    );
    setSelectedOptions(newSelectedOptions);
    onChange?.(newSelectedOptions);
  };

  const selectedValuesText = selectedOptions.map(
    (value) => options.find((option) => option.value === value)?.text ?? "",
  );

  return (
    <div className="w-full">
      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
        {label}
      </label>

      <div className="relative z-20 inline-block w-full">
        <div className="relative flex flex-col items-center">
          <div onClick={toggleDropdown} className="w-full">
            <div className="mb-2 flex h-11 rounded-lg border border-gray-300 py-1.5 pl-3 pr-3 shadow-theme-xs outline-hidden transition focus:border-brand-300 focus:shadow-focus-ring dark:border-gray-700 dark:bg-gray-900 dark:focus:border-brand-300">
              <div className="flex flex-wrap flex-auto gap-2">
                <MultiSelectSelectedTags
                  selectedValuesText={selectedValuesText}
                  selectedOptions={selectedOptions}
                  onRemoveOption={removeOption}
                />
              </div>
              <MultiSelectChevronButton
                isOpen={isOpen}
                onToggle={toggleDropdown}
              />
            </div>
          </div>

          {isOpen && (
            <MultiSelectOptionsList
              options={options}
              selectedOptions={selectedOptions}
              onSelect={handleSelect}
            />
          )}
        </div>
      </div>
    </div>
  );
}
