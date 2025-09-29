import FromAddUsers from "@/components/forms/FromAddUsers";
import HeaderPages from "@/components/headers/HeaderPages";
import React from "react";

function UsersCreatePage() {
  return (
    <div className="px-5 ">
      <HeaderPages
        title={"users"}
        links={[
          { title: "users", slug: "/users" },
          { title: "create", slug: "/users/create", active: true },
        ]}
      ></HeaderPages>
      <FromAddUsers />
    </div>
  );
}

export default UsersCreatePage;
