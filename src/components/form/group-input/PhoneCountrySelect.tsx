import PhoneSelectChevronIcon from "@/components/form/group-input/PhoneSelectChevronIcon";
import type { PhoneCountryCode } from "@/components/form/group-input/PhoneInput.types";

interface PhoneCountrySelectProps {
  readonly countries: readonly PhoneCountryCode[];
  readonly selectedCountry: string;
  readonly position: "start" | "end";
  readonly onCountryChange: (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => void;
}

const POSITION_CLASS_MAP = {
  start: {
    container: "absolute",
    select:
      "appearance-none bg-none rounded-l-lg border-0 border-r border-awc-border bg-transparent py-3 pl-3.5 pr-8 leading-tight text-awc-fg focus:border-awc-blue-300 focus:outline-hidden focus:ring-3 focus:ring-awc-blue-600/10 dark:border-gray-800 dark:text-gray-400",
    chevron:
      "absolute inset-y-0 flex items-center text-awc-fg pointer-events-none bg-none right-3 dark:text-gray-400",
  },
  end: {
    container: "absolute right-0",
    select:
      "appearance-none bg-none rounded-r-lg border-0 border-l border-awc-border bg-transparent py-3 pl-3.5 pr-8 leading-tight text-awc-fg focus:border-awc-blue-300 focus:outline-hidden focus:ring-3 focus:ring-awc-blue-600/10 dark:border-gray-800 dark:text-gray-400",
    chevron:
      "absolute inset-y-0 flex items-center text-awc-fg pointer-events-none right-3 dark:text-gray-400",
  },
} as const;

export default function PhoneCountrySelect({
  countries,
  selectedCountry,
  position,
  onCountryChange,
}: PhoneCountrySelectProps) {
  const positionClasses = POSITION_CLASS_MAP[position];

  return (
    <div className={positionClasses.container}>
      <select
        value={selectedCountry}
        onChange={onCountryChange}
        className={positionClasses.select}
      >
        {countries.map((country) => (
          <option
            key={country.code}
            value={country.code}
            className="text-awc-fg dark:bg-gray-800 dark:text-gray-400"
          >
            {country.code}
          </option>
        ))}
      </select>
      <div className={positionClasses.chevron}>
        <PhoneSelectChevronIcon />
      </div>
    </div>
  );
}
