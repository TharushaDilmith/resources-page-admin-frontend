import axios from "axios";

export const getAllAwardingBody = (setAwardingBody,setLoading) => {
    setLoading(true);
    axios
        .get("/awarding_bodies")
        .then((res) => {
            setAwardingBody(res.data);
            console.log(res.data)
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
        });
};