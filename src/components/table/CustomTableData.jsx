import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

const paginationModel = { page: 0, pageSize: 5 };

function CustomTableData({ columns, rows, loading }) {
  return (
    <Paper
      sx={{
        height: 600,
        width: "100%",
        overflowX: "auto", // enable horizontal scroll
      }}
    >
      <div style={{ minWidth: "1000px" }}>
        {" "}
        {/* Or adjust based on column count */}
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[10, 20, 50]}
          checkboxSelection
          loading={loading}
          sx={{ border: 0 }}
        />
      </div>
    </Paper>
  );
}

export default CustomTableData;
