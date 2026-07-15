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
      "appearance-none bg-none rounded-l-lg border-0 border-r border-gray-200 bg-transparent py-3 pl-3.5 pr-8 leading-tight text-gray-700 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:text-gray-400",
    chevron:
      "absolute inset-y-0 flex items-center text-gray-700 pointer-events-none bg-none right-3 dark:text-gray-400",
  },
  end: {
    container: "absolute right-0",
    select:
      "appearance-none bg-none rounded-r-lg border-0 border-l border-gray-200 bg-transparent py-3 pl-3.5 pr-8 leading-tight text-gray-700 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:text-gray-400",
    chevron:
      "absolute inset-y-0 flex items-center text-gray-700 pointer-events-none right-3 dark:text-gray-400",
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
            className="text-gray-700 dark:bg-gray-800 dark:text-gray-400"
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
