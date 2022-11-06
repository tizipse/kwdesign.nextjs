declare namespace APIHeader {

    type Props = {
        full?: boolean;
        logo?: 'scroll';
        theme?: string;
        picture?: Record<string, string>;
        setting?: Record<string, string>;
    }

    type Visible = {
        menu?: boolean;
    }

}