import styles from '@/styles/Footer.module.scss';
import Link from "next/link";

const Footer = (props: APIFooter.Props) => {

    return (
        <footer className={styles.footer}>
            <div className={styles.foot}>
                <ul className={styles.nav}>
                    <li>
                        <Link href='/projects'>
                            <a>PROJECTS</a>
                        </Link>
                    </li>
                    <li>
                        <Link href='/About'>
                            <a>ABOUT</a>
                        </Link>
                    </li>
                    <li>
                        <Link href='/contact'>
                            <a>CONTACT</a>
                        </Link>
                    </li>
                </ul>
                {
                    props.picture?.logo_bottom &&
                    <div className={styles.logo}>
                        <Link href='/'>
                            <a><img src={props.picture?.logo_bottom} alt={props.setting?.company_zh}/></a>
                        </Link>
                    </div>
                }
                {
                    (props.setting?.icp || props.setting?.police) &&
                    <ul className={styles.certification}>
                        {
                            props.setting?.icp &&
                            <li>
                                <a target='_blank'
                                   rel='noreferrer' href='http://beian.miit.gov.cn/'>{props.setting?.icp}</a>
                            </li>
                        }
                        {
                            props.setting?.police &&
                            <li>
                                <a href='http://www.beian.gov.cn/portal/registerSystemInfo'
                                   rel='noreferrer' target='_blank'>{props.setting?.police}</a>
                            </li>
                        }
                    </ul>
                }
                {
                    props.setting?.copyright &&
                    <p className={styles.copyright}>{props.setting?.copyright}</p>
                }
            </div>
        </footer>
    )
}

export default Footer;