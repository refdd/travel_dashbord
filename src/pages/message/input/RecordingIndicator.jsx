import { formatTime } from "@/utils/fileUtils";
import { Square } from "lucide-react";

const RecordingIndicator = ({ recordingTime, onStop }) => {
  return (
    <div className="mb-3">
      <div className="flex items-center justify-between bg-red-600 p-2 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
          <span className="text-sm text-white">Recording...</span>
          <span className="text-sm text-white font-mono">
            {formatTime(recordingTime)}
          </span>
        </div>
        <button
          type="button"
          onClick={onStop}
          className="text-white hover:text-red-200 transition-colors"
        >
          <Square className="w-4 h-4 fill-current" />
        </button>
      </div>
    </div>
  );
};

export default RecordingIndicator;
