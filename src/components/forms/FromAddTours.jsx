import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import CustomInput from "../forms/CustomFileds/CustomInput";
import { useNavigate } from "react-router-dom";
import CustomTextEditor from "./CustomFileds/CustomTextEditor";
import CustomMultiSelect from "./CustomFileds/CustomMultiSelect";
import CustomTextarea from "./CustomFileds/CustomTextarea";
import CustomImageUpload from "./CustomFileds/CustomImageUpload";
import LoadingSpinner from "../loadgin/LoadingSpinner";
import { useTourStore } from "@/stores/useToursStore";
import BasicInformation from "./tourFrom/BasicInformation";
import TourDetails from "./tourFrom/TourDetails";
import IncludesExcludes from "./tourFrom/IncludesExcludes";
import Availability from "./tourFrom/Availability";
import Options from "./tourFrom/Options";
import Itinerary from "./tourFrom/Itinerary";
import Accommodations from "./tourFrom/Accommodations";
import CustomUploadMuitiImages from "./CustomFileds/CustomUploadMuitiImages";
import dayjs from "dayjs";

function FromAddTours({ tour, regions, destinations }) {
  const isEditMode = !!tour;
  const navigate = useNavigate();
  const { createTour, editTour, loading } = useTourStore();

  // Initialize form methods with default values
  const methods = useForm({
    defaultValues: {},
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
    if (tour) {
      reset({
        name: tour.name || "",
        slug: tour.slug || "",
        title: tour.title || "",
        tourCode: tour.tourCode || "",
        description: tour.description || "",
        shortDescription: tour.shortDescription || "",
        duration: tour.duration || "",
        maxGroupSize: tour.maxGroupSize || "",
        price: tour.price || "",
        tourType: tour.tourType || "",
        groupType: tour.groupType || "",
        transportType: tour.transportType || "",
        maxAge: tour.maxAge || "",
        minAge: tour.minAge || "",
        availableTo: dayjs(tour.availableTo).format("YYYY-MM-DD") || "",
        availableFrom: dayjs(tour.availableFrom).format("YYYY-MM-DD") || "",
        airportPickup: tour.airportPickup || false,
        isActive: tour.isActive || false,
        visaIncluded: tour.visaIncluded || false,
        guideIncluded: tour.guideIncluded || false,
        includes: tour.includes || [],
        excludes: tour.excludes || [],
        itineraries: tour.itineraries || [],
        accommodations: tour.accommodations || [],
        regionId: () => {
          const regionData = regions.find((r) => r.id === tour.regionId);
          return regionData
            ? { label: regionData.name, value: regionData.id }
            : null;
        },
        destinationId: () => {
          const destinationData = destinations.find(
            (d) => d.id === tour.destinationId
          );
          return destinationData
            ? { label: destinationData.name, value: destinationData.id }
            : null;
        },
      });
    }
  }, [tour, reset]);

  const onSubmit = async (data) => {
    const formData = new FormData();

    for (const key in data) {
      if (key === "images") {
        // append each file with the same field name
        (data.images || []).forEach((file) => {
          if (file instanceof File) formData.append("images", file); // or "images[]", depending on backend
        });
        continue;
      }

      if (key === "regionId" || key === "destinationId") {
        formData.append(key, data[key]?.value ?? "");
        continue;
      }

      if (
        key === "excludes" ||
        key === "includes" ||
        key === "itineraries" ||
        key === "accommodations"
      ) {
        formData.append(key, JSON.stringify(data[key] ?? []));
        continue;
      }

      if (key === "availableFrom" || key === "availableTo") {
        formData.append(
          key,
          data[key] ? new Date(data[key]).toISOString() : ""
        );
        continue;
      }

      // default
      formData.append(key, data[key] ?? "");
    }

    if (!isEditMode) {
      formData.append("publishedAt", new Date().toISOString());
    }

    try {
      if (isEditMode) {
        await editTour(tour.id, formData);
      } else {
        await createTour(formData);
      }
      reset();
      navigate("/tours");
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
          <BasicInformation regions={regions} destinations={destinations} />
          <TourDetails />
          <IncludesExcludes />
          <Availability />
          <Options />
          <Itinerary />
          <Accommodations />
          <div className="md:col-span-3">
            <CustomUploadMuitiImages
              name="images"
              label="Product Images"
              register={methods.register}
              watch={methods.watch}
              setValue={methods.setValue}
              errors={methods.formState.errors}
              rules={{ required: "At least one image is required" }}
              defaultValue={tour?.images || []}
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

export default FromAddTours;
