import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import CustomInput from "../CustomFileds/CustomInput";
import CustomTextarea from "../CustomFileds/CustomTextarea";

function Itinerary() {
  const {
    register,
    control,

    formState: { errors },
  } = useFormContext();

  const {
    fields: itineraryFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "itineraries",
  });

  // Fill initial data
  // useEffect(() => {
  //   replace(exampleData);
  // }, [replace]);

  const addItinerary = () => {
    append({
      title: "",
      body: "",
      meals: "",
      accommodation: "",
      sort: itineraryFields.length + 1,
      mediaUrl: "",
      mediaAlt: "",
      mediaTitle: "",
    });
  };

  return (
    <div className="md:col-span-3 bg-gray-100 p-3 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Itinerary</h3>
        <button
          type="button"
          onClick={addItinerary}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Day
        </button>
      </div>

      {itineraryFields.map((field, index) => (
        <div key={field.id} className="border p-4 rounded mb-4 bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-semibold">Day {index + 1}</h4>
            {itineraryFields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
              >
                Remove
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomInput
              name={`itineraries.${index}.title`}
              register={register}
              errors={errors}
              placeholder="Day Title"
              validationRules={{ required: "Day title is required" }}
            />

            <CustomInput
              name={`itineraries.${index}.meals`}
              register={register}
              errors={errors}
              placeholder="Meals (e.g., Breakfast, Lunch)"
            />

            <CustomInput
              name={`itineraries.${index}.accommodation`}
              register={register}
              errors={errors}
              placeholder="Accommodation"
            />

            <CustomInput
              name={`itineraries.${index}.sort`}
              register={register}
              errors={errors}
              placeholder="Sort Order"
              type="number"
              defaultValue={index + 1}
            />

            <div className="md:col-span-2">
              <CustomTextarea
                name={`itineraries.${index}.body`}
                label="Day Description"
                placeholder="Describe the activities for this day"
                register={register}
                errors={errors}
                validationRules={{ required: "Day description is required" }}
                maxRows={3}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Itinerary;
