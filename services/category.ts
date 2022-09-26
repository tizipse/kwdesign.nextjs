import axios from "axios";

export const doCategory = (uri?: string) => {
    return axios.get(`${process.env.REQUEST_URL}/api/client/web/categories/${uri}`)
}