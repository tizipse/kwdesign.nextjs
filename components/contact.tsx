import {useEffect} from "react";
import {useRouter} from "next/router";
import dynamic from "next/dynamic";

import styles from '@/styles/Contact.module.scss';

const Header = dynamic(() => import('@/layout/header'))
const Footer = dynamic(() => import('@/layout/footer'))

const Contact = (props: APIContact.Props) => {

    const router = useRouter();

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
    }, [router.query])

    useEffect(() => {
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <>
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

export default Contact;