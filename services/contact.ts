import axios, {AxiosResponse} from "axios";

export const doContacts = () => {
    return axios.get<any, AxiosResponse<RESResponse.Response<RESBanner.Data[]>>>(`${process.env.DOMAIN}/client/web/contacts`)
}