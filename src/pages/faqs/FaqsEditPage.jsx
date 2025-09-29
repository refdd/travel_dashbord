import FromAddFaq from "@/components/forms/FromAddFaq";
import FromAddRegion from "@/components/forms/FromAddRegion";
import HeaderPages from "@/components/headers/HeaderPages";
import LoadingSpinner from "@/components/loadgin/LoadingSpinner";
import { useFaqsStore } from "@/stores/useFaqsStore";
import React from "react";
import { useParams } from "react-router-dom";

function FaqsEditPage() {
  const { id } = useParams();
  const { getFaqById, faq, loading } = useFaqsStore();

  React.useEffect(() => {
    if (id) {
      getFaqById(id);
    }
  }, [id, getFaqById]);

  if (loading) {
    return <LoadingSpinner />;
  }
  console.log(faq);

  return (
    <div className="px-5 ">
      <HeaderPages
        title={"faqs"}
        links={[
          { title: "faqs", slug: "/faqs" },
          { title: "Edit", slug: "/faqs/edit", active: true },
        ]}
      ></HeaderPages>
      <div className="mt-5">
        <FromAddFaq faq={faq} />
      </div>
    </div>
  );
}

export default FaqsEditPage;
