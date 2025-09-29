// components/messages/attachments/ImageAttachment.jsx
export default function ImageAttachment({ url, fileName }) {
  return (
    <div className="mb-2 rounded-lg overflow-hidden max-w-xs">
      <img
        src={url}
        alt={fileName}
        className="w-full h-auto cursor-pointer hover:opacity-90 transition-opacity"
        onClick={() => window.open(url, "_blank")}
        style={{ maxHeight: "300px", objectFit: "cover" }}
      />
      <div className="p-2 bg-black bg-opacity-20">
        <p className="text-xs opacity-70 truncate">{fileName}</p>
      </div>
    </div>
  );
}
