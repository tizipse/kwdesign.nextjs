declare namespace APIProjects {

    type Projects = {
        classifications?: RESClassification.Data[],
        picture?: Record<string, string>,
        setting?: Record<string, string>,
        seo?: APIBasic.Seo,
        projects?: RESResponse.Paginate<RESProject.Projects>,
    }

    type Project = {
        picture?: Record<string, string>,
        setting?: Record<string, string>,
        seo?: APIBasic.Seo,
        project?: RESProject.Project,
        relates?: RESProject.Related[],
        recommends?: RESProject.Recommend[],
    }

}