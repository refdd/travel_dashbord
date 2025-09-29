import React from "react";
import CustomInput from "../CustomFileds/CustomInput";
import { useFormContext } from "react-hook-form";
import CustomTextEditor from "../CustomFileds/CustomTextEditor";

function TourDetails() {
  const { register, errors, control } = useFormContext();
  return (
    <div className="md:col-span-3 bg-gray-100 p-3 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="md:col-span-3">
          <h3 className="text-lg font-semibold mb-4">Tour Details</h3>
        </div>
        <CustomInput
          name="duration"
          register={register}
          errors={errors}
          placeholder="Duration (days)"
          type="number"
          validationRules={{
            required: "Duration is required",
            min: { value: 1, message: "Duration must be at least 1 day" },
          }}
        />
        <CustomInput
          name="maxGroupSize"
          register={register}
          errors={errors}
          placeholder="Max Group Size"
          type="number"
          validationRules={{
            required: "Max group size is required",
            min: { value: 1, message: "Group size must be at least 1" },
          }}
        />
        <CustomInput
          name="price"
          register={register}
          errors={errors}
          placeholder="Price"
          type="number"
          step="0.01"
          validationRules={{ required: "Price is required" }}
        />
        <CustomInput
          name="tourType"
          register={register}
          errors={errors}
          placeholder="Tour Type"
          validationRules={{ required: "Tour type is required" }}
        />
        <CustomInput
          name="groupType"
          register={register}
          errors={errors}
          placeholder="Group Type"
          validationRules={{ required: "Group type is required" }}
        />
        <CustomInput
          name="transportType"
          register={register}
          errors={errors}
          placeholder="Transport Type"
          validationRules={{ required: "Transport type is required" }}
        />

        <div className="flex gap-4">
          <CustomInput
            name="minAge"
            register={register}
            errors={errors}
            placeholder="Min Age"
            type="number"
            validationRules={{
              required: "Min age is required",
              min: { value: 0, message: "Age cannot be negative" },
            }}
          />
          <CustomInput
            name="maxAge"
            register={register}
            errors={errors}
            placeholder="Max Age"
            type="number"
            validationRules={{
              required: "Max age is required",
              min: { value: 1, message: "Max age must be at least 1" },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default TourDetails;
