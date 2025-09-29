import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import CustomInput from "../forms/CustomFileds/CustomInput";
import { useNavigate } from "react-router-dom";
import CustomTextEditor from "./CustomFileds/CustomTextEditor";
import CustomMultiSelect from "./CustomFileds/CustomMultiSelect";
import CustomImageUpload from "./CustomFileds/CustomImageUpload";
import { useWikisStore } from "@/stores/useWikisStore";

function FromAddWikis({ tours, wiki }) {
  const isEditMode = !!wiki;
  const navigate = useNavigate();
  const { createWiki, editWiki } = useWikisStore();

  // Initialize form methods with default values
  const methods = useForm({
    defaultValues: {
      title: wiki?.title || "",
      slug: wiki?.slug || "",
      content: wiki?.content || "",
      author: wiki?.author || "",
      imageAlt: wiki?.imageAlt || "",
      imageTitle: wiki?.imageTitle || "",
      metaTitle: wiki?.metaTitle || "",
      metaKeywords: wiki?.metaKeywords || "",
      metaDescription: wiki?.metaDescription || "",
      relatedTourIds: wiki?.relatedTours
        ? wiki.relatedTours
            .map((wt) => {
              const tour = tours?.find((t) => t.id === wt.id);
              return tour ? { label: tour.slug, value: tour.id } : null;
            })
            .filter(Boolean)
        : [],
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

  const onSubmit = async (data) => {
    const formData = new FormData();

    for (const key in data) {
      if (key === "relatedTourIds") {
        formData.append(
          key,
          JSON.stringify(data[key].map((item) => item.value))
        );
      } else if (key === "image" && data[key] && data[key].length > 0) {
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
        await editWiki(wiki.id, formData);
        console.log("Wiki updated successfully");
        navigate("/wikis");
      } else {
        await createWiki(formData);
        console.log("Wiki created successfully");
        navigate("/wikis");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

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
            placeholder="Title"
            validationRules={{ required: "Title is required" }}
          />

          <CustomInput
            name="slug"
            register={register}
            errors={errors}
            placeholder="Slug"
            validationRules={{ required: "Slug is required" }}
          />

          <div className="md:col-span-3">
            <CustomTextEditor
              name="content"
              label="Content"
              placeholder="Wiki Content"
              control={control}
              rules={{ required: "Content is required" }}
            />
          </div>

          <CustomInput
            name="author"
            register={register}
            errors={errors}
            placeholder="Author"
            validationRules={{ required: "Author is required" }}
          />

          <div className="md:col-span-3">
            <CustomImageUpload
              name="image"
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
              label="Wiki Image"
              isEditMode={isEditMode}
              defaultValue={wiki?.imageUrl || ""}
            />
          </div>

          <CustomInput
            name="imageAlt"
            register={register}
            errors={errors}
            placeholder="Image Alt Text"
          />

          <CustomInput
            name="imageTitle"
            register={register}
            errors={errors}
            placeholder="Image Title"
          />

          <CustomInput
            name="metaTitle"
            register={register}
            errors={errors}
            placeholder="Meta Title"
          />

          <CustomInput
            name="metaKeywords"
            register={register}
            errors={errors}
            placeholder="Meta Keywords"
          />

          <CustomInput
            name="metaDescription"
            register={register}
            errors={errors}
            placeholder="Meta Description"
          />

          <CustomMultiSelect
            name="relatedTourIds"
            label="Related Tours"
            control={control}
            errors={errors}
            options={tours?.map((tour) => ({
              label: tour.slug,
              value: tour.id,
            }))}
            getOptionLabel={(option) => option.label}
            placeholder="Select related tours"
          />

          <div className="md:col-span-3">
            <button
              type="submit"
              className="bg-bsPrimary text-white p-2 rounded flex items-center justify-center"
            >
              {isEditMode ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default FromAddWikis;
