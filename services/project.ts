import axios, {AxiosResponse} from "axios";

export const doProjects = (params?: any) => {
    const url = process.env.DOMAIN ?? process.env.NEXT_PUBLIC_DOMAIN;
    return axios.get<any, AxiosResponse<RESResponse.Response<RESResponse.Paginate<RESProject.Projects>>>>(`${url}/client/web/projects`, {params})
}

export const doProject = (id?: string) => {
    return axios.get<any, AxiosResponse<RESResponse.Response<RESProject.Project>>>(`${process.env.DOMAIN}/client/web/projects/${id}`)
}

export const doProjectByRelated = (classification?: string, project?: string) => {
    return axios.get<any, AxiosResponse<RESResponse.Response<RESProject.Related[]>>>(`${process.env.DOMAIN}/client/web/project/related`, {
        params: {
            classification,
            project
        }
    })
}

export const doProjectByRecommend = (params: { number: number, classification?: string, excludes?: string[] }) => {
    return axios.get<any, AxiosResponse<RESResponse.Response<RESProject.Related[]>>>(`${process.env.DOMAIN}/client/web/project/recommend`, {params})
}