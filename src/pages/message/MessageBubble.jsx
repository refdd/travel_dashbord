// components/messages/MessageBubble.jsx
export default function MessageBubble({ fromMe, shake, children }) {
  return (
    <div
      className={`
          relative px-3 py-2 rounded-lg shadow-sm transition-all duration-200
          ${shake ? "shake" : ""}
          ${
            fromMe
              ? "bg-[#005c4b] text-white ml-8"
              : "bg-[#202c33] text-white mr-8"
          }
        `}
    >
      {children}

      {/* tail */}
      <div
        className={`
            absolute top-0 w-0 h-0 rotate-[188deg]
            ${
              fromMe
                ? "right-[-1px] border-l-[8px] border-l-[#005c4b] border-t-[8px] border-t-transparent"
                : "left-[-1px] border-r-[8px] border-r-[#202c33] border-t-[8px] border-t-transparent"
            }
          `}
      />
    </div>
  );
}
