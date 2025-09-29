import FromAddDestination from "@/components/forms/FromAddDestination";
import FromAddRegion from "@/components/forms/FromAddRegion";
import HeaderPages from "@/components/headers/HeaderPages";
import LoadingSpinner from "@/components/loadgin/LoadingSpinner";
import { useDestinationStore } from "@/stores/useDestinationStore";
import { useRegionStore } from "@/stores/useRegionStore";
import React from "react";

function DestinationsCreatePage() {
  const { loading } = useDestinationStore();
  const { getAllRegions, regions } = useRegionStore();

  React.useEffect(() => {
    getAllRegions();
  }, [getAllRegions]);

  if (loading) {
    return <LoadingSpinner />;
  }
  console.log(regions);

  return (
    <div>
      <HeaderPages
        title={"destinations"}
        links={[
          { title: "destinations", slug: "/destinations" },
          { title: "create", slug: "/destinations/create", active: true },
        ]}
      ></HeaderPages>
      <FromAddDestination regions={regions} />
    </div>
  );
}

export default DestinationsCreatePage;
