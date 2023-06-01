import clsx from "clsx";
import styles from './Header.module.scss'
import { Link } from "react-router-dom";

import configs from "~/configs";
import images from "~/assets/image";
import CategoryMenu from "./CategoryMenu";
import CountryMenu from "./CountryMenu";
import Seacrh from "./Search";
import Cart from "./Cart";

function Header() {
    return ( 
        <header className={clsx(styles.header)}>
            <nav className={clsx(styles.navigation)}>
                <ul className={clsx(styles.listMenu)}>
                    <CategoryMenu/>
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
                <CountryMenu/>
                <Seacrh className={clsx(styles.feature)}/>
                <div className={clsx(styles.feature,styles.login)}>
                    <Link to={"/account/login"}>login</Link>
                </div>
                <Cart className={clsx(styles.feature)}/>
            </div>
        </header>
    );
}

export default Header;