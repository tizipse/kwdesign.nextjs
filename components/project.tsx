import dayjs from "dayjs";
import {Grid, Image} from "@arco-design/web-react";
import {useEffect} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import dynamic from "next/dynamic";

import styles from '@/styles/Project.module.scss'

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

    const onRelated = () => {

        const related = document.getElementById('related')

        if (related) {
            for (let i = 0; i < related.children.length; i += 1) {
                const item = related.children.item(i)
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

        onRelated()
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
            <Header theme={props.project?.theme} picture={props.picture} setting={props.setting}/>
            <main className={styles.main}>
                <div className={styles.picture}>
                    <img src={props.project?.picture} alt={props.project?.name}/>
                </div>
                <div id='container' className={styles.container}>
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
                        <div id='html' className={styles.html} dangerouslySetInnerHTML={{__html: props.project.html}}/>
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
                {
                    props.relates && props.relates.length > 0 &&
                    <div id='related' className={styles.related}>
                        <h5>RELATED PROJECTS</h5>
                        <div className={styles.relates}>
                            <Grid.Row>
                                {
                                    props.relates.map(item => (
                                        <Grid.Col key={item.id} sm={12} xs={12} md={6}>
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
            <Footer picture={props.picture} setting={props.setting}/>
        </>
    )
}

export default Project;