import {Box, Button, CircularProgress, IconButton} from "@material-ui/core";
import {Delete, Edit} from "@material-ui/icons";
import axios from "axios";
import React, {useEffect, useState} from "react";
import DetailsBody from "../components/detailsBody/DetailsBody";
import DialogBox from "../components/DialogBox";
import PopupBody from "../components/PopupBody";
import CourseForm from "../components/CourseForm";
import SnackbarFeedback from "../components/SnackbarFeedback";
import {getAllBrands} from "../shared/BrandsModule";
import {getAllAwardingBody} from "../shared/AwardingBodyModule";
import {getAllResourceName} from "../shared/ResourceNameModule";

//initialize resourse type data
const initialState = {
    id: "",
    course_name: "",
    brand: "",
    awarding_body: "",
    course_type: "",
    validity: "",
    course_link: "",
    resource_type: "",
};


export default function Course() {
    //use state to store the data
    const [courses, setCourses] = React.useState([]);

    //initial resourse type
    const [initialCourse, setInitialCourse] = useState(initialState);

    //use state to store the popup
    const [openPopup, setOpenPopup] = React.useState(false);

    //use state to store the edit popup
    const [openEditPopup, setOpenEditPopup] = React.useState(false);

    //use state to store selected resourse type
    const [selectedCourse, setSelectedCourse] = useState([]);

    //use state to store the edit popup
    const [openDeleteDialogBox, setOpenDeleteDialogBox] = React.useState(false);

    //use state to store the restore dialog box
    const [openRestoreDialogBox, setOpenRestoreDialogBox] = React.useState(false);

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

    //use state to store the deleted course
    const [deletedCourse, setDeletedCourse] = useState([]);

    const [loading, setLoading] = useState(false);
    const [brand, setBrand] = React.useState([]);
    const [awardingBody, setAwardingBody] = React.useState([]);

    //use effect to get data from the server
    useEffect(() => {
        getAllCourses();
        getAllDeletedCourses();
        getAllBrands(setBrand, setLoading);
        getAllAwardingBody(setAwardingBody, setLoading);
    }, []);

    //get all resource types
    const getAllCourses = () => {
        axios
            .get("/courses")
            .then((res) => {
                setCourses(res.data);
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err);
            });
    };

    //get all deleted courses
    const getAllDeletedCourses = () => {
        axios
            .get("/course/deleted")
            .then((res) => {
                setDeletedCourse(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    //restore single course
    const restoreSingleCourse = (id) => {
        try {
            axios.post("/course/restore/" + id).then((res) => {
                console.log("done");
                getAllDeletedCourses();
                getAllCourses();
                setSingleRestoreSuccess(true);
            });
        } catch (error) {
            console.log(error);
        }
    };


    //add new resource type
    const addNewCourse = (e, data) => {
        e.preventDefault();
        axios
            .post("/course", data)
            .then((res) => {
                if (res.data.success) {
                    getAllCourses();
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
    const editCourse = (e, data) => {
        e.preventDefault();
        axios
            .put(`/course/${selectedCourse.id}`, data)
            .then((res) => {
                if (res.data.success) {
                    getAllCourses();
                    setOpenEditPopup(false);
                    setUpdateSuccess(true);
                } else {
                    alert(res.data.message);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    //delete resource type
    const deleteCourse = (id) => {
        axios
            .delete(`/course/${selectedCourse.id}}`)
            .then((res) => {
                if (res.data.success) {
                    setOpenDeleteDialogBox(false);
                    getAllDeletedCourses();
                    getAllCourses();
                    setDeleteSuccess(true);
                } else {
                    alert(res.data.message);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    //on click edit
    const onClickEdit = (data) => {
        setSelectedCourse(data);
        console.log(data);
        setOpenEditPopup(true);
    };

    //on click delete
    const onClickDelete = (data) => {
        setSelectedCourse(data);
        setOpenDeleteDialogBox(true);
    };

    //onclick open popup
    const onClickOpenPopup = (id) => {
        setOpenPopup(true);
    };

    //onClick restore
    const onClickRestore = () => {
        setOpenRestoreDialogBox(true);
    };

    //restore all courses
    const restoreCourses = () => {
        axios
            .post("/course/restore")
            .then((res) => {
                if (res.data.success) {
                    getAllCourses();
                    getAllDeletedCourses();
                    setOpenRestoreDialogBox(false);
                } else {
                    alert(res.data.message);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    //table columns
    const columns = [
        {field: "id", headerName: "ID", width: 100},
        {
            field: "course_name",
            headerName: "Course Name",
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
            field: "course_type",
            headerName: "Course Type",
            width: 250,
            editable: true,
        },
        {
            field: "course_link",
            headerName: "Course Link",
            width: 250,
            editable: true,
        },
        {
            field: "valid",
            headerName: "Course Validity",
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

    //trashed resource types table columns
    const deletedColumns = [
        {field: "id", headerName: "ID", width: 100},
        {
            field: "course_name",
            headerName: "Course Name",
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
            field: "course_type",
            headerName: "Course Type",
            width: 250,
            editable: true,
        },
        {
            field: "course_link",
            headerName: "Course Link",
            width: 250,
            editable: true,
        },
        {
            field: "valid",
            headerName: "Course Validity",
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
                            onClick={() => restoreSingleCourse(params.row.id)}
                        >
                            Restore
                        </Button>

                    </>
                );
            },
        },
    ];


    return (
        <div className="Course">

            {
                loading ? (
                    <Box sx={{display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
                        <CircularProgress/>
                    </Box>
                ) : (
                    <DetailsBody
                        onClick={onClickOpenPopup}
                        columns={columns}
                        rows={courses}
                        deletedColumns={deletedColumns}
                        deletedRows={deletedCourse}
                        button={true}
                        restoreButtonText="Restore All"
                        onClickRestore={() => setOpenRestoreDialogBox(true)}
                    />
                )
            }

            <PopupBody
                title="Add Course"
                openPopup={openPopup}
                form={
                    <CourseForm
                        buttonTitle="Add"
                        data={initialCourse}
                        formClose={() => setOpenPopup(false)}
                        onSubmit={addNewCourse}
                        brands={brand}
                        awardingBodies={awardingBody}

                    />
                }
            />
            <PopupBody
                title="Update Course"
                openPopup={openEditPopup}
                form={
                    <CourseForm
                        buttonTitle="Update"
                        data={selectedCourse}
                        formClose={() => setOpenEditPopup(false)}
                        onSubmit={editCourse}
                        brands={brand}
                        awardingBodies={awardingBody}
                    />
                }
            />
            <DialogBox
                open={openDeleteDialogBox}
                handleClose={() => setOpenDeleteDialogBox(false)}
                onClickDelete={deleteCourse}
                message={"This will delete course permanently!"}
                buttonText="Delete"
            />

            <DialogBox
                open={openRestoreDialogBox}
                handleClose={() => setOpenRestoreDialogBox(false)}
                onClickDelete={restoreCourses}
                message={"This will restore all courses!"}
                buttonText="Restore"
            />

            <SnackbarFeedback
                open={updateSuccess}
                message={"Course updated successfully!"}
                onClose={() => setUpdateSuccess(false)}
                type="success"
            />
            <SnackbarFeedback
                open={deleteSuccess}
                message={"Course deleted successfully!"}
                onClose={() => setDeleteSuccess(false)}
                type="success"
            />
            <SnackbarFeedback
                open={addSuccess}
                message={"Course added successfully!"}
                onClose={() => setAddSuccess(false)}
                type="success"
            />
            <SnackbarFeedback
                open={singleRestoreSuccess}
                message={"Course restored successfully!"}
                onClose={() => setSingleRestoreSuccess(false)}
                type="success"
            />
        </div>
    );
}
