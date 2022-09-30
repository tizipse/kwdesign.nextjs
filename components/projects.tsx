import {useEffect} from "react";
import {useRouter} from "next/router";
import Link from "next/link";
import {Grid, Pagination, Result} from "@arco-design/web-react";
import dayjs from "dayjs";
import dynamic from "next/dynamic";

import styles from '@/styles/Projects.module.scss';

const Header = dynamic(() => import('@/layout/header'));
const Footer = dynamic(() => import('@/layout/footer'));

const Projects = (props: APIProjects.Projects) => {

    const router = useRouter();

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

    useEffect(() => {
        onAnimation()
    }, [router.query])

    useEffect(() => {
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const RenderPaginate = (page?: number, type?: 'page' | 'more' | 'prev' | 'next', element?: any) => (
        !page ?
            <Link href={{pathname: router.pathname, query: {...router.query, page}}}>{element}</Link>
            : element
    )

    return (
        <>
            <Header picture={props.picture} setting={props.setting}/>
            <main className={styles.main}>
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
                                                        <div className={styles.mark}/>
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

export default Projects;