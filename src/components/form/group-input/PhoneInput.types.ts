export interface PhoneCountryCode {
  readonly code: string;
  readonly label: string;
}

export interface PhoneInputProps {
  readonly countries: readonly PhoneCountryCode[];
  readonly placeholder?: string;
  readonly onChange?: (phoneNumber: string) => void;
  readonly selectPosition?: "start" | "end";
}
