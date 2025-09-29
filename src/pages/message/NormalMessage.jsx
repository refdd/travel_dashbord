import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import CallInvitation from "./CallInvitation";
import { safeParseJSON } from "@/utils/safeJson";

function NormalMessage({ message, fromMe, playingAttachmentId }) {
  // try reading body as JSON (call invite), else null
  const payload = useMemo(() => safeParseJSON(message?.body), [message?.body]);
  const navigate = useNavigate();

  const isCallInvite =
    payload &&
    payload.type === "call_invitation" &&
    typeof payload.callId === "string";

  if (isCallInvite) {
    const joinUrl = `/call/${encodeURIComponent(payload.callId)}`;

    const handleJoin = () => {
      // if you need to pre-accept or fetch call state, do it here
      navigate(joinUrl);
    };

    const handleCopyLink = async () => {
      try {
        const absoluteUrl = window.location.origin.replace(/\/$/, "") + joinUrl;
        await navigator.clipboard.writeText(absoluteUrl);
      } catch (e) {
        // optional: show a toast
        console.error("Failed to copy:", e);
      }
    };

    const handleDecline = () => {
      // optional: you could emit a "declined" event or just no-op
      // e.g., call.dismiss?.() or toast
    };

    const invitedBy = payload.invitedBy || {};
    const messageText = payload.message || "";

    return (
      <CallInvitation
        callId={payload.callId}
        invitedBy={invitedBy}
        messageText={messageText}
        onJoin={handleJoin}
        onCopyLink={handleCopyLink}
        onDecline={handleDecline}
      />
    );
  }

  // fallback: render plain text
  const plain = message?.body?.trim();
  return plain ? (
    <div>
      <p className="text-sm leading-relaxed break-words">{plain}</p>
    </div>
  ) : null;
}

export default NormalMessage;
