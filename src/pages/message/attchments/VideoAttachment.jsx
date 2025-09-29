// components/messages/attachments/VideoAttachment.jsx
export default function VideoAttachment({
  url,
  fileName,
  fileSize,
  mimeType,
  durationSec,
}) {
  return (
    <div className="mb-2 rounded-lg overflow-hidden max-w-sm">
      <video
        controls
        className="w-full h-auto rounded-t-lg"
        style={{ maxHeight: "300px" }}
      >
        <source src={url} type={mimeType} />
        Your browser does not support the video tag.
      </video>
      <div className="p-2 bg-black bg-opacity-20 flex items-center justify-between">
        <div>
          <p className="text-xs opacity-70 truncate">{fileName}</p>
          {fileSize != null && <p className="text-xs opacity-50">{fileSize}</p>}
        </div>
        {durationSec != null && (
          <span className="text-xs opacity-70">
            {Math.floor(durationSec / 60)}:
            {(durationSec % 60).toString().padStart(2, "0")}
          </span>
        )}
      </div>
    </div>
  );
}
