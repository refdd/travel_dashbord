import useMessageStore from "@/stores/useMessageStore";
import React, { useEffect } from "react";
import MessageSkeleton from "./MessageSkeleton";
import Message from "./Message";
import useListenMessages from "@/components/hooks/useListenMessages";
import useChatScroll from "@/components/hooks/useChatScroll";

function Messages({ userToChatId }) {
  const { getMessages, messages, loading } = useMessageStore();
  useEffect(() => {
    getMessages(userToChatId);
  }, [userToChatId, getMessages]);
  useListenMessages();
  const ref = useChatScroll(messages);

  if (loading) {
    return <span className="loading loading-spinner mx-auto" />;
  }

  return (
    <div className="px-4 flex-1 overflow-auto" ref={ref}>
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading &&
        messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}

      {!loading && messages.length === 0 && (
        <p className="text-center text-white">
          Send a message to start the conversation
        </p>
      )}
    </div>
  );
}

export default Messages;
