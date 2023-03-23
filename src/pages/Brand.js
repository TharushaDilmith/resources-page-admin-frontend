import { Button, IconButton } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AwardingBodyForm from "../components/AwardingBodyForm";
import DetailsBody from "../components/detailsBody/DetailsBody";
import DialogBox from "../components/DialogBox";
import PopupBody from "../components/PopupBody";
import SnackbarFeedback from "../components/SnackbarFeedback";
import BrandForm from "../BrandForm";

//initialize awarding body data
const initialState = {
    id: "",
    name: "",
};

export default function Brand() {
    //use state to store the data
    const [brand, setBrand] = React.useState([]);

    //use state to store the initial award body data
    const [initialBrand, setInitialBrand] =
        React.useState(initialState);

    //use state to store the selected award body
    const [selectedBrand, setSelectedBrand] =
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
    const [trashedBrand, setTrashedBrand] = useState([]);

    //onclick open popup
    const onClickOpenPopup = () => {
        setOpenPopup(true);
    };

    //use effect to get data from api
    useEffect(() => {
        console.log("use effect")
        getAllBrands();
        getTrashedAwardingBodies();
    }, []);

    //get all awarding body
    const getAllBrands = () => {
        axios
            .get("/brands")
            .then((res) => {
                setBrand(res.data.data);
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    //on click delete
    const onClickDelete = (data) => {
        setSelectedBrand(data);
        setOpenDeleteDialogBox(true);
    };

    //on click edit
    const onClickEdit = (data) => {
        setSelectedBrand(data);
        setOpenEditPopup(true);
    };

    //add new award body
    const addBrand = (e, data) => {
        e.preventDefault();
        axios
            .post("/brands", data)
            .then((res) => {
                if (res.data.success) {
                    getAllBrands();
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
    const updateBrand = (e, data) => {
        e.preventDefault();
        axios
            .put("/brands/" + selectedBrand.id, data)
            .then((res) => {
                if (res.data.success) {
                    getAllBrands();
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
    const deleteBrand = (id) => {
        axios
            .delete("/brands/" + selectedBrand.id)
            .then((res) => {
                if (res.data.success) {
                    setOpenDeleteDialogBox(false);
                    getTrashedAwardingBodies();
                    getAllBrands();
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
                    getAllBrands();
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
                setTrashedBrand(res.data);
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
                getAllBrands();
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
    const deletedAwardingBodyColumns = [
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
                            onClick={() => restoreSingleAwardingBody(params.row.id)}
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
            <DetailsBody
                onClick={onClickOpenPopup}
                columns={columns}
                rows={brand}
                deletedRows={trashedBrand}
                deletedColumns={deletedAwardingBodyColumns}
                button={true}
                restoreButtonText="Restore All"
                onClickRestore={onClickRestore}
            />
            <PopupBody
                title="Add Brand"
                openPopup={openPopup}
                form={
                    <BrandForm
                        buttonTitle="Add"
                        data={initialBrand}
                        formClose={() => setOpenPopup(false)}
                        onSubmit={addBrand}
                    />
                }
            />
            <PopupBody
                title="Update Brand"
                openPopup={openEditPopup}
                form={
                    <BrandForm
                        buttonTitle="Update"
                        data={selectedBrand}
                        formClose={() => setOpenEditPopup(false)}
                        onSubmit={updateBrand}
                    />
                }
            />

            <DialogBox
                open={openDeleteDialogBox}
                handleClose={() => setOpenDeleteDialogBox(false)}
                onClickDelete={deleteBrand}
                message={"Brand will be deleted!"}
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
