import axios, {AxiosResponse} from "axios";

export const doClassifications = () => {
    return axios.get<any, AxiosResponse<RESResponse.Response<RESClassification.Data[]>>>(`${process.env.REQUEST_URL}/api/client/web/classifications`)
}