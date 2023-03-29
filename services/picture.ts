import axios, {AxiosResponse} from "axios";

export const doPicture = () => {
    return axios.get<any, AxiosResponse<RESResponse.Response<Record<string, string>>>>(`${process.env.DOMAIN}/client/web/picture`)
}