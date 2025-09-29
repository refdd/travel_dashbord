import HeaderPages from "@/components/headers/HeaderPages";
import CustomTableData from "@/components/table/CustomTableData";
import { Button } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import Tooltip from "@mui/material/Tooltip";
import { formatDate } from "@/utils/formatDate";
import { useUserStore } from "@/stores/useUserStore";
import LoadingSpinner from "@/components/loadgin/LoadingSpinner";

function UsersPage() {
  const { getAllUsers, users, loading, deleteUser } = useUserStore();
  const navigate = useNavigate();
  React.useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);
  console.log(users);
  const columns = [
    {
      field: "imageUrl",
      headerName: "Avatar",
      width: 100,
      renderCell: (params) => (
        <img
          src={params.value}
          alt={params.row.name}
          style={{ width: 40, height: 40, borderRadius: "50%" }}
        />
      ),
    },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "role", headerName: "Role", width: 120 },
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
          navigate(`/users/edit/${params.row.id}`);
        };

        const handleInactivate = (event) => {
          event.stopPropagation();
          console.log("Inactivate", params.row?.id);
        };

        const handleDelete = (event) => {
          event.stopPropagation();
          deleteUser(params.row.id);
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

  if (loading) return <LoadingSpinner />;
  return (
    <div className="px-5 ">
      <HeaderPages
        title={"users"}
        links={[{ title: "users", slug: "/users", active: true }]}
      >
        <div className=" flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
          <Link to="/users/create">
            <Button variant="contained" color="primary">
              Create user
            </Button>
          </Link>
        </div>
      </HeaderPages>
      <div className="mt-5">
        <CustomTableData rows={users} columns={columns} />
      </div>
    </div>
  );
}

export default UsersPage;
