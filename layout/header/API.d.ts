declare namespace APIHeader {

    type Props = {
        theme?: string;
        picture?: Record<string, string>,
        setting?: Record<string, string>,
    }

    type Visible = {
        menu?: boolean;
    }

}