import axios from "axios";

export const getAllBrands = (setBrand,setLoading) => {
    setLoading(true)
    axios
        .get("/brands")
        .then((res) => {
            setBrand(res.data.data);
            setLoading(false)
        })
        .catch((err) => {
            console.log(err);
        });
};