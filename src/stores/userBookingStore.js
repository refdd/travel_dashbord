import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

const BASE = "/bookings";

export const useBookingStore = create((set, get) => ({
  bookings: [],
  booking: null,
  loading: false,

  // Get all bookings
  getAllBookings: async (params = {}) => {
    set({ loading: true });
    try {
      // optional: pass pagination/filter params
      const { data } = await axiosInstance.get(BASE, { params });
      set({ bookings: data, loading: false });
    } catch (error) {
      console.log("Error fetching bookings:", error);
      toast.error(error?.response?.data?.error || "Failed to fetch bookings");
      set({ loading: false });
    }
  },

  // Get booking by ID
  getBookingById: async (id) => {
    set({ loading: true });
    try {
      const { data } = await axiosInstance.get(`${BASE}/${id}`);
      set({ booking: data, loading: false });
    } catch (error) {
      console.log("Error fetching booking:", error);
      toast.error(error?.response?.data?.error || "Failed to fetch booking");
      set({ loading: false });
    }
  },

  createBooking: async (newBooking) => {
    set({ loading: true });
    try {
      const { data } = await axiosInstance.post(BASE, newBooking, {
        headers: { "Content-Type": "application/json" },
      });
      set((state) => ({
        bookings: [data, ...state.bookings],
        loading: false,
      }));
      toast.success("Booking created successfully");
      return data;
    } catch (error) {
      console.log("Error creating booking:", error);
      toast.error(error?.response?.data?.error || "Booking creation failed");
      set({ loading: false });
    }
  },

  // Edit booking
  editBooking: async (id, updatedBooking) => {
    set({ loading: true });
    try {
      const { data } = await axiosInstance.put(
        `${BASE}/${id}`,
        updatedBooking,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      set((state) => ({
        bookings: state.bookings.map((b) => (b.id === id ? data : b)),
        booking: state.booking?.id === id ? data : state.booking,
        loading: false,
      }));
      toast.success("Booking updated successfully");
      return data;
    } catch (error) {
      console.log("Error updating booking:", error);
      toast.error(error?.response?.data?.error || "Booking update failed");
      set({ loading: false });
    }
  },

  // Delete booking
  deleteBooking: async (id) => {
    set({ loading: true });
    try {
      await axiosInstance.delete(`${BASE}/${id}`);
      set((state) => ({
        bookings: state.bookings.filter((b) => b.id !== id),
        booking: state.booking?.id === id ? null : state.booking,
        loading: false,
      }));
      toast.success("Booking deleted successfully");
    } catch (error) {
      console.log("Error deleting booking:", error);
      toast.error(error?.response?.data?.error || "Booking deletion failed");
      set({ loading: false });
    }
  },

  // Bulk delete
  deleteBookingsByIds: async (ids) => {
    set({ loading: true });
    try {
      await axiosInstance.post(`${BASE}/bulk-delete`, { ids });
      set((state) => ({
        bookings: state.bookings.filter((b) => !ids.includes(b.id)),
        loading: false,
      }));
      toast.success("Bookings deleted successfully");
    } catch (error) {
      console.log("Error deleting bookings:", error);
      toast.error(error?.response?.data?.error || "Bulk deletion failed");
      set({ loading: false });
    }
  },
}));
