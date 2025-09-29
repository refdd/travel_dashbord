import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import CustomInput from "../forms/CustomFileds/CustomInput";
import { useNavigate } from "react-router-dom";
import CustomTextEditor from "./CustomFileds/CustomTextEditor";
import CustomTextarea from "./CustomFileds/CustomTextarea";
import CustomImageUpload from "./CustomFileds/CustomImageUpload";
import LoadingSpinner from "../loadgin/LoadingSpinner";
import { useFaqsStore } from "@/stores/useFaqsStore";

function FromAddFaq({ faq }) {
  const isEditMode = !!faq;
  const navigate = useNavigate();
  const { createFaq, editFaq, loading } = useFaqsStore();

  // Initialize form methods with default values
  const methods = useForm({
    defaultValues: {
      question: faq?.question || "",
      answer: faq?.answer || "",
      imageAlt: faq?.imageAlt || "",
      imageTitle: faq?.imageTitle || "",
      author: faq?.author || "",
      metaTitle: faq?.metaTitle || "",
      metaKeywords: faq?.metaKeywords || "",
      metaDescription: faq?.metaDescription || "",
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

  // Reset form if faq prop changes (useful for async loading and edit mode)
  useEffect(() => {
    if (faq) {
      reset({
        question: faq.question || "",
        answer: faq.answer || "",
        imageAlt: faq.imageAlt || "",
        imageTitle: faq.imageTitle || "",
        author: faq.author || "",
        metaTitle: faq.metaTitle || "",
        metaKeywords: faq.metaKeywords || "",
        metaDescription: faq.metaDescription || "",
      });
    }
  }, [faq, reset]);

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
        await editFaq(faq.id, formData);
        reset();
        navigate("/faqs");
      } else {
        await createFaq(formData);
        reset();
        navigate("/faqs");
      }
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
          <div className="md:col-span-3">
            <CustomInput
              name="question"
              register={register}
              errors={errors}
              placeholder="What is the best season to visit?"
              label="Question"
              validationRules={{ required: "Question is required" }}
            />
          </div>

          <div className="md:col-span-3">
            <CustomTextEditor
              name="answer"
              label="Answer"
              placeholder="Spring is ideal for mild weather"
              control={control}
              rules={{ required: "Answer is required" }}
            />
          </div>

          <div className="md:col-span-3">
            <CustomImageUpload
              name="image"
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
              label="FAQ Image"
              isEditMode={isEditMode}
              defaultValue={faq?.imageUrl || ""}
            />
          </div>

          <CustomInput
            name="imageAlt"
            register={register}
            errors={errors}
            placeholder="Scenic spring view"
            label="Image Alt Text"
          />

          <CustomInput
            name="imageTitle"
            register={register}
            errors={errors}
            placeholder="Spring Season"
            label="Image Title"
          />

          <CustomInput
            name="author"
            register={register}
            errors={errors}
            placeholder="Travel Expert"
            label="Author"
            validationRules={{ required: "Author is required" }}
          />

          <CustomInput
            name="metaTitle"
            register={register}
            errors={errors}
            placeholder="Spring Travel Tips"
            label="Meta Title"
            validationRules={{ required: "Meta title is required" }}
          />

          <CustomTextarea
            name="metaKeywords"
            label="Meta Keywords"
            placeholder="travel, spring, best time"
            register={register}
            errors={errors}
            validationRules={{ required: "Meta keywords are required" }}
            maxRows={3}
          />

          <CustomTextarea
            name="metaDescription"
            label="Meta Description"
            placeholder="Learn the best time to travel"
            register={register}
            errors={errors}
            validationRules={{ required: "Meta description is required" }}
            maxRows={3}
          />

          <div className="md:col-span-3">
            <button
              type="submit"
              className="bg-bsPrimary text-white p-2 rounded flex items-center justify-center"
            >
              {isEditMode ? "Update FAQ" : "Create FAQ"}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default FromAddFaq;
