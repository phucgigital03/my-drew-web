import clsx from "clsx";
import styles from './Header.module.scss'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import configs from "~/configs";
import images from "~/assets/image";
import CategoryMenu from "./CategoryMenu";
import CountryMenu from "./CountryMenu";
import Seacrh from "./Search";
import Cart from "./Cart";

function Header() {
    const accessToken = useSelector(state => state.user.accessToken);
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
                <Link to={configs.routes.shopAll} className={clsx(styles.logo)}>
                    <img src={images.logo} alt="logo"/>
                </Link>
            </div>
            <div className={clsx(styles.headerIcons)}>
                <CountryMenu/>
                <Seacrh/>
                <div className={clsx(styles.feature,styles.login)}>
                    {
                        !accessToken 
                            ? <Link to={configs.routes.login}>login</Link>
                            : <Link to={configs.routes.account}>account</Link>
                    }
                </div>
                <Cart/>
            </div>
        </header>
    );
}

export default Header;