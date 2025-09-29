import { useUserStore } from "@/stores/useUserStore";
import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { StreamChat } from "stream-chat";
import config from "@/lib/config";
import { SocketContext } from "./SocketContext";

const socketURL = config.SOCKET_URL;
const STREAM_API_KEY = config.STREAM_API_KEY;

const SocketContextProvider = ({ children }) => {
  const socketRef = useRef(null);
  const streamClientRef = useRef(null);
  const connectionTimeoutRef = useRef(null);
  const isConnectingRef = useRef(false);

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isStreamConnected, setIsStreamConnected] = useState(false);
  const { user: authUser, isLoading } = useUserStore();

  // Initialize Stream Chat client once
  useEffect(() => {
    if (!streamClientRef.current) {
      streamClientRef.current = StreamChat.getInstance(STREAM_API_KEY);
    }
  }, []);

  // Handle Socket.IO and Stream Chat connections
  useEffect(() => {
    if (authUser && !isLoading && authUser.streamToken) {
      // Connect to Socket.IO
      const socket = io(socketURL, {
        query: {
          userId: authUser.id,
        },
        withCredentials: true,
      });
      socketRef.current = socket;

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      // Connect to Stream Chat with retry logic and debouncing
      const connectToStreamChat = async (retryCount = 0) => {
        // Prevent multiple simultaneous connection attempts
        if (isConnectingRef.current || isStreamConnected) {
          console.log("Connection already in progress or connected");
          return;
        }

        isConnectingRef.current = true;

        try {
          if (streamClientRef.current) {
            // Check if user is already connected
            if (streamClientRef.current.user) {
              console.log("User already connected to Stream Chat");
              setIsStreamConnected(true);
              isConnectingRef.current = false;
              return;
            }

            await streamClientRef.current.connectUser(
              {
                id: authUser.id,
                name: authUser.name,
                image: authUser.imageUrl || undefined,
              },
              authUser.streamToken
            );

            setIsStreamConnected(true);
            isConnectingRef.current = false;
            console.log("Connected to Stream Chat successfully");
          }
        } catch (error) {
          console.error("Error connecting to Stream Chat:", error);
          setIsStreamConnected(false);
          isConnectingRef.current = false;

          // Implement exponential backoff for rate limiting errors
          if (error.code === 9 || error.StatusCode === 429) {
            const delay = Math.min(1000 * Math.pow(2, retryCount), 30000); // Max 30 seconds
            console.log(`Rate limited. Retrying in ${delay}ms...`);

            if (retryCount < 5) {
              // Max 5 retries
              connectionTimeoutRef.current = setTimeout(() => {
                connectToStreamChat(retryCount + 1);
              }, delay);
            } else {
              console.error(
                "Max retries reached. Please wait before trying again."
              );
            }
          }
        }
      };

      // Debounce connection attempts
      if (connectionTimeoutRef.current) {
        clearTimeout(connectionTimeoutRef.current);
      }

      connectionTimeoutRef.current = setTimeout(() => {
        connectToStreamChat();
      }, 100); // Small delay to debounce rapid changes

      // Cleanup function
      return () => {
        // Clear any pending connection timeouts
        if (connectionTimeoutRef.current) {
          clearTimeout(connectionTimeoutRef.current);
          connectionTimeoutRef.current = null;
        }

        // Reset connection state
        isConnectingRef.current = false;

        // Close Socket.IO connection
        if (socket) {
          socket.close();
          socketRef.current = null;
        }

        // Disconnect from Stream Chat
        const disconnectFromStreamChat = async () => {
          try {
            if (streamClientRef.current && isStreamConnected) {
              await streamClientRef.current.disconnectUser();
              setIsStreamConnected(false);
              console.log("Disconnected from Stream Chat");
            }
          } catch (error) {
            console.error("Error disconnecting from Stream Chat:", error);
          }
        };

        disconnectFromStreamChat();
      };
    } else if (!authUser && !isLoading) {
      // User is not authenticated, clean up connections

      // Clear any pending connection timeouts
      if (connectionTimeoutRef.current) {
        clearTimeout(connectionTimeoutRef.current);
        connectionTimeoutRef.current = null;
      }

      // Reset connection state
      isConnectingRef.current = false;

      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }

      const disconnectFromStreamChat = async () => {
        try {
          if (streamClientRef.current && isStreamConnected) {
            await streamClientRef.current.disconnectUser();
            setIsStreamConnected(false);
            console.log("Disconnected from Stream Chat (user logged out)");
          }
        } catch (error) {
          console.error("Error disconnecting from Stream Chat:", error);
        }
      };

      disconnectFromStreamChat();
    }
  }, [authUser, isLoading, isStreamConnected]);

  // Handle connection status changes
  useEffect(() => {
    const streamClient = streamClientRef.current;
    if (!streamClient) return;

    const handleConnectionChanged = (event) => {
      console.log("Stream connection status changed:", event);
      setIsStreamConnected(event.online);
    };

    streamClient.on("connection.changed", handleConnectionChanged);

    return () => {
      streamClient.off("connection.changed", handleConnectionChanged);
    };
  }, []);

  const contextValue = {
    socket: socketRef.current,
    onlineUsers,
    streamClient: streamClientRef.current,
    isStreamConnected,
  };

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
