import useMessageStore from "@/stores/useMessageStore";
import { MessageCircle, Phone } from "lucide-react";
import { useUserStore } from "@/stores/useUserStore";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { useNavigate } from "react-router-dom";

const MessageContainer = () => {
  const { selectedConversation, sendMessage } = useMessageStore();
  const { user } = useUserStore();
  const navigate = useNavigate();

  const handleCall = async () => {
    if (!selectedConversation || !user) return;

    try {
      // Build a deterministic callId for 1:1 conversation
      const ids = [user.id, selectedConversation.id].sort();
      const callId = `dm-${ids.join("-")}`;

      // Create call invitation message
      const callInvitation = {
        type: "call_invitation",
        callId: callId,
        invitedBy: {
          id: user.id,
          name: user.name,
          imageUrl: user.imageUrl,
        },
        message: `${user.name} is inviting you to a video call`,
        timestamp: new Date().toISOString(),
      };

      // Create FormData for the message
      const formData = new FormData();
      formData.append("message", JSON.stringify(callInvitation));
      formData.append("messageType", "call_invitation");

      // Send the call invitation message
      await sendMessage(formData, selectedConversation.id);

      console.log("Call invitation sent!");
    } catch (error) {
      console.error("Error sending call invitation:", error);
    }
  };

  if (!selectedConversation) return <NoChatSelected />;

  return (
    <div className="w-full flex flex-col">
      {/* Header */}
      <div className="bg-slate-200 px-4 py-2 mb-2 flex items-center justify-between">
        <div>
          <span className="label-text">To: </span>
          <span className="text-gray-900 font-bold">
            {selectedConversation.name}
          </span>
        </div>
        <button
          onClick={handleCall}
          className="bg-green-500 hover:bg-green-600 px-3 py-2 text-white rounded-md flex items-center gap-2 transition-colors"
          disabled={!user}
        >
          <Phone className="w-4 h-4" />
          Invite to Call
        </button>
      </div>

      <Messages userToChatId={selectedConversation.id} />
      <MessageInput />
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { user: authUser } = useUserStore();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-bsInfo font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser?.name} ❄</p>
        <p>Select a chat to start messaging</p>
        <MessageCircle className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
