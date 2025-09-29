import FromAddBlog from "@/components/forms/FromAddBlog";
import FromAddWikis from "@/components/forms/FromAddWikis";
import HeaderPages from "@/components/headers/HeaderPages";
import LoadingSpinner from "@/components/loadgin/LoadingSpinner";
import { useTourStore } from "@/stores/useToursStore";
import { useWikisStore } from "@/stores/useWikisStore";
import React from "react";
import { useParams } from "react-router-dom";

function WikisEditPage() {
  const { getAllTours, tours } = useTourStore();
  const { getWikiById, wiki, loading } = useWikisStore();
  const { id } = useParams();

  React.useEffect(() => {
    if (id) {
      getWikiById(id);
    }
  }, [id, getWikiById]);
  React.useEffect(() => {
    getAllTours();
  }, [getAllTours]);

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="px-5 ">
      <HeaderPages
        title={"wiki"}
        links={[
          { title: "wiki", slug: "/wiki" },
          { title: "Edit", slug: "/wiki/edit", active: true },
        ]}
      ></HeaderPages>
      <FromAddWikis tours={tours} wiki={wiki} />
    </div>
  );
}

export default WikisEditPage;
