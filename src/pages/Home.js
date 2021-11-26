import React, { useState } from "react";
import clsx from "clsx";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import { useEffect } from "react";
import axios from "axios";
import DisplayeDetails from "../components/DisplayeDetails";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 260,
  },
}));
export default function HomeBody() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  //use state for the count of the courses
  const [coursesCount, setCoursesCount] = useState([]);

  //use state for the count of the resources
  const [resourcesCount, setResourcesCount] = useState([]);

  //use state for the count of the resource types
  const [resourceTypesCount, setResourceTypesCount] = useState([]);

  //use state for the count of the awarding bodies
  const [awardingBodiesCount, setAwardingBodiesCount] = useState([]);

  //get the all count of the courses
  const getCoursesCount = async () => {
    const response = await axios.get("/courses");
    setCoursesCount(response.data.length);
  };

  //get the all count of the resources
  const getResourcesCount = async () => {
    const response = await axios.get("/resources");
    setResourcesCount(response.data.length);
  };

  //get the all count of the resource types
  const getResourceTypesCount = async () => {
    const response = await axios.get("/resource_types");
    setResourceTypesCount(response.data.length);
  };

  //get the all count of the awarding bodies
  const getAwardingBodiesCount = async () => {
    const response = await axios.get("/awarding_bodies");
    setAwardingBodiesCount(response.data.length);
  };

  useEffect(() => {
    getCoursesCount();
    getResourcesCount();
    getResourceTypesCount();
    getAwardingBodiesCount();
  }, []);

  return (
    <div>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={8}>
          {/* Chart */}
          <Grid item xs={12} md={8} lg={6}>
            <Paper className={fixedHeightPaper}>
              <DisplayeDetails
                title="Resources"
                count={resourcesCount}
                linkTitle="View Resources"
                link="/resources"
              />
            </Paper>
          </Grid>
          {/* Recent Deposits */}
          <Grid item xs={12} md={4} lg={6}>
            <Paper className={fixedHeightPaper}>
              <DisplayeDetails
                title="Awarding Bodies"
                count={awardingBodiesCount}
                linkTitle="View Awaring Bodies"
                link="/awarding_bodies"
              />
            </Paper>
          </Grid>
          {/* Recent Orders */}
          <Grid item xs={12} md={4} lg={6}>
            <Paper className={fixedHeightPaper}>
              <DisplayeDetails
                title="Courses"
                count={coursesCount}
                linkTitle="View Courses"
                link="/courses"
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={8} lg={6}>
            <Paper className={fixedHeightPaper}>
              <DisplayeDetails
                title="Resource Types"
                count={resourceTypesCount}
                linkTitle="View Resource Types"
                link="/resources_types"
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
