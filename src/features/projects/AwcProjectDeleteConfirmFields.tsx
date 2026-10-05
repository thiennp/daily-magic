"use client";

import { useId, useState } from "react";

import Button from "@/components/ui/button/Button";
import { APP_SURFACE_FIELD_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import { AWC_PROJECT_DELETE_COPY } from "@/features/projects/awcProjectDeleteCopy.constant";
import isProjectDeleteConfirmNameMatch from "@/features/projects/utils/isProjectDeleteConfirmNameMatch";

interface AwcProjectDeleteConfirmFieldsProps {
  readonly projectName: string;
  readonly pending: boolean;
  readonly errorMessage: string | null;
  readonly showTitle: boolean;
  readonly onConfirm: () => void;
  readonly onCancel: () => void;
}

const AwcProjectDeleteConfirmFields = ({
  projectName,
  pending,
  errorMessage,
  showTitle,
  onConfirm,
  onCancel,
}: AwcProjectDeleteConfirmFieldsProps) => {
  const inputId = useId();
  const [typedName, setTypedName] = useState("");
  const canConfirm =
    !pending && isProjectDeleteConfirmNameMatch(typedName, projectName);

  return (
    <div className="space-y-2">
      {showTitle ? (
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
          {AWC_PROJECT_DELETE_COPY.title}
        </h2>
      ) : null}
      <p className="text-xs text-gray-600 dark:text-gray-300">
        {AWC_PROJECT_DELETE_COPY.scope}
      </p>
      <label
        htmlFor={inputId}
        className="block text-xs font-medium text-gray-800 dark:text-white/90"
      >
        {AWC_PROJECT_DELETE_COPY.typeToConfirmPrefix}{" "}
        <span className="break-all font-semibold">{projectName}</span>{" "}
        {AWC_PROJECT_DELETE_COPY.typeToConfirmSuffix}
      </label>
      <input
        id={inputId}
        type="text"
        value={typedName}
        onChange={(event) => {
          setTypedName(event.target.value);
        }}
        className={APP_SURFACE_FIELD_CLASS}
        autoComplete="off"
        spellCheck={false}
        disabled={pending}
      />
      {errorMessage !== null ? (
        <p className="text-xs text-error-600 dark:text-error-400" role="alert">
          {errorMessage}
        </p>
      ) : null}
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          size="sm"
          disabled={!canConfirm}
          className="min-h-11 bg-error-600 hover:bg-error-700 sm:min-h-0"
          onClick={onConfirm}
        >
          {pending
            ? AWC_PROJECT_DELETE_COPY.deleting
            : AWC_PROJECT_DELETE_COPY.confirm}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={pending}
          className="min-h-11 sm:min-h-0"
          onClick={onCancel}
        >
          {AWC_PROJECT_DELETE_COPY.cancel}
        </Button>
      </div>
    </div>
  );
};

export default AwcProjectDeleteConfirmFields;
