import {GetServerSideProps} from "next";
import {doPicture} from "@/services/picture";
import {doSetting} from "@/services/setting";
import Head from "next/head";
import Header from "@/layout/header";
import dayjs from "dayjs";
import Constants from "@/util/Constants";
import Footer from "@/layout/footer";
import {useEffect} from "react";
import {doCategory} from "@/services/category";


import styles from '@/styles/About.module.scss'

const About = (props: APIAbout.Props) => {

    const onContainer = () => {

        const main = document.getElementById('main')

        if (main) {

            for (let i = 0; i < main.children.length; i += 1) {

                const children = main.children.item(i)

                if (children) {

                    const id = children.getAttribute('id')

                    if (children.children.length <= 0) {
                        // @ts-ignore
                        const ot = children?.offsetTop;
                        if (ot > 0 && ot <= window.innerHeight + window.scrollY && id != 'html') {
                            children.classList.add('show')
                        } else {
                            children.classList?.remove('show')
                        }
                    } else {

                        for (let j = 0; j < children.children.length; j += 1) {

                            const child = children.children.item(j);

                            if (child) {
                                // @ts-ignore
                                const otj = child?.offsetTop;
                                if (otj > 0 && otj <= window.innerHeight + window.scrollY && id != 'html') {
                                    child.classList.add('show')
                                } else {
                                    child.classList?.remove('show')
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    const onAnimation = () => {
        onContainer()
    }

    const onScroll = (e: any) => {
        onAnimation();
    }

    useEffect(() => {

        onAnimation()

        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <>
            <Head>
                <title>{props.seo?.title}</title>
                <meta name="keywords" content={props.seo?.keyword}/>
                <meta name="description" content={props.seo?.description}/>
            </Head>
            <Header picture={props.picture} setting={props.setting}/>
            <main id='main' className={styles.main}>
                <div className={styles.company}>
                    {
                        props.setting?.company_zh &&
                        <h1>{props.setting?.company_zh}</h1>
                    }
                    {
                        props.setting?.company_en &&
                        <h3>{props.setting?.company_en}</h3>
                    }
                </div>
                {
                    props.category?.picture &&
                    <div className={styles.picture}>
                        <img src={props.category?.picture} alt={props.category?.name}/>
                    </div>
                }
                {
                    props.category?.html &&
                    <div id='html' className={styles.html} dangerouslySetInnerHTML={{__html: props.category.html}}/>
                }
            </main>
            <Footer picture={props.picture} setting={props.setting}/>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {

    const {id} = context.query

    const category = await doCategory('ABOUT');

    if (category.data.code != Constants.Success) {
        return {
            notFound: true,
        }
    }

    const picture = await doPicture();
    const setting = await doSetting();

    let seo: APIBasic.Seo = {
        title: category.data?.data?.title,
        keyword: category.data?.data?.keyword,
        description: category.data?.data?.description,
    }

    return {
        props: {
            seo,
            picture: picture?.data?.data,
            setting: setting?.data?.data,
            category: category.data.data,
        },
    }
}

export default About;