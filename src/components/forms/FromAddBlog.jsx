import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import CustomInput from "../forms/CustomFileds/CustomInput";
import { useNavigate } from "react-router-dom";
import CustomTextEditor from "./CustomFileds/CustomTextEditor";
import CustomMultiSelect from "./CustomFileds/CustomMultiSelect";
import CustomTextarea from "./CustomFileds/CustomTextarea";
import CustomImageUpload from "./CustomFileds/CustomImageUpload";
import { useBlogStore } from "@/stores/useBlogStore";

function FromAddBlog({ tours, blog }) {
  const isEditMode = !!blog;
  const navigate = useNavigate();
  const { createBlog, editBlog } = useBlogStore();

  // Initialize form methods with default values
  const methods = useForm({
    defaultValues: {
      title: blog?.title || "",
      slug: blog?.slug || "",
      imageAlt: blog?.imageAlt || "",
      imageTitle: blog?.imageTitle || "",
      author: blog?.author || "",
      metaTitle: blog?.metaTitle || "",
      metaKeywords: blog?.metaKeywords || "",
      metaDescription: blog?.metaDescription || "",
      content: blog?.content || "",
      relatedTourIds: blog?.relatedTours
        ? blog.relatedTours
            .map((bt) => {
              const tour = tours?.find((t) => t.id === bt.id);
              return tour ? { label: tour.slug, value: tour.id } : null;
            })
            .filter(Boolean)
        : [],
      // image: blog?.imageUrl || "",
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

  // Reset form if blog prop changes (useful for async loading)

  const onSubmit = async (data) => {
    const formData = new FormData();

    for (const key in data) {
      if (key === "relatedTourIds") {
        formData.append(
          key,
          JSON.stringify(data[key].map((item) => item.value))
        );
      } else {
        formData.append(key, data[key]);
      }
    }

    formData.append("publishedAt", new Date().toISOString());
    formData.append("image", data.image[0]);
    // If edit, call update logic (optional enhancement)
    if (isEditMode) {
      await editBlog(blog.id, formData).then(() => {
        navigate(`/blog/`);
      });
      return;
    }
    createBlog(formData).then(() => {
      navigate("/blog");
    });
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
          <CustomInput
            name="imageAlt"
            register={register}
            errors={errors}
            placeholder="Image Alt Text"
          />
          <div className="md:col-span-3">
            <CustomTextEditor
              name="content"
              control={control}
              rules={{ required: "Content is required" }}
            />
          </div>
          <CustomInput
            name="imageTitle"
            register={register}
            errors={errors}
            placeholder="Image Title"
          />
          <CustomInput
            name="author"
            register={register}
            errors={errors}
            placeholder="Author"
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
            <CustomImageUpload
              name="image"
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
              label="Profile Picture"
              isEditMode={isEditMode}
              defaultValue={blog?.imageUrl || ""}
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

export default FromAddBlog;
