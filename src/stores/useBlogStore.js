import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import axios from "axios";

export const useBlogStore = create((set) => ({
  blogs: [],
  blog: null,
  loading: false,

  // Get all blogs
  getAllBlogs: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/blog");
      set({ blogs: response.data, loading: false });
    } catch (error) {
      console.log("Error fetching blogs:", error);
      toast.error("Failed to fetch blogs");
      set({ loading: false });
    }
  },

  // Get blog by slug - FIXED: Changed from /blogs/slug/ to /blog/
  getBlogBySlug: async (slug) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get(`/blog/${slug}`);
      set({ blog: response.data, loading: false });
    } catch (error) {
      console.log("Error fetching blog:", error);
      toast.error("Failed to fetch blog");
      set({ loading: false });
    }
  },
  getBlogById: async (id) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get(`/blog/BlogById/${id}`);
      set({ blog: response.data, loading: false });
    } catch (error) {
      console.log("Error fetching blog:", error);
      toast.error("Failed to fetch blog");
      set({ loading: false });
    }
  },
  // Create blog
  createBlog: async (newBlog) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post("/blog", newBlog);
      set((state) => ({
        blogs: [response.data, ...state.blogs],
        loading: false,
      }));
      toast.success("Blog created successfully");
    } catch (error) {
      console.log("Error creating blog:", error);
      toast.error(error?.response?.data?.error || "Blog creation failed");
      set({ loading: false });
    }
  },

  // Edit blog - FIXED: Changed from /blogs/ to /blog/
  editBlog: async (id, updatedBlog) => {
    set({ loading: true });
    try {
      const response = await axios.put(
        `http://localhost:3000/blog/${id}`,
        updatedBlog,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      set((state) => ({
        blogs: state.blogs.map((b) => (b.id === id ? response.data : b)),
        loading: false,
      }));
      toast.success("Blog updated successfully");
    } catch (error) {
      console.log("Error updating blog:", error);
      toast.error(error?.response?.data?.error || "Blog update failed");
      set({ loading: false });
    }
  },

  // Delete blog - This was already correct
  deleteBlog: async (id) => {
    set({ loading: true });
    try {
      await axiosInstance.get(`/blog/delete/${id}`);
      set((state) => ({
        blogs: state.blogs.filter((b) => b.id !== id),
        loading: false,
      }));
      toast.success("Blog deleted successfully");
    } catch (error) {
      console.log("Error deleting blog:", error);
      toast.error(error?.response?.data?.error || "Blog deletion failed");
      set({ loading: false });
    }
  },

  // Optional: Add bulk delete function to match your backend
  deleteBlogsByIds: async (ids) => {
    set({ loading: true });
    try {
      await axiosInstance.post("/blog/bulk-delete", { ids });
      set((state) => ({
        blogs: state.blogs.filter((b) => !ids.includes(b.id)),
        loading: false,
      }));
      toast.success("Blogs deleted successfully");
    } catch (error) {
      console.log("Error deleting blogs:", error);
      toast.error(error?.response?.data?.error || "Bulk deletion failed");
      set({ loading: false });
    }
  },
}));
