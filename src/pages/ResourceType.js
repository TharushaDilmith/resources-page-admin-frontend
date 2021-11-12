import { Button, IconButton } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DetailsBody from "../components/detailsBody/DetailsBody";
import DialogBox from "../components/DialogBox";
import PopupBody from "../components/PopupBody";
import ResourseTypeForm from "../components/ResourseTypeForm";

//initialize resourse type data
const initialState = {
  id: "",
  resource_type_name: "",
};

export default function ResourceType() {
  //use state to store the data
  const [resourceTypes, setResourceTypes] = React.useState([]);

  //initial resourse type
  const [initialResourseType, setInitialResourseType] = useState(initialState);

  //use state to store the popup
  const [openPopup, setOpenPopup] = React.useState(false);

  //use state to store the edit popup
  const [openEditPopup, setOpenEditPopup] = React.useState(false);

  //use state to store selected resourse type
  const [selectedResourseType, setSelectedResourseType] = useState([]);

  //use state to store the edit popup
  const [openDeleteDialogBox, setOpenDeleteDialogBox] = React.useState(false);

  //use effect to get data from the server
  useEffect(() => {
    getAllResourceTypes();
  }, []);

  //get all resource types
  const getAllResourceTypes = () => {
    axios
      .get("/resource_types")
      .then((res) => {
        
        setResourceTypes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //add new resource type
  const addNewResourceType = (e, data) => {
    e.preventDefault();
    axios
      .post("/resource_type", data)
      .then((res) => {
       
        getAllResourceTypes();
        setOpenPopup(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //edit resource type
  const editResourceType = (e, data) => {
    e.preventDefault();
    axios
      .put(`/resource_type/${selectedResourseType.id}`, data)
      .then((res) => {
        
        getAllResourceTypes();
        setOpenEditPopup(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //delete resource type
  const deleteResourceType = (id) => {
    axios
      .delete(`/resource_type/${selectedResourseType.id}}`)
      .then((res) => {
        setOpenDeleteDialogBox(false);
        getAllResourceTypes();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //on click edit
  const onClickEdit = (data) => {
    setSelectedResourseType(data);
    console.log(data);
    setOpenEditPopup(true);
  };

  //on click delete
  const onClickDelete = (data) => {
    setSelectedResourseType(data);
    setOpenDeleteDialogBox(true);
  };

  //onclick open popup
  const onClickOpenPopup = (id) => {
    setOpenPopup(true);
  };

  //table columns
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "resource_type_name",
      headerName: "Resource Type Name",
      width: 250,
      editable: true,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      editable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Edit />}
              style={{ marginLeft: "20px", marginRight: "30px" }}
              onClick={() => onClickEdit(params.row)}
            >
              Edit
            </Button>
            <IconButton onClick={() => onClickDelete(params.row)}>
              <Delete color="secondary" />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <div className="ResourceType">
      <DetailsBody
        onClick={onClickOpenPopup}
        columns={columns}
        rows={resourceTypes}
        button={true}
      />

      <PopupBody
        title="Add Resourse Type"
        openPopup={openPopup}
        form={
          <ResourseTypeForm
            buttonTitle="Add"
            data={initialResourseType}
            formClose={() => setOpenPopup(false)}
            onSubmit={addNewResourceType}
          />
        }
      />
      <PopupBody
        title="Update Resourse Type"
        openPopup={openEditPopup}
        form={
          <ResourseTypeForm
            buttonTitle="Update"
            data={selectedResourseType}
            formClose={() => setOpenEditPopup(false)}
            onSubmit={editResourceType}
          />
        }
      />
      <DialogBox
        open={openDeleteDialogBox}
        handleClose={() => setOpenDeleteDialogBox(false)}
        onClickDelete={deleteResourceType}
        message={"This will delete resourse type permanently!"}
      />
    </div>
  );
}
