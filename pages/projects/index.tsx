import {useEffect, useState} from "react";
import type {GetServerSideProps, NextPage} from 'next'
import {useRouter} from "next/router";
import Head from 'next/head'
import {doPicture} from "@/services/picture";
import {doSetting} from "@/services/setting";
import {doClassifications} from "@/services/classification";
import {doCategory} from "@/services/category";
import {doProjects} from "@/services/project";
import Link from "next/link";
import {AxiosResponse} from "axios";
import Header from "@/layout/header";
import {Grid, Pagination, Result} from "@arco-design/web-react";
import dayjs from "dayjs";
import Footer from "@/layout/footer";

import styles from '@/styles/Projects.module.scss'

const Projects: NextPage = (props: APIProjects.Props) => {

    const router = useRouter();

    const onAnimation = () => {

        const ele = document.getElementById('section')

        if (ele) {
            const items = ele.getElementsByClassName('items') as HTMLCollectionOf<HTMLElement>

            for (const key in items) {
                if (items[key].offsetTop > 0 && items[key].offsetTop <= window.innerHeight + window.pageYOffset) {
                    items[key].classList.add('show')
                } else {
                    items[key].classList?.remove('show')
                }
            }
        }
    }

    const onScroll = (e: any) => {
        onAnimation();
    }

    useEffect(() => {

        onAnimation()

        window.addEventListener('scroll', onScroll)

        return () => {
            window.removeEventListener('scroll', onScroll)
        }
    }, [])


    const RenderPaginate = (page?: number, type?: 'page' | 'more' | 'prev' | 'next', e?: any) => {

        if (!page) {
            page = undefined
        }

        return (
            <Link href={{
                pathname: router.pathname,
                query: {...router.query, page}
            }}>
                {e}
            </Link>
        )
    }

    return (
        <>
            <Head>
                <title>{props.seo?.title}</title>
                <meta name="keywords" content={props.seo?.keyword}/>
                <meta name="description" content={props.seo?.description}/>
            </Head>

            <main className={styles.main}>
                <Header picture={props.picture} setting={props.setting}/>
                <section id='section' className={styles.section}>
                    <ul className={styles.filter}>
                        <li>
                            <Link href='/projects'>
                                <a>ALL</a>
                            </Link>
                        </li>
                        {
                            props.classifications?.map(item => (
                                <li key={item.id}>
                                    <Link href={`/projects?c=${item.id}`}>
                                        <a>{item.name}</a>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                    {
                        props.projects?.data && props.projects.data.length > 0 ?
                            <>
                                <Grid.Row className={styles.projects}>
                                    {
                                        props.projects?.data?.map(item => (
                                            <Grid.Col key={item.id} sm={24} md={12} lg={8}
                                                      className={`${styles.project} items`}>
                                                <Link href={`/projects/${item.id}`}>
                                                    <a>
                                                        <div className={styles.tips}>
                                                            {
                                                                item.dated_at &&
                                                                <span>{dayjs(item.dated_at).format('YYYY')}</span>
                                                            }
                                                            {
                                                                item.name &&
                                                                <h3>{item.name}</h3>
                                                            }
                                                        </div>
                                                        <div className={styles.thumb}>
                                                            <img src={item.picture} alt={item.name}/>
                                                        </div>
                                                    </a>
                                                </Link>
                                            </Grid.Col>
                                        ))
                                    }
                                </Grid.Row>
                                <div className={styles.paginate}>
                                    <Pagination showTotal sizeCanChange={false} total={props.projects?.total}
                                                current={props.projects?.page} pageSize={props.projects?.size}
                                                itemRender={RenderPaginate}/>
                                    <div className='clear'/>
                                </div>
                            </> :
                            <Result status='404' subTitle='暂无数据' className={styles.empty}/>
                    }
                    <div className='clear'/>
                </section>
                <Footer picture={props.picture} setting={props.setting}/>
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {

    const {c, page} = context.query

    const query = {
        classification: c,
        size: 12,
        page,
    }

    const category: AxiosResponse<RESResponse.Response<RESCategory.Data>> = await doCategory('PROJECTS');
    const classifications: AxiosResponse<RESResponse.Response<RESClassification.Data[]>> = await doClassifications();
    const projects: AxiosResponse<RESResponse.Response<RESProject.Projects[]>> = await doProjects(query);
    const picture: AxiosResponse<RESResponse.Response<Record<string, string>>> = await doPicture();
    const setting: AxiosResponse<RESResponse.Response<Record<string, string>>> = await doSetting();


    let seo: APIBasic.Seo = {
        title: category.data?.data?.title,
        keyword: category.data?.data?.keyword,
        description: category.data?.data?.description,
    }

    if (c) {

        const classification = classifications.data?.data.find(item => item.id == c)

        if (classification) {

            seo = {
                title: classification.title,
                keyword: classification.keyword,
                description: classification.description,
            }
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