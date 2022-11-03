import type {GetServerSideProps} from 'next'
import Head from 'next/head'
import dynamic from "next/dynamic";
import {doBanners} from "@/services/banner";
import {doPicture} from "@/services/picture";
import {doSetting} from "@/services/setting";
import {doCategory} from "@/services/category";

const HomeComponent = dynamic(() => import('@/components/home'))

export default function Index(props: APIHome.Props) {

    return (
        <>
            <Head>
                <title>{props.seo?.title}</title>
                <meta name="keywords" content={props.seo?.keyword}/>
                <meta name="description" content={props.seo?.description}/>
            </Head>

            <HomeComponent {...props} />
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

    if (!seo.title) {
        seo.title = category.data?.data?.name
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