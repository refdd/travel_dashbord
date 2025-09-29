import { Video, PhoneOff, Copy, ArrowRight } from "lucide-react";

export default function CallInvitation({
  callId,
  invitedBy,
  messageText,
  onJoin,
  onDecline,
  onCopyLink,
}) {
  const inviterName = invitedBy?.name || "Someone";

  return (
    <div className="w-full max-w-sm rounded-lg bg-black/20 p-3">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center bg-[#0b141a]">
          {invitedBy?.imageUrl ? (
            <img
              src={invitedBy.imageUrl}
              alt={inviterName}
              className="w-full h-full object-cover"
            />
          ) : (
            <Video className="w-5 h-5 opacity-70" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="text-xs uppercase tracking-wide opacity-60">
            Video call invite
          </div>
          <div className="text-sm font-medium mt-0.5 truncate">
            {messageText || `${inviterName} is inviting you to a video call`}
          </div>
          <div className="text-[11px] opacity-60 mt-1 truncate">
            Call ID: {callId}
          </div>

          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={onJoin}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-[#00a884] text-white text-sm hover:opacity-90 transition"
            >
              Join <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onCopyLink}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-black/30 text-white text-sm hover:bg-black/40 transition"
              title="Copy join link"
            >
              <Copy className="w-4 h-4" />
              Copy link
            </button>

            {/* <button
              onClick={onDecline}
              className="ml-auto inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-[#2a3942] text-white text-sm hover:bg-[#30414b] transition"
              title="Dismiss"
            >
              <PhoneOff className="w-4 h-4" />
              Dismiss
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
