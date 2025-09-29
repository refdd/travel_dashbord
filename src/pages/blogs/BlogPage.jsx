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
import { useBlogStore } from "@/stores/useBlogStore";
import { formatDate } from "@/utils/formatDate";

function BlogPage() {
  const { getAllBlogs, blogs, loading, deleteBlog } = useBlogStore();
  const navigate = useNavigate();
  React.useEffect(() => {
    getAllBlogs();
  }, [getAllBlogs]);
  const columns = [
    // { field: "id", headerName: "ID", width: 250 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "slug", headerName: "Slug", width: 200 },
    {
      field: "author",
      headerName: "Author",
      width: 150,
    },
    {
      field: "publishedAt",
      headerName: "Published Date",
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

          navigate(`/blog/edit/${params.row.id}`);
        };

        const handleInactivate = (event) => {
          event.stopPropagation();
          console.log("Inactivate", params.row?.id);
        };

        const handleDelete = (event) => {
          event.stopPropagation();
          deleteBlog(params.row.id);
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
        title={"blog"}
        links={[{ title: "blog", slug: "/blog", active: true }]}
      >
        <div className=" flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
          <Link to="/blog/create">
            <Button variant="contained" color="primary">
              Create blog
            </Button>
          </Link>
        </div>
      </HeaderPages>
      <div className="mt-5">
        <CustomTableData columns={columns} rows={blogs} loading={loading} />
      </div>
    </div>
  );
}

export default BlogPage;
