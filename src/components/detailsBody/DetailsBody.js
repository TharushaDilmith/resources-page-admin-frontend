import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./detailsBody.css";


export default function DetailsBody({ columns, rows, onClick, button }) {
  return (
    <div>
      <div className="viewTable-header">
        {button && (
          <button onClick={(e) => onClick(e)} className="btn btn-primary">
            Create
          </button>
        )}
      </div>

      <div style={{ height: "600px", width: "100%" }}>
        {rows.length > 0 && (
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            // getRowId={(row) => row._id}
            autoHeight={true}
            autoPageSize={true}
          />
        )}
      </div>
    </div>
  );
}
