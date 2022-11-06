import {GetServerSideProps} from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import {doPicture} from "@/services/picture";
import {doSetting} from "@/services/setting";
import {doProject, doProjectByRelated} from "@/services/project";
import Constants from "@/util/Constants";

const ProjectComponent = dynamic(() => import('@/components/project'))

export default function Project(props: APIProjects.Project) {

    return (
        <>
            <Head>
                <title>{props.seo?.title}</title>
                <meta name="keywords" content={props.seo?.keyword}/>
                <meta name="description" content={props.seo?.description}/>
            </Head>

            <ProjectComponent {...props} />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {

    const {id} = context.query

    const project = await doProject(id);

    if (project.data.code != Constants.Success) {
        return {
            notFound: true,
        }
    }

    const picture = await doPicture();
    const setting = await doSetting();
    // const relates = await doProjectByRelated(project.data?.data?.classification, project.data?.data?.id)

    let seo: APIBasic.Seo = {
        title: project.data?.data?.title,
        keyword: project.data?.data?.keyword,
        description: project.data?.data?.description,
    }

    if (!seo.title) {
        seo.title = project.data?.data?.name
    }

    if (setting.data?.data?.company_zh) {
        if (seo.title) {
            seo.title += " - " + setting.data?.data?.company_zh
        } else {
            seo.title = setting.data?.data?.company_zh
        }
    }

    return {
        props: {
            seo,
            picture: picture?.data?.data,
            setting: setting?.data?.data,
            project: project.data.data,
            // relates: relates.data.data,
        },
    }
}