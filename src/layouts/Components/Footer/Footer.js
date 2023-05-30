import clsx from "clsx";
import styles from './Footer.module.scss'

function Footer() {
    return (  
        <div className={clsx(styles.footer)}>
            <div className={clsx(styles.footerCommunication)}>
                <h1>community</h1>
            </div>
            <div className={clsx(styles.footerContent)}>
                <h1>content</h1>
            </div>
        </div>
    );
}

export default Footer;