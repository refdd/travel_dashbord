// router.js
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./components/helper/ProtectedRoute";
import LoginPage from "@/pages/LoginPage";
import ErrorPage from "@/pages/ErrorPage";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/blogs/BlogPage";
import BlogEditPage from "./pages/blogs/BlogEditPage";
import BlogCreatePage from "./pages/blogs/BlogCreatePage";
import RegionCreatePage from "./pages/region/RegionCreatePage";
import RegionEditPage from "./pages/region/RegionEditPage";
import RegionPage from "./pages/region/RegionPage";
import UsersPage from "./pages/users/UsersPage";
import UsersCreatePage from "./pages/users/UsersCreatePage";
import UsersEditPage from "./pages/users/UsersEditPage";
import PagesPage from "./pages/pages/PagesPage";
import PagesCreatePage from "./pages/pages/PagesCreatePage";
import PagesEditPage from "./pages/pages/PagesEditPage";
import WikisPage from "./pages/wikis/WikisPage";
import WikisCreatePage from "./pages/wikis/WikisCreatePage";
import WikisEditPage from "./pages/wikis/WikisEditPage";
import FaqsEditPage from "./pages/faqs/FaqsEditPage";
import FaqsCreatePage from "./pages/faqs/FaqsCreatePage";
import FaqsPage from "./pages/faqs/FaqsPage";
import DestinationsEditPage from "./pages/destinations/DestinationsEditPage";
import DestinationsCreatePage from "./pages/destinations/DestinationsCreatePage";
import DestinationsPage from "./pages/destinations/DestinationsPage";
import HotelsPage from "./pages/hotels/HotelsPage";
import HotelsCreatePage from "./pages/hotels/HotelsCreatePage";
import HotelsEditPage from "./pages/hotels/HotelsEditPage";
import ToursPage from "./pages/tours/ToursPage";
import ToursCreatePage from "./pages/tours/ToursCreatePage";
import ToursEditPage from "./pages/tours/ToursEditPage";
import BookingsEditPage from "./pages/bookings/BookingsEditPage";
import BookingsCreatePage from "./pages/bookings/BookingsCreatePage";
import BookingsPage from "./pages/bookings/BookingsPage";
import ReviewsCreatePage from "./pages/reviews/ReviewsCreatePage";
import ReviewsEditPage from "./pages/reviews/ReviewsEditPage";
import ReviewsPage from "./pages/reviews/ReviewsPage";
import MessagesPage from "./pages/message/MessagesPage";
import CallPage from "./pages/call/CallPage";
// Optional

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />, // optional
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "blog",
        children: [
          { index: true, element: <BlogPage /> }, // /blog
          { path: "create", element: <BlogCreatePage /> }, // /blog/create
          { path: "edit/:id", element: <BlogEditPage /> }, // /blog/edit/123
        ],
      },
      {
        path: "region",
        children: [
          { index: true, element: <RegionPage /> }, // /blog
          { path: "create", element: <RegionCreatePage /> }, // /blog/create
          { path: "edit/:id", element: <RegionEditPage /> }, // /blog/edit/123
        ],
      },
      {
        path: "users",
        children: [
          { index: true, element: <UsersPage /> }, // /blog
          { path: "create", element: <UsersCreatePage /> }, // /blog/create
          { path: "edit/:id", element: <UsersEditPage /> }, // /blog/edit/123
        ],
      },
      {
        path: "pages",
        children: [
          { index: true, element: <PagesPage /> }, // /blog
          { path: "create", element: <PagesCreatePage /> }, // /blog/create
          { path: "edit/:id", element: <PagesEditPage /> }, // /blog/edit/123
        ],
      },
      {
        path: "wikis",
        children: [
          { index: true, element: <WikisPage /> }, // /blog
          { path: "create", element: <WikisCreatePage /> }, // /blog/create
          { path: "edit/:id", element: <WikisEditPage /> }, // /blog/edit/123
        ],
      },
      {
        path: "faqs",
        children: [
          { index: true, element: <FaqsPage /> }, // /blog
          { path: "create", element: <FaqsCreatePage /> }, // /blog/create
          { path: "edit/:id", element: <FaqsEditPage /> }, // /blog/edit/123
        ],
      },
      {
        path: "destinations",
        children: [
          { index: true, element: <DestinationsPage /> }, // /blog
          { path: "create", element: <DestinationsCreatePage /> }, // /blog/create
          { path: "edit/:id", element: <DestinationsEditPage /> }, // /blog/edit/123
        ],
      },
      {
        path: "hotels",
        children: [
          { index: true, element: <HotelsPage /> }, // /blog
          { path: "create", element: <HotelsCreatePage /> }, // /blog/create
          { path: "edit/:id", element: <HotelsEditPage /> }, // /blog/edit/123
        ],
      },
      {
        path: "tours",
        children: [
          { index: true, element: <ToursPage /> }, // /blog
          { path: "create", element: <ToursCreatePage /> }, // /blog/create
          { path: "edit/:id", element: <ToursEditPage /> }, // /blog/edit/123
        ],
      },
      {
        path: "Bookings",
        children: [
          { index: true, element: <BookingsPage /> }, // /blog
          { path: "create", element: <BookingsCreatePage /> }, // /blog/create
          { path: "edit/:id", element: <BookingsEditPage /> }, // /blog/edit/123
        ],
      },
      {
        path: "reviews",
        children: [
          { index: true, element: <ReviewsPage /> }, // /blog
          { path: "create", element: <ReviewsCreatePage /> }, // /blog/create
          { path: "edit/:id", element: <ReviewsEditPage /> }, // /blog/edit/123
        ],
      },
      {
        path: "messages",
        children: [
          { index: true, element: <MessagesPage /> }, // /blog
          // { path: "create", element: <ReviewsCreatePage /> }, // /blog/create
          // { path: "edit/:id", element: <ReviewsEditPage /> }, // /blog/edit/123
        ],
      },
      {
        path: "call/:callId",
        children: [
          { index: true, element: <CallPage /> }, // /blog
          // { path: "create", element: <ReviewsCreatePage /> }, // /blog/create
          // { path: "edit/:id", element: <ReviewsEditPage /> }, // /blog/edit/123
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default router;
