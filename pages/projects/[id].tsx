import {GetServerSideProps} from "next";
import {AxiosResponse} from "axios";
import {doCategory} from "@/services/category";
import {doClassifications} from "@/services/classification";
import {doProjects} from "@/services/project";
import {doPicture} from "@/services/picture";
import {doSetting} from "@/services/setting";

const Information = () => {

    return (
        <div>
            information
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {

    // const {c, page} = context.path
    //
    // const query = {
    //     classification: c,
    //     size: 12,
    //     page,
    // }

    // const category: AxiosResponse<RESResponse.Response<RESCategory.Data>> = await doCategory('PROJECTS');
    // const classifications: AxiosResponse<RESResponse.Response<RESClassification.Data[]>> = await doClassifications();
    // const projects: AxiosResponse<RESResponse.Response<RESProject.Projects[]>> = await doProjects(query);
    const picture: AxiosResponse<RESResponse.Response<Record<string, string>>> = await doPicture();
    const setting: AxiosResponse<RESResponse.Response<Record<string, string>>> = await doSetting();


    let seo: APIBasic.Seo = {
        // title: category.data?.data?.title,
        // keyword: category.data?.data?.keyword,
        // description: category.data?.data?.description,
    }

    // if (c) {
    //
    //     const classification = classifications.data?.data.find(item => item.id == c)
    //
    //     if (classification) {
    //
    //         seo = {
    //             title: classification.title,
    //             keyword: classification.keyword,
    //             description: classification.description,
    //         }
    //     }
    // }

    return {
        props: {
            seo,
            // classifications: classifications?.data?.data,
            picture: picture?.data?.data,
            setting: setting?.data?.data,
            // projects: projects.data.data,
        },
    }
}

export default Information;