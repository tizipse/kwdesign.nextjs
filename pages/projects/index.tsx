import type {GetServerSideProps, NextPage} from 'next'
import Head from 'next/head'
import dynamic from "next/dynamic";
import {doPicture} from "@/services/picture";
import {doSetting} from "@/services/setting";
import {doClassifications} from "@/services/classification";
import {doCategory} from "@/services/category";
import {doProjects} from "@/services/project";

const ProjectsComponent = dynamic(() => import('@/components/projects'))

const Projects: NextPage = (props: APIProjects.Projects) => {

    return (
        <>
            <Head>
                <title>{props.seo?.title}</title>
                <meta name="keywords" content={props.seo?.keyword}/>
                <meta name="description" content={props.seo?.description}/>
            </Head>

            <ProjectsComponent {...props} />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {

    const {c, page} = context.query

    const query = {
        classification: c,
        size: 18,
        page,
    }

    const category = await doCategory('PROJECTS');
    const classifications = await doClassifications();
    const projects = await doProjects(query);
    const picture = await doPicture();
    const setting = await doSetting();


    let seo: APIBasic.Seo = {
        title: category.data?.data?.title,
        keyword: category.data?.data?.keyword,
        description: category.data?.data?.description,
    }

    if (c && classifications?.data?.data) {

        const classification = classifications.data?.data.find(item => item.id == c)

        if (!classification) {
            return {
                notFound: true,
            }
        }

        seo = {
            title: classification.title,
            keyword: classification.keyword,
            description: classification.description,
        }
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
            classifications: classifications?.data?.data,
            picture: picture?.data?.data,
            setting: setting?.data?.data,
            projects: projects.data.data,
        },
    }
}

export default Projects;