import axios, {AxiosResponse} from "axios";

export const doSetting = () => {
    return axios.get<any, AxiosResponse<RESResponse.Response<Record<string, string>>>>(`${process.env.DOMAIN}/client/web/setting`)
}