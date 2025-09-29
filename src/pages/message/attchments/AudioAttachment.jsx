// at the top of the file (or below imports)
import React, { useEffect, useRef } from "react";

function AudioAttachment({ attachment, fromMe, isThisPlaying, onToggle }) {
  const audioRef = useRef(null);

  // Play/pause when selection changes
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    if (isThisPlaying) {
      el.play().catch(() => {
        /* ignore autoplay block */
      });
    } else {
      el.pause();
    }
    return () => {
      el.pause();
    };
  }, [isThisPlaying]);

  // When audio ends, unselect it
  const handleEnded = () => onToggle(false);

  // Optional: update UI with real duration if you want
  // const [duration, setDuration] = useState(null);

  // Cloudinary tip: webm might not play on Safari. Provide an mp3 fallback by using a transformed URL.
  const webmUrl = attachment.url; // current webm
  const mp3Url = webmUrl.replace(
    "/upload/",
    "/upload/f_auto,q_auto,fl_lossy,c_fill,w_1000,ar_1:1,co_rgb:ffffff/"
  ); // Cloudinary will transcode on the fly

  return (
    <div className="mb-2 p-3 rounded-lg bg-black bg-opacity-20 min-w-[250px]">
      <div className="flex items-center gap-3">
        <button
          onClick={() => onToggle(!isThisPlaying)}
          className={`
            w-10 h-10 rounded-full flex items-center justify-center
            transition-all duration-200 hover:scale-110
            ${fromMe ? "bg-[#00a884]" : "bg-[#00a884]"}
          `}
        >
          {isThisPlaying ? (
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-white">
              <rect x="6" y="5" width="4" height="14" />
              <rect x="14" y="5" width="4" height="14" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-white ml-0.5">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <div className="flex-1">
          <div className="flex items-center gap-1 mb-1">
            <svg viewBox="0 0 24 24" className="w-4 h-4 opacity-60">
              <path d="M3 10v4h4l5 5V5L7 10H3zM16 7.37v9.26c1.21-.91 2-2.36 2-3.99s-.79-3.08-2-3.99zM16 3v2c3.39 1.18 5.77 4.37 5.77 8s-2.38 6.82-5.77 8v2c4.45-1.27 7.77-5.36 7.77-10s-3.32-8.73-7.77-10z" />
            </svg>
            <span className="text-sm opacity-80 truncate">
              {attachment.fileName}
            </span>
          </div>

          {/* Simple bars (keep if you like, but avoid Math.random in render to prevent hydration jitter) */}
          <div className="flex items-center gap-0.5 mb-1">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className={`bg-current transition-all duration-100 ${
                  isThisPlaying && i < 10 ? "opacity-100" : "opacity-40"
                }`}
                style={{ width: "2px", height: `${6 + (i % 8) * 2}px` }}
              />
            ))}
          </div>

          <div className="flex items-center justify-between text-xs opacity-60">
            <span>
              {attachment.durationSec != null
                ? `${Math.floor(attachment.durationSec / 60)}:${String(
                    attachment.durationSec % 60
                  ).padStart(2, "0")}`
                : "Audio"}
            </span>
            {attachment.fileSize ? (
              <span>{Math.round(attachment.fileSize / 1024)} KB</span>
            ) : null}
          </div>
        </div>
      </div>

      {/* Hidden audio element that actually plays */}
      <audio
        ref={audioRef}
        preload="metadata"
        onEnded={handleEnded}
        crossOrigin="anonymous"
      >
        <source src={webmUrl} type={attachment.mimeType || "audio/webm"} />
        <source src={mp3Url} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default AudioAttachment;
