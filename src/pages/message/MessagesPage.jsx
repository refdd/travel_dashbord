import SidebarMessage from "@/components/messages/SidebarMessage";
import { useSocketContext } from "@/hooks/useSocketContext";
import React, { useEffect } from "react";
import MessageContainer from "./MessageContainer";
import useMessageStore from "@/stores/useMessageStore";

function MessagesPage() {
  const { onlineUsers } = useSocketContext();
  const { getAllConversations, conversations } = useMessageStore();
  useEffect(() => {
    getAllConversations();
  }, []);

  return (
    <div className="flex w-full  md:h-[590px] rounded-lg overflow-hidden bg-[#99a1af00]  ">
      <SidebarMessage />
      <div className="divider px-3" />
      <MessageContainer />
    </div>
  );
}

export default MessagesPage;
