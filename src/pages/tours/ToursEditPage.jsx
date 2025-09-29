import FromAddTours from "@/components/forms/FromAddTours";
import HeaderPages from "@/components/headers/HeaderPages";
import LoadingSpinner from "@/components/loadgin/LoadingSpinner";
import { useDestinationStore } from "@/stores/useDestinationStore";
import { useRegionStore } from "@/stores/useRegionStore";
import { useTourStore } from "@/stores/useToursStore";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function ToursEditPage() {
  const { getAllRegions, regions } = useRegionStore();
  const { getAllDestinations, destinations } = useDestinationStore();
  const { id } = useParams();
  const { getTourById, tour, loading } = useTourStore();
  useEffect(() => {
    getAllRegions();
    getAllDestinations();
  }, [getAllRegions, getAllDestinations]);
  useEffect(() => {
    if (id) {
      getTourById(id);
    }
  }, [id, getTourById]);
  // Check if regions and destinations are loaded
  if (!regions || !destinations) {
    return <LoadingSpinner />;
  }
  if (loading) {
    return <LoadingSpinner />;
  }
  console.log(tour);

  return (
    <div>
      <HeaderPages
        title={"tours"}
        links={[
          { title: "tours", slug: "/tours" },
          { title: "edit", slug: "/tours/edit", active: true },
        ]}
      ></HeaderPages>
      <FromAddTours tour={tour} regions={regions} destinations={destinations} />
    </div>
  );
}

export default ToursEditPage;
