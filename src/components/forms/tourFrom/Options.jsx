import React from "react";
import CustomInput from "../CustomFileds/CustomInput";
import { useFormContext } from "react-hook-form";
import CustomTextEditor from "../CustomFileds/CustomTextEditor";

function Options() {
  const { register, errors, control } = useFormContext();
  return (
    <div className="md:col-span-3 bg-gray-100 p-3 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="md:col-span-3">
          <h3 className="text-lg font-semibold mb-4">Additional Options</h3>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="airportPickup"
            {...register("airportPickup")}
            className="rounded"
          />
          <label htmlFor="airportPickup" className="text-sm font-medium">
            Airport Pickup Included
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="visaIncluded"
            {...register("visaIncluded")}
            className="rounded"
          />
          <label htmlFor="visaIncluded" className="text-sm font-medium">
            Visa Included
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="guideIncluded"
            {...register("guideIncluded")}
            className="rounded"
          />
          <label htmlFor="guideIncluded" className="text-sm font-medium">
            Guide Included
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isActive"
            {...register("isActive")}
            className="rounded"
          />
          <label htmlFor="isActive" className="text-sm font-medium">
            Active Tour
          </label>
        </div>
      </div>
    </div>
  );
}

export default Options;
