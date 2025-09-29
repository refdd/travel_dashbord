import { formatFileSize } from "@/utils/fileUtils";
import { X, Paperclip } from "lucide-react";

const FileAttachment = ({ file, index, onRemove }) => {
  const getFileIcon = (file) => {
    if (file.type.startsWith("audio/")) {
      return (
        <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
          <span className="text-xs text-white font-bold">🎵</span>
        </div>
      );
    }
    return <Paperclip className="w-4 h-4 text-gray-400" />;
  };

  return (
    <div className="flex items-center justify-between bg-gray-600 p-2 rounded-lg">
      <div className="flex items-center space-x-2">
        {getFileIcon(file)}
        <span className="text-sm text-white truncate max-w-xs">
          {file.name}
          {file.type.startsWith("audio/") && (
            <span className="text-green-400 ml-1">(Audio)</span>
          )}
        </span>
        <span className="text-xs text-gray-400">
          ({formatFileSize(file.size)})
        </span>
      </div>
      <button
        type="button"
        onClick={() => onRemove(index)}
        className="text-gray-400 hover:text-red-400 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default FileAttachment;
