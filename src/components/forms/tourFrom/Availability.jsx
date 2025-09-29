import React from "react";
import CustomInput from "../CustomFileds/CustomInput";
import { useFormContext } from "react-hook-form";
import CustomTextEditor from "../CustomFileds/CustomTextEditor";

function Availability() {
  const { register, errors } = useFormContext();
  return (
    <div className="md:col-span-3 bg-gray-100 p-3 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="md:col-span-3">
          <h3 className="text-lg font-semibold mb-4">Availability</h3>
        </div>

        <CustomInput
          name="availableFrom"
          register={register}
          errors={errors}
          placeholder="Available From"
          type="date"
          validationRules={{ required: "Start date is required" }}
        />

        <CustomInput
          name="availableTo"
          register={register}
          errors={errors}
          placeholder="Available To"
          type="date"
          validationRules={{ required: "End date is required" }}
        />
      </div>
    </div>
  );
}

export default Availability;
