import {ReactNode, useEffect, useState} from "react";
import {useRouter} from "next/router";
import Link from "next/link";
import {Grid, Pagination, Result, Spin} from "@arco-design/web-react";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import {InView} from 'react-intersection-observer';
import {doProjects} from "@/services/project";
import Constants from "@/util/Constants";

import styles from '@/styles/projects.module.scss';

const Header = dynamic(() => import('@/layout/header'));
const Footer = dynamic(() => import('@/layout/footer'));

const Projects = (props: APIProjects.Projects) => {

    const router = useRouter();
    const [projects, setProjects] = useState<RESResponse.Paginate<RESProject.Projects> | undefined>(props.projects)

    const onAnimation = () => {

        const ele = document.getElementById('section')

        if (ele) {
            const items = ele.getElementsByClassName('items') as HTMLCollectionOf<HTMLElement>

            for (const key in items) {
                if (items[key].offsetTop <= window.innerHeight + window.scrollY) {
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

    const onView = (view: boolean, entry: any) => {

        if (view) {

            const {c} = router.query

            const query = {
                classification: c,
                size: projects?.size,
                page: projects?.page ? projects.page + 1 : 1,
            }

            doProjects(query)
                .then(response => {

                    if (response.data.code === Constants.Success) {

                        const t = response.data.data

                        if (projects?.data && t?.data) {
                            t.data = projects.data.concat(t.data);
                        }

                        setProjects(t)
                    }
                })
        }
    }

    useEffect(() => {
        setProjects(props.projects)
    }, [router.query])

    useEffect(() => {
        onAnimation()
    }, [projects])

    useEffect(() => {
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const RenderPaginate = (p?: number, type?: 'page' | 'more' | 'prev' | 'next', element?: ReactNode) => {

        const total = (projects?.total && projects.size) ? Math.ceil(projects.total / projects.size) : 1;

        let ele: ReactNode = element

        if (type == 'page' && projects?.page != p) {
            ele = (
                <Link href={{pathname: router.pathname, query: {...router.query, page: p}}}>
                    <a>{element}</a>
                </Link>
            )
        } else if (type == 'prev' && projects?.page && projects.page > 1) {
            ele = (
                <Link href={{pathname: router.pathname, query: {...router.query, page: (projects.page - 1)}}}>
                    <a>{element}</a>
                </Link>
            )
        } else if (type == 'next' && projects?.page && projects?.page < total) {
            ele = (
                <Link href={{pathname: router.pathname, query: {...router.query, page: (projects.page + 1)}}}>
                    <a>{element}</a>
                </Link>
            )
        }

        return ele
    }

    return (
        <>
            <Header picture={props.picture} setting={props.setting}/>
            <main className={styles.main}>
                <section id='section' className={styles.section}>
                    <ul className={styles.filter}>
                        <li>
                            <Link href='/projects'>
                                <a>
                                    <span className={styles.name}>ALL</span>
                                    <span className={styles.alias}>全部</span>
                                </a>
                            </Link>
                        </li>
                        {
                            props.classifications?.map(item => (
                                <li key={item.id}>
                                    <Link href={`/projects?c=${item.id}`}>
                                        <a>
                                            <span className={styles.name}>{item.name}</span>
                                            <span className={styles.alias}>{item.alias}</span>
                                        </a>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                    {
                        projects?.data && projects.data.length > 0 ?
                            <>
                                <Grid.Row gutter={[10, 10]} className={styles.projects}>
                                    {
                                        projects?.data?.map(item => (
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
                                                        <div className={styles.mark}/>
                                                        <img src={item.picture} alt={item.name}/>
                                                    </a>
                                                </Link>
                                            </Grid.Col>
                                        ))
                                    }
                                </Grid.Row>
                                {
                                    projects?.total > projects?.size * projects?.page &&
                                    <InView onChange={onView} className={styles.loading}>
                                        <Spin size={40} tip='数据加载中...'/>
                                    </InView>
                                }
                                <div className={styles.paginate}>
                                    <Pagination showTotal sizeCanChange={false} total={projects?.total}
                                                current={projects?.page} pageSize={projects?.size}
                                                itemRender={RenderPaginate}/>
                                    <div className='clear'/>
                                </div>
                            </> :
                            <Result status='404' subTitle='暂无数据' className={styles.empty}/>
                    }
                    <div className='clear'/>
                </section>
            </main>
            <Footer picture={props.picture} setting={props.setting}/>
        </>
    )
}

export default Projects;