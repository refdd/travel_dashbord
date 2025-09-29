import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import axios from "axios";

export const useFaqsStore = create((set) => ({
  faqs: [],
  faq: null,
  loading: false,

  // Get all FAQs
  getAllFaqs: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/faqs");
      set({ faqs: response.data, loading: false });
    } catch (error) {
      console.log("Error fetching FAQs:", error);
      toast.error("Failed to fetch FAQs");
      set({ loading: false });
    }
  },

  // Get FAQ by slug
  getFaqBySlug: async (slug) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get(`/faqs/${slug}`);
      set({ faq: response.data, loading: false });
    } catch (error) {
      console.log("Error fetching FAQ:", error);
      toast.error("Failed to fetch FAQ");
      set({ loading: false });
    }
  },

  // Get FAQ by ID
  getFaqById: async (id) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get(`/faqs/FaqsById/${id}`);
      set({ faq: response.data, loading: false });
    } catch (error) {
      console.log("Error fetching FAQ:", error);
      toast.error("Failed to fetch FAQ");
      set({ loading: false });
    }
  },

  // Create FAQ
  createFaq: async (newFaq) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post("/faqs", newFaq);
      set((state) => ({
        faqs: [response.data, ...state.faqs],
        loading: false,
      }));
      toast.success("FAQ created successfully");
    } catch (error) {
      console.log("Error creating FAQ:", error);
      toast.error(error?.response?.data?.error || "FAQ creation failed");
      set({ loading: false });
    }
  },

  // Edit FAQ
  editFaq: async (id, updatedFaq) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.put(`/faqs/${id}`, updatedFaq);
      set((state) => ({
        faqs: state.faqs.map((f) => (f.id === id ? response.data : f)),
        loading: false,
      }));
      toast.success("FAQ updated successfully");
    } catch (error) {
      console.log("Error updating FAQ:", error);
      toast.error(error?.response?.data?.error || "FAQ update failed");
      set({ loading: false });
    }
  },

  // Delete FAQ
  deleteFaq: async (id) => {
    set({ loading: true });
    try {
      await axiosInstance.get(`/faqs/${id}`);
      set((state) => ({
        faqs: state.faqs.filter((f) => f.id !== id),
        loading: false,
      }));
      toast.success("FAQ deleted successfully");
    } catch (error) {
      console.log("Error deleting FAQ:", error);
      toast.error(error?.response?.data?.error || "FAQ deletion failed");
      set({ loading: false });
    }
  },

  // Bulk delete FAQs
  deleteFaqsByIds: async (ids) => {
    set({ loading: true });
    try {
      await axiosInstance.post("/faqs/bulk-delete", { ids });
      set((state) => ({
        faqs: state.faqs.filter((f) => !ids.includes(f.id)),
        loading: false,
      }));
      toast.success("FAQs deleted successfully");
    } catch (error) {
      console.log("Error deleting FAQs:", error);
      toast.error(error?.response?.data?.error || "Bulk deletion failed");
      set({ loading: false });
    }
  },
}));
