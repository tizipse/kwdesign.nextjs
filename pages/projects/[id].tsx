import {GetServerSideProps} from "next";
import {AxiosResponse} from "axios";
import {doPicture} from "@/services/picture";
import {doSetting} from "@/services/setting";
import Head from "next/head";
import {doProject} from "@/services/project";
import Header from "@/layout/header";
import dayjs from "dayjs";
import Constants from "@/util/Constants";
import {Grid, Image} from "@arco-design/web-react";
import Footer from "@/layout/footer";

import styles from '@/styles/Project.module.scss'

const Project = (props: APIProjects.Project) => {

    return (
        <>
            <Head>
                <title>{props.seo?.title}</title>
                <meta name="keywords" content={props.seo?.keyword}/>
                <meta name="description" content={props.seo?.description}/>
            </Head>
            <main className={styles.main}>
                <Header theme={props.project?.theme} picture={props.picture} setting={props.setting}/>
                <div className={styles.picture}>
                    <img src={props.project?.picture} alt={props.project?.name}/>
                </div>
                <div className={styles.container}>
                    <h3>{props.project?.name}</h3>
                    {
                        props.project?.dated_at &&
                        <p>{dayjs(props.project.dated_at).format('YYYY')}</p>
                    }
                    {
                        props.project?.address &&
                        <p>{props.project?.address}</p>
                    }
                    {
                        props.project?.html &&
                        <div className={styles.html} dangerouslySetInnerHTML={{__html: props.project.html}}/>
                    }
                </div>
                {
                    props.project?.pictures && props.project.pictures.length > 0 &&
                    <div className={styles.pictures}>
                        <Image.PreviewGroup infinite>
                            <Grid.Row>
                                {
                                    props.project.pictures.map((item, index) => (
                                        <Grid.Col key={index} xs={24} sm={24} md={12} className={styles.items}>
                                            <Image src={item} alt={props.project?.name} className={styles.preview}/>
                                        </Grid.Col>
                                    ))
                                }
                            </Grid.Row>
                        </Image.PreviewGroup>
                    </div>
                }
            </main>
            <Footer picture={props.picture} setting={props.setting}/>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {

    const {id} = context.query

    const project: AxiosResponse<RESResponse.Response<RESProject.Project>> = await doProject(id);

    if (project.data.code != Constants.Success) {
        return {
            notFound: true,
        }
    }

    const picture: AxiosResponse<RESResponse.Response<Record<string, string>>> = await doPicture();
    const setting: AxiosResponse<RESResponse.Response<Record<string, string>>> = await doSetting();

    let seo: APIBasic.Seo = {
        title: project.data?.data?.title,
        keyword: project.data?.data?.keyword,
        description: project.data?.data?.description,
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
            project: project.data.data,
        },
    }
}

export default Project;