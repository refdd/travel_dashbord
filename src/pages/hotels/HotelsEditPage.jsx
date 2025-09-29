import FromAddHotels from "@/components/forms/FromAddHotels";
import FromAddRegion from "@/components/forms/FromAddRegion";
import HeaderPages from "@/components/headers/HeaderPages";
import { useRegionStore } from "@/stores/useRegionStore";
import { useTotelsStore } from "@/stores/useTotelsStore";
import React from "react";
import { useParams } from "react-router-dom";

function HotelsEditPage() {
  const { id } = useParams();
  const { getHotelById, hotel, loading } = useTotelsStore();

  React.useEffect(() => {
    if (id) {
      getHotelById(id);
    }
  }, [id, getHotelById]);
  console.log("Editing region:", hotel);

  return (
    <div className="px-5 ">
      <HeaderPages
        title={"hotels"}
        links={[
          { title: "hotels", slug: "/hotels" },
          { title: "Edit", slug: "/hotels/edit", active: true },
        ]}
      ></HeaderPages>
      <div className="mt-5">
        <FromAddHotels hotel={hotel} />
      </div>
    </div>
  );
}

export default HotelsEditPage;
