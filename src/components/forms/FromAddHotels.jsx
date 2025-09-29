import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import CustomInput from "../forms/CustomFileds/CustomInput";
import { useNavigate } from "react-router-dom";
import CustomTextEditor from "./CustomFileds/CustomTextEditor";

import CustomImageUpload from "./CustomFileds/CustomImageUpload";
import LoadingSpinner from "../loadgin/LoadingSpinner";
import { useTotelsStore } from "@/stores/useTotelsStore";

function FromAddHotels({ hotel }) {
  const isEditMode = !!hotel;
  const navigate = useNavigate();
  const { createHotel, editHotel, loading } = useTotelsStore(); // Updated store methods

  // Initialize form methods with default values for hotel fields
  const methods = useForm({
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      link: "",
      imageAlt: "",
      imageTitle: "",
      regionId: "",
      destinationId: "",
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    control,
    formState: { errors },
  } = methods;

  // Reset form if hotel prop changes (useful for async loading and edit mode)
  useEffect(() => {
    if (hotel) {
      reset({
        title: hotel.title || "",
        slug: hotel.slug || "",
        description: hotel.description || "",
        link: hotel.link || "",
        imageAlt: hotel.imageAlt || "",
        imageTitle: hotel.imageTitle || "",
        regionId: hotel.regionId || "",
        destinationId: hotel.destinationId || "",
      });
    }
  }, [hotel, reset]);

  const onSubmit = async (data) => {
    const formData = new FormData();

    for (const key in data) {
      if (key === "image" && data[key] && data[key].length > 0) {
        formData.append(key, data[key][0]);
      } else if (key !== "image") {
        formData.append(key, data[key]);
      }
    }

    if (!isEditMode) {
      formData.append("publishedAt", new Date().toISOString());
    }

    try {
      if (isEditMode) {
        await editHotel(hotel.id, formData);
      } else {
        await createHotel(formData);
      }
      reset();
      navigate("/hotels"); // Updated navigation path
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-white p-5 bg-black/5 rounded shadow-md">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 pt-5"
        >
          <CustomInput
            name="title"
            register={register}
            errors={errors}
            placeholder="Hotel Title"
            validationRules={{ required: "Title is required" }}
          />

          <CustomInput
            name="slug"
            register={register}
            errors={errors}
            placeholder="Slug (URL friendly)"
            validationRules={{ required: "Slug is required" }}
          />

          <CustomInput
            name="link"
            register={register}
            errors={errors}
            placeholder="Hotel Website Link"
            type="url"
            validationRules={{
              required: "Hotel link is required",
              pattern: {
                value: /^https?:\/\/.+/,
                message:
                  "Please enter a valid URL starting with http:// or https://",
              },
            }}
          />

          <div className="md:col-span-3">
            <CustomTextEditor
              name="description"
              label="Hotel Description"
              placeholder="Enter detailed hotel description..."
              control={control}
              rules={{ required: "Description is required" }}
            />
          </div>

          <CustomInput
            name="imageAlt"
            register={register}
            errors={errors}
            placeholder="Image Alt Text"
            validationRules={{ required: "Image alt text is required" }}
          />

          <CustomInput
            name="imageTitle"
            register={register}
            errors={errors}
            placeholder="Image Title"
            validationRules={{ required: "Image title is required" }}
          />
          {/* 
          <CustomInput
            name="regionId"
            register={register}
            errors={errors}
            placeholder="Region ID"
            validationRules={{ required: "Region ID is required" }}
          />

          <CustomInput
            name="destinationId"
            register={register}
            errors={errors}
            placeholder="Destination ID"
            validationRules={{ required: "Destination ID is required" }}
          /> */}

          <div className="md:col-span-3">
            <CustomImageUpload
              name="image"
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
              label="Hotel Image"
              isEditMode={isEditMode}
              defaultValue={hotel?.imageUrl || ""}
            />
          </div>

          <div className="md:col-span-3">
            <button
              type="submit"
              className="bg-bsPrimary text-white p-2 rounded flex items-center justify-center"
            >
              {isEditMode ? "Update Hotel" : "Add Hotel"}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default FromAddHotels;
