import {useEffect, useState} from "react";
import {Carousel, Grid} from '@arco-design/web-react';
import Link from "next/link";

import styles from '@/styles/home.module.scss'

const Home = (props: APIHome.Props) => {

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
                        <Grid.Col flex='0 0 40px' className={styles.logo}>
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
                                    <Link href='/projects'>
                                        <a>
                                            <span className={styles.name}>PROJECTS</span>
                                            <span className={styles.alias}>项目案例</span>
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/about'>
                                        <a>
                                            <span className={styles.name}>ABOUT</span>
                                            <span className={styles.alias}>关于我们</span>
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/contact'>
                                        <a>
                                            <span className={styles.name}>CONTACT</span>
                                            <span className={styles.alias}>联系我们</span>
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                        </Grid.Col>
                    </Grid.Row>
                </header>
                <div className={styles.banners}>
                    <Carousel autoPlay={{interval: 5000, hoverToPause: false}} showArrow='never'
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

export default Home;