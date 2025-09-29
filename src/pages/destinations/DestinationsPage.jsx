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
import { useDestinationStore } from "@/stores/useDestinationStore";

function DestinationsPage() {
  const { getAllDestinations, destinations, loading, deleteDestination } =
    useDestinationStore();
  const navigate = useNavigate();
  React.useEffect(() => {
    getAllDestinations();
  }, [getAllDestinations]);
  const columns = [
    { field: "title", headerName: "Title", width: 200 },
    { field: "destinationTitle", headerName: "Destination Title", width: 220 },
    { field: "slug", headerName: "Slug", width: 180 },
    { field: "city", headerName: "City", width: 150 },
    { field: "country", headerName: "Country", width: 150 },
    {
      field: "isActive",
      headerName: "Status",
      width: 120,
      valueGetter: (params) => (params ? "Active" : "Inactive"),
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
          navigate(`/destinations/edit/${params.row.id}`);
        };

        const handleInactivate = (event) => {
          event.stopPropagation();
          // Toggle isActive logic can be added here
          console.log("Inactivate", params.row?.id);
        };

        const handleDelete = (event) => {
          event.stopPropagation();
          deleteDestination(params.row.id);
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

  return (
    <div className="px-5 ">
      <HeaderPages
        title={"destinations"}
        links={[{ title: "destinations", slug: "/destinations", active: true }]}
      >
        <div className=" flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
          <Link to="/destinations/create">
            <Button variant="contained" color="primary">
              Create destinations
            </Button>
          </Link>
        </div>
      </HeaderPages>
      <div className="mt-5">
        <CustomTableData
          columns={columns}
          rows={destinations}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default DestinationsPage;
