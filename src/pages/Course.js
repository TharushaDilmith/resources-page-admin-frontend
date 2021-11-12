import { Button, IconButton } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CourseForm from "../components/courseForm/CourseForm";
import DetailsBody from "../components/detailsBody/DetailsBody";
import PopupBody from "../components/PopupBody";

const initialState = {
  id: "",
  course_name: "",
  course_image: "",
  course_pdf: "",
  resoursetype_id: "",
  awardingbody_id: "",
};

export default function Course() {
  const [course, setCourse] = React.useState({});
  //use state to store the data
  const [resourceTypes, setResourceTypes] = React.useState([]);

  //initialize the state
  const [initialCourse, setInitialCourse] = React.useState(initialState);

  //use state to store the data
  const [awardingBody, setAwardingBody] = React.useState([]);

  //use state open popup
  const [openPopup, setOpenPopup] = React.useState(false);

  //set the state of the selected course
  const [selectedCourse, setSelectedCourse] = useState([]);

  //set the state of the edit open popup
  const [editOpenPopup, setEditOpenPopup] = useState(false);

  //useEffect
  useEffect(() => {
    getAllCourses();
    getAllResourceTypes();
    getAllAwardingBody();
  }, []);

  // get all courses
  const getAllCourses = () => {
    axios
      .get("/courses")
      .then((res) => {
        setCourse(res.data);
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

  //onclick popup open
  const onClick = () => {
    setOpenPopup(true);
  };

  //onClick delete
  const onClickDelete = (id) => {};
  //onClick edit
  const onClickEdit = (data) => {
    setSelectedCourse(data);
    setEditOpenPopup(true);
  };

  //table columns
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "course_name",
      headerName: "Course Name",
      width: 180,
      editable: true,
    },
    {
      field: "course_image",
      headerName: "Course Image",
      width: 180,
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
            <IconButton onClick={() => onClickDelete(params.row.id)}>
              <Delete color="secondary" />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <div className="course">
      <DetailsBody
        columns={columns}
        rows={course}
        button={true}
        onClick={onClick}
      />

      <PopupBody
        title="Add Course"
        openPopup={openPopup}
        form={
          <CourseForm
            buttonTitle="Add"
            data={initialCourse}
            awardingBodies={awardingBody}
            resourceTypes={resourceTypes}
            formClose={() => setOpenPopup(false)}
          />
        }
      />
      <PopupBody
        title="Edit Course"
        openPopup={editOpenPopup}
        form={
          <CourseForm
            buttonTitle="Update"
            data={selectedCourse}
            awardingBodies={awardingBody}
            resourceTypes={resourceTypes}
            formClose={() => setEditOpenPopup(false)}
          />
        }
      />
    </div>
  );
}
