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
import { useWikisStore } from "@/stores/useWikisStore";
import LoadingSpinner from "@/components/loadgin/LoadingSpinner";

function WikisPage() {
  const { getAllWikis, wikis, loading, deleteWiki } = useWikisStore();
  const navigate = useNavigate();
  React.useEffect(() => {
    getAllWikis();
  }, [getAllWikis]);
  const columns = [
    {
      field: "title",
      headerName: "Title",
      width: 200,
    },
    {
      field: "slug",
      headerName: "Slug",
      width: 200,
    },
    {
      field: "author",
      headerName: "Author",
      width: 180,
      valueGetter: (params) => params?.trim(), // Trim extra tab or whitespace
    },
    {
      field: "publishedAt",
      headerName: "Published Date",
      width: 180,
      valueGetter: (params) => (params ? formatDate(params) : "Unpublished"),
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
          navigate(`/wikis/edit/${params.row.id}`);
        };

        const handleInactivate = (event) => {
          event.stopPropagation();
          console.log("Inactivate", params.row?.id);
        };

        const handleDelete = (event) => {
          event.stopPropagation();
          deleteWiki(params.row.id);
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

  console.log(wikis);
  if (loading) return <LoadingSpinner />;
  return (
    <div className="px-5 ">
      <HeaderPages
        title={"wikis"}
        links={[{ title: "wikis", slug: "/wikis", active: true }]}
      >
        <div className=" flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
          <Link to="/wikis/create">
            <Button variant="contained" color="primary">
              Create wikis
            </Button>
          </Link>
        </div>
      </HeaderPages>
      <div className="mt-5">
        <CustomTableData columns={columns} rows={wikis} loading={loading} />
      </div>
    </div>
  );
}

export default WikisPage;
