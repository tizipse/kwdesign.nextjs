import {useEffect, useState} from "react";
import {Grid} from "@arco-design/web-react";
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

        setVisible({...visible, menu: false})

        onResize()

        window.onresize = () => {
            onResize()
        }

    }, [])

    return (
        <header>
            <div className={styles.pc}>
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
                    <ul className={`${styles.nav} ${props.theme == 'light' ? styles.light : ''}`}>
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
            </div>
            <div className={`${styles.mobile} ${visible.menu ? styles.action : styles.close}`}>
                <Grid.Row className={`${styles.head}`} style={{backgroundColor: props.opacity ? 'none' : 'white'}}>
                    <Grid.Col flex='auto' className={styles.logo}>
                        <Link href='/'>
                            <a>
                                {
                                    props.opacity && !visible.menu && props.theme == 'light' ?
                                        <img src={props.picture?.logo_light} alt={props.setting?.company_zh}/> :
                                        <img src={props.picture?.logo_dark} alt={props.setting?.company_zh}/>
                                }
                            </a>
                        </Link>
                    </Grid.Col>
                    <Grid.Col flex='60px'
                              className={`${styles.menu} ${props.opacity && !visible.menu && props.theme == 'light' ? styles.light : styles.dark}`}
                              onClick={() => setVisible({...visible, menu: !visible.menu})}>
                        <div className={styles.menus}>
                            <div className={`${styles.item} ${styles.top}`}/>
                            <div className={`${styles.item} ${styles.center}`}/>
                            <div className={`${styles.item} ${styles.bottom}`}/>
                        </div>
                    </Grid.Col>
                </Grid.Row>

                <div className={styles.content}>
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
            </div>
        </header>
    )
}

export default Header;