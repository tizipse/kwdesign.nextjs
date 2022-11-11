import dayjs from "dayjs";
import {Grid} from "@arco-design/web-react";
import {useEffect} from "react";
import {useRouter} from "next/router";
import dynamic from "next/dynamic";

import styles from '@/styles/project.module.scss'
import Link from "next/link";

const Header = dynamic(() => import('@/layout/header'))
const Footer = dynamic(() => import('@/layout/footer'))

const Project = (props: APIProjects.Project) => {

    const router = useRouter();

    const onContainer = () => {

        const container = document.getElementById('container')

        if (container) {
            for (let i = 0; i < container.children.length; i += 1) {
                const item = container.children.item(i)
                if (item) {
                    const id = item.getAttribute('id')
                    if (item.getBoundingClientRect().top <= window.innerHeight + window.scrollY && id != 'html') {
                        item.classList.add('show')
                    } else {
                        item.classList?.remove('show')
                    }
                }
            }
        }
    }

    const onHtml = () => {

        const html = document.getElementById('html')

        if (html) {
            for (let i = 0; i < html.children.length; i += 1) {
                const item = html.children.item(i)
                if (item) {
                    if (item.getBoundingClientRect().top <= window.innerHeight + window.scrollY) {
                        item.classList.add('show')
                    } else {
                        item.classList?.remove('show')
                    }
                }
            }
        }
    }

    const onRecommend = () => {

        const recommend = document.getElementById('recommend')

        if (recommend) {
            for (let i = 0; i < recommend.children.length; i += 1) {
                const item = recommend.children.item(i)
                if (item) {

                    // @ts-ignore
                    const ot = item.offsetTop

                    if (ot <= window.innerHeight + window.scrollY) {
                        item.classList.add('show')
                    } else {
                        item.classList?.remove('show')
                    }
                }
            }
        }
    }

    const onAnimation = () => {

        onContainer()

        onHtml()

        onRecommend()
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

    return (
        <>
            <Header logo='scroll' full theme={props.project?.theme} picture={props.picture}
                    setting={props.setting}/>
            <main className={styles.main}>
                <div className={styles.picture} style={{height: `${props.project?.height ?? 75}vh`}}>
                    <img src={props.project?.picture} alt={props.project?.name}/>
                </div>
                <Grid.Row id='container' gutter={30} className={styles.container}>
                    <Grid.Col span={6} md={8} sm={24}>
                        <h3>{props.project?.name}</h3>
                        {
                            props.project?.dated_at &&
                            <p>{dayjs(props.project.dated_at).format('YYYY')}</p>
                        }
                        {
                            props.project?.address &&
                            <p>{props.project?.address}</p>
                        }
                    </Grid.Col>
                    {
                        props.project?.html &&
                        <Grid.Col span={18} md={16} sm={24} id='html' className={styles.html}
                                  dangerouslySetInnerHTML={{__html: props.project.html}}/>
                    }
                </Grid.Row>
                {
                    props.project?.pictures && props.project.pictures.length > 0 &&
                    <div className={styles.pictures}>
                        <Grid.Row gutter={[10, 5]}>
                            {
                                props.project.pictures.map((item, index) => (
                                    <Grid.Col key={index} span={24}>
                                        <img src={item} alt={props.project?.name}/>
                                    </Grid.Col>
                                ))
                            }
                        </Grid.Row>
                    </div>
                }
                {
                    props.recommends && props.recommends.length > 0 &&
                    <div id='recommend' className={styles.recommends}>
                        <h5>You might also like</h5>
                        <div className={styles.recommend}>
                            <Grid.Row>
                                {
                                    props.recommends.map(item => (
                                        <Grid.Col key={item.id} sm={24} xs={24} md={12}>
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
                        </div>
                    </div>
                }
            </main>
            <Footer full picture={props.picture} setting={props.setting}/>
        </>
    )
}

export default Project;