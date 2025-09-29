import FromAddRegion from "@/components/forms/FromAddRegion";
import FromAddUsers from "@/components/forms/FromAddUsers";
import HeaderPages from "@/components/headers/HeaderPages";
import LoadingSpinner from "@/components/loadgin/LoadingSpinner";
import { useRegionStore } from "@/stores/useRegionStore";
import { useUserStore } from "@/stores/useUserStore";
import React from "react";
import { useParams } from "react-router-dom";

function UsersEditPage() {
  const { id } = useParams();
  const { getUserById, user, loading } = useUserStore();

  React.useEffect(() => {
    if (id) {
      getUserById(id);
    }
  }, [id, getUserById]);
  console.log("Editing user:", user);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="px-5 ">
      <HeaderPages
        title={"users"}
        links={[
          { title: "users", slug: "/users" },
          { title: "Edit", slug: "/users/edit", active: true },
        ]}
      ></HeaderPages>
      <div className="mt-5">
        <FromAddUsers user={user} />
      </div>
    </div>
  );
}

export default UsersEditPage;
