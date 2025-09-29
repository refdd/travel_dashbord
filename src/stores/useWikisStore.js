import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import axios from "axios";

export const useWikisStore = create((set) => ({
  wikis: [],
  wiki: null,
  loading: false,

  // Get all wikis
  getAllWikis: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/wikis");
      set({ wikis: response.data, loading: false });
    } catch (error) {
      console.log("Error fetching wikis:", error);
      toast.error("Failed to fetch wikis");
      set({ loading: false });
    }
  },

  // Get wiki by slug
  getWikiBySlug: async (slug) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get(`/wikis/${slug}`);
      set({ wiki: response.data, loading: false });
    } catch (error) {
      console.log("Error fetching wiki:", error);
      toast.error("Failed to fetch wiki");
      set({ loading: false });
    }
  },

  // Get wiki by ID
  getWikiById: async (id) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get(`/wikis/wikisById/${id}`);
      set({ wiki: response.data, loading: false });
    } catch (error) {
      console.log("Error fetching wiki:", error);
      toast.error("Failed to fetch wiki");
      set({ loading: false });
    }
  },

  // Create wiki
  createWiki: async (newWiki) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post("/wikis", newWiki);
      set((state) => ({
        wikis: [response.data, ...state.wikis],
        loading: false,
      }));
      toast.success("Wiki created successfully");
    } catch (error) {
      console.log("Error creating wiki:", error);
      toast.error(error?.response?.data?.error || "Wiki creation failed");
      set({ loading: false });
    }
  },

  // Edit wiki
  editWiki: async (id, updatedWiki) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.put(
        `http://localhost:3000/wikis/${id}`,
        updatedWiki
      );
      set((state) => ({
        wikis: state.wikis.map((w) => (w.id === id ? response.data : w)),
        loading: false,
      }));
      toast.success("Wiki updated successfully");
    } catch (error) {
      console.log("Error updating wiki:", error);
      toast.error(error?.response?.data?.error || "Wiki update failed");
      set({ loading: false });
    }
  },

  // Delete wiki
  deleteWiki: async (id) => {
    set({ loading: true });
    try {
      await axiosInstance.delete(`/wikis/${id}`);
      set((state) => ({
        wikis: state.wikis.filter((w) => w.id !== id),
        loading: false,
      }));
      toast.success("Wiki deleted successfully");
    } catch (error) {
      console.log("Error deleting wiki:", error);
      toast.error(error?.response?.data?.error || "Wiki deletion failed");
      set({ loading: false });
    }
  },

  // Bulk delete wikis
  deleteWikisByIds: async (ids) => {
    set({ loading: true });
    try {
      await axiosInstance.post("/wikis/bulk-delete", { ids });
      set((state) => ({
        wikis: state.wikis.filter((w) => !ids.includes(w.id)),
        loading: false,
      }));
      toast.success("Wikis deleted successfully");
    } catch (error) {
      console.log("Error deleting wikis:", error);
      toast.error(error?.response?.data?.error || "Bulk deletion failed");
      set({ loading: false });
    }
  },
}));
