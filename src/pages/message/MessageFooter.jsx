// components/messages/MessageFooter.jsx
export default function MessageFooter({
  fromMe,
  time,
  showDoubleTick = false,
}) {
  return (
    <div
      className={`flex items-center gap-1 mt-1 px-2 ${
        fromMe ? "justify-end text-right" : "justify-start text-left"
      }`}
    >
      <span className="text-[10px] text-[#8696a0]">{time}</span>

      {fromMe && showDoubleTick && (
        <div className="flex items-center">
          <svg
            className="w-4 h-4 text-[#53bdeb]"
            viewBox="0 0 16 15"
            fill="currentColor"
          >
            <path d="m15.01 3.316-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.063-.51z" />
            <path d="m5.482 9.879-.378-.483a.364.364 0 0 0-.484-.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l1.693-2.025a.32.32 0 0 0-.484-.032l-.809.825z" />
          </svg>
        </div>
      )}
    </div>
  );
}
