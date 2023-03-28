import {Box, Button, CircularProgress, IconButton} from "@material-ui/core";
import {Delete, Edit} from "@material-ui/icons";
import axios from "axios";
import React, {useEffect, useState} from "react";
import DetailsBody from "../components/detailsBody/DetailsBody";
import DialogBox from "../components/DialogBox";
import PopupBody from "../components/PopupBody";
import ResourceTypeForm from "../components/ResourceTypeForm";
import SnackbarFeedback from "../components/SnackbarFeedback";
import {getAllAwardingBody} from "../shared/AwardingBodyModule";
import {getAllBrands} from "../shared/BrandsModule";
import {getAllResourceName} from "../shared/ResourceNameModule";

//initialize resourse type data
const initialState = {
    id: "",
    resource_type_name: "",
    brand: "",
    awarding_body: "",
    validity: false
};

export default function ResourceType() {
    //use state to store the data
    const [resourceTypes, setResourceTypes] = React.useState([]);

    //use state to store the data
    const [resourceName, setResourceName] = React.useState([]);

    //use state to store deleted resource type
    const [deletedResourceType, setDeletedResourceType] = useState();

    //initial resourse type
    const [initialResourceType, setInitialResourceType] = useState(initialState);

    //use state to store the popup
    const [openPopup, setOpenPopup] = React.useState(false);

    //use state to store the edit popup
    const [openEditPopup, setOpenEditPopup] = React.useState(false);

    //use state to store selected resourse type
    const [selectedResourseType, setSelectedResourseType] = useState([]);

    //use state to store the edit popup
    const [openDeleteDialogBox, setOpenDeleteDialogBox] = React.useState(false);

    //use state to store the restore dialog box
    const [openRestoreDialogBox, setOpenRestoreDialogBox] = React.useState(false);

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

    //use state to store the restore single success dialog box
    const [singleRestoreSuccess, setSingleRestoreSuccess] = useState(false);

    //use state to store the add success
    const [addSuccess, setAddSuccess] = useState(false);

    const [loading, setLoading] = useState(false);

    //use state to store brands
    const [brand, setBrand] = React.useState([]);

    //use state to store awarding bodies
    const [awardingBody, setAwardingBody] = React.useState([]);



    //use effect to get data from the server
    useEffect(() => {
        getAllResourceTypes();
        getAllDeletedResourceTypes();
        getAllAwardingBody(setAwardingBody,setLoading);
        getAllBrands(setBrand,setLoading);
        getAllResourceName(setResourceName, setLoading);
    }, []);

    //get all resource types
    const getAllResourceTypes = () => {
        setLoading(true);
        axios
            .get("/resource_types")
            .then((res) => {
                setResourceTypes(res.data);
                console.log(res.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err);
            });
    };

    //get all deleted resource types
    const getAllDeletedResourceTypes = () => {
        axios
            .get("/resource_type/deleted")
            .then((res) => {
                console.log(res.data);
                setDeletedResourceType(res.data);
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
                if (res.data.success) {
                    getAllResourceTypes();
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

    //edit resource type
    const editResourceType = (e, data) => {
        e.preventDefault();
        axios
            .put(`/resource_type/${selectedResourseType.id}`, data)
            .then((res) => {
                if (res.data.success) {
                    getAllResourceTypes();
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

    //delete resource type
    const deleteResourceType = (id) => {
        axios
            .delete(`/resource_type/${selectedResourseType.id}}`)
            .then((res) => {
                if (res.data.success) {
                    setOpenDeleteDialogBox(false);
                    getAllDeletedResourceTypes();
                    getAllResourceTypes();
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

    //restore all resource types
    const restoreResourceTypes = () => {
        axios
            .post("/resource_type/restore")
            .then((res) => {
                if (res.data.success) {
                    getAllResourceTypes();
                    getAllDeletedResourceTypes();
                    setOpenRestoreDialogBox(false);
                } else {
                    setError(true);
                    setErrorMessage(res.data.message);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    //restore single resource type
    const restoreSingleResourceType = (id) => {
        try {
            axios.post("/resource_type/restore/" + id).then((res) => {
                console.log("done");
                getAllDeletedResourceTypes();
                getAllResourceTypes();
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
            field: "resource_type_name",
            headerName: "Resource Type Name",
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
            field: "awarding_body_name",
            headerName: "Awarding Body",
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

    //deleted resource type table columns
    const deletedColumns = [
        {field: "id", headerName: "ID", width: 100},
        {
            field: "resource_type_name",
            headerName: "Resource Type Name",
            width: 250,
            editable: true,
        },
        {
            field: "resource_type_name",
            headerName: "brand_name",
            width: 250,
            editable: true,
        },
        {
            field: "Awarding Body",
            headerName: "awarding_body_name",
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
                            onClick={() => restoreSingleResourceType(params.row.id)}
                        >
                            Restore
                        </Button>
                    </>
                );
            },
        },
    ];

    return (
        <div className="ResourceType">
            {
                loading ? (
                    <Box sx={{ display: 'flex',alignContent:'center',justifyContent:'center'}} >
                        <CircularProgress />
                    </Box>
                ):(
                    <DetailsBody
                        onClick={onClickOpenPopup}
                        columns={columns}
                        rows={resourceTypes}
                        deletedColumns={deletedColumns}
                        deletedRows={deletedResourceType}
                        button={true}
                        restoreButtonText="Restore All"
                        onClickRestore={() => setOpenRestoreDialogBox(true)}
                    />
                )
            }

            <PopupBody
                title="Add Resource Type"
                openPopup={openPopup}
                form={
                    <ResourceTypeForm
                        buttonTitle="Add"
                        data={initialResourceType}
                        brands={brand}
                        awardingBodies={awardingBody}
                        resourceNames={resourceName}
                        formClose={() => setOpenPopup(false)}
                        onSubmit={addNewResourceType}
                    />
                }
            />
            <PopupBody
                title="Update Resource Type"
                openPopup={openEditPopup}
                form={
                    <ResourceTypeForm
                        buttonTitle="Update"
                        data={selectedResourseType}
                        brands={brand}
                        awardingBodies={awardingBody}
                        resourceNames={resourceName}
                        formClose={() => setOpenEditPopup(false)}
                        onSubmit={editResourceType}
                    />
                }
            />
            <DialogBox
                open={openDeleteDialogBox}
                handleClose={() => setOpenDeleteDialogBox(false)}
                onClickDelete={deleteResourceType}
                message={"This will delete resource type permanently!"}
                buttonText={"Delete"}
            />

            <DialogBox
                open={openRestoreDialogBox}
                handleClose={() => setOpenRestoreDialogBox(false)}
                onClickDelete={restoreResourceTypes}
                message={"This will restore all resource types!"}
                buttonText={"Restore"}
            />

            <SnackbarFeedback
                open={addSuccess}
                message={"Resource Type added successfully!"}
                onClose={() => setAddSuccess(false)}
                type="success"
            />
            <SnackbarFeedback
                open={updateSuccess}
                message={"Resource Type updated successfully!"}
                onClose={() => setUpdateSuccess(false)}
                type="success"
            />

            <SnackbarFeedback
                open={deleteSuccess}
                message={"Resource Type deleted successfully!"}
                onClose={() => setDeleteSuccess(false)}
                type="success"
            />

            <SnackbarFeedback
                open={singleRestoreSuccess}
                message={"Resource type restored successfully!"}
                onClose={() => setSingleRestoreSuccess(false)}
                type="success"
            />
        </div>
    );
}
