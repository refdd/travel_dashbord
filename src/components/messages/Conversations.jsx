import useMessageStore from "@/stores/useMessageStore";
import React from "react";
import { getRandomEmoji } from "@/utils/emojis";
import Conversation from "@/pages/message/Conversation";

function Conversations() {
  const { conversations, loading } = useMessageStore();
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation) => (
        <Conversation
          key={conversation.id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          role={conversation.role} // == MODEL for AI
        />
      ))}
      {loading ? <span className="loading loading-spinner mx-auto" /> : null}
    </div>
  );
}

export default Conversations;
