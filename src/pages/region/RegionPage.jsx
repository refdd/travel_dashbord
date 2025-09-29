import HeaderPages from "@/components/headers/HeaderPages";
import CustomTableData from "@/components/table/CustomTableData";
import { useRegionStore } from "@/stores/useRegionStore";
import { Button } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import Tooltip from "@mui/material/Tooltip";
import { formatDate } from "@/utils/formatDate";

function RegionPage() {
  const { getAllRegions, regions, loading, deleteRegion } = useRegionStore();
  const navigate = useNavigate();

  React.useEffect(() => {
    getAllRegions();
  }, [getAllRegions]);

  const columns = [
    // { field: "id", headerName: "ID", width: 250 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "slug", headerName: "Slug", width: 200 },
    { field: "code", headerName: "Code", width: 100 },
    {
      field: "isActive",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <span style={{ color: params.value ? "green" : "red" }}>
          {params.value ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      field: "sortOrder",
      headerName: "Sort Order",
      width: 120,
      type: "number",
    },
    {
      field: "createdAt",
      headerName: "Created Date",
      width: 180,
      valueGetter: (params) => formatDate(params),
    },
    {
      field: "updatedAt",
      headerName: "Updated Date",
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
          navigate(`/region/edit/${params.row.id}`);
        };

        const handleInactivate = (event) => {
          event.stopPropagation();
          console.log("Inactivate", params.row?.id);
        };

        const handleDelete = (event) => {
          event.stopPropagation();
          deleteRegion(params.row.id);
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

  return (
    <div className="px-5 ">
      <HeaderPages
        title={"region"}
        links={[{ title: "region", slug: "/region", active: true }]}
      >
        <div className=" flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
          <Link to="/region/create">
            <Button variant="contained" color="primary">
              Create region
            </Button>
          </Link>
        </div>
      </HeaderPages>
      <div className="mt-5">
        <CustomTableData columns={columns} rows={regions} loading={loading} />
      </div>
    </div>
  );
}

export default RegionPage;
