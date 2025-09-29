import FromAddDestination from "@/components/forms/FromAddDestination";
import FromAddRegion from "@/components/forms/FromAddRegion";
import HeaderPages from "@/components/headers/HeaderPages";
import LoadingSpinner from "@/components/loadgin/LoadingSpinner";
import { useDestinationStore } from "@/stores/useDestinationStore";
import { useRegionStore } from "@/stores/useRegionStore";
import React from "react";
import { useParams } from "react-router-dom";

function DestinationsEditPage() {
  const { loading, getDestinationById, destination } = useDestinationStore();
  const { getAllRegions, regions } = useRegionStore();
  const { id } = useParams();

  React.useEffect(() => {
    getAllRegions();
  }, [getAllRegions]);

  React.useEffect(() => {
    getDestinationById(id);
  }, [getDestinationById, id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <HeaderPages
        title={"destinations"}
        links={[
          { title: "destinations", slug: "/destinations" },
          { title: "create", slug: "/destinations/create", active: true },
        ]}
      ></HeaderPages>
      <FromAddDestination regions={regions} destination={destination} />
    </div>
  );
}

export default DestinationsEditPage;
