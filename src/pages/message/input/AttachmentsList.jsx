import FileAttachment from "./FileAttachment";
import RecordingIndicator from "./RecordingIndicator";

const AttachmentsList = ({
  attachments,
  onRemoveAttachment,
  isRecording,
  recordingTime,
  onStopRecording,
}) => {
  if (attachments.length === 0 && !isRecording) return null;

  return (
    <div className="mb-3 space-y-2">
      {isRecording && (
        <RecordingIndicator
          recordingTime={recordingTime}
          onStop={onStopRecording}
        />
      )}

      {attachments.map((file, index) => (
        <FileAttachment
          key={index}
          file={file}
          index={index}
          onRemove={onRemoveAttachment}
        />
      ))}

      {attachments.length > 0 && (
        <div className="text-xs text-gray-400">
          {attachments.length} file{attachments.length > 1 ? "s" : ""} selected
        </div>
      )}
    </div>
  );
};

export default AttachmentsList;
