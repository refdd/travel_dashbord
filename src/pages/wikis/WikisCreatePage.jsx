import FromAddUsers from "@/components/forms/FromAddUsers";
import FromAddWikis from "@/components/forms/FromAddWikis";
import HeaderPages from "@/components/headers/HeaderPages";
import { useTourStore } from "@/stores/useToursStore";
import React from "react";

function WikisCreatePage() {
  const { getAllTours, tours } = useTourStore();
  React.useEffect(() => {
    getAllTours();
  }, [getAllTours]);
  console.log(tours);

  return (
    <div className="px-5 ">
      <HeaderPages
        title={"wikis"}
        links={[
          { title: "wikis", slug: "/wikis" },
          { title: "create", slug: "/wikis/create", active: true },
        ]}
      ></HeaderPages>
      <FromAddWikis tours={tours} />
    </div>
  );
}

export default WikisCreatePage;
