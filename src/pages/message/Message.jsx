// components/messages/Message.jsx
import { useState } from "react";
import { useUserStore } from "@/stores/useUserStore";
import useMessageStore from "@/stores/useMessageStore";
import { extractTime } from "@/utils/extractTime";
import MessageBubble from "./MessageBubble";
import VoiceMessage from "./VoiceMessage";
import MessageFooter from "./MessageFooter";
import AttachmentList from "./attchments/AttachmentList";
import Avatar from "./Avatar/Avatar";
import NormalMessage from "./NormalMessage";

const Message = ({ message }) => {
  const { user: authUser } = useUserStore();
  const { selectedConversation } = useMessageStore();

  // container-level state
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);
  const [playingAttachmentId, setPlayingAttachmentId] = useState(null);

  const fromMe = message?.senderId === authUser?.id;
  const img = fromMe ? authUser?.imageUrl : selectedConversation?.imageUrl;
  const shake = message.shouldShake;

  const isVoiceMessage =
    message?.type === "voice" || message?.body?.includes("🎤");
  const voiceDuration = message?.duration || "0:07";

  return (
    <div
      className={`flex mb-2 ${fromMe ? "justify-end" : "justify-start"} group`}
    >
      <div
        className={`relative max-w-xs md:max-w-md lg:max-w-lg px-3 ${
          fromMe ? "mr-2" : "ml-2"
        }`}
      >
        <MessageBubble fromMe={fromMe} shake={shake}>
          {/* attachments */}
          <AttachmentList
            attachments={message.attachments}
            fromMe={fromMe}
            playingAttachmentId={playingAttachmentId}
            setPlayingAttachmentId={setPlayingAttachmentId}
          />

          {/* body / voice */}
          {isVoiceMessage ? (
            <VoiceMessage
              isPlaying={isVoicePlaying}
              onToggle={setIsVoicePlaying}
              fromMe={fromMe}
              duration={voiceDuration}
            />
          ) : (
            <NormalMessage
              message={message}
              fromMe={fromMe}
              playingAttachmentId={playingAttachmentId}
            />
          )}
        </MessageBubble>

        <MessageFooter
          fromMe={fromMe}
          time={extractTime(message.createdAt)}
          showDoubleTick={true}
        />

        {/* only for received messages */}
        <Avatar show={!fromMe} img={img} />
      </div>
    </div>
  );
};

export default Message;
