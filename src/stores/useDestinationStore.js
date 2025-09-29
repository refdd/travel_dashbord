import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

export const useDestinationStore = create((set) => ({
  destinations: [],
  destination: null,
  loading: false,

  // Get all destinations
  getAllDestinations: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/destinations");
      set({ destinations: response.data, loading: false });
    } catch (error) {
      console.log("Error fetching destinations:", error);
      toast.error("Failed to fetch destinations");
      set({ loading: false });
    }
  },

  // Get destination by slug
  getDestinationBySlug: async (slug) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get(`/destinations/${slug}`);
      set({ destination: response.data, loading: false });
    } catch (error) {
      console.log("Error fetching destination:", error);
      toast.error("Failed to fetch destination");
      set({ loading: false });
    }
  },

  // Get destination by ID
  getDestinationById: async (id) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get(
        `/destinations/destinationsById/${id}`
      );
      set({ destination: response.data, loading: false });
    } catch (error) {
      console.log("Error fetching destination:", error);
      toast.error("Failed to fetch destination");
      set({ loading: false });
    }
  },

  // Create destination
  createDestination: async (newDestination) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post(
        "/destinations",
        newDestination
      );
      set((state) => ({
        destinations: [response.data, ...state.destinations],
        loading: false,
      }));
      toast.success("Destination created successfully");
    } catch (error) {
      console.log("Error creating destination:", error);
      toast.error(
        error?.response?.data?.error || "Destination creation failed"
      );
      set({ loading: false });
      throw error;
    }
  },

  // Edit destination
  editDestination: async (id, updatedDestination) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.put(
        `/destinations/${id}`,
        updatedDestination
      );
      set((state) => ({
        destinations: state.destinations.map((d) =>
          d.id === id ? response.data : d
        ),
        loading: false,
      }));
      toast.success("Destination updated successfully");
    } catch (error) {
      console.log("Error updating destination:", error);
      toast.error(error?.response?.data?.error || "Destination update failed");
      set({ loading: false });
    }
  },

  // Delete destination
  deleteDestination: async (id) => {
    set({ loading: true });
    try {
      await axiosInstance.delete(`/destinations/${id}`);
      set((state) => ({
        destinations: state.destinations.filter((d) => d.id !== id),
        loading: false,
      }));
      toast.success("Destination deleted successfully");
    } catch (error) {
      console.log("Error deleting destination:", error);
      toast.error(
        error?.response?.data?.error || "Destination deletion failed"
      );
      set({ loading: false });
    }
  },

  // Bulk delete destinations
  deleteDestinationsByIds: async (ids) => {
    set({ loading: true });
    try {
      await axiosInstance.post("/destinations/bulk-delete", { ids });
      set((state) => ({
        destinations: state.destinations.filter((d) => !ids.includes(d.id)),
        loading: false,
      }));
      toast.success("Destinations deleted successfully");
    } catch (error) {
      console.log("Error deleting destinations:", error);
      toast.error(error?.response?.data?.error || "Bulk deletion failed");
      set({ loading: false });
    }
  },
}));
