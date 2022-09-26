import type {AppProps} from 'next/app'
import {useEffect} from 'react';
import NProgress from 'nprogress';
import {useRouter} from 'next/router';

import '@/styles/globals.scss'

function Application({Component, pageProps}: AppProps) {

    const router = useRouter();

    const onStartRouter = () => {
        NProgress.start();
    };

    const onStopRouter = () => {
        NProgress.done();
    };

    const onRouterComplete = (url: string) => {
        onStopRouter();
    };

    useEffect(() => {

        router.events.on('routeChangeStart', onStartRouter);
        router.events.on('routeChangeComplete', onRouterComplete);
        router.events.on('routeChangeError', onStopRouter);

        return () => {
            router.events.off('routeChangeStart', onStopRouter);
            router.events.off('routeChangeComplete', onRouterComplete);
            router.events.off('routeChangeError', onStopRouter);
        };

    }, [router]);


    return (
        <Component {...pageProps} />
    )
}

export default Application
