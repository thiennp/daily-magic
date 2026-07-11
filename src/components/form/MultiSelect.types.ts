export interface MultiSelectOption {
  readonly value: string;
  readonly text: string;
  readonly selected: boolean;
}

export interface MultiSelectProps {
  readonly label: string;
  readonly options: readonly MultiSelectOption[];
  readonly defaultSelected?: readonly string[];
  readonly onChange?: (selected: string[]) => void;
  readonly disabled?: boolean;
}
