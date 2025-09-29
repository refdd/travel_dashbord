import { Send, Paperclip, Mic, Square } from "lucide-react";

const MessageInputField = ({
  message,
  onMessageChange,
  onKeyPress,
  onFileSelect,
  onToggleRecording,
  onSubmit,
  loading,
  isRecording,
  fileInputRef,
}) => {
  return (
    <div className="w-full relative">
      <input
        type="text"
        className="border text-sm rounded-lg block w-full p-2.5 pr-28 bg-gray-700 border-gray-600 text-white"
        placeholder="Send a message"
        value={message}
        onChange={onMessageChange}
        onKeyPress={onKeyPress}
      />

      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileSelect}
        multiple
        className="hidden"
        accept="*/*"
      />

      <div className="absolute inset-y-0 end-0 flex items-center pe-3 space-x-1">
        {/* Audio Recording Button */}
        <button
          type="button"
          onClick={onToggleRecording}
          className={`transition-colors ${
            isRecording
              ? "text-red-400 hover:text-red-300"
              : "text-gray-400 hover:text-white"
          }`}
          disabled={loading}
        >
          {isRecording ? (
            <Square className="w-5 h-5 fill-current" />
          ) : (
            <Mic className="w-5 h-5" />
          )}
        </button>

        {/* Attachment Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="text-gray-400 hover:text-white transition-colors"
          disabled={loading || isRecording}
        >
          <Paperclip className="w-5 h-5" />
        </button>

        {/* Send Button */}
        <button
          type="button"
          onClick={onSubmit}
          className="text-gray-400 hover:text-white transition-colors"
          disabled={loading || isRecording}
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-gray-400 border-t-white rounded-full animate-spin" />
          ) : (
            <Send className="w-6 h-6" />
          )}
        </button>
      </div>
    </div>
  );
};

export default MessageInputField;
