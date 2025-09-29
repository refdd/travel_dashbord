import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import CustomInput from "../forms/CustomFileds/CustomInput";
import CustomTextarea from "./CustomFileds/CustomTextarea";
import CustomImageUpload from "./CustomFileds/CustomImageUpload";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useReviewsStore } from "@/stores/useRviewsStore";
import CustomTextEditor from "./CustomFileds/CustomTextEditor";

function FromAddReview({ review }) {
  const isEditMode = !!review;
  const navigate = useNavigate();
  const { createReview, editReview } = useReviewsStore();

  const methods = useForm({
    defaultValues: {
      name: review?.name || "",
      email: review?.email || "",
      rating: review?.rating ?? 5,
      comment: review?.comment || "",
      imageAlt: review?.imageAlt || "",
      imageTitle: review?.imageTitle || "",
      author: review?.author || "",
      // for <input type="date"> use YYYY-MM-DD
      publishedAt: review?.publishedAt
        ? dayjs(review.publishedAt).format("YYYY-MM-DD")
        : dayjs().format("YYYY-MM-DD"),
      metaTitle: review?.metaTitle || "",
      metaKeywords: review?.metaKeywords || "",
      metaDescription: review?.metaDescription || "",
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Append simple fields
    const simpleKeys = [
      "name",
      "email",
      "rating",
      "comment",
      "imageAlt",
      "imageTitle",
      "author",
      "metaTitle",
      "metaKeywords",
      "metaDescription",
    ];
    simpleKeys.forEach((k) => formData.append(k, data[k]));

    // Normalize date -> ISO string with Z
    const isoPublished = dayjs(data.publishedAt).startOf("day").toISOString();
    formData.append("publishedAt", isoPublished);

    // Image: only append if user chose a new one
    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    if (isEditMode) {
      await editReview(review.id, formData).then(() => {
        navigate("/reviews");
        return;
      });
    } else {
      await createReview(formData).then(() => {
        navigate("/reviews");
      });
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
            name="name"
            register={register}
            errors={errors}
            placeholder="Name"
            validationRules={{ required: "Name is required" }}
          />
          <CustomInput
            name="email"
            register={register}
            errors={errors}
            placeholder="Email"
            type="email"
            validationRules={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email",
              },
            }}
          />
          <CustomInput
            name="rating"
            register={register}
            errors={errors}
            placeholder="Rating (1–5)"
            type="number"
            validationRules={{
              required: "Rating is required",
              min: { value: 1, message: "Min 1" },
              max: { value: 5, message: "Max 5" },
            }}
          />
          <div className="md:col-span-3">
            <CustomTextEditor
              name="comment"
              control={control}
              rules={{ required: "Comment is required" }}
            />
          </div>

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
            name="author"
            register={register}
            errors={errors}
            placeholder="Author"
          />

          <CustomInput
            name="publishedAt"
            register={register}
            errors={errors}
            placeholder="Published At"
            type="date"
            validationRules={{ required: "Publish date is required" }}
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
            maxRows={4}
          />
          <CustomTextarea
            name="metaDescription"
            label="Meta Description"
            placeholder="Meta Description"
            register={register}
            errors={errors}
            maxRows={4}
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
              defaultValue={review?.imageUrl || ""}
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

export default FromAddReview;
