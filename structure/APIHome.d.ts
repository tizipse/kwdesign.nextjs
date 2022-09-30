declare namespace APIHome {

    type Props = {
        seo?: APIBasic.Seo,
        banners?: RESBanner.Data[],
        category?: RESCategory.Data,
        picture?: Record<string, string>,
        setting?: Record<string, string>,
    }

    type Fadeout = {
        mark?: boolean;
    }

    type Display = {
        mark?: 'none';
    }

}