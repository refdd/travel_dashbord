import FromAddBlog from "@/components/forms/FromAddBlog";
import HeaderPages from "@/components/headers/HeaderPages";
import LoadingSpinner from "@/components/loadgin/LoadingSpinner";
import { useBlogStore } from "@/stores/useBlogStore";
import { useTourStore } from "@/stores/useToursStore";
import React from "react";
import { useParams } from "react-router-dom";

function BlogEditPage() {
  const { getAllTours, tours } = useTourStore();
  const { getBlogById, blog, loading } = useBlogStore();
  const { id } = useParams();

  React.useEffect(() => {
    if (id) {
      getBlogById(id);
    }
  }, [id, getBlogById]);
  React.useEffect(() => {
    getAllTours();
  }, [getAllTours]);

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="px-5 ">
      <HeaderPages
        title={"blog"}
        links={[
          { title: "Blog", slug: "/blog" },
          { title: "Edit", slug: "/blog/edit", active: true },
        ]}
      ></HeaderPages>
      <FromAddBlog tours={tours} blog={blog} />
    </div>
  );
}

export default BlogEditPage;
