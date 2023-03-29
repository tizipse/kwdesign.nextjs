import {useEffect, useState} from "react";
import {Drawer} from "@arco-design/web-react";
import {IconClose, IconMenu} from "@arco-design/web-react/icon";
import Link from "next/link";

import styles from "@/styles/header.module.scss";

const Header = (props: APIHeader.Props) => {

    const [visible, setVisible] = useState<APIHeader.Visible>({})

    const onResize = () => {
        if (visible.menu) {
            setVisible(v => ({...v, menu: false}))
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

        onResize()

        window.onresize = () => {
            onResize()
        }

    }, [])

    return (
        <>
            <header className={styles.header}>
                <div className={styles.head} style={{maxWidth: props.full ? undefined : '1920px'}}>
                    <div className={styles.logo} style={{position: props.logo == 'scroll' ? undefined : 'fixed'}}>
                        <Link href='/'>
                            <a>
                                {
                                    props.theme == 'light' ?
                                        <img src={props.picture?.logo_light} alt={props.setting?.company_zh}/> :
                                        <img src={props.picture?.logo_dark} alt={props.setting?.company_zh}/>
                                }
                            </a>
                        </Link>
                    </div>
                    <ul className={`${styles.pc} ${props.theme == 'light' ? styles.light : ''}`}>
                        <li>
                            <Link href='/projects'>
                                <a>
                                    <span className={styles.name}>PROJECTS</span>
                                    <span className={styles.alias}>项目案例</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href='/about'>
                                <a>
                                    <span className={styles.name}>ABOUT</span>
                                    <span className={styles.alias}>关于我们</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href='/contact'>
                                <a>
                                    <span className={styles.name}>CONTACT</span>
                                    <span className={styles.alias}>联系我们</span>
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </header>
            <div className={`${styles.toggle} ${visible.menu ? styles.action : ''}`}
                 onClick={() => setVisible({menu: !visible.menu})}>
                {visible.menu ? <IconClose className={styles.icon}/> : <IconMenu className={styles.icon}/>}
            </div>
            <Drawer visible={visible.menu} width='100%' footer={null} className={styles.navigation}
                    closable={false}
                    onCancel={() => setVisible({...visible, menu: false})}
                    headerStyle={{display: "none"}} wrapClassName={styles.mobile}>
                <div className={styles.nav}>
                    <ul>
                        <li>
                            <Link href='/'><a>HOME</a></Link>
                        </li>
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