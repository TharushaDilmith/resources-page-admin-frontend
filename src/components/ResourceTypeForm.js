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

export default function ResourceTypeForm({
                                             data,
                                             onSubmit,
                                             buttonTitle,
                                             formClose,
                                             brands,
                                             awardingBodies
                                         }) {
    const [values, setValues] = useState(data);
    const [selectedAwardingBodies, setSelectedAwardingBodies] = useState([]);


    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setValues({...values, [name]: value});
    };

    const handleBrandChange = (event) => {
        setValues({...values, brand: event.target.value});
        // filter awarding bodies by brand
        const filteredList = awardingBodies.filter(awardingBody => awardingBody.brand === event.target.value);
        setSelectedAwardingBodies(filteredList);
    };

    const handleAwardingBodyChange = (event) => {
        setValues({...values, awarding_body: event.target.value});
    }


    const classes = useStyles();


    return (
        <form className={classes.root} onSubmit={(e) => onSubmit(e, values)}>
            <Grid container>
                <Grid item xs={12}>
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
                                selectedAwardingBodies && selectedAwardingBodies.length > 0 && selectedAwardingBodies.map((awardingBody) => <MenuItem key={awardingBody.id}
                                                                                               value={awardingBody.id}>{awardingBody.awarding_body_name}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
                    <TextField
                        variant="outlined"
                        name="resource_type_name"
                        label="Name"
                        value={values.resource_type_name}
                        onChange={handleInputChange}
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
