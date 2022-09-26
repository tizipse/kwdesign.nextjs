import axios from "axios";

export const doSetting = () => {
    return axios.get(`${process.env.REQUEST_URL}/api/client/web/setting`)
}