import HeaderPages from "@/components/headers/HeaderPages";
import CustomTableData from "@/components/table/CustomTableData";
import Button from "@mui/material/Button";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import Tooltip from "@mui/material/Tooltip";
import { formatDate } from "@/utils/formatDate";
import { useBookingStore } from "@/stores/userBookingStore";
import dayjs from "dayjs";

function BookingsPage() {
  const { getAllBookings, bookings, loading, deleteBooking } =
    useBookingStore();
  const navigate = useNavigate();
  React.useEffect(() => {
    getAllBookings();
  }, [getAllBookings]);

  const columns = [
    { field: "bookingNumber", headerName: "Booking #", width: 210 },
    { field: "customerName", headerName: "Name", width: 160 },
    { field: "customerEmail", headerName: "Email", width: 220 },
    { field: "customerPhone", headerName: "Phone", width: 170 },
    { field: "nationality", headerName: "Nationality", width: 180 },

    {
      field: "pax",
      headerName: "PAX (A+Ch)",
      width: 110,
      valueGetter: (value, row) => {
        const adults = row?.adults ?? 0;
        const children = row?.children ?? 0;
        return `${adults}+${children}`;
      },
    },

    {
      field: "ageOfChildren",
      headerName: "Children Ages",
      width: 160,
      valueGetter: (params) => {
        const raw = params;
        if (!raw) return "";
        try {
          const arr = typeof raw === "string" ? JSON.parse(raw) : raw;
          return Array.isArray(arr) ? arr.join(", ") : String(raw);
        } catch {
          return String(raw);
        }
      },
    },

    {
      field: "travelDate",
      headerName: "Travel Date",
      width: 140,
      valueFormatter: (value) =>
        value ? dayjs(value).format("YYYY-MM-DD") : "",
    },
    {
      field: "arrivalDate",
      headerName: "Arrival",
      width: 140,
      valueFormatter: (value) =>
        value ? dayjs(value).format("YYYY-MM-DD") : "",
    },
    {
      field: "departureDate",
      headerName: "Departure",
      width: 140,
      valueFormatter: (value) =>
        value ? dayjs(value).format("YYYY-MM-DD") : "",
    },

    {
      field: "totalAmount",
      headerName: "Total",
      width: 140,
      renderCell: (params) => {
        const amount = Number(params?.row?.totalAmount || 0);
        const currency = params?.row?.currency || "USD";
        return `${currency} ${amount.toLocaleString()}`;
      },
    },

    { field: "paymentStatus", headerName: "Payment", width: 120 },
    { field: "status", headerName: "Status", width: 110 },

    {
      field: "flightIncluded",
      headerName: "Flight",
      width: 100,
      type: "boolean",
      valueGetter: (params) => !!params,
    },

    {
      field: "createdAt",
      headerName: "Created",
      width: 160,
      valueFormatter: (value) =>
        value ? dayjs(value).format("YYYY-MM-DD HH:mm") : "",
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const handleEdit = (e) => {
          e.stopPropagation();
          navigate(`/bookings/edit/${params.row.id}`);
        };
        const handleDelete = (e) => {
          e.stopPropagation();
          deleteBooking(params.row.id);
        };
        const handleInactivate = (e) => {
          e.stopPropagation();
          console.log("Inactivate", params.row.id);
        };

        return (
          <>
            <Tooltip title="Edit">
              <IconButton onClick={handleEdit}>
                <EditIcon color="primary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Inactivate">
              <IconButton onClick={handleInactivate}>
                <BlockIcon color="warning" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Move to Trash">
              <IconButton onClick={handleDelete}>
                <DeleteIcon color="error" />
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
  ];
  console.log(bookings);

  return (
    <div className="px-5 ">
      <HeaderPages
        title={"bookings"}
        links={[{ title: "bookings", slug: "/bookings", active: true }]}
      >
        <div className=" flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
          <Link to="/bookings/create">
            <Button variant="contained" color="primary">
              Create bookings
            </Button>
          </Link>
        </div>
      </HeaderPages>
      <div className="mt-5">
        <CustomTableData columns={columns} rows={bookings} loading={loading} />
      </div>
    </div>
  );
}

export default BookingsPage;
