import {useEffect, useState} from "react";
import {Drawer, Grid} from "@arco-design/web-react";
import {IconClose, IconMenu} from "@arco-design/web-react/icon";
import Link from "next/link";

import styles from "@/styles/Header.module.scss";

const Header = (props: APIHeader.Props) => {

    const [visible, setVisible] = useState<APIHeader.Visible>({})

    const onResize = () => {
        if (visible.menu) {
            setVisible({...visible, menu: false})
        }
    }

    useEffect(() => {

        if (visible.menu !== undefined) {

            const body = document.body

            if (visible.menu) {
                body.classList.add('no-scroll')
            } else {
                body.classList?.remove('no-scroll')
            }
        }

    }, [visible.menu])

    useEffect(() => {
        window.addEventListener('resize', onResize)
        return () => {
            window.removeEventListener('resize', onResize)
        }
    }, [])

    return (
        <>
            <header className={styles.header}>
                <Grid.Row className={styles.head}>
                    <Grid.Col flex='clamp(140px, 14vw, 240px)' className={styles.logo}>
                        <Link href='/'>
                            <a>
                                {
                                    props.theme == 'light' ?
                                        <img src={props.picture?.logo_light} alt={props.setting?.company_zh}/> :
                                        <img src={props.picture?.logo_dark} alt={props.setting?.company_zh}/>
                                }
                            </a>
                        </Link>
                    </Grid.Col>
                    <Grid.Col flex='auto'>
                        <ul className={`${styles.pc} ${props.theme == 'light' ? styles.light : ''}`}>
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
            </header>
            <div className={`${styles.toggle} ${visible.menu ? styles.action : ''}`}
                 onClick={() => setVisible({...visible, menu: !visible.menu})}>
                {visible.menu ? <IconClose/> : <IconMenu/>}
            </div>
            <Drawer visible={visible.menu} width='100%' footer={null} className={styles.navigation}
                    closable={false}
                    onCancel={() => setVisible({...visible, menu: false})}
                    headerStyle={{display: "none"}} wrapClassName={styles.mobile}>
                <div className={styles.logo}>
                    <Link href='/'>
                        <a>
                            <img src={props.picture?.logo_init} alt={props.setting?.company_zh}/>
                        </a>
                    </Link>
                </div>
                <div className={styles.nav}>
                    <ul>
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
                </div>
            </Drawer>
        </>
    )
}

export default Header;