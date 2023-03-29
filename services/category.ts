import axios, {AxiosResponse} from "axios";

export const doCategory = (uri?: string) => {
    return axios.get<any, AxiosResponse<RESResponse.Response<RESCategory.Data>>>(`${process.env.DOMAIN}/client/web/categories/${uri}`)
}