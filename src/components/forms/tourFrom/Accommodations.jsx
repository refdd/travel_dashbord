import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import CustomInput from "../CustomFileds/CustomInput";

function Accommodations() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const {
    fields: accommodations,
    append: appendAccommodation,
    remove: removeAccommodation,
    replace,
  } = useFieldArray({
    control,
    name: "accommodations",
  });

  return (
    <div className="md:col-span-3 bg-gray-100 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Accommodations</h3>
        <button
          type="button"
          onClick={() =>
            appendAccommodation({ name: "", image: "", prices: [] })
          }
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Hotel
        </button>
      </div>

      {accommodations.map((acc, accIndex) => (
        <AccommodationItem
          key={acc.id}
          accIndex={accIndex}
          control={control}
          register={register}
          errors={errors}
          removeAccommodation={removeAccommodation}
        />
      ))}
    </div>
  );
}

// Separate component for each accommodation to handle its own field arrays
function AccommodationItem({
  accIndex,
  control,
  register,
  errors,
  removeAccommodation,
}) {
  const {
    fields: seasons,
    append: appendSeason,
    remove: removeSeason,
  } = useFieldArray({
    control,
    name: `accommodations.${accIndex}.prices`,
  });

  return (
    <div className="border p-4 rounded mb-4 bg-white shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-semibold">Hotel #{accIndex + 1}</h4>
        <button
          type="button"
          onClick={() => removeAccommodation(accIndex)}
          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
        >
          Remove
        </button>
      </div>

      <CustomInput
        name={`accommodations.${accIndex}.name`}
        register={register}
        errors={errors}
        placeholder="Hotel Name"
        validationRules={{ required: "Hotel name is required" }}
      />

      <CustomInput
        name={`accommodations.${accIndex}.image`}
        register={register}
        errors={errors}
        placeholder="Image URL"
        validationRules={{ required: "Image URL is required" }}
      />

      {/* Seasons */}
      <div className="mt-4">
        <h5 className="font-medium mb-2">Seasons & Prices</h5>

        {seasons.map((season, seasonIndex) => (
          <SeasonItem
            key={season.id}
            accIndex={accIndex}
            seasonIndex={seasonIndex}
            control={control}
            register={register}
            errors={errors}
            removeSeason={removeSeason}
          />
        ))}

        <button
          type="button"
          onClick={() => appendSeason({ name: "", items: [] })}
          className="text-sm text-blue-600 underline"
        >
          + Add Season
        </button>
      </div>
    </div>
  );
}

// Separate component for each season to handle its own field arrays
function SeasonItem({
  accIndex,
  seasonIndex,
  control,
  register,
  errors,
  removeSeason,
}) {
  const {
    fields: items,
    append: appendItem,
    remove: removeItem,
  } = useFieldArray({
    control,
    name: `accommodations.${accIndex}.prices.${seasonIndex}.items`,
  });

  return (
    <div className="mb-6 border p-3 rounded">
      <div className="flex justify-between items-center">
        <h6 className="font-semibold">Season #{seasonIndex + 1}</h6>
        <button
          type="button"
          onClick={() => removeSeason(seasonIndex)}
          className="text-red-500 text-sm"
        >
          Remove Season
        </button>
      </div>

      <CustomInput
        name={`accommodations.${accIndex}.prices.${seasonIndex}.name`}
        register={register}
        errors={errors}
        placeholder="Season Name"
        validationRules={{ required: "Season name is required" }}
      />

      <h6 className="text-sm font-semibold mt-3">Price Items</h6>
      {items.map((item, itemIndex) => (
        <div
          key={item.id}
          className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-2"
        >
          <CustomInput
            name={`accommodations.${accIndex}.prices.${seasonIndex}.items.${itemIndex}.priceValue`}
            register={register}
            errors={errors}
            placeholder="Price"
            type="number"
            step="0.01"
          />
          <CustomInput
            name={`accommodations.${accIndex}.prices.${seasonIndex}.items.${itemIndex}.body`}
            register={register}
            errors={errors}
            placeholder="Description"
          />
          <CustomInput
            name={`accommodations.${accIndex}.prices.${seasonIndex}.items.${itemIndex}.sort`}
            register={register}
            errors={errors}
            placeholder="Sort"
            type="number"
          />
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          appendItem({
            priceValue: "",
            body: "",
            sort: items.length + 1,
          })
        }
        className="text-sm text-blue-600 underline mt-2"
      >
        + Add Price Item
      </button>
    </div>
  );
}

export default Accommodations;
