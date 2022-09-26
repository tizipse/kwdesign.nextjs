import axios from "axios";

export const doBanners = () => {
    return axios.get(`${process.env.REQUEST_URL}/api/client/web/banners`)
}