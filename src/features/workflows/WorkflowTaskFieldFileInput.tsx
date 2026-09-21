"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import { postWorkflowFieldUpload } from "@/features/workflows/postWorkflowFieldUpload";
import { useWorkflowUploadExcerptRegistrar } from "@/features/workflows/WorkflowUploadExcerptContext";
import { workflowFieldInputClassName } from "@/features/workflows/utils/workflowFieldInputClassName";
import { parseWorkflowFieldUploadRef } from "@/lib/workflows/parseWorkflowFieldUploadRef";
import { defaultWorkflowFileAccept } from "@/lib/workflows/mimeMatchesWorkflowFileAccept";
import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";

interface WorkflowTaskFieldFileInputProps {
  readonly field: WorkflowFieldDefinition;
  readonly value: string;
  readonly hasError: boolean;
  readonly onChange: (value: string) => void;
}

export default function WorkflowTaskFieldFileInput({
  field,
  value,
  hasError,
  onChange,
}: WorkflowTaskFieldFileInputProps) {
  const registerUploadExcerpt = useWorkflowUploadExcerptRegistrar();
  const [fileName, setFileName] = useState<string>("");
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const uploadId = parseWorkflowFieldUploadRef(value);
  const accept = field.accept ?? defaultWorkflowFileAccept();

  const onDrop = useCallback(
    async (files: readonly File[]) => {
      const file = files[0];
      if (file === undefined) {
        return;
      }

      setUploadError(null);
      setIsUploading(true);
      const result = await postWorkflowFieldUpload({ file, accept });
      setIsUploading(false);

      if (!result.ok) {
        setUploadError(result.errorMessage);
        return;
      }

      setFileName(result.fileName);
      registerUploadExcerpt(result.uploadId, result.excerpt);
      onChange(result.ref);
    },
    [accept, onChange, registerUploadExcerpt],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files) => {
      void onDrop(files);
    },
    multiple: false,
    disabled: isUploading,
  });

  return (
    <div className="space-y-2">
      <div
        {...getRootProps()}
        className={`${workflowFieldInputClassName(hasError)} cursor-pointer border-dashed py-6 text-center text-sm ${
          isDragActive ? "border-brand-500 bg-brand-50/40" : ""
        }`}
      >
        <input {...getInputProps()} />
        {isUploading
          ? "Uploading…"
          : isDragActive
            ? "Drop file here"
            : "PDF or image, max 5 MB"}
      </div>
      {uploadId !== null ? (
        <p className="text-xs text-gray-600 dark:text-gray-400">
          Attached: {fileName.length > 0 ? fileName : uploadId}
          {" · "}
          <a
            className="text-brand-700 underline dark:text-brand-300"
            href={`/api/workflows/field-uploads?uploadId=${encodeURIComponent(uploadId)}`}
            target="_blank"
            rel="noreferrer"
          >
            Download original
          </a>
        </p>
      ) : null}
      {uploadError ? (
        <p className="text-xs text-error-600 dark:text-error-400">
          {uploadError}
        </p>
      ) : null}
    </div>
  );
}
