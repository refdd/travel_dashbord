import FromAddBlog from "@/components/forms/FromAddBlog";
import FromAddReview from "@/components/forms/FromAddReview";
import HeaderPages from "@/components/headers/HeaderPages";
import React from "react";

function ReviewsCreatePage() {
  return (
    <div className="px-5 ">
      <HeaderPages
        title={"reviews"}
        links={[
          { title: "reviews", slug: "/reviews" },
          { title: "create", slug: "/reviews/create", active: true },
        ]}
      ></HeaderPages>
      <FromAddReview />
    </div>
  );
}

export default ReviewsCreatePage;
