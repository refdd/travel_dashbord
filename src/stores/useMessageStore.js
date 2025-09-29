// Alternative approach: Handle AI response in the store
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";

const useMessageStore = create((set, get) => ({
  selectedConversation: null,
  loading: false,
  aiResponsePending: false, // Track if AI response is pending
  lastMessageId: null, // Track last message to prevent duplicates

  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  conversations: [],
  setMessages: (messages) => set({ messages }),

  getAllConversations: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/messages/conversations");
      set({ conversations: response.data, loading: false });
    } catch (error) {
      console.log("Error fetching conversations:", error);
      toast.error("Failed to fetch conversations");
      set({ loading: false });
    }
  },

  getMessages: async (id) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get(`/messages/${id}`);
      set({ messages: response.data, loading: false });
    } catch (error) {
      console.log("Error fetching messages:", error);
      toast.error("Failed to fetch messages");
      set({ loading: false });
    }
  },

  sendMessage: async (message, receiverId) => {
    const state = get();

    // Prevent sending if already loading or AI response pending
    if (state.loading || state.aiResponsePending) return;

    set({ loading: true });
    try {
      const response = await axiosInstance.post(
        `/messages/send/${receiverId}`,
        message
      );

      const newMessage = response.data;
      set((state) => ({
        messages: [...state.messages, newMessage],
        loading: false,
        lastMessageId: newMessage.id,
      }));

      // Auto-send to AI if conversation is with AI model
      const { selectedConversation } = get();
      if (selectedConversation?.role === "MODEL") {
        // Set pending to prevent duplicate calls
        set({ aiResponsePending: true });

        setTimeout(async () => {
          try {
            const aiResponse = await axiosInstance.post(
              `/ai/chat/${receiverId}`,
              message
            );

            set((state) => ({
              messages: [...state.messages, aiResponse.data],
              aiResponsePending: false,
            }));
          } catch (error) {
            console.log("Error sending message to AI:", error);
            toast.error("Failed to get AI response");
            set({ aiResponsePending: false });
          }
        }, 2000);
      }
    } catch (error) {
      console.log("Error sending message:", error);
      toast.error("Failed to send message");
      set({ loading: false });
    }
  },

  // Keep this method for manual AI calls if needed
  sendMessageToAiModel: async (message, receiverId) => {
    const state = get();
    if (state.aiResponsePending) return; // Prevent duplicate calls

    set({ aiResponsePending: true });
    try {
      const response = await axiosInstance.post(
        `/ai/chat/${receiverId}`,
        message
      );
      set((state) => ({
        messages: [...state.messages, response.data],
        aiResponsePending: false,
      }));
    } catch (error) {
      console.log("Error sending message to AI:", error);
      toast.error("Failed to send message to AI");
      set({ aiResponsePending: false });
    }
  },
}));

export default useMessageStore;
