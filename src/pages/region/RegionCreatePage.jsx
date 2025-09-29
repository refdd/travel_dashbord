import FromAddRegion from "@/components/forms/FromAddRegion";
import HeaderPages from "@/components/headers/HeaderPages";
import React from "react";

function RegionCreatePage() {
  return (
    <div>
      <HeaderPages
        title={"region"}
        links={[
          { title: "region", slug: "/region" },
          { title: "create", slug: "/region/create", active: true },
        ]}
      ></HeaderPages>
      <FromAddRegion />
    </div>
  );
}

export default RegionCreatePage;
