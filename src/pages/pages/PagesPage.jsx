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
import { usePageStore } from "@/stores/usePageStore";

function PagesPage() {
  //   const { getAllUsers, users, loading, deleteUser } = useUserStore();
  const { getAllPages, pages, loading, deletePage } = usePageStore();
  const navigate = useNavigate();
  React.useEffect(() => {
    getAllPages();
  }, [getAllPages]);
  console.log(pages);
  const columns = [
    {
      field: "imageUrl",
      headerName: "Banner",
      width: 100,
      renderCell: (params) => (
        <img
          src={params.value}
          alt={params.row.imageAlt}
          style={{ width: 50, height: 50, borderRadius: 8, objectFit: "cover" }}
        />
      ),
    },
    { field: "title", headerName: "Title", width: 200 },
    { field: "slug", headerName: "Slug", width: 200 },
    { field: "author", headerName: "Author", width: 150 },
    {
      field: "publishedAt",
      headerName: "Published",
      width: 150,
      renderCell: (params) =>
        params.value ? (
          <span style={{ color: "green" }}>Published</span>
        ) : (
          <span style={{ color: "orange" }}>Draft</span>
        ),
    },
    {
      field: "createdAt",
      headerName: "Created",
      width: 180,
      valueGetter: (params) => formatDate(params),
    },
    {
      field: "updatedAt",
      headerName: "Updated",
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
          navigate(`/pages/edit/${params.row.id}`);
        };

        const handleDelete = (event) => {
          event.stopPropagation();
          deletePage(params.row.id);
        };

        return (
          <>
            <Tooltip title="Edit">
              <IconButton onClick={handleEdit}>
                <EditIcon color="primary" />
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
        title={"pages"}
        links={[{ title: "pages", slug: "/pages", active: true }]}
      >
        <div className=" flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
          <Link to="/pages/create">
            <Button variant="contained" color="primary">
              Create user
            </Button>
          </Link>
        </div>
      </HeaderPages>
      <div className="mt-5">
        <CustomTableData rows={pages} columns={columns} />
      </div>
    </div>
  );
}

export default PagesPage;
