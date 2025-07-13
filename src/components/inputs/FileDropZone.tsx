/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useState, useEffect } from "react";
import { useController } from "react-hook-form";
import type { Control } from "react-hook-form";

type FileDropZoneProps = {
  name: string;
  control: Control<any>;
  label?: string;
  accept: string;
  maxSizeMB: number;
  allowedTypes: string[];
  multiple?: boolean;
  required?: boolean;
};

export default function FileDropZone({
  name,
  control,
  //   label = "Upload File",
  label,
  accept,
  maxSizeMB,
  allowedTypes,
  multiple = false,
  required = false,
}: FileDropZoneProps) {
  const {
    field: { value, onChange, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: {
      ...(required && {
        required: { value: true, message: `${label} is required` },
      }),
      validate: {
        fileCount: (files: FileList | null) => {
          if (required && (!files || files.length === 0))
            return `${label} is required`;
          if (!multiple && files && files.length > 1)
            return `Only one file allowed`;
          return true;
        },
        fileType: (files: FileList | null) => {
          if (!files) return true;
          for (const file of files) {
            if (!allowedTypes.includes(file.type)) {
              return `Invalid file type: ${file.name}`;
            }
          }
          return true;
        },
        fileSize: (files: FileList | null) => {
          if (!files) return true;
          for (const file of files) {
            if (file.size > maxSizeMB * 1024 * 1024) {
              return `${file.name} exceeds max size of ${maxSizeMB} MB`;
            }
          }
          return true;
        },
      },
    },
  });

  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (value && value.length > 0) {
      const file = value[0];
      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
      } else {
        setPreview(null);
      }
    } else {
      setPreview(null);
    }
  }, [value]);

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      onChange(multiple ? files : files.length > 0 ? [files[0]] : null);
    },
    [onChange, multiple]
  );

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    onChange(multiple ? files : files && files.length > 0 ? [files[0]] : null);
  };

  return (
    <div>
      <label className="block mb-2 font-semibold">{label}</label>

      <div
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        className={`p-4 border-2 border-dashed rounded cursor-pointer ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        onClick={() => ref?.current?.click?.()}
      >
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          ref={ref}
          onChange={onInputChange}
          className="hidden"
        />

        {preview ? (
          <img
            src={preview}
            alt="preview"
            className="max-h-40 mx-auto rounded"
            draggable={false}
          />
        ) : value && value.length > 0 ? (
          <p className="text-center">{value[0].name}</p>
        ) : (
          <p className="text-center text-gray-500">
            Drag & drop or click to select a file
          </p>
        )}
      </div>

      {error && (
        <p
          className="mt-1 text-red-600 text-sm"
          role="alert"
          aria-live="assertive"
        >
          {error.message}
        </p>
      )}
    </div>
  );
}
