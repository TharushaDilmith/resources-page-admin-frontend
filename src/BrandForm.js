import React, { useState} from "react";
import {
    Grid,
    TextField,
    makeStyles,
    Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiFormControl-root": {
            width: "90%",
            margin: theme.spacing(2),
        },
    },
}));

export default function BrandForm({
                                             data,
                                             onSubmit,
                                             buttonTitle,
                                             formClose
                                         }) {
    const [values, setValues] = useState(data);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setValues({...values, [name]: value});
    };

    const classes = useStyles();

    return (
        <form className={classes.root} onSubmit={(e) => onSubmit(e, values)}>
            <Grid container>
                <Grid item sm={6} md={12}>
                    <TextField
                        variant="outlined"
                        name="name"
                        label="Name"
                        value={values.name}
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
