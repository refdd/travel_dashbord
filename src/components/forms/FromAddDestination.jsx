import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CustomInput from "../forms/CustomFileds/CustomInput";
import CustomTextarea from "./CustomFileds/CustomTextarea";
import CustomImageUpload from "./CustomFileds/CustomImageUpload";
import { useDestinationStore } from "@/stores/useDestinationStore";
import CustomTextEditor from "./CustomFileds/CustomTextEditor";
import CustomSelect from "./CustomFileds/CustomSelect";

function FromAddDestination({ destination, regions }) {
  const isEditMode = !!destination;
  const navigate = useNavigate();
  const { createDestination, editDestination } = useDestinationStore();

  const methods = useForm({
    defaultValues: {
      name: destination?.name || "",
      slug: destination?.slug || "",
      title: destination?.title || "",
      destinationTitle: destination?.destinationTitle || "",
      description: destination?.description || "",
      body: destination?.body || "",
      country: destination?.country || "",
      city: destination?.city || "",
      coordinates: destination?.coordinates || "",
      metaTitle: destination?.metaTitle || "",
      metaKeywords: destination?.metaKeywords || "",
      metaDescription: destination?.metaDescription || "",
      imageAlt: destination?.imageAlt || "",
      imageTitle: destination?.imageTitle || "",
      sitemapChangefreq: destination?.sitemapChangefreq || "monthly",
      sitemapPriority: destination?.sitemapPriority || "0.8",
      isActive: destination?.isActive ?? true,
      hideInHome: destination?.hideInHome ?? false,
      hideInSitemap: destination?.hideInSitemap ?? false,
      hideInMenu: destination?.hideInMenu ?? false,
      hideInSubMenu: destination?.hideInSubMenu ?? false,
      sortOrder: destination?.sortOrder || "1",
      regionId: destination?.region
        ? { value: destination.region.id, label: destination.region.name }
        : "",
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
  useEffect(() => {
    if (destination) {
      reset({
        name: destination.name,
        slug: destination.slug,
        title: destination.title,
        destinationTitle: destination.destinationTitle,
        description: destination.description,
        body: destination.body,
        country: destination.country,
        city: destination.city,
        coordinates: destination.coordinates,
        metaTitle: destination.metaTitle,
        metaKeywords: destination.metaKeywords,
        metaDescription: destination.metaDescription,
        imageAlt: destination.imageAlt,
        imageTitle: destination.imageTitle,
        sitemapChangefreq: destination.sitemapChangefreq,
        sitemapPriority: destination.sitemapPriority,
        isActive: destination.isActive,
        hideInHome: destination.hideInHome,
        hideInSitemap: destination.hideInSitemap,
        hideInMenu: destination.hideInMenu,
        hideInSubMenu: destination.hideInSubMenu,
        sortOrder: destination.sortOrder,
        regionId: destination.region
          ? { value: destination.region.id, label: destination.region.name }
          : "",
      });
    }
  }, [destination, reset]);
  const onSubmit = async (data) => {
    const formData = new FormData();

    for (const key in data) {
      if (key === "regionId") {
        formData.append(key, data[key]?.value);
      } else {
        formData.append(key, data[key]);
      }
    }
    formData.append("image", data.image[0]);
    formData.append("publishedAt", new Date().toISOString());

    if (isEditMode) {
      await editDestination(destination.id, formData).then(() =>
        navigate("/destinations")
      );
    } else {
      await createDestination(formData).then(() => navigate("/destinations"));
    }
  };

  return (
    <div className="bg-white p-5 bg-black/5 rounded shadow-md">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <CustomInput
            name="name"
            register={register}
            errors={errors}
            placeholder="Name"
          />
          <CustomInput
            name="slug"
            register={register}
            errors={errors}
            placeholder="Slug"
          />
          <CustomInput
            name="title"
            register={register}
            errors={errors}
            placeholder="Title"
          />
          <CustomInput
            name="destinationTitle"
            register={register}
            errors={errors}
            placeholder="Destination Title"
          />
          <div className="col-span-3">
            <CustomTextEditor
              name="description"
              control={control}
              rules={{ required: "Description is required" }}
            />
          </div>
          <div className="col-span-3">
            <CustomTextEditor
              name="body"
              control={control}
              rules={{ required: "Body is required" }}
            />
          </div>

          <CustomInput
            name="country"
            register={register}
            errors={errors}
            placeholder="Country"
          />
          <CustomInput
            name="city"
            register={register}
            errors={errors}
            placeholder="City"
          />
          <CustomInput
            name="coordinates"
            register={register}
            errors={errors}
            placeholder="Coordinates"
          />
          <CustomInput
            name="metaTitle"
            register={register}
            errors={errors}
            placeholder="Meta Title"
          />
          <CustomTextarea
            name="metaKeywords"
            register={register}
            errors={errors}
            placeholder="Meta Keywords"
          />
          <CustomTextarea
            name="metaDescription"
            register={register}
            errors={errors}
            placeholder="Meta Description"
          />
          <CustomInput
            name="imageAlt"
            register={register}
            errors={errors}
            placeholder="Image Alt"
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
            placeholder="Sitemap Changefreq"
          />
          <CustomInput
            name="sitemapPriority"
            register={register}
            errors={errors}
            placeholder="Sitemap Priority"
          />
          <CustomInput
            name="sortOrder"
            register={register}
            errors={errors}
            placeholder="Sort Order"
          />
          <CustomSelect
            name="regionId"
            label="Choose a Region"
            control={control}
            options={regions?.map((r) => ({ value: r.id, label: r.name }))}
            errors={errors}
          />

          {/* Boolean Checkboxes */}
          <div className="flex items-center gap-2">
            <input type="checkbox" {...register("isActive")} id="isActive" />
            <label htmlFor="isActive">Is Active</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("hideInHome")}
              id="hideInHome"
            />
            <label htmlFor="hideInHome">Hide In Home</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("hideInSitemap")}
              id="hideInSitemap"
            />
            <label htmlFor="hideInSitemap">Hide In Sitemap</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("hideInMenu")}
              id="hideInMenu"
            />
            <label htmlFor="hideInMenu">Hide In Menu</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("hideInSubMenu")}
              id="hideInSubMenu"
            />
            <label htmlFor="hideInSubMenu">Hide In SubMenu</label>
          </div>

          {/* Image Upload */}
          <div className="md:col-span-3">
            <CustomImageUpload
              name="image"
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
              label="Destination Image"
              isEditMode={isEditMode}
              defaultValue={destination?.imageUrl || ""}
            />
          </div>

          <div className="md:col-span-3">
            <button
              type="submit"
              className="bg-bsPrimary text-white p-2 rounded"
            >
              {isEditMode ? "Update Destination" : "Create Destination"}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default FromAddDestination;
