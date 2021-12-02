import React, { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./detailsBody.css";
import { Button, ButtonGroup } from "@material-ui/core";

export default function DetailsBody({
  columns,
  rows,
  onClick,
  button,
  restoreButtonText,
  onClickRestore,
  deletedRows,
  deletedColumns,
}) {

  //use state to store the selected row
  const [selectedColumns,setSelectedColumns] = React.useState(columns);
  const [selectedRows, setSelectedRows] = React.useState(rows);

  //onclick select row
  const handleClick = () => {
    setSelectedColumns(columns);
    setSelectedRows(rows);
  }
  useEffect(() => {
    handleClick();
  }, [columns, rows,deletedColumns,deletedRows]);

  //onclick restore row
  const handleRestore = () => {
    setSelectedColumns(deletedColumns);
    setSelectedRows(deletedRows);
  }
  return (
    <div>
      <div className="viewTable-header">
        {button && (
          <div>
            <button
              onClick={(e) => onClick(e)}
              className="btn btn-primary btn-create"
            >
              Create
            </button>
            <Button
              onClick={(e) => onClickRestore(e)}
              color="secondary"
              variant="contained"
            >
              {restoreButtonText}
            </Button>
          </div>
        )}
      </div>
      <div className="button-group">
        <ButtonGroup
          variant="contained"
          color="primary"
          aria-label="contained primary button group"
        >
          <Button onClick={handleClick} >  Active</Button>
          <Button onClick={handleRestore} >Deleted</Button>
        </ButtonGroup>
      </div>

      <div style={{ height: "600px", width: "100%" }}>
        {selectedRows.length > 0 && (
          <DataGrid
            rows={selectedRows}
            columns={selectedColumns}
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
