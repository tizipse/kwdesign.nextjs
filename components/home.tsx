import {useEffect, useState} from "react";
import dynamic from "next/dynamic";
import {Carousel} from '@arco-design/web-react';

import styles from '@/styles/home.module.scss';

const Header = dynamic(() => import('@/layout/header'))

const Home = (props: APIHome.Props) => {

    const [client, setClient] = useState<string>()
    const [theme, setTheme] = useState<string | undefined>()
    const [display, setDisplay] = useState<APIHome.Display>({})
    const [fadeout, setFadeout] = useState<APIHome.Fadeout>({})

    const onCarousel = (index: number) => {
        if (props.banners && props.banners[index]) {
            setTheme(props.banners[index].theme)
        }
    }

    const onResize = () => {
        if (document.body.clientWidth <= 768) {
            setClient('MOBILE')
        } else {
            setClient('PC')
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
        onResize()

        window.onresize = () => {
            onResize()
        }
    }, [])

    return (
        <>
            <main className={styles.main}>
                {
                    props.category?.picture &&
                    <div className={`${styles.mask} ${fadeout.mark ? styles.fadeout : ''} start_mark`}
                         style={{display: display.mark}}>
                        <style jsx>
                            {`
                                .start_mark::after {
                                    background-color: ${props?.setting?.bg_index || '#000'}
                                }
                            `}
                        </style>
                        <img src={props.category?.picture} alt={props.setting?.company_zh}/>
                    </div>
                }
                <Header theme={theme} picture={props.picture} opacity setting={props.setting}/>
                <div className={styles.banners}>
                    <Carousel autoPlay={{interval: 5000, hoverToPause: false}} showArrow='never'
                              moveSpeed={1000}
                              indicatorType='never'
                              onChange={onCarousel}
                              className={styles.carousel}>
                        {
                            props.banners?.filter(item => item.client == client).map(item => (
                                item.url ?
                                    <a key={item.id} href={item.url} target={`_${item.target}`}>
                                        <div key={item.id} className={styles.banner}
                                             style={{
                                                 background: `url(${item.picture}) center no-repeat`,
                                                 backgroundSize: 'cover'
                                             }}/>
                                    </a> :
                                    <div key={item.id} className={styles.banner}
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
                                   rel='noreferrer'
                                   href='https://beian.miit.gov.cn/#/Integrated/index'>{props.setting?.icp}</a>
                            </li>
                        }
                        {
                            props.setting?.police &&
                            <li>
                                <a href='https://www.beian.gov.cn/portal/registerSystemInfo'
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