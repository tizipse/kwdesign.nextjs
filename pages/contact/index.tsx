import {GetServerSideProps} from "next";
import {doPicture} from "@/services/picture";
import {doSetting} from "@/services/setting";
import Head from "next/head";
import Header from "@/layout/header";
import Constants from "@/util/Constants";
import Footer from "@/layout/footer";
import {useEffect} from "react";
import {doCategory} from "@/services/category";
import {doContacts} from "@/services/contact";

import styles from '@/styles/Contact.module.scss'

const Contact = (props: APIContact.Props) => {

    const onLoopByScrollFadeIn = (element: HTMLElement | Element | null) => {

        let mark = true

        if (!element) {
            mark = false
            element = document.getElementById('main')
        }

        if (element) {

            if (mark) {
                element.classList.add('scroll-fade-in')
            }

            for (let i = 0; i < element.children.length; i += 1) {
                const child = element.children.item(i)

                if (child) onLoopByScrollFadeIn(child)
            }
        }
    }

    const onLoopByIsVisible = (element: HTMLElement | Element | null) => {

        if (!element) {
            element = document.getElementById('main')
        }

        if (element) {

            if (element.getBoundingClientRect().top <= window.innerHeight + window.scrollY) {
                element.classList.add('is-visible')
            } else {
                element.classList?.remove('is-visible')
            }

            for (let i = 0; i < element.children.length; i += 1) {
                const child = element.children.item(i)

                if (child) onLoopByIsVisible(child)
            }
        }
    }

    const onScroll = (e: any) => {
        onLoopByIsVisible(null)
    }

    useEffect(() => {

        onLoopByScrollFadeIn(null)
        onLoopByIsVisible(null)

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
                <div className={`${styles.company} scroll-fade-in`}>
                    {
                        props.setting?.company_zh &&
                        <h1>{props.setting?.company_zh}</h1>
                    }
                    {
                        props.setting?.company_en &&
                        <h3>{props.setting?.company_en}</h3>
                    }
                </div>
                <ul className={`${styles.container} scroll-fade-in`}>
                    {
                        props.contacts?.map(item => (
                            <li key={item.id} className='scroll-fade-in'>
                                {item.city && <h3>{item.city}</h3>}
                                {item.address && <p>{item.address}</p>}
                                {item.telephone && <p>TEL: {item.telephone}</p>}
                            </li>
                        ))
                    }
                </ul>
                {
                    props.category?.picture &&
                    <div className={`${styles.picture} scroll-fade-in`}>
                        <img src={props.category?.picture} alt={props.category?.name}/>
                    </div>
                }
            </main>
            <Footer picture={props.picture} setting={props.setting}/>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {

    const category = await doCategory('CONTACT');

    if (category.data.code != Constants.Success) {
        return {
            notFound: true,
        }
    }

    const picture = await doPicture();
    const setting = await doSetting();
    const contacts = await doContacts();

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
            contacts: contacts.data.data,
        },
    }
}

export default Contact;