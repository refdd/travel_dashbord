import React from "react";
import { IoMdHome } from "react-icons/io";
import { Link } from "react-router-dom";

function Breadcrumb({ links }) {
  return (
    <div className="px-5 py-3">
      <div className="flex items-center gap-3">
        <Link to="/">
          {" "}
          <div className="">
            <p className=" text-base md:text-lg  text-bsSecondary ">
              Home page
            </p>
          </div>{" "}
        </Link>
        {links?.map((link, index) => (
          <div key={index} className=" flex items-center">
            <span className=" text-base md:text-lg  text-[#8B8D97] mr-2">
              /
            </span>

            <Link to={`${link?.slug}`}>
              <span
                className={` text-base md:text-lg   ${
                  link?.active
                    ? "text-[#B4B4B4] font-semibold"
                    : "text-bsSecondary"
                }  pr-3`}
              >
                {link?.title}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Breadcrumb;
