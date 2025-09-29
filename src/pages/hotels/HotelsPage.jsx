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
import { useTotelsStore } from "@/stores/useTotelsStore";

function HotelsPage() {
  const { getAllHotels, loading, hotels, deleteHotel } = useTotelsStore();
  const navigate = useNavigate();
  React.useEffect(() => {
    getAllHotels();
  }, [getAllHotels]);
  const columns = [
    { field: "title", headerName: "Title", width: 200 },
    { field: "slug", headerName: "Slug", width: 200 },
    {
      field: "link",
      headerName: "Website",
      width: 220,
      renderCell: (params) => (
        <a
          href={params.row.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Visit
        </a>
      ),
    },
    {
      field: "image",
      headerName: "Image",
      width: 120,
      renderCell: (params) => (
        <img
          src={params.row.imageUrl}
          alt={params.row.imageAlt}
          style={{ width: 50, height: 40, objectFit: "cover", borderRadius: 4 }}
        />
      ),
    },
    {
      field: "description",
      headerName: "Description",
      width: 250,
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
          navigate(`/hotels/edit/${params.row.id}`);
        };

        const handleDelete = (event) => {
          event.stopPropagation();
          deleteHotel(params.row.id);
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

  console.log(hotels);
  return (
    <div className="px-5 ">
      <HeaderPages
        title={"hotels"}
        links={[{ title: "hotels", slug: "/hotels", active: true }]}
      >
        <div className=" flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
          <Link to="/hotels/create">
            <Button variant="contained" color="primary">
              Create hotels
            </Button>
          </Link>
        </div>
      </HeaderPages>
      <div className="mt-5">
        <CustomTableData columns={columns} rows={hotels} loading={loading} />
      </div>
    </div>
  );
}

export default HotelsPage;
