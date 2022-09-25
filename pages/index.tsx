import {useEffect, useState} from "react";
import type {GetServerSideProps, NextPage} from 'next'
import Head from 'next/head'
import {Carousel} from '@arco-design/web-react';
import {doBanner} from "@/services/banner";
import {AxiosResponse} from "axios";

import styles from '@/styles/Home.module.scss'

const Home: NextPage = (props: APIHome.Props) => {

    const [display, setDisplay] = useState<APIHome.Display>({})
    const [fadeout, setFadeout] = useState<APIHome.Fadeout>({})

    useEffect(() => {
        setTimeout(() => setDisplay({...display, mark: 'none'}), 4000);
        setTimeout(() => setFadeout({...fadeout, mark: true}), 2500);
    }, [])

    return (
        <>
            <Head>
                <title>Create Next App</title>
            </Head>

            <main className={styles.main}>
                <div className={`${styles.mask} ${fadeout.mark ? styles.fadeout : ''}`} style={{display: display.mark}}>
                    <img src="https://static.uper.io/kwd/picture/1574020736241111040.png" alt="首页"/>
                </div>
                <div className={styles.banners}>
                    <Carousel autoPlay={{interval: 5000, hoverToPause: false}} animation='fade' showArrow='never'
                              indicatorType='never'
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
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {

    const banners: AxiosResponse<APIResponse.Response<APIBanner.Data[]>> = await doBanner();

    return {
        props: {
            banners: banners?.data?.data,
        },
    }
}

export default Home;