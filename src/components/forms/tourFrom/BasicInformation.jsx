import React from "react";
import CustomInput from "../CustomFileds/CustomInput";
import { useFormContext } from "react-hook-form";
import CustomTextEditor from "../CustomFileds/CustomTextEditor";
import CustomSelect from "../CustomFileds/CustomSelect";

function BasicInformation({ regions, destinations }) {
  const { register, errors, control } = useFormContext();
  return (
    <div className="md:col-span-3 bg-gray-100 p-3 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="md:col-span-3">
          <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
        </div>
        <CustomInput
          name="title"
          register={register}
          errors={errors}
          placeholder="Tour Title"
          validationRules={{ required: "Title is required" }}
        />
        <CustomInput
          name="slug"
          register={register}
          errors={errors}
          placeholder="URL Slug"
          validationRules={{ required: "Slug is required" }}
        />
        <CustomInput
          name="tourCode"
          register={register}
          errors={errors}
          placeholder="Tour Code"
          validationRules={{ required: "Tour code is required" }}
        />
        <div className="">
          <CustomSelect
            name="regionId"
            label="Choose a Region"
            control={control}
            options={regions?.map((r) => ({ value: r.id, label: r.name }))}
            errors={errors}
          />
        </div>
        <div className="">
          <CustomSelect
            name="destinationId"
            label="Choose a Destination"
            control={control}
            options={destinations?.map((d) => ({ value: d.id, label: d.name }))}
            errors={errors}
          />
        </div>
        <div className="md:col-span-3">
          <CustomTextEditor
            name="description"
            label="Full Description"
            placeholder="Detailed tour description"
            control={control}
            rules={{ required: "Description is required" }}
          />
        </div>
        <div className="md:col-span-3">
          <CustomTextEditor
            name="shortDescription"
            label="Short Description"
            placeholder="Detailed tour shortDescription"
            control={control}
            rules={{ required: "shortDescription is required" }}
          />
        </div>
      </div>
    </div>
  );
}

export default BasicInformation;
