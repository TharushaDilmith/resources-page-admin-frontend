import React, {useEffect, useState} from "react";
import {
    Grid,
    TextField,
    makeStyles,
    Button,
    IconButton, FormControl, InputLabel, Select, MenuItem,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiFormControl-root": {
            width: "90%",
            margin: theme.spacing(2),
        },
    },
}));

export default function CourseForm({
                                       data,
                                       onSubmit,
                                       buttonTitle,
                                       formClose,
                                       brands,
                                       awardingBodies,
                                       resourceTypes
                                   }) {
    const [values, setValues] = useState(data);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setValues({...values, [name]: value});
    };

    const handleBrandChange = (event) => {
        setValues({...values, brand: event.target.value});
        console.log(values)
    };

    const handleAwardingBodyChange = (event) => {
        setValues({...values, awarding_body: event.target.value});
    }

    const handleCourseTypeChange = (event) => {
        setValues({...values, course_type: event.target.value});
    }

    const handleCourseValidityChange = (event) => {
        setValues({...values, validity: event.target.value});
    }

    const handleCourseLinkChange = (event) => {
        setValues({...values, course_link: event.target.value});
    }

    const handleResourceTypeChange = (event) => {
        setValues({...values, resource_type: event.target.value});
    }


    const classes = useStyles();

    return (
        <form className={classes.root} onSubmit={(e) => onSubmit(e, values)}>
            <Grid container>
                <Grid item  md={12}>
                    {/*add brands as select field*/}
                    <FormControl fullWidth required>
                        <InputLabel
                            className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-outlined Mui-required Mui-required"
                            id="brand-select-label">
                            Brand</InputLabel>
                        <Select
                            labelId="brand-select-label"
                            id="brand-select"
                            variant="outlined"
                            label="Brand"
                            onChange={handleBrandChange}
                            value={values.brand}
                        >

                            {
                                brands && brands.length > 0 && brands.map((brand) => <MenuItem key={brand.id}
                                                                                               value={brand.id}>{brand.name}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
                    {/*add awarding bodies as select field*/}
                    <FormControl fullWidth required>
                        <InputLabel
                            className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-outlined Mui-required Mui-required"
                            id="awarding-body-select-label">
                            Awarding Body</InputLabel>
                        <Select
                            labelId="awarding-body-select-label"
                            id="awarding-body-select"
                            variant="outlined"
                            label="Awarding Body"
                            onChange={handleAwardingBodyChange}
                            value={values.awarding_body}
                        >

                            {
                                awardingBodies && awardingBodies.length > 0 && awardingBodies.map((awardingBody) =>
                                    <MenuItem key={awardingBody.id} value={awardingBody.id}>{awardingBody.awarding_body_name}</MenuItem>)
                            }
                        </Select>
                    </FormControl>

                    {/*add resource types as select field*/}
                    <FormControl fullWidth required>
                        <InputLabel
                            className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-outlined Mui-required Mui-required"
                            id="resource-type-select-label">
                            Resource Type</InputLabel>
                        <Select
                            labelId="resource-type-select-label"
                            id="resource-type-select"
                            variant="outlined"
                            label="Resource Type"
                            onChange={handleResourceTypeChange}
                            value={values.resource_type}
                            name="resource_type"
                        >

                            {
                                resourceTypes && resourceTypes.length > 0 && resourceTypes.map((resourceType) =>
                                    <MenuItem key={resourceType.id} value={resourceType.id}>{resourceType.name}</MenuItem>)
                            }
                        </Select>
                    </FormControl>

                    {/*add course type as select field*/}
                    <FormControl fullWidth required>
                        <InputLabel
                            className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-outlined Mui-required Mui-required"
                            id="course-type-select-label">
                            Course Type</InputLabel>
                        <Select
                            labelId="course-type-select-label"
                            id="course-type-select"
                            variant="outlined"
                            label="Course Type"
                            onChange={handleCourseTypeChange}
                            value={values.course_type}
                            name="course_type"
                        >
                            <MenuItem value="Popular Course">Popular Course</MenuItem>
                            <MenuItem value="Short Course">Short Course</MenuItem>
                            <MenuItem value="Featured Course">Featured Course</MenuItem>
                            <MenuItem value="Reed">Reed</MenuItem>
                        </Select>
                    </FormControl>

                    {/*add course validity as select field*/}
                    <FormControl fullWidth required>
                        <InputLabel
                            className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-outlined Mui-required Mui-required"
                            id="course-validity-select-label">
                            Course Validity</InputLabel>
                        <Select
                            labelId="course-validity-select-label"
                            id="course-validity-select"
                            variant="outlined"
                            label="Course Validity"
                            onChange={handleCourseValidityChange}
                            value={values.validity}
                            name="course_validity"
                        >
                            <MenuItem value="1">Valid</MenuItem>
                            <MenuItem value="0">Expired</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        variant="outlined"
                        name="course_name"
                        label="Name"
                        value={values.course_name}
                        onChange={handleInputChange}
                        required={true}
                    />

                    {/*/!*add course url field*!/*/}
                    <TextField
                        variant="outlined"
                        name="course_url"
                        label="Course URL"
                        value={values.course_link}
                        onChange={handleCourseLinkChange}
                        required={true}
                    />

                    <div
                        style={{display: "flex", alignItems: "center", marginTop: "10px"}}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            style={{marginRight: "20px", marginLeft: "300px"}}
                            type="submit"
                        >
                            {buttonTitle}
                        </Button>
                        <Button onClick={formClose} variant="contained" color="secondary">
                            Cancel
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </form>
    );
}
