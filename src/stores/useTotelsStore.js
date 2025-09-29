import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

export const useTotelsStore = create((set) => ({
  hotels: [],
  hotel: null,
  loading: false,

  // Get all hotels
  getAllHotels: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/hotels");
      set({ hotels: response.data, loading: false });
    } catch (error) {
      console.log("Error fetching hotels:", error);
      toast.error("Failed to fetch hotels");
      set({ loading: false });
    }
  },

  // Get hotel by slug
  getHotelBySlug: async (slug) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get(`/hotels/${slug}`);
      set({ hotel: response.data, loading: false });
    } catch (error) {
      console.log("Error fetching hotel:", error);
      toast.error("Failed to fetch hotel");
      set({ loading: false });
    }
  },

  // Get hotel by ID
  getHotelById: async (id) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get(`/hotels/hotelsById/${id}`);
      set({ hotel: response.data, loading: false });
    } catch (error) {
      console.log("Error fetching hotel:", error);
      toast.error("Failed to fetch hotel");
      set({ loading: false });
    }
  },

  // Create hotel
  createHotel: async (newHotel) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post("/hotels", newHotel);
      set((state) => ({
        hotels: [response.data, ...state.hotels],
        loading: false,
      }));
      toast.success("Hotel created successfully");
    } catch (error) {
      console.log("Error creating hotel:", error);
      toast.error(error?.response?.data?.error || "Hotel creation failed");
      set({ loading: false });
      throw error;
    }
  },

  // Edit hotel
  editHotel: async (id, updatedHotel) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.put(`/hotels/${id}`, updatedHotel, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      set((state) => ({
        hotels: state.hotels.map((h) => (h.id === id ? response.data : h)),
        loading: false,
      }));
      toast.success("Hotel updated successfully");
    } catch (error) {
      console.log("Error updating hotel:", error);
      toast.error(error?.response?.data?.error || "Hotel update failed");
      set({ loading: false });
      throw error;
    }
  },

  // Delete hotel
  deleteHotel: async (id) => {
    set({ loading: true });
    try {
      await axiosInstance.delete(`/hotels/${id}`);
      set((state) => ({
        hotels: state.hotels.filter((h) => h.id !== id),
        loading: false,
      }));
      toast.success("Hotel deleted successfully");
    } catch (error) {
      console.log("Error deleting hotel:", error);
      toast.error(error?.response?.data?.error || "Hotel deletion failed");
      set({ loading: false });
    }
  },

  // Bulk delete hotels
  deleteHotelsByIds: async (ids) => {
    set({ loading: true });
    try {
      await axiosInstance.post("/hotels/bulk-delete", { ids });
      set((state) => ({
        hotels: state.hotels.filter((h) => !ids.includes(h.id)),
        loading: false,
      }));
      toast.success("Hotels deleted successfully");
    } catch (error) {
      console.log("Error deleting hotels:", error);
      toast.error(error?.response?.data?.error || "Bulk deletion failed");
      set({ loading: false });
    }
  },
}));
