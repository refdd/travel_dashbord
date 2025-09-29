// components/messages/attachments/FileAttachment.jsx
import { getFileIcon } from "@/utils/fileUtils";
import { Download } from "lucide-react";

export default function FileAttachment({
  url,
  fileName,
  fileSize,
  mimeType,
  fromMe,
}) {
  const Icon = getFileIcon(mimeType);
  const ext = fileName?.split(".").pop()?.toUpperCase();

  return (
    <div className="mb-2 p-3 rounded-lg bg-black bg-opacity-20 min-w-[200px]">
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            fromMe ? "bg-[#00a884]" : "bg-[#374151]"
          }`}
        >
          {Icon}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{fileName}</p>
          <div className="flex items-center gap-2 text-xs opacity-60">
            {ext && <span>{ext}</span>}
            {fileSize && <span>• {fileSize}</span>}
          </div>
        </div>

        <button
          onClick={() => window.open(url, "_blank")}
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black hover:bg-opacity-20 transition-all duration-200"
          title="Download"
        >
          <Download className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
