import FromAddBlog from "@/components/forms/FromAddBlog";
import FromAddReview from "@/components/forms/FromAddReview";
import HeaderPages from "@/components/headers/HeaderPages";
import LoadingSpinner from "@/components/loadgin/LoadingSpinner";
import { useReviewsStore } from "@/stores/useRviewsStore";
import React from "react";
import { useParams } from "react-router-dom";

function ReviewsEditPage() {
  const { id } = useParams();
  const { getReviewById, review, loading } = useReviewsStore();
  React.useEffect(() => {
    getReviewById(id);
  }, [getReviewById, id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="px-5 ">
      <HeaderPages
        title={"reviews"}
        links={[
          { title: "reviews", slug: "/reviews" },
          { title: "edit", slug: "/reviews/edit", active: true },
        ]}
      ></HeaderPages>
      <FromAddReview review={review} />
    </div>
  );
}

export default ReviewsEditPage;
