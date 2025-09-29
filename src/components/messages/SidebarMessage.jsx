import React from "react";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";

function SidebarMessage() {
  return (
    <div className="border-r border-slate-500 p-1 md:p-4 flex flex-col w-44 md:w-1/3">
      <SearchInput />
      <div className="divider px-3" />
      <Conversations />
      {/* <LogoutButton /> */}
    </div>
  );
}

export default SidebarMessage;
