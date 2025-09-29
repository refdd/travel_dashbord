import { useSocketContext } from "@/hooks/useSocketContext";
import useMessageStore from "@/stores/useMessageStore";

const Conversation = ({ conversation, emoji, role }) => {
  const { setSelectedConversation, selectedConversation } = useMessageStore();
  const isSelected = selectedConversation?.id === conversation.id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation.id);

  // Check if this is an AI model conversation
  const isAIModel = role === "MODEL";

  // Dynamic styling based on role
  const getConversationStyles = () => {
    if (isAIModel) {
      return {
        container: `flex gap-2 items-center rounded p-2 py-1 cursor-pointer transition-all duration-200 ${
          isSelected
            ? "bg-gradient-to-r from-purple-500 to-indigo-600 shadow-lg"
            : "hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-indigo-500/20 hover:shadow-md"
        }`,
        avatar:
          "w-8 md:w-12 rounded-full overflow-hidden ring-2 ring-purple-400/50 transition-all duration-300",
        name: "font-bold bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent text-sm md:text-md",
        statusIndicator: isOnline ? "bg-purple-500" : "bg-purple-300",
        statusText: "text-xs text-purple-300 font-medium hidden sm:inline",
        aiIcon: "🤖", // AI robot emoji
        divider: "divider my-0 py-0 h-1 opacity-30",
      };
    } else {
      return {
        container: `flex gap-2 items-center rounded p-2 py-1 cursor-pointer transition-all duration-200 ${
          isSelected ? "bg-sky-500" : "hover:bg-sky-500"
        }`,
        avatar:
          "w-8 md:w-12 rounded-full overflow-hidden ring-2 ring-white/20 transition-all duration-300",
        name: "font-bold text-gray-200 text-sm md:text-md",
        statusIndicator: isOnline ? "bg-green-500" : "bg-gray-400",
        statusText: "text-xs text-green-400 font-medium hidden sm:inline",
        aiIcon: null,
        divider: "divider my-0 py-0 h-1",
      };
    }
  };

  const styles = getConversationStyles();

  return (
    <>
      <div
        className={styles.container}
        onClick={() => setSelectedConversation(conversation)}
      >
        {/* Enhanced Avatar with Status Indicator */}
        <div className="relative">
          <div className={styles.avatar}>
            {!isAIModel && (
              <img
                src={conversation.imageUrl}
                alt={isAIModel ? "AI model avatar" : "user avatar"}
                className="w-full h-full object-cover"
              />
            )}

            {/* AI Badge Overlay */}
            {isAIModel && (
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 flex items-center justify-center">
                <span className="text-3xl">🤖</span>
              </div>
            )}
          </div>

          {/* Online/Offline Status Indicator */}
          <div className="absolute -bottom-0.5 -right-0.5 md:-bottom-1 md:-right-1">
            {isOnline && isAIModel ? (
              // Online Status
              <div className="relative">
                <div
                  className={`w-3 h-3 md:w-4 md:h-4 ${styles.statusIndicator} rounded-full border-2 border-white shadow-sm`}
                ></div>
                {/* Pulse animation for online status */}
                <div
                  className={`absolute inset-0 w-3 h-3 md:w-4 md:h-4 ${styles.statusIndicator} rounded-full animate-pulse opacity-75`}
                ></div>
                <div
                  className={`absolute inset-0 w-3 h-3 md:w-4 md:h-4 ${
                    isAIModel ? "bg-purple-900" : "bg-green-400"
                  } rounded-full animate-ping opacity-20`}
                ></div>
              </div>
            ) : (
              // Offline Status
              <div
                className={`w-3 h-3 md:w-4 md:h-4 ${styles.statusIndicator} rounded-full border-2 border-white shadow-sm relative`}
              >
                {/* Optional: Add a subtle inner shadow for offline state */}
                <div
                  className={`absolute inset-0.5 ${
                    isAIModel ? "bg-purple-400" : "bg-gray-500"
                  } rounded-full`}
                ></div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <div className="flex items-center gap-2">
              {/* AI Model Label */}
              {isAIModel && (
                <div className="flex items-center gap-1">
                  <span className="text-xs bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-2 py-0.5 rounded-full font-medium">
                    AI
                  </span>
                </div>
              )}

              <p className={styles.name}>{conversation.name}</p>

              {/* Online status text indicator */}
              {isOnline && <span className={styles.statusText}>online</span>}
            </div>

            {/* Emoji - use AI icon for models or regular emoji for users */}
            <span className="text-xl hidden md:inline-block">
              {isAIModel ? styles.aiIcon : emoji}
            </span>
          </div>

          {/* AI Model Description */}
          {isAIModel && (
            <p className="text-xs text-bsInfo mt-0.5 hidden sm:block">
              AI Assistant
            </p>
          )}
        </div>
      </div>

      <div className={styles.divider} />
    </>
  );
};

export default Conversation;
