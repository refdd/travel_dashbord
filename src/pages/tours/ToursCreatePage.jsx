import FromAddRegion from "@/components/forms/FromAddRegion";
import FromAddTours from "@/components/forms/FromAddTours";
import HeaderPages from "@/components/headers/HeaderPages";
import { useDestinationStore } from "@/stores/useDestinationStore";
import { useRegionStore } from "@/stores/useRegionStore";
import React, { useEffect } from "react";

function ToursCreatePage() {
  const { getAllRegions, regions } = useRegionStore();
  const { getAllDestinations, destinations } = useDestinationStore();
  useEffect(() => {
    getAllRegions();
    getAllDestinations();
  }, [getAllRegions, getAllDestinations]);

  // Check if regions and destinations are loaded
  if (!regions || !destinations) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <HeaderPages
        title={"tours"}
        links={[
          { title: "tours", slug: "/tours" },
          { title: "create", slug: "/tours/create", active: true },
        ]}
      ></HeaderPages>
      <FromAddTours regions={regions} destinations={destinations} />
    </div>
  );
}

export default ToursCreatePage;
