import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload, FiX, FiImage } from "react-icons/fi";

function CustomUploadMuitiImages({
  name,
  label,
  register,
  watch,
  setValue,
  errors,
  defaultValue = [],
}) {
  const [previews, setPreviews] = useState(defaultValue);
  const [files, setFiles] = useState([]);

  // Register the field with react-hook-form
  register(name);

  // Get current value from react-hook-form
  const currentValue = watch(name) || [];

  // Handle file drop/selection
  const onDrop = useCallback(
    (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      const updatedFiles = [...files, ...newFiles];
      setFiles(updatedFiles);

      // Update form value with File objects
      setValue(name, updatedFiles);

      // Update previews
      setPreviews([...previews, ...newFiles.map((file) => file.preview)]);
    },
    [files, name, previews, setValue]
  );

  // Remove an image
  const removeImage = (index) => {
    const updatedFiles = [...files];
    const updatedPreviews = [...previews];

    // Revoke object URL if it's a new file
    if (updatedFiles[index]) {
      URL.revokeObjectURL(updatedFiles[index].preview);
    }

    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);

    setFiles(updatedFiles);
    setPreviews(updatedPreviews);
    setValue(name, updatedFiles);
  };

  // Configure dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    multiple: true,
  });

  // Combine existing and new previews
  const allPreviews = [...currentValue, ...previews].filter(
    (item) => typeof item === "string"
  );

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      {/* Dropzone area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer ${
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-2">
          <FiUpload className="h-8 w-8 text-gray-400" />
          {isDragActive ? (
            <p className="text-sm text-gray-600">Drop the images here...</p>
          ) : (
            <p className="text-sm text-gray-600">
              Drag & drop images here, or click to select
            </p>
          )}
          <p className="text-xs text-gray-500">
            Supports JPG, PNG, WEBP (max 10MB each)
          </p>
        </div>
      </div>

      {/* Error message */}
      {errors[name] && (
        <p className="mt-1 text-sm text-red-600">{errors[name].message}</p>
      )}

      {/* Preview area */}
      {allPreviews.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Selected Images ({allPreviews.length})
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {allPreviews.map((preview, index) => (
              <div
                key={index}
                className="relative group rounded-md overflow-hidden border border-gray-200"
              >
                {preview.startsWith("blob:") || preview.startsWith("http") ? (
                  <img
                    src={preview}
                    alt={`Preview ${index}`}
                    className="w-full h-24 object-cover"
                  />
                ) : (
                  <div className="w-full h-24 bg-gray-100 flex items-center justify-center">
                    <FiImage className="h-8 w-8 text-gray-400" />
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <FiX className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomUploadMuitiImages;
