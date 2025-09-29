import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

export const useRegionStore = create((set) => ({
  regions: [],
  region: null,
  destinations: [],
  loading: false,

  // Get all regions
  getAllRegions: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/region");
      set({ regions: response.data, loading: false });
    } catch (error) {
      console.log("Error fetching regions:", error);
      toast.error("Failed to fetch regions");
      set({ loading: false });
    }
  },

  // Get region by slug
  getRegionById: async (id) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get(`/region/GetById/${id}`);
      set({ region: response.data, loading: false });
    } catch (error) {
      console.log("Error fetching region:", error);
      toast.error("Failed to fetch region");
      set({ loading: false });
    }
  },

  // Create region
  createRegion: async (newRegion) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post("/region", newRegion, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      set((state) => ({
        regions: [response.data, ...state.regions],
        loading: false,
      }));
      toast.success("Region created successfully");
      return response.data;
    } catch (error) {
      console.log("Error creating region:", error);
      toast.error(error?.response?.data?.error || "Region creation failed");
      set({ loading: false });
      throw error;
    }
  },

  // Update region
  updateRegion: async (id, updatedRegion) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.put(`/region/${id}`, updatedRegion, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      set((state) => ({
        regions: state.regions.map((r) => (r.id === id ? response.data : r)),
        loading: false,
      }));
      toast.success("Region updated successfully");
      return response.data;
    } catch (error) {
      console.log("Error updating region:", error);
      toast.error(error?.response?.data?.error || "Region update failed");
      set({ loading: false });
      throw error;
    }
  },

  // Delete region
  deleteRegion: async (id) => {
    set({ loading: true });
    try {
      await axiosInstance.delete(`/region/${id}`);
      set((state) => ({
        regions: state.regions.filter((r) => r.id !== id),
        loading: false,
      }));
      toast.success("Region deleted successfully");
    } catch (error) {
      console.log("Error deleting region:", error);
      toast.error(error?.response?.data?.error || "Region deletion failed");
      set({ loading: false });
      throw error;
    }
  },

  // Get destinations by region
  getDestinationsByRegion: async (regionId) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get(
        `/region/${regionId}/destinations`
      );
      set({ destinations: response.data, loading: false });
      return response.data;
    } catch (error) {
      console.log("Error fetching destinations:", error);
      toast.error("Failed to fetch destinations");
      set({ loading: false });
      throw error;
    }
  },

  // Clear destinations
  clearDestinations: () => {
    set({ destinations: [] });
  },

  // Clear current region
  clearRegion: () => {
    set({ region: null });
  },

  // Reset store
  reset: () => {
    set({
      regions: [],
      region: null,
      destinations: [],
      loading: false,
    });
  },
}));
