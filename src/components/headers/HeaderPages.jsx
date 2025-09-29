import React from "react";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

function HeaderPages({ children, links, title }) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between py-5 ">
      <div className="flex flex-col">
        <p className=" text-lg font-medium">{title}</p>
        <Breadcrumb links={links} />
      </div>
      <div className="">{children}</div>
    </div>
  );
}

export default HeaderPages;
