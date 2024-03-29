import {Box, Button, CircularProgress, IconButton} from "@material-ui/core";
import {Delete, Edit} from "@material-ui/icons";
import axios from "axios";
import { CSVLink } from "react-csv";
import React, {useEffect, useState} from "react";
import AwardingBodyForm from "../components/AwardingBodyForm";
import DetailsBody from "../components/detailsBody/DetailsBody";
import DialogBox from "../components/DialogBox";
import PopupBody from "../components/PopupBody";
import SnackbarFeedback from "../components/SnackbarFeedback";
import {getAllBrands} from "../shared/BrandsModule";
import {getAllAwardingBody} from "../shared/AwardingBodyModule";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";

//initialize awarding body data
const initialState = {
    id: "",
    awarding_body_name: "",
    brand: ""
};

export default function AwardingBody() {
    //use state to store the data
    const [awardingBody, setAwardingBody] = React.useState([]);

    //use state to store the data
    const [brand, setBrand] = React.useState([]);

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

    //use state to store the restore dialog box
    const [openRestoreDialogBox, setOpenRestoreDialogBox] = React.useState(false);

    //use state to store the single restore dialog box
    const [openSingleRestoreDialogBox, setOpenSingleRestoreDialogBox] =
        useState(false);

    //seeleted restore award body id
    const [selectedRestoreAwardingBodyId, setSelectedRestoreAwardingBodyId] =
        useState("");

    //use state to store the restore single success dialog box
    const [singleRestoreSuccess, setSingleRestoreSuccess] = useState(false);

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

    //use state to store the trashed award body
    const [trashedAwardingBody, setTrashedAwardingBody] = useState([]);

    const [loading, setLoading] = useState(false);

    //onclick open popup
    const onClickOpenPopup = () => {
        setOpenPopup(true);
    };

    //use effect to get data from api
    useEffect(() => {
        getAllAwardingBody(setAwardingBody,setLoading);
        getAllBrands(setBrand,setLoading);
        getTrashedAwardingBodies();
    }, []);



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
        console.log(data)
        axios
            .post("/awarding_body", data)
            .then((res) => {
                if (res.data.success) {
                    getAllAwardingBody(setAwardingBody,setLoading);
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

    //update award body
    const updateAwardingBody = (e, data) => {
        e.preventDefault();
        axios
            .put("/awarding_body/" + selectedAwardingBody.id, data)
            .then((res) => {
                if (res.data.success) {
                    getAllAwardingBody(setAwardingBody,setLoading);
                    setOpenEditPopup(false);
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

    //delete award body
    const deleteAwardingBody = (id) => {
        axios
            .delete("/awarding_body/" + selectedAwardingBody.id)
            .then((res) => {
                if (res.data.success) {
                    setOpenDeleteDialogBox(false);
                    getTrashedAwardingBodies();
                    getAllAwardingBody(setAwardingBody,setLoading);
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

    //onclick restore award bodies
    const onClickRestore = () => {
        setOpenRestoreDialogBox(true);
    };

    //restore awarding bodies
    const restoreAwardingBodies = () => {
        axios
            .post("/awarding_body/restore")

            .then((res) => {
                if (res.data.success) {
                    setOpenRestoreDialogBox(false);
                    getAllAwardingBody(setAwardingBody,setLoading);
                    getTrashedAwardingBodies();
                    // setSuccessMessage(res.data.message);
                } else {
                    setError(true);
                    setErrorMessage(res.data.message);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    //get trashed awarding bodies
    const getTrashedAwardingBodies = () => {
        axios
            .get("/awarding_body/deleted")
            .then((res) => {
                setTrashedAwardingBody(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // //onclick single restore single award body
    // const onClickRestoreSingleAwardingBody = (id) => {
    //   setSelectedRestoreAwardingBodyId(id);
    //   setOpenSingleRestoreDialogBox(true);
    // };

    //restore single award body
    const restoreSingleAwardingBody = (id) => {
        try {
            axios.post("/awarding_body/restore/" + id).then((res) => {
                console.log("done");
                getTrashedAwardingBodies();
                getAllAwardingBody(setAwardingBody,setLoading);
                setSingleRestoreSuccess(true);
            });
        } catch (error) {
            console.log(error);
        }
    };

    //table columns
    const columns = [
        {field: "id", headerName: "ID", width: 100},
        {
            field: "awarding_body_name",
            headerName: "Awarding Body Name",
            width: 250,
            editable: true,
        },
        {
            field: "brand_name",
            headerName: "Brand",
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
                            startIcon={<Edit/>}
                            style={{marginLeft: "20px", marginRight: "30px"}}
                            onClick={() => onClickEdit(params.row)}
                        >
                            Edit
                        </Button>
                        <IconButton onClick={() => onClickDelete(params.row)}>
                            <Delete color="secondary"/>
                        </IconButton>
                    </>
                );
            },
        },
    ];

    //deleted awarding bodies table columns
    const deletedAwardingBodyColumns = [
        {field: "id", headerName: "ID", width: 100},
        {
            field: "awarding_body_name",
            headerName: "Awarding Body Name",
            width: 250,
            editable: true,
        },
        {
            field: "brand_name",
            headerName: "Brand",
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
                            color="secondary"
                            startIcon={<Edit/>}
                            style={{marginLeft: "20px", marginRight: "30px"}}
                            onClick={() => restoreSingleAwardingBody(params.row.id)}
                        >
                            Restore
                        </Button>
                    </>
                );
            },
        },
    ];

    const headers = [
        { label: "id", key: "id" },
        { label: "Awarding Body", key: "awarding_body_name" },
        { label: "Brand", key: "brand_name" }
    ];

    const csvBtn = () => {
        return (
            <Button variant="contained" color="primary" startIcon={<ArrowCircleDownIcon />} style={{marginRight:'10px'}}>
                <CSVLink data={awardingBody} headers={headers} filename="Awarding Bodies">
                    <p style={{color:'white'}}>Export CSV</p>
                </CSVLink>
            </Button>
        );
    }

    function saveAs(pdfBlob, pdf) {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(pdfBlob);
        link.download = pdf;
        link.click();

    }

    const downloadReport = async () => {
        const res = await axios.get('/awarding_body/report', { responseType: 'arraybuffer'});
        const pdfBlob = new Blob([res.data], {type: 'application/pdf'});

        saveAs(pdfBlob, 'awarding_body.pdf');
    }


    return (

        <div>
            {
                loading ?<Box sx={{ display: 'flex',alignContent:'center',justifyContent:'center'}} >
                    <CircularProgress />
                </Box> :             <DetailsBody
                    onClick={onClickOpenPopup}
                    columns={columns}
                    rows={awardingBody}
                    deletedRows={trashedAwardingBody}
                    deletedColumns={deletedAwardingBodyColumns}
                    button={true}
                    exportButtons={true}
                    downloadReport={downloadReport}
                    csvBtn={csvBtn}
                    restoreButtonText="Restore All"
                    onClickRestore={onClickRestore}
                />
            }

            <PopupBody
                title="Add Awarding Body"
                openPopup={openPopup}
                form={
                    <AwardingBodyForm
                        buttonTitle="Add"
                        data={initialAwardingBody}
                        brands={brand}
                        formClose={() => setOpenPopup(false)}
                        onSubmit={addAwardingBody}
                    />
                }
            />
            <PopupBody
                title="Update Awarding Body"
                openPopup={openEditPopup}
                form={
                    <AwardingBodyForm
                        buttonTitle="Update"
                        data={selectedAwardingBody}
                        formClose={() => setOpenEditPopup(false)}
                        onSubmit={updateAwardingBody}
                        brands={brand}
                    />
                }
            />

            <DialogBox
                open={openDeleteDialogBox}
                handleClose={() => setOpenDeleteDialogBox(false)}
                onClickDelete={deleteAwardingBody}
                message={"This will delete awarding body permanently!"}
                buttonText="Delete"
            />

            <DialogBox
                open={openRestoreDialogBox}
                handleClose={() => setOpenRestoreDialogBox(false)}
                onClickDelete={restoreAwardingBodies}
                message={"This will restore all awarding bodies!"}
                buttonText="Restore"
            />
            {/*
      <DialogBox
        open={openSingleRestoreDialogBox}
        handleClose={() => setOpenSingleRestoreDialogBox(false)}
        onClickDelete={restoreSingleAwardingBody}
        message={"This will restore this awarding body!"}
        buttonText="Restore"
      /> */}

            <SnackbarFeedback
                open={addSuccess}
                message={"Awarding Body added successfully!"}
                onClose={() => setAddSuccess(false)}
                type="success"
            />
            <SnackbarFeedback
                open={updateSuccess}
                message={"Awarding Body updated successfully!"}
                onClose={() => setUpdateSuccess(false)}
                type="success"
            />

            <SnackbarFeedback
                open={deleteSuccess}
                message={"Awarding Body deleted successfully!"}
                onClose={() => setDeleteSuccess(false)}
                type="success"
            />

            <SnackbarFeedback
                open={singleRestoreSuccess}
                message={"Awarding Body restored successfully!"}
                onClose={() => setSingleRestoreSuccess(false)}
                type="success"
            />
        </div>
    );
}
