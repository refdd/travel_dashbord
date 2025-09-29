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
import { useTourStore } from "@/stores/useToursStore";

function ToursPage() {
  const { getAllTours, deleteTour, tours, loading } = useTourStore();
  const navigate = useNavigate();
  React.useEffect(() => {
    getAllTours();
  }, [getAllTours]);
  const columns = [
    { field: "title", headerName: "Title", width: 200 },
    { field: "tourCode", headerName: "Tour Code", width: 150 },
    { field: "slug", headerName: "Slug", width: 180 },
    {
      field: "shortDescription",
      headerName: "Short Description",
      width: 250,
    },
    {
      field: "price",
      headerName: "Price",
      width: 120,
      renderCell: (params) => (
        <span className="font-semibold text-green-600">
          ${params.row.price} {params.row.currency}
        </span>
      ),
    },
    {
      field: "duration",
      headerName: "Duration",
      width: 100,
      renderCell: (params) => <span>{params.row.duration} days</span>,
    },
    {
      field: "tourType",
      headerName: "Tour Type",
      width: 120,
    },
    {
      field: "maxGroupSize",
      headerName: "Group Size",
      width: 120,
      renderCell: (params) => <span>Max {params.row.maxGroupSize}</span>,
    },
    {
      field: "tourLanguage",
      headerName: "Language",
      width: 100,
    },
    {
      field: "images",
      headerName: "Image",
      width: 120,
      renderCell: (params) =>
        params.row.images && params.row.images.length > 0 ? (
          <img
            src={params.row.images[0]}
            alt={params.row.title}
            style={{
              width: 50,
              height: 40,
              objectFit: "cover",
              borderRadius: 4,
            }}
          />
        ) : (
          <div className="w-12 h-10 bg-gray-200 rounded flex items-center justify-center">
            <span className="text-xs text-gray-500">No img</span>
          </div>
        ),
    },
    {
      field: "isActive",
      headerName: "Status",
      width: 100,
      renderCell: (params) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            params.row.isActive
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {params.row.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 180,
      valueGetter: (params) => formatDate(params),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const handleEdit = (event) => {
          event.stopPropagation();
          navigate(`/tours/edit/${params.row.id}`); // Changed from hotels to tours
        };

        const handleDelete = (event) => {
          event.stopPropagation();
          deleteTour(params.row.id);
        };

        return (
          <>
            <Tooltip title="Edit">
              <IconButton onClick={handleEdit}>
                <EditIcon color="primary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton onClick={handleDelete}>
                <DeleteIcon color="error" />
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
  ];

  console.log(tours);
  return (
    <div className="px-5 ">
      <HeaderPages
        title={"tours"}
        links={[{ title: "tours", slug: "/tours", active: true }]}
      >
        <div className=" flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
          <Link to="/tours/create">
            <Button variant="contained" color="primary">
              Create tours
            </Button>
          </Link>
        </div>
      </HeaderPages>
      <div className="mt-5">
        <CustomTableData columns={columns} rows={tours} loading={loading} />
      </div>
    </div>
  );
}

export default ToursPage;
