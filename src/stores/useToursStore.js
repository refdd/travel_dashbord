import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

export const useTourStore = create((set) => ({
  tours: [],
  tour: null,
  loading: false,

  // Get all tours
  getAllTours: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/tours");
      set({ tours: response.data, loading: false });
    } catch (error) {
      console.log("Error fetching tours:", error);
      toast.error("Failed to fetch tours");
      set({ loading: false });
    }
  },

  // Get tour by id
  getTourById: async (id) => {
    set({ loading: true });
    try {
      const response = await axios.get(`/tours/getById/${id}`);
      set({ tour: response.data, loading: false });
    } catch (error) {
      console.log("Error fetching tour:", error);
      toast.error("Failed to fetch tour");
      set({ loading: false });
    }
  },

  // Create a new tour
  createTour: async (newTour) => {
    set({ loading: true });
    try {
      const response = await axios.post("/tours", newTour);
      set((state) => ({
        tours: [response.data, ...state.tours],
        loading: false,
      }));
      toast.success("Tour created successfully");
    } catch (error) {
      toast.error(error?.response?.data?.error || "Tour creation failed");
      set({ loading: false });
    }
  },

  // Edit an existing tour
  editTour: async (id, updatedTour) => {
    set({ loading: true });
    try {
      const response = await axios.put(`/tours/${id}`, updatedTour);
      set((state) => ({
        tours: state.tours.map((t) => (t.id === id ? response.data : t)),
        loading: false,
      }));
      toast.success("Tour updated successfully");
    } catch (error) {
      toast.error(error?.response?.data?.error || "Tour update failed");
      set({ loading: false });
    }
  },

  // Delete a tour
  deleteTour: async (id) => {
    set({ loading: true });
    try {
      await axios.delete(`/tours/${id}`);
      set((state) => ({
        tours: state.tours.filter((t) => t.id !== id),
        loading: false,
      }));
      toast.success("Tour deleted successfully");
    } catch (error) {
      toast.error(error?.response?.data?.error || "Tour deletion failed");
      set({ loading: false });
    }
  },
}));
