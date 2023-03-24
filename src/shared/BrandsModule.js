import axios from "axios";

export const getAllBrands = (setBrand) => {
    axios
        .get("/brands")
        .then((res) => {
            setBrand(res.data.data);
        })
        .catch((err) => {
            console.log(err);
        });
};