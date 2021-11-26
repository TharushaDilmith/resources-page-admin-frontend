import { Button, IconButton } from "@material-ui/core";
import { Delete, Edit, GetApp } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";

import DetailsBody from "../components/detailsBody/DetailsBody";
import DialogBox from "../components/DialogBox";
import PopupBody from "../components/PopupBody";
import ResourceForm from "../components/resourceForm/ResourceForm";
import SnackbarFeedback from "../components/SnackbarFeedback";

const initialState = {
  resource_name: "",
  resource_image: "",
  resource_url: "",
  resourcetype_id: "",
  awardingbody_id: "",
  course_id: "",
};

export default function Resource() {
  const [resource, setResource] = React.useState({});
  //use state to store the data
  const [resourceTypes, setResourceTypes] = React.useState([]);

  //use state to store course data
  const [courses, setCourses] = React.useState([]);

  //initialize the state
  const [initialResource, setInitialResource] = React.useState(initialState);

  //use state to store the data
  const [awardingBody, setAwardingBody] = React.useState([]);

  //use state open popup
  const [openPopup, setOpenPopup] = React.useState(false);

  //use state to store the edit popup
  const [openDeleteDialogBox, setOpenDeleteDialogBox] = React.useState(false);

  //set the state of the selected resource
  const [selectedResource, setSelectedResource] = useState([]);

  //set the state of the edit open popup
  const [editOpenPopup, setEditOpenPopup] = useState(false);

  //use state to store the update success
  const [updateSuccess, setUpdateSuccess] = useState(false);

  //use state to store the delete success
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  //use state to store the error
  const [error, setError] = useState(false);

  //use state to store the error message
  const [errorMessage, setErrorMessage] = useState("");

  //use state to store the success message
  const [successMessage, setSuccessMessage] = useState("");

  //use state to store the add success
  const [addSuccess, setAddSuccess] = useState(false);

  //useEffect
  useEffect(() => {
    getAllresources();
    getAllResourceTypes();
    getAllAwardingBody();
    getAllCourses();
  }, []);

  // get all resources
  const getAllresources = () => {
    axios
      .get("/resources")
      .then((res) => {
        setResource(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //get all resource types
  const getAllResourceTypes = () => {
    axios
      .get("/resource_types")
      .then((res) => {
        console.log(res.data);
        setResourceTypes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //get all awarding body
  const getAllAwardingBody = () => {
    axios
      .get("/awarding_bodies")
      .then((res) => {
        console.log(res.data);
        setAwardingBody(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //get all courses
  const getAllCourses = () => {
    axios
      .get("/courses")
      .then((res) => {
        console.log(res.data);
        setCourses(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //add resource
  const addResource = (e, resource) => {
    e.preventDefault();
    console.log(resource);
    axios
      .post("/resource", resource)
      .then((res) => {
        if (res.data.success) {
          getAllresources();
          setOpenPopup(false);
          setAddSuccess(true);
        } else {
          setError(true);
          setErrorMessage(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //edit resource
  const editResource = (e, resource) => {
    e.preventDefault();
    console.log(resource);
    axios
      .put(`/resource/${resource.id}`, resource)
      .then((res) => {
        if (res.data.success) {
          getAllresources();
          setEditOpenPopup(false);
          setUpdateSuccess(true);
        } else {
          setError(true);
          setErrorMessage(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //on click delete
  const onClickDelete = (data) => {
    setSelectedResource(data);
    setOpenDeleteDialogBox(true);
  };

  //delete resource
  const deleteResource = () => {
    axios
      .delete(`/resource/${selectedResource.id}`)
      .then((res) => {
        if (res.data.success) {
          getAllresources();
          setOpenDeleteDialogBox(false);
          setDeleteSuccess(true);
        } else {
          setError(true);
          setErrorMessage(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //onclick popup open
  const onClick = () => {
    setOpenPopup(true);
  };

  //onClick edit
  const onClickEdit = (data) => {
    setSelectedResource(data);
    setEditOpenPopup(true);
  };

  //onClick pdf
  const onClickPDF = (data) => {
    window.open(data);
  };

  //table columns
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "resource_name",
      headerName: "Resource Name",
      width: 180,
      editable: true,
    },
    {
      field: "resource_image",
      headerName: "Image",
      minWidth: 150,
      editable: true,
      renderCell: (params) => {
        return (
          <img
            src={params.row.resource_image}
            alt="image"
            style={{ width: "80px", height: "40px" }}
          />
        );
      },
    },
    {
      field: "resource_url",
      headerName: "PDF",
      width: 200,
      editable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              variant="contained"
              color="default"
              startIcon={<GetApp />}
              style={{ marginLeft: "20px", marginRight: "30px" }}
              onClick={() => onClickPDF(params.row.resource_url)}
            >
              PDF
            </Button>
          </>
        );
      },
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
    <div className="resource">
      <DetailsBody
        columns={columns}
        rows={resource}
        button={true}
        onClick={onClick}
      />

      <PopupBody
        title="Add resource"
        openPopup={openPopup}
        form={
          <ResourceForm
            buttonTitle="Add"
            data={initialResource}
            awardingBodies={awardingBody}
            resourceTypes={resourceTypes}
            course={courses}
            formClose={() => setOpenPopup(false)}
            onSubmit={addResource}
          />
        }
      />
      <PopupBody
        title="Edit resource"
        openPopup={editOpenPopup}
        form={
          <ResourceForm
            buttonTitle="Update"
            data={selectedResource}
            awardingBodies={awardingBody}
            resourceTypes={resourceTypes}
            course={courses}
            formClose={() => setEditOpenPopup(false)}
            onSubmit={editResource}
          />
        }
      />
      <DialogBox
        open={openDeleteDialogBox}
        handleClose={() => setOpenDeleteDialogBox(false)}
        onClickDelete={deleteResource}
        message={"This will delete resource permanently!"}
      />

      <SnackbarFeedback
        open={addSuccess}
        message={"Resource added successfully!"}
        onClose={() => setAddSuccess(false)}
        type="success"
      />
      <SnackbarFeedback
        open={updateSuccess}
        message={"Resource updated successfully!"}
        onClose={() => setUpdateSuccess(false)}
        type="success"
      />

      <SnackbarFeedback
        open={deleteSuccess}
        message={"Resource deleted successfully!"}
        onClose={() => setDeleteSuccess(false)}
        type="success"
      />
    </div>
  );
}
