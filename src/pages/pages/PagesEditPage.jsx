import FromAddPages from "@/components/forms/FromAddPages";
import FromAddRegion from "@/components/forms/FromAddRegion";
import HeaderPages from "@/components/headers/HeaderPages";
import LoadingSpinner from "@/components/loadgin/LoadingSpinner";
import { usePageStore } from "@/stores/usePageStore";
import React from "react";
import { useParams } from "react-router-dom";

function PagesEditPage() {
  const { id } = useParams();
  const { getPageById, currentPage, loading } = usePageStore();

  React.useEffect(() => {
    if (id) {
      getPageById(id);
    }
  }, [id, getPageById]);
  console.log("Editing region:", currentPage);
  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="px-5 ">
      <HeaderPages
        title={"pages"}
        links={[
          { title: "pages", slug: "/pages" },
          { title: "Edit", slug: "/pages/edit", active: true },
        ]}
      ></HeaderPages>
      <div className="mt-5">
        <FromAddPages pages={currentPage} />
      </div>
    </div>
  );
}

export default PagesEditPage;
