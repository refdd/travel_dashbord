import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import CustomInput from "../forms/CustomFileds/CustomInput";
import { useNavigate } from "react-router-dom";
import CustomTextEditor from "./CustomFileds/CustomTextEditor";
import CustomImageUpload from "./CustomFileds/CustomImageUpload";
import LoadingSpinner from "../loadgin/LoadingSpinner";
import { usePageStore } from "@/stores/usePageStore";

function FromAddPages({ pages }) {
  const isEditMode = !!pages;
  const navigate = useNavigate();
  const { createPage, updatePage, loading } = usePageStore();

  // Initialize form methods with only the fields you need
  const methods = useForm({
    defaultValues: {
      title: pages?.title || "",
      slug: pages?.slug || "",
      content: pages?.content || "",
      author: pages?.author || "",
      imageAlt: pages?.imageAlt || "",
      imageTitle: pages?.imageTitle || "",
      metaTitle: pages?.metaTitle || "",
      metaKeywords: pages?.metaKeywords || "",
      metaDescription: pages?.metaDescription || "",
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

  // Reset form if pages prop changes (useful for async loading and edit mode)
  useEffect(() => {
    if (pages) {
      reset({
        title: pages.title || "",
        slug: pages.slug || "",
        content: pages.content || "",
        author: pages.author || "",
        imageAlt: pages.imageAlt || "",
        imageTitle: pages.imageTitle || "",
        metaTitle: pages.metaTitle || "",
        metaKeywords: pages.metaKeywords || "",
        metaDescription: pages.metaDescription || "",
      });
    }
  }, [pages, reset]);

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
        await updatePage(pages.id, formData);
      } else {
        await createPage(formData);
      }
      reset();
      navigate("/pages");
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
              placeholder="Content"
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
              label="Image"
              isEditMode={isEditMode}
              defaultValue={pages?.imageUrl || ""}
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

export default FromAddPages;
