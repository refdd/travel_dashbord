import { PropsWithChildren, useMemo } from "react";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { useUserStore } from "@/stores/useUserStore";

export default function StreamVideoProvider({ children }) {
  const { user } = useUserStore(); // { id, name, imageUrl, streamToken, ... }

  const client = useMemo(() => {
    if (!user?.id || !user?.streamToken) return null;
    return new StreamVideoClient({
      apiKey: import.meta.env.VITE_STREAM_API_KEY, // same API key as Chat
      user: {
        id: user.id,
        name: user.name,
        image: user.imageUrl,
      },
      token: user.streamToken,
    });
  }, [user?.id, user?.streamToken]);

  if (!client) return <>{children}</>;

  return <StreamVideo client={client}>{children}</StreamVideo>;
}
