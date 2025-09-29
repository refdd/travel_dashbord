import React from "react";
import SearchBar from "./SearchBar";
import UserNav from "./UserNav";
import { useUserStore } from "@/stores/useUserStore";
import { IoMenu } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { handleChangedrawer } from "@/redux/drawerSlice";

function Navbar() {
  const { user, logout } = useUserStore();
  const dispatch = useDispatch();
  const handelDrawer = () => {
    dispatch(handleChangedrawer());
  };
  return (
    <div className="flex flex-col md:flex-row py-5 items-center justify-between border-b border-[#DBDBDB]">
      <div className="flex items-center gap-6 ">
        <SearchBar />
        <div
          className="block md:hidden"
          onClick={() => {
            handelDrawer();
          }}
        >
          <IoMenu className="text-[#787486] cursor-pointer text-2xl " />
        </div>
      </div>
      <UserNav user={user} logout={logout} />
    </div>
  );
}

export default Navbar;
