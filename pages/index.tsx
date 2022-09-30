import {useEffect, useState} from "react";
import type {GetServerSideProps, NextPage} from 'next'
import Head from 'next/head'
import {Carousel, Grid} from '@arco-design/web-react';
import {doBanners} from "@/services/banner";
import {doPicture} from "@/services/picture";
import {doSetting} from "@/services/setting";
import {doCategory} from "@/services/category";
import Link from "next/link";

import styles from '@/styles/Home.module.scss'

const Home: NextPage = (props: APIHome.Props) => {

    const [theme, setTheme] = useState<string | undefined>()
    const [display, setDisplay] = useState<APIHome.Display>({})
    const [fadeout, setFadeout] = useState<APIHome.Fadeout>({})

    const onCarousel = (index: number) => {
        if (props.banners && props.banners[index]) {
            setTheme(props.banners[index].theme)
        }
    }

    const toTimeout = () => {
        setTimeout(() => setDisplay({...display, mark: 'none'}), 4000);
        setTimeout(() => setFadeout({...fadeout, mark: true}), 2500);
    }

    useEffect(() => {
        if (props.banners && props.banners.length > 0) setTheme(props.banners[0].theme)
    }, [props.banners])

    useEffect(() => {
        toTimeout()
    }, [])

    return (
        <>
            <Head>
                <title>{props.seo?.title}</title>
                <meta name="keywords" content={props.seo?.keyword}/>
                <meta name="description" content={props.seo?.description}/>
            </Head>

            <main className={styles.main}>
                {
                    props.category?.picture &&
                    <div className={`${styles.mask} ${fadeout.mark ? styles.fadeout : ''}`}
                         style={{display: display.mark}}>
                        <img src={props.category?.picture} alt={props.setting?.company_zh}/>
                    </div>
                }
                <header className={styles.header}>
                    <Grid.Row className={styles.head}>
                        <Grid.Col flex='clamp(140px, 14vw, 240px)' className={styles.logo}>
                            {
                                theme == 'light' &&
                                <img src={props.picture?.logo_light} alt={props.setting?.company_zh}/>
                            }
                            {
                                theme == 'dark' &&
                                <img src={props.picture?.logo_dark} alt={props.setting?.company_zh}/>
                            }
                        </Grid.Col>
                        <Grid.Col flex='auto'>
                            <ul className={`${styles.nav} ${theme}`}>
                                <li>
                                    <Link href='/projects'><a>PROJECTS</a></Link>
                                </li>
                                <li>
                                    <Link href='/about'><a>ABOUT</a></Link>
                                </li>
                                <li>
                                    <Link href='/contact'><a>CONTACT</a></Link>
                                </li>
                            </ul>
                        </Grid.Col>
                    </Grid.Row>
                </header>
                <div className={styles.banners}>
                    <Carousel autoPlay={{interval: 5000, hoverToPause: false}} animation='fade' showArrow='never'
                              indicatorType='never'
                              onChange={onCarousel}
                              className={styles.carousel}>
                        {
                            props.banners?.map(item => (
                                item.url ?
                                    <a key={item.id} href={item.url} target={`_${item.target}`}>
                                        <div key={item.id} className={styles.banner} title={item.name}
                                             style={{
                                                 background: `url(${item.picture}) center no-repeat`,
                                                 backgroundSize: 'cover'
                                             }}/>
                                    </a> :
                                    <div key={item.id} className={styles.banner} title={item.name}
                                         style={{
                                             background: `url(${item.picture}) center no-repeat`,
                                             backgroundSize: 'cover'
                                         }}/>
                            ))
                        }
                    </Carousel>
                </div>
                <footer className={styles.footer}>
                    <ul className={`${styles.foot} ${theme}`}>
                        {
                            props.setting?.copyright &&
                            <li>{props.setting?.copyright}</li>
                        }
                        {
                            props.setting?.icp &&
                            <li>
                                <a target='_blank'
                                   rel='noreferrer' href='http://beian.miit.gov.cn/'>{props.setting?.icp}</a>
                            </li>
                        }
                        {
                            props.setting?.police &&
                            <li>
                                <a href='http://www.beian.gov.cn/portal/registerSystemInfo'
                                   rel='noreferrer' target='_blank'>{props.setting?.police}</a>
                            </li>
                        }
                    </ul>
                </footer>
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {

    const category = await doCategory('HOME');
    const banners = await doBanners();
    const picture = await doPicture();
    const setting = await doSetting();

    let seo: APIBasic.Seo = {
        title: category.data?.data?.title,
        keyword: category.data?.data?.keyword,
        description: category.data?.data?.description,
    }

    if (setting.data?.data?.company_zh) {
        if (seo.title) {
            seo.title += " - " + setting.data?.data?.company_zh
        } else {
            seo.title = setting.data?.data?.company_zh
        }
    }

    return {
        props: {
            seo,
            banners: banners?.data?.data,
            category: category?.data?.data,
            picture: picture?.data?.data,
            setting: setting?.data?.data,
        },
    }
}

export default Home;