declare namespace APIContact {

    type Props = {
        picture?: Record<string, string>,
        setting?: Record<string, string>,
        seo?: APIBasic.Seo,
        category?: RESCategory.Data,
        contacts?: RESContact.Data[],
    }

}