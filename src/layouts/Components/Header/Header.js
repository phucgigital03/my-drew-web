import clsx from "clsx";
import styles from './Header.module.scss'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

import configs from "~/configs";
import images from "~/assets/image";

function Header() {
    return ( 
        <header className={clsx(styles.header)}>
            <nav className={clsx(styles.navigation)}>
                <ul className={clsx(styles.listMenu)}>
                    <li className={clsx(styles.shopLi)}>
                        <span className={clsx(styles.title)}>shop</span>
                        <FontAwesomeIcon className={clsx(styles.iconDown)} icon={faAngleDown}/>
                    </li>
                    <li>
                        <Link className={clsx(styles.scrapbooks)} to={configs.routes.scrapbooks}>scrapbooks</Link>
                    </li>
                </ul>
            </nav>
            <div className={clsx(styles.wrapLogo)}>
                <Link to={configs.routes.home} className={clsx(styles.logo)}>
                    <img src={images.logo} alt="logo"/>
                </Link>
            </div>
            <div className={clsx(styles.headerIcons)}>
                <div className={clsx(styles.feature,styles.unit)}>
                    <span>United States</span>
                </div>
                <div className={clsx(styles.feature,styles.search)}>
                    <span>search</span>
                </div>
                <div className={clsx(styles.feature,styles.login)}>
                    <Link>login</Link>
                </div>
                <div className={clsx(styles.feature,styles.cart)}>
                    <span className={clsx(styles.label)}>bag</span>
                    <span className={clsx(styles.value)}>99</span>
                </div>
            </div>
        </header>
    );
}

export default Header;