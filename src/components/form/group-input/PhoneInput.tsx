"use client";

import { useState } from "react";
import PhoneCountrySelect from "@/components/form/group-input/PhoneCountrySelect";
import type { PhoneInputProps } from "@/components/form/group-input/PhoneInput.types";

export default function PhoneInput({
  countries,
  placeholder = "+1 (555) 000-0000",
  onChange,
  selectPosition = "start",
}: PhoneInputProps) {
  const [selectedCountry, setSelectedCountry] = useState<string>("US");
  const [phoneNumber, setPhoneNumber] = useState<string>("+1");

  const countryCodes: Record<string, string> = countries.reduce<
    Record<string, string>
  >((accumulator, { code, label }) => ({ ...accumulator, [code]: label }), {});

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountry = event.target.value;
    setSelectedCountry(newCountry);
    setPhoneNumber(countryCodes[newCountry]);
    onChange?.(countryCodes[newCountry]);
  };

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newPhoneNumber = event.target.value;
    setPhoneNumber(newPhoneNumber);
    onChange?.(newPhoneNumber);
  };

  return (
    <div className="relative flex">
      {selectPosition === "start" && (
        <PhoneCountrySelect
          countries={countries}
          selectedCountry={selectedCountry}
          position="start"
          onCountryChange={handleCountryChange}
        />
      )}

      <input
        type="tel"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        placeholder={placeholder}
        className={`dark:bg-dark-900 h-11 w-full ${
          selectPosition === "start" ? "pl-[84px]" : "pr-[84px]"
        } rounded-lg border border-gray-300 bg-transparent py-3 px-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800`}
      />

      {selectPosition === "end" && (
        <PhoneCountrySelect
          countries={countries}
          selectedCountry={selectedCountry}
          position="end"
          onCountryChange={handleCountryChange}
        />
      )}
    </div>
  );
}
