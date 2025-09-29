import FromAddBlog from "@/components/forms/FromAddBlog";
import FromAddFaq from "@/components/forms/FromAddFaq";
import HeaderPages from "@/components/headers/HeaderPages";
import React from "react";

function FaqsCreatePage() {
  return (
    <div className="px-5 ">
      <HeaderPages
        title={"faqs"}
        links={[
          { title: "faqs", slug: "/faqs" },
          { title: "create", slug: "/faqs/create", active: true },
        ]}
      ></HeaderPages>
      <FromAddFaq />
    </div>
  );
}

export default FaqsCreatePage;
