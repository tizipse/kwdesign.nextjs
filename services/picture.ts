import axios from "axios";

export const doPicture = () => {
    return axios.get(`${process.env.REQUEST_URL}/api/client/web/picture`)
}