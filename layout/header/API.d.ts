declare namespace APIHeader {

    type Props = {
        full?: boolean;
        logo?: 'scroll';
        theme?: string;
        picture?: Record<string, string>;
        setting?: Record<string, string>;
        opacity?: boolean; //   移动端是否透明背景
    }

    type Visible = {
        menu?: boolean;
    }

}