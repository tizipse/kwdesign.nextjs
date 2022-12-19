import {useEffect} from "react";
import {useRouter} from "next/router";
import dynamic from "next/dynamic";

import styles from '@/styles/about.module.scss'

const Header = dynamic(() => import('@/layout/header'))
const Footer = dynamic(() => import('@/layout/footer'))

const About = (props: APIAbout.Props) => {

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
                {
                    props.category?.picture &&
                    <div className={`${styles.picture} scroll-fade-in`}>
                        <img src={props.category?.picture} alt={props.category?.name}/>
                    </div>
                }
                {
                    props.category?.html &&
                    <div id='html' className={`${styles.html} scroll-fade-in`}
                         dangerouslySetInnerHTML={{__html: props.category.html}}/>
                }
            </main>
            <Footer picture={props.picture} setting={props.setting}/>
        </>
    )
}

export default About;