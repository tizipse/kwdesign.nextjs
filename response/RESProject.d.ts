declare namespace RESProject {

    type Projects = {
        id?: string;
        name?: string;
        address?: string;
        picture?: string;
        dated_at?: string;
    }

    type Project = {
        id?: string;
        theme?: string;
        name?: string;
        address?: string;
        picture?: string;
        pictures?: string[];
        title?: string;
        keyword?: string;
        description?: string;
        html?: string;
        dated_at?: string;
    }

}