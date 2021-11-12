import { Button, IconButton } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect } from "react";
import AwardingBodyForm from "../components/AwardingBodyForm";
import DetailsBody from "../components/detailsBody/DetailsBody";
import DialogBox from "../components/DialogBox";
import PopupBody from "../components/PopupBody";

//initialize awarding body data
const initialState = {
  id: "",
  awarding_body_name: "",
};

export default function AwardingBody() {
  //use state to store the data
  const [awardingBody, setAwardingBody] = React.useState([]);

  //use state to store the initial award body data
  const [initialAwardingBody, setInitialAwardingBody] =
    React.useState(initialState);

  //use state to store the selected award body
  const [selectedAwardingBody, setSelectedAwardingBody] =
    React.useState(initialState);

  //use state to store the popup
  const [openPopup, setOpenPopup] = React.useState(false);

  //use state to store the edit popup
  const [openEditPopup, setOpenEditPopup] = React.useState(false);

  //use state to store the edit popup
  const [openDeleteDialogBox, setOpenDeleteDialogBox] = React.useState(false);

  //onclick open popup
  const onClickOpenPopup = () => {
    setOpenPopup(true);
  };

  //use effect to get data from api
  useEffect(() => {
    getAllAwardingBody();
  }, []);

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

  //on click delete
  const onClickDelete = (data) => {
    setSelectedAwardingBody(data);
    setOpenDeleteDialogBox(true);
  };

  //on click edit
  const onClickEdit = (data) => {
    setSelectedAwardingBody(data);
    setOpenEditPopup(true);
  };

  //add new award body
  const addAwardingBody = (e, data) => {
    e.preventDefault();
    axios
      .post("/awarding_body", data)
      .then((res) => {
        getAllAwardingBody();
        setOpenPopup(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //update award body
  const updateAwardingBody = (e, data) => {
    e.preventDefault();
    axios
      .put("/awarding_body/" + selectedAwardingBody.id, data)
      .then((res) => {
        getAllAwardingBody();
        setOpenEditPopup(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //delete award body
  const deleteAwardingBody = (id) => {
    axios
      .delete("/awarding_body/" + selectedAwardingBody.id)
      .then((res) => {
        setOpenDeleteDialogBox(false);
        getAllAwardingBody();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //table columns
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "awarding_body_name",
      headerName: "Awarding Body Name",
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
    <div>
      <DetailsBody
        onClick={onClickOpenPopup}
        columns={columns}
        rows={awardingBody}
        button={true}
      />
      <PopupBody
        title="Add Resourse Type"
        openPopup={openPopup}
        form={
          <AwardingBodyForm
            buttonTitle="Add"
            data={initialAwardingBody}
            formClose={() => setOpenPopup(false)}
            onSubmit={addAwardingBody}
          />
        }
      />
      <PopupBody
        title="Update Resourse Type"
        openPopup={openEditPopup}
        form={
          <AwardingBodyForm
            buttonTitle="Update"
            data={selectedAwardingBody}
            formClose={() => setOpenEditPopup(false)}
            onSubmit={updateAwardingBody}
          />
        }
      />

      <DialogBox
        open={openDeleteDialogBox}
        handleClose={()=>setOpenDeleteDialogBox(false)}
        onClickDelete={deleteAwardingBody}
        message={"This will delete awarding body permanently!"}
      />
    </div>
  );
}
