import React, { useState, useEffect } from "react";

const CustomImageUpload = ({
  name,
  register,
  errors,
  label = "Upload Image",
  watch, // Add watch from react-hook-form
  setValue, // Add setValue from react-hook-form
  defaultValue = null, // For editing existing images
}) => {
  const [preview, setPreview] = useState(defaultValue);
  const watchedFile = watch ? watch(name) : null;

  useEffect(() => {
    // Handle file preview
    if (watchedFile && watchedFile[0]) {
      const file = watchedFile[0];
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }, [watchedFile]);

  const handleRemoveImage = () => {
    setPreview(null);
    if (setValue) {
      setValue(name, null);
    }
    // Clear the file input
    const fileInput = document.querySelector(`input[name="${name}"]`);
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>

      {/* File Input */}
      <input
        type="file"
        accept="image/*"
        multiple
        {...register(name)}
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded cursor-pointer bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />

      {/* Image Preview */}
      {preview && (
        <div className="relative inline-block">
          <img
            src={preview}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-lg border border-gray-300 shadow-sm"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            ×
          </button>
        </div>
      )}

      {/* Error Message */}
      {errors[name] && (
        <span className="text-red-500 text-sm">{errors[name]?.message}</span>
      )}
    </div>
  );
};

export default CustomImageUpload;
