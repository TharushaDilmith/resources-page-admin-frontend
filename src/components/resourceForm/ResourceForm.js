import React, {useState} from "react";
import "./resourceForm.css";
import {
    Grid,
    TextField,
    makeStyles,
    FormControl,
    InputLabel,
    Select as MuiSelect,
    MenuItem,
    Button,
} from "@material-ui/core";
import {storage} from "../../firebase";
import {createStyles} from '@material-ui/core/styles';
import {DropzoneArea} from "material-ui-dropzone";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     "& .MuiFormControl-root": {
//       width: "400px",
//       margin: theme.spacing(2),
//     },
//   },
// }));

const useStyles = makeStyles(theme => createStyles({
    root: {
        "& .MuiFormControl-root": {
            width: "400px",
            margin: theme.spacing(2),
        },
    },
    previewChip: {
        minWidth: 160,
        maxWidth: 210
    },
}));

export default function ResourceForm({
                                         data,
                                         buttonTitle,
                                         onSubmit,
                                         awardingBodies,
                                         resourceTypes,
                                         course,
                                         brands,
                                         formClose,
                                     }) {
    const [file, setfile] = useState(null);
    const [open, setOpen] = React.useState(false);
    const [PDFFile, setPDFFile] = useState(null);
    const [selectedAwardingBodies, setSelectedAwardingBodies] = useState(awardingBodies);


    //upload file
    // async function uploadImage(image) {
    //     // handle image upload
    //     if (!image.name.match(/\.(jpg|jpeg|png|gif)$/)) {
    //         alert("Select a valid image type");
    //         setOpen(false);
    //     }
    // }

    async function uploadPDF(pdf) {
        if (!pdf.name.match(/\.(pdf)$/)) {
            alert("Select a valid pdf type");
            setOpen(false);
        } else {
            let bucketName = "resourcePDF";
            let uploadTask = storage.ref(`${bucketName}/${pdf.name}`).put(pdf);
            await uploadTask.on(
                "state_changed",
                (snapshot) => {
                    console.log(snapshot);
                },
                (err) => {
                    console.log(err);
                },
                () => {
                    storage
                        .ref("resourcePDF")
                        .child(pdf.name)
                        .getDownloadURL()
                        .then((firebaseURl) => {
                            setValues({...values, resource_url: firebaseURl});
                            setOpen(false);
                        });
                }
            );
        }
    }

    const [values, setValues] = useState(data);
    const classes = useStyles();

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setValues({...values, [name]: value});
    };

    // function onImageSelect(e) {
    //     setfile(e.target.files[0]);
    //
    //     uploadImage(e.target.files[0]);
    // }
    //
    // function onPDFSelect(e) {
    //     setPDFFile(e.target.files[0]);
    //
    //     uploadPDF(e.target.files[0]);
    // }

    const handleBrandChange = (event) => {
        setValues({...values, brand: event.target.value});
        // filter awarding bodies based on brand
        const filteredAwardingBodies = awardingBodies.filter(
            (item) => item.brand === event.target.value
        );
        setSelectedAwardingBodies(filteredAwardingBodies);
    }

    return (
        <div>
            <form className={classes.root} onSubmit={(e) => onSubmit(e, values)}>
                <Grid container>
                    <Grid item xs={6}>
                        <DropzoneArea
                            showPreviews={true}
                            showPreviewsInDropzone={false}
                            useChipsForPreview
                            previewGridProps={{container: {spacing: 1, direction: 'row'}}}
                            previewChipProps={{classes: {root: classes.previewChip}}}
                            previewText="Selected files"
                            maxFileSize={null}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            name="resource_name"
                            label="Resource Name"
                            value={values.resource_name}
                            onChange={handleInputChange}
                            required={true}
                        />
                        {/*display brand as a drop down*/}
                        <FormControl variant="outlined">
                            <InputLabel>Brand</InputLabel>
                            <MuiSelect
                                name="brand_id"
                                label="Brand"
                                value={values.brand}
                                onChange={handleBrandChange}
                                required={true}
                            >
                                {brands.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </MuiSelect>
                        </FormControl>

                        <FormControl variant="outlined">
                            <InputLabel>Awarding Body</InputLabel>
                            <MuiSelect
                                name="awardingbody_id"
                                label="Awarding Body"
                                value={values.awardingbody_id}
                                onChange={handleInputChange}
                                required={true}
                            >
                                {selectedAwardingBodies.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.awarding_body_name}
                                    </MenuItem>
                                ))}
                            </MuiSelect>
                        </FormControl>
                        <FormControl variant="outlined">
                            <InputLabel>Resource Type</InputLabel>
                            <MuiSelect
                                name="resourcetype_id"
                                label="Resources Type"
                                value={values.resourcetype_id}
                                onChange={handleInputChange}
                                required={true}
                            >
                                {resourceTypes.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </MuiSelect>
                        </FormControl>
                        {/*<FormControl variant="outlined">*/}
                        {/*    <InputLabel>Course</InputLabel>*/}
                        {/*    <MuiSelect*/}
                        {/*        name="course_id"*/}
                        {/*        label="Course"*/}
                        {/*        value={values.course_id}*/}
                        {/*        onChange={handleInputChange}*/}
                        {/*        required={true}*/}
                        {/*    >*/}
                        {/*        <MenuItem value="">None</MenuItem>*/}
                        {/*        {course.map((item) => (*/}
                        {/*            <MenuItem key={item.id} value={item.id}>*/}
                        {/*                {item.course_name}*/}
                        {/*            </MenuItem>*/}
                        {/*        ))}*/}
                        {/*    </MuiSelect>*/}
                        {/*</FormControl>*/}


                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: "10px",
                            }}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                style={{marginRight: "20px", marginLeft: "20px"}}
                                type="submit"
                            >
                                {buttonTitle}
                            </Button>
                            <Button
                                onClick={formClose}
                                variant="contained"
                                color="secondary"
                                type="reset"
                            >
                                Cancel
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}
