import { useState, useRef } from "react";
import useMessageStore from "@/stores/useMessageStore";
import { useAudioRecording } from "@/context/useAudioRecording";
import AttachmentsList from "./input/AttachmentsList";
import MessageInputField from "./input/MessageInputField";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState([]);
  const fileInputRef = useRef(null);
  const { loading, sendMessage, selectedConversation, aiResponsePending } =
    useMessageStore();

  const handleRecordingComplete = (audioFile) => {
    setAttachments((prev) => [...prev, audioFile]);
  };

  const { isRecording, recordingTime, toggleRecording, stopRecording } =
    useAudioRecording(handleRecordingComplete);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setAttachments((prev) => [...prev, ...files]);
    e.target.value = "";
  };

  const removeAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!message.trim() && attachments.length === 0) return;
    if (loading || aiResponsePending) return; // Prevent submission during loading

    const formData = new FormData();
    formData.append("message", message);

    attachments.forEach((file) => {
      formData.append("attachments", file);
    });

    // The store now handles AI responses automatically
    await sendMessage(formData, selectedConversation.id);

    // Clear form after successful submission
    setMessage("");
    setAttachments([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="px-4 mb-3">
      <AttachmentsList
        attachments={attachments}
        onRemoveAttachment={removeAttachment}
        isRecording={isRecording}
        recordingTime={recordingTime}
        onStopRecording={stopRecording}
      />

      <MessageInputField
        message={message}
        onMessageChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        onFileSelect={handleFileSelect}
        onToggleRecording={toggleRecording}
        onSubmit={handleSubmit}
        loading={loading || aiResponsePending} // Show loading during AI response
        isRecording={isRecording}
        fileInputRef={fileInputRef}
      />
    </div>
  );
};

export default MessageInput;
