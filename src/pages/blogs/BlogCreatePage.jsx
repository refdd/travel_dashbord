import FromAddBlog from "@/components/forms/FromAddBlog";
import HeaderPages from "@/components/headers/HeaderPages";
import { useTourStore } from "@/stores/useToursStore";
import React from "react";

function BlogCreatePage() {
  const { getAllTours, tours } = useTourStore();
  React.useEffect(() => {
    getAllTours();
  }, [getAllTours]);

  return (
    <div className="px-5 ">
      <HeaderPages
        title={"blog"}
        links={[
          { title: "blog", slug: "/blog" },
          { title: "create", slug: "/blog/create", active: true },
        ]}
      ></HeaderPages>
      <FromAddBlog tours={tours} />
    </div>
  );
}

export default BlogCreatePage;
