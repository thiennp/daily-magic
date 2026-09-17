import {
  DEFAULT_WRITER_API_MODELS,
  type WriterApiProvider,
} from "./WriterApiProvider.constant";

export const WRITER_API_MODEL_AUTO = "auto";

export interface WriterApiModelSelectOption {
  readonly value: string;
  readonly label: string;
}

const autoOption = (
  provider: WriterApiProvider,
): WriterApiModelSelectOption => ({
  value: WRITER_API_MODEL_AUTO,
  label: `Auto (${DEFAULT_WRITER_API_MODELS[provider]})`,
});

export const WRITER_API_MODEL_SELECT_OPTIONS: Record<
  WriterApiProvider,
  readonly WriterApiModelSelectOption[]
> = {
  anthropic: [
    autoOption("anthropic"),
    { value: "claude-sonnet-4-20250514", label: "claude-sonnet-4-20250514" },
    {
      value: "claude-3-5-sonnet-20241022",
      label: "claude-3-5-sonnet-20241022",
    },
    { value: "claude-3-5-haiku-20241022", label: "claude-3-5-haiku-20241022" },
  ],
  openai: [
    autoOption("openai"),
    { value: "gpt-4.1-mini", label: "gpt-4.1-mini" },
    { value: "gpt-4.1", label: "gpt-4.1" },
    { value: "gpt-4o-mini", label: "gpt-4o-mini" },
  ],
  google: [
    autoOption("google"),
    { value: "gemini-2.0-flash", label: "gemini-2.0-flash" },
    { value: "gemini-2.5-flash", label: "gemini-2.5-flash" },
    { value: "gemini-2.5-pro", label: "gemini-2.5-pro" },
  ],
};
