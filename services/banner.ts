import axios from "axios";

export const doBanner = () => {
    return axios.get(`${process.env.REQUEST_URL}/api/client/web/banners`)
}