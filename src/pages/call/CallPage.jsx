"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  CallParticipantsList,
  PaginatedGridLayout,
  CallingState,
  useCallStateHooks,
  SpeakerLayout,
  StreamTheme,
} from "@stream-io/video-react-sdk";
import { useUserStore } from "@/stores/useUserStore";
import toast from "react-hot-toast";
import "@stream-io/video-react-sdk/dist/css/styles.css";
const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

// Simple global cache to survive StrictMode re-mounts in dev
const callCache = {};
const joinCache = {};

const CallContent = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const navigate = useNavigate();

  // Redirect in an effect, not during render
  useEffect(() => {
    if (callingState === CallingState.LEFT) {
      navigate("/", { replace: true });
    }
  }, [callingState, navigate]);

  // While redirecting (or if already left), render nothing
  if (callingState === CallingState.LEFT) {
    return null;
  }

  return (
    <StreamTheme className="flex flex-col h-full">
      <SpeakerLayout />
      <CallControls />
    </StreamTheme>
  );
};
export default function CallPage() {
  const { user } = useUserStore(); // { id, name, imageUrl, streamToken, ... }
  const { callId: raw } = useParams();
  const callId = decodeURIComponent(raw || "");
  const navigate = useNavigate();

  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [ready, setReady] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true);

  // Create StreamVideo client when user data is available
  useEffect(() => {
    const initClient = async () => {
      if (!user?.streamToken || !user.id || !callId) return;

      try {
        const videoClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user: {
            id: user.id,
            name: user.name,
            image: user.imageUrl,
          },
          token: user.streamToken,
        });

        setClient(videoClient);
      } catch (error) {
        console.error("Error initializing Stream client:", error);
        toast.error("Cannot initialize video client.");
      }
    };

    initClient();

    // Cleanup function
    return () => {
      if (client) {
        client.disconnectUser();
      }
    };
  }, [user, callId]);

  // Create and join call
  const call_instance = useMemo(() => {
    if (!client || !callId) return null;
    const key = `${client.user?.id ?? "anon"}::${callId}`;
    if (!callCache[key]) {
      callCache[key] = client.call("default", callId);
    }
    return callCache[key];
  }, [client, callId]);

  useEffect(() => {
    if (!call_instance || !client) return;

    const key = `${client?.user?.id ?? "anon"}::${callId}`;

    // If a join is already in-flight or completed, reuse it
    if (!joinCache[key]) {
      joinCache[key] = (async () => {
        try {
          await call_instance.getOrCreate({ ring: false, data: {} });

          // If SDK exposes callingState, skip double-join
          // @ts-ignore
          if (call_instance.state?.callingState === "joined") return;

          try {
            await call_instance.join({ create: false });
          } catch (e) {
            // Ignore the specific "join only once" error, treat as joined
            if (
              typeof e?.message === "string" &&
              e.message.includes("call.join() shall be called only once")
            ) {
              return;
            }
            throw e;
          }
        } catch (error) {
          console.error("Error creating/joining call:", error);
          toast.error("Cannot connect to the call.");
          throw error;
        }
      })();
    }

    let alive = true;
    joinCache[key]
      .then(() => {
        if (alive) {
          setCall(call_instance);
          setReady(true);
        }
      })
      .catch((e) => {
        // Allow retry after failure
        delete joinCache[key];
        console.error("Failed to join call:", e);
      })
      .finally(() => {
        if (alive) {
          setIsConnecting(false);
        }
      });

    return () => {
      alive = false;
      // Do NOT call leave() here; leaving on every dev re-mount re-triggers joins
      // Let user press "Leave" or navigate away to call leave()
    };
  }, [call_instance, client, callId]);

  // Loading states
  if (!user || isConnecting) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="text-lg">Connecting to call...</div>
          <div className="text-sm text-gray-500 mt-2">Please wait</div>
        </div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="p-6">Connecting video…</div>
      </div>
    );
  }

  if (!call) {
    return (
      <div className="h-screen flex justify-center items-center ">
        <div className="p-6">Preparing call…</div>
      </div>
    );
  }

  if (!ready) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="p-6">Joining call…</div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-y-scroll flex flex-col gap-2 p-3 bg-slate-50 pb-10">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Call: {callId}</h1>
        <button
          className="px-3 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors"
          onClick={() => {
            // Leave explicitly when the user leaves
            if (call) {
              call.leave().finally(() => {
                // Clean up cache entries
                const key = `${client?.user?.id ?? "anon"}::${callId}`;
                delete callCache[key];
                delete joinCache[key];
                navigate(-1);
              });
            } else {
              navigate(-1);
            }
          }}
        >
          Leave
        </button>
      </div>

      <div className="flex-1 rounded-xl overflow-hidden border bg-white">
        {client && call ? (
          <StreamVideo client={client}>
            <StreamCall call={call}>
              <CallContent />
            </StreamCall>
          </StreamVideo>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p>Could not initialize call. Please refresh or try again later</p>
          </div>
        )}
      </div>

      {/* <div className="rounded-xl border p-2 bg-red-500">
        {client && call && (
          <StreamVideo client={client}>
            <StreamCall call={call}>
              <CallParticipantsList />
            </StreamCall>
          </StreamVideo>
        )}
      </div> */}
    </div>
  );
}
