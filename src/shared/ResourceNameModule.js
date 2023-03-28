import axios from "axios";

export const getAllResourceName = (setResourceName,setLoading) => {
    setLoading(true)
    axios
        .get("/resource_names")
        .then((res) => {
            setResourceName(res.data.resource_names);
            setLoading(false)
        })
        .catch((err) => {
            console.log(err);
        });
}