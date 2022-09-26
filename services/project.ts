import axios from "axios";

export const doProjects = (params?: any) => {
    return axios.get(`${process.env.REQUEST_URL}/api/client/web/projects`, {params})
}

export const doProject = (id?: string) => {
    return axios.get(`${process.env.REQUEST_URL}/api/client/web/projects/${id}`)
}