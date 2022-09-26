import {useEffect, useState} from "react";
import {Grid} from "@arco-design/web-react";
import {IconClose, IconMenu} from "@arco-design/web-react/icon";
import Link from "next/link";

import styles from "@/styles/Header.module.scss";

const Header = (props: APIHeader.Props) => {

    const [opening, setOpening] = useState<boolean | undefined>()

    useEffect(() => {

        if (opening !== undefined) {

            const elements = document.getElementsByTagName('body')

            if (elements && elements.length > 0) {

                const body = elements[0];

                if (opening) {
                    body.classList.add('no-scroll')
                } else {
                    body.classList?.remove('no-scroll')
                }
            }
        }

    }, [opening])

    useEffect(() => {
        setOpening(true)
    }, [])

    return (
        <header className={styles.header}>
            <Grid.Row className={styles.head}>
                <Grid.Col flex='clamp(140px, 14vw, 240px)' className={styles.logo}>
                    {
                        props.picture?.logo_dark &&
                        <Link href='/'>
                            <a>
                                <img src={props.picture?.logo_dark} alt={props.setting?.company_zh}/>
                            </a>
                        </Link>
                    }
                </Grid.Col>
                <Grid.Col flex='auto'>
                    <div className={styles.toggle} onClick={() => setOpening(!opening)}>
                        {
                            opening ? <IconClose/> : <IconMenu/>
                        }
                    </div>
                    <ul className={styles.pc}>
                        <li>
                            <Link href='/projects'><a>PROJECTS</a></Link>
                        </li>
                        <li>
                            <Link href='/about'><a>ABOUT</a></Link>
                        </li>
                        <li>
                            <Link href='/contact'><a>CONTACT</a></Link>
                        </li>
                    </ul>
                </Grid.Col>
            </Grid.Row>

            <div className={styles.mobile}>
                <div className={styles.logo}>
                    <img src={props.picture?.logo_init} alt={props.setting?.company_zh}/>
                </div>
            </div>
        </header>
    )
}

export default Header;