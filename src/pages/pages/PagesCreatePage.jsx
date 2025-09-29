import FromAddPages from "@/components/forms/FromAddPages";
import FromAddUsers from "@/components/forms/FromAddUsers";
import HeaderPages from "@/components/headers/HeaderPages";
import React from "react";

function PagesCreatePage() {
  return (
    <div className="px-5 ">
      <HeaderPages
        title={"pages"}
        links={[
          { title: "pages", slug: "/pages" },
          { title: "create", slug: "/pages/create", active: true },
        ]}
      ></HeaderPages>
      <FromAddPages />
    </div>
  );
}

export default PagesCreatePage;
