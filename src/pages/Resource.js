import {Box, Button, CircularProgress, IconButton} from "@material-ui/core";
import {Delete, Edit, GetApp} from "@material-ui/icons";
import axios from "axios";
import React, {useEffect, useState} from "react";

import DetailsBody from "../components/detailsBody/DetailsBody";
import DialogBox from "../components/DialogBox";
import PopupBody from "../components/PopupBody";
import ResourceForm from "../components/resourceForm/ResourceForm";
import SnackbarFeedback from "../components/SnackbarFeedback";
import {getAllResourceName} from "../shared/ResourceNameModule";
import {getAllBrands} from "../shared/BrandsModule";
import {getAllAwardingBody} from "../shared/AwardingBodyModule";

const initialState = {
    resource_name: "",
    resource_image: "",
    resource_url: "",
    resourcetype_id: "",
    awardingbody_id: "",
    course_id: "",
    brand: "",
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

    //use state to store the restore dialog box
    const [openRestoreDialogBox, setOpenRestoreDialogBox] = React.useState(false);

    //use state to store the deleted resource
    const [deletedResource, setDeletedResource] = useState([]);

    //use state to store the restore single success dialog box
    const [singleRestoreSuccess, setSingleRestoreSuccess] = useState(false);

    //use state to store the error
    const [error, setError] = useState(false);

    //use state to store the error message
    const [errorMessage, setErrorMessage] = useState("");

    //use state to store the success message
    const [successMessage, setSuccessMessage] = useState("");

    //use state to store the add success
    const [addSuccess, setAddSuccess] = useState(false);

    const [loading, setLoading] = useState(false);

    const [brands, setBrands] = useState([]);

    //useEffect
    useEffect(() => {
        getAllresources();
        getAllResourceName(setResourceTypes, setLoading);
        getAllAwardingBody(setAwardingBody, setLoading);
        // getAllCourses();
        getAllDeletedResources();
        getAllBrands(setBrands, setLoading);
    }, []);

    // get all resources
    const getAllresources = () => {
        axios
            .get("/resources")
            .then((res) => {
                setResource(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    //get all deleted resources
    const getAllDeletedResources = () => {
        axios
            .get("/resource/deleted")
            .then((res) => {
                setDeletedResource(res.data);
                console.log(res.data);
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
                    getAllDeletedResources();
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

    //restore resources
    const restoreResources = () => {
        axios
            .post("/resource/restore")
            .then((res) => {
                if (res.data.success) {
                    getAllresources();
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
    //restore single course
    const restoreSingleResource = (id) => {
        try {
            axios.post("/resource/restore/" + id).then((res) => {
                console.log("done");
                getAllDeletedResources();
                getAllresources();
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
                        style={{width: "80px", height: "40px"}}
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
                            startIcon={<GetApp/>}
                            style={{marginLeft: "20px", marginRight: "30px"}}
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

    //deleted resources table columns
    const deletedColumns = [
        {field: "id", headerName: "ID", width: 100},
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
                        style={{width: "80px", height: "40px"}}
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
                            startIcon={<GetApp/>}
                            style={{marginLeft: "20px", marginRight: "30px"}}
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
                            color="secondary"
                            startIcon={<Edit/>}
                            style={{marginLeft: "20px", marginRight: "30px"}}
                            onClick={() => restoreSingleResource(params.row.id)}
                        >
                            Restore
                        </Button>
                    </>
                );
            },
        },
    ];

    return (
        <div className="resource">

            {
                loading ? (
                    <Box sx={{ display: 'flex',alignContent:'center',justifyContent:'center'}} >
                        <CircularProgress />
                    </Box>
                ):(
                    <DetailsBody
                        columns={columns}
                        rows={resource}
                        deletedColumns={deletedColumns}
                        deletedRows={deletedResource}
                        button={true}
                        onClick={onClick}
                        restoreButtonText="Restore All"
                        onClickRestore={() => setOpenRestoreDialogBox(true)}
                    />
                )
            }

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
                        brands={brands}
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
                buttonText={"Delete"}
            />

            <DialogBox
                open={openRestoreDialogBox}
                handleClose={() => setOpenRestoreDialogBox(false)}
                onClickDelete={restoreResources}
                message={"This will restore all resources!"}
                buttonText={"Restore"}
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
            <SnackbarFeedback
                open={singleRestoreSuccess}
                message={"Resource restored successfully!"}
                onClose={() => setSingleRestoreSuccess(false)}
                type="success"
            />
        </div>
    );
}
