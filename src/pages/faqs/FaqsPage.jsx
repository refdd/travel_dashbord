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
import { useFaqsStore } from "@/stores/useFaqsStore";

function FaqsPage() {
  //   const { getAllBlogs, blogs, loading, deleteBlog } = useBlogStore();
  const { getAllFaqs, faqs, loading, deleteFaq } = useFaqsStore();
  const navigate = useNavigate();
  React.useEffect(() => {
    getAllFaqs();
  }, [getAllFaqs]);
  const columns = [
    { field: "question", headerName: "Question", width: 250 },
    { field: "answer", headerName: "Answer", width: 300 },
    { field: "author", headerName: "Author", width: 150 },
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
          navigate(`/faqs/edit/${params.row.id}`);
        };

        const handleInactivate = (event) => {
          event.stopPropagation();
          console.log("Inactivate", params.row?.id);
        };

        const handleDelete = (event) => {
          event.stopPropagation();
          deleteFaq(params.row.id);
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
        title={"faqs"}
        links={[{ title: "faqs", slug: "/faqs", active: true }]}
      >
        <div className=" flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
          <Link to="/faqs/create">
            <Button variant="contained" color="primary">
              Create faqs
            </Button>
          </Link>
        </div>
      </HeaderPages>
      <div className="mt-5">
        <CustomTableData columns={columns} rows={faqs} loading={loading} />
      </div>
    </div>
  );
}

export default FaqsPage;
