import { useEffect } from "react";

import notificationSound from "../../assets/sounds/notification.mp3";
import useMessageStore from "@/stores/useMessageStore";
import { useSocketContext } from "@/hooks/useSocketContext";
import toast from "react-hot-toast";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages, selectedConversation } = useMessageStore();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;
      toast.success(`New message from ${newMessage.sender?.name}`, {
        style: {
          border: "1px solid #10B981",
          padding: "16px",
          color: "#374151",
          backgroundColor: "#F0FDF4",
        },
        iconTheme: {
          primary: "#10B981",
          secondary: "#FFFFFF",
        },
        duration: 4000,
      });
      const sound = new Audio(notificationSound);
      sound.play();
      if (selectedConversation?.role !== "MODEL") {
        setMessages([...messages, newMessage]);
      }
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [socket, messages, setMessages]);
};
export default useListenMessages;
