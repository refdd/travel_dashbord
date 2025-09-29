import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

// ✅ Adjust this base once and it updates everywhere
const BASE = "/reviews";

export const useReviewsStore = create((set) => ({
  reviews: [],
  review: null,
  loading: false,

  // Get all reviews
  getAllReviews: async () => {
    set({ loading: true });
    try {
      const { data } = await axiosInstance.get(`${BASE}`);
      set({ reviews: data, loading: false });
    } catch (error) {
      console.log("Error fetching reviews:", error);
      toast.error("Failed to fetch reviews");
      set({ loading: false });
    }
  },

  // Get review by slug (if your API supports it)
  // If your API uses /reviews/slug/:slug then change the URL accordingly
  getReviewBySlug: async (slug) => {
    set({ loading: true });
    try {
      const { data } = await axiosInstance.get(`${BASE}/${slug}`);
      set({ review: data, loading: false });
    } catch (error) {
      console.log("Error fetching review:", error);
      toast.error("Failed to fetch review");
      set({ loading: false });
    }
  },

  // Get review by ID (rename endpoint if your backend differs)
  getReviewById: async (id) => {
    set({ loading: true });
    try {
      const { data } = await axiosInstance.get(`${BASE}/${id}`);
      set({ review: data, loading: false });
    } catch (error) {
      console.log("Error fetching review:", error);
      toast.error("Failed to fetch review");
      set({ loading: false });
    }
  },

  // Create review
  createReview: async (newReview) => {
    set({ loading: true });
    try {
      const { data } = await axiosInstance.post(`${BASE}`, newReview);
      set((state) => ({
        reviews: [data, ...state.reviews],
        loading: false,
      }));
      toast.success("Review created successfully");
    } catch (error) {
      console.log("Error creating review:", error);
      toast.error(error?.response?.data?.error || "Review creation failed");
      set({ loading: false });
      throw error;
    }
  },

  // Edit review
  editReview: async (id, updatedReview, isMultipart = false) => {
    set({ loading: true });
    try {
      const { data } = await axiosInstance.put(
        `${BASE}/${id}`,
        updatedReview,
        isMultipart
          ? { headers: { "Content-Type": "multipart/form-data" } }
          : undefined
      );
      set((state) => ({
        reviews: state.reviews.map((r) => (r.id === id ? data : r)),
        loading: false,
      }));
      toast.success("Review updated successfully");
    } catch (error) {
      console.log("Error updating review:", error);
      toast.error(error?.response?.data?.error || "Review update failed");
      set({ loading: false });
      throw error;
    }
  },

  // Delete review
  deleteReview: async (id) => {
    set({ loading: true });
    try {
      await axiosInstance.delete(`${BASE}/${id}`);
      set((state) => ({
        reviews: state.reviews.filter((r) => r.id !== id),
        loading: false,
      }));
      toast.success("Review deleted successfully");
    } catch (error) {
      console.log("Error deleting review:", error);
      toast.error(error?.response?.data?.error || "Review deletion failed");
      set({ loading: false });
    }
  },

  // Bulk delete reviews
  deleteReviewsByIds: async (ids) => {
    set({ loading: true });
    try {
      await axiosInstance.post(`${BASE}/bulk-delete`, { ids });
      set((state) => ({
        reviews: state.reviews.filter((r) => !ids.includes(r.id)),
        loading: false,
      }));
      toast.success("Reviews deleted successfully");
    } catch (error) {
      console.log("Error deleting reviews:", error);
      toast.error(error?.response?.data?.error || "Bulk deletion failed");
      set({ loading: false });
    }
  },
}));
