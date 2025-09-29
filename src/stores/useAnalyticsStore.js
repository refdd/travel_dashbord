import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

export const useAnalyticsStore = create((set) => ({
  analytics: [],
  loading: false,

  // Get all analytics
  getAllanalytics: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/analytics");
      set({ analytics: response.data?.data, loading: false });
    } catch (error) {
      console.log("Error fetching analytics:", error);
      toast.error("Failed to fetch analytics");
      set({ loading: false });
    }
  },
}));
