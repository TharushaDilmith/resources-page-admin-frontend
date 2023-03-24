import React, {useEffect, useState} from "react";
import {
    Grid,
    TextField,
    makeStyles,
    Button,
    IconButton, InputLabel, Select, MenuItem, FormControl, Box,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiFormControl-root": {
            width: "90%",
            margin: theme.spacing(2),
        },
    },
}));

export default function AwardingBodyForm({
                                             data,
                                             onSubmit,
                                             buttonTitle,
                                             formClose,
                                             brands
                                         }) {
    const [values, setValues] = useState(data);
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setValues({...values, [name]: value});
    };

    const handleBrandChange = (event) => {
        setValues({...values,brand:event.target.value});
        console.log(values)
    };


    const classes = useStyles();

    return (
        <form className={classes.root} onSubmit={(e) => onSubmit(e, values)}>
            <Grid container>
                <Grid item sm={6} md={12}>
                    <TextField
                        variant="outlined"
                        name="awarding_body_name"
                        label="Name"
                        value={values.awarding_body_name}
                        onChange={handleInputChange}
                        required={true}
                    />
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
                                brands && brands.length>0 && brands.map((brand) => <MenuItem key={brand.id} value={brand.id}>{brand.name}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
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
