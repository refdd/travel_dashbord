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
import { useReviewsStore } from "@/stores/useRviewsStore";

function ReviewsPage() {
  const { getAllReviews, reviews, loading, deleteReview } = useReviewsStore();
  const navigate = useNavigate();
  React.useEffect(() => {
    getAllReviews();
  }, [getAllReviews]);
  const columns = [
    { field: "id", headerName: "ID", width: 240 },
    { field: "author", headerName: "Author", width: 150 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "comment", headerName: "Comment", width: 250 },
    {
      field: "rating",
      headerName: "Rating",
      width: 120,
      renderCell: (params) => "⭐".repeat(params.value), // quick star display
    },
    {
      field: "imageUrl",
      headerName: "Image",
      width: 120,
      renderCell: (params) => (
        <img
          src={params.value}
          alt={params.row.imageAlt || "review image"}
          style={{
            width: 50,
            height: 50,
            borderRadius: "6px",
            objectFit: "cover",
          }}
        />
      ),
    },
    {
      field: "publishedAt",
      headerName: "Published Date",
      width: 180,
      valueGetter: (params) => formatDate(params),
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
          navigate(`/reviews/edit/${params.row.id}`);
        };

        const handleDelete = (event) => {
          event.stopPropagation();
          deleteReview(params.row.id);
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

  return (
    <div className="px-5 ">
      <HeaderPages
        title={"reviews"}
        links={[{ title: "reviews", slug: "/reviews", active: true }]}
      >
        <div className=" flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
          <Link to="/reviews/create">
            <Button variant="contained" color="primary">
              Create reviews
            </Button>
          </Link>
        </div>
      </HeaderPages>
      <div className="mt-5">
        <CustomTableData columns={columns} rows={reviews} loading={loading} />
      </div>
    </div>
  );
}

export default ReviewsPage;
