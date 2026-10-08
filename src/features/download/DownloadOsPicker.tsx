import { APP_SURFACE_FIELD_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import {
  DOWNLOAD_OS_KEYS,
  DOWNLOAD_OS_OPTIONS,
  type DownloadOsKey,
} from "@/features/download/downloadOsOptions";

interface DownloadOsPickerProps {
  readonly os: DownloadOsKey;
  readonly fileIndex: number;
  readonly onOsChange: (os: DownloadOsKey) => void;
  readonly onFileChange: (index: number) => void;
}

/** "Your computer" segmented control plus the file-variant select. */
export default function DownloadOsPicker({
  os,
  fileIndex,
  onOsChange,
  onFileChange,
}: DownloadOsPickerProps) {
  const option = DOWNLOAD_OS_OPTIONS[os];
  return (
    <>
      <div className="flex flex-col gap-1">
        <span id="download-os-label" className="text-[13px] font-medium">
          Your computer
        </span>
        <div
          role="group"
          aria-labelledby="download-os-label"
          className="inline-flex w-fit max-w-full flex-wrap gap-0.5 rounded-lg bg-awc-fill p-[3px]"
        >
          {DOWNLOAD_OS_KEYS.map((key) => (
            <button
              key={key}
              type="button"
              aria-pressed={os === key}
              onClick={() => onOsChange(key)}
              className={`min-h-[30px] rounded-md px-3 text-sm ${os === key ? "bg-awc-surface font-semibold text-awc-fg shadow-sm" : "font-medium text-awc-fg-muted"}`}
            >
              {DOWNLOAD_OS_OPTIONS[key].name}
            </button>
          ))}
        </div>
      </div>
      {option.files.length > 1 ? (
        <div className="flex flex-col gap-1">
          <label htmlFor="download-file" className="text-[13px] font-medium">
            Version for {option.name}
          </label>
          <select
            id="download-file"
            value={fileIndex}
            onChange={(event) => onFileChange(Number(event.target.value))}
            className={APP_SURFACE_FIELD_CLASS}
          >
            {option.files.map((item, index) => (
              <option key={item.name} value={index}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      ) : null}
    </>
  );
}
