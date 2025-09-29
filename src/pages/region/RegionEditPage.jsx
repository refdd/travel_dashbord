import FromAddRegion from "@/components/forms/FromAddRegion";
import HeaderPages from "@/components/headers/HeaderPages";
import { useRegionStore } from "@/stores/useRegionStore";
import React from "react";
import { useParams } from "react-router-dom";

function RegionEditPage() {
  const { id } = useParams();
  const { getRegionById, region, loading } = useRegionStore();

  React.useEffect(() => {
    if (id) {
      getRegionById(id);
    }
  }, [id, getRegionById]);
  console.log("Editing region:", region);

  return (
    <div className="px-5 ">
      <HeaderPages
        title={"region"}
        links={[
          { title: "region", slug: "/region" },
          { title: "Edit", slug: "/region/edit", active: true },
        ]}
      ></HeaderPages>
      <div className="mt-5">
        <FromAddRegion region={region} />
      </div>
    </div>
  );
}

export default RegionEditPage;
