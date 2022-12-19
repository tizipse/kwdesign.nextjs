import Link from "next/link";
import {useRouter} from "next/router";

import styles from '@/styles/footer.module.scss';

const Footer = (props: APIFooter.Props) => {

    const router = useRouter();

    return (
        <footer className={styles.footer}>
            <div className={styles.foot} style={{maxWidth: props.full ? undefined : '1920px'}}>
                {
                    props.setting?.copyright &&
                    <p className={styles.copyright}>{props.setting?.copyright}</p>
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
                <span onClick={() => router.back()} className={styles.back}>BACK</span>
            </div>
        </footer>
    )
}

export default Footer;