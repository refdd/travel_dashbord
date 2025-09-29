import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

export const usePageStore = create((set, get) => ({
  user: null,
  pages: [], // Array to store all pages
  currentPage: null, // Store currently viewed page
  loading: false,
  checkingAuth: true,

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const response = await axios.get("/auth/me");
      set({ user: response.data, checkingAuth: false });
      // route to /
    } catch (error) {
      console.log("Auth error:", error.response?.status);
      set({ checkingAuth: false, user: null });
    }
  },

  getAllPages: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/pages");
      set({ pages: response.data, loading: false });
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to fetch pages");
      set({ loading: false });
      throw error;
    }
  },

  getPageById: async (id) => {
    set({ loading: true });
    try {
      const response = await axios.get(`/pages/getById/${id}`);
      set({ currentPage: response.data, loading: false });
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to fetch page");
      set({ loading: false });
      throw error;
    }
  },

  createPage: async (pageData) => {
    set({ loading: true });
    try {
      const response = await axios.post("/pages", pageData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const { pages } = get();
      set({ pages: [...pages, response.data], loading: false });

      toast.success("Page created successfully");
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to create page");
      set({ loading: false });
      throw error;
    }
  },

  updatePage: async (id, pageData) => {
    set({ loading: true });
    try {
      const response = await axios.put(`/pages/${id}`, pageData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Update the pages array with the updated page
      const { pages } = get();
      const updatedPages = pages.map((page) =>
        page.id === id ? response.data : page
      );

      set({ pages: updatedPages, loading: false });

      // Update currentPage if it's the same page being updated
      const { currentPage } = get();
      if (currentPage && currentPage.id === id) {
        set({ currentPage: response.data });
      }

      toast.success("Page updated successfully");
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to update page");
      set({ loading: false });
      throw error;
    }
  },

  deletePage: async (id) => {
    set({ loading: true });
    try {
      await axios.delete(`/pages/${id}`);

      // Remove the deleted page from the pages array
      const { pages } = get();
      const updatedPages = pages.filter((page) => page.id !== id);

      set({ pages: updatedPages, loading: false });

      // Clear currentPage if it's the deleted page
      const { currentPage } = get();
      if (currentPage && currentPage.id === id) {
        set({ currentPage: null });
      }

      toast.success("Page deleted successfully");
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to delete page");
      set({ loading: false });
      throw error;
    }
  },

  refreshPages: async () => {
    try {
      await get().getAllPages();
    } catch (error) {
      console.error("Failed to refresh pages:", error);
    }
  },

  // Helper function to clear current page
  clearCurrentPage: () => {
    set({ currentPage: null });
  },
}));
