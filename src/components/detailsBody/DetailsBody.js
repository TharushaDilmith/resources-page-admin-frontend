import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./detailsBody.css";
import { Button } from "@material-ui/core";

export default function DetailsBody({ columns, rows, onClick, button,restoreButtonText,onClickRestore }) {
  return (
    <div>
      <div className="viewTable-header">
        {button && (
          <div>
            <button onClick={(e) => onClick(e)} className="btn btn-primary btn-create">
              Create
            </button>
            <Button onClick={(e) => onClickRestore(e)} color="secondary" variant="contained">
              {restoreButtonText}
            </Button>
          </div>
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
