import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import CustomInput from "../CustomFileds/CustomInput";

function IncludesExcludes() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  // Field arrays for inclusions and exclusions
  const {
    fields: inclusionFields,
    append: appendInclusion,
    remove: removeInclusion,
  } = useFieldArray({
    control,
    name: "includes",
  });

  const {
    fields: exclusionFields,
    append: appendExclusion,
    remove: removeExclusion,
  } = useFieldArray({
    control,
    name: "excludes",
  });

  const handleAddInclusion = () => {
    appendInclusion("");
  };

  const handleAddExclusion = () => {
    appendExclusion("");
  };

  return (
    <div className="md:col-span-3 bg-gray-100 p-3 rounded-lg">
      <div className="grid grid-cols-1 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Inclusions & Exclusions
          </h3>
        </div>

        {/* Inclusions Section */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-md font-medium text-green-600">Inclusions</h4>
            <button
              type="button"
              onClick={handleAddInclusion}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
            >
              + Add Inclusion
            </button>
          </div>

          {inclusionFields.length === 0 ? (
            <p className="text-gray-500 text-sm italic">
              No inclusions added yet.
            </p>
          ) : (
            <div className="space-y-3">
              {inclusionFields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex items-center gap-3 bg-gray-50 p-3 rounded-md"
                >
                  <div className="flex-1">
                    <CustomInput
                      name={`includes.${index}`}
                      register={register}
                      errors={errors}
                      placeholder="Enter inclusion (e.g., Meals, Cruise, Transfers)"
                      validationRules={{
                        required: "Inclusion is required",
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeInclusion(index)}
                    className="text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded"
                  >
                    ✕ Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Exclusions Section */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-md font-medium text-red-600">Exclusions</h4>
            <button
              type="button"
              onClick={handleAddExclusion}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
            >
              + Add Exclusion
            </button>
          </div>

          {exclusionFields.length === 0 ? (
            <p className="text-gray-500 text-sm italic">
              No exclusions added yet.
            </p>
          ) : (
            <div className="space-y-3">
              {exclusionFields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex items-center gap-3 bg-gray-50 p-3 rounded-md"
                >
                  <div className="flex-1">
                    <CustomInput
                      name={`excludes.${index}`}
                      register={register}
                      errors={errors}
                      placeholder="Enter exclusion (e.g., Flights)"
                      validationRules={{
                        required: "Exclusion is required",
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeExclusion(index)}
                    className="text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded"
                  >
                    ✕ Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default IncludesExcludes;
