import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

export const useUserStore = create((set, get) => ({
  user: null,
  users: [], // Array to store all users
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

  login: async (email, password) => {
    set({ loading: true });
    try {
      const response = await axios.post("/auth/login", { email, password });
      console.log("Login response:", response.data);

      set({ user: response.data, loading: false });
      toast.success("Login successful");
    } catch (error) {
      toast.error(error?.response?.data?.error || "Login failed");
      set({ loading: false });
    }
  },

  createUser: async (userData) => {
    set({ loading: true });
    try {
      const response = await axios.post("/auth/sigup", userData);
      set({ user: response.data, loading: false });
      toast.success("Signup successful");
    } catch (error) {
      toast.error(error?.response?.data?.error || "Signup failed");
      set({ loading: false });
      throw error;
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await axios.post("/auth/logout");
      set({ user: null, loading: false });
      toast.success("Logout successful");
    } catch (error) {
      toast.error(error?.response?.data?.error || "Logout failed");
      set({ loading: false });
    }
  },

  // New CRUD operations for users
  getAllUsers: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/users");
      set({ users: response.data, loading: false });
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to fetch users");
      set({ loading: false });
      throw error;
    }
  },

  getUserById: async (id) => {
    set({ loading: true });
    try {
      const response = await axios.get(`/users/${id}`);
      set({ loading: false });
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to fetch user");
      set({ loading: false });
      throw error;
    }
  },

  updateUser: async (id, userData) => {
    set({ loading: true });
    try {
      const response = await axios.put(`/users/${id}`, userData);

      // Update the users array with the updated user
      const { users } = get();
      const updatedUsers = users.map((user) =>
        user.id === id ? response.data : user
      );

      set({ users: updatedUsers, loading: false });
      toast.success("User updated successfully");
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to update user");
      set({ loading: false });
      throw error;
    }
  },

  deleteUser: async (id) => {
    set({ loading: true });
    try {
      await axios.delete(`/users/${id}`);

      // Remove the deleted user from the users array
      const { users } = get();
      const updatedUsers = users.filter((user) => user.id !== id);

      set({ users: updatedUsers, loading: false });
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to delete user");
      set({ loading: false });
      throw error;
    }
  },
  refreshUsers: async () => {
    try {
      await get().getAllUsers();
    } catch (error) {
      console.error("Failed to refresh users:", error);
    }
  },
}));
