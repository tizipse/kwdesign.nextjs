import axios from "axios";

export const doClassifications = () => {
    return axios.get(`${process.env.REQUEST_URL}/api/client/web/classifications`)
}