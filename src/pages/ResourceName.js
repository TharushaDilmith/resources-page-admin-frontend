import {Box, Button, CircularProgress, IconButton} from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AwardingBodyForm from "../components/AwardingBodyForm";
import DetailsBody from "../components/detailsBody/DetailsBody";
import DialogBox from "../components/DialogBox";
import PopupBody from "../components/PopupBody";
import SnackbarFeedback from "../components/SnackbarFeedback";
import BrandForm from "../BrandForm";
import {getAllBrands} from "../shared/BrandsModule";

//initialize awarding body data
const initialState = {
    id: "",
    name: "",
};

export default function ResourceName() {
    //use state to store the data
    const [resourceName, setResourceName] = React.useState([]);

    //use state to store the initial award body data
    const [initialResourceName, setInitialResourceName] =
        React.useState(initialState);

    //use state to store the selected award body
    const [selectedResourceName, setSelectedResourceName] =
        React.useState(initialState);

    //use state to store the popup
    const [openPopup, setOpenPopup] = React.useState(false);

    //use state to store the edit popup
    const [openEditPopup, setOpenEditPopup] = React.useState(false);

    //use state to store the edit popup
    const [openDeleteDialogBox, setOpenDeleteDialogBox] = React.useState(false);

    //use state to store the restore dialog box
    const [openRestoreDialogBox, setOpenRestoreDialogBox] = React.useState(false);

    //use state to store the restore dialog box
    const [openRestoreAllMessage, setOpenRestoreAllMessage] = React.useState(false);

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
    const [trashedBrand, setTrashedBrand] = useState([]);

    const [restoreAllSuccess, setRestoreAllSuccess] = useState(false);

    const [loading, setLoading] = useState(false);

    //onclick open popup
    const onClickOpenPopup = () => {
        setOpenPopup(true);
    };

    //use effect to get data from api
    useEffect(() => {
        getAllResourceName();
        getTrashedResourceName();
    }, []);


    //on click delete
    const onClickDelete = (data) => {
        setSelectedResourceName(data);
        setOpenDeleteDialogBox(true);
    };

    //on click edit
    const onClickEdit = (data) => {
        setSelectedResourceName(data);
        setOpenEditPopup(true);
    };

    // get all resource name
    const getAllResourceName = () => {
        axios
            .get("/resource_names")
            .then((res) => {
                setResourceName(res.data.resource_names);

            })
            .catch((err) => {
                console.log(err);
            });
    }

    //add new resourceName
    const addResourceName = (e, data) => {
        e.preventDefault();
        axios
            .post("/resource_names", data)
            .then((res) => {
                if (res.data.success) {
                    getAllResourceName();
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

    //update resourceName
    const updateResourceName = (e, data) => {
        e.preventDefault();
        axios
            .put("/resource_names/" + selectedResourceName.id, data)
            .then((res) => {
                if (res.data.success) {
                    getAllResourceName();
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

    //delete resourceName
    const deleteResourceName = (id) => {
        axios
            .delete("/brands/" + selectedResourceName.id)
            .then((res) => {
                if (res.data.success) {
                    setOpenDeleteDialogBox(false);
                    getTrashedResourceName();
                    getAllBrands(setResourceName,setLoading);
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

    //onclick restore resourceName
    const onClickRestore = () => {
        setOpenRestoreDialogBox(true);
    };

    //restore brands
    const restoreResourceName = () => {
        axios
            .post("/brands/restore")
            .then((res) => {
                if (res.data.success) {
                    setOpenRestoreDialogBox(false);
                    getAllBrands(setResourceName,setLoading);
                    setSuccessMessage(res.data.message);
                    setRestoreAllSuccess(true);
                } else {
                    setError(true);
                    setErrorMessage(res.data.message);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    //get trashed brands
    const getTrashedResourceName = () => {
        axios
            .get("/brands/deleted")
            .then((res) => {
                setTrashedBrand(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    //restore single resourceName
    const restoreSingleResourceName = (id) => {
        try {
            axios.post("/brands/restore/" + id).then((res) => {
                getTrashedResourceName();
                getAllBrands(setResourceName,setLoading);
                setSingleRestoreSuccess(true);
            });
        } catch (error) {
            console.log(error);
        }
    };

    //table columns
    const columns = [
        { field: "id", headerName: "ID", width: 100 },
        {
            field: "name",
            headerName: "Resource Name",
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

    //deleted awarding bodies table columns
    const deletedResourceNameColumns = [
        { field: "id", headerName: "ID", width: 100 },
        {
            field: "name",
            headerName: "Brand Name",
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
                            startIcon={<Edit />}
                            style={{ marginLeft: "20px", marginRight: "30px" }}
                            onClick={() => restoreSingleResourceName(params.row.id)}
                        >
                            Restore
                        </Button>
                    </>
                );
            },
        },
    ];

    return (
        <div>
            {
                loading ? (
                    <Box sx={{ display: 'flex',alignContent:'center',justifyContent:'center'}} >
                        <CircularProgress />
                    </Box>
                ):(
                    <DetailsBody
                        onClick={onClickOpenPopup}
                        columns={columns}
                        rows={resourceName}
                        deletedRows={trashedBrand}
                        deletedColumns={deletedResourceNameColumns}
                        button={true}
                        restoreButtonText="Restore All"
                        onClickRestore={onClickRestore}
                    />
                )
            }

            <PopupBody
                title="Add Resource Name"
                openPopup={openPopup}
                form={
                    <BrandForm
                        buttonTitle="Add"
                        data={initialResourceName}
                        formClose={() => setOpenPopup(false)}
                        onSubmit={addResourceName}
                    />
                }
            />
            <PopupBody
                title="Update Resource Name"
                openPopup={openEditPopup}
                form={
                    <BrandForm
                        buttonTitle="Update"
                        data={selectedResourceName}
                        formClose={() => setOpenEditPopup(false)}
                        onSubmit={updateResourceName}
                    />
                }
            />

            <DialogBox
                open={openDeleteDialogBox}
                handleClose={() => setOpenDeleteDialogBox(false)}
                onClickDelete={deleteResourceName}
                message={"Resource name will be deleted!"}
                buttonText="Delete"
            />

            <DialogBox
                open={openRestoreDialogBox}
                handleClose={() => setOpenRestoreDialogBox(false)}
                onClickDelete={restoreResourceName}
                message={"This will restore all resource names!"}
                buttonText="Restore"
            />

            <SnackbarFeedback
                open={addSuccess}
                message={"Resource name added successfully!"}
                onClose={() => setAddSuccess(false)}
                type="success"
            />
            <SnackbarFeedback
                open={updateSuccess}
                message={"Resource name updated successfully!"}
                onClose={() => setUpdateSuccess(false)}
                type="success"
            />

            <SnackbarFeedback
                open={deleteSuccess}
                message={"Resource name deleted successfully!"}
                onClose={() => setDeleteSuccess(false)}
                type="success"
            />

            <SnackbarFeedback
                open={singleRestoreSuccess}
                message={"Resource name restored successfully!"}
                onClose={() => setSingleRestoreSuccess(false)}
                type="success"
            />
            <SnackbarFeedback
                open={restoreAllSuccess}
                message={"All resource names restored successfully!"}
                onClose={() => setRestoreAllSuccess(false)}
                type="success"
            />
            <SnackbarFeedback
                open={error}
                message={errorMessage}
                onClose={() => setError(false)}
                type="error"
            />
        </div>
    );
}
