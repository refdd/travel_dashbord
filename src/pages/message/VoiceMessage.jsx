// components/messages/VoiceMessage.jsx
import { Play, Pause, Mic } from "lucide-react";

export default function VoiceMessage({
  isPlaying,
  onToggle,
  fromMe,
  duration = "0:07",
}) {
  return (
    <div className="flex items-center gap-2 min-w-[200px]">
      <button
        onClick={() => onToggle(!isPlaying)}
        className={`
          w-8 h-8 rounded-full flex items-center justify-center
          transition-all duration-200 hover:scale-110
          ${fromMe ? "bg-[#00a884]" : "bg-[#00a884]"}
        `}
      >
        {isPlaying ? (
          <Pause className="w-4 h-4 text-white" />
        ) : (
          <Play className="w-4 h-4 text-white ml-0.5" />
        )}
      </button>

      <div className="flex-1 flex items-center gap-0.5">
        {Array.from({ length: 30 }, (_, i) => (
          <div
            key={i}
            className={`bg-current transition-all duration-100 ${
              isPlaying && i < 15 ? "opacity-100" : "opacity-40"
            }`}
            style={{
              width: "2px",
              height: `${Math.random() * 20 + 8}px`,
              animationDelay: isPlaying ? `${i * 50}ms` : "0ms",
            }}
          />
        ))}
      </div>

      <span className="text-xs opacity-70 min-w-[30px] text-right">
        {duration}
      </span>
      <Mic className="w-4 h-4 opacity-60" />
    </div>
  );
}
