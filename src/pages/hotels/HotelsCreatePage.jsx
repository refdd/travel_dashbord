import FromAddHotels from "@/components/forms/FromAddHotels";
import HeaderPages from "@/components/headers/HeaderPages";
import React from "react";

function HotelsCreatePage() {
  return (
    <div>
      <HeaderPages
        title={"hotels"}
        links={[
          { title: "hotels", slug: "/hotels" },
          { title: "create", slug: "/hotels/create", active: true },
        ]}
      ></HeaderPages>
      <FromAddHotels />
    </div>
  );
}

export default HotelsCreatePage;
