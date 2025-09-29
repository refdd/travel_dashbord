import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import CustomInput from "../forms/CustomFileds/CustomInput";
import { useNavigate } from "react-router-dom";
import CustomTextEditor from "./CustomFileds/CustomTextEditor";
import CustomMultiSelect from "./CustomFileds/CustomMultiSelect";
import CustomTextarea from "./CustomFileds/CustomTextarea";
import CustomImageUpload from "./CustomFileds/CustomImageUpload";
import { useRegionStore } from "@/stores/useRegionStore";
import LoadingSpinner from "../loadgin/LoadingSpinner";

function FromAddRegion({ region }) {
  const isEditMode = !!region;
  const navigate = useNavigate();
  const { createRegion, updateRegion, loading } = useRegionStore();

  // Initialize form methods with default values
  const methods = useForm({
    defaultValues: {
      name: "",
      slug: "",
      title: "",
      description: "",
      code: "",
      metaTitle: "",
      metaKeywords: "",
      metaDescription: "",
      imageAlt: "",
      imageTitle: "",
      sitemapChangefreq: "",
      sitemapPriority: "",
      isActive: false,
      hideInHome: false,
      hideInSitemap: false,
      hideInMenu: false,
      hideInSubMenu: false,
      sortOrder: "",
      iconUrl: "",
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

  // Reset form if region prop changes (useful for async loading and edit mode)
  useEffect(() => {
    if (region) {
      reset({
        name: region.name || "",
        slug: region.slug || "",
        title: region.title || "",
        description: region.description || "",
        code: region.code || "",
        metaTitle: region.metaTitle || "",
        metaKeywords: region.metaKeywords || "",
        metaDescription: region.metaDescription || "",
        imageAlt: region.imageAlt || "",
        imageTitle: region.imageTitle || "",
        sitemapChangefreq: region.sitemapChangefreq || "",
        sitemapPriority: region.sitemapPriority || "",
        isActive: region.isActive || false,
        hideInHome: region.hideInHome || false,
        hideInSitemap: region.hideInSitemap || false,
        hideInMenu: region.hideInMenu || false,
        hideInSubMenu: region.hideInSubMenu || false,
        sortOrder: region.sortOrder || "",
        iconUrl: region.iconUrl || "",
      });
    }
  }, [region, reset]);

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
        await updateRegion(region.id, formData);
      } else {
        await createRegion(formData);
      }
      reset();
      navigate("/region");
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
            name="name"
            register={register}
            errors={errors}
            placeholder="Name"
            validationRules={{ required: "Name is required" }}
          />
          <CustomInput
            name="slug"
            register={register}
            errors={errors}
            placeholder="Slug"
            validationRules={{ required: "Slug is required" }}
          />
          <CustomInput
            name="title"
            register={register}
            errors={errors}
            placeholder="Title"
            validationRules={{ required: "Title is required" }}
          />

          <div className="md:col-span-3">
            <CustomTextEditor
              name="description"
              label="Description"
              placeholder="Description"
              control={control}
              rules={{ required: "Description is required" }}
            />
          </div>

          <CustomInput
            name="code"
            register={register}
            errors={errors}
            placeholder="Code"
            validationRules={{ required: "Code is required" }}
          />
          <CustomInput
            name="metaTitle"
            register={register}
            errors={errors}
            placeholder="Meta Title"
          />
          <CustomTextarea
            name="metaKeywords"
            label="Meta Keywords"
            placeholder="Meta Keywords (comma separated)"
            register={register}
            errors={errors}
            validationRules={{ required: "Meta keywords are required" }}
            maxRows={4}
          />
          <CustomTextarea
            name="metaDescription"
            label="Meta Description"
            placeholder="Meta Description"
            register={register}
            errors={errors}
            validationRules={{ required: "Meta description is required" }}
            maxRows={4}
          />
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
            name="sitemapChangefreq"
            register={register}
            errors={errors}
            placeholder="Sitemap Change Frequency"
            validationRules={{
              required: "Sitemap change frequency is required",
            }}
          />
          <CustomInput
            name="sitemapPriority"
            register={register}
            errors={errors}
            placeholder="Sitemap Priority"
            validationRules={{ required: "Sitemap priority is required" }}
          />

          {/* Boolean fields as checkboxes */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isActive"
              {...register("isActive")}
              className="rounded"
            />
            <label htmlFor="isActive" className="text-sm font-medium">
              Is Active
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="hideInHome"
              {...register("hideInHome")}
              className="rounded"
            />
            <label htmlFor="hideInHome" className="text-sm font-medium">
              Hide in Home
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="hideInSitemap"
              {...register("hideInSitemap")}
              className="rounded"
            />
            <label htmlFor="hideInSitemap" className="text-sm font-medium">
              Hide in Sitemap
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="hideInMenu"
              {...register("hideInMenu")}
              className="rounded"
            />
            <label htmlFor="hideInMenu" className="text-sm font-medium">
              Hide in Menu
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="hideInSubMenu"
              {...register("hideInSubMenu")}
              className="rounded"
            />
            <label htmlFor="hideInSubMenu" className="text-sm font-medium">
              Hide in Sub Menu
            </label>
          </div>

          <CustomInput
            name="sortOrder"
            register={register}
            errors={errors}
            placeholder="Sort Order"
            type="number"
            validationRules={{ required: "Sort order is required" }}
          />

          <CustomInput
            name="iconUrl"
            register={register}
            errors={errors}
            placeholder="Icon URL"
          />

          <div className="md:col-span-3">
            <CustomImageUpload
              name="image"
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
              label="Region Image"
              isEditMode={isEditMode}
              defaultValue={region?.imageUrl || ""}
            />
          </div>
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

export default FromAddRegion;
