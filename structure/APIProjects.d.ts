declare namespace APIProjects {

    type Props = {
        classifications?: RESClassification.Data[],
        picture?: Record<string, string>,
        setting?: Record<string, string>,
        seo?: APIBasic.Seo,
        projects?: RESResponse.Paginate<RESProject.Projects>,
    }

}