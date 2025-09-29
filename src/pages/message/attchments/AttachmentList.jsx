// components/messages/AttachmentList.jsx

import { formatFileSize } from "@/utils/fileUtils";
import ImageAttachment from "./ImageAttachment";
import VideoAttachment from "./VideoAttachment";
import AudioAttachment from "./AudioAttachment";
import FileAttachment from "./FileAttachment";

export default function AttachmentList({
  attachments = [],
  fromMe,
  playingAttachmentId,
  setPlayingAttachmentId,
}) {
  if (!attachments?.length) return null;

  return (
    <div className="mb-2">
      {attachments.map((att) => {
        const { id, type, url, fileName, fileSize, mimeType, durationSec } =
          att;

        switch (type) {
          case "IMAGE":
            return (
              <ImageAttachment
                key={id}
                url={url}
                fileName={fileName}
                id={id} // if the child needs it
              />
            );

          case "VIDEO":
            return (
              <VideoAttachment
                key={id}
                url={url}
                fileName={fileName}
                mimeType={mimeType}
                durationSec={durationSec}
                fileSize={fileSize != null ? formatFileSize(fileSize) : null}
                id={id}
              />
            );

          case "AUDIO": {
            const isThisPlaying = playingAttachmentId === id;
            return (
              <AudioAttachment
                key={id}
                attachment={att}
                fromMe={fromMe}
                isThisPlaying={isThisPlaying}
                onToggle={(next) => setPlayingAttachmentId(next ? id : null)}
                id={id}
              />
            );
          }

          case "FILE":
            return (
              <FileAttachment
                key={id}
                url={url}
                fileName={fileName}
                mimeType={mimeType}
                fromMe={fromMe}
                fileSize={fileSize != null ? formatFileSize(fileSize) : null}
                id={id}
              />
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
