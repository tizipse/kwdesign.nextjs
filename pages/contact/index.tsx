import {GetServerSideProps} from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import Constants from "@/util/Constants";
import {doPicture} from "@/services/picture";
import {doSetting} from "@/services/setting";
import {doCategory} from "@/services/category";
import {doContacts} from "@/services/contact";

const ContactComponent = dynamic(() => import('@/components/contact'))

export default function Contact(props: APIContact.Props) {

    return (
        <>
            <Head>
                <title>{props.seo?.title}</title>
                <meta name="keywords" content={props.seo?.keyword}/>
                <meta name="description" content={props.seo?.description}/>
            </Head>

            <ContactComponent {...props}/>
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
            picture: picture?.data?.data,
            setting: setting?.data?.data,
            category: category.data.data,
            contacts: contacts.data.data,
        },
    }
}